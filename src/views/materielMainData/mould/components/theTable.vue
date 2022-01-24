<template>
  <iCard class="margin-top20">
    <div class="flex-end-center margin-bottom20">
      <iButton @click="add" xxx-permission="'BUTTON_MATERIEL_DATA_MOULD_ADD'">
        {{ language('新建') }}
      </iButton>
      <iButton
        :disabled="selectedRows.length !== 1"
        @click="edit"
        xxx-permission="'BUTTON_MATERIEL_DATA_MOULD_MODIFY'"
      >
        {{ language('编辑') }}
      </iButton>
      <iButton
        :disabled="!selectedRows.length"
        @click="del"
        xxx-permission="'BUTTON_MATERIEL_DATA_MOULD_DELETE'"
      >
        {{ language('删除') }}
      </iButton>
      <button-download
        :download-method="exportExcel"
        xxx-permission="'BUTTON_MATERIEL_DATA_MOULD_EXPORT'"
      />
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
import { iCard, iPagination, iButton, iMessage } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import {
  queryMouldGruops,
  deleteMouldGruops,
  exportMouldGroups
} from '@/api/materiel/mould'
import { MOULD_TABLE_COLUMNS } from './data'
import deleteMixin from '@/mixins/deleteMixin'
export default {
  name: 'theMaterielMouldTable',
  components: { iTableCustom, iCard, iPagination, iButton },
  mixins: [pageMixins, deleteMixin],
  data() {
    return {
      searchData: {},
      tableLoading: false,
      tableData: [],
      tableColumns: MOULD_TABLE_COLUMNS,
      selectedRows: [],
      detailUrl: '/portal/#/materielData/mould/detail'
    }
  },
  created() {
    this.query()
  },
  methods: {
    add() {
      window.open(this.detailUrl)
    },
    edit() {
      const { id, code } = this.selectedRows[0]
      window.open(`/portal/#/materielData/mould/detail?id=${id}&code=${code}`)
    },
    del() {
      this.onDelete().then(() => {
        const ids = this.selectedRows.map((e) => e.id)
        deleteMouldGruops(ids)
          .then((res) => {
            if (res.result) {
              this.query()
              iMessage.success(res.desZh || '删除成功')
            } else {
              iMessage.error(res.desZh || '获取数据失败')
            }
          })
          .catch((err) => {
            iMessage.error(err.desZh || '获取数据失败')
          })
      })
    },
    exportExcel() {
      return exportMouldGroups(this.searchData)
    },
    handleGoDetail(row) {
      window.open(`${this.detailUrl}?id=${row.id}&code=${row.code}`)
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
      const res = await queryMouldGruops(requestData).finally(
        () => (this.tableLoading = false)
      )
      this.tableData = res.data || []
      this.page.totalCount = res.total
      this.page.pageSize = res.pageSize
    }
  }
}
</script>

<style lang="scss" scoped></style>
