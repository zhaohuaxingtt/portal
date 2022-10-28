<!--
 * @Author: your name
 * @Date: 2021-09-06 11:54:03
 * @LastEditTime: 2021-10-21 14:59:54
 * @LastEditors: zbin
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\supplierManagement\NTier\supplyChainRisk\components\supplierBasicInfo.vue\
-->
<template>
  <div>
    <div style="margin-top: 20px">
      <el-table :data="warningLetterSolutionList" style="width: 100%">
        <el-table-column label="#" type="index" width="65"> </el-table-column>
        <el-table-column
          :label="language('CUOSHIMIANSHU', '措施描述')"
          prop="solutionDetail"
          min-width="180"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.solutionDetail }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="language('KAISHISHIJIAN', '开始时间')"
          prop="solutionStartDate"
          min-width="180"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.solutionStartDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="language('WANCHENGSHIJIAN', '完成时间')"
          prop="solutionEndDate"
          min-width="180"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.solutionEndDate }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="language('FUZHEREN', '负责人')"
          prop="solutionOwner"
          min-width="180"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.solutionOwner }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    warningLetterSolutionList: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.formList {
  display: flex;
  flex-wrap: wrap;
  .formItem {
    width: 24%;
  }
}
.supplierAddress {
  display: flex;
  justify-content: space-between;
  .title {
    font-size: 18px;
    font-weight: bold;
  }
}
::v-deep .el-form-item {
  &:last-child {
    margin-bottom: 0px;
  }
}
::v-deep .el-table .el-table__row .el-input {
  width: 220px !important;
}
:v-deep .el-input__inner {
  width: 220px !important;
}
</style>
