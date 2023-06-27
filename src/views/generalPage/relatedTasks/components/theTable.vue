<template>
  <div>
    <iCard class="margin-top20">
      <iTableCustom
        :data="tableListData"
        :columns="tableColumns"
        :loading="tableLoading"
        :extraData="extraData"
        :index="true"
        border
        @openPage="openPage"
      />
      <iPagination
        @size-change="handleSizeChange($event)"
        @current-change="handleCurrentChange($event)"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :current-page="page.currPage"
        :total="page.totalCount"
        :layout="page.layout"
      />
    </iCard>
  </div>
</template>

<script>
import { iCard, iTableCustom, iPagination } from 'rise'
import { tableColumns } from './data'

export default {
  components: {
    iCard,
    iPagination,
    iTableCustom
  },
  props: {
    tableListData: {
      type: Array,
      default: () => {
        return []
      }
    },
    extraData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    page: {
      type: Object,
      default: () => {
        return {}
      }
    },
    tableLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableColumns
    }
  },
  methods: {
    handleCurrentChange(e) {
      this.$emit('handleChangePage', e)
    },
    handleSizeChange(e) {
      this.$emit('handleSizeChange', e)
    },
    openPage(row) {
      // /bpm/myApply/detail/:instanceId/:finished/:queryData //我的申请任务详情
      console.log('row=>', row)
      window.open(
        `/portal/#/bpm/myApply/detail/${row.taskId}/${
          row.processingStatus === 1 ? 'yes' : 'no'
        }`
      )
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .customer-table th {
  border: none;
}
::v-deep .customer-table td,
.customer-table th.is-leaf {
  border: none;
}
::v-deep .el-table--border,
.el-table--group {
  border: none;
}
::v-deep .customer-table thead tr th.is-leaf {
  border: 1px solid #ebeef5;
  border-right: none;
}
::v-deep .customer-table thead tr th:nth-last-of-type(2) {
  border-right: 1px solid #ebeef5;
}
::v-deep .el-table--border::after,
.el-table--group::after {
  width: 0;
}
::v-deep .customer-table::before {
  width: 0;
}
::v-deep .customer-table .el-table__fixed-right::before,
.el-table__fixed::before {
  width: 0;
}
::v-deep .el-table--border th.gutter:last-of-type {
  border: 1px solid #ebeef5;
  border-left: none;
}
</style>
