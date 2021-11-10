<template>
  <iCard>
    <div class="flex-end-center margin-bottom20">
      <button-download :download-method="exportExcel" />
    </div>
    <i-table-custom
      :loading="tableLoading"
      :data="tableData"
      :columns="tableColumns"
      min-height="328px"
      @go-detail="handleGoDetail"
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
import { fetchBizLog, exportBizLog } from '@/api/biz/log'
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
      exportLoading: false
    }
  },
  created() {
    this.query()
  },
  methods: {
    exportExcel() {
      return exportBizLog({ extendFields: this.searchData })
    },
    search(val) {
      this.page.currPage = 1
      this.page.totalCount = 0
      this.searchData = { ...val }
      this.query()
    },
    async query() {
      const requestData = {
        current: this.page.currPage - 1,
        size: this.page.pageSize,
        extendFields: this.searchData
      }
      this.tableLoading = true
      const res = await fetchBizLog(requestData).finally(
        () => (this.tableLoading = false)
      )
      this.tableData = res.content || []
      this.page.totalCount = res.total
    }
  }
}
</script>

<style lang="scss" scoped></style>
