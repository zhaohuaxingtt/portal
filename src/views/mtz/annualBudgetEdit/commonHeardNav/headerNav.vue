<!--
 * @Author: your name
 * @Date: 2021-09-01 17:43:06
 * @LastEditTime: 2021-10-28 16:32:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\annualGeneralBudgetLeader\commonHeardNav\headerNav.vue
-->
<template>
  <div>
    <div class="navBox">
      <iNavMvp lang :list="tabRouterList" class="margin-bottom20" routerPage :lev="1" />
      <div class="margin-right20 category">{{(this.version ? this.version : '') + (this.useVersion ?  this.version ? ' - ' + this.useVersion : this.useVersion : '')}}</div>
      <div class="rightNav">
        <iNavMvp
            :list="categoryManagementAssistantList"
            :lev='2'
            right
            lang
            routerPage
            class="margin-right20"
        />
        <slot name="extralButton"></slot>
      </div>
      <iButton class="logButton" @click="handleClickReturn">{{language('FANHUI', '返回')}}</iButton>
      <!-- <logButton class="logButton" /> -->
      <router-view />
    </div>
  </div>
</template>

<script>
import { iNavMvp, iButton } from 'rise'
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
      budgetUrl: '/mtz/annualGeneralBudget',
      tabRouterList,
      categoryManagementAssistantList,
      version: this.$route.query.version,
      useVersion: this.$route.query.useVersion,
      forecastId: this.$route.query.forecastId,
      forecastTime: this.$route.query.forecastTime,
    }
  },
  created() {
      let name = 'MTZ年度预算'
      let key = 'MTZNIANDUYUSUANBIANJI'
      this.$set(tabRouterList[0], 'name', name)
      this.$set(tabRouterList[0], 'key', key)
      categoryManagementAssistantList.forEach(item => {
        item['query'] = {
          forecastId: this.forecastId,
          forecastTime: this.forecastTime,
          version: this.version,
          useVersion: this.useVersion,
        }
      })
  },
  methods: {
    // 返回
    handleClickReturn() {
      this.$router.push({
        path: this.budgetUrl
      })
    }
  },
}
</script>

<style scoped lang="scss">
.navBox {
  position: relative;
  .logButton {
    position: absolute;
    top: 3px;
    right: 0;
  }
  .rightNav {
    display: flex;
    position: absolute;
    top: 0;
    right: 110px;
  }
  .category{
    position: absolute;
    top: 3px;
    left: 140px;
    font-size: 1.125rem;
    font-weight: 400;
    color: #909091;
  }
}
</style>

