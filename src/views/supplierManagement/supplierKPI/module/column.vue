<template>
  <el-table-column :prop="col.prop" :label="col.title" align="center">
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
