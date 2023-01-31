<!--
 * @Author: YoHo
 * @Date: 2022-12-23 19:20:40
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\index.vue
-->
<!--
 * @Author: moxuan
 * @Description: 补差管理
-->
<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { iNavMvp } from 'rise'
import { navList} from './components/data'

export default {
  components: {
    iNavMvp
  },
  data() {
    return {
      navList: window._.cloneDeep(navList),
    }
  },
  computed: {
    whiteBtnList() {
      return this.$store.state.permission.whiteBtnList
    }
  },
  created(){
    this.checkHasEnterMenu();
  },
  methods:{
    checkHasEnterMenu() {
      const { path } = this.$route
      const menuList = [
        ...this.navList,
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
  }
}
</script>

<style lang="scss" scoped>
.nav2 {
  position: absolute;
  top: 0;
  right: 100px;
  
  ::v-deep .name{
    max-width: 165px;
  }
}


</style>
