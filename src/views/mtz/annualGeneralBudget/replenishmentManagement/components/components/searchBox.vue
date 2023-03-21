<template>
  <div class="search" :class="{ hidden: hidens }">
    <div class="search-content">
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
              language(
                'partsprocure.PARTSPROCURE',
                '请输入零件号，多个逗号分隔'
              )
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
            :optionSubLabel="item.optionSubLabel || ''"
            :multiple="item.multiple || false"
            :clearable="item.clearable || false"
            :disabled="item.disabled"
            :showAll="item.showAll || false"
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
            :clearable="item.clearable || false"
            type="date"
            :placeholder="language('QINGXUANZE', '请选择')"
          />
          <iDatePicker
            style="width: 220px"
            v-else-if="item.type == 'daterange'"
            v-model="searchForm[item.props]"
            :disabled="item.disabled"
            type="daterange"
            :clearable="item.clearable || false"
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
      <div class="operation">
        <slot name="button">
          <iButton @click="$emit('sure')">{{ $t('rfq.RFQINQUIRE') }}</iButton>
          <iButton @click="$emit('reset')">{{ $t('rfq.RFQRESET') }}</iButton>
        </slot>
        <i
          @click="toggle"
          class="el-icon-arrow-up icon margin-left20 cursor"
          :class="{ rotate: hidens }"
        ></i>
      </div>
    </div>
  </div>
</template>

<script>
import {
  iInput,
  iSelect,
  iSearch,
  iDatePicker,
  iMultiLineInput,
  iFormGroup,
  iFormItem,
  iButton
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
    thousandsFilterInput,
    iButton
  },
  props: {
    hidens: {
      type: Boolean,
      default: false
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
  },
  created() {
    this.searchFormData.forEach((item) => {
      if (item.showAll) this.searchForm[item.props] = ''
    })
  },
  methods: {
    toggle() {
      this.hidens = !this.hidens
      this.$emit('toggle', this.hidens)
    },
    handleInput(val, prop) {
      this.$set(this.searchForm, prop, val)
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  transition: max-height 0.5s;
  max-height: 500px;
  overflow: hidden;
  &.hidden {
    max-height: 65px;
  }
  .search-content {
    display: inline-flex;
    width: 100%;
    ::v-deep .el-form {
      flex: 1;
    }
    ::v-deep .el-form-item {
      margin-bottom: 2px;
      width: 220px;
      // float: left;
      margin-right: 50px;
      padding-left: 2px;
      padding-top: 5px;
      padding-bottom: 5px;
      flex-direction: column;

      .el-form-item__label {
        font-size: 14px;
        color: $color-black;
        font-weight: 400;
        line-height: 14px;
        margin-bottom: 8px;
      }

      .el-form-item__content {
        line-height: inherit;
      }
    }
    .operation {
      margin-top: 22px;
      position: relative;
      flex: 0 0 auto;
      .icon {
        font-size: 20px;
        color: #d3d3db;
        position: absolute;
        top: -26px;
        right: 0px;
      }
      .rotate {
        transform: rotate(180deg);
        top: -16px;
      }
      button {
        margin-top: 5px;
      }
      .el-icon-arrow-up {
        transition: all 0.5s;
        height: 15px;
      }
    }
  }
}
</style>