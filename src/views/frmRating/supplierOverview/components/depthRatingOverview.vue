<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-27 14:47:25
 * @LastEditors: zbin
 * @LastEditTime: 2021-05-27 20:37:54
 * @Descripttion: 财务分析
-->
<template>
  <iCard :title="$t('SUPPLIER_SHENRUPINGJI')">
    <div class="box height cursor"
         @click="handleAnalysis">
      <div>
        <icon class="early"
              symbol
              name="iconbaojiapingfengenzong-jiedian-hong"></icon> <span>供应商数量（个）：19</span>
      </div>
      <div>        <icon class="early"
              symbol
              name="iconbaojiapingfengenzong-jiedian-huang"></icon> <span>供应商数量（个）：19</span></div>
      <div>        <icon class="early"
              symbol
              name="iconbaojiapingfengenzong-jiedian-lv"></icon> <span>供应商数量（个）：19</span></div>
    </div>
  </iCard>
</template>

<script>
import { iCard, icon } from 'rise'

export default {
  components: { iCard, icon },
  methods: {
    handleAnalysis() {
      this.$emit('show', true)
    }
  }
}
</script>

<style  lang="scss" scoped>
.height {
  height: 419px;
}
.box {
  div {
    height: 40px;
    line-height: 40px;
    display: flex;
    align-items: center;
    width: 330px;
    margin: 0 auto;
    background: #f8d4d4;
    border-radius: 20px;
    span {
      margin-left: 45px;
    }
  }
  div:nth-child(1) {
    margin-top: 20px;
    margin-bottom: 60px;
    background: #f8d4d4;
  }
  div:nth-child(2) {
    margin-bottom: 60px;
    background: #fff1cc;
  }
  div:nth-child(3) {
    margin-bottom: 60px;
    background: #cdf1e8;
  }
}
.early {
  font-size: 40px;
}
</style>