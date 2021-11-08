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
    <div class="height cursor" @click="handleAnalysis">
      <icon class="resultsAnalysis" name="iconshenrupingji" symbol></icon>
    </div>
  </iCard>
</template>

<script>
import { iCard, icon } from 'rise';

export default {
  components: { iCard, icon },
  methods: {
    handleAnalysis() {
      this.$emit('show',true)
    }
  }
}
</script>

<style>
.height{
  height: 419px;
}
.resultsAnalysis {
  font-size: 300px;
}
</style>