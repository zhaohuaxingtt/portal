<template>
  <div class="layout-common">
    <div class="layout-menu">
      <iNavMvp :list="menus" :lev="1" router-page />
    </div>
    <router-view style="height:100%"></router-view>
  </div>
</template>

<script>
/**
 * menus
 * [{
 *   value: 1,
 *   name: '车型/车型项目主数据',
 *   message: 0,
 *   url: '/main-data/product-family',
 *   activePath: '/main-data',
 *   key: '车型/车型项目主数据'
 * }]
 */
import { iNavMvp } from 'rise'
export default {
  name: 'layoutCommon',
  components: { iNavMvp },
  props: {
    menus: {
      type: Array,
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-common {
  height: 100%;
  padding-bottom: 100px;
}
.layout-menu {
  margin: 20px 0 30px 30px;
}
</style>
