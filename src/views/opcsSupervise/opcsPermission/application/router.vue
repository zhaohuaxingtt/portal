<!--
 * @Date: 2021-11-29 10:30:10
 * @LastEditors: caopeng
 * @LastEditTime: 2021-11-29 11:27:39
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\router.vue
-->


<template>
  <div>
    <iNavMvp :list="applicationRouterList" :lev='2' right routerPage class="nav" />
    <router-view />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import {  iNavMvp } from "rise";
import { applicationRouterList } from "../../commonHeardNav/navData.js";
import { cloneDeep } from "lodash"

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {  iNavMvp },
  data() {
    // 这里存放数据
    return {
      applicationRouterList: cloneDeep(applicationRouterList),
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.nav {
  position: absolute;
  top: 1.85rem;
  right: 9rem;
}
</style>
