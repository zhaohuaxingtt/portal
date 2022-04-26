<template>
  <div class="detail">
    <div class="header margin-bottom20">
      <span class="title">供应商组详情</span>
      <div>
        <iButton v-if="!editStatus && !show" @click="intoEdit">编辑</iButton>
        <template v-else-if="editStatus || show">
          <iButton v-show="editStatus" @click="outEdit">退出编辑</iButton>
          <iButton v-show="editStatus ||show" @click="save">保存</iButton>
        </template>
      </div>
    </div>
    <iCard v-loading="pageLoading">
      <div>
        <el-form
          class="form"
          ref="ruleForm"
          :model="search"
          :rules="rules"
          inline
          label-width="120px"
        >
          <el-row>
            <el-form-item label="中文名称" required prop="nameZh">
              <iInput
                :disabled="!(editStatus || show)"
                v-model="search.nameZh"
                placeholder="自定义-请输入"
              ></iInput>
            </el-form-item>
            <el-form-item label="英文名称" required prop="nameEn">
              <iInput
                :disabled="!(editStatus || show)"
                v-model="search.nameEn"
                placeholder="Please enter"
              ></iInput>
            </el-form-item>
          </el-row>
          <el-row type="flex" justify="space-between">
            <el-form-item label="供应商组科室" required prop="deptName">
              <i-select
                :disabled="!(editStatus || show)"
                v-model="search.deptName"
              >
                <el-option
                  :value="child.code"
                  :label="child.code"
                  v-for="child in options || []"
                  :key="child.code"
                ></el-option>
              </i-select>
            </el-form-item>
            <el-form-item v-show="editStatus || show">
              <iButton @click="openAdd">添加供应商</iButton>
              <iButton @click="deleteData">删除</iButton>
            </el-form-item>
          </el-row>
        </el-form>
        <tableList
          height="500"
          :tableData="tableData"
          :selection="editStatus || show"
          index
          :indexLabel="'序号'"
          :tableTitle="tableTitle"
          :selectProps="editStatus || show ? selectProps : []"
          :selectPropsOptionsObject="selectPropsOptionsObject"
          :customSelectValueKey="'value'"
          @handleSelectionChange="handleSelectionChange"
        >

          <template #deptName="scope">
            <div v-if="!(editStatus || show)">{{scope.row.deptName}}</div>
            <i-select
              :disabled="!(editStatus || show)"
              v-model="scope.row.deptName"
              v-else
            >
              <el-option
                :value="child.code"
                :label="child.code"
                v-for="child in options || []"
                :key="child.code"
              ></el-option>
            </i-select>
          </template>
          <template #supplierNameZh="scope">
            <div @click="goto(scope.row)" class="link">{{scope.row.supplierNameZh}}</div>
          </template>

        </tableList>
      </div>
    </iCard>
    <addSupplier
      :visible.sync="showiDialog"
      class="xxx"
      @onClose="onClose"
      @getTableData="groupDetail"
      @addSupplier="addSupplier"
    ></addSupplier>
  </div>
</template>

