<template>
  <iCard :title="language('基础信息')" header-control collapse>
    <div
      class="button-top margin-bottom20"
      v-if="!readOnly"
      xxx-permission="'BUTTON_MATERIEL_DATA_MATERIAL_GROUP_BASEINFO_MODIFY'"
    >
      <div v-if="editSta">
        <iButton @click="edit">{{ language('编辑') }}</iButton>
      </div>
      <div v-else>
        <iButton @click="save">{{ language('保存') }}</iButton>
        <iButton @click="closeWindow">{{ language('取消') }}</iButton>
      </div>
    </div>
    <div class="form-item">
      <el-form
        label-position="left"
        label-width="115px"
        :model="formData"
        :rules="rules"
        ref="ruleForm"
        class="validate-required-form"
      >
        <el-row :gutter="20">
          <el-col :span="6">
            <iFormItem :label="language('材料组编号')" prop="categoryCode">
              <iInput
                :placeholder="language('请输入')"
                v-model="formData.categoryCode"
                :disabled="this.$route.query.id"
              >
              </iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('材料组名称')" prop="categoryNameZh">
              <iInput
                :placeholder="language('请输入')"
                v-model="formData.categoryNameZh"
                :disabled="editSta"
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem
              :label="language('材料组名称(德)')"
              prop="categoryNameDe"
            >
              <iInput
                :placeholder="language('请输入')"
                v-model="formData.categoryNameDe"
                :disabled="editSta"
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('材料组说明')">
              <iInput
                :placeholder="language('请输入')"
                v-model="formData.categoryMemo"
                :disabled="editSta"
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('入账是否抽查')" prop="isFixAsset">
              <iSelect
                :placeholder="language('请选择')"
                v-model="formData.isFixAsset"
                :disabled="editSta"
              >
                <el-option
                  v-for="(item, index) in isCheckedOptions"
                  :key="index"
                  :value="item.value"
                  :label="item.code"
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('Linie科室')">
              <iInput
                :placeholder="language('请输入')"
                v-model="formData.deptCodes"
                disabled="true"
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('Linie')">
              <iInput
                :placeholder="language('请输入')"
                v-model="formData.linieNames"
                disabled="true"
              ></iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('主采购员')" prop="masterLinieName">
              <iSelect
                :placeholder="language('请选择')"
                v-model="formData.masterLinieName"
                :disabled="editSta"
              >
                <el-option
                  v-for="item in mainOptions"
                  :key="item.deptId"
                  :value="item.userName"
                  :label="item.userName"
                />
              </iSelect>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('配件采购科室')">
              <iInput
                :placeholder="language('请输入')"
                v-model="formData.pjDeptName"
                disabled
              >
                <!-- <el-option
                  v-for="item in partsDepartmentOptions"
                  :key="item.code"
                  :value="item.code"
                  :label="item.name"
                /> -->
              </iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('配件采购员')">
              <iInput
                :placeholder="language('请输入')"
                v-model="formData.pjLinieName"
                disabled
              >
                <!-- <el-option
                  v-for="item in partsPurchaserOptions"
                  :key="item.code"
                  :value="item.code"
                  :label="item.name"
                /> -->
              </iInput>
            </iFormItem>
          </el-col>
          <el-col :span="6">
            <iFormItem :label="language('模具预算属性')" prop="moldProperties">
              <iSelect
                :placeholder="language('请选择')"
                v-model="formData.moldProperties"
                :disabled="editSta"
              >
                <el-option
                  v-for="item in modelOptions"
                  :key="item.code"
                  :value="item.code"
                  :label="item.name"
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div v-if="categoryId">
      <el-divider />
      <div class="table-bottom margin=top20">
        <div class="iButton-end margin-bottom20">
          <el-form label-position="left" label-width="115px">
            <iFormItem :label="language('已关联零件6位号')">
              <iInput
                v-model="sixPartNum"
                :placeholder="language('请输入')"
              ></iInput>
            </iFormItem>
          </el-form>
          <div style="display: flex; justify-content: flex-end">
            <iButton @click="search">{{ language('查询') }}</iButton>
            <iButton @click="reset">{{ language('重置') }}</iButton>
            <div v-if="!readOnly" style="margin-left: 8px">
              <iButton
                @click="newAdd"
                xxx-permission="'ON_MATERIEL_DATA_MATERIAL_GROUP_SIX_NUMBER_ADD'"
                >{{ language('新增') }}</iButton
              >
              <iButton
                @click="deleteSixParts"
                :disabled="selectTableData.length == 0"
                xxx-permission="'BUTTON_MATERIEL_DATA_MATERIAL_GROUP_SIX_NUMBER_DELETE'"
                >{{ language('删除') }}</iButton
              >
            </div>
          </div>
        </div>
        <iTableCustom
          :loading="loading"
          :data="tableData"
          :columns="tableColumns"
          class="table-left"
          @go-detail="goEdit"
          @handle-selection-change="handleSelectionChange"
        >
        </iTableCustom>
        <iPagination
          v-update
          @size-change="handleSizeChange($event, getSixnumPaged)"
          @current-change="handleCurrentChange($event, getSixnumPaged)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
        ></iPagination>
        <basic-i-dialog
          v-if="newAddDialogVisible"
          :dialogVisible="newAddDialogVisible"
          @changeVisible="changeBasicVisible"
          :editPart="editTableData"
          :addTableData="addTableData"
          @initPartMaterialDetail="initPartMaterialDetail"
          :categoryIdParent="categoryId"
          :readOnly="readOnly"
        >
        </basic-i-dialog>
      </div>
    </div>
  </iCard>
