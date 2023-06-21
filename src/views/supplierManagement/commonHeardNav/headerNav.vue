<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-23 14:32:45
 * @LastEditors: YoHo && 917955345@qq.com
 * @Descripttion: your project
-->
<template>
  <div>
    <div class="navBox">
      <iNavMvp :lang='true'
               :list="tabRouter"
               class="margin-bottom20"
               :class="className"
               routerPage
               :lev="1" />
      <logButton class="logButton"
                 @toLogPage="toLog" />
      <iUserLog :show.sync="showDialog"
                :menuId="menuId"
                is-page />
    </div>
  </div>
</template>

<script>
import { iNavMvp } from 'rise'
import { tabRouterList,tabRouterListGP, categoryManagementAssistantList } from './navData'
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
      tabRouter:[],
      tabRouterList,
      tabRouterListGP,
      categoryManagementAssistantList,
      isShowKpiMenu: true,
      showDialog: false,
      className:'',
      // menuId:'WS3203',
    }
  },
  computed: {
    whiteBtnList () {
      return this.$store.state.permission.whiteBtnList
    },
    menuId(){
      console.log(this.$route.path);
      if(this.$route.path.indexOf('/supplier/supplierListIndirect')!=-1){
        return 'GP-CONTRACT-111'
      }else{
        return 'WS3203'
      }
    }
  },
  created(){
    if (
      this.$route.path.indexOf('/supplier/supplierListGP') != -1 ||
      this.$route.path.indexOf('/supplier/supplierListDis') != -1 ||
      this.$route.path.indexOf('/supplier/supplierListIndirect') != -1
    ) {
      this.className='tabRouterListGP'
      this.tabRouter = this.tabRouterListGP
    }else{
      this.className=''
      this.tabRouter = this.tabRouterList
    }
    // console.log(this.$route.path)
  },
  methods: {
    toLog () {
      this.showDialog = true
    },
    checkHasEnterMenu () {
      const { path } = this.$route
      const menuList = [
        ...this.tabRouter,
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
    // this.checkHasEnterMenu()
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

  ::v-deep .nav {
    align-items: flex-end;
    div {
      max-width: 170px !important;
      .name {
        &::after {
          top: calc(100% + 5px);
        }
      }
      &:last-child{
        max-width: unset !important; // 间接物料供应商不换行
      }
    }
  }
  // GP 供应商tab页较少，可以完全展示
  // .tabRouterListGP{
  //   div{
  //     max-width: unset;
  //   }
  // }
}

</style>

