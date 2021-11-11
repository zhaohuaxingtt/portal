<!--
 * @Author: your name
 * @Date: 2021-09-01 17:43:06
 * @LastEditTime: 2021-09-03 16:55:09
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\annualGeneralBudgetLeader\commonHeardNav\headerNav.vue
-->
<template>
  <div>
    <div class="navBox">
      <iNavMvp :list="tabRouterList" class="margin-bottom20" routerPage :lev="1" />
      <router-view />
      <logButton class="logButton" />
    </div>
  </div>
</template>

<script>
import { iNavMvp } from 'rise'
import { tabRouterList } from './navData'
import logButton from '@/components/logButton'

export default {
  components: {
    iNavMvp,
    logButton
  },
  data() {
    return {
      tabRouterList
    }
  }
}
</script>

<style scoped lang="scss">
.navBox {
  position: relative;
  .logButton {
    position: absolute;
    top: 5px;
    right: 0;
  }
}
</style>

