<template>
  <iPage class="template">
    <div class="Main">
      <!-- 搜索条件 -->
      <div class="SearchMenu">
        <div class="SearchOptions">
          <i-search @sure="sure" @reset="reset">
            <el-form>
              <el-form-item
                :label="language('组织机构编码')"
                class="SearchOption"
              >
                <i-input
                  :placeholder="language('请输入')"
                  class=""
                  v-model="formData.fullCode"
                ></i-input>
              </el-form-item>
              <el-form-item :label="language('负责人')" class="SearchOption">
                <i-input
                  :placeholder="language('请输入')"
                  class=""
                  v-model="formData.leaderName"
                ></i-input>
              </el-form-item>
              <el-form-item
                :label="language('组织机构名')"
                class="SearchOption"
              >
                <i-input
                  :placeholder="language('请输入')"
                  class=""
                  v-model="formData.nameZh"
                ></i-input>
              </el-form-item>
              <el-form-item :label="language('是否显示')" class="SearchOption">
                <i-select
                  :placeholder="language('请选择')"
                  v-model="formData.isVisible"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </i-select>
              </el-form-item>
              <el-form-item
                :label="language('是否为Commodity')"
                class="SearchOption"
              >
                <i-select
                  :placeholder="language('请选择')"
                  v-model="formData.isCommodity"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </i-select>
              </el-form-item>
              <el-form-item
                :label="language('是否同步svcd')"
                class="LastSearchOption"
              >
                <i-select
                  :placeholder="language('请选择')"
                  v-model="formData.syncStatus"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </i-select>
              </el-form-item>
            </el-form>
          </i-search>
        </div>
        <!-- 组织列表 -->
        <div class="OrganizationListContainer">
          <iCard>
            <div class="OperationButtonContainer">
              <iButton
                @click="enterCreateOrgPage"
                :disabled="this.selectedTableData.length > 1"
                >{{ language('新建组织机构') }}</iButton
              >
              <iButton
                @click="edit"
                :disabled="this.selectedTableData.length !== 1"
                >{{ language('编辑') }}</iButton
              >
              <iButton
                @click="deleteItem"
                :disabled="!(this.selectedTableData.length > 0)"
                >{{ language('删除') }}</iButton
              >
              <iButton @click="exportList">{{ language('导出') }}</iButton>
            </div>
            <div class="OrganizationTable" v-loading="tableLoading">
              <iTableCustom
                ref="testTable"
                :data="tableListData"
                :columns="tableSetting"
                :tree-expand="exData"
                @handle-selection-change="handleSelectionChange"
              />
              <!-- 分页标签 -->
              <!-- <iPagination
                v-update
                background
                @size-change="handleSizeChange($event, getTableList)"
                @current-change="handleCurrentChange($event, getTableList)"
                :current-page="page.currPage"
                :page-sizes="page.pageSizes"
                :page-size="page.pageSize"
                :layout="page.layout"
              >
              </iPagination> -->
            </div>
          </iCard>
        </div>
      </div>
    </div>
  </iPage>
</template>

