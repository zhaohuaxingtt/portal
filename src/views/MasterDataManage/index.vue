<template>
  <div class="master-data">
    <div class="Master-menu">
      <iNavMvp :list="menus" :lev="1" router-page />
    </div>
    <router-view style="height: 100%"></router-view>
  </div>
</template>

<script>
import { iNavMvp } from 'rise'
import { MENUS as mainDataMenus } from '@/views/mainData/layout/data'
import { MENUS as materielDataMenus } from '@/views/materielMainData/layout/data'
import { MENUS as supplierDataMenus } from '@/views/mainDataSupplier/layout/data'
export default {
  name: 'masterDataManage',
  components: { iNavMvp },
  data() {
    return {
      menus: [
        {
          value: 1,
          name: '车型/车型项目主数据',
          message: 0,
          url: '/main-data/product-family',
          activePath: '/main-data',
          key: '车型/车型项目主数据',
          permissionKey: 'ADMIN_MAIN_DATA_CARPROJECT_CARMODEL'
        },
        {
          value: 2,
          name: '物料主数据',
          message: 0,
          url: '/materielData/parts-message',
          activePath: '/materielData',
          key: '物料主数据',
          permissionKey: 'ADMIN_MATERIEL_DATA'
        },
        {
          value: 3,
          name: '供应商主数据',
          message: 0,
          url: '/mainDataSupplier/list',
          activePath: '/mainDataSupplier',
          key: '供应商主数据',
          permissionKey: 'ADMIN_MAIN_DATA_SUPPLIER_DATA'
        },
        {
          value: 4,
          name: '汇率管理',
          message: 0,
          url: '/exchange-parities',
          activePath: '/exchange-parities',
          key: '汇率管理',
          permissionKey: 'ADMIN_MAIN_DATA_EXCHANGE_PARTIES'
        }
      ]
    }
  },
  computed: {
    whiteBtnList() {
      return this.$store.state.permission.whiteBtnList
    }
  },
  created() {
    this.checkHasEnterMenu()
  },
  methods: {
    checkHasEnterMenu() {
      const { path } = this.$route
      const menuList = [
        ...this.menus,
        ...mainDataMenus,
        ...materielDataMenus,
        ...supplierDataMenus
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
    }
  }
}
</script>

<style lang="scss" scoped>
.master-data {
  height: 100%;
  padding-bottom: 100px;
}
.Master-menu {
  margin: 20px 0 0px 30px;
  position: relative;
  z-index: 1;
}
</style>
