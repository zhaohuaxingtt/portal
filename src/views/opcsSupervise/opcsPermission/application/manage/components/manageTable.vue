<!--
 * @Date: 2021-11-29 14:47:24
 * @LastEditors: caopeng
 * @LastEditTime: 2022-01-18 15:55:48
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\manage\components\manageTable.vue
-->
<template>
  <iCard tabCard
         class="box"
         collapse>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{
        language('JICHUXINXI', '基础信息')
      }}</span>
      <div class="floatright">
        <i-button @click="add">{{ language('XINZENG', '新增') }}
        </i-button>
        <i-button @click="remove">{{ language('SHANCHU', '删除') }}
        </i-button>
        <i-button @click="exportFile">{{ language('DAOCHU', '导出') }}
        </i-button>

      </div>
    </div>
    <table-list :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                :selection="false"
                ref="commonTable">
    </table-list>
    <!-- <iPagination style="margin-top: 20px"
                 v-update
                 @size-change="handleSizeChange($event, getTableData)"
                 @current-change="handleCurrentChange($event, getTableData)"
                 background
                 :page-sizes="page.pageSizes"
                 :page-size="page.pageSize"
                 :layout="page.layout"
                 :current-page="page.currPage"
                 :total="page.totalCount" /> -->
    <systeamDetailAdd @closeDiolog='closeDiolog'
                      @save="save"
                      v-model="dialog"></systeamDetailAdd>
  </iCard>
</template>

<script>
import systeamDetailAdd from '../../userManage/components/systeamDetailAdd'
import tableList from '@/components/commonTable'
import { tableTitle } from './data'
import { excelExport } from "@/utils/filedowLoad"
import { pageMixins } from '@/utils/pageMixins'
import {
  pageQueryDetails,
  addDetails,
  deleteDetails
} from '@/api/opcs/solPermission'
import { iCard, iButton, iMessage, iMessageBox } from 'rise'
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    systeamDetailAdd,
    tableList,
    // iPagination
  },
  data() {
    return {
      dialog: false,
      tableLoading: false,
      selectTableData: [],
      tableTitle: tableTitle,
      tableListData: []
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    add() {
      this.dialog = true
    },
    save(row) {
      let req = {
        opcsAppsList: row,
        opcsSupplierKeyId: this.$route.query.opcsSupplierId
      }
      addDetails(req).then((res) => {
        if (res && res.code == 200) {
          this.getTableData()
          this.edit = false
          iMessage.success(res.desZh)
        }
      })
    },

    //获取列表接口
    getTableData() {
      this.tableLoading = true
      const params = {
        opcsSupplierId: this.$route.query.opcsSupplierId
      }
      pageQueryDetails(params).then((res) => {
        this.tableLoading = false
        if (res && res.code == 200) {
          this.tableListData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    remove() {
      if (this.selectTableData.length == 0) {
        iMessage.warn(this.$t('SUPPLIER_ZHISHAOXUANZHEYITIAOJILU'))
        return false
      }
      iMessageBox(
        this.language(
          'SHANCHUGAIYINGYOINGSHI,SUOYOUBANGDINGYONGHUSHOUQUANJIANGYIQISHANCHU',
          '删除该应用时，所有绑定用户的授权将一并删除，是否继续？'
        ),
        this.language('SHANCHU', '删除'),
        {
          confirmButtonText: this.language('SHI', '是'),
          cancelButtonText: this.language('FOU', '否')
        }
      ).then(async () => {
        let req = {
          id: this.selectTableData.map((v) => {
            return v.id
          })
        }
        deleteDetails(req).then((res) => {
          if (res && res.code == 200) {
            this.getTableData()
            iMessage.success(res.desZh)
          }
        })
      })
    },
    exportFile() {
            excelExport(this.tableListData, this.tableTitle, this.language('YINGYONGLIEBIAO', '应用列表'))
    },
    closeDiolog() {
      this.dialog = false
    }
  }
}
</script>

<style  lang="scss" scope>
.box {
  .el-table .el-table__row .el-input {
    width: 100% !important;
  }
}
</style>
