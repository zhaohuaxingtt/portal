<template>
  <div>
    <search 
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
import { supplierDetail } from '@/api/register/baseInfo'
import { searchFormData, signStatusList } from "./components/data";
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
    supplierDetail(this.supplierType).then(res=>{
      if(res?.code=='200'){
        this.searchForm.supplier = res.data.supplierInfoVo.nameZh
        this.getTableList()
      }
    })
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
      signExport(param)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
