<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2021-04-13 17:30:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <i-button @click="exportsTable">{{ language('TIJIAO', '提交') }}</i-button>
      </div>
    </div>

    <!-- v-permission="SUPPLIER_CHANGEHISTORY_TABLE" -->
    <el-table :data="tableListData"
              v-loading="tableLoading"
              @selection-change="handleSelectionChange">
      <el-table-column type='selection'
                       width="50"
                       align='center'
                       :selectable="selectable"></el-table-column>
      <el-table-column prop="code"
                       align='center'
                       label="工厂编号">
        <template slot-scope="scope">
          <iInput  style="width:220px" clearable
                  v-model="scope.row.code"
                  :placeholder="language('QINGSHURU', '请输入')"
                  maxlength="200"></iInput>
        </template>

      </el-table-column>
      <el-table-column prop="code"
                       align='center'
                       label="工厂名称">
        <template slot-scope="scope">
          <iInput  style="width:220px" clearable
                  v-model="scope.row.code"
                  :placeholder="language('QINGSHURU', '请输入')"
                  maxlength="200"></iInput>
        </template>

      </el-table-column>
      <el-table-column prop="code"
                       align='center'
                       label="公司编号">
        <template slot-scope="scope">
          <iInput style="width:220px" clearable
                  v-model="scope.row.code"
                  :placeholder="language('QINGSHURU', '请输入')"
                  maxlength="200"></iInput>
        </template>

      </el-table-column>
      <!--       
      <el-table-column v-for="i in tableTitle"
                       :key="i.key"
                       :width="i.width"
                       align='center'
                       :prop="i.props"
                       :label="i.name"></el-table-column> -->
    </el-table>
  </i-card>
</template>

<script>
import { iCard, iButton, iInput } from 'rise'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import { tableTitle } from './components/data'
// import {getSupplierEditList} from "../../../../api/supplier360/systemModificationHistory";
import {  } from '@/api/frmRating/supplyCompany.js'
export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton,
    iInput
  },
  data() {
    return {
      tableListData: [{code:'111',dis:false},{code:'111',dis:true},],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: []
    }
  },
  created() {
    // this.getTableList()
  },
  methods: {
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    async getTableList(otherParams = {}) {
      this.tableLoading = true
      const req = {
        pageNo: 1,
        pageSize: 9999,
        ...otherParams
      }
      try {
        const res = await getSupplierEditList(req)
        this.tableListData = res.data ? res.data : []
        this.tableLoading = false
      } catch {
        this.tableLoading = false
      }
    },
    selectable(val) {
        return val.dis
    }
  }
}
</script>

<style  scoped>
::v-deep .el-table .el-table__row .el-input{
    width: 220px!important;
}
</style>