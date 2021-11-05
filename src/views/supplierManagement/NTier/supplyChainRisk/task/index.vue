<template>
  <div class="i-table-custom">
    <iPage class="template" :class="{
        'single-choise': true,
        'disable-children-selection': true
      }">
      <pageHeader class="margin-bottom20">
        {{ $t('APPROVAL.TASK_MANAGER') }}
      </pageHeader>
      <searchForm :data="searchData" @search="search" @reset="reset" />
      <iCard>
        <div class="flex-end-center margin-bottom20">
          <iButton @click="exportData">{{ $t('APPROVAL.EXPORT') }}</iButton>
        </div>
        <i-table-custom :loading="tableLoading" :data="tableData" :columns="tableColumns" ref="listRef" @go-detail="openPage" @handle-selection-change="handleSelectionChange" />
        <iPagination v-update @size-change="handleSizeChange($event, query)" @current-change="handleCurrentChange($event, query)" background :current-page="page.currPage" :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :total="page.totalCount" />
      </iCard>
    </iPage>
  </div>
</template>

<script>
import { pageMixins } from '@/utils/pageMixins'
import { excelExport } from '@/utils/filedowLoad'
import { TABLE_COLUMNS, SEARCH_DATA } from './components/data'
import { iPage, iButton, iCard, iPagination, iMessage } from 'rise'
import searchForm from './components/searchForm'
import pageHeader from '@/components/pageHeader'
import iTableCustom from '@/components/iTableCustom'
import { taskInfoEntity } from "@/api/supplierManagement/supplyChainRisk/index.js";
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
  },
  data() {
    return {
      tableLoading: false,
      tableColumns: TABLE_COLUMNS,
      tableData: [],
      selectedRows: [],
      searchData: { ...SEARCH_DATA },
    }
  },
  watch: {
  },
  computed: {
  },
  created() {
    this.query(this.searchData)
  },
  mounted() {
  },
  methods: {
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
    },
    openPage(val) {
      this.$router.push({ path: '/supplier/NTier/feedback', query: { id: val.businessId } })
    },
    async query(data) {
      this.tableLoading = true
      let params = {
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...data,
      }
      const res = await taskInfoEntity(params).finally(() => {
        this.tableLoading = false
      })
      this.page.pageSize = res.pageSize
      this.page.currPage = res.pageNum
      this.page.totalCount = res.total
      this.tableData = res.data
    },
    exportData() {
      if (!this.selectedRows.length)
        return iMessage.warn(this.$t('LK_QINGXUANZHEXUYAODAOCHUSHUJU'))
      const tableColumns = this.tableColumns.map(item => ({
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
