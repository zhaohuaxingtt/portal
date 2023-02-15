<!--
 * @Author: your name
 * @Date: 2021-10-06 21:19:27
 * @LastEditTime: 2023-01-05 16:11:40
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\commonHeardNav\headerNav.vue
-->
<template>
  <div>
    <div class="navBox margin-bottom20">
      <iNavMvp
        :list="tabRouterList"
        routerPage
        @change="change"
        :lev="1"
        v-if="$route.meta.showFooter"
      />
      <div class="rightNav">
        <iNavMvp class="nav" :list="rightNav2" routerPage @change="change" :lev="2" right />
        <logButton
          class="logButton"
          @toLogPage="toLog"
          @toSql="toloSql"
          :sqlShow="true"
          v-if="$route.meta.showFooter"
        />
        <iUserLog :show.sync="showDialog" menuId="MTZ-013" is-page />
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
import { iNavMvp } from 'rise'
import { tabRouterList, rightNavList } from './navData.js'
import logButton from '@/components/logButton'
import iUserLog from '@/components/iUserLog'

export default {
  components: {
    iNavMvp,
    logButton,
    iUserLog
  },
  created() {
    this.group =
      this.rightNavList.find((i) => i.url == this.$route.path)?.group || ''
    this.checkHasEnterMenu()
  },
  data() {
    return {
      tabRouterList,
      rightNavList,
      showDialog: false,
      group: null
    }
  },
  computed: {
    whiteBtnList() {
      return this.$store.state.permission.whiteBtnList
    },
    rightNav2() {
      return this.rightNavList.filter((item) => {
        return item.group == this.group
      })
    }
  },
  methods: {
    change(val) {
      this.group = val.group
    },
    toloSql() {
      let routeData = this.$router.resolve({
        path: `/mtz/dataBase/partsQuery`,
        query: {}
      })
      window.open(routeData.href)
    },
    checkHasEnterMenu() {
      const { path } = this.$route
      const menuList = [
        ...this.tabRouterList
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
    toLog() {
      this.showDialog = true
    }
  }
}
</script>

<style scoped lang="scss">
.navBox {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:after {
		content: '';
		width: 100%;
		height: 1px;
		display: block;
		background: rgba(197, 206, 229, 0.5);
		position: absolute;
		left: 0px;
		bottom: -0.5rem;
	}
  .rightNav {
    display: flex;
    .logButton{
      flex: 0 0 auto;
    }
    .nav{
      max-width: 870px;
    }
  }
}
</style>