<script>
// import SearchBar from './components/SearchView/SearchBar'
import {
  iSearch,
  iInput,
  iSelect,
  iPage,
  iCard,
  iButton

  // iPagination,
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { tableSetting, exportTableSetting } from './data.js'
import { pageMixins } from '@/utils/pageMixins'
import { openUrl } from '@/utils'
import {
  getOrganizationList,
  deleteOrganization,
  exportOrganization
} from '@/api/organization/index.js'
import { filterEmptyValue, treeToArray } from '@/utils'
// import searchSelector from './components/searchSelector'
// import searchInput from './components/searchInput';
export default {
  mixins: [pageMixins],
  components: {
    iSearch,
    iInput,
    iSelect,
    iPage,
    iCard,
    iButton,
    iTableCustom
    // iPagination,
  },
  data() {
    return {
      pageSize: 10,
      tableSetting: tableSetting,
      exportTableSetting: exportTableSetting,
      tableListData: [],
      //所有的list信息
      alltableListData: [],
      pushData: [],
      exData: { expandKey: 'bussinessAreaName', childrenKey: 'supDeptList' },
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: true,
          label: '是'
        },
        {
          value: false,
          label: '否'
        }
      ],
      tableLoading: false,
      formData: {
        fullCode: '',
        leaderName: '',
        nameZh: '',
        isVisible: '',
        isCommodity: '',
        syncStatus: ''
      },
      selectedTableData: [],
      flatTableData: []
    }
  },
  created() {
    this.page.currPage = 0
    this.sendQuest()
  },
  activated() {
    this.sendQuest()
  },
  methods: {
    //新建组织机构
    enterCreateOrgPage() {
      // upLevelID:this.selectedTableData[0].id,
      //       upLevelName:this.selectedTableData[0].nameZh
      // console.log("=====Data",this.selectedTableData[0].id);
      // console.log("=====Name",this.selectedTableData[0].nameZh);
      let id = '0'
      let name = '0'
      if (this.selectedTableData.length > 0) {
        id = this.selectedTableData[0].id
        name = this.selectedTableData[0].nameZh
      }
      openUrl(`/org/create/0/createOrg/${id}/${name}`)
      // this.$router.push({
      //   name: 'orgCreate',
      //   params: {
      //     id: 0,
      //     type: 'createOrg',
      //     upLevelID: id,
      //     upLevelName: name
      //   }
      // })
    },
    reset() {
      this.formData = {
        orCode: '',
        name: '',
        orName: '',
        show: '',
        commodity: '',
        svcd: ''
      }
      this.tableListData = _.cloneDeep(this.alltableListData)
      // this.sendQuest()
      // this.tableListData = this.alltableListData
    },
    //发送请求得到表格数据
    sendQuest() {
      console.log('sendQuest')
      //获取表格数据
      const data = {
        fullCode: this.formData.orCode,
        leadUserId: this.formData.orName,
        svcdCode: this.formData.svcd,
        isVisible: this.formData.show,
        isCommodity: this.formData.commodity,
        //组织机构名称
        orName: this.formData.orName
      }
      //得到数据
      this.tableLoading = true
      getOrganizationList(null, data)
        .then((value) => {
          this.tableLoading = false
          if (value.code == 200) {
            this.alltableListData = _.cloneDeep(value.data)
            this.tableListData = value.data
            this.flatTableData = treeToArray(
              this.alltableListData,
              'supDeptList'
            )
          }
        })
        .catch((error) => {
          //错误处理
          this.tableLoading = false
          return console.log(error)
        })
    },
    //删除组织列表
    deleteOr() {
      //获取删除信息
      let data = []
      // console.log('this.selectedTableData',this.selectedTableData);
      let status
      for (let item of this.selectedTableData) {
        // console.log('item',item);
        if (!item.isLeaf || item.positionList.length > 0) {
          this.$alert('您选择的组织中有下属组织或者下属岗位，不能删除该组织', {
            confirmButtonText: '确定'
          })
          return (status = false)
        } else {
          status = true
          data.push(item.id)
        }
      }
      if (status) {
        this.$alert('是否删除该组织', {
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              this.tableLoading = true
              deleteOrganization(null, data)
                .then((value) => {
                  this.tableLoading = false
                  if (value.code == 200) {
                    this.sendQuest()
                    this.tableListData = value
                  }
                })
                .catch((error) => {
                  this.tableLoading = false
                  console.log('删除错误', error)
                })
              done()
            } else {
              done()
            }
          }
        }).then((action) => {})
      }
    },
    //搜索(模糊查询)
    sure() {
      const filterData = filterEmptyValue(this.formData)

      const keys = Object.keys(filterData)
      if (keys.length === 0) {
        this.tableListData = _.cloneDeep(this.alltableListData)
      } else {
        this.tableLoading = true
        this.tableListData = []
        console.time('searchStart')
        this.tableListData = this.filterTable(keys, filterData)
        console.timeEnd(`searchStart`)
        setTimeout(() => {
          this.tableLoading = false
        }, 500)
      }
    },
    filterTable(keys, filterData) {
      const res = []
      this.flatTableData.forEach((e) => {
        let isOk = true
        keys.forEach((key) => {
          if (key === 'fullCode' && !e.fullCode.includes(filterData.fullCode)) {
            isOk = false
          }
          if (
            key === 'leaderName' &&
            e.userDTOList &&
            e.userDTOList.filter((user) =>
              user.nameZh
                .toLowerCase()
                .includes(filterData.leaderName.toLowerCase())
            ).length === 0
          ) {
            isOk = false
          }
          if (
            key === 'nameZh' &&
            !(
              (e.nameZh &&
                e.nameZh
                  .toLowerCase()
                  .includes(filterData.nameZh.toLowerCase())) ||
              (e.nameEn &&
                e.nameEn
                  .toLowerCase()
                  .includes(filterData.nameZh.toLowerCase()))
            )
          ) {
            isOk = false
          }
          if (key === 'isVisible' && e.isVisible !== filterData.isVisible) {
            isOk = false
          }
          if (
            key === 'isCommodity' &&
            e.isCommodity !== filterData.isCommodity
          ) {
            isOk = false
          }
          if (key === 'syncStatus' && e.syncStatus !== filterData.syncStatus) {
            isOk = false
          }
        })
        if (isOk) {
          res.push({ ...e })
        }
      })
      return res
    },
    //删除item
    deleteItem() {
      this.deleteOr()
    },
    //选中勾选框操作
    handleSelectionChange(val) {
      console.log('val', val)
      this.selectedTableData = val
    },
    // //改变page操作
    // handleSizeChange(event,tableList){
    //   this.pageSize = event
    //   tableList = this.sendQuest()
    // },
    // //改变页码操作
    // handleCurrentChange(event,tableList){
    //   console.log('eventcurrent',event);
    //   tableList = this.sendQuest()
    // },
    //编辑
    edit() {
      // console.log("编辑😝😝😝😝",this.selectedTableData[0].id);
      // this.selectedTableData[0].id = 33;
      let parentID = '0'
      if (this.selectedTableData.length > 0) {
        parentID = this.selectedTableData[0].parentId
        parentID = parentID ? parentID : '0'
      }
      this.$router.push({
        name: 'orgCreate',
        params: {
          id: this.selectedTableData[0].id,
          type: 'editOrg',
          upLevelID: parentID,
          upLevelName: '0'
        }
      })
    },
    //导出
    exportList() {
      // if (this.tableListData && this.tableListData.length > 0) {
      //   //导出文件
      //   excelExport(this.tableListData, exportTableSetting)
      // }
      let param = { ...this.formData }
      exportOrganization(param)
    }
  }
}
</script>

<style lang="scss" scoped>
.LastSearchOption {
  margin-top: 20px;
}

.OrganizationListContainer {
  margin-top: 20px;
}

.OrganizationTable {
  margin-top: 20px;
}

.OperationButtonContainer {
  display: flex;
  justify-content: flex-end;
}
</style>
