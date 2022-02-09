<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-27 14:47:25
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-02-09 10:52:34
 * @Descripttion: 财务分析
-->
<template>
  <iCard :title="$t('SPR_FRM_DEP_FINANA')">
    <div class="height cursor"
         @click="handleAnalysis">
      <img :src="img"
           style="height:100%;width:100%" />
    </div>
  </iCard>
</template>

<script>
import { iCard, icon } from 'rise'
import img from '@/assets/images/financial.svg'
export default {
  components: { iCard, icon },
  data () {
    return { img: img }
  },
  methods: {
    handleAnalysis () {
      this.$router.push({
        path: '/supplier/frmrating/depthRating/financialAnalysis'
      })
    }
  }
}
</script>

<style>
</style>