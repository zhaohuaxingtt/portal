<!--
 * @Author: youyuan
 * @Date: 2021-10-14 14:44:54
 * @LastEditTime: 2023-02-15 15:04:57
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\created\computePage.vue
-->
<template>
  <iPage :loading="loading">
    <div class="header">
      <h1>{{ supplierType }}供应商芯片补差计算（{{ statusName }}）</h1>
      <div>
        <iButton @click="updateBalance">保存</iButton>
        <iButton @click="submit">创建补差单</iButton>
      </div>
    </div>
    <search :searchForm="detailInfo" :searchFormData="infoFormData">
      <template slot="button"><span></span></template>
    </search>
    <iCard collapse class="margin-top20" title="补差规则">
      <div class="contentBox" slot="header-control">
        <div class="tableOptionBox">
          <iButton
            @click="exportBalanceRuleList"
            v-permission="MTZ_REPORT_BUCHAGUANLI_MTZBUCHAZONGLAN_DAOCHUDANGYE"
            >{{ language('DAOCHU', '导出') }}</iButton
          >
        </div>
      </div>
      <iTableCustom
        :data="ruleTableData"
        :columns="tableTitleRule"
        :tableLoading="loading"
      />
      <iPagination
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :current-page="page.currPage"
        :total="page.totalCount"
        :layout="page.layout"
      >
      </iPagination>
    </iCard>

    <search
      class="margin-top20"
      @sure="handleSubmitSearch"
      @reset="handleSearchReset"
      :searchForm="searchForm"
      :searchFormData="computedFormData"
      :options="options"
    />
    <iTabsList
      v-model="tabsValue"
      @tab-click="tableChange"
      type="card"
      class="margin-top20"
    >
      <el-tab-pane
        name="1"
        :label="language('待发起凭证', '待发起凭证')"
      ></el-tab-pane>
      <el-tab-pane
        name="2"
        :label="language('已发起凭证', '已发起凭证')"
      ></el-tab-pane>
    </iTabsList>
    <!-- 待发起 -->
    <iCard>
      <div class="contentBox">
        <div class="tableOptionBox">
          <iButton @click="deleteBalanceItem" v-if="tabsValue == 1">{{
            language('冲销', '冲销')
          }}</iButton>
          <iButton
            @click="exportBalanceItemList"
            v-permission="MTZ_REPORT_BUCHAGUANLI_MTZBUCHAZONGLAN_DAOCHUDANGYE"
            >{{ language('DAOCHU', '导出') }}</iButton
          >
        </div>
      </div>
      <div v-if="tabsValue == 1">
        <iTableCustom
          :data="balanceItemList"
          :columns="tableTitleBE"
          :tableLoading="loading"
          @handle-selection-change="handleSelectionChange"
        />
        <iPagination
          @size-change="balanceSizeChange"
          @current-change="balanceCurrentChange"
          :page-sizes="balancePage.pageSizes"
          :page-size="balancePage.pageSize"
          :current-page="balancePage.currPage"
          :total="balancePage.totalCount"
          :layout="balancePage.layout"
        >
        </iPagination>
      </div>
      <div v-else>
        <!-- 已发起 -->
        <iTableCustom
          :data="savedBalanceItemList"
          :columns="tableTitle"
          :tableLoading="loading"
        />
        <iPagination
          @size-change="saveBalanceSizeChange"
          @current-change="saveBalanceCurrentChange"
          :page-sizes="saveBalancePage.pageSizes"
          :page-size="saveBalancePage.pageSize"
          :current-page="saveBalancePage.currPage"
          :total="saveBalancePage.totalCount"
          :layout="saveBalancePage.layout"
        >
        </iPagination>
      </div>
    </iCard>
  </iPage>
</template>