</template>
<script>
import {
  iCard,
  iButton,
  iInput,
  iFormItem,
  iSelect,
  iMessage,
  iPagination
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import BasicIDialog from './basicIDialog.vue'
import { pageMixins } from '@/utils/pageMixins'
import {
  sixPartNumList,
  savePartsMaterial,
  deleteSizeParts,
  partMaterialDetail,
  getSixnumDetail,
  dataDic
} from '@/api/materiel/partsMaterialGroup'
export default {
  components: {
    iCard,
    iButton,
    iInput,
    iFormItem,
    iSelect,
    iTableCustom,
    BasicIDialog,
    iPagination
  },
  mixins: [pageMixins],
  props: {
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formDataLabel: {
        categoryCode: '材料组编号',
        categoryNameZh: '材料组名称',
        categoryNameDe: '材料组名称(德)',
        categoryMemo: '材料组说明',
        isFixAsset: '入账是否抽查',
        LinieDepartment: 'Linie科室',
        Linie: 'Linie',
        masterLinieName: '主采购员',
        pjDeptName: '配件采购科室',
        pjLinieName: '配件采购员',
        moldProperties: '模具预算属性',
        inputPlaceholder: '请输入',
        iSelectPlaceholder: '请选择'
      },
      formData: {
        categoryCode: '',
        categoryNameZh: '',
        categoryNameDe: '',
        categoryMemo: '',
        isFixAsset: '',
        deptCodes: '',
        linieNames: '',
        masterLinieName: '',
        pjDeptName: '',
        pjLinieName: '',
        moldProperties: ''
      },
      rules: {
        categoryCode: [
          { required: true, message: '请输入材料组编号', trigger: 'blur' }
        ],
        categoryNameZh: [
          { required: true, message: '请输入材料组名称', tigger: 'blur' }
        ],
        categoryNameDe: [
          { required: true, message: '请输入材料组名称(德)', tigger: 'blur' }
        ],
        isFixAsset: [
          { required: true, message: '请选择入账是否抽查', trigger: 'change' }
        ],
        moldProperties: [
          { required: true, message: '请选择模具预算属性', trigger: 'change' }
        ]
        // masterLinieName:[
        // 	{ required: true, message: '请选择主采购员', trigger: 'change' }
        // ],
      },
      isCheckedOptions: [
        {
          code: '是',
          value: true
        },
        {
          code: '否',
          value: false
        }
      ],
      mainOptions: [],
      modelOptions: [],
      partsDepartmentOptions: [],
      partsPurchaserOptions: [],
      tableData: [],
      sixPartNum: '',
      tableColumns: [
        {
          type: 'selection',
          width: 50
        },
        {
          type: 'index',
          label: '序号',
          width: 50
        },
        {
          prop: 'sixPartCode',
          label: '零件6位号',
          i18n: '零件6位号',
          emit: 'go-detail',
          customRender: (h, scope) => {
            return <span class="open-link-text">{scope.row.sixPartCode}</span>
          }
        },
        {
          prop: 'partNameZh',
          label: '零件名称（中）',
          i18n: '零件名称（中）'
        },
        {
          prop: 'partNameDe',
          label: '零件名称（德）',
          i18n: '零件名称（德）'
        },
        // {
        //   prop:'partNameEn',
        //   label:'零件名称（英）',
        //   i18n:'',
        // },
        {
          prop: 'linieNames',
          label: 'Linie',
          i18n: 'Linie'
        },
        {
          prop: 'deptCodes',
          label: 'Linie科室',
          i18n: 'Linie科室'
        },
        {
          prop: 'isFixAsset',
          label: '入账是否抽查',
          i18n: '入账是否抽查'
        }
      ],
      newAddDialogVisible: false,
      editTableData: {},
      selectTableData: [],
      categoryId: '',
      addTableData: null,
      editSta: false,
      iniFormdata: {}
    }
  },
  created() {
    if (this.$route.query.id) {
      this.categoryId = this.$route.query.id
      this.editSta = true
    } else {
      this.categoryId = ''
    }
    let keys = 'MODEL_BUDGET_TYPE'
    let parentId = -1
    dataDic(keys, parentId).then((res) => {
      if (res.code == 200) {
        this.modelOptions = res.data.MODEL_BUDGET_TYPE
      }
    })
    this.initPartMaterialDetail()
  },
  methods: {
    reset() {
      this.sixPartNum = ''
      this.getSixnumPaged()
    },
    search() {
      this.page.totalCount = 0
      this.page.currPage = 1
      this.getSixnumPaged()
    },
    edit() {
      this.editSta = false
    },
    initPartMaterialDetail() {
      this.loading = true
      if (this.categoryId === '') {
        this.loading = false
        this.tableData = []
      } else {
        this.getSixnumPaged()
        partMaterialDetail(this.categoryId).then((res) => {
          this.formData = res.data
          this.mainOptions = res.data.linieUserInfos
          this.$emit(
            'code-nameZh',
            this.formData.categoryCode,
            this.formData.categoryNameZh
          )
          this.iniFormdata = JSON.parse(JSON.stringify(res.data))
        })
      }
    },
    getSixnumPaged() {
      this.loading = true
      let data = {
        categoryId: this.categoryId,
        sixPartNum: this.sixPartNum,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getSixnumDetail(data).then((res) => {
        this.loading = false
        if (res.code == 200) {
          let data = res.data
          this.page.totalCount = res.total
          data.forEach((val) => {
            if (val.isFixAsset === true) {
              val.isFixAsset = '是'
            }
            if (val.isFixAsset === false) {
              val.isFixAsset = '否'
            }
          })
          this.tableData = data
        } else {
          this.tableData = []
        }
      })
    },
    newAdd() {
      if (this.formData.isFixAsset != null) {
        this.addTableData = this.formData.isFixAsset
      } else {
        this.addTableData = null
      }
      this.editTableData = {}
      this.newAddDialogVisible = true
    },
    goEdit(row) {
      if (this.formData.isFixAsset != null) {
        this.addTableData = this.formData.isFixAsset
      } else {
        this.addTableData = null
      }
      row.fixAssetSta = row.isFixAsset === '是'
      this.newAddDialogVisible = true
      this.editTableData = row
    },
    changeBasicVisible() {
      this.newAddDialogVisible = false
    },
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          let masterLinie = {
            linieDeptCode: '',
            linieDeptId: '',
            linieDeptName: '',
            linieId: ''
          }
          if (this.mainOptions) {
            this.mainOptions.forEach((item) => {
              if (this.formData.masterLinieName == item.userName) {
                masterLinie = {
                  linieDeptCode: item.deptCode,
                  linieDeptId: item.deptId,
                  linieDeptName: item.deptName,
                  linieId: item.userId
                }
              }
            })
          }
          let data = {
            categoryCode: this.formData.categoryCode,
            categoryMemo: this.formData.categoryMemo,
            categoryNameDe: this.formData.categoryNameDe,
            categoryNameZh: this.formData.categoryNameZh,
            isFixAsset: this.formData.isFixAsset,
            id: this.$route.query.id,
            masterLinie: masterLinie,
            moldProperties: this.formData.moldProperties
          }
          savePartsMaterial(data).then((res) => {
            if (res.code == 200) {
              iMessage.success('保存成功')
              this.editSta = true
              if (!this.categoryId) {
                this.$router.replace({ query: { id: res.data } })
              }
              this.categoryId = res.data
              this.initPartMaterialDetail()

              this.$emit('saveSuccess', res.data)
            }
            if (res.code == 1) {
              iMessage.error(res.desZh)
            }
          })
        } else {
          return false
        }
      })
    },
    closeWindow() {
      let oldData = this.iniFormdata
      let newData = this.formData
      if (
        this.$route.query.id &&
        JSON.stringify(newData) != JSON.stringify(oldData)
      ) {
        this.$confirm('数据有改动，是否取消此次的改动', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.$route.query.id) {
            this.initPartMaterialDetail()
            this.editSta = true
          } else {
            window.close()
          }
        })
      } else {
        if (this.$route.query.id) {
          this.initPartMaterialDetail()
          this.editSta = true
        } else {
          window.close()
        }
      }
    },
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    deleteSixParts() {
      this.$confirm('是否删除已选中数据', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let ids = []
          this.selectTableData.forEach((val) => {
            ids.push(val.id)
          })
          deleteSizeParts(ids).then((res) => {
            if (res.code == 200) {
              this.initPartMaterialDetail()
              iMessage.success('删除成功')
            }
            if (res.code == 1) {
              iMessage.error(res.desZh)
            }
          })
        })
        .catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.button-top {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.iButton-end {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.table-left th,
.table-left td {
  border: 1px solid red;
}
</style>
