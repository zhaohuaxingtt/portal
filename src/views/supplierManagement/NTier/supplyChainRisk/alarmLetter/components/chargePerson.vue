<!--
 * @Author: your name
 * @Date: 2021-09-06 11:54:03
 * @LastEditTime: 2021-10-21 15:00:49
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
        <el-table-column :label="language('FUZHERENXINGMING','负责人姓名')" prop="userName" min-width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.userName" v-if="editMode"></el-input>
            <span v-else> {{scope.row.userName}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          v-model="row.userName">
            <span slot="content">{{row.userName}}</span>
          </editTable-cell> -->
        </el-table-column>
        <el-table-column :label="language('ZHIWU','职务')" prop="userPost" min-width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.userPost" v-if="editMode"></el-input>
            <span v-else> {{scope.row.userPost}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          v-model="row.userPost">
            <span slot="content">{{row.userPost}}</span>
          </editTable-cell> -->
        </el-table-column>
        <el-table-column :label="language('LIANXIDIANHUA','联系电话')" prop="userPhone" min-width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.userPhone" v-if="editMode"></el-input>
            <span v-else> {{scope.row.userPhone}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          v-model="row.userPhone">
            <span slot="content">{{row.userPhone}}</span>
          </editTable-cell> -->
        </el-table-column>
        <el-table-column :label="language('DIANZHIYOUXIANG','电子邮箱')" prop="userEmai" min-width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.userEmai" v-if="editMode"></el-input>
            <span v-else> {{scope.row.userEmai}}</span>
          </template>
          <!-- <editTable-cell slot-scope="{row}"
                          :can-edit="editModeEnabled"
                          v-model="row.userEmai">
            <span slot="content">{{row.userEmai}}</span>
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
  components: {
    editTableCell
  },
  props: {
    warningLetterOwnerList: {
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
  watch: {
    warningLetterOwnerList: {
      handler(val) {
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
  created() {

  },
  mounted() {
    console.log(this.warningLetterOwnerList)
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
