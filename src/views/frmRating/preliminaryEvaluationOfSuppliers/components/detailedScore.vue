<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">
        <!-- 得分详细-->
        {{ $t('SPR_FRM_CBPJ_DFQX') }}
      </span>
      <div class="floatright">
        <iButton @click="exportAll" :loading="exportAllButtonLoading">{{ $t('SUPPLIER_DAOCHUQUANBU') }}</iButton>
      </div>
    </div>
    <tableList
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :index="true"
        :selection="false"
    >
      <template #isFill="scope">
        {{ scope.row.isFill === 1 ? $t('SUPPLIER_SHI') : $t('SUPPLIER_FOU') }}
      </template>
      <template #isCautiousScore="scope">
        {{ scope.row.isCautiousScore === 1 ? $t('SUPPLIER_SHI') : $t('SUPPLIER_FOU') }}
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
  </iCard>
</template>

<script>
import {iCard, iButton, iPagination} from 'rise';
import tableList from '@/components/commonTable';
import {pageMixins} from '@/utils/pageMixins';
import resultMessageMixin from '@/mixins/resultMessageMixin';
import {detailedScoreTableTitle} from './data';
import {getResultDetail} from '../../../../api/frmRating/preliminaryEvaluationOfSuppliers';
import {excelExport} from '@/utils/filedowLoad';

export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iCard,
    iButton,
    tableList,
    iPagination,
  },
  data() {
    return {
      tableListData: [],
      tableTitle: detailedScoreTableTitle,
      tableLoading: false,
      selectTableData: [],
      allTableData: [],
      exportAllButtonLoading: false,
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    async getTableList() {
      this.tableLoading = true;
      try {
        const req = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          id: this.$route.query.id,
        };
        const res = await getResultDetail(req);
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
    async exportAll() {
      try {
        this.exportAllButtonLoading = true;
        const req = {
          pageNo: 1,
          pageSize: this.page.totalCount,
          id: this.$route.query.id,
        };
        const res = await getResultDetail(req);
        this.allTableData = res.data;
        excelExport(this.allTableData, this.tableTitle);
        this.exportAllButtonLoading = false;
      } catch {
        this.allTableData = [];
        excelExport(this.allTableData, this.tableTitle);
        this.exportAllButtonLoading = false;
      }
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
