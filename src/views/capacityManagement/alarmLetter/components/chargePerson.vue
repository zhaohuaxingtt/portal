<template>
  <div>
    <div style="margin-top: 20px">
      <el-table
        :data="warningLetterOwnerList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="#" type="index" width="65"> </el-table-column>
        <el-table-column
          :label="language('FUZHERENXINGMING', '负责人姓名')"
          prop="userName"
          min-width="180"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="language('ZHIWU', '职务')"
          prop="userPost"
          min-width="180"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.userPost }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="language('LIANXIDIANHUA', '联系电话')"
          prop="userPhone"
          min-width="180"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.userPhone }}</span>
          </template>
        </el-table-column>
        <el-table-column
          :label="language('DIANZHIYOUXIANG', '电子邮箱')"
          prop="userEmai"
          min-width="180"
        >
          <template slot-scope="scope">
            <span> {{ scope.row.userEmai }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    warningLetterOwnerList: {
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
