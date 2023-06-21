<template>
  <iPage>
    <pageHeader>
      {{ language(pageTitle) }}
    </pageHeader>
    <div class="basicMessage">
      <iCard :title="language(title.icardMessage)" collapse>
        <el-form
          v-loading="formLoading"
          label-width="120px"
          label-position="right"
          class="margin-top20"
        >
          <el-row gutter="24" class="materiel">
            <el-col :span="6" v-for="(label, prop) in itemLabel" :key="prop">
              <iFormItem :label="language(label)" :prop="prop">
                <iInput v-model="itemContent[prop]" disabled></iInput>
              </iFormItem>
            </el-col>
          </el-row>
        </el-form>
      </iCard>
    </div>
    <iCard class="margin-top20" :title="language(title.icardMeasure)">
      <div slot="header-control">
        <div v-if="editStatus">
          <iButton
            @click="measurementEdit"
            v-permission="'BUTTON_MATERIEL_DATA_PARTS_MESSAGE_UNIT_MODIFY'"
            >{{ language('编辑') }}</iButton
          >
        </div>
        <div v-else>
          <iButton
            @click="saveUnit"
            v-permission="'BUTTON_MATERIEL_DATA_PARTS_MESSAGE_UNIT_MODIFY'"
            >{{ language('保存') }}</iButton
          >
          <iButton
            @click="unitTabCancel"
            v-permission="'BUTTON_MATERIEL_DATA_PARTS_MESSAGE_UNIT_MODIFY'"
            >{{ language('取消') }}</iButton
          >
        </div>
      </div>
      <div class="measureTable">
        <el-form
          label-position="left"
          label-width="120px"
          :rules="rules"
          :model="materielUnit"
          class="validate-required-form unit"
        >
          <el-row gutter="24">
            <el-col :span="6">
              <iFormItem
                :label="language('基本计量单位')"
                prop="materielUnit"
              >
                <iSelect
                  :placeholder="language('请选择')"
                  :disabled="editStatus"
                  v-model="materielUnit"
                  @change="changeMaterielUnit"
                  class="select"
                >
                  <el-option
                    v-for="item in unitoptions"
                    :key="item.id"
                    :value="item.id"
                    :label="item.name"
                  ></el-option>
                </iSelect>
              </iFormItem>
            </el-col>
          </el-row>
        </el-form>
        <el-divider class="divider"></el-divider>
        <div class="measure">
          <div class="measuretitle">
            {{ language(title.measuretitle) }}
          </div>
          <div class="btn" v-if="!editStatus">
            <iButton @click="add">{{ language('新增') }}</iButton>
            <iButton
              @click="del"
              :disabled="selectedItem.length > 0 ? false : true"
              >{{ language('删除') }}</iButton
            >
          </div>
        </div>
        <div class="tabelList" v-show="editStatus">
          <iTableCustom
            key="viewTable"
            :loading="loading"
            :data="data"
            :extra-data="extraData"
            :columns="measurementTable"
          ></iTableCustom>
        </div>
        <div class="tabelList" v-show="!editStatus">
          <iTableCustom
            key="editTable"
            ref="theCustomTable"
            :loading="loading"
            :data="measureEditdata"
            :columns="measureEdit"
            :extra-data="extraData"
            @handle-selection-change="handleSelectionChange"
          ></iTableCustom>
        </div>
      </div>
    </iCard>
    <iCard class="margin-top20" title="附件列表">
      <el-table :data="itemContent.attachments">
        <el-table-column label="附件名称" prop="fileName" align="center">
          <template slot-scope="scope">
            <span class="link" @click="downFile(scope.row.fileId)">
              {{ scope.row.fileName }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="文件大小" prop="fileSize" align="center"></el-table-column>
        <!-- <el-table-column label="创建人" prop="userName"></el-table-column> -->
        <el-table-column label="创建日期" prop="createDate" align="center"></el-table-column>
      </el-table>
    </iCard>
  </iPage>
</template>

<script>
import {
  iPage,
  iCard,
  iButton,
  iFormItem,
  iInput,
  iSelect,
  iDatePicker,
  iMessage
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import pageHeader from '@/components/pageHeader'
import { measurementTable, itemLabel, measureEdit } from './data.js'
import { downloadUdFile } from '@/api/file';
import {
  indirectMaterialDetail,
  materielUnit,
  unitBindList,
  unitBinding,
  unitBindRemove
} from '@/api/materiel/materielMainData.js'

export default {
  components: {
    iPage,
    pageHeader,
    iCard,
    iButton,
    iFormItem,
    iInput,
    iSelect,
    iDatePicker,
    iTableCustom
  },
  methods: {
    // 下载
    downFile (fileId) {
      downloadUdFile(fileId)
    },
    changeMaterielUnit() {
      for (let item of this.unitoptions) {
        if (item.id == this.materielUnit) {
          Vue.set(this.extraData, 'materielUnit', item.name)
        }
      }
    },
    // 新增
    add() {
      this.num++
      this.measureEditdata.push({num: this.num})
    },
    del() {
      this.$confirm('是否删除已选中选项', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let measureEditdata = JSON.parse(JSON.stringify(this.measureEditdata))
          let idList = this.selectedItem.map((item) => item.id).filter(item=>item)
          if(idList.length){ // 需要移除后台数据
            unitBindRemove({idList}).then(res => {
                if (res?.code == 200) {
                  iMessage.success(res.desZh)
                  measureEditdata = measureEditdata.filter(item=>!idList.includes(item.id))
                  // 移除页面新增的数据
                  let delNums = this.selectedItem.map(item=>item.num).filter(item=>item)
                  measureEditdata = measureEditdata.filter(item=>!delNums.includes(item.num))
                  this.measureEditdata = JSON.parse(JSON.stringify(measureEditdata))
                } else {
                  iMessage.error(res.desZh)
                }
              }
            )
          }else{
          // 移除页面新增的数据
          let delNums = this.selectedItem.map(item=>item.num)
          measureEditdata = measureEditdata.filter(item=>!delNums.includes(item.num))
          this.measureEditdata = JSON.parse(JSON.stringify(measureEditdata))
          }
        })
        .catch((e) => {
          this.$refs.theCustomTable.clearSelection()
        })
    },
    // 编辑
    measurementEdit() {
      this.editStatus = false
      this.oldMaterielUnit = JSON.stringify(this.materielUnit)
      this.oldData = JSON.stringify(this.data)
      this.oldExtraData = JSON.stringify(this.extraData)
      this.oldMeasureEditdata = JSON.stringify(this.measureEditdata)
    },
    // 取消
    unitTabCancel() {
      this.materielUnit = JSON.parse(this.oldMaterielUnit)
      this.data = JSON.parse(this.oldData)
      this.extraData = JSON.parse(this.oldExtraData)
      this.measureEditdata = JSON.parse(this.oldMeasureEditdata)
      this.editStatus = true
    },
    handleSelectionChange(val) {
      this.selectedItem = val
    },
    // 查询物料详情
    indirectMaterialDetail() {
      this.formLoading = true
      indirectMaterialDetail(this.bizId)
        .then((res) => {
          if (res?.code == 200) {
            this.itemContent = res.data || {}
            this.itemContent.unitIdName = this.unitoptions.find(item=>item.id==this.itemContent.unitId)?.name || ''
            this.pageTitle = `${this.itemContent?.materialNo} ${this.itemContent?.materialNameZh}`
            this.materielUnit = this.itemContent.unitId+''

            let propData = ''
            for (let item of this.unitoptions) {
              if (this.materielUnit == item.id) {
                propData = item.name
              }
            }
            this.extraData.materielUnit = propData
          }
        })
        .catch((err) => {
          console.log(err)
          iMessage.error(err.desZh || '获取数据失败')
        })
        .finally(()=>{
          this.formLoading = false
        })
    },
    // 获取单位列表
    getUnitTableList() {
      this.loading = true
      unitBindList(this.bizId)
        .then((val) => {
          if (val?.code == 200) {
            this.data = val.data
            this.measureEditdata = val.data
          } else {
            this.$message.error(val.desZh)
          }
        })
        .catch((err) => {
          console.log(err)
          iMessage.error(err.desZh || '获取数据失败')
          this.loading = false
        })
        .finally((f) => {
          this.loading = false
        })
    },
    // 保存
    saveUnit() {
      let params = {}
      params.baseUnitId = this.materielUnit //选择零件号id
      params.materialId = this.bizId //保存后返回的id
      params.materialUintConverseDtoList = []
      let isFill = this.measureEditdata.filter((item) => {
        return !item.converseRate
      })
      if (isFill.length > 0) {
        this.$message.error(this.language('请输入计量单位转换关系数值'))
      } else {
        params.materialUintConverseDtoList = this.measureEditdata.map(item=>{
          item.bizId = item.bizId || this.bizId

          return {
            bizId:item.bizId || this.bizId,
            currentUnitId: item.currentUnitId || this.materielUnit,
            converseRate: item.converseRate,
            id: item.id||'',
            targetUnitId: item.targetUnitId,

          }
        })
        unitBinding(params)
          .then((val) => {
            if (val.code == 200) {
              this.getUnitTableList()
              this.indirectMaterialDetail()
              this.$message.success('保存成功')
            } else if (val.code == 1) {
              this.$message.error(val.desZh)
            }
          })
          .catch((err) => {
            iMessage.error(err)
          })
          .finally(() => {
            this.editStatus = true
          })
      }
    }
  },
  created() {
    this.bizId = this.$route.query.bizId
    //零件单位下拉
    materielUnit()
      .then((val) => {
        if (val.code == 200) {
          const unitoption = []
          for (let item of val.data) {
            unitoption.push({
              name: item['nameZh'],
              value: item['nameZh'],
              id: item['id']
            })
          }
          this.unitoptions = unitoption
          this.extraData.unitoptions = unitoption
          this.getUnitTableList()
        }
        this.indirectMaterialDetail()
      })
      .catch((err) => {
        iMessage.error(err)
      })
  },
  watch: {
    bizId(val) {
      this.materielUnit = '59'
    }
  },
  data() {
    return {
      rules: {
        partNameZh: [
          {
            required: true,
            message: this.language('请输入零件中文名称'),
            trigger: 'blur'
          }
        ],
        materielUnit: [{ required: true, message: ' ', trigger: 'blur' }]
      },
      itemContent: {
        attachments:[]
      },
      bizId: '',
      editStatus: true,
      title: {
        icardMessage: '基本信息',
        icardMeasure: '计量单位',
        measuretitle: '常用计量单位与基本计量单位转换关系'
      },
      data: [],
      loading:false,
      formLoading:false,
      measureEditdata: [],
      measureEdit,
      measurementTable,
      pageTitle: '新增零件',
      itemLabel,
      materielUnit: '',
      placeholderText: '请输入',
      selectText: '请输入/请选择',
      unitoptions: [],
      extraData: {
        materielUnit: '',
        unitoptions: []
      },
      selectedItem: [],
      num: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.btnList {
  display: flex;
  justify-content: flex-end;
}
.tabelList,
.basicMessage,
.elForm {
  margin-top: 20px;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
.measuretitle {
  font-size: 16px;
  font-weight: bold;
}
.measure {
  display: flex;
  justify-content: space-between;
}
.numbers {
  ::v-deep .el-input__inner {
    padding: 6px;
  }
}

.materiel {
  position: relative;
}
.red {
  color: red;
  float: left;
}
.unit {
  ::v-deep .el-form-item {
    margin-bottom: 0px;
  }
}
.partNum {
  ::v-deep .el-input__inner {
    padding-left: 0px;
    padding-right: 0px;
    text-align: center;
    font-size: 12px;
  }
}
.partNum-input {
  width: 35px;
}
</style>
