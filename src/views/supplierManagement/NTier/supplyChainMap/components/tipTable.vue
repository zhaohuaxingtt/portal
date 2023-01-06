<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-25 18:24:55
 * @LastEditors: YoHo && 917955345@qq.com
 * @Descripttion: your project
-->
<template>
<!-- 阻止滚动冒泡 -->
  <div style="width:615px" class="tooltip" @mousewheel.stop="''">
    <div class="flex-align-center">
      <img :src="supplier" alt="" width="40px">
      <div class="margin-left20">
        <div class="flex-align-center">
          <span class="title">{{rate.supplierNameCn}}</span>
          <div v-if="rate.grade" class="margin-left10 red-border">{{rate.grade}}</div>
          <div v-if="rate.tierLevelStr" class="margin-left10 white-border">{{rate.tierLevelStr}}</div>
        </div>
        <span class="number">{{rate.sapCode}}</span> <span class="describe">{{rate.address}}</span>
      </div>
    </div>
    <el-divider></el-divider>
    <el-table tooltip-effect='light' height="300" :data="tableDataList" style="width: 100%">
      <el-table-column show-overflow-tooltip prop="tierPartNum" label="散件零件">
        <template slot-scope="scope">
          <template v-if="scope.row.tierPartNum == scope.row.tierOnePartNum && scope.row.tierPartName == scope.row.tierOnePartName">
          </template>
          <template v-else>
            <div>{{scope.row.tierPartNum}}</div>
            <div>{{scope.row.tierPartName}}</div>
          </template>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="tierPartType" label="散件零件类型">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="tierOnePartNum" label="总成零件">
        <template slot-scope="scope">
          <div>{{scope.row.tierOnePartNum}}</div>
          <div>{{scope.row.tierOnePartName}}</div>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="tierOneSupplier" label="总成供应商">
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="motorType" label="车型">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import supplier from "@/assets/images/supplyChainOverall/supplier.png";

export default {
  // import引入的组件需要注入到对象中才能使用
  components: {},
  props: {
    tableDataList: { type: Array, default: [] },
    rate: { type: Object, default: {} }
  },
  data() {
    // 这里存放数据
    return {
      supplier: supplier,
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
.tooltip {
  .title {
    font-size: 16px;
    font-weight: bold;
    font-family: Arial;
  }
  .number {
    font-size: 12px;
    color: #41434a;
  }
  .describe {
    color: #41434a;
    font-size: 12px;
  }
  .red-border {
    min-width: 46px;
    height: 20px;
    background: #e30b0d;
    border-radius: 5px;
    text-align: center;
    opacity: 1;
    color: #fff;
    line-height: 18px;
    font-weight: bold;
  }
  .white-border {
    min-width: 114px;
    height: 20px;
    background: #e8effe;
    border-radius: 5px;
    text-align: center;
    opacity: 1;
    color: #909192;
    line-height: 18px;
    font-weight: bold;
  }
}
::v-deep .cell {
  text-align: center;
}
</style>
