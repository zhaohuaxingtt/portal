<template>
  <iCard class="margin-top20">
    <div class="flex-end-center margin-bottom20">
      <iButton :disabled="selectedRows.length !== 1" @click="edit">
        {{ language('编辑') }}
      </iButton>
      <iButton :disabled="!selectedRows.length" @click="handleDelete">
        {{ language('删除') }}
      </iButton>
      <button-download :download-method="handleExport" />
    </div>
    <i-table-custom
      permissionKey="PORTAL_MAIN_DATA_SUPPLIER_TABLE"
      :loading="tableLoading"
      :data="tableData"
      :columns="tableColumns"
      :extra-data="extraData"
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
import { iCard, iPagination, iButton, iMessage } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import deleteMixin from '@/mixins/deleteMixin'
import {
  fetchSuppliers,
  exportSupplier,
  deleteSupplier
} from '@/api/mainDataSupplier/list'
import { SUPPLIER_TABLE_COLUMNS, SUPPLIER_TYPES } from './data'
import { arrayToMap } from '@/utils'

export default {
  name: 'theListTable',
  components: { iTableCustom, iCard, iPagination, iButton },
  mixins: [pageMixins, deleteMixin],
  data() {
    return {
      searchData: {},
      tableLoading: false,
      tableData: [],
      tableColumns: SUPPLIER_TABLE_COLUMNS,
      selectedRows: [],
      detailUrl: '/portal/#/mainDataSupplier/list/detail',

      extraData: {
        supplierTypeMap: arrayToMap(SUPPLIER_TYPES, 'value', 'label')
      }
    }
  },
  created() {
    this.query()
  },
  methods: {
    edit() {
      const { id } = this.selectedRows[0]
      window.open(`${this.detailUrl}?id=${id}`)
    },
    handleDelete() {
      this.onDelete().then(() => {
        const data = this.selectedRows
        deleteSupplier(data[0])
          .then((res) => {
            if (res.result) {
              iMessage.success(res.dscZh || '删除成功')
              this.query()
            } else {
              iMessage.error(res.dscZh || '删除失败')
            }
          })
          .catch((err) => {
            iMessage.error(err.dscZh || '删除失败')
          })
      })
    },
    handleExport() {
      return exportSupplier(this.searchData)
    },
    handleGoDetail(row) {
      window.open(`${this.detailUrl}?id=${row.id}`)
    },
    handleSelectionChange(val) {
      this.selectedRows = val
    },
    search(val) {
      this.page.currPage = 1
      this.page.totalCount = 0
      this.searchData = { ...val }
      this.query()
    },
    async query() {
      const requestData = {
        ...this.searchData,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      this.tableLoading = true
      const res = await fetchSuppliers(requestData).finally(
        () => (this.tableLoading = false)
      )
      this.tableData = res.data || []
      this.page.totalCount = res.total
    }
  }
}
</script>

<style lang="scss" scoped></style>
