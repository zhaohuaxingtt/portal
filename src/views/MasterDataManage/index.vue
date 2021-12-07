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
          key: '车型/车型项目主数据'
        },
        {
          value: 2,
          name: '物料主数据',
          message: 0,
          url: '/materielData/parts-message',
          activePath: '/materielData',
          key: '物料主数据'
        },
        {
          value: 3,
          name: '供应商主数据',
          message: 0,
          url: '/mainDataSupplier/list',
          activePath: '/mainDataSupplier',
          key: '供应商主数据'
        },
        {
          value: 4,
          name: '汇率管理',
          message: 0,
          url: '/exchange-parities',
          activePath: '/exchange-parities',
          key: '汇率管理'
        }
      ]
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
