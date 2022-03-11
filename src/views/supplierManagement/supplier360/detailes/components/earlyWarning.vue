<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8"
              v-permission="PORTAL_SUPPLIER_CARD_SPI"
              class="margin-bottom20">
        <!-- <el-col :span="8"> -->

        <!-- 供应商得分 -->
        <supplierKpi></supplierKpi>
      </el-col>
      <el-col :span="8"
              v-permission="PORTAL_SUPPLIER_CARD_SUPPLY_RATE"
              v
              class="margin-bottom20">

        <!-- <el-col :span="8"> -->
        <!-- 配附件供货率 -->
        <supplyRate :infodata="infodata"></supplyRate>
      </el-col>
      <!-- <el-col :span="8"> -->
      <el-col :span="8"
              v-permission="PORTAL_SUPPLIER_CARD_EKL"
              class="margin-bottom20">

        <!-- ekl批量件 -->
        <eklSupplier :infodata="infodata"></eklSupplier>
      </el-col>
      <el-col v-permission="PORTAL_SUPPLIER_CARD_SAMPLEDELIVERY"
              :span="8"
              class="margin-bottom20">
        <!-- 送样 -->
        <sampleDelivery></sampleDelivery>
      </el-col>
      <el-col v-permission="PORTAL_SUPPLIER_CARD_NOMINATION"
              :span="8"
              class="margin-bottom20">
        <!-- 定点 -->
        <fixed></fixed>
      </el-col>
      <el-col v-permission="PORTAL_SUPPLIER_CARD_SOURCING"
              :span="8"
              class="margin-bottom20">
        <!-- 寻源 -->
        <sourcing></sourcing>
      </el-col>
      <el-col v-permission="PORTAL_SUPPLIER_CARD_PRODUCTIVITY"
              :span="8"
              class="margin-bottom20">
        <!-- 产能预警 -->
        <productivity></productivity>
      </el-col>
      <el-col :span="8"
              v-permission="PORTAL_SUPPLIER_CARD_CRATING"
              class="margin-bottom20">
        <!-- 财务预警 -->
        <newsMonitor :infodata="infodata"></newsMonitor>
      </el-col>
      <el-col :span="8"
              v-permission="PORTAL_SUPPLIER_CARD__MONITORING"
              class="margin-bottom20">

        <!-- 舆情监测 -->
        <publicOpinion> </publicOpinion>
      </el-col>
    </el-row>
    <!-- <el-row class="margin-bottom20"
            :gutter="20"
            type="flex"
            justify="space-between">

    </el-row>
    <el-row class="margin-bottom20"
            :gutter="20"
            type="flex"
            justify="space-between">

    </el-row> -->
    <el-row class="margin-bottom20"
            :gutter="20"
            type="flex"
            justify="space-between">
      <el-col :span="24">
        <contract> </contract>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import contract from './chartCard/contract'
import supplyRate from './chartCard/supplyRate'
import sampleDelivery from './chartCard/sampleDelivery'
import fixed from './chartCard/fixed'
import sourcing from './chartCard/sourcing'
import newsMonitor from './chartCard/newsMonitor'
import supplierKpi from './chartCard/supplierKpi'
import productivity from './chartCard/productivity'
import publicOpinion from './chartCard/publicOpinion'
import eklSupplier from './chartCard/eklSupplier'
import soon from './soon.png'

export default {
  components: {
    supplierKpi,
    publicOpinion,
    newsMonitor,
    eklSupplier,
    productivity,
    sourcing,
    supplyRate,
    fixed,
    sampleDelivery,
    contract
  },
  data () {
    return {
      soon: soon,
      infodata: {}
    }
  },
  props: {
    financialEarlyWarningVO: {
      type: Object,
      default: () => {
        return {}
      }
    },
    supplier360ViewVO: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    supplier360ViewVO (data) {
      this.infodata = data
    }
  },
  mounted () { },
  methods: {}
}
</script>

<style lang="scss" scoped>
.center1 {
  text-align: center;
  font-size: 36px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.4);
}
.titleZh {
  font-size: 1.125rem;
  color: #131523;
  font-weight: bold;
}
.titleEn {
  color: #5f6f8f;
  font-size: 14px;
  font-family: Arial;
}
.content {
  margin-top: 2rem;
}
.text {
  color: #5f6f8f;
}
.el-divider--horizontal {
  margin: 1rem 0;
}

.center {
  height: 160px;
  display: flex;
  align-items: center;
  .float {
    margin-left: 60px;
    display: flex;
    align-items: center;
  }
  .bjText {
    margin-left: 40px;
    text-align: left;
    p {
      margin: 8px 0;
    }
  }
  .fontsize {
    color: #798489;
    margin-top: 10px;
  }
  p {
    font-family: Arial;
    font-size: 16px;
    color: #798489;
  }
}

.early {
  font-size: 60px;
}
.alert {
  font-size: 24.48px;
  margin-right: 10px;
}

.gcdt {
  width: 1735px;
  height: 415px;
}
</style>
