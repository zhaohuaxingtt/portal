<!--
 * @Author: youyuan
 * @Date: 2021-10-28 15:35:55
 * @LastEditTime: 2021-11-03 14:42:31
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\index.vue
-->
<template>
  <div>
    <iNavMvp lang :list="tabRouterList" class="margin-bottom20" :lev="3" @change="handleClickNav"/>
    <mtz v-if="currentNav == 1"/>
    <accessoryUpload v-if="currentNav == 2"/>
  </div>
</template>

<script>
import { iNavMvp } from 'rise'
import mtz from './components/mtz'
import accessoryUpload from './components/accessoryUpload'
import { tabRouterList } from './components/data'
export default {
  components: {
    iNavMvp,
    mtz,
    accessoryUpload
  },
  data () {
    return {
      tabRouterList,
      currentNav: 1,
      formData: {}
    }
  },
  created() {
  },
  methods: {
    // 点击导航
    handleClickNav(data) {
      this.currentNav = data.value
    }
  }
}
</script>

<style lang='scss' scoped>

 
</style>
