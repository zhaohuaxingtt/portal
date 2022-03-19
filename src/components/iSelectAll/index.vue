<template>
  <div class="i-select-all-container">
    <iSelect
      :placeholder="language('请选择')"
      multiple
      v-model="selectValue"
      filterable
      style="width: 100%"
      ref="refSelect"
      :filter-method="handleFilter"
      :key="elementKey"
      :disabled="disabled"
      @change="handleChange"
    >
      <div class="option-all">
        <el-Button
          size="mini"
          plain
          @click.native="(event) => checkAll(true, event)"
        >
          全选
        </el-Button>
        <el-Button
          size="mini"
          plain
          @click.native="(event) => checkAll(false, event)"
        >
          全不选
        </el-Button>
      </div>
      <el-option
        v-for="item in selectOptions"
        :key="item[valueKey]"
        :value="item[valueKey]"
        :label="getLabel(item)"
      >
      </el-option>
    </iSelect>
  </div>
</template>

<script>
import { iSelect } from 'rise'
export default {
  name: 'iSelectAll',
  components: { iSelect },
  props: {
    value: {
      default: function () {
        return []
      }
    },
    options: {
      type: Array,
      default: function () {
        return []
      }
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    labelKey: {
      type: String,
      default: 'label'
    },
    labelMethod: {
      type: Function
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      selectValue: [],
      elementKey: 'AA_' + new Date().getTime(),
      filterStr: ''
    }
  },
  computed: {
    selectOptions() {
      const options = this.options || []
      const str = this.filterStr?.toLowerCase()
      if (!str) {
        return options
      }
      return options.filter((item) => {
        return this.getLabel(item)?.toLowerCase().includes(str)
      })
    }
  },
  created() {
    this.selectValue = this.value
  },
  watch: {
    value(val) {
      this.selectValue = val
    }
  },
  methods: {
    getLabel(item) {
      if (this.labelMethod) {
        return this.labelMethod(item)
      }
      return item[this.labelKey]
    },
    checkAll(val, event) {
      event.stopPropagation()
      console.log(val)
      if (val) {
        this.selectValue = this.selectOptions.map((e) => e[this.valueKey])
      } else {
        this.selectValue = []
        this.elementKey = 'AA_' + new Date().getTime()
        // this.$refs.refSelect.deleteSelected(event)
      }
      this.$emit('input', this.selectValue)
      this.$emit('change', this.selectValue)
    },
    handleChange(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    handleFilter(val) {
      this.filterStr = val
      /* console.log(val)
      if (!val) {
        return this.options
      }
      return this.options.splice(0, 2) */
    }
  }
}
</script>

<style lang="scss" scoped>
.i-select-all {
  position: relative;
}
.i-select-all-body {
  position: absolute;
  width: 100%;
}
.option-all {
  border-bottom: solid 1px #eee;
  padding: 0px 10px 10px 10px;
}
</style>
