<template>
  <iPage>
    <div class="header">
      <div>{{ $t('任务管理') }}</div>
    </div>
    <search
      class="margin-top20"
      :searchFormData="searchFormData"
      :searchForm="searchForm"
      :options="options"
    >
      <template>
        <iButton @click="sure">{{ $t('TM_CHAXUN') }}</iButton>
        <iButton @click="reset">{{ $t('TM_CHONGZHI') }}</iButton>
      </template>
    </search>
    <iCard class="margin-top20">
      <div class="flex margin-bottom10">
        <span class="table-title">任务列表</span>
        <div class="table-btn floatright">
          <iButton @click="transferBtn" >{{ $t('LK_ZHUANPAI') }}</iButton>
          <buttonTableSetting
            showBadge
            :hiddenCount="hiddenCount"
            @click="edittableHeader"
          />
        </div>
      </div>
      <iTableCustom
        ref="tableList"
        :data="tableListData"
        :columns="tableTitle"
        :loading="tableLoading"
        permissionKey="ADMIN_TASK_MANAGEMENT"
        :index="true"
        border
        @setHiddenCount="setHiddenCount"
        @handleClickFsupplierName="handleClickFsupplierName"
        @handle-selection-change="handleSelectionChange"
      />
      <iPagination
        class="footer-pagination"
        @size-change="handleSizeChange($event, sure)"
        @current-change="handleCurrentChange($event, getData)"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :current-page="page.currPage"
        :total="page.totalCount"
        :layout="page.layout"
      >
      </iPagination>
    </iCard>
    <transferDialog :visible.sync="transferVisiable" :selected="selected" @getData="getData"/>
  </iPage>
</template>

<script>
import { iPage, iCard, iButton, iTableCustom, iPagination, iMessage } from 'rise'
import buttonTableSetting from 'rise/web/components/buttonTableSetting'
import { tableSortMixins } from 'rise/web/components/iTableSort/tableSortMixins'
import search from './components/search.vue'
import transferDialog from './components/transferDialog.vue'
import { pageMixins } from '@/utils/pageMixins'
import { taskPage, listTaskStatus, listTaskType } from '@/api/taskManagement/index'
import { searchFormData, tableTitle } from './data'

export default {
  mixins: [pageMixins, tableSortMixins],
  components: {
    iPage,
    iCard,
    iButton,
    iTableCustom,
    iPagination,
    buttonTableSetting,
    search,
    transferDialog,
  },
  data() {
    return {
      searchFormData,
      searchForm: {
        processingStatus:''
      },
      options: {
        taskTypeList:[],
        processingStatus:[],
        supplierIdList:[],
        senderIdList:[],
      },
      tableTitle,
      tableListData: [],
      selected:[],
      tableLoading: false,
      transferVisiable:false,
    }
  },
  mounted() {
    this.getData()
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
    sure() {
      this.page.currPage = 1
      this.getData()
    },
    reset() {
      this.searchForm = {
        processingStatus:''
      }
      this.sure()
    },
    // 转派
    transferBtn(){
      if(this.selected.length!=1) return iMessage.warn('请选择一条需要转派的数据')
      if(this.selected.some(item=>item.processingStatus=='2')) return iMessage.warn('该任务已完成，不可转派')
      this.transferVisiable = true
    },
    handleSelectionChange(val){
      this.selected = val
    },
    getData() {
      this.tableLoading = true
      let params = {
        ...this.searchForm,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize
      }
      taskPage(params)
        .then((res) => {
          this.tableListData = res.data
          this.page.totalCount = res.total
          this.tableLoading = false
        })
        .catch(() => {
          this.tableLoading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.header {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flex {
  align-items: center;
  justify-content: space-between;
  .table-title {
    font-size: 16px !important;
    font-weight: 500 !important;
  }
  .table-btn {
    display: inline-flex;
    align-items: center;
  }
}
</style>
