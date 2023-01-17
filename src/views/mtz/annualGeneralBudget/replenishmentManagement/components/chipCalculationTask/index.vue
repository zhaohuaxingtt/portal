<template>
  <div>
    <search
      @sure="sure"
      @reset="reset"
      :searchForm="searchForm"
      :searchFormData="searchFormData"
      :options="options"
    />
    <iCard style="margin-top: 20px">
      <div>
        <span class="title-us">{{ $t('LK_JINKANZIJI') }}</span>
        <el-switch @change="changeSwitch" v-model="isOnlyMyself"> </el-switch>
      </div>
      <!-- <tableList
        ref="moviesTable"
        class="margin-top20"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :selection="false"
        :index="true"
        border
        @handleSelectionChange="handleSelectionChange"
      >
        <template #id="scoped">
          <p
            :class="
              scoped.row.taskStatus == 2 || scoped.row.taskStatus == 3
                ? 'openPage'
                : ''
            "
            @click="handleAdd(scoped.row, scoped.row.taskStatus)"
          >
            {{ scoped.row.id }}
          </p>
        </template>
        <template #taskKey="scoped">
          <span>{{ scoped.row.firstSupplierName }}</span>
        </template>
        <template #userId="scoped">
          <span>{{ scoped.row.userName }}</span>
        </template>
        <template #balance="scoped">
          <span>{{ scoped.row.balanceStartDate }}</span>
          <br />
          <span>{{ scoped.row.balanceEndDate }}</span>
        </template>
        <template #taskStatus="scoped">
          <span>{{
            scoped.row.taskStatus == 0
              ? '未开始'
              : scoped.row.taskStatus == 1
              ? '进行中'
              : scoped.row.taskStatus == 2
              ? '已完成'
              : scoped.row.taskStatus == 3
              ? '异常'
              : scoped.row.taskStatus == 4
              ? '已关闭'
              : ''
          }}</span>
        </template>
      </tableList> -->
      
      <iTableCustom
        :loading="tableLoading"
        :data="tableListData"
        :columns="tableTitle"
        @handleAdd="handleAdd"
      />
        <iPagination
            @size-change="handleSizeChange($event, findCalculateTaskByPage)"
            @current-change="handleCurrentChange($event, findCalculateTaskByPage)"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :current-page="page.currPage"
            :total="page.totalCount"
            :layout="page.layout"
        >
        </iPagination>
    </iCard>
    <detailDialog
      v-model="dialogVisible"
      v-if="dialogVisible"
      :params="selectData"
      :supplierType="supplierType"
      @handleCloseDialog="handleCloseDialog"
      @handleRedeploy="handleRedeploy"></detailDialog>
  </div>
</template>

<script>
import { iSearch, iSelect, iCard, iPagination, iTableCustom } from 'rise'
import search from '@/views/mtz/annualGeneralBudget/locationChange/components/components/search.vue'
import detailDialog from './detailDialog.vue'
import tableList from '@/components/commonTable/index.vue'
import { tableTitle, searchFormData } from './data'
import {
  getSupplierByuser,
  findCalculateTaskByPage
} from '@/api/mtz/annualGeneralBudget/chipReplenishment'
import { getBuyers } from '@/api/mtz/mtzCalculationTask'

import balancePaymentDialog from '../mtzReplenishmentOverview/components/balancePaymentDialog'

