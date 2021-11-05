<!--
 * @Author: your name
 * @Date: 2021-10-06 21:19:28
 * @LastEditTime: 2021-11-02 11:58:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\mtzReplenishmentOverview\index.vue
-->
<template>
  <div>
    <search class="margin-bottom20"
            ref="searchBox"></search>
    <theTable ref="theTable"
              @dialog="handleAdd"></theTable>
    <balancePaymentDialog @close="handleClose"
                          v-if="dialogVisible"
                          :dialogVisible="dialogVisible"
                          :dateSearch="date"
                          :selectData="selectData"
                          :flag="flag"></balancePaymentDialog>
  </div>
</template>

<script>
import { iPage } from 'rise'
import search from './components/search'
import theTable from './components/theTable'
import balancePaymentDialog from './components/balancePaymentDialog'

import { pageMixins } from "@/utils/pageMixins"
export default {
  name: '',
  componentName: "Index",
  components: {
    iPage,
    search,
    theTable,
    balancePaymentDialog
  },
  data () {
    return {
      dialogVisible: false,
      selectData: [],
      flag: false,
      date: ""
    }
  },
  mixins: [pageMixins],
  created () {
  },
  methods: {
    handleAdd (params) {
      this.dialogVisible = params.dialogVisible
      this.selectData = params.selectData
      this.flag = params.flag
      this.date = params.date
    },
    handleClose (val) {
      this.dialogVisible = val
    }
  }
};
</script>

<style scoped>
</style>
