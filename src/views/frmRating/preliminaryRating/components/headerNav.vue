<template>
  <div>
    <div class="navBox">
      <iNavMvp :list="tabRouterList" class="margin-bottom20" routerPage :lev="1"/>
      <iNavMvp
          :list="preliminaryRatingRouterList"
          :lev='2'
          right
          routerPage
          class="rightNav"
      />
      <logButton class="logButton"/>
    </div>
  </div>
</template>

<script>
import {iNavMvp } from 'rise'
import { tabRouterList, preliminaryRatingRouterList } from '../../data'
import logButton from '@/components/logButton'

export default {
  components: {
    iNavMvp,
    logButton
  },
  data () {
    return {
      tabRouterList,
      preliminaryRatingRouterList
    }
  }
}
</script>

<style scoped lang="scss">
.navBox {
  position: relative;

  .rightNav {
    position: absolute;
    top: 0;
    right: 110px;
  }

  .logButton {
    position: absolute;
    top: 5px;
    right: 0;
  }
}
</style>