<script>
import {
  iPage,
  iMessage,
  iDialog,
  iSelect,
  iButton,
  iDatePicker,
  iPagination,
  iTabsList,
  iCard,
  iTableCustom,
  iMessageBox
} from 'rise'
import tableList from '@/components/commonTable/index.vue'
import search from '../components/search.vue'
import {
  getTaskSecondSupplierList,
  findBalanceById,
  updateBalance,
  createBalance,
  sendSupplierConfirm,
  deleteBalanceItem,
  exportBalanceRuleList,
  exportBalanceItemList
} from '@/api/mtz/annualGeneralBudget/chipReplenishment'
import {
  infoFormData,
  tableTitle,
  tableTitleBE1,
  tableTitleBE2,
  tableTitleComplete1,
  computedFormData
} from './components/data'
export default {
  components: {
    iPage,
    iDialog,
    iSelect,
    iButton,
    iDatePicker,
    iPagination,
    tableList,
    iTabsList,
    iCard,
    iTableCustom,
    search
  },
  props: {
    value: {
      type: Boolean,
      default: true
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
      // 规则表分页
      page: {
        totalCount: 0, //总条数
        pageSize: 10, //每页多少条
        pageSizes: [10, 20, 50, 100], //每页条数切换
        currPage: 1, //当前页
        layout: 'sizes, prev, pager, next, jumper'
      },
      // 待发起表格分页
      balancePage: {
        totalCount: 0, //总条数
        pageSize: 10, //每页多少条
        pageSizes: [10, 20, 50, 100], //每页条数切换
        currPage: 1, //当前页
        layout: 'sizes, prev, pager, next, jumper'
      },
      // 已发起表格分页
      saveBalancePage: {
        totalCount: 0, //总条数
        pageSize: 10, //每页多少条
        pageSizes: [10, 20, 50, 100], //每页条数切换
        currPage: 1, //当前页
        layout: 'sizes, prev, pager, next, jumper'
      },
      detailInfo: {},
      infoFormData,
      tabsValue: '1',
      supplierType: 1,
      searchForm: {},
      computedFormData,
      tableTitleRule: tableTitle,
      options: {
        sSupplierDropDownData: [], //二次件供应商编号
      },
      loading: false,
      tableTitleBE: [],
      tableListData: [],
      selection: [],
      ruleDataAll: [],
      balanceDataAll: [],
      saveBalanceDataAll: []
    }
  },
  watch: {
    tabsValue: {
      handler(val) {
        if (val == 1) {
          // 待发起
          this.tableTitleBE =
            this.supplierType == '一次件供应商' ? tableTitleBE1 : tableTitleBE2
        } else {
          // 已发起
          this.tableTitle = tableTitleComplete1
        }
      },
      immediate: true
    }
  },
  computed: {
    // 规则表
    rulePageData() {
      return _.chunk(this.ruleDataAll, this.page.pageSize)
    },
    ruleTableData() {
      return this.rulePageData[this.page.currPage - 1] || []
    },
    // 已发起，待发起凭证
    balancePageData() {
      return _.chunk(this.balanceDataAll, this.balancePage.pageSize)
    },
    balanceItemList() {
      return this.balancePageData[this.balancePage.currPage - 1] || []
    },
    // 已发送凭证
    saveBalancePageData() {
      return _.chunk(this.saveBalanceDataAll, this.saveBalancePage.pageSize)
    },
    savedBalanceItemList() {
      return this.saveBalancePageData[this.saveBalancePage.currPage - 1] || []
    }
  },
  created() {
    this.supplierType = this.$route.query.type == '1' ? '一次件' : '散件'
    this.balanceId = this.$route.query.balanceId
    this.getTaskSecondSupplierList()
    if (this.balanceId) {
      this.findBalanceById()
    }
  },
  methods: {
    // 规则
    handleSizeChange(val) {
      this.page.currPage = 1
      this.page.pageSize = val
    },
    handleCurrentChange(val) {
      this.page.currPage = val
    },
    // 待发起
    balanceSizeChange(val) {
      this.balancePage.currPage = 1
      this.balancePage.pageSize = val
    },
    balanceCurrentChange(val) {
      this.balancePage.currPage = val
    },
    // 已发起
    saveBalanceSizeChange(val) {
      this.saveBalancePage.currPage = 1
      this.saveBalancePage.pageSize = val
    },
    saveBalanceCurrentChange(val) {
      this.saveBalancePage.currPage = val
    },


    // 获取数据
    findBalanceById() {
      this.loading = true
      findBalanceById({
        balanceId: this.balanceId,
        ...this.searchForm
      })
        .then((res) => {
          if (res?.code == '200') {
            this.info = res.data
            this.statusName = res.data.balanceTaskBase?.taskStatusName||''
            let detailInfo = res.data.balanceBase
            detailInfo.supplier =
              res.data.balanceBase.supplierSapCode +
              '-' +
              res.data.balanceBase.supplierName
            detailInfo.dateRange = [
              res.data.balanceBase.startFrom,
              res.data.balanceBase.endTo
            ]
            // totalAmount 补差总额
            detailInfo.totalAmount = res.data.totalAmount
            // 有实补显示实补,没有的话默认填充待发起凭证
            detailInfo.actualMakeAmount =
              res.data.balanceBase.actualMakeAmount ||
              res.data.balanceBase.toBeSubmitAmount

            detailInfo.statusName = res.data.balanceTaskBase?.taskStatusName||''
            detailInfo.submittedAmount = res.data.submittedAmount
            detailInfo.toBeSubmitAmount = res.data.toBeSubmitAmount
            this.$set(this, 'detailInfo', detailInfo)
            // 规则表
            this.ruleDataAll = res.data.balanceRuleList
            this.page.totalCount = res.data.balanceRuleList.length
            // 待发起凭证
            this.balanceDataAll = res.data.tobeSavedBalanceItemList
            this.balancePage.totalCount = res.data.tobeSavedBalanceItemList.length
            // 已发起凭证
            this.saveBalanceDataAll = res.data.savedBalanceItemList
            this.saveBalancePage.totalCount =
              res.data.savedBalanceItemList.length
            console.log(this.saveBalancePage.totalCount)
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 保存
    updateBalance() {
      if (!this.detailInfo.actualMakeAmount) {
        return iMessage.warn('请填写实补金额')
      }
      if (this.detailInfo.actualMakeAmount > this.detailInfo.toBeSubmitAmount) {
        return iMessage.warn('实补金额不能超出待发起凭证金额')
      }
      updateBalance(this.info).then((res) => {
        if (res?.code == '200') {
          iMessage.success(this.$i18n.locale == 'zh' ? res.desZh : res.desEn)
          this.findBalanceById()
        } else {
          iMessage.error(this.$i18n.locale == 'zh' ? res1.desZh : res1.desEn)
        }
      })
    },
    // 创建补差单:获取补差单号
    submit() {
      if (!this.detailInfo.actualMakeAmount) {
        return iMessage.warn('请填写实补金额')
      }
      if (this.detailInfo.actualMakeAmount > this.detailInfo.toBeSubmitAmount) {
        return iMessage.warn('实补金额不能超出待发起凭证金额')
      }
      updateBalance(this.info).then((res) => {
        if (res?.code == '200') {
          createBalance({balanceId:this.balanceId}).then((res1) => {
            if (res?.code == '200') {
              iMessage.success(
                this.$i18n.locale == 'zh' ? res1.desZh : res1.desEn
              )
              this.findBalanceById()
            } else {
              iMessage.error(
                this.$i18n.locale == 'zh' ? res1.desZh : res1.desEn
              )
            }
          })
        }
      })
    },
    // 冲销
    deleteBalanceItem() {
      if (!this.selection.length) return iMessage.warn('请选择数据')
      deleteBalanceItem(this.selection.map((item) => item.id)).then((res) => {
        if (res?.code == '200') {
          iMessage.success(this.$i18n.locale == 'zh' ? res.desZh : res.desEn)
          this.findBalanceById()
        } else {
          iMessage.error(this.$i18n.locale == 'zh' ? res.desZh : res.desEn)
        }
      })
    },
    tableChange(val) {
      if (val.name !== this.tabsValue) {
        this.tabsValue = val.name
      }
      // this.findBalanceById()
    },
    // 获取二次件供应商编号-名称
    getTaskSecondSupplierList() {
      getTaskSecondSupplierList().then((res) => {
        if (res && res.code == 200) {
          this.options.sSupplierDropDownData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 查询
    handleSubmitSearch() {
      this.balancePage.currPage = 1
      this.saveBalancePage.currPage = 1
      this.findBalanceById() // 从中筛选待发起,已发起凭证
    },
    // 重置
    handleSearchReset() {
      this.page.currPage = 1
      this.balancePage.currPage = 1
      this.saveBalancePage.currPage = 1
      this.searchForm = {}
      this.findBalanceById()
    },
    // 选中项改变
    handleSelectionChange(val) {
      this.selection = val
    },
    // 导出规则
    exportBalanceRuleList() {
      exportBalanceRuleList(this.rulePageData.map(item=>item.id))
    },
    // 导出凭证列表
    exportBalanceItemList() {
      exportBalanceItemList({
        balanceId: this.balanceId,
        isExisted: this.tabsValue == '2',
        ...this.searchForm
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 20px;
}
.searchBox {
  position: relative;
  .searchButton {
    position: absolute;
    right: 0;
    top: 50px;
    z-index: 100;
  }
}
.contentBox {
  .tableOptionBox {
    text-align: right;
    margin-bottom: 10px;
  }
}
.leftBox {
  margin-right: 200px;
}
</style>
