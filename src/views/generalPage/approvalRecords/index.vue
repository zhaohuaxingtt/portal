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
      :tableListData="tableListData"
      :tableListColumns="tableListClause"
      :tableLoading="tableLoading"
      @getTableList="getTableList"
      @handleChangePage="handleChangePage"
      @handleSizeChange="handleSizeChange"
    />
  </div>
</template>

<script>
import search from '../components/search.vue'
import theTable from './components/theTable.vue'
import { pageMixins } from '@/utils/pageMixins'
import { approvalRecordPage, listSupplierType } from '@/api/supplier360/baseInfo'
import { supplierDetail } from '@/api/register/baseInfo'
import { searchFormData, approvalFlowStatus } from "./components/data";
export default {
  mixins: [pageMixins],
  components: {
    search,
    theTable
  },
  data() {
    return {
      searchFormData,
      searchForm:{},
      options:{
        approvalFlowStatus,
      },
      tableLoading: false,
      tableListData: [],
    }
  },
  mounted() {
    supplierDetail(this.supplierType).then(res=>{
      if(res?.code=='200'){
        this.searchForm.supplier = res.data.supplierInfoVo.nameZh
        this.searchForm.supplierId = res.data.ppSupplierInfoVo.id
        this.getTableList()
      }
    })
  },
  methods: {
    listSupplierType(){
      listSupplierType().then(res=>{
        if(res?.code==200){
          this.options.approveStatus = res.data
        }
      })
    },
    handleSearchReset() {
      this.searchForm = {}
      this.getTableList()
    },
    getTableList() {
      this.page.currPage = 1
      this.query()
    },
    handleChangePage(e) {
      this.page.currPage = e
      this.query()
    },
    handleSizeChange(e) {
      this.page.currPage = 1
      this.page.pageSize = e
      this.query()
    },
    query() {
      let param = {
        ...this.searchForm,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      this.tableLoading = true
      approvalRecordPage(param)
        .then((res) => {
          this.tableListData = res.data
          this.page.totalCount = res.total
          this.tableLoading = false
        })
        .catch(() => {
          this.tableLoading = false
        })
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
