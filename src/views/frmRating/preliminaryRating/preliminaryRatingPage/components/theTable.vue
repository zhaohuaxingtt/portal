<template>
  <iCard class="table-card">
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <!--无法评级-->
        <iButton
          @click="handleNotRated"
          v-permission="PORTAL_SUPPLIER_NAV_CUBUPJNGJI_CP_WUFAPINGJI"
          >{{ $t('SPR_FRM_XGYSPJ_WFPJ') }}</iButton
        >
        <!--财报比较-->
        <iButton
          @click="handleFinancialReportComparison"
          v-permission="PORTAL_SUPPLIER_NAV_CUBUPJNGJI_CP_CAIWUBIJIAO"
          >{{ $t('SPR_FRM_CBPJ_CBBJ') }}</iButton
        >
        <!--有效-->
        <iButton
          @click="handleValidOrInvalid(1)"
          :loading="validButtonLoading"
          v-permission="PORTAL_SUPPLIER_NAV_CUBUPJNGJI_CP_YOUXIAO"
          >{{ $t('SUPPLIER_YOUXIAO') }}</iButton
        >
        <!--无效-->
        <iButton
          @click="handleValidOrInvalid(0)"
          :loading="invalidButtonLoading"
          v-permission="PORTAL_SUPPLIER_NAV_CUBUPJNGJI_CP_WUXIAO"
          >{{ $t('SUPPLIER_WUXIAO') }}</iButton
        >
        <!--导出初评模板-->
        <iButton
          @click="handleExport"
          v-permission="PORTAL_SUPPLIER_NAV_CUBUPJNGJI_CP_DAOCHUCHUPINGMUBAN"
          >{{ $t('SPR_FRM_CBPJ_DCCPMB') }}</iButton
        >
        <!--初步评级-->
        <iButton
          @click="handlePreliminaryRating"
          v-permission="PORTAL_SUPPLIER_NAV_CUBUPJNGJI_CP_CHUBUPINGJI"
          >{{ $t('SUPPLIER_CHUBUPINGJI1') }}</iButton
        >
        <buttonTableSetting
          @click="$refs.tableListRef.openSetting()"
        ></buttonTableSetting>
      </div>
    </div>

    <iTableCustom
      class="table-box"
      height="100%"
      ref="tableListRef"
      :data="tableListData"
      :columns="tableTitle"
      :loading="tableLoading"
      @handle-selection-change="handleSelectionChange"
      @go-detail="handleOpenPage"
    >
    </iTableCustom>
    <iPagination
      v-update
      @size-change="handleSizeChange($event, getTableList)"
      @current-change="handleCurrentChange($event, getTableList)"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
    />
    <!--无法评级-->
    <notRatedDialog
      v-model="notRatedDialog"
      :loading="notRatedDialogLoading"
      @handleSubmit="handleNotRatedSubmit"
    />
    <!--财报比较-->
    <financialReportComparisonDialog
      :selectTableData="selectTableData"
      v-model="financialReportComparisonDialog"
    />
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessageBox, iMessage } from 'rise'
import tableList from '@/components/commonTable'
import iTableCustom from '@/components/iTableCustom'
import buttonTableSetting from '@/components/buttonTableSetting'
import { pageMixins } from '@/utils/pageMixins'
import resultMessageMixin from '@/mixins/resultMessageMixin'
import { tableTitle } from './data'
import notRatedDialog from './notRatedDialog'
import financialReportComparisonDialog from './financialReportComparisonDialog'
import {
  getInitCommentList,
  updatePreliminaryStatus,
  initCommentRating
} from '../../../../../api/frmRating/preliminaryRating/preliminaryRatingPage'
// import { excelExport } from '@/utils/filedowLoad';
import { downloadUdFile } from '@/api/file'
import {
  // INITIAL_STATUS,
  SUPPLIER_STATUS
} from '../../../../../constants/frmRating/preliminaryRating'

