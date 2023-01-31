<!--
 * @Author: YoHo
 * @Date: 2023-01-18 09:20:00
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipSupplementaryList\components\tabs1.vue
-->
<template>
  <div>
    <tableList
      class="margin-top20"
      :selection="false"
      :tableData="tableListData"
      :tableTitle="tableTitle"
      :tableLoading="loading"
      max-height="400px"
      :index="true"
    >
    </tableList>
    <iPagination
      v-update
      class="padding-bottom20"
      @size-change="handleSizeChange($event, getList)"
      @current-change="handleCurrentChange($event, getList)"
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
import { tableTitleOverview } from './data'
import tableList from '@/components/commonTable/index.vue'
import { pageMixins } from '@/utils/pageMixins'
export default {
  name: 'tabs1',
  mixins: [pageMixins],
  components: {
    tableList,
    iPagination
  },
  props: ['tableListData'],
  data() {
    return {
      loading: false,
      tableTitle: tableTitleOverview
    }
  },
  methods: {
    getList() {
      this.$emit('getTableData')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>