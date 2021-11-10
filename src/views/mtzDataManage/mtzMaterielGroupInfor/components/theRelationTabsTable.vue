<template>
  <iCard>
    <div class="flex flex-end-center margin-bottom20">
      <button-download :download-method="exportExcel" />
    </div>

    <iTableCustom
      :loading="loading"
      :data="tableData"
      :columns="tableColumns"
      :span-method="handleSpanMethod"
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
import { iCard, iPagination } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { RELATION_FILTER_FORM } from './data'
import { fetchRelations } from '@/api/materiel/mtzMaterielGroup'
import { pageMixins } from '@/utils/pageMixins'
import {
  exportRelationGroup,
  exportRelationSixNum
} from '@/api/materiel/mtzMaterielGroup'
export default {
  name: 'theRelationTabsTable',
  components: { iTableCustom, iCard, iPagination },
  mixins: [pageMixins],
  props: {
    tableColumns: {
      type: Array,
      default: function() {
        return []
      }
    },
    queryType: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      loading: false,
      tableData: [],
      searchData: { ...RELATION_FILTER_FORM }
    }
  },
  methods: {
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
        size: this.page.pageSize,
        queryType: this.queryType
      }
      this.loading = true
      const res = await fetchRelations(requestData).finally(
        () => (this.loading = false)
      )
      const data = []
      if (res.data) {
        res.data.forEach((e, index) => {
          const item = {
            materialGroupCode: e.materialGroupCode,
            materialGroupNameZh: e.materialGroupNameZh,
            materialGroupDeptName: e.materialGroupDeptName,
            materialGroupDeptCodes: e.materialGroupDeptCodes,
            materialGroupIndex: index + 1,
            colspan: 0,
            rowspan: 0
          }
          if (e.subRelationVo) {
            e.subRelationVo.forEach((sub, i) => {
              if (i === 0) {
                item.rowspan = e.subRelationVo.length
              } else {
                item.rowspan = 0
              }
              item.categoryCode = sub.categoryCode
              item.categoryName = sub.categoryName
              item.categoryDeptName = sub.categoryDeptName
              item.categoryDeptCodes = sub.categoryDeptCodes
              item.sixPartCode = sub.sixPartCode
              item.categoryIndex = i + 1
              data.push({ ...item })
            })
          }
        })
      }
      this.tableData = data
      this.page.totalCount = res.total
      this.page.pageSize = res.pageSize
    },
    exportExcel() {
      if (this.queryType === 1) {
        return exportRelationGroup({ ...this.searchData, queryType: 1 })
      }
      return exportRelationSixNum({ ...this.searchData, queryType: 2 })
    },
    handleSpanMethod({ row, columnIndex }) {
      if (columnIndex < 4) {
        if (row.rowspan) {
          return {
            rowspan: row.rowspan,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
      return {
        rowspan: 1,
        colspan: 1
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
