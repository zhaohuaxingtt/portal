<!--
 * @Date: 2021-11-25 09:47:22
 * @LastEditors: caopeng
 * @LastEditTime: 2021-11-29 11:24:25
 * @FilePath: \front-portal-new\src\views\opcsSupervise\commonHeardNav\headerNav.vue
-->

<template>
  <div>
    <div class="navBox">
      <p  v-if="!isShow" class="font20 font-weight">
        {{ language('YINGYONGMINGCHENG', '应⽤名称') }}-安亭⼯⼚
      </p>
      <iNavMvp
        v-if="isShow"
        :list="tabRouterList"
        class="margin-bottom20"
        routerPage
        :lev="1"
      />
      <logButton v-if="isShow"  class="logButton" />
      <div  v-if="!isShow" class="logButton">
        <i-button  @click="goback()">{{ language('FANHUI', '返回') }}</i-button>
      </div>
    </div>
  </div>
</template>

<script>
import { iNavMvp,iButton } from 'rise'
import { tabRouterList, categoryManagementAssistantList } from './navData'
import logButton from '@/components/logButton'

export default {
  components: {
    iNavMvp,
    iButton,
    logButton
  },
  data() {
    return {
      tabRouterList,
      categoryManagementAssistantList,
      isShow: true
    }
  },
  created() {
    console.log(this.$route.path)
    if (this.$route.path.indexOf('manage') != -1) {
      this.isShow = false
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.navBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logButton {
      
  }
}
</style>
