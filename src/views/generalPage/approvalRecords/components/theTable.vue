<template>
  <div>
    <iCard class="margin-top20">
      <iTableCustom
        ref="termsTable"
        :loading="tableLoading"
        :data="tableListData"
        :columns="tableColumns"
        :extraData="extraData"
        @openPage="openPage"
      />
      <iPagination
        v-update
        @current-change="handleCurrentChange($event)"
        @size-change="handleSizeChange($event)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>
  </div>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import { iCard, iPagination } from 'rise'
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
      // 跳转到 审批中心[我的申请]详情
      console.log('row=>', row)
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
