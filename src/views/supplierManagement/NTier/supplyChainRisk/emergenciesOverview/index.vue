<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-24 17:07:39
 * @LastEditors: YoHo
 * @Descripttion: your project
-->
<template>
  <div class=''>
    <theSearch ref="theSearch" :eventType="eventType" />
    <theTable ref="theTable" class="margin-top20" :eventType="eventType" />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import theSearch from "./components/theSearch";
import theTable from "./components/theTable";
import { dictByCode } from "./components/data.js";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { theSearch, theTable },
  data () {
    // 这里存放数据
    return {
      eventType:{}
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    handleInit (form) {
      this.$refs.theTable.handleInit(form)
    },
    async dictByCode () {
      const res = await dictByCode('risk_event_type')
      this.eventType = res
    },
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    this.dictByCode()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
</style>
