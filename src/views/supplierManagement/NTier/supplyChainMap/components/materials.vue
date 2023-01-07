<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-06 12:45:45
 * @LastEditors: YoHo && 917955345@qq.com
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
      <div class="flex-ver" style="width: 87%;">
        <myTable maxHeight="150px" :tableData="tableListData" :tableTitle="tableTitle" v-bind="$attrs">
        </myTable>
      </div>
    </div>
  </iCard>
</template>

<script>
import { iCard, icon } from "rise";
import myTable from './myTable.vue';
import { meterialsTableTitle } from "./data.js";
import materials from "@/assets/images/supplyChainOverall/materials.png";

export default {
  components: { iCard, icon, myTable },
  props: {
    object: { type: Object, default: {} }
  },
  data() {
    // 这里存放数据
    return {
      materials: materials,
      tableListData: [],
      tableTitle: meterialsTableTitle,
    }
  },
  // 监控data中的数据变化
  watch: {
    object: {
      deep: true,
      handler(data) {
        this.tableListData = data.categoryList
      }
    }
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
