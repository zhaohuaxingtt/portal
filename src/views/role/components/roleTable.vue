<template>
  <iCard>
    <div class="flex-end-center margin-bottom20">
      <iButton :disabled="selectedRows.length !== 1" @click="goEditRole">
        {{ language('分配权限') }}
      </iButton>
      <iButton @click="exportRoles" :loading="exportLoading">
        {{ language('导出') }}
      </iButton>
    </div>

    <i-table-custom
      :loading="tableLoading"
      :data="tableData"
      :columns="tableColumns"
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
import { iCard, iPagination, iButton } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { ROLE_COLUMNS } from './data'
import { openUrl } from '@/utils'
import { fetchRoles, downloadRoles } from '@/api/role'
export default {
  name: 'roleTable',
  mixins: [pageMixins],
  components: { iTableCustom, iCard, iPagination, iButton },
  props: {
    filterForm: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      tableData: [],
      tableLoading: false,
      tableColumns: ROLE_COLUMNS,
      selectedRows: [],
      exportLoading: false
    }
  },
  watch: {
    filterForm() {
      this.search()
    }
  },
  created() {
    this.query()
  },
  methods: {
    search() {
      this.page.currPage = 1
      this.page.totalCount = 0
      this.query()
    },
    exportRoles() {
      this.exportLoading = true
      downloadRoles(this.filterForm).finally(() => (this.exportLoading = false))
    },
    async query() {
      const requestData = {
        ...this.filterForm,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      this.tableLoading = true
      const res = await fetchRoles(requestData).finally(
        () => (this.tableLoading = false)
      )
      this.tableData = res.data
      this.page.totalCount = res.total
      this.page.pageSize = res.pageSize
    },
    //表格选中值集
    handleSelectionChange(val) {
      this.selectedRows = val
    },
    handleGoDetail(val) {
      openUrl(`/role/view/${val.id}`)
      // this.$router.push({
      //   name: 'RoleView',
      //   params: {
      //     id: val.id
      //   }
      // })
    },
    goEditRole() {
      this.$router.push({
        name: 'RoleEdit',
        params: {
          id: this.selectedRows[0].id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
