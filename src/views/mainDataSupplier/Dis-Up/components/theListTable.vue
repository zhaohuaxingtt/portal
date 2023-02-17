<template>
  <iCard class="margin-top20">
    <div class="flex-end-center margin-bottom20">
      <iButton :disabled="selectedRows.length !== 1" @click="edit" v-permission="ADMIN_MAIN_DATA_SUPPLIER_DISPERSED_EDIT">
        {{ language('编辑') }}
      </iButton>
      <iButton :disabled="!selectedRows.length" @click="handleDelete" v-permission="ADMIN_MAIN_DATA_SUPPLIER_DISPERSED_DEL">
        {{ language('删除') }}
      </iButton>
      <button-download :download-method="handleExport" v-permission="ADMIN_MAIN_DATA_SUPPLIER_DISPERSED_DOWNLOAD" />
    </div>
    <i-table-custom
      :loading="tableLoading"
      :data="tableData"
      :extra-data="extraData"
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
import { iCard, iPagination, iButton, iMessage } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import deleteMixin from '@/mixins/deleteMixin'
import {
  gpListexport,
  deleteSupplier,
  fetchSuppliersGP
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
      detailUrl2: '/gpsupplierportal/#/mainDataSupplier/list/detail',
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
      const { id,supplierType } = this.selectedRows[0]
      if(process.env.NODE_ENV == 'vmsit' && supplierType =="GP"){
        window.open(`${this.detailUrl2}?id=${id}&supplierType=${supplierType}`)
      }else{
        window.open(`${this.detailUrl}?id=${id}&supplierType=${supplierType}`)
      }
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
      return gpListexport(this.searchData)
    },
    handleGoDetail(row) {
      if(process.env.NODE_ENV == 'vmsit' && row.supplierType =="GP"){
        window.open(`${this.detailUrl2}?id=${row.id}&supplierType=${row.supplierType}`)
      }else{
        window.open(`${this.detailUrl}?id=${row.id}&supplierType=${row.supplierType}`)
      }
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
      const res = await fetchSuppliersGP(requestData)
        .catch((err) => iMessage.error(err.desZh || '获取失败'))
        .finally(() => (this.tableLoading = false))
      this.tableData = res.data || []
      this.page.totalCount = res.total
    }
  }
}
</script>

<style lang="scss" scoped></style>
