<!--
 * @Author: youyuan
 * @Date: 2021-08-27 17:43:08
 * @LastEditTime: 2021-09-03 17:06:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudgetLeader\index.vue
-->
<template>
  <iPage>
    <headerNav/>
  </iPage>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iPage } from "rise";
import headerNav from "./commonHeardNav/headerNav";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iPage, headerNav },
  data() {
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
  created() {
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {

  },
}
</script>
<style lang='scss' scoped>
</style>
