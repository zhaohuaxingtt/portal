<!--
 * @Date: 2021-11-25 09:47:22
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-06 16:11:02
 * @FilePath: \front-portal-new\src\views\opcsSupervise\router.vue
-->

<template>
  <iPage class="padding">
    <headerNav :class="$route.path.indexOf('application')=='-1'?'nav ':'nav header'" />
    <router-view style="margin-top:10px" />
  </iPage>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iPage } from 'rise'
import headerNav from './commonHeardNav/headerNav'
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iPage, headerNav },
  data() {
    // 这里存放数据
    return {
      padding: false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    if (
      this.$route.path === '/supplier/NTier/NTierMap' ||
      this.$route.path === '/supplier/NTier/supplyChainRisk/map'
    ) {
      this.padding = true
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.padding {
  position: relative;
  //   padding: 1.875rem 0 0 0;
}
.nav {
  padding: 0 2.5rem 0 2.5rem;
}
.routerpage {
  position: relative;
}
.header {
  width: 94%;
  position: fixed;
  top: 34px;
  z-index: 100;
  background-color: #f8f9fa;
  padding-bottom: 10px;
  padding-top: 40px;
  left: 100px;
}
</style>
