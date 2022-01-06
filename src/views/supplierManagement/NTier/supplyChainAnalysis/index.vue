<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-23 20:52:20
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <div class="content">
    <div class="btn">
      <iButton>{{language('CHONGZHISUOYOU','重置所有')}}</iButton>
      <iButton>{{language('CHAKANXIANGQING','查看详情')}}</iButton>
    </div>
    <iTabsList v-model="tabVal"
               @tab-click="handleTabClick"
               type="card"
               slot="components"
               class='margin-top20 iTabsList'>
      <el-tab-pane :name="1"
                   :label="language('SANJIANGUOJIHUAFENXI','散件国际化分析')"> </el-tab-pane>
      <el-tab-pane :name="2"
                   :label="language('SANJIANGONGYINGJIZHONGDUFENXI','散件供应集中度分析')"> </el-tab-pane>
    </iTabsList>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iTabsList, iButton } from "rise";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iTabsList, iButton },
  data () {
    // 这里存放数据
    return {
      tabVal: 1
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
.content {
  position: relative;
  .btn {
    position: absolute;
    top: 0.4rem;
    right: 0;
  }
}
</style>
