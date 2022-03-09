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
      <logButton class="logButton" @toLogPage="toLog" @toSql="toloSql" :sqlShow="true" v-if="$route.meta.showFooter"/>
      <iUserLog :show.sync="showDialog"
            menuId="MTZ-013"
            is-page />
    </div>
  </div>
</template>

<script>
import { iNavMvp } from 'rise'
import { tabRouterList } from './navData'
// import { subNavListOne,monthlyTrackingNavList } from '../reportsShow/config/config'
// import { navList } from '../replenishmentManagement/components/data'


import logButton from '@/components/logButton'
import iUserLog from '@/components/iUserLog'

export default {
  components: {
    iNavMvp,
    logButton,
    iUserLog
  },
  created(){
    this.checkHasEnterMenu();
  },
  data() {
    return {
      tabRouterList,
      // subNavListOne,
      // monthlyTrackingNavList,
      // navList,
      showDialog:false,
    }
  },
  computed: {
    whiteBtnList() {
      return this.$store.state.permission.whiteBtnList
    }
  },
  methods:{
    toloSql(){
      let routeData = this.$router.resolve({
        path: `/mtz/dataBase/partsQuery`,
        query: {
        }
      })
      window.open(routeData.href)
    },
    checkHasEnterMenu() {
      const { path } = this.$route
      const menuList = [
        ...this.tabRouterList,
        // ...this.subNavListOne,
        // ...this.monthlyTrackingNavList,
        // ...this.navList
      ]

      const menuItem = menuList.find((e) => e.url === path)

      if (menuItem) {
        const permissionKey = menuItem.permissionKey
        console.log(
          'this.whiteBtnList[permissionKey]',
          this.whiteBtnList[permissionKey]
        )
        // 入口url不在授权列表
        if (!this.whiteBtnList[permissionKey]) {
          let redirectUrl = ''
          for (let i = 0; i < menuList.length; i++) {
            const menu = menuList[i]
            if (this.whiteBtnList[menu.permissionKey]) {
              redirectUrl = menu.url
              break
            }
          }
          console.log('redirectUrl', redirectUrl)
          if (redirectUrl) {
            this.$router.push({ path: redirectUrl })
          }
        }
      }
    },
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

