<template>
  <iCard :title="language('银行信息')" collapse>
    <div class="actions" slot="header-control">
      <iButton v-show="!editable" @click="editable = true">{{language('编辑')}}</iButton>
      <iButton v-show="editable" @click="save">{{language('保存')}}</iButton>
      <iButton v-show="editable" @click="cancel">{{language('取消')}}</iButton>
    </div>
    <el-form
      label-position="left"
      label-width="130px"
      :model="form"
      :rules="rules"
      ref="ruleForm"
      class="validate-required-form"
    >
      <el-row :gutter="20">
        <el-col :span="6">
          <iFormItem :label="language('银行名称')" prop="materialGroupCode">
            <iInput
              v-model="form.bankName"
              :placeholder="language('请输入')"
              :disabled="!editable"
            />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('银行代码')" prop="materialGroupNameZh">
            <iInput
              v-model="form.bankCode"
              :placeholder="language('请输入')"
              :disabled="!editable"
            />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('银行账号')" prop="materialGroupNameEn">
            <iInput
              v-model="form.bankAccount"
              :placeholder="language('请输入')"
              :disabled="!editable"
            />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('税务代码')" prop="dept">
            <iInput
              v-model="form.bankTaxCode"
              :placeholder="language('请输入')"
              :disabled="!editable"
            />
          </iFormItem>
        </el-col>
        <el-col :span="6">
          <iFormItem :label="language('银行所在地')" prop="rawMaterialCodes">
            <areaSelect
              :countryCode.sync="form.countryCode"
              :cityCode.sync="form.cityCode"
              :provinceCode.sync="form.provinceCode"
              :disabled="!editable"
              @change="areaChange"
            />
          </iFormItem>
        </el-col>

        <!-- <el-col :span="6">
          <iFormItem :label="language('公司代码?')">
            <iInput
              v-model="form.rawMaterialCodes"
              :disabled="!editable"
              :placeholder="language('请输入')"
            />
          </iFormItem>
        </el-col> -->
      </el-row>
    </el-form>
  </iCard>
</template>

<script>
import { iCard, iInput, iFormItem, iButton, iMessage } from 'rise'
import { BANK_FORM } from './data'
import { areaSelect } from '@/components/remoteSelect'
import { updateSupplierBank } from '@/api/mainDataSupplier/list/bank'
export default {
  name: 'theDetailBank',
  components: {
    iCard,
    iInput,
    iFormItem,
    iButton,
    areaSelect
  },
  props: {
    bankForm: {
      type: Object,
      default: () => {
        return {}
      }
    },
    supplierId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: { ...BANK_FORM },
      editable: false,
      originalForm: { ...BANK_FORM },
      rules: {}
    }
  },
  created() {
    this.setForm(this.bankForm)
  },
  watch: {
    bankForm(val) {
      this.setForm(val)
    }
  },
  methods: {
    setForm(val) {
      if (val && Object.keys(val).length) {
        this.form = _.cloneDeep(val)
        this.originalForm = _.cloneDeep(val)
      }
    },
    save() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const params = { supplierId: this.supplierId }
          const data = {
            bankAccount: this.form.bankAccount,
            bankCode: this.form.bankCode,
            bankName: this.form.bankName,
            bankTaxCode: this.form.bankTaxCode,

            addressInfoUpdateVo: {
              addressId: this.form.addressId,
              countryCode: this.form.countryCode,
              provinceCode: this.form.provinceCode,
              cityCode: this.form.cityCode,
              city: this.form.city,
              country: this.form.country,
              province: this.form.province
            }
          }
          updateSupplierBank(params, data)
            .then((res) => {
              if (res.result) {
                iMessage.success(res.desZh || '保存成功')
                this.editable = false
                this.originalForm = _.cloneDeep({
                  ...this.originalForm,
                  ...data
                })
              } else {
                iMessage.error(res.desZh || '保存失败')
              }
            })
            .catch((err) => {
              iMessage.error(err.desZh || '保存失败')
            })
        }
      })
    },
    cancel() {
      this.form = _.cloneDeep(this.originalForm)
      this.editable = false
    },
    areaChange(val, valStrs) {
      console.log('valStrs', valStrs)
      if (valStrs.length > 2) {
        this.form.country = valStrs[0]
        this.form.province = valStrs[1]
        this.form.city = valStrs[2]
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
