<!--
 * @Author: youyuan
 * @Date: 2021-10-14 14:44:54
 * @LastEditTime: 2023-02-14 17:42:56
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipReplenishmentOverview\components\detailDialog.vue
-->
<template>
  <iDialog
    class="dialog"
    :title="params.supplierSapCode + '-' + params.supplierName"
    :visible.sync="visible"
    width="85%"
    @close="closeDiolog"
  >
    <searchBox
      @sure="handleSubmitSearch"
      @reset="handleSearchReset"
      :searchForm="searchForm"
      :searchFormData="searchFormData"
      :options="options"
    />
    <el-divider></el-divider>
    <iTabsList
      v-model="tabsValue"
      @tab-click="tableChange"
      type="card"
      class="iTabsList"
    >
      <el-tab-pane name="1" :label="language('ZONGLAN', '总览')"></el-tab-pane>
      <el-tab-pane name="2" :label="language('明细', '明细')"></el-tab-pane>
    </iTabsList>
    <div class="contentBox">
      <div class="tableOptionBox">
        <div class="tableTitle">
          <span class="margin-right10">只看自己</span>
          <el-switch
            v-model="searchForm.isSeeMe"
            @change="lookUs"
            :active-value="true"
            :inactive-value="false"
          />
        </div>
        <iButton
          @click="handleExportCurrent"
          v-permission="MTZ_REPORT_BUCHAGUANLI_MTZBUCHAZONGLAN_DAOCHUDANGYE"
          >{{ language('DAOCHU', '导出') }}</iButton
        >
      </div>
      <tableList
        class="margin-top20"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        :key="tabsValue"
        :index="true"
        :selection="false"
        height="300"
        @handleSelectionChange="handleSelectionChange"
      >
      </tableList>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, handleSubmitSearch)"
        @current-change="handleCurrentChange($event, getTableData)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </div>
  </iDialog>
</template>

<script>
import {
  iMessage,
  iDialog,
  iSelect,
  iButton,
  iDatePicker,
  iPagination,
  iTabsList,
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/components/commonTable/index.vue'
import searchBox from '../../components/searchBox.vue'
import {
  tableTitle1Overview,
  tableTitle1Detail,
  tableTitle2Overview,
  tableTitle2Detail,
  searchFormData1,
  searchFormData2
} from './data'
import {
  findSupplierBalanceSummaryByPage,
  findSupplierBalanceSummaryDetailList,
  getTaskSecondSupplierList,
  getTaskDepartmentList,
  getTaskBuyerList,
  exportSupplierBalanceSummary,
  exportSupplierBalanceSummaryDetail
} from '@/api/mtz/annualGeneralBudget/chipReplenishment'

export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iSelect,
    iButton,
    iDatePicker,
    iPagination,
    tableList,
    iTabsList,
    searchBox
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default: () => {}
    },
    supplierType: {
      type: String,
      default: '一次件供应商'
    }
  },
  data() {
    return {
      tabsValue: '1',
      type: 1,
      searchForm: {},
      searchFormData: [],
      options: {
        sSupplierDropDownData: [], //二次件供应商编号
        departmentDropDownData: [], //科室
        linieDropDownData: [] //采购员
      },
      loading: false,
      tableTitle: [],
      tableListData: [],
      selection: []
    }
  },
  watch: {
    tabsValue: {
      handler(val) {
        if (val == 1) {
          // 总览
          this.searchFormData = searchFormData1
          this.tableTitle =
            this.supplierType == '一次件供应商'
              ? tableTitle1Overview
              : tableTitle2Overview
        } else {
          // 明细
          this.tableTitle = tableTitle1Detail
          this.searchFormData =
            this.supplierType == '一次件供应商'
              ? searchFormData1
              : searchFormData2
        }
        this.getTableData()
      },
      immediate: true
    }
  },
  created() {
    this.$nextTick((_) => {
      this.getDeptList()
      this.getSecondSupplier()
      this.getCurrentUser()
    })
  },
  methods: {
    tableChange(val) {
      if (val.name !== this.tabsValue) {
        this.tabsValue = val.name
      }
    },
    // 获取列表数据
    getTableData() {
      this.loading = true
      console.log(this.searchForm)
      let params = {
        ...this.searchForm,
        makeStartDate: this.searchForm.compDate
          ? window
              .moment(this.searchForm.compDate[0])
              .format('YYYY-MM-DD 00:00:00')
          : '',
        makeEndDate: this.searchForm.compDate
          ? (this.searchForm.endDate = window
              .moment(this.searchForm.compDate[1])
              .format('YYYY-MM-DD 23:59:59'))
          : '',
        isPrimary: this.supplierType == '一次件供应商',
        currentPage: this.page.currPage,
        pageSize: this.page.pageSize
      }
      if (this.tabsValue == '1') {
        findSupplierBalanceSummaryByPage(params).then((res) => {
          if (res?.code == '200') {
            this.tableListData = res.data.orders
            this.page.totalCount = res.data.total
          } else {
            iMessage.error(this.$i18n.locale == 'zh' ? res.desZh : res.desEn)
          }
        }).finally(()=>{
          this.loading = false
        })
      } else {
        findSupplierBalanceSummaryDetailList(params).then((res) => {
          if (res?.code == '200') {
            this.tableListData = res.data
            this.page.totalCount = res.data.length
          } else {
            iMessage.error(this.$i18n.locale == 'zh' ? res.desZh : res.desEn)
          }
        }).finally(()=>{
          this.loading = false
        })
      }
    },
    // 获取二次件供应商编号-名称
    getSecondSupplier() {
      getTaskSecondSupplierList().then((res) => {
        if (res && res.code == 200) {
          this.options.sSupplierDropDownData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取部门数据
    getDeptList() {
      getTaskDepartmentList().then((res) => {
        if (res && res.code == 200) {
          this.options.departmentDropDownData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取采购员
    getCurrentUser() {
      getTaskBuyerList().then((res) => {
        if (res && res.code == 200) {
          this.options.linieDropDownData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 查询
    handleSubmitSearch() {
      this.page.currPage = 1
      this.getTableData()
    },
    // 重置
    handleSearchReset() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.initSeachData('clear')
      this.getTableData()
    },
    // 选中项改变
    handleSelectionChange(val) {
      this.selection = val
    },
    // 关闭弹窗
    closeDiolog() {
      this.$emit('update:visible', false)
    },
    lookUs() {
      this.handleSubmitSearch()
    },
    // 导出当页
    handleExportCurrent() {
      let params = {
        ...this.searchForm,
        makeStartDate: this.searchForm.compDate
          ? window
              .moment(this.searchForm.compDate[0])
              .format('YYYY-MM-DD 00:00:00')
          : '',
        makeEndDate: this.searchForm.compDate
          ? (this.searchForm.endDate = window
              .moment(this.searchForm.compDate[1])
              .format('YYYY-MM-DD 23:59:59'))
          : '',
        isPrimary: this.supplierType == '一次件供应商',
        currentPage: this.page.currPage,
        pageSize: this.page.pageSize
      }
      if (this.tabsValue == '1') {
        exportSupplierBalanceSummary(params)
      } else {
        exportSupplierBalanceSummaryDetail(params)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.contentBox {
  padding-bottom: 20px;
  .tableOptionBox {
    .tableTitle {
      display: inline;
      font-weight: bold;
      font-size: 16px;
      color: #000;
      margin: 0 10px;
    }
    button {
      float: right;
      z-index: 100;
      margin-bottom: 20px;
      margin-left: 10px;
    }
  }
}
.leftBox {
  margin-right: 200px;
}
.iTabsList {
  background: #fff;
}
</style>
