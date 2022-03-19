<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-23 14:32:45
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <div>
    <div class="navBox">
      <iNavMvp :lang='true'
               :list="tabRouterList"
               class="margin-bottom20"
               routerPage
               :lev="1" />
      <logButton class="logButton"
                 @toLogPage="toLog" />
      <iUserLog :show.sync="showDialog"
                menuId="WS3203"
                is-page />
    </div>
  </div>
</template>

<script>
import { iNavMvp } from 'rise'
import { tabRouterList, categoryManagementAssistantList } from './navData'
import logButton from '@/components/logButton'
import iUserLog from '@/components/iUserLog'
export default {
  components: {
    iNavMvp,
    logButton,
    iUserLog
  },
  data () {
    return {
      tabRouterList,
      categoryManagementAssistantList,
      isShowKpiMenu: true,
      showDialog: false,

    }
  },
  computed: {
    whiteBtnList () {
      return this.$store.state.permission.whiteBtnList
    }
  },
  methods: {
    toLog () {
      this.showDialog = true
    },
    checkHasEnterMenu () {
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
  },
  mounted () {
    this.checkHasEnterMenu()
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

