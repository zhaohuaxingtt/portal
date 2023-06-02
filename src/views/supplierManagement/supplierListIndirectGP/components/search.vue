<template>
  <iSearch v-on="$listeners" v-bind="$attrs">
    <iFormGroup :rules="rules" :model="searchForm">
      <iFormItem
        v-for="(item, index) in searchFormData"
        :key="index"
        :label="language(item.key, item.name)"
        :prop="item.props"
      >
        <iMultiLineInput
          :disabled="item.disabled"
          v-if="item.type == 'iMultiLineInput'"
          :placeholder="$t('PARTSPROCURE',{name: $t(item.titleKey)})"
          :title="$t(item.titleKey) || $t('PART_NO')"
          v-model="searchForm[item.props]"
        ></iMultiLineInput>
        <i-select
          v-else-if="item.type == 'select'"
          v-model="searchForm[item.props]"
          :multiple="item.multiple || false"
          :disabled="item.disabled"
          style="width: 100%"
          filterable
          collapse-tags
          :placeholder="$t('QSR')"
        >
          <el-option
            :label="$t('all')"
            :value="''"
            v-if="item.showAll"
          ></el-option>
          <el-option
            :key="index"
            v-for="(item, index) in options[item.selectOption]"
            :label="$getLabel(item.label, item.labelEn)"
            :value="item.value"
          ></el-option>
        </i-select>
        <el-cascader v-model="searchForm[item.props]" v-else-if="item.type == 'cascader'" :options="options[item.cascaderOption]" clearable></el-cascader>
        <iDatePicker
          v-model="searchForm[item.props]"
          v-else-if="item.type == 'date'"
          :disabled="item.disabled"
          valueFormat="yyyy-MM-dd"
          type="date"
          :placeholder="language('QXZ')"
        />
        <iDatePicker
          style="width: 220px"
          v-else-if="item.type == 'daterange'"
          v-model="searchForm[item.props]"
          :disabled="item.disabled"
          type="daterange"
          :range-separator="$t('ZHI')"
          :start-placeholder="$t('KSRQ')"
          :end-placeholder="$t('JSRQ')"
        >
        </iDatePicker>
        <iInput
          v-else
          :disabled="item.disabled"
          v-model="searchForm[item.props]"
          :placeholder="$t('QSR')"
        ></iInput>
      </iFormItem>
    </iFormGroup>
    <template slot="button">
      <slot name="button"></slot>
    </template>
  </iSearch>
</template>

<script>
import {
  iInput,
  iSelect,
  iButton,
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
    iButton,
    iSearch,
    iDatePicker,
    iMultiLineInput,
    iFormGroup,
    iFormItem
  },
  props: {
    rules: {
      type: Object,
      default: () => ({})
    },
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