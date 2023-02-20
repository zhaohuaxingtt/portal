<!--
 * @Author: your name
 * @Date: 2021-10-17 13:17:43
 * @LastEditTime: 2023-02-15 15:36:58
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipSupplementaryList\components\theSearch.vue
-->
<template>
  <div>
    <search
      @sure="sure"
      @reset="reset"
      :searchForm="searchForm"
      :searchFormData="searchFormData"
      :options="options"
    />
  </div>
</template>

<script>
import { iSearch, iMessage, iDatePicker } from 'rise'
import {
  getBalanceStatusList,
  getTaskPrimarySupplierList,
  getTaskSecondSupplierList,
  getTaskBuyerList,
  getTaskDepartmentList
} from '@/api/mtz/annualGeneralBudget/chipReplenishment'
import search from '../../components/search.vue'
import { queryFormData } from './data'
export default {
  name: 'theSearch',
  components: {
    iSearch,
    iDatePicker,
    search
  },
  data() {
    return {
      searchForm: {},
      searchFormData: queryFormData,
      options: {
        linieDropDownData: [], //采购员下拉
        departmentDropDownData: [], //部门数据
        approvalStatus: [], //单据状态下拉
        fsupplierList: [], //一次供应商
        ssupplierList: [] //二次供应商
      },
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getTaskBuyerList()
      this.getTaskDepartmentList()
      this.getApprovalStatus()
      this.getTaskPrimarySupplierList()
      this.getTaskSecondSupplierList()
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
    //单据状态下拉选择
    getApprovalStatus(key) {
      getBalanceStatusList().then((res) => {
        this.options.approvalStatus = res.data
      })
    },
    // 获取部门数据
    getTaskDepartmentList() {
      getTaskDepartmentList({}).then((res) => {
        if (res?.code == 200) {
          this.options.departmentDropDownData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取采购员
    getTaskBuyerList() {
      getTaskBuyerList({}).then((res) => {
        if (res?.code == 200) {
          this.options.linieDropDownData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    
    handleChange(val) {
      this.searchForm.monthFrom = window.moment(val[0]).format('yyyy-MM-DD')
      this.searchForm.monthTo = window.moment(val[1]).format('yyyy-MM-DD')
    },
    sure() {
      console.log(this.$parent.$children)
      this.$parent.$children.forEach((item) => {
        if (item.$options._componentTag === 'theTable') {
          item.page.currPage = 1
          item.page.pageSize = 10
          item.getmakeUpPageList()
        }
      })
    },
    reset() {
      this.searchForm = {}
      this.searchFormData.forEach(item=>{
        if(item.showAll) this.searchForm[item.props] = ''
      })
      this.$parent.$children.forEach((item) => {
        if (item.$options._componentTag === 'theTable') {
          item.getmakeUpPageList()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-form-item {
  margin-right: 20px;
}
</style>
<style lang="scss">
.el-form-item {
  margin-right: 20px !important;
}
</style>
  