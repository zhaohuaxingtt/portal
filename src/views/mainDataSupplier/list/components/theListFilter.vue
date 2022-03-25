<template>
  <iSearch @sure="sure" @reset="reset">
    <el-form class="search-form">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('供应商中文名称')">
            <iInput v-model="form.nameZh" :placeholder="language('请输入')" />
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('供应商英文名称')">
            <iInput v-model="form.nameEn" :placeholder="language('请输入')" />
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('DUNS')">
            <iInput v-model="form.dunsCode" :placeholder="language('请输入')" />
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('供应商类型')">
            <iSelect
              v-model="form.supplierType"
              :placeholder="language('请选择')"
            >
              <el-option
                v-for="item in supplierTypes"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('业务类型')">
            <iSelect
              v-model="form.gpBusinessType"
              :placeholder="language('请选择')"
            >
              <el-option
                v-for="item in businessTypeList"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              />
            </iSelect>
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('临时号')">
            <iInput
              v-model="form.svwTempCode"
              :placeholder="language('请输入')"
            />
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('正式/SVW号')">
            <iInput v-model="form.svwCode" :placeholder="language('请输入')" />
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('SAP号')">
            <iInput v-model="form.sapCode" :placeholder="language('请输入')" />
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('VW号')">
            <iInput v-model="form.vmCode" :placeholder="language('请输入')" />
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('统一社会信用代码')">
            <iInput
              v-model="form.socialcreditNo"
              :placeholder="language('请输入')"
            />
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iInput, iSelect, iFormItem } from 'rise'
import { SUPPLIER_TYPES, FILTER_FORM,businessTypeList } from './data'
export default {
  name: 'TheListFilter',
  components: { iSearch, iInput, iSelect, iFormItem },
  data() {
    return {
      form: { ...FILTER_FORM },
      supplierTypes: SUPPLIER_TYPES,
      businessTypeList:businessTypeList,
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
