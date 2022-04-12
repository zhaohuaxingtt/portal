<template>
  <iSearch class="margin-bottom20" :icon="true" @sure="search" @reset="reset">
    <el-form
      label-width="120px"
      style="margin-top: 22px; margin-right: 30px"
      class="validate-required-form"
    >
      <el-row :gutter="30">
        <el-col :span="8">
          <iFormItem :label="language('源货币编码')" style="width: 100%">
            <iInput
              v-model="formContent.originCurrencyCode"
              :placeholder="language('请输入')"
            />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="language('目标货币编码')" style="width: 100%">
            <iInput
              v-model="formContent.currencyCode"
              :placeholder="language('请输入')"
            />
          </iFormItem>
        </el-col>
        <el-col :span="8">
          <iFormItem :label="language('汇率类型')" style="width: 100%">
            <iSelect
              v-model="formContent.type"
              :placeholder="language('请选择')"
            >
              <el-option
                v-for="item in paritiesType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </iSelect>
          </iFormItem>
        </el-col>
      </el-row>
    </el-form>
  </iSearch>
</template>

<script>
import { iFormItem, iInput, iSelect, iSearch } from 'rise'
export default {
  name: 'theListPanel',
  components: { iFormItem, iInput, iSelect, iSearch },
  props: {},
  data() {
    return {
      paritiesType: [
        {
          label: '项目汇率',
          value: 1
        },
        {
          label: 'SAP汇率',
          value: 0
        }
      ],
      formContent: {
        currencyCode: '',
        originCurrencyCode: '',
        type: ''
      }
    }
  },
  methods: {
    search() {
      this.$emit('search', this.formContent)
    },
    reset() {
      this.formContent = {
        currencyCode: '',
        originCurrencyCode: '',
        type: ''
      }
      this.search()
    }
  }
}
</script>

<style>
.iSearch-content .serch[data-v-b21c60c2] .el-form-item .el-form-item__label {
}
</style>
