<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-06 12:45:45
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iCard>
    <div class="flex-hor">
      <img :src="region" alt="" width="50px">
      <div class="flex-ver" style="width: 87%;">
        <div class="title">{{language('DIQU','地区')}}</div>
        <div class="text">
          <span v-for="(item,index) in area" :key="index">
            <span v-for="(i,idx) in item" :key="idx">
              {{item.length-1>idx?i+',':i}}
            </span>
            <span v-if="index<(area.length-1)"> | </span>
          </span>
        </div>
      </div>
    </div>

  </iCard>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iCard, } from "rise";
import region from "@/assets/images/supplyChainOverall/region.png";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iCard, },
  props: {
    object: { type: Object, default: {} },
    area: { type: String, default: '' }
  },
  data() {
    // 这里存放数据
    return {
      region: region,
      area: ''
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    object: {
      deep: true,
      handler(data) {
        // this.area = data.area
      }
    },
  },
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
.title {
  font-size: 18px;
  font-weight: bold;
}
.text {
  color: #41434a;
  font-size: 14px;
  height: 1.4rem;
  overflow: auto;
}
</style>
