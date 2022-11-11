<template>
  <iSearch v-on="$listeners">
    <iFormGroup>
      <iFormItem
        v-for="(item, index) in searchFormData"
        :key="index"
        :label="language(item.key, item.name)"
      >
        <iMultiLineInput
          v-if="item.type == 'iMultiLineInput'"
          :placeholder="
            language('partsprocure.PARTSPROCURE', '请输入零件号，多个逗号分隔')
          "
          :title="language('LK_LINGJIANHAO', '零件号')"
          v-model="searchForm[item.props]"
        ></iMultiLineInput>
        <i-select
          v-else-if="item.type == 'select'"
          v-model="searchForm[item.props]"
          :multiple="item.multiple || false"
          style="width: 100%"
          filterable
          collapse-tags
          :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
        >
          <el-option
            :label="language('all', '全部')"
            :value="''"
            v-if="item.showAll"
          ></el-option>
          <el-option
            :key="index"
            v-for="(item, index) in options[item.selectOption]"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </i-select>
        <iDatePicker
          v-model="searchForm[item.props]"
          v-else-if="item.type == 'date'"
          valueFormat="yyyy-MM-dd"
          type="date"
          :placeholder="language('QINGXUANZE', '请选择')"
        />
        <iDatePicker
          style="width: 220px"
          v-else-if="item.type == 'daterange'"
          v-model="searchForm[item.props]"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </iDatePicker>
        <iInput
          v-else
          v-model="searchForm[item.props]"
          :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
        ></iInput>
      </iFormItem>
    </iFormGroup>
  </iSearch>
</template>

<script>
import {
  iInput,
  iSelect,
  iSearch,
  iDatePicker,
  iMultiLineInput,
  iFormGroup,
  iFormItem
} from 'rise'
export default {
  components: {
    iInput,
    iSelect,
    iSearch,
    iDatePicker,
    iMultiLineInput,
    iFormGroup,
    iFormItem
  },
  props: {
    searchFormData: {
      type: Array,
      default: () => []
    },
    searchForm: {
      type: Object,
      default: () => ({})
    },
    options: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  flex-direction: column;
}
</style>