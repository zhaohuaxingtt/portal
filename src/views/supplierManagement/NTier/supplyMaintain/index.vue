<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-10-06 11:13:02
 * @LastEditors: caopeng
 * @Descripttion: your project
-->
<template>
  <div>
    <theSearch @form="getForm" />
    <router-view ref="view"></router-view>
    <!-- <theNodeChain class="margin-top20"/> -->
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// import theNodeChain from "./components/theNodeChain.vue";
import theSearch from "./components/theSearch.vue";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { theSearch },
  data () {
    // 这里存放数据
    return {
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
  created () {

  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
</style>
