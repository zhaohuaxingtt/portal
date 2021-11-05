<template>
  <iPage class="template">
    <searchForm @search="search" />
    <iCard>
      <actionButtons
        :selected-rows="selectedTableData"
        @add="newTemplate"
        @edit="editTemplate"
        @delete="deleteTemplate"
        @export="exportTemplate"
      />
      <i-table-custom
        :loading="tableLoading"
        :data="tableData"
        :columns="tableColumns"
        :extra-data="tableExtraData"
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
  </iPage>
</template>

<script>
import { iPage, iCard, iMessage, iPagination } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import {
  tableColumns,
  templateStatus,
  testColumns,
  testData
} from './components/data'
import filters from '@/utils/filters'
import { openUrl } from '@/utils'
import { excelExport } from '@/utils/filedowLoad'
import iTableCustom from '@/components/iTableCustom'
import { queryTemplates, deleteTemplate } from '@/api/approval'
import { actionButtons, searchForm } from './components'
export default {
  mixins: [pageMixins, filters],
  components: {
    iPage,
    iCard,
    iPagination,
    iTableCustom,
    actionButtons,
    searchForm
  },
  data() {
    return {
      // tableListData: [],
      tableLoading: false,
      tableColumns: tableColumns,
      selectedTableData: [],
      activeName: 'template',
      form: {},
      templateStatus: templateStatus,
      tableData: [],
      testColumns,
      testData,
      tableExtraData: {
        editRow: this.editRowTemplate,
        deleteRow: this.deleteRowTemplate
      }
    }
  },
  created() {
    this.query()
  },
  methods: {
    expandAll() {
      this.$refs.testTable.expandAll()
    },
    collapseAll() {
      this.$refs.testTable.collapseAll()
    },
    selectRow() {
      this.$refs.testTable.toggleRowSelection(
        {
          id: 221,
          name: 221
        },
        true
      )
    },
    selectRowAndChildren() {
      this.$refs.testTable.toggleRowAndChildrenSelection(
        {
          id: 2,
          name: 2
        },
        true
      )
    },
    search(val) {
      this.form = { ...val }
      this.query()
    },
    query() {
      const data = {
        ...this.form,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      }
      this.tableLoading = true
      queryTemplates(data)
        .then(res => {
          this.tableLoading = false
          const { data, pageNum, pageSize, total } = res.data
          this.page.currPage = pageNum
          this.page.pageSize = pageSize
          this.page.totalCount = total
          this.tableData = data
        })
        .catch(err => {
          this.tableLoading = false
        })
    },
    //表格选中值集
    handleSelectionChange(val) {
      this.selectedTableData = val
    },
    handleGoDetail(val) {
      openUrl(`/bpm/template/detail/${val.id}`)
      // this.$router.push({
      //   name: 'templateDetail',
      //   params: {
      //     id: val.id
      //   }
      // })
    },
    // 查询
    sure() {
      this.page.pageNum = 1
      this.query()
    },
    // 重置搜索条件
    reset() {
      for (let i in this.form) {
        this.form[i] = ''
      }
      this.query()
    },
    //新建流程
    newTemplate() {
      openUrl('/bpm/template/detail')
      // this.$router.push({
      //   name: 'templateDetail'
      // })
    },
    //编辑
    editTemplate() {
      if (this.selectedTableData.length > 0) {
        this.editRowTemplate(this.selectedTableData[0])
      }
    },
    //删除
    deleteTemplate() {
      this.deleteRowTemplate(this.selectedTableData)
    },
    //导出
    exportTemplate() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(this.$t('LK_QINGXUANZHEXUYAODAOCHUSHUJU'))
      excelExport(this.selectTableData, this.tableTitle)
    },
    //编辑
    editRowTemplate(row) {
      this.$router.push({
        name: 'templateDetail',
        params: {
          id: row.id
        }
      })
    },
    //删除
    deleteRowTemplate(rows) {
      const ids = []
      rows.forEach(e => ids.push(e.modelId))
      this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableLoading = true
        deleteTemplate(ids)
          .then(res => {
            if (res.result) {
              this.$message.success('删除成功')

              this.query()
            } else {
              this.tableLoading = false
              this.$message.error('删除失败')
            }
          })
          .catch(err => {
            this.tableLoading = false
            this.$message.error('删除失败')
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.template {
}
</style>
