<template>
    <div class="navBox">
        <iNavMvp
            :list='tabRouterList'
            class='margin-bottom20'
            routerPage
            :lev='1'
        />
        <iNavMvp
            :list="publicOpinionList"
            :lev='2'
            right
            routerPage
            class="rightNav"
        />
        <!-- <span class="set-up-button" @click="setUp">设置</span> -->
    </div>
</template>

<script>
import { iNavMvp } from "rise";
import { tabRouterList,publicOpinionList } from '@/views/frmRating/data'

export default {
    data(){
        return {
            tabRouterList,
            publicOpinionList,
        }
    },
    components:{
        iNavMvp,
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
          ...this.publicOpinionList,
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
    }
}
</script>

<style lang="scss" scoped>
.navBox {
  position: relative;

  .rightNav {
    position: absolute;
    top: 0;
    right:0;
  }

  .set-up-button {
    position: absolute;
    top: 4px;
    right: 0;
    font-size:18px;
    color:#909091 !important;
    cursor: pointer;
  }
}

::v-deep .nav>div{
  max-width: 170px!important;
}

::v-deep .nav>div:last-child{
  max-width: 180px!important;
  span{
    margin-right:0
  }
}
</style>