export default {
  components: {
    iSearch,
    iSelect,
    iCard,
    iTableCustom,
    tableList,
    iPagination,
    balancePaymentDialog,
    search,
    detailDialog
  },
  data() {
    return {
      tableTitle,
      tableListData: [],
      tableLoading: false,
      searchForm: {},
      searchFormData,
      options: {
        fsupplierList: [],
        ssupplierList: [],
        deptList: [],
        operatorBuyus: [],
        taskTypeList: [
          {
            value: 1,
            label: '一次件芯片补差',
            labelE: '一次件芯片补差'
          },
          {
            value: 2,
            label: '散件芯片补差',
            labelE: '散件芯片补差'
          }
        ],
        taskStatusList: [
          {
            value: 0,
            label: '准备中',
            labelE: 'Preparing'
          },
          {
            value: 1,
            label: '计算中',
            labelE: 'In calculation'
          },
          {
            value: 2,
            label: '计算完成',
            labelE: 'Calculation completed'
          },
          {
            value: 3,
            label: '计算失败',
            labelE: 'Calculation failed'
          },
          {
            value: 4,
            label: '已关闭',
            labelE: 'Closed'
          }
        ]
      },
      isOnlyMyself: true,

      page: {
        totalCount: 0, //总条数
        pageSize: 10, //每页多少条
        pageSizes: [10, 20, 50, 100], //每页条数切换
        currPage: 1, //当前页
        layout: 'sizes, prev, pager, next, jumper'
      },

      fsupplierList: [],
      operatorBuyus: [],

      dialogVisible: true,
      selectData: [],
      flag: false,
      materialCodes: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    buyusChange(val) {
      this.isOnlyMyself = false
    },
    changeSwitch(val) {
      this.isOnlyMyself = val
      if (val) {
        this.page.currPage = 1
        this.page.pageSize = 10
        this.findCalculateTaskByPage()
      } else {
        this.page.currPage = 1
        this.page.pageSize = 10
        this.findCalculateTaskByPage()
      }
    },
    handleSelectionChange(val) {
      // if (val.length > 1) {
      //     var duoxuans = val.pop()
      //     this.handleSelectArr = val.pop()
      //     //清除所有选中
      //     this.$refs.moviesTable.clearSelection()
      //     //给最后一个加上选中
      //     this.$refs.moviesTable.toggleRowSelection(duoxuans)
      // } else {
      //     this.handleSelectArr = val
      // }
    },
    handleAdd(val) {
        console.log(val);
        let num = val.taskStatus
        if(num == 1){   // 计算中
            window.open(`/portal/#/chipCeated?type=${val.balanceType}&taskStatus=${val.taskStatus}`)
        }else if(num == "FINISHED"){  // 计算完成
            this.dialogVisible = true
            const dataList = val
            dataList.echoShow = true
            this.selectData = [dataList]
            this.flag = true
        }
    },
    handleClose() {
      this.dialogVisible = false
    },
    sure() {
      this.findCalculateTaskByPage()
    },
    reset() {
      this.searchForm = {}
      this.isOnlyMyself = true
      this.page.currPage = 1
      this.page.pageSize = 10
      this.findCalculateTaskByPage()
    },
    async getData() {
      this.getSupplierByuser()
        this.getBuyers()
    //   await this.getBuyers()
      this.findCalculateTaskByPage()
    },
    findCalculateTaskByPage() {
        this.tableLoading = true
      findCalculateTaskByPage({
        ...this.searchForm,
        currentPage: this.page.currPage,
        isOnlyMyself: true,
        pageSize: this.page.pageSize,
      }).then((res) => {
        if(res?.code=='200'){
            let tableListData = res?.data?.records || []
            this.tableListData = tableListData.map(item=>{
                if(item.balanceType==1){
                    item.primarySupplier = item.supplierSapCode+'-'+item.supplierName
                }else if(item.balanceType==2){
                    item.secondSupplier = item.supplierSapCode+'-'+item.supplierName
                }
                return item
            })
            this.page.totalCount = res.total
        }
        // if (res?.result) {
        //   var test = res.data
        //   test.forEach((e) => {
        //     if (e.params) {
        //       const obj = JSON.parse(e.params)
        //       e.balanceEndDate = obj.balanceEndDate
        //       e.balanceStartDate = obj.balanceStartDate
        //       e.userId = obj.userId
        //       e.firstSupplierName = obj.fSupplierName
        //       e.firstSupplierId = obj.fSupplierId
        //     }
        //     const buyusName = this.operatorBuyus.filter(
        //       (item) => item.id == e.createBy
        //     )
        //     e.userName = buyusName[0]?.name
        //   })
        //   this.tableListData = test

        //   this.page.currPage = res.pageNum
        //   this.page.pageSize = res.pageSize
        //   this.page.totalCount = res.total
        // }
      }).finally(()=>{
        this.tableLoading = false
      })
    },
    getBuyers() {
      return new Promise((resole, reject) => {
        getBuyers({}).then((res) => {
          if (res.code === '200') {
            this.operatorBuyus = res.data
            resole()
          } else {
            reject()
            iMessage.error(res.desZh)
          }
        })
      })
    },
    getSupplierByuser() {
      getSupplierByuser({}).then((res) => {
        if (res.code === '200') {
          this.fsupplierList = JSON.parse(JSON.stringify(res.data))
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    handleSelectionChange(val) {},
    handleSizeChange(val) {
      this.page.pageSize = val
      this.page.currPage = 1
      this.findCalculateTaskByPage()
    },
    handleCurrentChange(val) {
      this.page.currPage = val
      this.findCalculateTaskByPage()
    }
  }
}
</script>

<style scoped lang="scss">
.title-us {
  font-size: 14px;
  margin-right: 5px;
}

.openPage {
  position: relative;
  color: $color-blue;
  font-size: 14px;
  cursor: pointer;
}
</style>