<template>
  <div>
    <iInput
      v-if="showInput"
      :disabled="filterDisabled"
      @input="handleInput"
      v-model.trim="inputValue"
      @blur="changeFocus(false)"
    />
    <iInput
      v-else
      :disabled="filterDisabled"
      :value="filterValue"
      @focus="changeFocus(true)"
    />
  </div>
</template>

<script>
import { iInput } from 'rise'
import { numberProcessor } from '@/utils'
import { thousands } from 'rise/utils'
export default {
  name: 'thousandsFilterInput',
  components: {
    iInput
  },
  props: {
    inputValue: {
      type: String,
      default: ''
    },
    filterDisabled: {
      type: Boolean,
      default: false
    },
    numProcessor: {
      type: Number,
      default: 2
    },
    handleArg: {
      // 输入之后调用函数的额外参数
      type: Array,
      default: () => []
    }
  },
  computed: {
    filterValue() {
      const value = this.inputValue
      return value ? thousands(value, this.numProcessor) : ''
    }
  },
  data() {
    return {
      showInput: false
    }
  },
  methods: {
    handleInput(value) {
      this.inputValue = numberProcessor(value, this.numProcessor)
      const { handleArg } = this
      this.$emit('handleInput', this.inputValue, ...handleArg)
    },
    changeFocus(value) {
      this.showInput = value
    }
  }
}
</script>

<style>
</style>