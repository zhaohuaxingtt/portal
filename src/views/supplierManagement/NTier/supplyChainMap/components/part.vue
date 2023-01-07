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
          {{ language('LINGJIAN', '零件') }}
        </div>
        <img :src="part" alt="" width="50px" />
      </div>
      <div class="flex-ver" style="width: 87%">
        <myTable
          maxHeight="200px"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          v-bind="$attrs"
          @handleCurrentChange="handleCurrentChange"
        >
        </myTable>
      </div>
    </div>
  </iCard>
</template>

<script>
import { iCard, icon } from 'rise'
import myTable from './myTable.vue'
import { partTableTitle } from './data.js'
import part from '@/assets/images/supplyChainOverall/part.png'

export default {
  components: { iCard, icon, myTable },
  props: {
    object: {
      type: Object,
      default: {}
    }
  },
  data() {
    // 这里存放数据
    return {
      part: part,
      initData: [],
      tableListData: [],
      tableTitle: partTableTitle,
      tableData: [],
      dataAll: [],
      pageSize: '20',
      page: 0
    }
  },
  // 监控data中的数据变化
  watch: {
    object: {
      handler(data) {
        this.tableListData = data.partList
      }
    }
  },
  // 方法集合
  methods: {
    handleCurrentChange(row) {
      row && this.$emit('handleCurrentChange', row, 'part')
    }
  }
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