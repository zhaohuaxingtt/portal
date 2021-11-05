<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <div>
    <el-row :gutter="20"
            type="flex"
            justify="space-between">
      <el-col :span="8">
        <supplierKpi></supplierKpi>

      </el-col>
      <el-col :span="8">
           <newsMonitor></newsMonitor>
  
      </el-col>
      <el-col :span="8">
        <publicOpinion>
        </publicOpinion>
      </el-col>
    </el-row>
    <el-row class="margin-top20"
            :gutter="20"
            type="flex"
            justify="space-between">
      <el-col :span="8">
        <iCard style="min-height:11rem"
               :title="$t('SUPPLIER_CNYJ')">
          <div class="center1">
            Coming Soon
          </div>
        </iCard>
      </el-col>
      <el-col :span="8">
        <iCard style="min-height:11rem"
               :title="$t('SUPPLIER_CWYJ')">
          <div class="center">
            <icon class="early"
                  symbol
                  name="iconcaiwuyujing-icon"></icon>
            <div class="float">
              <div class="floatLeft">
                <icon class="alert"
                      symbol
                      name="iconhongdeng"></icon>
                <div class="fontsize">Alert</div>
              </div>
              <div class="fontsize">{{ financialEarlyWarningVO.tips }}</div>
            </div>
          </div>
        </iCard>
      </el-col>
      <el-col :span="8">
        <iCard style="min-height:11rem"
               :title="$t('SUPPLIER_YUQINGJIANCE')">
          <div class="center1">
            Coming Soon
          </div>
        </iCard>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import newsMonitor from './chartCard/newsMonitor'
import supplierKpi from './chartCard/supplierKpi'
import publicOpinion from './chartCard/publicOpinion'
import { iCard, icon } from 'rise'
import soon from './soon.png'

export default {
  components: {
    icon,
    supplierKpi,
    publicOpinion,
    iCard,
    newsMonitor
  },
  data() {
    return {
      soon: soon
    }
  },
  props: {
    financialEarlyWarningVO: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  mounted() {},
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
