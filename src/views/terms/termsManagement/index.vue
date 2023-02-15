<template>
  <div>
    <theSearch @getTableList="getTableList" />
    <theTable
      ref="theTable"
      :page="page"
      :total="page.total"
      :tableListData="tableListData"
      :tableListColumns="tableListClause"
      :tableLoading="tableLoading"
      @refTabList="refTabList"
      @handleChangePage="handleChangePage"
      @handleSizeChange="handleSizeChange"
      @handleExportAll="handleExportAll"
    />
  </div>
</template>

<script>
import { iPage, iNavMvp } from 'rise'
import theSearch from './components/theSearch.vue'
import theTable from './components/theTable.vue'
import { pageMixins } from '@/utils/pageMixins'
import { findByPage } from '@/api/terms/terms'
import { exportFile } from '@/utils/exportFileUtil'
import { categoryManagementAssistantListkpi } from "../data";
import store from '@/store'

export default {
  mixins: [pageMixins],
  components: {
    iPage,
    iNavMvp,
    theSearch,
    theTable
  },
  data() {
    return {
      categoryManagementAssistantListkpi,
      tableLoading: false,
      tableListData: [],
      formData: {}
    }
  },
  mounted() {
    this.getTableList()
  },
  methods: {
    getTableList(e) {
      this.formData = e
      this.page.currPage = 1
      let param = {
        ...this.formData,
        pageNum: 1,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    refTabList() {
      this.page.currPage = 1
      let param = {
        ...this.formData,
        pageNum: 1,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    handleChangePage(e) {
      this.page.currPage = e
      let param = {
        ...this.formData,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    handleSizeChange(e) {
      this.page.currPage = 1
      this.page.pageSize = e
      let param = {
        ...this.formData,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    query(e) {
      this.tableLoading = true
      if (typeof e.isPersonalTerms != 'boolean') {
        delete e.isPersonalTerms
      }
      if (
        e.supplierRange == '' ||
        e.supplierRange == null ||
        e.supplierRange == undefined
      ) {
        delete e.supplierRange
      } else {
        let temp = []
        e.supplierRange.includes('PP') ? temp.push('PP') : ''
        e.supplierRange.includes('GP') ? temp.push('GP') : ''
        e.supplierRange.includes('NT') ? temp.push('NT') : ''
        e.supplierRange = temp
          .map((i) => {
            return i
          })
          .join(',')
      }
      if (
        e.supplierIdentity == '' ||
        e.supplierIdentity == null ||
        e.supplierIdentity == undefined
      ) {
        delete e.supplierIdentity
      } else {
        e.supplierIdentity = e.supplierIdentity
          .sort()
          .map((i) => {
            return i
          })
          .join(',')
      }
      if (e.state == '' || e.state == null || e.state == undefined) {
        delete e.state
      } else {
        e.state = e.state
          .map((i) => {
            return i
          })
          .join(',')
      }
      if (e.signNode == '' || e.signNode == null || e.signNode == undefined) {
        delete e.signNode
      } else {
        e.signNode = e.signNode
          .map((i) => {
            return i
          })
          .join(',')
      }
      findByPage(e)
        .then((res) => {
          this.tableListData = res.data
          this.page.total = res.total
          this.tableLoading = false
        })
        .catch(() => {
          this.tableLoading = false
        })
    },
    handleExportAll() {
      if (this.formData?.signNode) {
        this.formData.signNode = this.formData?.signNode
          ?.map((i) => {
            return i
          })
          .join(',')
      }
      if (this.formData?.supplierRange) {
        this.formData.supplierRange = this.formData?.supplierRange
          ?.map((i) => {
            return i
          })
          .join(',')
      }
      if (this.formData?.supplierIdentity) {
        this.formData.supplierIdentity = this.formData?.supplierIdentity
          ?.map((i) => {
            return i
          })
          .join(',')
      }
      if (this.formData?.state) {
        this.formData.state = this.formData?.state
          ?.map((i) => {
            return i
          })
          .join(',')
      }
      exportFile({
        url:
          process.env.VUE_APP_NEWS +
          `/termsQueryService/exportTerms?userId=` +
          store.state.permission.userInfo.id,
        data: {
          ...this.formData,
          pageNum: this.page.currPage,
          pageSize: this.page.pageSize
        },
        callback: () => {
          if (this.formData?.signNode) {
            this.formData.signNode = this.formData?.signNode?.split(',')
          }
          if (this.formData?.supplierRange) {
            this.formData.supplierRange =
              this.formData?.supplierRange?.split(',')
          }
          if (this.formData?.supplierIdentity) {
            this.formData.supplierIdentity =
              this.formData?.supplierIdentity?.split(',')
          }
          if (this.formData?.state) {
            this.formData.state = this.formData?.state?.split(',')
          }
          // if (e) {
          //   iMessage.success('导出成功')
          // } else {
          //   iMessage.error("导出失败");
          // }
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
