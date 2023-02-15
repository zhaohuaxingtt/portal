<template>
  <div>
    <iTabsList
      v-model="tabsValue"
      @tab-click="tableChange"
      type="card"
      class="margin-top20 iTabsList"
    >
      <el-tab-pane
        :name="1"
        :label="language('BUCHADIANHUIZONG', '补差单汇总')"
      ></el-tab-pane>
      <el-tab-pane
        :name="2"
        :label="language('BUCHADANMINGXI', '补差单明细')"
      ></el-tab-pane>
    </iTabsList>
    <div v-loading="loading">
      <div class="tabsBoxInfor">
        <div
          :style="
            item.prop == 'actuallyTotalAmt' ? { fontWeight: 'bold' } : null
          "
          class="inforDiv"
          v-for="(item, index) in tabsInforList"
          :key="index"
        >
          <span>{{ item.name }}</span>

          <div class="inforText">
            <!-- 补差时间段 -->
            <template v-if="item.prop == 'startFrom'">
              {{ formatDate(inforData['startFrom']) }}
              ~
              {{ formatDate(inforData['endTo']) }}
            </template>
            <!-- 供应商 -->
            <template v-else-if="item.prop == 'supplierName'">
              {{ inforData['supplierSapCode'] }}
              -
              {{ inforData['supplierName'] }}
            </template>
            <!-- 应补总额 -->
            <template v-else-if="item.prop == 'invoiceAmount'">
              {{ formatterNumber(inforData['invoiceAmount']) }}
            </template>
            <!-- 实补总额 -->
            <template v-else-if="item.prop == 'approvedAmount'">
              {{ formatterNumber(inforData['approvedAmount']) }}
            </template>
            <template v-else>{{ inforData[item.prop] }}</template>
          </div>
        </div>
      </div>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入备注"
        v-model="inforData.remark"
      ></el-input>
      <el-divider class="margin-top20"></el-divider>
      <div class="BtnTitle">
        <span>{{ tabsValue == 1 ? '汇总列表' : '明细列表' }}</span>
      </div>
      <tabs1
        :tableListData="detailTableData"
        v-if="tabsValue == 1"
        @componentHidden="btnHidden1"
      ></tabs1>
      <tabs2
        :tableListData="detailTableData"
        v-show="tabsValue == 2"
        @componentHidden="btnHidden2"
      ></tabs2>
    </div>
  </div>
</template>

<script>
import { iTabs, iTabsList } from 'rise'
import { tabsInforList } from '../chipSupplementaryList/components/data.js'
import { findBalanceById } from '@/api/mtz/annualGeneralBudget/chipReplenishment'
import tabs1 from '../chipSupplementaryList/components/tabs1.vue'
import tabs2 from '../chipSupplementaryList/components/tabs2.vue'

export default {
  components: {
    tabs1,
    tabs2,
    iTabs,
    iTabsList
  },
  data() {
    return {
      inforData: {},
      tabsInforList,
      tabsValue: 1,
      loading:false,
      balanceId: '',
      detailTableData: []
    }
  },
  created() {
    this.balanceId = this.$route.query.balanceId || ''
    this.getInforData()
  },
  methods: {
    formatDate(date, format = 'YYYY-MM-DD') {
      return window.moment(date).format(format)
    },
    // 获取明细
    getInforData() {
      this.loading = true
      findBalanceById({ balanceId: this.balanceId })
        .then((res) => {
          if (res?.code == '200') {
            this.inforData = _.cloneDeep(res.data.balanceBase)
            this.detailTableData = res.data.balanceItemList || []
          } else {
            this.inforData = {}
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    formatterNumber(cellValue) {
      return VueUtil.formatNumber(cellValue)
    },
    tableChange(val) {
      if (val.name !== this.tabsValue) {
        this.tabsValue = val.name
      }
    }
  }
}
</script>

<style lang='scss' scoped>
$boxShadow: #e6e6e6;
$tabsInforHeight: 35px;

.BtnTitle {
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  > span {
    font-size: 18px;
    font-weight: bold;
  }
}
.tabsBoxInfor {
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  flex-flow: wrap;
  .inforDiv:nth-child(3n + 2) {
    span {
      margin-left: 15%;
    }
  }
  .inforDiv:nth-child(3n + 3) {
    span {
      margin-left: 15%;
    }
  }
  .inforDiv {
    width: 33.3%;
    height: $tabsInforHeight;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 8px;
    margin-bottom: 8px;
    span {
    }
    .inforText {
      width: 60%;
      background: #f8f8fa;
      text-align: center;
      height: $tabsInforHeight;
      line-height: $tabsInforHeight;
    }
  }
}
</style>
