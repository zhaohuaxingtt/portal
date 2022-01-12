<template>
  <div class="detailsList">
    <el-table :data="differenceAnalysis" style="width: 100%">
      <el-table-column
        prop="num"
        :label="language('LK_YUEFEN', '月份')"
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
            {{ scope.row.compareDataList[0].marketPrice }}
          </template>
        </el-table-column>
        <el-table-column
          :label="language('LK_YONGLIANG', '用量')"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.compareDataList[0].dosage }}
          </template>
        </el-table-column>
        <el-table-column :label="language('LK_ZONGJI', '总计')" align="center">
          <template slot-scope="scope">
            {{ scope.row.compareDataList[0].total }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="dataTitleTwo" align="center">
        <el-table-column
          :label="language('LK_SHICHANGJIA', '市场价')"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.compareDataList[0].marketPrice }}
          </template>
        </el-table-column>
        <el-table-column
          :label="language('LK_YONGLIANG', '用量')"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.compareDataList[0].dosage }}
          </template>
        </el-table-column>
        <el-table-column :label="language('LK_ZONGJI', '总计')" align="center">
          <template slot-scope="scope">
            {{ scope.row.compareDataList[0].total }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column :label="language('LK_CHAYI', '差异')" align="center">
        <el-table-column
          :label="language('LK_SHICHANGJIACHAYI', '市场价差异')"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.marketPriceDifference }}
          </template>
        </el-table-column>
        <el-table-column
          :label="language('LK_YONGLIANGCHAYI', '用量差异')"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.dosageDifference }}
          </template>
        </el-table-column>
        <el-table-column
          :label="language('LK_ZONGJIACHAYI', '总价差异')"
          align="center"
        >
          <template slot-scope="scope">
            {{ scope.row.totalDifference }}
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
    num: { type: Number }
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