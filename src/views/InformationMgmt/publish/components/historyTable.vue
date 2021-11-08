<template>
  <div class="template-table">
    <iTableCustom
      :loading="tableLoading"
      :data="tableData"
      :columns="tableSetting"
      :extra-data="extraData"
      @handle-selection-change="handleSelectionChange"
      @go-detail="goDetail"
    />
    <iPagination
      v-update
      background
      @size-change="handleSizeChange($event, query)"
      @current-change="handleCurrentChange($event, query)"
      :current-page="page.currPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.totalCount"
    />
  </div>
</template>

<script>
import { pageMixins } from '@/utils/pageMixins'
import { fetchPublishList } from '@/api/msgMgmt/msgPublish'
import { iMessage , iPagination } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import { HISTORY_COLUMNS, PUBLISH_SCOPE_OPTIONS } from './data'
import { TEMPLATE_TYPES } from '@/views/InformationMgmt/template/components/data'
import { arrayToMap, filterEmptyValue } from '@/utils'
export default {
  name: 'historyTable',
  mixins: [pageMixins],
  components: { iTableCustom, iPagination },
  data() {
    return {
      tableSetting: HISTORY_COLUMNS,
      tableData: [],
      selectedRows: [],
      tableLoading: false,
      extraData: {
        templateTypeMap: arrayToMap(TEMPLATE_TYPES, 'value', 'label'),
        publishScopeMap: arrayToMap(PUBLISH_SCOPE_OPTIONS, 'value', 'label')
      },
      form: {}
    }
  },
  created() {
    this.query()
  },
  methods: {
    search(val) {
      this.page.currPage = 1
      this.page.totalCount = 0
      this.form = { ...val }
      if (this.form.pubdate) {
        this.form.pubdate += ' 00:00:00'
      }
      this.query()
    },
    query() {
      this.tableLoading = true
      let data = {
        size: this.page.pageSize,
        current: this.page.currPage,
        ...filterEmptyValue(this.form)
      }
      fetchPublishList(data)
        .then(val => {
          this.tableLoading = false
          this.tableData = val.data
          this.page.totalCount = val.total
        })
        .catch(error => {
          this.tableLoading = false
          iMessage.error('获取数据失败')
          console.log('error', error)
        })
    },
    handleSelectionChange(val) {
      this.selectedRows = val
      this.$emit('handle-selection-change', val)
    },
    goDetail(val) {
      this.$emit('go-detail', val)
    }
  }
}
</script>

<style lang="scss" scoped></style>
