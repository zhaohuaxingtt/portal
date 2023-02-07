<!--
 * @Author: youyuan
 * @Date: 2021-10-14 14:44:54
 * @LastEditTime: 2023-02-06 20:05:35
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\created\computePage.vue
-->
<template>
  <iPage>
    <div class="header">
      <h1>{{ supplierType }}供应商芯片补差计算（{{ statusName }}）</h1>
      <div>
        <iButton @click="updateBalance">保存</iButton>
        <iButton @click="submit">提交</iButton>
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
        :data="tableData"
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
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :current-page="page.currPage"
          :total="page.totalCount"
          :layout="page.layout"
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
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :current-page="page.currPage"
          :total="page.totalCount"
          :layout="page.layout"
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
import { pageMixins } from '@/utils/pageMixins'
import tableList from '@/components/commonTable/index.vue'
import search from '../components/search.vue'
import {
  getSupplierByUser,
  findBalanceById,
  updateBalance,
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
import { fetchCurrentUser } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzReplenishmentOverview/detail'
import { queryDeptSectionForCompItem } from '@/api/mtz/annualGeneralBudget/annualBudgetEdit'
import { getMtzSupplierList } from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
import { exportAppRecordByCondition } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
export default {
  mixins: [pageMixins],
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
      detailInfo: {},
      infoFormData,
      tabsValue: '1',
      supplierType: 1,
      searchForm: {},
      computedFormData,
      tableTitleRule: tableTitle,
      options: {
        sSupplierDropDownData: [], //二次件供应商编号
        departmentDropDownData: [], //科室
        linieDropDownData: [] //采购员
      },
      loading: false,
      tableTitleBE: [],
      tableListData: [],
      selection: [],
      savedBalanceItemList: [],
      balanceItemList: []
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
        this.getTableData()
      },
      immediate: true
    }
  },
  created() {
    this.supplierType = this.$route.query.type == '1' ? '一次件' : '散件'
    this.balanceId = this.$route.query.balanceId
    this.getSupplierByUser()
    if (this.balanceId) {
      this.findBalanceById()
    } else {
      // 新建
      this.$nextTick((_) => {
        this.getDeptList()
        this.getTableData()
        this.getCurrentUser()
      })
    }
  },
  methods: {
    findBalanceById() {
      findBalanceById({
        balanceId: this.balanceId,
        isExisted: this.tabsValue == '2',
        ...this.searchForm
      }).then((res) => {
        console.log(res)
        if (res?.code == '200') {
          this.info = res.data
          this.statusName = res.data.balanceTaskBase.taskStatusName
          let detailInfo = res.data.balanceBase
          detailInfo.supplier =
            res.data.balanceBase.supplierSapCode +
            '-' +
            res.data.balanceBase.supplierName
          detailInfo.dateRange = [
            res.data.balanceBase.startFrom,
            res.data.balanceBase.endTo
          ]
          // 又实补显示实补,没有的话默认填充待补差凭证
          detailInfo.approvedAmount =
            res.data.balanceBase.approvedAmount ||
            res.data.balanceBase.approvedAmount
            
          detailInfo.statusName = res.data.balanceTaskBase.taskStatusName
          this.$set(this, 'detailInfo', detailInfo)
          this.tableData = res.data.balanceRuleList
          this.savedBalanceItemList = res.data.savedBalanceItemList || [] // 已发起凭证
          this.balanceItemList = res.data.balanceItemList || [] // 待发起凭证
        }
      })
    },
    // 保存
    updateBalance() {
      if (!this.detailInfo.approvedAmount) {
        return iMessage.warn('请填写实补金额')
      }
      updateBalance(this.info).then((res) => {
        console.log(res)
        if (res?.code == '200') {
          iMessage.success(this.$i18n.locale == 'zh' ? res.desZh : res.desEn)
        }
      })
    },
    // 提交
    submit() {
      updateBalance(this.info).then((res) => {
        if (res?.code == '200') {
          sendSupplierConfirm([this.balanceId]).then((res1) => {
            if (res?.code == '200') {
              iMessage.success(
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
      deleteBalanceItem(this.selection.map((item) => item.id)).then(res => {
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
      this.findBalanceById()
    },
    // 获取待审批,已审批列表数据
    getTableData() {
      // this.loading = true
      console.log(this.searchForm)
      // fetchTableData({
      //   ...this.searchForm,
      //   pageNo: this.page.currPage,
      //   pageSize: this.page.pageSize,
      //   fsupplier: this.params.firstSupplierId || null,
      //   compStartDate: this.searchForm.compDate
      //     ? this.searchForm.compDate[0]
      //     : null,
      //   compEndDate: this.searchForm.compDate
      //     ? this.searchForm.compDate[1]
      //     : null
      // }).then((res) => {
      //   console.log('res', res)
      //   if (res && res.code == 200) {
      //     this.loading = false
      //     this.page.totalCount = res.total
      //     this.tableListData = res.data
      //   } else iMessage.error(res.desZh)
      // })
    },
    // 获取二次件供应商编号-名称
    getSupplierByUser() {
      getSupplierByUser().then((res) => {
        if (res && res.code == 200) {
          this.options.sSupplierDropDownData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取部门数据
    getDeptList() {
      queryDeptSectionForCompItem({}).then((res) => {
        if (res && res.code == 200) {
          this.options.departmentDropDownData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取采购员
    getCurrentUser() {
      fetchCurrentUser({}).then((res) => {
        if (res && res.code == 200) {
          this.options.linieDropDownData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 查询
    handleSubmitSearch() {
      this.page.currPage = 1
      this.findBalanceById() // 从中筛选待发起,已发起凭证
      // this.getTableData()
    },
    // 重置
    handleSearchReset() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.searchForm = {}
      this.findBalanceById()
      // this.getTableData()
    },
    // 选中项改变
    handleSelectionChange(val) {
      this.selection = val
    },
    // 关闭弹窗
    closeDiolog() {
      this.$emit('handleCloseDialog')
    },
    lookUs() {
      this.handleSubmitSearch()
    },
    // 导出规则
    exportBalanceRuleList() {
      exportBalanceRuleList({ balanceId: this.balanceId }).then((res) => {
        console.log(res)
      })
    },
    // 导出凭证
    exportBalanceItemList() {
      exportBalanceItemList({
        balanceId: this.balanceId,
        isExisted: this.tabsValue == '2',
        ...this.searchForm
      }).then((res) => {
        console.log(res)
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