export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iCard,
    iButton,
    tableList,
    iTableCustom,
    iPagination,
    notRatedDialog,
    financialReportComparisonDialog,
    buttonTableSetting
  },
  data() {
    return {
      tableListData: [],
      tableTitle,
      selectTableData: [],
      tableLoading: false,
      assignDialog: false,
      returnDialog: false,
      transferDialog: false,
      qualitativeScoringDialog: false,
      reScoringDialog: false,
      viewDialog: false,
      notRatedDialog: false,
      notRatedDialogLoading: false,
      financialReportComparisonDialog: false,
      validButtonLoading: false,
      invalidButtonLoading: false,
      // INITIAL_STATUS,
      SUPPLIER_STATUS
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    handleSelectionChange(val) {
      this.selectTableData = val
    },
    handleSearch() {
      this.page.currPage = 1
      this.getTableList()
    },
    async getTableList() {
      this.tableLoading = true
      const searchItem = this.$parent.$children.filter((item) => {
        return item.$attrs.name === 'theSearch'
      })
      const searchForm = searchItem[0].form
      try {
        const req = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          ...searchForm
        }
        const res = await getInitCommentList(req)
        if (res.result) {
          this.tableListData = res.data
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total || 0
        } else {
          this.resultMessage(res)
          this.tableListData = []
        }
        this.tableLoading = false
      } catch {
        this.tableListData = []
        this.tableLoading = false
      }
    },
    handleOpenAssign() {
      this.assignDialog = true
    },
    handleReturn() {
      this.returnDialog = true
    },
    handleTransfer() {
      this.transferDialog = true
    },
    handleQualitativeScoring() {
      this.qualitativeScoringDialog = true
    },
    handleReScoring() {
      this.reScoringDialog = true
    },
    handleView() {
      this.viewDialog = true
    },
    handleNotRated() {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      const status = this.checkNotRatedButtonStatus()
      status && (this.notRatedDialog = true)
    },
    checkNotRatedButtonStatus() {
      let flag = true
      this.selectTableData.some((item) => {
        if (['已完成', '无法评级'].includes(item.preliminaryStatus)) {
          flag = false
          return true
        }
      })
      !flag && iMessage.error(this.$t('SPR_FRM_CBPJ_SXZTYWQCXQZ'))
      return flag
    },
    async handleNotRatedSubmit(params) {
      try {
        this.notRatedDialogLoading = true
        const ids = this.selectTableData.map((item) => {
          return item.id
        })
        const req = {
          ids,
          preliminaryStatus: '4',
          ...params
        }
        const res = await updatePreliminaryStatus(req)
        this.resultMessage(res, () => {
          this.notRatedDialog = false
          this.getTableList()
        })
        this.notRatedDialogLoading = false
      } catch {
        this.notRatedDialogLoading = false
      }
    },
    async handleFinancialReportComparison() {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      if (this.selectTableData.length > 3) {
        return iMessage.warn(this.$t('SPR_FRM_CBPJ_CBBJTIPS'))
      }
      this.financialReportComparisonDialog = true
    },
    async handleValidOrInvalid(effectFlag) {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      if (
        this.selectTableData.find(
          (item) => item.effectFlag == effectFlag && effectFlag == '1'
        )
      ) {
        return iMessage.error(this.$t('SPR_FRM_FRMGL_INVALID'))
      }
      if (
        this.selectTableData.find(
          (item) => item.effectFlag == effectFlag && effectFlag == '0'
        )
      ) {
        return iMessage.error(this.$t('SPR_FRM_FRMGL_VALID'))
      }

      this.handleValidOrInvalidButtonLoading(effectFlag, true)
      const ids = this.selectTableData.map((item) => {
        return item.id
      })
      const req = {
        ids,
        effectFlag
      }
      const res = await updatePreliminaryStatus(req)
      this.resultMessage(res, () => {
        this.getTableList()
      })
      this.handleValidOrInvalidButtonLoading(effectFlag, false)
    },
    handleValidOrInvalidButtonLoading(val, boolean) {
      if (val === 1) {
        this.validButtonLoading = boolean
      } else if (val === 0) {
        this.invalidButtonLoading = boolean
      }
    },
    handleExport() {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(
          this.language(
            'QINGXUANZHEXUYAOCAOZUODEGONYSHANGDESHUJU',
            '请选择需要操作的供应商数据'
          )
        )
      }
      if (this.selectTableData.length > 1) {
        return iMessage.warn(this.$t('SPR_FRM_CBPJ_CPMBDCTIPS'))
      }
      if (!this.selectTableData[0].userModelId) {
        iMessage.error(
          this.language('DANGQIANMEIYOUCHUPINMOBAN', '当前没有初评模板')
        )
        return
      }
      downloadUdFile(this.selectTableData[0].userModelId)
      // excelExport(this.selectTableData, this.tableTitle);
    },
    handlePreliminaryRating() {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }

      var num = 0
      for (var i = 0; i < this.selectTableData.length; i++) {
        if (this.selectTableData[i].preliminaryStatus !== '中断') {
          num++
          break
        }
      }
      if (num !== 0) {
        iMessage.warn(this.$t('LK_ZYCBPJZTWZDDSHCNDJCAN'))
        return false
      }

      iMessageBox(
        this.$t('SPR_FRM_CBPJ_JXCPLC'),
        this.$t('SUPPLIER_CHUBUPINGJI1'),
        {
          confirmButtonText: this.$t('LK_QUEDING'),
          cancelButtonText: this.$t('LK_QUXIAO')
        }
      ).then(async () => {
        const ids = this.selectTableData.map((item) => {
          return item.id
        })
        const req = {
          ids
        }
        this.tableLoading = true
        const res = await initCommentRating(req)
        this.resultMessage(
          res,
          () => {
            this.getTableList()
          },
          () => {
            this.getTableList()
          }
        )
      })
    },
    handleOpenPage(row) {
      const { href } = this.$router.resolve({
        path: `/supplier/frmrating/preliminaryevaluationofsuppliers?id=${row.id}&supplierId=${row.supplierId}`
      })
      window.open(href)
    },
    handleIsAdditionWord(val) {
      if (val == 1) {
        return '有'
      } else if (val == 0) {
        return '无'
      } else {
        return val
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}
::v-deep .el-table__body-wrapper{
  overflow: auto;
}
</style>
