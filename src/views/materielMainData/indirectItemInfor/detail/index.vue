<template>
  <iPage>
    <pageHeader>
      {{ language(pageTitle) }}
    </pageHeader>
    <div class="basicMessage">
      <iCard :title="language(title.icardMessage)" collapse>
        <el-form
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
    <div class="measurement" v-show="searchId">
      <iCard :title="language(title.icardMeasure)">
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
              :extra-data="readeExtraData"
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
    </div>
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
import { openUrl } from '@/utils'
import { getPageListByParams } from '@/api/authorityMgmt/index'
import { measurementTable, itemLabel, measureEdit } from './data.js'
import {
  indirectMaterialDetail,
  materielUnit,
  unitBindList,
  saveUnitList,
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
    changeMaterielUnit() {
      for (let item of this.unitoptions) {
        if (item.id == this.materielUnit) {
          Vue.set(this.extraData, 'materielUnit', item.name)
        }
      }
    },
    add() {
      let propData = ''
      for (let item of this.unitoptions) {
        if (this.materielUnit == item.id) {
          propData = item.name
        }
      }
      this.extraData.materielUnit = propData
      this.readeExtraData.materielUnit = propData
      this.measureEditdata.push({})
    },
    del() {
      this.$confirm('是否删除已选中选项', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          unitBindRemove(this.selectedItem.map((item) => item.id)).then(
            (res) => {
              if (res?.code == 200) {
                this.indirectMaterialDetail()
              } else {
                iMessage.error(res.desZh)
              }
            }
          )
          // this.selectedItem.forEach((val) => {
          //   this.measureEditdata = this.measureEditdata.filter((item) => {
          //     if (item.uniqueId !== val.uniqueId) {
          //       return item
          //     }
          //   })
          // })
        })
        .catch(() => {
          this.$refs.theCustomTable.clearSelection()
        })
    },
    measurementEdit() {
      this.editStatus = false
      this.oldMaterielUnit = JSON.stringify(this.materielUnit)
      this.oldData = JSON.stringify(this.data)
      this.oldMeasureEditdata = JSON.stringify(this.measureEditdata)
    },
    unitTabCancel() {
      this.materielUnit = JSON.parse(this.oldMaterielUnit)
      this.data = JSON.parse(this.oldData)
      this.measureEditdata = JSON.parse(this.oldMeasureEditdata)
      this.editStatus = true
    },
    handleSelectionChange(val) {
      this.selectedItem = val
    },
    indirectMaterialDetail() {
      indirectMaterialDetail(this.searchId)
        .then((res) => {
          if (res?.code == 200) {
            this.itemContent = res.data || {}
            this.pageTitle = `${this.itemContent?.partNum} ${this.itemContent?.partNameZh}`
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh || '获取数据失败')
        })
    },
    getUnitTableList() {
      this.loading = true
      unitBindList(this.searchId)
        .then((val) => {
          if (val.code == 200) {
            if (val.data.baseUnitId == null) {
              this.data = []
              this.measureEditdata = []
              this.loading = false
              this.materielUnit = ''
            } else {
              const data = val.data.vos
              if (data) {
                this.data = data
              } else {
                this.data = []
              }
              let propData = ''

              for (let item of this.unitoptions) {
                if (val.data.baseUnitId == item.id) {
                  propData = item.name
                }
              }
              this.extraData.materielUnit = propData
              this.readeExtraData.materielUnit = propData
              this.materielUnit = val.data.baseUnitId
              if (val.data.vos) {
                this.measureEditdata = val.data.vos
              }
              this.initialValue = JSON.parse(JSON.stringify(val.data))
              this.loading = false
            }
          } else if (val.code == 1) {
            this.$message.error(val.desZh)
          }
        })
        .catch((err) => {
          iMessage.error(err.desZh || '获取数据失败')
          this.loading = false
        })
        .finally(() => {
          this.loading = false
        })
    },
    saveUnit() {
      let params = {}
      params.baseUnitId = this.materielUnit //选择零件号id
      params.partInfoId = this.searchId //保存后返回的id
      params.vos = []
      let isFill = this.measureEditdata.filter((item) => {
        return !item.numeratorValue
      })
      if (isFill.length > 0) {
        this.$message.error(this.language('请输入计量单位转换关系数值'))
      } else {
        this.measureEditdata.map((item) => {
          params.vos.push({
            denominatorUnitId: item.denominatorUnitId,
            numeratorValue: item.numeratorValue
          })
        })
        saveUnitList(params)
          .then((val) => {
            if (val.code == 200) {
              this.getUnitTableList()
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
    this.searchId = this.$route.query.id
    this.indirectMaterialDetail()
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
          this.readeExtraData.unitoptions = unitoption
          if (this.searchId) {
            this.getUnitTableList()
          }
        }
      })
      .catch((err) => {
        iMessage.error(err)
      })
  },
  watch: {
    searchId(val) {
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
      itemContent: {},
      searchId: '',
      editStatus: true,
      title: {
        icardMessage: '基本信息',
        icardMeasure: '计量单位',
        measuretitle: '常用计量单位与基本计量单位转换关系'
      },
      data: [],
      measureEditdata: [],
      measureEdit,
      measurementTable,
      pageTitle: '新增零件',
      isEdit: true,
      itemLabel,
      materielUnit: '',
      placeholderText: '请输入',
      selectText: '请输入/请选择',
      unitoptions: [],
      readeExtraData: {
        materielUnit: '',
        unitoptions: []
      },
      extraData: {
        materielUnit: '',
        unitoptions: []
      },
      errorMessage: {
        inputMessage: '请输入零件号',
        numberMessage: '零件号重复'
      },
      selectedItem: '',
      initialValue: {
        baseUnitId: '',
        vos: []
      },
      accessoriesUserInfo: '' // 配附件采购员
    }
  }
}
</script>

<style lang="scss" scoped>
.btnList {
  display: flex;
  justify-content: flex-end;
}
.measurement,
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
