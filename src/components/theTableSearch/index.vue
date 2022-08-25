<!--
 * @Author: moxuan
 * @LastEditors: Please set LastEditors
 * @Description: 表格常用搜索头部
-->
<template>
  <iSearch @reset="handleSearchReset" @sure="getTableList" :icon="true">
    <el-form>
      <el-form-item
          v-for="item of tableSearchProps"
          :label="item.labelLanguageKey ? language(item.labelLanguageKey,item.label) : item.label"
          :key="item.props">
        <!--输入框-->
        <template v-if="item.type === 'input'">
          <iInput
              v-model="form[item.props]"
              :placeholder="item.placeholderLanguageKey ? language(item.placeholderLanguageKey,item.placeholder) : item.placeholder"
          />
        </template>
        <!--时间范围选择年月日-->
        <template v-else-if="item.type === 'dateRangeYMD'">
          <iDatePicker
              v-model="form[item.props]"
              type="daterange"
              value-format="yyyy-MM-dd"
          />
        </template>
        <!--下拉框-->
        <template v-else-if="item.type === 'select'">
          <iSelect
              v-model="form[item.props]"
              :placeholder="item.placeholder"
              collapse-tags
              clearable
              filterable
              :style="{width: item.width ? item.width + 'px' : 'auto'}"
          >
            <template v-if="item.select.notAnObject">
              <el-option
                  v-for="itemOptionsChildren of item.select.options"
                  :value="itemOptionsChildren"
                  :label="itemOptionsChildren"
                  :key="itemOptionsChildren"/>
            </template>
            <template v-else>
              <el-option
                  v-for="itemOptionsChildren of item.select.options"
                  :value="itemOptionsChildren[item.select.value]"
                  :label="itemOptionsChildren[item.select.label]"
                  :key="itemOptionsChildren[item.select.key]"/>
            </template>
          </iSelect>
        </template>
        <iMultiLineInput
          v-else-if="item.type === 'iMultiLineInput'"
          :placeholder="language('partsprocure.PARTSPROCURE','请输入零件号，多个逗号分隔')"
          :title="language('partsprocure.PARTSPROCUREPARTNUMBER','零件号')"
          v-model="form[item.props]"
        ></iMultiLineInput>
      </el-form-item>
    </el-form>
  </iSearch>
</template>

<script>
// tableSearchProps 表格属性数组
// type 类型 (input, dateRangeYMD, select )
// props 属性
// placeholder 提示文字
// placeholderLanguageKey 国际化提示文字key
// labelLanguageKey 国际化名称key
// label 名称

//select 相关配置
/*
select: {
    options: [],
    key: '',
    value: '',
    label: '',
    notAnObject  可选项，不是对象形式
},
*/
import {iSearch, iInput, iDatePicker, iSelect, iMultiLineInput} from 'rise';

export default {
  components: {
    iSearch,
    iInput,
    iDatePicker,
    iSelect,
    iMultiLineInput
  },
  props: {
    tableSearchProps: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      form: {},
    };
  },
  methods: {
    handleSearchReset() {
      this.form = {};
      this.getTableList();
      this.$emit('handleSearchReset')
    },
    getTableList() {
      this.$emit('getTableList', this.form);
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-form-item__label {
  margin-bottom: 16px !important;
}
</style>
