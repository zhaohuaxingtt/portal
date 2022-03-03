<!--
 * @Author: your name
 * @Date: 2021-10-17 13:17:43
 * @LastEditTime: 2022-03-03 17:17:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\supplementaryList\theSearch.vue
-->
<template>
  <div>
    <iSearch @sure="sure"
             @reset="reset">
      <el-form :model="searchForm"
               ref="searchForm">
        <el-form-item label="补差单号">
          <custom-select v-model="searchForm.idList"
                         :user-options="mtzDocNos"
                         clearable
                         multiple
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
          </custom-select>

        </el-form-item>
        <el-form-item label="凭证Id">
          <custom-select v-model="searchForm.sapPayBalanceNo"
                         :user-options="sapPayBalanceNos"
                         clearable
                         multiple
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
          </custom-select>
        </el-form-item>
        <el-form-item label="材料中类">
          <custom-select v-model="searchForm.mgroups"
                         :user-options="mgroups"
                         multiple
                         clearable
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
          </custom-select>

        </el-form-item>
        <el-form-item label="原材料">
          <custom-select v-model="searchForm.materialNos"
                         :user-options="rawMaterialNos"
                         multiple
                         clearable
                         @change="handleChangmater"
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="codeMessage"
                         value-member="code"
                         value-key="code">
          </custom-select>

        </el-form-item>
        <el-form-item label="申请人">
          <custom-select v-model="searchForm.createBys"
                         :user-options="applicants"
                         multiple
                         clearable
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
          </custom-select>

        </el-form-item>
        <el-form-item label="一次件供应商">
          <custom-select v-model="searchForm.fsupplierIds"
                         @change="handleChangeFirstSupplier"
                         :user-options="fsupplierList"
                         multiple
                         clearable
                         display-member="codeMessage"
                         value-member="code"
                         value-key="code">
          </custom-select>

        </el-form-item>
        <el-form-item label="二次件供应商">
          <custom-select v-model="searchForm.ssupplierIds"
                         :user-options="ssupplierList"
                         multiple
                         clearable
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="codeMessage"
                         value-member="code"
                         value-key="code">
          </custom-select>

        </el-form-item>
        <el-form-item label="科室">
          <custom-select v-model="searchForm.departments"
                         :user-options="deptList"
                         multiple
                         clearable
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="departNameEn"
                         value-member="departId"
                         value-key="departId">
          </custom-select>

        </el-form-item>
        <el-form-item label="单据状态">
          <custom-select v-model="searchForm.statuss"
                         :user-options="approvalStatus"
                         multiple
                         clearable
                         :placeholder="language('QINGXUANZESHURU', '请选择/输入')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
          </custom-select>

        </el-form-item>
        <el-form-item label="补差时间段">
          <iDatePicker v-model="value"
                       @change="handleChange"
                       type="daterange"
                       range-separator="至"
                       start-placeholder="开始日期"
                       end-placeholder="结束日期">
          </iDatePicker>
        </el-form-item>

      </el-form>
    </iSearch>
  </div>
</template>

<script>
import { iSearch, iMessage, iDatePicker } from 'rise'
import { getMtzDocNos, getSapPayBalanceNos, getApplicants, getApprovalStatus } from '@/api/mtz/annualGeneralBudget/supplementaryList'
import { getDeptData } from '@/api/kpiChart/index'
import { getMtzGroups, getRawMaterialNos, getMtzSupplierList } from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
import { fetchRemoteDept } from '@/api/mtz/annualGeneralBudget/annualBudgetEdit'
export default {
  name: "theSearch",
  components: {
    iSearch,
    iDatePicker
  },
  data () {
    return {
      searchForm: {
        idList: [],
        sapPayBalanceNo: [],
        mgroups: [],
        materialNos: [],
        createBys: [],
        fsupplierIds: [],
        ssupplierIds: [],
        departments: [],
        statuss: [],
        monthFrom: "",
        monthTo: "",
      },
      value: "",
      selectOptions: [],
      mtzDocNos: [],//补差单号
      sapPayBalanceNos: [],//sap补差单号下拉
      applicants: [],//申请人下拉
      approvalStatus: [],//单据状态下拉
      deptList: [],//部门数据
      mgroups: [],//材料中类编号
      rawMaterialNos: [],//原材料编号
      fsupplierList: [],//一次供应商
      ssupplierList: [],//二次供应商
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.getMtzDocNos()
      this.getDeptData()
      this.getSapPayBalanceNos()
      this.getApplicants()
      this.getMgroups()
      this.getRawMaterialNos()
      this.getApprovalStatus()
      getMtzSupplierList({}).then(res => {
        if (res.code === '200') {
          this.fsupplierList = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
      getMtzSupplierList({}).then(res => {
        if (res.code === '200') {
          this.ssupplierList = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })

    },
    handleChangeFirstSupplier (val) {
      console.log(val)
    },
    //补差单号下拉框
    getMtzDocNos (key) {
      getMtzDocNos({
        keyWords: key
      }).then(res => {
        this.mtzDocNos = res.data
      })
    },
    //sap补差单号下拉选择
    getSapPayBalanceNos (key) {
      getSapPayBalanceNos({
        keyWords: key
      }).then(res => {
        this.sapPayBalanceNos = res.data
      })
    },
    //申请人下拉选择
    getApplicants (key) {
      getApplicants({
        keyWords: key
      }).then(res => {
        this.applicants = res.data
      })
    },
    //单据状态下拉选择
    getApprovalStatus (key) {
      getApprovalStatus({
        keyWords: key
      }).then(res => {
        this.approvalStatus = res.data
      })
    },
    //材料中类编号-名称
    getMgroups (key) {
      getMtzGroups({
        keyWords: key || ""
      }).then(res => {
        if (res.code === '200') {
          this.mgroups = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    //原材料编号
    getRawMaterialNos (key) {
      getRawMaterialNos({
        keyWords: key || ""
      }).then(res => {
        if (res.code === '200') {
          this.rawMaterialNos = res.data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    // 获取部门数据
    getDeptData () {
      fetchRemoteDept({}).then(res => {
        if (res && res.code == 200) {
          this.deptList = res.data
        } else iMessage.error(res.desZh)
      })
    },
    handleChange (val) {
      this.searchForm.monthFrom = window.moment(val[0]).format('yyyy-MM-DD')
      this.searchForm.monthTo = window.moment(val[1]).format('yyyy-MM-DD')
    },
    sure () {
      console.log(this.$parent.$children)
      this.$parent.$children.forEach(item => {
        if (item.$options._componentTag === 'theTable') {
          item.page.currPage = 1;
          item.page.pageSize = 10;
          item.getmakeUpPageList()
        }
      })
    },
    reset () {
      // this.$refs.searchForm.resetFields()
      this.searchForm = {
        idList: [],
        sapPayBalanceNos: [],
        mgroups: [],
        materialNos: [],
        createBys: [],
        fsupplierIds: [],
        ssupplierIds: [],
        departments: [],
        statuss: [],
        monthFrom: "",
        monthTo: "",
      }
      this.value = ""
      this.$parent.$children.forEach(item => {
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
  