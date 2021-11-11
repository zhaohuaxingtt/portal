<!--
 * @Author: your name
 * @Date: 2021-10-07 15:05:40
 * @LastEditTime: 2021-10-16 15:28:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\vwptUploadQuantity\index.vue
-->
<template>
  <div>
    <iSearch @reset="handleSearchReset" @sure="handleSubmitSearch">
      <el-form :model="searchForm">
        <el-form-item 
        :label="language('CAIGOUPINGZHENG', '采购凭证')">
          <iInput v-model="searchForm.purchaseVoucher" :placeholder="language('请输入', 'QINGSHURU')"></iInput>
        </el-form-item>
        <el-form-item 
        :label="language('ERCILINGJIANHAO', '二次零件号')">
          <iInput v-model="searchForm.secPartNo" :placeholder="language('请输入', 'QINGSHURU')"></iInput>
        </el-form-item>
        <el-form-item 
        :label="language('ZCGYSSAPH', '总成供应商SAP号')">
          <iInput v-model="searchForm.supplier" :placeholder="language('请输入', 'QINGSHURU')"></iInput>
        </el-form-item>
        <el-form-item 
        :label="language('ERCIJIANSHOUHUORIQI', '二次件收货日期')">
          <iDatePicker v-model="searchForm.secReceiptDate" valueFormat="yyyy-MM-dd" type="daterange"></iDatePicker>
        </el-form-item>
      </el-form>
    </iSearch>
    <theTable class="margin-top20" ref="theTable"/>
  </div>
</template>

<script>
import { iSearch, iInput, iDatePicker } from 'rise'
import theTable from './components/theTable';
export default {
  components: {
    theTable,
    iSearch,
    iInput,
    iDatePicker
  },
  data() {
    return {
      searchForm: {}
    }
  },
  methods: {
    // 重置
    handleSearchReset() {
      this.searchForm = {}
      this.$refs.theTable.searchForm = this.searchForm
      this.$refs.theTable.page.pageSize = 10
      this.handleSubmitSearch()
    },
    // 查询
    handleSubmitSearch() {
      this.$refs.theTable.page.currPage = 1
      this.$refs.theTable.searchForm = this.searchForm
      this.$refs.theTable.getTableList()
    }
  },
};
</script>

<style scoped>

</style>
