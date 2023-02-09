<template>
  <div>
    <search
      @sure="sure"
      @reset="reset"
      :searchForm="searchForm"
      :searchFormData="searchFormData"
      :options="options"
    />
    <iCard class="margin-top20">
      <div class="margin-bottom10">
        <span class="title-us">{{ $t('LK_JINKANZIJI') }}</span>
        <el-switch @change="changeSwitch" v-model="isOnlyMyself"> </el-switch>
      </div>
      <iTableCustom
        :loading="tableLoading"
        :data="tableListData"
        :columns="tableTitle"
        @handleDetail="handleDetail"
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
  </div>
</template>

<script>
import { iSearch, iSelect, iCard, iPagination, iTableCustom } from 'rise'
import search from '../components/search.vue'
import { tableTitle, searchFormData } from './data'
import {
  getSupplierByuser,
  findCalculateTaskByPage,
  getBalanceTaskStatusList,
  getTaskPrimarySupplierList,
  getTaskSecondSupplierList,
  getTaskBuyerList,
  getTaskDepartmentList
} from '@/api/mtz/annualGeneralBudget/chipReplenishment'
import { getBuyers } from '@/api/mtz/mtzCalculationTask'
import { pageMixins } from '@/utils/pageMixins'

export default {
  mixins: [pageMixins],
  components: {
    iSearch,
    iSelect,
    iCard,
    iTableCustom,
    iPagination,
    search
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
            labelEn: '一次件芯片补差'
          },
          {
            value: 2,
            label: '散件芯片补差',
            labelEn: '散件芯片补差'
          }
        ],
        taskStatusList: [
          {
            code: 0,
            message: '准备中',
            labelE: 'Preparing'
          },
          {
            code: 1,
            message: '计算中',
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

      selectData: [],
      flag: false,
      materialCodes: []
    }
  },
  created() {
    this.getData()
    getBalanceTaskStatusList().then((res) => {
      this.$set(this.options, 'taskStatusList', res.data)
    })
  },
  methods: {
    changeSwitch(val) {
      this.isOnlyMyself = val
      this.sure()
    },
    handleDetail(val) {
      let num = val.taskStatus
      if (num == 'FINISHED') {
        // 计算完成
        window.open(
          `/portal/#/chipComputed?type=${val.balanceType}&balanceId=${val.balanceId}`
        )
      }
      //  if (num == 1)
      else {
        // 计算中
        window.open(
          `/portal/#/chipCeated?type=${val.balanceType}&taskStatus=${val.taskStatus}&balanceId=${val.balanceId}`
        )
      }
    },
    sure() {
      this.page.currPage = 1
      this.findCalculateTaskByPage()
    },
    reset() {
      this.searchForm = {}
      this.searchFormData.forEach(item=>{
        if(item.showAll) this.searchForm[item.props] = ''
      })
      this.sure()
    },
    async getData() {
      this.getTaskPrimarySupplierList()
      this.getTaskSecondSupplierList()
      this.getTaskDepartmentList()
      this.getTaskBuyerList()
      //   await this.getTaskBuyerList()
      this.findCalculateTaskByPage()
    },
    findCalculateTaskByPage() {
      this.tableLoading = true
      findCalculateTaskByPage({
        ...this.searchForm,
        currentPage: this.page.currPage,
        isOnlyMyself: this.isOnlyMyself,
        pageSize: this.page.pageSize
      })
        .then((res) => {
          if (res?.code == '200') {
            let tableListData = res?.data?.records || []
            this.tableListData = tableListData.map((item) => {
              if (item.balanceType == 1) {
                item.primarySupplier =
                  item.supplierSapCode + '-' + item.supplierName
              } else if (item.balanceType == 2) {
                item.secondSupplier =
                  item.supplierSapCode + '-' + item.supplierName
              }
              return item
            })
            this.page.totalCount = res.data.total
          }
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    // 获取科室
    getTaskDepartmentList() {
      getTaskDepartmentList().then((res) => {
        if (res?.code == 200) {
          this.options.deptList = JSON.parse(JSON.stringify(res.data))
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    // 获取采购员
    getTaskBuyerList() {
        getTaskBuyerList().then((res) => {
          if (res?.code == '200') {
            this.options.operatorBuyus = res.data
          } else {
            iMessage.error(res.desZh)
          }
        })
    },
    // 获取芯片一次件供应商
    getTaskPrimarySupplierList() {
      getTaskPrimarySupplierList().then((res) => {
        if (res?.code == 200) {
          this.options.fsupplierList = JSON.parse(JSON.stringify(res.data))
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    // 获取芯片二次件供应商
    getTaskSecondSupplierList() {
      getTaskSecondSupplierList().then((res) => {
        if (res?.code == 200) {
          this.options.ssupplierList = JSON.parse(JSON.stringify(res.data))
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    getSupplierByuser() {
      getSupplierByuser({}).then((res) => {
        if (res.code === '200') {
          this.options.fsupplierList = JSON.parse(JSON.stringify(res.data))
          this.options.ssupplierList = JSON.parse(JSON.stringify(res.data))
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
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