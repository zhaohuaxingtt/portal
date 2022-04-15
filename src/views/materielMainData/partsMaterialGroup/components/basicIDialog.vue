<template>
  <iDialog
    :visible.sync="dialogVisible"
    :title="language(pageTitle)"
    @close="clearDialog"
    width="480px"
  >
    <div class="margin-bottom20">
      <el-form label-width="120px" :model="formData" ref="formData">
        <iFormItem :label="language('零件6位号')" prop="sixPartCode">
          <iInput
            :placeholder="language('请输入')"
            v-model="formData.sixPartCode"
            :disabled="isDisabled"
            @input="getSixPartsName($event)"
          ></iInput>
        </iFormItem>
        <iFormItem :label="language('零件名称（中）')">
          <iInput
            :placeholder="language('请输入')"
            v-model="formData.partNameZh"
            :disabled="isDisabled"
          ></iInput>
        </iFormItem>
        <iFormItem :label="language('零件名称（德）')">
          <iInput
            :placeholder="language('请输入')"
            v-model="formData.partNameDe"
            :disabled="isDisabled"
          ></iInput>
        </iFormItem>
        <!-- <iFormItem :label='formDataLabel.partNameEn'>
          <iInput
            :placeholder='formDataLabel.inputPlaceholder'
            v-model='formData.partNameEn'
            :disabled='isDisabled'
          ></iInput>  
        </iFormItem> -->
        <iFormItem :label="language('入账是否抽查')" prop="isFixAsset">
          <iSelect
            :placeholder="language('请输入')"
            v-model="formData.isFixAsset"
            :disabled="isDisabled || isCheckSta"
            style="width: 100%"
          >
            <el-option
              v-for="item in isCheckedOptions"
              :key="item.value"
              :value="item.value"
              :label="item.code"
            >
            </el-option>
          </iSelect>
        </iFormItem>
        <iFormItem :label="language('Linie')">
          <iInput v-model="formData.linieNames" disabled="true"></iInput>
        </iFormItem>
        <iFormItem :label="language('Linie科室')">
          <iInput v-model="formData.deptCodes" disabled="true"></iInput>
        </iFormItem>
      </el-form>
    </div>
    <div class="button-end">
      <iButton
        v-if="readOnly ? false : isCheck"
        @click="edit"
        v-permission="'BUTTON_MATERIEL_DATA_MATERIAL_GROUP_SIX_NUMBER_MODIFY'"
        >{{ language('编辑') }}</iButton
      >
      <iButton
        v-if="readOnly ? false : !isCheck"
        @click="handleCheck"
        v-permission="
          'BUTTON_MATERIEL_DATA_MATERIAL_GROUP_SIX_NUMBER_MODIFY|BUTTON_MATERIEL_DATA_MATERIAL_GROUP_SIX_NUMBER_ADD'
        "
        >{{ language('保存') }}</iButton
      >
      <iButton
        v-if="readOnly ? false : !isCheck"
        @click="reset"
        v-permission="
          'BUTTON_MATERIEL_DATA_MATERIAL_GROUP_SIX_NUMBER_MODIFY|BUTTON_MATERIEL_DATA_MATERIAL_GROUP_SIX_NUMBER_ADD'
        "
        >{{ language('重置') }}</iButton
      >
      <iButton @click="clearDialog">{{ language('退出') }}</iButton>
    </div>
  </iDialog>
