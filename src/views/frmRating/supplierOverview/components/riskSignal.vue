<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-27 14:47:25
 * @LastEditors: zbin
 * @LastEditTime: 2021-05-27 20:45:57
 * @Descripttion: 风险信号
-->
<template>
  <iCard :title="$t('SPR_FRM_XGYSPJ_FXXH')">
    <div class="height cursor" @click="handleAnalysis">
      <icon class="resultsAnalysis" name="iconfengxianxinhao" symbol ></icon>
    </div>
  </iCard>
</template>

<script>
import { iCard, icon } from 'rise';
import img from '@/assets/images/financial.svg'
export default {
  components: { iCard, icon },
  methods: {
    handleAnalysis() {
      this.$emit('show',true)
    }
  },
}
</script>

<style>

</style>