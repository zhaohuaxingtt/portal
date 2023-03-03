<!--
 * @Author: YoHo
 * @Date: 2023-01-18 09:20:00
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipSupplementaryList\components\tabs2.vue
-->
<template>
  <div>
    <tableList
      class="margin-top20"
      :selection="false"
      :tableData="tableData"
      :tableTitle="tableTitle"
      max-height="400px"
      :index="true"
    >
      <template #primarySupplierName="scope">
        {{ scope.row.primarySupplierSapCode }} -
        {{ scope.row.primarySupplierName }}
      </template>
      <template #secondSupplierName="scope">
        {{ scope.row.secondSupplierSapCode }} -
        {{ scope.row.secondSupplierName }}
      </template>
      <template #makeAmount="scope">
        {{ formatterNumber(scope.row.makeAmount) }}
      </template>
      <template #requestAmount="scope">
        {{ formatterNumber(scope.row.requestAmount) }}
      </template>
      <template #approveAmount="scope">
        {{ formatterNumber(scope.row.approveAmount) }}
      </template>
    </tableList>
    <iPagination
      v-update
      class="padding-bottom20"
      @size-change="sizeChange"
      @current-change="currentChange"
      background
      :current-page="page.currPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.totalCount"
    >
    </iPagination>
  </div>
</template>

<script>
import { iPagination } from 'rise'
import { tableTitleDetail } from './data'
import tableList from '@/components/commonTable/index.vue'

export default {
  name: 'tabs2',
  components: {
    tableList,
    iPagination
  },
  props: ['tableListData'],
  data() {
    return {
      tableTitle: tableTitleDetail,
      page: {
        totalCount: 0,
        pageSize: 10, //每页多少条
        pageSizes: [10, 20, 50, 100], //每页条数切换
        currPage: 1, //当前页
        layout: 'sizes, prev, pager, next, jumper'
      },
    }
  },
  computed:{
    tablePageData() {
      return _.chunk(this.tableListData, this.page.pageSize)
    },
    tableData() {
      return this.tablePageData[this.page.currPage - 1] || []
    },
  },
  watch:{
    tableListData(val){
      this.page.totalCount = val.length
    }
  },
  methods: {
    formatterNumber(cellValue) {
      return VueUtil.formatNumber(cellValue)
    },
    sizeChange(val) {
      this.page.currPage = 1
      this.page.pageSize = val
    },
    currentChange(val) {
      this.page.currPage = val
    },
  }
}
</script>

<style lang="scss" scoped>
</style>