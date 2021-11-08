<template>
  <div class="org-select">
    <span class="org-select-icon">
      <icon symbol name="iconshaixuankuangsousuo" class="i-icon" />
    </span>
    <iSelect
      v-model="id"
      filterable
      remote
      reserve-keyword
      placeholder="输入关键词搜索"
      :remote-method="queryOptions"
      :loading="loading"
      :disabled="disabled"
      :multiple="multiple"
      clearable
      @change="handleChange"
    >
      <el-option
        v-for="item in options"
        :key="item.id"
        :label="item.nameZh"
        :value="item.id"
      >
      </el-option>
    </iSelect>
  </div>
</template>

<script>
import { iSelect, Icon } from 'rise'
import { getDeptDropDownList } from '@/api/authorityMgmt'
export default {
  name: 'orgSearch',
  components: { iSelect, Icon },
  props: {
    value: {
      type: String,
      default: ''
    },
    defaultOptions: {
      type: Array,
      default: function() {
        return []
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      id: '',
      options: [],
      loading: false
    }
  },
  watch: {
    value(val) {
      this.id = val
    },
    defaultOptions() {
      if (this.defaultOptions && this.defaultOptions.length > 0) {
        this.options = this.defaultOptions
      }
    }
  },
  created() {
    this.userId = this.value
    if (this.defaultOptions && this.defaultOptions.length > 0) {
      this.options = this.defaultOptions
    }
  },
  methods: {
    async queryOptions(queryString) {
      if (queryString) {
        this.loading = true
        const queryData = {
          searchInfo: queryString
        }
        const { data } = await getDeptDropDownList(queryData).finally(
          () => (this.loading = false)
        )
        this.options = data
      } else {
        this.options = []
      }
    },
    handleChange(val) {
      this.$emit('input', val)
      this.$emit('change', val, this.options)
    }
  }
}
</script>

<style lang="scss" scoped>
.org-select {
  position: relative;
  display: inline;
  .org-select-icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    z-index: 1;
    font-size: 18px;
    .icon {
      font-size: 16px;
    }
    user-select: none;
  }
  ::v-deep .el-input__suffix {
    z-index: 2;
    right: 25px;
  }
}
</style>
