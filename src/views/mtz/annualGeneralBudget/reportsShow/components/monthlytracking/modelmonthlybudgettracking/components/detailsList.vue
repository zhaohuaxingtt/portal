<template>
  <div class="detailsList">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="#" width="150" align="center">
      </el-table-column>
      <el-table-column prop="date" label="车型名称" width="150" align="center">
      </el-table-column>
      <el-table-column prop="date" label="车型六位号" width="150" align="center">
      </el-table-column>
      <el-table-column label="2021年3月" align="center">
        <el-table-column
          prop="province"
          label="年度预算"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="zip" label="月度预测" width="120" align="center">
        </el-table-column>
        <el-table-column prop="city" label="实际支付" width="120" align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="2021年4月" align="center">
        <el-table-column
          prop="province"
          label="年度预算"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="zip" label="月度预测" width="120" align="center">
        </el-table-column>
        <el-table-column prop="city" label="实际支付" width="120" align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column label="差异" align="center">
        <el-table-column
          prop="province"
          label="年度预算差异"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="city"
          label="月度预算差异"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="zip" label="实际支付差异" width="120" align="center">
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