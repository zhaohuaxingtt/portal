<template>
  <iDialog
    :visible.sync="dialogVisible"
    :title="language('工厂信息')"
    width="50%"
    @closed="close"
  >
    <el-form
      label-position="left"
      label-width="130px"
      :model="detail"
      :rules="rules"
      ref="ruleForm"
      class="validate-required-form"
    >
      <iFormItem :label="language('工厂编号')" prop="factoryCode">
        <iInput
          v-model="detail.factoryCode"
          :placeholder="language('请输入')"
          disabled
        />
      </iFormItem>
      <iFormItem :label="language('工厂名称')" prop="factoryName">
        <iInput
          v-model="detail.factoryName"
          :placeholder="language('请输入')"
        />
      </iFormItem>
      <iFormItem :label="language('工厂简称')" prop="factoryAbbrName">
        <iInput
          v-model="detail.factoryAbbrName"
          :placeholder="language('请输入')"
        />
      </iFormItem>
      <iFormItem :label="language('是否定点')" prop="isNominate">
        <iSelect
          v-model="detail.isNominate"
          :placeholder="language('请选择')"
          filterable
        >
          <el-option :value="true" label="是" />
          <el-option :value="false" label="否" />
        </iSelect>
      </iFormItem>
      <iFormItem :label="language('供应商工厂DUNS')">
        <iInput v-model="detail.dunsCode" :placeholder="language('请输入')" />
      </iFormItem>
      <iFormItem :label="language('VW号')" prop="materialGroupCode">
        <iInput v-model="detail.vwCode" :placeholder="language('请输入')" />
      </iFormItem>
      <iFormItem
        :label="language('国家-省份-城市')"
        prop="addressInfoVo.countryCode"
      >
        <areaSelect
          v-if="
            detail.addressInfoVo && Object.keys(detail.addressInfoVo).length
          "
          :countryCode.sync="detail.addressInfoVo.countryCode"
          :provinceCode.sync="detail.addressInfoVo.provinceCode"
          :cityCode.sync="detail.addressInfoVo.cityCode"
          @change="areaChange"
        />
      </iFormItem>
      <iFormItem :label="language('地址')" prop="addressInfoVo.address">
        <iInput
          v-if="
            detail.addressInfoVo && Object.keys(detail.addressInfoVo).length
          "
          v-model="detail.addressInfoVo.address"
          :placeholder="language('请输入')"
        />
      </iFormItem>
    </el-form>
    <div slot="footer">
      <iButton :loading="loading" @click="handleSave">{{
        language('保存')
      }}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iFormItem, iInput, iSelect, iMessage } from 'rise'
import { areaSelect } from '@/components/remoteSelect'
import { updateFactory } from '@/api/mainDataSupplier/list/factory'
export default {
  name: 'theDetailFactoryModify',
  components: { iDialog, iButton, iFormItem, iInput, iSelect, areaSelect },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    detail: {
      type: Object,
      default: function () {
        return {}
      }
    },
    supplierId: {
      type: String,
      default: ''
    },
    dicts: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created() {
    this.setRules()
    this.dialogVisible = this.visible
  },
  watch: {
    visible(val) {
      this.dialogVisible = val
    }
  },
  data() {
    return {
      dialogVisible: false,
      rules: [],
      loading: false
    }
  },
  methods: {
    setRules() {
      const requiredFields = {
        factoryAbbrName: '工厂简称',
        factoryName: '工厂名称',
        'addressInfoVo.countryCode': '国家-省份-城市',
        'addressInfoVo.address': '地址'
      }
      const rules = {}
      for (const key in requiredFields) {
        if (Object.hasOwnProperty.call(requiredFields, key)) {
          const element = requiredFields[key]
          rules[key] = [
            {
              required: true,
              message: element + '必填',
              trigger: 'blur'
            }
          ]
        }
      }
      this.rules = rules
    },
    close() {
      this.$emit('update:visible', false)
    },
    handleSave() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.save()
        }
      })
    },
    save() {
      const params = {
        supplierId: this.supplierId,
        plantId: this.detail.id
      }
      const data = this.detail
      const addressInfoVo = { ...data.addressInfoVo }
      data.addressInfoUpdateVo = {
        ...addressInfoVo,
        addressId: addressInfoVo.id
      }

      this.loading = true
      updateFactory(params, data)
        .then((res) => {
          if (res.result) {
            iMessage.success(res.dscZh || '保存成功')
            this.$emit('save-success', data)
            this.dialogVisible = false
          } else {
            iMessage.error(res.dscZh || '保存失败')
          }
        })
        .catch((err) => {
          iMessage.error(err.dscZh || '保存失败')
        })
        .finally(() => (this.loading = false))
    },
    areaChange(val, valStrs) {
      if (valStrs.length > 2) {
        this.detail.addressInfoVo.country = valStrs[0]
        this.detail.addressInfoVo.province = valStrs[1]
        this.detail.addressInfoVo.city = valStrs[2]
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
