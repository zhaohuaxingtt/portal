<template>
  <div>
    <div class='nav2 flex-align-center'>
      <iNavMvp :lev='2' :list='navList' :lang='true' routerPage />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { iNavMvp } from 'rise'
import { navList } from './config/config'

export default {
  components: {
    iNavMvp
  },
  data() {
    return {
      navList: window._.cloneDeep(navList)
    }
  }
}
</script>

<style lang='scss' scoped>
.nav2 {
  position: absolute;
  top: 0;
  right: 100px;
}
</style>