</template>
<script>
import { iDialog, iFormItem, iInput, iButton, iSelect, iMessage } from 'rise'
import {
  saveSixParts,
  getChangeSixParts
} from '@/api/materiel/partsMaterialGroup'
export default {
  name: 'basicIDialog',
  components: { iDialog, iFormItem, iInput, iButton, iSelect },
  props: {
    addTableData: {
      type: String,
      default: ''
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    editPart: {
      type: Object,
      default: function () {
        return {}
      }
    },
    categoryIdParent: {
      type: Object,
      default: function () {
        return {}
      }
    },
    readOnly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkStastus: false,
      isCheckSta: '',
      // formDataLabel: {
      //   sixPartCode:'零件6位号',
      //   partNameZh:'零件名称（中）',
      //   partNameDe:'零件名称（德）',
      //   partNameEn:'零件名称（英）',
      //   Linie:'Linie',
      //   LinieDepartment:'Linie科室',
      //   isFixAsset:'入账是否抽查',
      //   inputPlaceholder: '请输入'
      // },
      formData: {
        sixPartCode: '',
        partNameZh: '',
        partNameDe: '',
        partNameEn: '',
        isFixAsset: '',
        linieNames: '',
        deptCodes: ''
      },
      isDisabled: '',
      isCheck: '',
      Linie: '',
      LinieDepartment: '',
      rules: {
        sixPartCode: [
          { required: true, message: '请输入零件六位号', trigger: 'blur' }
        ],
        isFixAsset: [
          { required: true, message: '请选择入账是否抽查', trigger: 'change' }
        ]
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
      categoryId: ''
    }
  },
  created() {
    if (this.editPart.categoryId) {
      // console.log('sssssss');
      this.formData = JSON.parse(JSON.stringify(this.editPart))
    }
    if (this.$route.query.id) {
      this.categoryId = this.$route.query.id
      this.pageTitle = this.editPart.id ? ' 编辑' : '新增'
    } else if (this.categoryIdParent) {
      this.categoryId = this.categoryIdParent
    }
    if (this.readOnly) {
      this.pageTitle = '查看'
    }
    //是否入账检查
    // console.log(this.editPart,'=========');
    if (this.editPart.id) {
      this.isCheckSta = this.editPart.fixAssetSta
      this.formData.isFixAsset = this.editPart.fixAssetSta
    } else {
      this.isCheckSta = this.addTableData
      this.formData.isFixAsset = this.addTableData
    }
    // console.log(this.formData.isFixAsset,'this.formData.isFixAsset======');
    this.isEdit()
  },
  methods: {
    clearDialog() {
      this.editPart = {}
      this.$emit('changeVisible', false)
    },
    isEdit() {
      if (this.editPart && Object.keys(this.editPart).length > 0) {
        this.isDisabled = true
        this.checkStastus = true
        // console.log(this.formData.isFixAsset,'this.formData.isFixAsset--------------');
        this.isCheck = true
      } else {
        this.isDisabled = false
      }
    },
    edit() {
      this.addTableData ? (this.isCheckSta = true) : (this.isCheckSta = false)
      this.isCheck = false
      this.isDisabled = false
    },
    reset() {
      this.formData.sixPartCode = ''
      this.formData.partNameZh = ''
      this.formData.partNameDe = ''
      this.formData.partNameEn = ''
      this.formData.deptCodes = ''
      this.formData.linieNames = ''
    },
    handleCheck() {
      let data = {
        ...this.formData,
        categoryId: this.categoryId,
        isFixAsset: this.formData.isFixAsset,
        checkIsUse: true
      }
      if (this.formData.sixPartCode.length === 6) {
        saveSixParts(data).then((res) => {
          if (res.code == 200) {
            this.submit()
          } else if (res.code == 205) {
            this.$confirm(
              res.desZh + ' 是否继续保存？',
              this.language('提示'),
              {
                confirmButtonText: this.language('确定'),
                cancelButtonText: this.language('取消'),
                type: 'warning'
              }
            )
              .then(() => {
                this.submit()
              })
              .catch(() => {
                this.$emit('changeVisible', false)
              })
          }
        })
      } else {
        iMessage.error('零件六位号输入错误')
      }
    },
    submit() {
      // console.log(this.formData.isFixAsset,'this.formData.isFixAsset=================');
      let data = {
        ...this.formData,
        categoryId: this.categoryId,
        isFixAsset: this.formData.isFixAsset
      }
      if (this.formData.sixPartCode.length === 6) {
        saveSixParts(data)
          .then((res) => {
            if (res.code == 200) {
              this.$emit('changeVisible', false)
              iMessage.success('保存成功')
              this.$emit('initPartMaterialDetail')
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } else {
        iMessage.error('零件六位号输入错误')
      }
    },
    getSixPartsName(event) {
      let id = event.replace(/\s+/g, '')
      if (id.length === 6) {
        getChangeSixParts(id).then((res) => {
          if (res.data !== null) {
            this.formData.partNameZh = res.data.partNameZh
            this.formData.partNameDe = res.data.partNameDe
            this.formData.partNameEn = res.data.partNameEn
            this.formData.linieNames = res.data.linieNames
            // this.formData.isFixAsset = res.data.isFixAsset
            this.formData.deptCodes = res.data.deptCodes
          } else {
            this.formData.partNameZh = ''
            this.formData.partNameDe = ''
            this.formData.partNameEn = ''
            this.formData.linieNames = ''
            this.formData.deptCodes = ''
            // this.formData.isFixAsset = ''
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
/* ::v-deep .el-form {
  width: 80%;
}
::v-deep .el-input .el-input__inner {
  width: 270px;
} */
.button-end {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 20px;
}
/* .selectEntry .el-input .el-input__inner,
.selectEntry .el-form-item__content {
  width: 270px;
} */
</style>
