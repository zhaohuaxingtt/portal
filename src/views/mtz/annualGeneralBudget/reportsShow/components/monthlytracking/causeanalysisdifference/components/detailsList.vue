<template>
  <div class="detailsList">
    <el-table
      :data="differenceAnalysis"
      v-loading="loading"
      style="width: 100%"
    >
      <el-table-column
        prop="num"
        :label="language('LK_YUEFEN', '月份/序号')"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="materialMediumName"
        :label="language('LK_CAILIAOZHONGLEI', '材料中类')"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="mtzMaterialName"
        :label="language('LK_MTZCAILIAOZU', 'MTZ材料组')"
        align="center"
      >
      </el-table-column>
      <el-table-column :label="dataTitle" align="center">
        <el-table-column
          :label="language('LK_SHICHANGJIA', '市场价')"
          align="center"
        >
          <template slot-scope="scope">
            {{
              scope.row.compareDataList &&
              scope.row.compareDataList[0].marketPrice
            }}
          </template>
        </el-table-column>
        <el-table-column
          :label="language('LK_YONGLIANG', '用量')"
          align="center"
        >
          <template slot-scope="scope">
            {{
              scope.row.compareDataList && scope.row.compareDataList[0].dosage
            }}
          </template>
        </el-table-column>
        <el-table-column :label="language('LK_ZONGJI', '总计')" align="center">
          <template slot-scope="scope">
            {{
              scope.row.compareDataList && scope.row.compareDataList[0].total
            }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="dataTitleTwo" align="center">
        <el-table-column
          :label="language('LK_SHICHANGJIA', '市场价')"
          align="center"
        >
          <template slot-scope="scope">
            {{
              scope.row.compareDataList &&
              scope.row.compareDataList[1].marketPrice
            }}
          </template>
        </el-table-column>
        <el-table-column
          :label="language('LK_YONGLIANG', '用量')"
          align="center"
        >
          <template slot-scope="scope">
            {{
              scope.row.compareDataList && scope.row.compareDataList[1].dosage
            }}
          </template>
        </el-table-column>
        <el-table-column :label="language('LK_ZONGJI', '总计')" align="center">
          <template slot-scope="scope">
            {{
              scope.row.compareDataList && scope.row.compareDataList[1].total
            }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="language('LK_CHAYI', '差异')" align="center">
        <el-table-column
          :label="language('LK_SHICHANGJIACHAYI', '市场价差异 %')"
          align="center"
        >
          <template slot-scope="scope">
            <span
              class="greaterThanZero"
              v-if="scope.row.marketPriceDifference > 0"
              >{{ `${scope.row.marketPriceDifference}%` }}</span
            >
            <span
              class="lessThanZero"
              v-else-if="scope.row.marketPriceDifference < 0"
              >{{ `${scope.row.marketPriceDifference}%` }}</span
            >
            <span v-else-if="scope.row.marketPriceDifference == 0">{{
              `${scope.row.marketPriceDifference}%`
            }}</span>
            <span v-else-if="scope.row.marketPriceDifference == 'null'"
              >{{}}</span
            >
          </template>
        </el-table-column>
        <el-table-column
          :label="language('LK_YONGLIANGCHAYI', '用量差异 %')"
          align="center"
        >
          <template slot-scope="scope">
            <span
              class="greaterThanZero"
              v-if="scope.row.dosageDifference > 0"
              >{{ `${scope.row.dosageDifference}%` }}</span
            >
            <span
              class="lessThanZero"
              v-else-if="scope.row.dosageDifference < 0"
              >{{ `${scope.row.dosageDifference}%` }}</span
            >
            <span v-else-if="scope.row.dosageDifference == 0">{{
              `${scope.row.dosageDifference}%`
            }}</span>
            <span v-else-if="scope.row.dosageDifference == 'null'">{{}}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="language('LK_ZONGJIACHAYI', '总价差异')"
          align="center"
        >
          <template slot-scope="scope">
            <span
              class="greaterThanZero"
              v-if="scope.row.totalDifference > 0"
              >{{ `${scope.row.totalDifference}` }}</span
            >
            <span
              class="lessThanZero"
              v-else-if="scope.row.totalDifference < 0"
              >{{ `${scope.row.totalDifference}` }}</span
            >
            <span v-else-if="scope.row.totalDifference == 0">{{
              `${scope.row.totalDifference}`
            }}</span>
            <span v-else-if="scope.row.totalDifference == 'null'">{{}}</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    differenceAnalysis: { type: Array },
    dataTitle: { type: String },
    dataTitleTwo: { type: String },
    num: { type: Number },
    loading: { type: Boolean, default: false }
  },
  data() {
    return {}
  },
  created() {}
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
