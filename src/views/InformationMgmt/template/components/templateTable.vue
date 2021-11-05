<template>
  <div class="template-table">
    {{ refreshTimestamp }}
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
import { fetchTemplates } from '@/api/msgMgmt/msgTemplate'
import { iMessage, iPagination } from 'rise'
import { tableSetting, TEMPLATE_TYPES } from './data'
import iTableCustom from '@/components/iTableCustom'
import { arrayToMap } from '@/utils'
export default {
  name: 'templateTable',
  mixins: [pageMixins],
  components: { iTableCustom, iPagination },
  data() {
    return {
      tableSetting,
      tableData: [],
      selectedRows: [],
      tableLoading: false,
      extraData: {
        templateTypeMap: arrayToMap(TEMPLATE_TYPES, 'value', 'label')
      }
    }
  },
  created() {
    this.query()
  },
  methods: {
    query() {
      this.tableLoading = true
      let data = {
        size: this.page.pageSize,
        current: this.page.currPage
      }
      fetchTemplates(data)
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
