<!--
 * @Author: your name
 * @Date: 2021-10-06 21:19:27
 * @LastEditTime: 2021-10-28 16:35:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\commonHeardNav\headerNav.vue
-->
<template>
  <div>
    <div class="navBox">
      <iNavMvp :list="tabRouterList" class="margin-bottom20" routerPage :lev="1" v-if="$route.meta.showFooter"/>
      <router-view />
      <logButton class="logButton" v-if="$route.meta.showFooter"/>
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
  created(){
    
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

