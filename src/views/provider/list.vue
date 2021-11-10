<template>
  <div class="ProcCs-container">
    <div class="ProcCS-menu ">
      <iNavMvp :list="menus" :lev="2" router-page />
    </div>
    <router-view />
  </div>
</template>

<script>
import { iNavMvp } from 'rise'

export default {
  name: 'provider',
  components: { iNavMvp },
  data() {
    return {
      menus: [
        {
          value: 1,
          name: '供应商用户管理',
          message: 0,
          url: '/provider/userMgm/list',
          activePath: '/provider/userMgm/list',
          key: '供应商用户管理'
        },
        {
          value: 2,
          name: '供应商系统管理',
          message: 0,
          url: '/provider/sysMgm/list',
          activePath: '/provider/sysMgm/list',
          key: '供应商系统管理'
        },
        {
          value: 3,
          name: '供应商权限管理',
          message: 0,
          url: '/provider/authMgm/list',
          activePath: '/provider/authMgm/list',
          key: '供应商权限管理'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.ProcCs-container {
  height: 100%;
  padding-bottom: 50px;
}
.ProcCS-menu {
  margin: -30px 30px 0px 30px;
  display: flex;
  justify-content: flex-end;
}
</style>
