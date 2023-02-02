<template>
  <iSearch v-on="$listeners" v-bind="$attrs">
    <iFormGroup>
      <iFormItem
        v-for="(item, index) in searchFormData"
        :key="index"
        :label="language(item.key, item.name)"
      >
        <iMultiLineInput
          :disabled="item.disabled"
          v-if="item.type == 'iMultiLineInput'"
          :placeholder="
            language('partsprocure.PARTSPROCURE', '请输入零件号，多个逗号分隔')
          "
          :title="language('LK_LINGJIANHAO', '零件号')"
          v-model="searchForm[item.props]"
        ></iMultiLineInput>
        <mySelect
          v-else-if="item.type == 'select'"
          :value.sync="searchForm[item.props]"
          :data="options[item.selectOption]"
          :optionLabel="item.optionLabel || 'label'"
          :optionValue="item.optionValue || 'value'"
          :optionLabelEn="item.optionLabelEn || 'labelEn'"
          :multiple="item.multiple || false"
          :clearable="item.clearable || false"
          :disabled="item.disabled"
          :showAll="item.showAll||false"
          style="width: 100%"
          filterable
          collapse-tags
          :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
        >
        </mySelect>
        <iDatePicker
          v-model="searchForm[item.props]"
          v-else-if="item.type == 'date'"
          :disabled="item.disabled"
          valueFormat="yyyy-MM-dd"
          type="date"
          :placeholder="language('QINGXUANZE', '请选择')"
        />
        <iDatePicker
          style="width: 220px"
          v-else-if="item.type == 'daterange'"
          v-model="searchForm[item.props]"
          :disabled="item.disabled"
          type="daterange"
          :range-separator="$t('至')"
          :start-placeholder="$t('开始日期')"
          :end-placeholder="$t('结束日期')"
        >
        </iDatePicker>
        <thousandsFilterInput
          v-else-if="item.type == 'thousands'"
          @handleInput="handleInput"
          :inputValue.sync="searchForm[item.props]"
          :numberProcessor="item.numberProcessor || 2"
          :handleArg="[item.props]"
          :filterDisabled="item.disabled"
        />
        <iInput
          v-else
          :disabled="item.disabled"
          v-model="searchForm[item.props]"
          :placeholder="$t('staffManagement.INPUT_PLACEHOLDER')"
        ></iInput>
      </iFormItem>
    </iFormGroup>
    <template #button>
      <slot name="button"></slot>
    </template>
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
import mySelect from '@/components/mySelect'
import thousandsFilterInput from './thousandsFilterInput'
export default {
  components: {
    iInput,
    iSelect,
    iSearch,
    iDatePicker,
    iMultiLineInput,
    iFormGroup,
    iFormItem,
    mySelect,
    thousandsFilterInput
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
  },
  methods: {
    handleInput(val, prop) {
      this.$set(this.searchForm, prop, val)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  flex-direction: column;
}
</style>