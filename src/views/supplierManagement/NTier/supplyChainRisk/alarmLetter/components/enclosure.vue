<!--
 * @Author: your name
 * @Date: 2021-09-06 11:54:03
 * @LastEditTime: 2021-10-21 14:58:47
 * @LastEditors: zbin
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\supplierManagement\NTier\supplyChainRisk\components\supplierBasicInfo.vue\
-->
<template>
  <div>
    <div style="margin-top:20px">
      <el-table :data="tableList" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="#" type="index" width="65">
        </el-table-column>
        <el-table-column :label="language('FUJIANMINGCHEN','附件名称')" min-width="180">
          <template slot-scope="scope">
            <span class="file" @click="detail(scope.row)">{{scope.row.trueName}}</span>
          </template>
        </el-table-column>
        <el-table-column :label="language('DAXIAO_B','大小 (B)')" prop="size" min-width="180">

        </el-table-column>
        <el-table-column :label="language('SHANGCHUANREN','上传人')" prop="createUserName" min-width="180">

        </el-table-column>
        <el-table-column :label="language('SHANGCHUANSHIJIAN','上传时间')" prop="uploadDate" min-width="180">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { iPage, iCard, iButton } from 'rise'
import editTableCell from './editTableCell'
export default {
  data() {
    return {
      editModeEnabled: true,
      tableList: []
    }
  },
  props: {
    warningLetterAnnexList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    warningLetterAnnexList: {
      handler(val) {
        this.tableList = _.cloneDeep(val)
      },
      deep: true
    }
  },
  components: {
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    detail(val) {
      window.open(val.dir)
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
.file {
  text-decoration: underline;
  color: rgb(49, 105, 194);
  cursor: pointer;
}
::v-deep .el-table .el-table__row .el-input {
  width: 220px !important;
}
:v-deep .el-input__inner {
  width: 220px !important;
}
</style>
