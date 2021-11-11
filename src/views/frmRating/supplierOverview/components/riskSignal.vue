<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-27 14:47:25
 * @LastEditors: zbin
 * @LastEditTime: 2021-05-27 20:37:54
 * @Descripttion: 风险信号
-->
<template>
  <iCard :title="$t('SUPPLIER_FENGXIANXINHAO')">
    <div class="box height cursor"
         @click="handleAnalysis">
      <div>
        <icon class="early"
              symbol
              name="iconcaiwuyujing-hongdeng"></icon>
        <p>有风险供应商</p>
      </div>
      <div>
        <icon class="early"
              symbol
              name="icondaiquerenBAshenqingzhuijiajineweixuanzhong"></icon> <span>生产供应商数量（个）：{{info.PP}}</span>
      </div>
      <div>
        <icon class="early"
              symbol
              name="icondaiquerenBAshenqingzhuijiajineweixuanzhong"></icon> <span>供应商数量（个）：{{info.GP}}</span>
      </div>
    </div>
  </iCard>
</template>

<script>
import { iCard, icon } from 'rise'
import { riskSignalCard } from '@/api/frmRating/supplierOverview/index'
export default {
  components: { iCard, icon },
  data() {
    return {
      info: {}
    }
  },
  methods: {
    handleAnalysis() {
      this.$emit('show', true)
    }
  },
  created() {
    riskSignalCard().then((res) => {
      this.info = res.data.riskMap
    })
  }
}
</script>

<style  lang="scss" scoped>
.height {
  height: 419px;
}
.box {
  div {
    height: 80px;
    line-height: 80px;
    display: flex;
    align-items: center;
    width: 330px;
    margin: 0 auto;
    background: #f8d4d4;
    border-radius: 10px;

    span {
      margin-left: 36px;
      font-size: 14px;
      font-family: Arial;
      font-weight: 400;
      color: #000000;
    }
    p {
      margin-left: 36px;
      font-size: 14px;
      font-family: Arial;
      font-weight: bold;
      color: #001847;
    }
  }
  div:nth-child(1) {
    margin-top: 20px;
    margin-bottom: 20px;
    background: white;
  }
  div:nth-child(2) {
    margin-bottom: 20px;
    background: #f8f9fa;
  }
  div:nth-child(3) {
    margin-bottom: 20px;
    background: #f8f9fa;
  }
}
.early {
  font-size: 40px;
  margin-left: 40px;
}
</style>