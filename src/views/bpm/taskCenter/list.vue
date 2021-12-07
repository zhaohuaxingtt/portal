<template>
  <div class="i-table-custom">
    <iPage
      class="template"
      :class="{
        'single-choise': true,
        'disable-children-selection': true
      }"
    >
      <pageHeader class="margin-bottom20">
        {{ language('任务管理') }}
      </pageHeader>
      <searchForm :data="searchData" @search="search" @reset="reset" />
      <iCard>
        <div class="flex-end-center margin-bottom20">
          <iButton :disabled="disabled" @click="transfer">
            {{ language('转派') }}
          </iButton>
          <iButton @click="exportData">{{ language('导出') }}</iButton>
        </div>
        <i-table-custom
          :loading="tableLoading"
          :data="tableData"
          :columns="tableColumns"
          ref="listRef"
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
      <transfer
        :visible.sync="visible"
        :task-id="taskId"
        ref="transferRef"
        @success="transferSuccess"
      />
    </iPage>
  </div>
</template>

<script>
import { pageMixins } from '@/utils/pageMixins'
import { excelExport } from '@/utils/filedowLoad'
import { TABLE_COLUMNS, TEST_DATA, SEARCH_DATA } from './components/data'
import { iPage, iButton, iCard, iPagination, iMessage } from 'rise'
import searchForm from './components/searchForm'
import transfer from './components/transfer'
import pageHeader from '@/components/pageHeader'
import iTableCustom from '@/components/iTableCustom'
import { findUndoTask } from '@/api/duty'
export default {
  name: 'TaskList',
  mixins: [pageMixins],
  components: {
    iPage,
    iCard,
    iPagination,
    iButton,
    pageHeader,
    searchForm,
    iTableCustom,
    transfer
  },
  data() {
    return {
      visible: false,
      tableLoading: false,
      tableColumns: TABLE_COLUMNS,
      tableData: TEST_DATA,
      selectedRows: [],
      searchData: { ...SEARCH_DATA },
      taskId: ''
    }
  },
  watch: {
    visible: function (val) {
      !val && this.$refs.listRef.clearSelection()
    }
  },
  computed: {
    userID() {
      return this.$store.state.permission.userInfo.id
    },
    disabled() {
      const bol = this.selectedRows.some((item) => item.status === '已完成')
      return this.selectedRows.length !== 1 || bol
    }
  },
  created() {
    this.searchData.category = this.$route.params.category
    this.query(this.searchData)
  },
  mounted() {
    this.tableData.forEach((item) => {
      item.status = item.status == 0 ? '进行中' : '已完成'
    })
  },
  methods: {
    transfer() {
      this.visible = true
      this.$refs.transferRef.init()
    },
    transferSuccess() {
      this.query(this.searchData)
      this.visible = false
    },
    search(data) {
      this.page.currPage = 1
      this.query(data)
    },
    reset() {
      this.page.currPage = 1
      this.searchData = { ...SEARCH_DATA }
      this.query(this.searchData)
    },
    handleSelectionChange(val) {
      this.selectedRows = val
      if (val.length) this.taskId = val[0].taskId
    },
    openPage() {},
    async query(data) {
      this.tableLoading = true
      let params = {
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
        itemName: data.name,
        category: data.category,
        procStatus: data.status,
        userID: this.userID
      }
      if (data.timeRanges.length) {
        params.startTime = data.timeRanges[0]
        params.endTime = data.timeRanges[1]
      }
      const res = await findUndoTask(params).finally(() => {
        this.tableLoading = false
      })
      this.page.pageSize = res.data.size
      this.page.totalCount = res.data.total
      const records = res.data.records
      records.forEach((item) => {
        item.status = item.status == 0 ? '进行中' : '已完成'
      })
      this.tableData = records
    },
    exportData() {
      if (!this.selectedRows.length)
        return iMessage.warn(this.$t('LK_QINGXUANZHEXUYAODAOCHUSHUJU'))
      const tableColumns = this.tableColumns.map((item) => ({
        props: item.prop,
        name: item.label
      }))
      excelExport(this.selectedRows, tableColumns)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.i-table-custom {
  &.disable-children-selection {
    .row-child {
      .el-table-column--selection {
        .el-checkbox__input.is-disabled {
          display: none;
        }
      }
    }
  }
  .cell-ellipsis {
    .cell.el-tooltip {
      overflow: hidden;
      text-overflow: ellipsis;
      > div {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  &.single-choise {
    thead .el-table-column--selection .cell {
      display: none;
    }
  }
}
</style>
