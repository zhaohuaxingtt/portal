<!--
 * @Author: youyuan
 * @Date: 2021-10-28 15:35:55
 * @LastEditTime: 2021-11-03 14:42:31
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\index.vue
-->
<template>
  <div class="downPdfBox">
    <iNavMvp
      v-if="RsObject"
      lang
      :list="tabRouterList"
      class="margin-bottom20"
      :lev="3"
      @change="handleClickNav"
    />
    <mtz v-if="currentNav == 1" :RsType="RsType" :appStatus="appStatus" />
    <accessoryUpload v-if="currentNav == 2" :appStatus="appStatus" />
  </div>
</template>

<script>
import { iNavMvp } from 'rise'
import mtz from './components/mtz'
import accessoryUpload from './components/accessoryUpload'
import { tabRouterList } from './components/data'
import { getAppById } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
export default {
  components: {
    iNavMvp,
    mtz,
    accessoryUpload
  },
  props: {
    RsType: {
      type: Boolean
    },
    appStatus: {
      type: String
    }
  },
  data() {
    return {
      tabRouterList,
      currentNav: 1,
      formData: {},
      RsObject: true
    }
  },
  created() {
    if (this.RsType) {
      this.RsObject = false
    }
  },
  methods: {
    // 点击导航
    handleClickNav(data) {
      this.currentNav = data.value
    }
  },
  destroyed() {}
}
</script>

<style lang='scss' scoped>
</style>
