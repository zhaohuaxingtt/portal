<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-23 15:39:07
 * @LastEditors: YoHo && 917955345@qq.com
 * @Descripttion: your project
-->
<template>
  <div class="scorll-page">
    <iNavMvp :lang='true' :list="nTierRouterList" :lev='2' right routerPage class="nav" />
    <router-view />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iPage, iNavMvp } from "rise";
import headerNav from "../commonHeardNav/headerNav";
import { nTierRouterList } from "../commonHeardNav/navData.js";

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iPage, headerNav, iNavMvp },
  data() {
    // 这里存放数据
    return {
      nTierRouterList: _.cloneDeep(nTierRouterList),
    }
  },
}
</script>
<style lang='scss' scoped>
.scorll-page{
  overflow: unset !important;
}
.nav {
  position: absolute;
  top: 1.75rem;
  right: 9rem;
}

::v-deep .nav>div{
  max-width: 180px!important;
}
</style>
