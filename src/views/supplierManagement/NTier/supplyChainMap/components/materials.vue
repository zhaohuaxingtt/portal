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
      <div class="flex-ver">
        <div class="title margin-bottom20">
          {{language('CAILIAOZU','材料组')}}
        </div>
        <img :src="materials" alt="" width="50px">
      </div>
      <div class="flex-ver" style="width: calc(100% / 6 * 5);">
        <tableList :height="124" style="width: 100%;" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection='false' :index="false">
        </tableList>
      </div>
    </div>

  </iCard>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iCard, icon } from "rise";
import tableList from '@/components/commonTable';
import { meterialsTableTitle } from "./data.js";
import materials from "@/assets/images/supplyChainOverall/materials.png";

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iCard, icon, tableList },
  props: {
    object: { type: Object, default: {} }
  },
  data() {
    // 这里存放数据
    return {
      materials: materials,
      tableListData: [],
      tableTitle: meterialsTableTitle,
      tableLoading: false,
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    object: {
      deep: true,
      handler(data) {
        this.tableListData = data.categoryList
      }
    }
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
  font-size: 1.125rem;
  font-weight: bold;
}
</style>
