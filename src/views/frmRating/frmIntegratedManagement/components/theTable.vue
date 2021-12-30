<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <!--VWAG评级-->
        <iButton @click="openVwagRatingDialog">{{ $t('SPR_FRM_FRMGL_VWAGPJ') }}</iButton>
        <!--导出财报-->
        <iButton @click="openExportFinancialReportDialog">{{ $t('SPR_FRM_FRMGL_DCCB') }}</iButton>
        <!--导出统计报表-->
        <!--        <iButton>{{ $t('SPR_FRM_FRMGL_DCTJBB') }}</iButton>-->
        <!--深入评级-->
        <iButton @click="openInDepthRatingDialog">{{ $t('SUPPLIER_SHENRUPINGJI') }}</iButton>
      </div>
    </div>
    <tableList :tableData="tableListData"
               :tableTitle="tableTitle"
               :tableLoading="tableLoading"
               :index="true"
               @handleSelectionChange="handleSelectionChange">
      <template #isActive='scope'>
        {{ SUPPLIER_STATUS[scope.row.isActive] }}
      </template>
      <template #deepCommentResult="scope">
        <icon v-if="scope.row.deepCommentResult == 'GREEN'"
              symbol
              name="iconlvdeng"></icon>
        <icon v-else-if="scope.row.deepCommentResult == 'YELLOW'"
              symbol
              name="iconhuangdeng"></icon>
        <icon v-else-if="scope.row.deepCommentResult == 'RED'"
              symbol
              name="iconhongdeng"></icon>
      </template>
    </tableList>
    <iPagination v-update
                 @size-change="handleSizeChange($event, getTableList)"
                 @current-change="handleCurrentChange($event, getTableList)"
                 background
                 :page-sizes="page.pageSizes"
                 :page-size="page.pageSize"
                 :layout="page.layout"
                 :current-page='page.currPage'
                 :total="page.totalCount" />

    <!--深入评级-->
    <inDepthRatingDialog v-model="inDepthRatingDialog"
                         :loading="inDepthRatingDialogLoading"
                         @handleSubmit="handleInDepthRatingSubmit" />
    <!--VWAG评级-->
    <vwagRatingDialog v-model="vwagRatingDialog"
                      @handleSubmit="handleVwagSubmit" />
    <!--导出财报-->
    <exportFinancialReportDialog v-model="exportFinancialReportDialog"
                                 @handleSubmit="handleFinancialReport"
                                 :loading="exportFinancialReportDialogLoading" />
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage, icon } from 'rise';
import tableList from '@/components/commonTable';
import { pageMixins } from '@/utils/pageMixins';
import resultMessageMixin from '@/mixins/resultMessageMixin';
import { tableTitle } from './data';
import inDepthRatingDialog from '../components/inDepthRatingDialog';
import vwagRatingDialog from '../components/vwagRatingDialog';
import exportFinancialReportDialog from '../components/exportFinancialReportDialog';
import {
  getFrmList,
  updateDeepCommentReason,
  exportFinanceReport,
  saveVwag,
} from '../../../../api/frmRating/frmIntegratedManagement';
import { SUPPLIER_STATUS } from '../../../../constants/frmRating/preliminaryRating';

export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iCard,
    iButton,
    tableList,
    iPagination,
    inDepthRatingDialog,
    vwagRatingDialog,
    exportFinancialReportDialog,
    icon
  },
  data () {
    return {
      tableListData: [],
      tableTitle,
      tableLoading: false,
      selectTableData: [],
      inDepthRatingDialog: false,
      vwagRatingDialog: false,
      inDepthRatingDialogLoading: false,
      exportFinancialReportDialog: false,
      exportFinancialReportDialogLoading: false,
      SUPPLIER_STATUS
    };
  },
  created () {
    this.getTableList();
  },
  methods: {
    handleSelectionChange (val) {
      this.selectTableData = val;
    },
    handleSearch () {
      this.page.currPage = 1
      this.getTableList()
    },
    async getTableList () {
      this.tableLoading = true;
      const searchItem = this.$parent.$children.filter(item => {
        return item.$attrs.name === 'theSearch';
      });
      const searchForm = searchItem[0].form;
      try {
        const req = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          ...searchForm,
        };
        const res = await getFrmList(req);
        if (res.result) {
          this.tableListData = res.data;
          this.page.currPage = res.pageNum;
          this.page.pageSize = res.pageSize;
          this.page.totalCount = res.total || 0;
        } else {
          this.resultMessage(res);
          this.tableListData = [];
        }
        this.tableLoading = false;
      } catch {
        this.tableListData = [];
        this.tableLoading = false;
      }
    },
    openInDepthRatingDialog () {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'));
      }
      if (this.selectTableData.length > 1) {
        return iMessage.warn(this.$t('SPR_FRM_ZNXZYTSJ'));
      }
      this.inDepthRatingDialog = true;
    },
    openVwagRatingDialog () {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'));
      }
      if (this.selectTableData.length > 1) {
        return iMessage.warn(this.$t('SPR_FRM_ZNXZYTSJ'));
      }
      this.vwagRatingDialog = true;
    },
    async handleInDepthRatingSubmit (reqQuery) {
      try {
        const idArray = this.selectTableData.map(item => {
          return item.supplierId;
        });
        const supplierId = idArray[0];
        this.inDepthRatingDialogLoading = true;
        const req = {
          supplierId,
          ...reqQuery,
        };
        const res = await updateDeepCommentReason(req);
        this.inDepthRatingDialogLoading = false;
        this.resultMessage(res, () => {
          this.inDepthRatingDialog = false;
          this.getTableList();
        });
      } catch {
        this.inDepthRatingDialogLoading = false;
      }
    },
    openExportFinancialReportDialog () {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZE'));
      }
      if (this.selectTableData.length > 1) {
        return iMessage.warn(this.$t('SPR_FRM_ZNXZYTSJ'));
      }
      this.exportFinancialReportDialog = true;
    },
    async handleFinancialReport (params) {
      try {
        this.exportFinancialReportDialogLoading = true;
        const supplierId = this.selectTableData.map(item => {
          return item.supplierId;
        });
        const req = {
          supplierId: supplierId[0],
          yearList: params,
        };
        await exportFinanceReport(req);
        this.exportFinancialReportDialog = false;
        this.exportFinancialReportDialogLoading = false;
      } catch {
        this.exportFinancialReportDialogLoading = false;
      }
    },
    async handleVwagSubmit (params) {
      const supplierId = this.selectTableData.map(item => {
        return item.supplierId;
      });
      const req = {
        supplierId: supplierId[0],
        ...params,
      };
      const res = await saveVwag(req);
      this.resultMessage(res, () => {
        this.vwagRatingDialog = false;
        this.getTableList();
      });
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
