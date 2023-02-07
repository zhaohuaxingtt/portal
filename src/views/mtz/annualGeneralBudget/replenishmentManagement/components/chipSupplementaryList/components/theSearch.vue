<!--
 * @Author: your name
 * @Date: 2021-10-17 13:17:43
 * @LastEditTime: 2023-02-06 20:17:13
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
  getApplicants,
  getApprovalStatus
} from '@/api/mtz/annualGeneralBudget/supplementaryList'
import {
  getBalanceStatusList,
  getTaskPrimarySupplierList,
  getTaskSecondSupplierList
} from '@/api/mtz/annualGeneralBudget/chipReplenishment'
import { fetchRemoteDept } from '@/api/mtz/annualGeneralBudget/annualBudgetEdit'
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
        applicants: [], //申请人下拉
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
      this.getDeptData()
      this.getApplicants()
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
    //申请人下拉选择
    getApplicants(key) {
      getApplicants({
        keyWords: key
      }).then((res) => {
        this.options.applicants = res.data
      })
    },
    //单据状态下拉选择
    getApprovalStatus(key) {
      getBalanceStatusList().then((res) => {
        this.options.approvalStatus = res.data
      })
    },
    // 获取部门数据
    getDeptData() {
      fetchRemoteDept({}).then((res) => {
        if (res && res.code == 200) {
          this.options.departmentDropDownData = res.data
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
      // this.$refs.searchForm.resetFields()
      this.searchForm = {
        idList: [],
        sapPayBalanceNo: [],
        mgroups: [],
        materialNos: [],
        createBys: [],
        fsupplierIds: [],
        ssupplierIds: [],
        departments: [],
        statuss: [],
        monthFrom: '',
        monthTo: ''
      }
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
// ::v-deep .el-date-editor .el-range-separator {
//   width: 8%;
//   line-height: 26px;
// }
// ::v-deep .el-date-editor .el-range__icon {
//   line-height: 26px;
// }
// ::v-deep .el-date-editor--daterange.el-input,
// .el-date-editor--daterange.el-input__inner,
// .el-date-editor--timerange.el-input,
// .el-date-editor--timerange.el-input__inner {
//   width: 260px;
// }
</style>
<style lang="scss">
.el-form-item {
  margin-right: 20px !important;
}
</style>
  