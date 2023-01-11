<template>
  <div>
    <search 
    class="margin-top20"
      @sure="getTableList"
      @reset="handleSearchReset"
      :searchFormData="searchFormData"
      :searchForm="searchForm"
      :options="options"/>
    <theTable
      ref="theTable"
      :page="page"
      :total="page.total"
      :tableListData="tableListData"
      :tableListColumns="tableListClause"
      :tableLoading="tableLoading"
      @refTabList="refTabList"
      @getTableList="getTableList"
      @handleChangePage="handleChangePage"
      @handleSizeChange="handleSizeChange"
      @handleExportAll="handleExportAll"
    />
  </div>
</template>

<script>
import { iPage, iNavMvp } from 'rise'
import search from './components/search.vue'
import theTable from './components/theTable.vue'
import { pageMixins } from '@/utils/pageMixins'
import { signPageList, signExport } from '@/api/terms/terms'
import { exportFile } from '@/utils/exportFileUtil'
import { searchFormData, signStatusList } from "./components/data";
import store from '@/store'

export default {
  mixins: [pageMixins],
  components: {
    iPage,
    iNavMvp,
    search,
    theTable
  },
  data() {
    return {
      searchFormData,
      searchForm:{},
      options:{
        signStatusList,
      },
      tableLoading: false,
      tableListData: [],
    }
  },
  watch:{
    'searchForm.signDate'(val) {
      if (Array.isArray(val) && val.length) {
        this.searchForm.signDateBegin = val[0]
        this.searchForm.signDateEnd = window
          .moment(val[1])
          .format('YYYY-MM-DD 23:59:59')
      } else {
        this.searchForm.signDateBegin = ''
        this.searchForm.signDateEnd = ''
      }
    }
  },
  mounted() {
    this.getTableList()
  },
  methods: {
    handleSearchReset() {
      this.resolutionPassTime = []
      this.searchForm = {}
      this.getTableList()
    },
    getTableList() {
      this.page.currPage = 1
      let param = {
        ...this.searchForm,
        pageNum: 1,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    refTabList() {
      this.page.currPage = 1
      let param = {
        ...this.searchForm,
        pageNum: 1,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    handleChangePage(e) {
      this.page.currPage = e
      let param = {
        ...this.searchForm,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    handleSizeChange(e) {
      this.page.currPage = 1
      this.page.pageSize = e
      let param = {
        ...this.searchForm,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      this.query(param)
    },
    query(e) {
      this.tableLoading = true
      signPageList(e)
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
      this.page.currPage = 1
      let param = {
        ...this.searchForm,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      signExport(param).then(res=>{
        console.log(res);
      })
      if (this.searchForm?.signNode) {
        this.searchForm.signNode = this.searchForm?.signNode
          ?.map((i) => {
            return i
          })
          .join(',')
      }
      if (this.searchForm?.supplierRange) {
        this.searchForm.supplierRange = this.searchForm?.supplierRange
          ?.map((i) => {
            return i
          })
          .join(',')
      }
      if (this.searchForm?.supplierIdentity) {
        this.searchForm.supplierIdentity = this.searchForm?.supplierIdentity
          ?.map((i) => {
            return i
          })
          .join(',')
      }
      if (this.searchForm?.state) {
        this.searchForm.state = this.searchForm?.state
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
          ...this.searchForm,
          pageNum: this.page.currPage,
          pageSize: this.page.pageSize
        },
        callback: () => {
          if (this.searchForm?.signNode) {
            this.searchForm.signNode = this.searchForm?.signNode?.split(',')
          }
          if (this.searchForm?.supplierRange) {
            this.searchForm.supplierRange =
              this.searchForm?.supplierRange?.split(',')
          }
          if (this.searchForm?.supplierIdentity) {
            this.searchForm.supplierIdentity =
              this.searchForm?.supplierIdentity?.split(',')
          }
          if (this.searchForm?.state) {
            this.searchForm.state = this.searchForm?.state?.split(',')
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
