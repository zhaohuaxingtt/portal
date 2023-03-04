<template>
  <el-table-column :width="col.width||'120'" :prop="col.id" :label="col.title" align="center">
   
    <template slot-scope="scope">
      <sapn v-if="scope.row.beforeScore" style="color:#1763f7;font-weight:bold;"> {{scope.row[col.id]}}</sapn>
      <sapn v-else > {{scope.row[col.id]}}</sapn>

          </template>
    <template v-if="col.childVo">
      <my-column
        v-for="(item, index) in col.childVo"
        :key="index"
        :col="item"
      ></my-column>
    </template>
  </el-table-column>
</template>

<script>
export default {
  name: 'MyColumn',
  props: {
    col: {
      type: Object
    }
  }
}
</script>
