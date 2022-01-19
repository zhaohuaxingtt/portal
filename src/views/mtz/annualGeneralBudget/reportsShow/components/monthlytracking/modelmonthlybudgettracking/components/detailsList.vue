<template>
  <div class="detailsList">
    <el-table :data="differenceAnalysisCarModel" style="width: 100%">
      <el-table-column prop="num" label="#" align="center"> </el-table-column>
      <el-table-column prop="carType" :label="language('LK_CHEXINGMINGCHENG','车型名称')" align="center">
      </el-table-column>
      <el-table-column prop="carType6Code" :label="language('LK_CHEXINGLIUWEIHAO','车型六位号')" align="center">
      </el-table-column>
      <el-table-column :label="dataTitle" align="center">
        <el-table-column prop="yearForecastPriceV1" :label="language('LK_NIANDUYUSUAN','年度预算')" align="center">
        </el-table-column>
        <el-table-column prop="monthForecastPriceV1" :label="language('LK_YUEDUYUCE','月度预测')" align="center">
        </el-table-column>
        <el-table-column prop="actPriceV1" :label="language('LK_SHIJIZHIFU','实际支付')" align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="dataTitleTwo" align="center">
        <el-table-column prop="yearForecastPriceV2" :label="language('LK_NIANDUYUSUAN','年度预算')" align="center">
        </el-table-column>
        <el-table-column prop="monthForecastPriceV2" :label="language('LK_YUEDUYUCE','月度预测')" align="center">
        </el-table-column>
        <el-table-column prop="actPriceV2" :label="language('LK_SHIJIZHIFU','实际支付')" align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="language('LK_CHAYI','差异')" align="center">
        <el-table-column :label="language('LK_NIANDUYUSUANCHAYI','年度预算差异')" align="center">
          <template slot-scope="scope">
            <span class="greaterThanZero" v-if="scope.row.yearForecastDiffPrice>0">{{ scope.row.yearForecastDiffPrice }}</span>
            <span class="lessThanZero" v-else-if="scope.row.yearForecastDiffPrice<0">{{ `${scope.row.yearForecastDiffPrice}` }}</span>
            <span  v-else>{{ scope.row.yearForecastDiffPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="language('LK_YUEDUYUSUANCHAYI','月度预算差异')" align="center">
          <template slot-scope="scope">
            <span class="greaterThanZero" v-if="scope.row.monthForecastDiffPrice>0">{{ scope.row.monthForecastDiffPrice }}</span>
            <span class="lessThanZero" v-else-if="scope.row.monthForecastDiffPrice<0">{{ `-${scope.row.monthForecastDiffPrice}` }}</span>
            <span   v-else>{{ scope.row.monthForecastDiffPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="language('LK_SHIJIZHIFUCHAYI','实际支付差异')" align="center">
        <template slot-scope="scope">
            <span class="greaterThanZero" v-if="scope.row.actDiffPrice>0">{{ scope.row.actDiffPrice }}</span>
            <span class="lessThanZero" v-else-if="scope.row.actDiffPrice<0">{{ `-${scope.row.actDiffPrice}` }}</span>
            <span   v-else>{{ scope.row.actDiffPrice }}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    differenceAnalysisCarModel: { type: Array },
    dataTitle: { type: String },
    dataTitleTwo: { type: String },
  },
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.detailsList {
  ::v-deep .el-table__header-wrapper {
    th {
      border: 1px solid white;
    }
  }

  ::v-deep .el-table {
    border: none;
    border-radius: 10px 10px 0 0;
  }
}

.greaterThanZero {
  color: blue;
}

.lessThanZero {
  color: orange;
}
</style>