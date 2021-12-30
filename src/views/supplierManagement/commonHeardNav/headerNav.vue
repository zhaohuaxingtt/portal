<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-23 14:32:45
 * @LastEditors: caopeng
 * @Descripttion: your project
-->
<template>
  <div>
    <div class="navBox">
      <iNavMvp :lang='true' :list="tabRouterList" class="margin-bottom20" routerPage :lev="1" />
      <logButton class="logButton" />
    </div>
  </div>
</template>

<script>
import { iNavMvp } from 'rise'
import { tabRouterList, categoryManagementAssistantList } from './navData'
import logButton from '@/components/logButton'

export default {
  components: {
    iNavMvp,
    logButton
  },
  data() {
    return {
      tabRouterList,
      categoryManagementAssistantList,
      isShowKpiMenu: true
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

