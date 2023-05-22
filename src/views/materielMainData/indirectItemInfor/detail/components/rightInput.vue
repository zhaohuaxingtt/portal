<template>
  <div>
    <iInput placeholder="请输入数字" type="number" v-model="row.numeratorValue">
      <span slot="append" style="color: black">{{
        language(extraData.materielUnit)
      }}</span>
    </iInput>
  </div>
</template>

<script>
import { iInput } from 'rise'
export default {
  components: { iInput },
  props: {
    row: {
      type: Object,
      default: function () {
        return {}
      }
    },
    extraData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      inputItem: ''
    }
  },
  methods: {
    number() {
      this.$emit('number', this.inputItem)
    }
  }
}
</script>

<style>
</style>