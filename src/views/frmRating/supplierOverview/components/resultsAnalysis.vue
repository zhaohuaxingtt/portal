<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-27 14:47:25
 * @LastEditors: zbin
 * @LastEditTime: 2021-05-27 20:37:54
 * @Descripttion: 财务分析
-->
<template>
  <iCard :title="$t('SPR_FRM_DEP_FINANA')">
    <div class="height cursor"
         @click="handleAnalysis">
      <img :src="img"
           style="margin-top:50px;height:140px;" />
    </div>
  </iCard>
</template>

<script>
import { iCard, icon } from 'rise'
import img from '@/assets/images/financial.svg'
export default {
  components: { iCard, icon },
  data() {
    return { img: img }
  },
  methods: {
    handleAnalysis() {
      this.$router.push({
        path: '/supplier/frmrating/depthRating/financialAnalysis'
      })
    }
  }
}
</script>

<style>
</style>