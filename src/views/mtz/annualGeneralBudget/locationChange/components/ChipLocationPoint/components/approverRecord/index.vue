<!--
 * @Author: your name
 * @Date: 2021-11-01 14:43:37
 * @LastEditTime: 2021-11-02 15:43:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\approverRecord\index.vue
-->

<template>
  <iPage>
    <approveTable v-bind="$attrs"></approveTable>
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import approveTable from './components/approveTable'
export default {
  components: {
    iPage,
    approveTable
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>

<style lang='scss' scoped>
</style>
