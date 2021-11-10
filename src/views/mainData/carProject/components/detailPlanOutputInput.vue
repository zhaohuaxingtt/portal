<!--
 * @Author: qyu
 * @Date: 2021-08-11 15:49:23
 * @LastEditTime: 2021-08-11 16:22:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mainData\car\components\detailPlanOutputInput.vue
-->
<template>
  <iInput v-model="row.output" ref="outputInput" @focus="outputInputFocus" />
</template>

<script>
import { iInput } from 'rise'
export default {
  name: 'detailPlanOutputInput',
  components: { iInput },
  props: {
    row: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    outputInputFocus() {
      this.$refs.outputInput.select()
    }
  }
}
</script>

<style lang="scss" scoped></style>
