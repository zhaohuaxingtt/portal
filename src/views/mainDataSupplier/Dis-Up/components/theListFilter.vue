<template>
  <iSearch @sure="sure" @reset="reset">
    <el-form class="search-form">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('供应商名称')">
            <iInput v-model="form.nameZh" :placeholder="language('请输入')" />
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
          <iFormItem :label="language('正式号')">
            <iInput v-model="form.svwCode" :placeholder="language('请输入')" />
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('SAP号')">
            <iInput v-model="form.sapCode" :placeholder="language('请输入')" />
          </iFormItem>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <iFormItem :label="language('供应商标签')">
            <iSelect
              v-model="form.tagIds"
              :placeholder="language('请选择')"
              multiple
              filterable
              clearable
              collapse-tags
            >
              <el-option
                v-for="item in supplierTypes"
                :key="item.id"
                :value="item.id"
                :label="item.message"
              />
            </iSelect>
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </iSearch>
</template>

<script>
import { iSearch, iInput, iSelect, iFormItem } from 'rise'
import { SUPPLIER_TYPES, FILTER_FORM } from './data'
import {
  dropDownTagName,
} from '@/api/mainDataSupplier/list'
export default {
  name: 'TheListFilter',
  components: { iSearch, iInput, iSelect, iFormItem },
  data() {
    return {
      form: {},
      supplierTypes: []
    }
  },
  created(){
    dropDownTagName({}).then(res=>{
      console.log(res);
      this.supplierTypes = res.data;
    })
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
