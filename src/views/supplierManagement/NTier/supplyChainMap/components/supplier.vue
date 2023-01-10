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
          {{language('GONGYINGSHANG','供应商')}}
        </div>
        <img :src="supplier" alt="" width="50px">
      </div>
      <div class="flex-ver" style="width: 87%;">
        <myTable maxHeight="250px" :tableData="tableListData" :tableTitle="tableTitle" v-bind="$attrs" @handleCurrentChange="handleCurrentChange">
        </myTable>
      </div>
    </div>

  </iCard>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iCard, icon } from "rise";
import myTable from './myTable.vue';
import { supplierTableTitle } from "./data.js";
import supplier from "@/assets/images/supplyChainOverall/supplier.png";

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iCard, icon, myTable },
  props: {
    object: { type: Object, default: {} },
  },
  data() {
    // 这里存放数据
    return {
      supplier: supplier,
      tableListData: [],
      tableTitle: supplierTableTitle,
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {
    object: {
      handler(data) {
        this.tableListData = data.supplierList
      }
    }
  },
  // 方法集合
  methods: {
    handleCurrentChange(row) {
      row && this.$emit('handleCurrentChange', row, 'supplier')
    }
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
::v-deep .el-table__body tr.current-row > td {
  background: #77cbff;
}
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #77cbff;
}
</style>
