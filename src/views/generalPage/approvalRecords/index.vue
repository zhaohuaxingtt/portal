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
import { iMessage } from "rise";
import search from '../components/search.vue'
import theTable from './components/theTable.vue'
import { pageMixins } from '@/utils/pageMixins'
import { approvalRecordPage, listSupplierType } from '@/api/supplier360/approvalRecords'
import { supplierDetail } from '@/api/register/baseInfo'
import { searchFormData, approvalFlowStatus } from "./components/data";
export default {
  mixins: [pageMixins],
  components: {
    iMessage,
    search,
    theTable
  },
  data() {
    return {
      searchFormData,
      searchForm:{
        statusList:['0']
      },
      options:{
        approvalFlowStatus,
        approveStatus:[]
      },
      tableLoading: false,
      tableListData: [],
    }
  },
  mounted() {
    this.listSupplierType()
    supplierDetail(this.supplierType).then(res=>{
      if(res?.code=='200'){
        this.searchForm.supplier = res.data.supplierInfoVo.nameZh
        this.searchForm.supplierId = res.data.ppSupplierInfoVo?.id || res.data.gpSupplierInfoVo?.id
        this.getTableList()
      }
    })
  },
  methods: {
    listSupplierType(){
      listSupplierType().then(res=>{
        if(res?.result){
          this.options.approveStatus = res.data.data.map(item=>{
            return {
              label: item.value,
              value:item.name
            }
          })
        }
      })
    },
    handleSearchReset() {
      this.searchForm.approvalItem=''
      this.searchForm.applyUserIdList=''
      this.searchForm.categoryList=[]
      this.searchForm.statusList=['0']
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
        applyUserIdList: this.searchForm.applyUserIdList?[this.searchForm.applyUserIdList]:[],
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      this.tableLoading = true
      approvalRecordPage(param)
        .then((res) => {
          if(res?.code==200){
            this.tableListData = res.data?.records || []
            this.page.totalCount = res.data?.total || 0
          }else{
            iMessage.error(res?.desZh)
          }
          this.tableLoading = false
        })
        .catch((e) => {
          console.log(e);
          this.tableLoading = false
        })
    },
  }
}
</script>
<style lang="scss" scoped>
</style>
