<!--
 * @Date: 2021-11-29 14:47:24
 * @LastEditors: caopeng
 * @LastEditTime: 2022-01-19 10:17:57
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\manage\components\manageTable.vue
-->
<template>
  <iCard tabCard
         class="box"
         collapse  v-loading="loadingFlag">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{
        language('YINGYONGGUANLI', '应用管理')
      }}</span>
      <div class="floatright">
        <i-button @click="openLog">{{ language('rizhi', '日志') }}</i-button>
        <i-button @click="add">{{ language('XINZENG', '新增') }}
        </i-button>
        <i-button @click="remove" :disabled="onAppSaveAction" :loading="onAppSaveAction">{{ language('SHANCHU', '删除') }}
        </i-button>
        <i-button @click="exportFile" :disabled="onExportAction" :loading="onExportAction">{{ language('DAOCHU', '导出') }}
        </i-button>

      </div>
    </div>
    <table-list :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                :index="true"
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
    <iUserLog :show.sync="importLogDialog" :bizId="this.$route.query.opcsSupplierId" menuId="WS1OHTER-017" is-page  />
  </iCard>
</template>

<script>
import systeamDetailAdd from '../../userManage/components/systeamDetailAdd'
import tableList from '@/components/commonTable'
import { tableTitle } from './data'
import { excelExport } from '@/utils/filedowLoad'
import { pageMixins } from '@/utils/pageMixins'
import {
  pageQueryDetails,
  addDetails,
  deleteDetails
} from '@/api/opcs/solPermission'
import { iCard, iButton, iMessage, iMessageBox } from 'rise'
import iUserLog from '@/components/iUserLog'
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    systeamDetailAdd,
    tableList,
    iUserLog
    // iPagination
  },
  data() {
    return {
      onAppSaveAction: false,
      onExportAction: false,
      loadingFlag:false,
      dialog: false,
      importLogDialog: false,
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
    openLog() {
      this.importLogDialog = true;
    },
    add() {
      this.dialog = true
    },
    save(row) {
      let req = {
        opcsAppsList: row,
        opcsSupplierKeyId: this.$route.query.opcsSupplierId
      }
      this.loadingFlag = true
      addDetails(req).then((res) => {
        if (res && res.code == 200) {
          this.getTableData()
          this.edit = false
          iMessage.success(res.desZh)
        }else{
          iMessage.error(res.desZh)
        }
      }).finally(() => (this.loadingFlag = false))
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
        //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val
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
        this.onAppSaveAction = true;
        let req = {
          id: this.selectTableData.map((v) => {
            return v.id
          }),
          opcsSupplierId: this.$route.query.opcsSupplierId
        }
        deleteDetails(req).then((res) => {
          if (res && res.code == 200) {
            this.getTableData()
            iMessage.success(res.desZh)
          } else {
            iMessage.error(res.desZh)
          }
          this.onAppSaveAction = false;
        }, function() {
          this.onAppSaveAction = false;
        })
      })
    },
    exportFile() {
      this.onExportAction = true;
      excelExport(
        this.tableListData,
        this.tableTitle,
        this.language('YINGYONGLIEBIAO', '应用列表')
      )
      this.onExportAction = false;
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
