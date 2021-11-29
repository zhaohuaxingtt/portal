<!--
 * @Author: caopeng
-->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <i-button @click="subBtn">{{ language('TIJIAO', '提交') }}</i-button>
      </div>
    </div>

    <!-- v-permission="SUPPLIER_CHANGEHISTORY_TABLE" -->
    <el-table :data="tableListData.procureFactoryList"
              v-loading="tableLoading"
              @selection-change="handleSelectionChange"
              ref="mulitipleTable">

      <el-table-column type="selection"
                       width="50"
                       align="center"
                       :selectable="selectable"></el-table-column>
      <!-- <el-table-column prop="code"
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

      </el-table-column> -->

      <el-table-column v-for="i in tableTitle"
                       :key="i.key"
                       :width="i.width"
                       align="center"
                       :prop="i.props"
                       :label="i.name"></el-table-column>
    </el-table>
  </i-card>
</template>

<script>
import { iCard, iButton, iMessageBox, iMessage } from 'rise'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import { tableTitle } from './components/data'
// import {getSupplierEditList} from "../../../../api/supplier360/systemModificationHistory";
import {
  getSupplierProcureFactory,
  saveSupplierProcureFactory
} from '@/api/frmRating/supplyCompany.js'
export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iButton
  },
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: []
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    async getTableList() {
      this.tableLoading = true
      const req = {
        supplierToken: this.$route.query.supplierToken
      }
      try {
        const res = await getSupplierProcureFactory(req)
        this.tableListData = res.data ? res.data : []

        this.tableLoading = false
        if (this.tableListData.isSelect) {
          this.$nextTick(() => {
            this.tableListData.procureFactoryList.forEach((e) => {
              this.$refs.mulitipleTable.toggleRowSelection(e, true)
            })
          })
        }
      } catch {
        this.tableLoading = false
      }
    },
    subBtn() {
      let text = ''
      if (this.tableListData.isSelect) {
        text = this.language(
          'TIJIAOGONGHUOGONGSIXINXIGENGGAIHOUDANGGONGYINGSHANGZHUANZHENG',
          '提交供货公司信息更改后，当供应商转正批准后将立即同步SAP，不得撤销。'
        )
      } else {
        text = this.language(
          'TIJIAOGONGHUOGONGSIXINXIGENGGAIHOUSHUJULIJITONGBUSAO',
          '提交供货公司信息更改后，数据将立即同步SAP，不得撤销。'
        )
      }
      if (this.selectTableData.length == 0) {
        this.$message({
          type: 'warning',
          message: this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU')
        })
      } else
        iMessageBox(text, this.language('TIJIAO', '提交'), {
          confirmButtonText: this.language('SHI', '是'),
          cancelButtonText: this.language('FOU', '否')
        }).then(async () => {
          const req = {
            procureFactoryList: this.selectTableData,
            supplierToken: this.$route.query.supplierToken
          }
          saveSupplierProcureFactory(req).then((res) => {
            if (res && res.code == 200) {
              this.getTableList()
              iMessage.success(res.desZh)
            } else iMessage.error(res.desZh)
          })
        })
    },
   selectable(val) {
      if (this.tableListData.isSelect) {
        if (val.companyCode == '9000' || val.companyCode == '8000') {
          return false
        }
        return true
      }
      return !val.isExist
      // return true
    }
  }
}
</script>

<style  scoped>
::v-deep .el-table .el-table__row .el-input {
  width: 220px !important;
}
</style>