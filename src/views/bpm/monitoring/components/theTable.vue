<template>
  <iCard>
    <div class="flex-end-center margin-bottom20">
      <button-download :download-method="exportProcess">
        {{ $t('导出审批流程') }}
      </button-download>
      <button-download :download-method="exportExcel" />
    </div>
    <i-table-custom
      :loading="tableLoading"
      :data="tableData"
      :columns="tableColumns"
      min-height="328px"
      @go-detail="openPage"
      @handle-selection-change="handleSelectionChange"
    />

    <iPagination
      v-update
      @size-change="handleSizeChange($event, query)"
      @current-change="handleCurrentChange($event, query)"
      background
      :current-page="page.currPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.totalCount"
    />
  </iCard>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import { pageMixins } from '@/utils/pageMixins'
import { iCard, iPagination } from 'rise'
import { TABLE_COLUMS } from './data'
import {
  fetchMonitors,
  exportMonitors,
  exportProcessHistorics
} from '@/api/approval/monitor'
import { filterEmptyValue } from '@/utils'
export default {
  name: 'TheBizLogTable',
  mixins: [pageMixins],
  components: { iTableCustom, iCard, iPagination },
  data() {
    return {
      searchData: {},
      tableLoading: false,
      tableData: [],
      tableColumns: TABLE_COLUMS,
      selectedRows: [],
      exportLoading: false,
      exportProcessLoading: false
    }
  },
  created() {
    this.query()
  },
  methods: {
    openPage(item) {
      window.open(
        `/portal/#/bpm/myApply/detail/${item.instanceId}/${
          item.procStatus === 1 ? 'yes' : 'no'
        }`
      )
    },
    exportProcess() {
      return exportProcessHistorics({
        pageSize: 100000,
        ...filterEmptyValue(this.searchData)
      })
    },
    exportExcel() {
      return exportMonitors({
        pageSize: 100000,
        ...filterEmptyValue(this.searchData)
      })
    },
    search(val) {
      this.page.currPage = 1
      this.page.totalCount = 0
      this.searchData = { ...val }
      this.query()
    },
    async query() {
      const requestData = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...filterEmptyValue(this.searchData)
      }
      this.tableLoading = true
      const { data } = await fetchMonitors(requestData).finally(
        () => (this.tableLoading = false)
      )
      this.tableData = data.records || []
      this.page.totalCount = data.total
    },
    handleSelectionChange(val) {
      this.selectedRows = val
    }
  }
}
</script>

<style lang="scss" scoped></style>