<script>
import { iCard, iButton, iInput, iSelect, iMessage, iMessageBox } from 'rise'
import tableList from '@/components/commonTable'
import { detailTitle, fromRules } from '../data.js'
import {
  checkGroup,
  saveGroup,
  deleteSupplier,
  groupDetail,
  queryDeptList
} from '@/api/supplier360/supplierGroup.js'
import addSupplier from './addSupplier.vue'
export default {
  components: {
    iCard,
    iButton,
    iInput,
    iSelect,
    iMessageBox,
    tableList,
    addSupplier
  },
  data() {
    return {
      showiDialog: false,
      show: this.$route.query.status == 'add', // 'add'进入时为 true
      editStatus: false,
      search: {},
      options: [],
      initData: [],
      tableData: [],
      tableTitle: detailTitle,
      selectProps: ['col6'],
      selectPropsOptionsObject: {
        col6: [{ code: '1', name: 'test1', value: 'tet-1' }]
      }, //{col6:[{code:'1',name:'test1',value:'tet-1'}]}
      multipleSelection: [],
      rules: fromRules(this),
      pageLoading: false,
    }
  },
  watch: {
    '$i18n.locale'(val) {
      this.rules = fromRules(this)
      this.$nextTick(() => {
        this.$refs['ruleForm'].validate()
      })
    },
    '$route.query.status'(val) {
      console.log(this.$route)
      console.log(val)
      if (val == 'detail') {
        this.show = false
      } else {
        this.show = true
      }
    }
  },
  created() {
    if(this.$route.query.status === 'detail'){
      this.groupDetail();
    }
    
    this.queryDeptList();
  },
  methods: {
    goto(row){
      console.log(row);
      // return
      this.$router.push({
        path: '/supplier/view-suppliers',
        query: {
          supplierType: row.supplierType,
          subSupplierType:row.subSupplierType,
          subSupplierId: row.subSupplierId,
          supplierToken:row.supplierToken
        }
      })
    },
    queryDeptList(){
      queryDeptList({}).then(res => {
        this.options = res.data
      })
    },

    groupDetail(){
      this.pageLoading = true;
      groupDetail({
        supplierGroupId: this.$route.query.id
      }).then(res => {
        if(res.code === '200'){
          this.search = res.data;
          this.tableData = res.data.groupMappingList || [];
        }

        this.pageLoading = false
      }).catch(err => {
        this.pageLoading = false
      })
    },
    intoEdit() {
      this.editStatus = true
      this.initData = JSON.parse(JSON.stringify(this.tableData))
    },
    outEdit() {
      iMessageBox('确认不保存退出？', this.$t('LK_WENXINTISHI'), {
        confirmButtonText: this.language('QUEREN', '确认'),
        cancelButtonText: this.language('QUXIAO', '取消')
      }).then(() => {
        this.editStatus = false
        this.tableData = JSON.parse(JSON.stringify(this.initData))
      })
    },
    openAdd() {
      this.showiDialog = true
    },
    onClose() {
      this.showiDialog = false
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteData() {
      console.log(this.multipleSelection)
      if (!this.multipleSelection.length) return iMessage.warn('请选择需要删除的数据')
      let indexList = this.multipleSelection.map((item) => item.index)
      let table = []
      let deleteList = []
      this.tableData.forEach((child, i) => {
        if (!indexList.includes(i)) {
          table.push(child)
        }
        if (child.id) {
          deleteList.push(child)
        }
      })
      if(deleteList.length){
        iMessageBox('确认删除供应商？', this.$t('LK_WENXINTISHI'), {
          confirmButtonText: this.language('QUEREN', '确认'),
          cancelButtonText: this.language('QUXIAO', '取消')
        }).then(() => {
          deleteSupplier(deleteList.map(item => item.id)).then((res) => {
            if (res?.code == '200') {
              this.groupDetail()
              // this.tableData = table;
              this.$message.success('操作成功！');
            } else {
              this.$message.error(
                this.$i18n.locale === 'zh' ? res.desZh : res.desEn
              )
            }
          })
        })
      }else{
        this.tableData = table
      }
    },

    saveGroup(params){
      saveGroup(params).then((res1) => {
        if (res1?.code == '200') {
          this.editStatus = false
          // this.getTableData()
          this.$message.success(this.$i18n.locale === 'zh' ? res1.desZh : res1.desEn);
          const query = JSON.parse(JSON.stringify(this.$route.query)) // 获取路由参数信息
          query.status = 'detail';
          query['id'] = res1.data.id;
          this.$router.replace({ path: this.$route.path, query }) //更新路由
          this.groupDetail();
        } else {
          this.$message.error(
            this.$i18n.locale === 'zh' ? res1.desZh : res1.desEn
          )
        }
      })
    },

    save() {

      this.$refs.ruleForm.validate((valid) => {
        if(valid){
          let params = {
            ...this.search,
            supplierGroupId: this.search.id,
            supplierList: this.tableData.map(item=>{
              item.supplierGroupMappingId = item.id
              return item
            })
          }
          checkGroup(params).then((res) => {
            if (res?.code == '200') {
              

              if(res.data.status === 1){
                this.saveGroup(params)
              }else{
                iMessageBox(res.data.statusDesc, this.$t('LK_WENXINTISHI'), {
                  confirmButtonText: this.language('QUEREN', '确认'),
                  cancelButtonText: this.language('QUXIAO', '取消')
                }).then(() => {
                  this.saveGroup(params)
                })
              }

              // saveGroup(params).then((res1) => {
              //   if (res1?.code == '200') {
              //     this.editStatus = false
              //     // this.getTableData()
              //     this.$message.success(this.$i18n.locale === 'zh' ? res1.desZh : res1.desEn);
              //     const query = JSON.parse(JSON.stringify(this.$route.query)) // 获取路由参数信息
              //     query.status = 'detail';
              //     query['id'] = res1.data.id;
              //     this.$router.replace({ path: this.$route.path, query }) //更新路由
              //     this.groupDetail();
              //   } else {
              //     this.$message.error(
              //       this.$i18n.locale === 'zh' ? res1.desZh : res1.desEn
              //     )
              //   }
              // })

              // iMessageBox(res.desZh, this.$t('LK_WENXINTISHI'), {
              //   confirmButtonText: this.language('QUEREN', '确认'),
              //   cancelButtonText: this.language('QUXIAO', '取消')
              // }).then(() => {
              //   saveGroup(params).then((res1) => {
              //     if (res1?.code == '200') {
              //       this.editStatus = false
              //       // this.getTableData()
              //       this.$message.success(this.$i18n.locale === 'zh' ? res1.desZh : res1.desEn)
              //     } else {
              //       this.$message.error(
              //         this.$i18n.locale === 'zh' ? res1.desZh : res1.desEn
              //       )
              //     }
              //   })
              // })
            } else {
              this.$message.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
            }
            
          })
        }
      })

      
    },
    addSupplier(supplierList){

      const res = new Map();
      const arr = [...this.tableData, ...supplierList].filter((item) => !res.has(item['supplierSapCode']) && res.set(item['supplierSapCode'], 1));
      
      this.tableData = arr;
      this.showiDialog = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  height: calc(100% - 52px);
  .header {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    .title {
      font-size: 18px;
      font-weight: bold;
    }
  }
  .form {
    ::v-deep .el-input__inner {
      width: 300px;
    }

    ::v-deep .el-form-item__label::before{
      display: none;
    }
    ::v-deep .el-form-item__label::after{
      content: '*';
      color: #EF3737;
      margin-right: 0.25rem;
    }
  }
  .link{
  font-size: 14px;
  color: #1763F7;
  text-decoration: underline;
  cursor: pointer;
}
}
</style>>