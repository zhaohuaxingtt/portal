<template>
  <iCard>
    <div class="flex-end-center margin-bottom20">
      <iButton @click="operate">
        {{ language('审批流操作') }}
      </iButton>
      <iButton
        :disabled="selectedRows.length === 0"
        :loading="retryLoading"
        @click="retry"
      >
        {{ language('重试') }}
      </iButton>
      <button-download :download-method="exportProcess">
        {{ language('导出审批流程') }}
      </button-download>
      <button-download :download-method="exportExcel" />
    </div>
    <i-table-custom
      :loading="tableLoading"
      :data="tableData"
      :columns="tableColumns"
      min-height="328px"
      custom-selection
      @go-detail="openPage"
      @go-template="openTemplage"
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
import { iCard, iPagination, iButton, iMessage } from 'rise'
import { TABLE_COLUMS } from './data'
import {
  fetchMonitors,
  exportMonitors,
  exportProcessHistorics,
  retryAssign
} from '@/api/approval/monitor'
import { filterEmptyValue } from '@/utils'
export default {
  name: 'TheBizLogTable',
  mixins: [pageMixins],
  components: { iTableCustom, iCard, iPagination, iButton },
  data() {
    return {
      searchData: {},
      tableLoading: false,
      tableData: [],
      tableColumns: TABLE_COLUMS,
      selectedRows: [],
      retryLoading: false
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
    openTemplage(item) {
      window.open(`/portal/#/bpm/template/detail/${item.modelNo}`)
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
      const tableData = data.records || []
      this.tableData = tableData.map((e) => {
        return { ...e, checked: false, disabledChecked: e.procStatus !== 30 }
      })
      this.page.totalCount = data.total
    },
    handleSelectionChange(val) {
      this.selectedRows = val
    },
    // approveTheFlowAction
    operate(){
      if(this.selectedRows.length!=1) return iMessage.warn('请选择一条数据')
      let router = this.$router.resolve({
        path: '/processOperation',
        query: {
          businessId: this.selectedRows[0].businessId,
          processInstanceId: this.selectedRows[0].instanceId,
        }
      })
      window.open(router.href, '_blank')
    },
    retry() {
      const data = this.selectedRows.map((e) => e.instanceId)
      this.retryLoading = true
      // retryAssign(data).finally(() => (this.retryLoading = false))
      retryAssign(data)
        .then((res) => {
          if (res.result) {
            // iMessage.success(res.desZh || this.language('已重试'))
            this.query()
          } else {
            // iMessage.error(res.desZh || this.language('重试失败'))
          }
        })
        .catch((err) => {
          // iMessage.error(err.desZh || this.language('重试失败'))
        })
        .finally(() => (this.retryLoading = false))
    }
  }
}
</script>

<style lang="scss" scoped></style>
