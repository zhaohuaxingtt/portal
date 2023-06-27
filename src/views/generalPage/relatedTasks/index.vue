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
      @handleChangePage="handleChangePage"
      @handleSizeChange="handleSizeChange"
    />
  </div>
</template>

<script>
import search from '../components/search.vue'
import theTable from './components/theTable.vue'
import { pageMixins } from '@/utils/pageMixins'
import { supplierDetail } from '@/api/register/baseInfo'
import { taskPage, listTaskStatus, listTaskType } from '@/api/taskManagement/index'
import { searchFormData } from "./components/data";
export default {
  mixins: [pageMixins],
  components: {
    search,
    theTable
  },
  data() {
    return {
      searchFormData,
      searchForm:{
        processingStatus:''
      },
      options: {
        taskTypeList:[],
        processingStatus:[],
        supplierIdList:[],
        senderIdList:[],
      },
      tableLoading: false,
      tableListData: [],
    }
  },
  created() {
    supplierDetail(this.supplierType).then(res=>{
      if(res?.code=='200'){
        this.searchForm.supplierIdList = [res.data.ppSupplierInfoVo?.id||res.data.gpSupplierInfoVO?.id]
        this.getTableList()
      }
    })
    this.listTaskStatus()
    this.listTaskType()
  },
  methods: {
    listTaskStatus(){
      listTaskStatus().then(res=>{
        if(res?.code==200){
          this.options.processingStatus = res.data.map(item=>{
            return {
              value: item.code,
              label: item.message
            }
          })
        }
      })
    },
    listTaskType(){
      listTaskType().then(res=>{
        if(res?.code==200){
          this.options.taskTypeList = res.data.map(item=>{
            return {
              value: item.code,
              label: item.message
            }
          })
        }
      })
    },
    handleSearchReset() {
      this.searchForm = {
        processingStatus:''
      }
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
      taskPage(param)
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
