<template>
  <iPage>
    <div class="margin-bottom20 clearFloat">
      <span class="font20 font-weight">
        {{ $t('SPR_FRM_CBPJ_CZJL') }}
      </span>
      <div class="floatright">
        <!--返回-->
        <iButton @click="handleBack">{{ $t('LK_FANHUI') }}</iButton>
        <!--导出-->
        <iButton @click="exportTable">{{ $t('LK_DAOCHU') }}</iButton>
      </div>
    </div>
    <iCard>
      <tableList
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
      />
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
  </iPage>
</template>

<script>
import {iPage, iButton, iMessage, iPagination, iCard} from 'rise';
import {excelExport} from '@/utils/filedowLoad';
import tableList from '@/components/commonTable';
import {pageMixins} from '@/utils/pageMixins';
import resultMessageMixin from '@/mixins/resultMessageMixin';
import {operationRecordTableTitle} from './data';
import {
  getRecordList,
} from '../../../../../api/frmRating/preliminaryRating/qualitativeScoringPage';
export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    iPage,
    iButton,
    tableList,
    iPagination,
    iCard,
  },
  data() {
    return {
      tableListData: [],
      tableTitle: operationRecordTableTitle,
      selectTableData: [],
      tableLoading: false,
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    handleBack() {
      this.$router.push({
        path: '/supplier/frmrating/preliminaryrating'
      });
    },
    exportTable() {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.$t('LK_QINGXUANZHEXUYAODAOCHUSHUJU'));
      }
      excelExport(this.selectTableData, this.tableTitle, '操作记录');
    },
    async getTableList() {
      this.tableLoading = true;
      try {
        const req = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          initialId: this.$route.query.id
        };
        const res = await getRecordList(req);
        if (res.result) {
          this.tableListData = res.data;
          this.page.currPage = res.pageNum;
          this.page.pageSize = res.pageSize;
          this.page.totalCount = res.total || 0;
        }
        this.tableLoading = false;
      } catch {
        this.tableListData = [];
        this.tableLoading = false;
      }
    },
  },
};
</script>

<style scoped>

</style>
