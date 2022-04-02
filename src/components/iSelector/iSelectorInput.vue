<template>
  <div class="i-selector-input" @click="handleClick">
    <div class="input-wrapper">
      <i-input
        v-model="valueString"
        :placeholder="value.length > 0 ? '' : $t('LK_QINGXUANZE')"
        :readonly="true"
        :disabled="disabled"
      ></i-input>
      <div class="tag-wrapper">
        <el-tag
          :type="'info'"
          class="margin-right10 tag-ellipsis"
          v-if="value && value.length"
        >
          {{ value && value.length ? value[0][tagLabel] : '' }}
        </el-tag>
        <el-tag :type="'info'" v-if="value.length > 1">
          + {{ value.length - 1 }}
        </el-tag>
      </div>
      <i class="el-icon-circle-plus-outline"></i>
    </div>
  </div>
</template>

<script>
import { iInput } from 'rise'
export default {
  components: { iInput },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    singleSelect: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: function () {
        return false
      }
    },
    tagLabel: {
      type: String,
      default: function () {
        return 'label'
      },
      required: true
    },
    value: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      valueString: ''
    }
  },
  watch: {
    value(newValue) {
      this.valueString =
        newValue &&
        newValue
          .map((it) => {
            return it.id
          })
          .join(',')
      if (this.singleSelect) {
        this.valueChange(newValue)
      }
    }
  },
  methods: {
    valueChange(val) {
      this.$emit('value-change', val)
    },
    handleClick() {
      if (!this.disabled) {
        this.$emit('handle-click')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.i-selector-input {
  min-width: 200px;
  .tag-ellipsis {
    white-space: nowrap;
    overflow: hidden;
    vertical-align: middle;
    text-overflow: ellipsis;
    max-width: 100px;
  }
  .input-wrapper {
    position: relative;
    i {
      position: absolute;
      right: 2px;
      color: #cbcbcb;
      font-size: 18px;
      top: 50%;
      transform: translateY(-50%);
    }
    .tag-wrapper {
      position: absolute;
      top: 50%;
      transform: translateY(-54%);
      left: 2px;
    }
  }
}
</style>
<style lang="scss">
.i-selector-input .el-input .el-input__inner {
  color: transparent;
}
</style>
