<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-25 18:24:55
 * @LastEditors: YoHo && 917955345@qq.com
 * @Descripttion: your project
-->
<template>
  <!-- 阻止滚动冒泡 -->
  <div style="width: 615px" class="tooltip" @mousewheel.stop="''">
    <el-select
      style="width: 100%"
      v-model="detail"
      value-key="factoryId"
      @change="change"
      v-if="supplierList.length > 1"
    >
      <el-option
        v-for="item in supplierList"
        :key="item.factoryId"
        :label="(item.supplierNameCn || item.supplierName) + (item.factoryName?('-' + item.factoryName):'')"
        :value="item"
      ></el-option>
    </el-select>
    <div v-loading="loading">
      <div class="flex-align-center margin-top10">
        <img :src="supplier" alt="" width="40px" />
        <div class="margin-left20">
          <div class="flex-align-center">
            <span class="title">{{ rateInfo.supplierNameCn }}</span>
            <div v-if="rateInfo.grade" class="margin-left10 red-border">
              {{ rateInfo.grade }}
            </div>
            <div
              v-if="rateInfo.tierLevelStr"
              class="margin-left10 white-border"
            >
              {{ rateInfo.tierLevelStr }}
            </div>
          </div>
          <span class="number">{{ rateInfo.sapCode }}</span>
          <span class="describe">{{ rateInfo.address }}</span>
        </div>
      </div>
      <el-divider></el-divider>
      <el-table
        tooltip-effect="light"
        height="300"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          show-overflow-tooltip
          prop="tierPartNum"
          label="散件零件"
        >
          <template slot-scope="scope">
            <template
              v-if="
                scope.row.tierPartNum == scope.row.tierOnePartNum &&
                scope.row.tierPartName == scope.row.tierOnePartName
              "
            >
            </template>
            <template v-else>
              <div>{{ scope.row.tierPartNum }}</div>
              <div>{{ scope.row.tierPartName }}</div>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="tierPartType"
          label="散件零件类型"
        >
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="tierOnePartNum"
          label="总成零件"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.tierOnePartNum }}</div>
            <div>{{ scope.row.tierOnePartName }}</div>
          </template>
        </el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="tierOneSupplier"
          label="总成供应商"
        >
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="motorType" label="车型">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import supplier from '@/assets/images/supplyChainOverall/supplier.png'
import {
  getChainPart,
  listFrameInfo
} from '@/api/supplierManagement/supplyChainOverall/index.js'

export default {
  components: {},
  props: {
    tableDataList: { type: Array, default: [] },
    supplierList: { type: Array, default: [] },
    rate: { type: Object, default: {} },
    supplierDetail: { type: Object, default: {} }
  },
  data() {
    // 这里存放数据
    return {
      supplier: supplier,
      tableData: [],
      detail: {},
      loading: false
    }
  },
  created() {
    this.tableData = JSON.parse(JSON.stringify(this.tableDataList))
    this.detail = JSON.parse(JSON.stringify(this.supplierDetail))
    this.rateInfo = JSON.parse(JSON.stringify(this.rate))
  },
  methods: {
    getLabel(Zh, En) {
      //下拉框国际化
      if (localStorage.getItem('lang') === 'zh') {
        return Zh ? Zh : En
      } else {
        return En ? En : Zh
      }
    },
    async change(val) {
      this.loading = true
      let pms = {
        supplierId: this.detail.supplierId,
        partNum: this.detail.partNum,
        type: this.detail.flag === 'svw' ? 2 : 1,
        factoryId: this.detail.factoryId
      }
      const res = await getChainPart(pms)
      const rate = await listFrameInfo(pms)
      this.tableData = res?.data || []
      this.rateInfo = rate?.data || {}
      this.loading = false
    }
  }
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
