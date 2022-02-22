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
      <iNavMvp :list="tabRouterList" class="margin-bottom20 lines" routerPage :lev="1" v-if="$route.meta.showFooter"/>
      <router-view />
      <logButton class="logButton" @toLogPage="toLog" v-if="$route.meta.showFooter"/>
      <iUserLog :show.sync="showDialog"
            menuId="MTZ-013"
            is-page />
    </div>
  </div>
</template>

<script>
import { iNavMvp } from 'rise'
import { tabRouterList } from './navData'
import logButton from '@/components/logButton'
import iUserLog from '@/components/iUserLog'

export default {
  components: {
    iNavMvp,
    logButton,
    iUserLog
  },
  created(){
    
  },
  data() {
    return {
      tabRouterList,
      showDialog:false,
    }
  },
  methods:{
    toLog () {
      this.showDialog = true
    }
  }
}
</script>

<style scoped lang="scss">
.lines{
  border-bottom: 1px #E1E2ED solid;
  padding-bottom: 10px;
}
.navBox {
  position: relative;
  .logButton {
    position: absolute;
    top: 5px;
    right: 0;
  }
}
</style>

