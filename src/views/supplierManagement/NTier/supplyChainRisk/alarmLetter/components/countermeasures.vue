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
    <div style="margin-top:20px">
      <el-table :data="tableList" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="#" type="index" width="65">
        </el-table-column>
        <el-table-column :label="language('CUOSHIMIANSHU','措施描述')" prop="solutionDetail" min-width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.solutionDetail" v-if="editMode"></el-input>
            <span v-else> {{scope.row.solutionDetail}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          v-model="row.solutionDetail">
            <span slot="content">{{row.solutionDetail}}</span>
          </editTable-cell> -->
        </el-table-column>
        <el-table-column :label="language('KAISHISHIJIAN','开始时间')" prop="solutionStartDate" min-width="180">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.solutionStartDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-if="editMode"></el-date-picker>
            <span v-else> {{scope.row.solutionStartDate}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          editableComponent="el-date-picker"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          v-model="row.solutionStartDate">
            <span slot="content">{{row.solutionStartDate}}</span>
          </editTable-cell> -->
        </el-table-column>
        <el-table-column :label="language('WANCHENGSHIJIAN','完成时间')" prop="solutionEndDate" min-width="180">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.solutionEndDate" format="yyyy-MM-dd" value-format="yyyy-MM-dd" v-if="editMode"></el-date-picker>
            <span v-else> {{scope.row.solutionEndDate}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          editableComponent="el-date-picker"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd"
                          v-model="row.solutionEndDate">
            <span slot="content">{{row.solutionEndDate}}</span>
          </editTable-cell> -->
        </el-table-column>
        <el-table-column :label="language('FUZHEREN','负责人')" prop="solutionOwner" min-width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.solutionOwner" v-if="editMode"></el-input>
            <span v-else> {{scope.row.solutionOwner}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          v-model="row.solutionOwner">
            <span slot="content">{{row.solutionOwner}}</span>
          </editTable-cell> -->
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { iButton } from 'rise'
import editTableCell from './editTableCell'
export default {
  data() {
    return {
      editModeEnabled: true,
      tableList: []
    }
  },
  props: {
    warningLetterSolutionList: {
      type: Array,
      default: () => {
        return []
      }
    },
    editMode: {
      type: Boolean,
      default: true
    }
  },
  components: {
    editTableCell
  },
  watch: {
    warningLetterSolutionList: {
      handler(val) {
        console.log(val)
        this.tableList = _.cloneDeep(val)
      },
      deep: true
    },
    tableList: {
      handler(val) {

      },
      deep: true
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
