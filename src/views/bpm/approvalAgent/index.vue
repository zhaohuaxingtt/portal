<template>
  <iPage class="approval-agent">
    <pageHeader class="margin-bottom20" style="margin-left: -15px">
      <actionHeader />
    </pageHeader>
    <searchForm :data="searchData" @search="search" @reset="reset" />
    <iCard>
      <div class="flex-end-center margin-bottom20">
        <iButton
          @click="
            $router.push({
              path: `/approval/agent/add?type=${agentType}`
            })
          "
        >
          {{ language('新增') }}
        </iButton>
        <iButton :disabled="editButtonDisable" @click="editRow">
          {{ language('编辑') }}
        </iButton>

        <iButton :disabled="cancelButtonDisable" @click="batchInvalidAgent">
          {{ language('失效') }}
        </iButton>
      </div>
      <i-table-custom
        :loading="tableLoading"
        :data="tableData"
        :columns="tableColumns"
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
  </iPage>
</template>

<script>
import { pageMixins } from '@/utils/pageMixins'
import { TABLE_COLUMNS, SEARCH_DATA } from './components/data'
import { iPage, iButton, iCard, iMessage, iPagination } from 'rise'
import searchForm from './components/searchForm'
import pageHeader from '@/components/pageHeader'
import iTableCustom from '@/components/iTableCustom'
import { fetchAgents, batchInvalidAgent } from '@/api/approval/agent'
import { actionHeader } from './components'
export default {
  name: 'approvalAgentIndex',
  mixins: [pageMixins],
  components: {
    iPage,
    iCard,
    iPagination,
    iButton,
    pageHeader,
    searchForm,
    iTableCustom,
    actionHeader
  },
  computed: {
    agentType() {
      if (this.$route.query.type) {
        return this.$route.query.type
      }
      return 'normal'
    },
    editButtonDisable() {
      return (
        this.selectedRows.length !== 1 ||
        (this.selectedRows.length === 1 && !this.selectedRows[0].status)
      )
    },
    cancelButtonDisable() {
      return this.selectedRows.filter((e) => e.status).length === 0
    }
  },
  data() {
    return {
      tableLoading: false,
      tableColumns: TABLE_COLUMNS,
      tableData: [],
      selectedRows: [],
      searchData: {
        ...SEARCH_DATA
      }
    }
  },
  created() {
    this.query()
  },
  methods: {
    search() {
      this.page.currPage = 1
      this.query()
    },
    reset() {
      this.page.currPage = 1
      this.searchData = { ...SEARCH_DATA }
      this.query()
    },
    handleSelectionChange(val) {
      this.selectedRows = val
    },
    editRow() {
      this.openPage(this.selectedRows[0])
    },
    openPage(row) {
      this.$router.push({
        name: 'ApprovalAgentEdit',
        params: { id: row.id },
        query: { type: this.agentType }
      })
    },
    async query() {
      const data = { ...this.searchData }
      data.type = this.agentType === 'normal' ? 2 : 1
      const params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      }
      if (!data.assignee) {
        data.assignee = this.$store.state.permission.userInfo.id
      }

      this.tableLoading = true
      const res = await fetchAgents(params, data).finally(
        () => (this.tableLoading = false)
      )
      const { total, records } = res.data
      this.page.totalCount = total
      this.tableData = records
    },
    async batchInvalidAgent() {
      const ids = this.selectedRows.map((e) => e.id)
      this.tableLoading = true
      const res = await batchInvalidAgent(ids).finally(
        () => (this.tableLoading = false)
      )
      if (res && res.result) {
        this.query()
        iMessage.success(this.language('操作成功'))
      } else {
        iMessage.error(res.desZh || this.language('操作失败'))
      }
    },
    exportData() {}
  }
}
</script>

<style lang="scss" scoped>
.approval-agent {
  position: relative;
}
</style>
