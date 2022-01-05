<template>
  <div class="detailsList">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="#" align="center"> </el-table-column>
      <el-table-column prop="date" :label="language('LK_CHEXINGMINGCHENG','车型名称')" align="center">
      </el-table-column>
      <el-table-column prop="date" :label="language('LK_CHEXINGLIUWEIHAO','车型六位号')" align="center">
      </el-table-column>
      <el-table-column label="2021年3月" align="center">
        <el-table-column prop="province" :label="language('LK_NIANDUYUSUAN','年度预算')" align="center">
        </el-table-column>
        <el-table-column prop="zip" :label="language('LK_YUEDUYUCE','月度预测')" align="center">
        </el-table-column>
        <el-table-column prop="city" :label="language('LK_SHIJIZHIFU','实际支付')" align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="2021年4月" align="center">
        <el-table-column prop="province" :label="language('LK_NIANDUYUSUAN','年度预算')" align="center">
        </el-table-column>
        <el-table-column prop="zip" :label="language('LK_YUEDUYUCE','月度预测')" align="center">
        </el-table-column>
        <el-table-column prop="city" :label="language('LK_SHIJIZHIFU','实际支付')" align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column :label="language('LK_CHAYI','差异')" align="center">
        <el-table-column prop="province" :label="language('LK_NIANDUYUSUANCHAYI','年度预算差异')" align="center">
        </el-table-column>
        <el-table-column prop="city" :label="language('LK_YUEDUYUSUANCHAYI','月度预算差异')" align="center">
        </el-table-column>
        <el-table-column prop="zip" :label="language('LK_SHIJIZHIFUCHAYI','实际支付差异')" align="center">
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
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
</style>