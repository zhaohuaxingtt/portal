<template>
  <iSearch @sure="sure" @reset="reset">
    <el-form class="search-form">
      <el-row :gutter="20">
        <el-col :span="8">
          <iFormItem :label="$t('供应商中文名称')">
            <iInput v-model="form.nameZh" :placeholder="$t('请输入')" />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('供应商英文名称')">
            <iInput v-model="form.nameEn" :placeholder="$t('请输入')" />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('DUNS')">
            <iInput v-model="form.dunsCode" :placeholder="$t('请输入')" />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('供应商类型')">
            <iSelect v-model="form.supplierType" :placeholder="$t('请选择')">
              <el-option
                v-for="item in supplierTypes"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('临时号')">
            <iInput v-model="form.svwTempCode" :placeholder="$t('请输入')" />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('SVW号')">
            <iInput v-model="form.svwCode" :placeholder="$t('请输入')" />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('SAP号')">
            <iInput v-model="form.sapCode" :placeholder="$t('请输入')" />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('VW号')">
            <iInput v-model="form.vmCode" :placeholder="$t('请输入')" />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="$t('统一社会信用代码')">
            <iInput v-model="form.socialcreditNo" :placeholder="$t('请输入')" />
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iInput, iSelect, iFormItem } from 'rise'
import { SUPPLIER_TYPES, FILTER_FORM } from './data'
export default {
  name: 'TheListFilter',
  components: { iSearch, iInput, iSelect, iFormItem },
  data() {
    return {
      form: { ...FILTER_FORM },
      supplierTypes: SUPPLIER_TYPES
    }
  },
  methods: {
    reset() {
      this.form = { ...FILTER_FORM }
      this.sure()
    },
    sure() {
      this.$emit('search', this.form)
    }
  }
}
</script>

<style lang="scss" scoped></style>
