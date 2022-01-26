<!--
 * @Author: caopeng
-->
<template>
  <i-card>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <i-button @click="subBtn">{{ language('TIJIAO', '提交') }}</i-button>
        <iButton @click="$router.go(-1)">{{ $t('FANHUIGONGYINSHANG360') }}</iButton>
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
  async created() {
    await this.getTableList()
  },
  methods: {
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    async getTableList(val) {
      this.tableLoading = true
      const req = {
        supplierToken: this.$route.query.supplierToken
      }
      try {
        const res = await getSupplierProcureFactory(req)
        this.tableListData = res.data ? res.data : []
        this.tableLoading = false
        //转正前
        if (this.tableListData.isSelect && val != 1) {
          const data = []
          const isExistList = []
          this.$nextTick(() => {
            this.tableListData.procureFactoryList.forEach((e) => {
              if (e.isExist) {
                isExistList.push(e)
              }
            })
            //若只有两个默认8000，9000其他默认全选，有除了默认的外就只勾选选中的
            if (isExistList.length == 2) {
              this.tableListData.procureFactoryList.forEach((e) => {
                this.$refs.mulitipleTable.toggleRowSelection(e, true)
              })
            } else {
              this.tableListData.procureFactoryList.forEach((e) => {
                if (e.isExist) {
                  this.$refs.mulitipleTable.toggleRowSelection(e, true)
                }
              })
            }
            //进入页面若没提交过则默认提交code为9000与8000的公司
            if (isExistList.length == 0) {
              this.tableListData.procureFactoryList.forEach((res) => {
                if (res.companyCode == '9000' || res.companyCode == '8000') {
                  data.push(res)
                }
              })
              const parms = {
                procureFactoryList: data,
                supplierToken: this.$route.query.supplierToken
              }
              saveSupplierProcureFactory(parms).then((res) => {
                this.$nextTick(() => {
                   this.tableListData.procureFactoryList.forEach((e) => {
                    this.$refs.mulitipleTable.toggleRowSelection(e, true)
                  })
                })
              })
            }
          })
        } else {
          //转正后的默认选中
          this.$nextTick(() => {
            this.tableListData.procureFactoryList.forEach((e) => {
              if (e.isExist) {
                this.$refs.mulitipleTable.toggleRowSelection(e, true)
              }
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
              this.getTableList(1)
              iMessage.success(res.desZh)
            } else iMessage.error(res.desZh)
          })
        })
    },
    selectable(val) {
      // if(this.tableListData?.formalStatus==1){

      // }
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