<template>
  <!--历史初评-->
  <iDialog
      :title="$t('SPR_FRM_CBPJ_LSCP')"
      :visible.sync="value"
      width="90%"
      @close="clearDiolog"
  >
    <div class="content">
      <tableList
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :index="true"
          :selection="false"
          :customOpenPageWord="$t('LK_CHAKAN')"
          openPageProps="view"
          @openPage="handleOpenPage"
          :openPageGetRowData="true"
      >
        <template #effectFlag="scope">
          {{ scope.row.effectFlag === 1 ? $t('SUPPLIER_SHI') : $t('SUPPLIER_FOU') }}
        </template>
      </tableList>
      <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page='page.currPage'
          :total="page.totalCount"/>
    </div>
  </iDialog>
</template>

<script>
import {iDialog, iPagination} from 'rise';
import tableList from '@/components/commonTable';
import {pageMixins} from '@/utils/pageMixins';
import {initialCommentOnHistoryTableTitle} from './data';
import {getInitCommentList} from '../../../../api/frmRating/preliminaryRating/preliminaryRatingPage';

export default {
  mixins: [pageMixins],
  components: {
    iDialog,
    iPagination,
    tableList,
  },
  props: {
    value: {type: Boolean},
    loading: {type: Boolean, default: false},
    supplierId: {type: String, default: ''},
  },
  data() {
    return {
      tableListData: [],
      tableTitle: initialCommentOnHistoryTableTitle,
      tableLoading: false,
    };
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false);
    },
    async getTableList() {
      this.tableLoading = true;
      this.tableListData = []
      try {
        const req = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          supplierId: this.supplierId,
          isHistory:1
        };
        const res = await getInitCommentList(req);
        this.tableListData = res.data;
        this.page.currPage = res.pageNum;
        this.page.pageSize = res.pageSize;
        this.page.totalCount = res.total || 0;
        this.tableLoading = false;
      } catch {
        this.tableListData = [];
        this.tableLoading = false;
      }
    },
    handleOpenPage(row) {
      const {href} = this.$router.resolve({
        path: `/supplier/frmrating/preliminaryevaluationofsuppliers?id=${row.id}`,
      });
      window.open(href);
    },
  },
  watch: {
    value(val) {
      val && this.getTableList();
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  padding-bottom: 20px;
}

::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}
</style>
