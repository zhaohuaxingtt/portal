<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: Please set LastEditors
 * @Descripttion: 概览
-->
<template>
  <iPage>
    <iNavMvp :list="tabRouterList"
             class="margin-bottom20"
             routerPage
             :lev="1"
             v-if="$route.query.isSupplier!=1" />
    <div class="dashboard-div"
         v-if="showMain">
      <el-row :gutter="16"
              type="flex"
              justify="space-between">
        <!-- 新供应商评级 -->
        <el-col :span="6" v-permission="PORTAL_SUPPLIER_NAV_GAILAN_XGYSPJ">
          <card1 v-if="flag"
                 :title="$t('SUPPLIER_XINGONGYINGSHANGPINGJI')"
                 :newSupplierAssessVOList="newSupplierAssessVOList"
                 :chartsId="'newSupplierPie'"
                 @getTableList="getTableList" />
        </el-col>
        <!-- 供应商融资管理 -->
        <el-col :span="6" v-permission="PORTAL_SUPPLIER_NAV_GAILAN_GYSRZGL">
          <card1 v-if="flag"
                 :title="$t('SPR_FRM_XGYSPJ_GYSRZGL')"
                 :newSupplierAssessVOList="financeAnalyseVOList"
                 :chartsId="'supplierFinancingPie'"
                 @getTableList="getTableList" />
        </el-col>
        <!-- 初步评级 -->
        <el-col :span="6" v-permission="PORTAL_SUPPLIER_NAV_GAILAN_CHUBUPINGJI">
          <preliminaryRatingsCard />
        </el-col>
        <!-- 深入评级 -->
        <el-col :span="6" v-permission="PORTAL_SUPPLIER_NAV_GAILAN_SHENRUPINGJI">
          <depth-rating-overview @show="showDepthCard" />
        </el-col>
      </el-row>
      <el-row :gutter="16"
              class="margin-top20"
              type="flex"
              justify="space-between">
        <!-- 财报分析 -->
        <el-col :span="6" v-permission="PORTAL_SUPPLIER_NAV_GAILAN_CAIWUFENXI">
          <resultsAnalysis />
        </el-col>
        <!-- 风险信号 -->
        <el-col :span="6" v-permission="PORTAL_SUPPLIER_NAV_GAILAN_FENGXIANXINHAO">
          <riskSignal @show="showRiskSignalCard" />
        </el-col>
        <!-- 供应商询价定点情况 -->
        <el-col :span="6" v-permission="PORTAL_SUPPLIER_NAV_GAILAN_GYSXJDDQK">
          <vertexSituation @show="showCrating" />
        </el-col>
        <!--舆情检测卡片-->
        <el-col :span="6" v-permission="PORTAL_SUPPLIER_NAV_GAILAN_YQJCKP">
          <monitor />
        </el-col>
      </el-row>
    </div>
    <further-rating-card v-if="showDepth"
                         :deepGradeVOList="deepGradeVOList"
                         @back="hideDepthCard" />
    <risk-signal-info v-if="showRiskSigna"
                      @back="hideRiskSignalCard" />
    <cRatingRouter v-if="showcRatintg"
                   @back="hideCrating" />
  </iPage>
</template>

<script>
import { iPage, iNavMvp } from 'rise';
import { tabRouterList } from '../data';
import preliminaryRatingsCard from "./components/preliminaryRatingsCard";
import resultsAnalysis from "./components/resultsAnalysis";
import card1 from './components/card1';
import riskSignal from './components/riskSignal';
import monitor from './components/monitor';
import vertexSituation from './components/vertexSituation';
import { getInitOverView } from "../../../api/frmRating/overView/overView";
import DepthRatingOverview from './components/depthRatingOverview.vue';
import cRatingRouter from './components/cRatingRouter.vue';
import FurtherRatingCard from './components/furtherRatingCard.vue';
import RiskSignalInfo from './components/riskSignalInfo.vue'

export default {
  components: {
    iPage,
    iNavMvp,
    card1,
    preliminaryRatingsCard,
    resultsAnalysis,
    riskSignal,
    monitor,
    cRatingRouter,
    vertexSituation,
    DepthRatingOverview,
    FurtherRatingCard,
    RiskSignalInfo
  },
  data () {
    return {
      tabRouterList,
      newSupplierAssessVOList: [],
      deepGradeVOList: [],
      financeAnalyseVO: [],
      flag: false,
      showDepth: false,
      showRiskSigna: false,
      showMain: true,
      showcRatintg: false
    };
  },
  created () {
    if (this.$route.query.isSupplier == 1) {
      this.showMain = false
      this.showcRatintg = true
    }
    this.getTableList()
  },
  methods: {
    async getTableList () {
      const pms = {
        subSupplierId: '0',
        supplierType: '0'
      }
      const res = await getInitOverView(pms)
      this.flag = true
      this.newSupplierAssessVOList = res.data.newSupplierAssessVOList
      this.deepGradeVOList = res.data.deepGradeVOList
      this.financeAnalyseVOList = res.data.financeAnalyseVO || []
    },
    showDepthCard () {
      this.showDepth = true
      this.showMain = false
    },
    hideDepthCard () {
      this.showDepth = false
      this.showMain = true
    },
    showCrating () {
      this.showcRatintg = true
      this.showMain = false
    },
    hideCrating () {
      this.showcRatintg = false
      this.showMain = true
    },
    showRiskSignalCard () {
      this.showRiskSigna = true
      this.showMain = false
    },
    hideRiskSignalCard () {
      this.showRiskSigna = false
      this.showMain = true
    },
  },
};
</script>

<style lang="scss">
.dashboard-div {
  .height {
    height: 19rem;
  }
  .card {
    height: 27rem;
  }
  .resultsAnalysis {
    font-size: 300px;
  }
}
</style>

<style lang="scss" scoped>
::v-deep .nav>div{
  max-width: 170px!important;
}

::v-deep .nav>div:last-child{
  max-width: 180px!important;
  span{
    margin-right:0
  }
}
</style>
