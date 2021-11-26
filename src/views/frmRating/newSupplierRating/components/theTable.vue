<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <!-- 新供应商评级-->
        <iButton @click="handleTask">{{ $t('SUPPLIER_XINGONGYINGSHANGPINGJI') }}</iButton>
      </div>
    </div>
    <tableList :openPageProps="'nameZh'"
               @openPage="openPage"
               :openPageGetRowData="true"
               :tableData="tableListData"
               :tableTitle="tableTitle"
               :tableLoading="tableLoading"
               :index="true"
               @handleSelectionChange="handleSelectionChange" />
    <iPagination v-update
                 @size-change="handleSizeChange($event, getTableList)"
                 @current-change="handleCurrentChange($event, getTableList)"
                 background
                 :page-sizes="page.pageSizes"
                 :page-size="page.pageSize"
                 :layout="page.layout"
                 :current-page='page.currPage'
                 :total="page.totalCount" />
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage } from 'rise';
import tableList from '@/components/commonTable';
import { tableTitle } from './data';
import { getNewSupplierRating } from "@/api/frmRating/newSupplierRating/newSupplierRating";
import { pageMixins } from '@/utils/pageMixins';
import resultMessageMixin from '@/mixins/resultMessageMixin';
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import { downloadFile } from '@/api/file'

export default {
  mixins: [resultMessageMixin, pageMixins, generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    iPagination,
  },
  data () {
    return {
      tableListData: [],
      selectTableData: [],
      tableTitle,
      tableLoading: false,
    };
  },
  created () {
    this.getTableList()
  },
  methods: {
    async getTableList (reqParams) {
      this.tableLoading = true;
      try {
        const req = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          ...reqParams,
        };
        const res = await getNewSupplierRating(req);
        if (res.result) {
          this.tableListData = res.data && res.data.list;
          this.page.currPage = res.data.current;
          this.page.pageSize = res.data.size;
          this.page.totalCount = res.data.total || 0;
        }
        this.tableLoading = false;
      } catch {
        this.tableListData = [];
        this.tableLoading = false;
      }
    },
    handleSelectionChange (e) {
      this.selectTableData = e
    },
    async handleExampleDownload (row) {
      const req = {
        applicationName: 'rise',
        fileList: [row.snapshotName],
      }
      await downloadFile(req)
    },
    handleTask () {
      if (this.selectTableData.length === 1) {
        if (this.selectTableData[0].ratingStatus === '草稿' || this.selectTableData[0].ratingStatus === '驳回') {
          this.$router.push({
            path: '/supplier/frmrating/newsupplierrating/rating1',
            query: this.selectTableData[0]
          })
        } else {
          this.handleExampleDownload(this.selectTableData[0])
        }
      } else if (this.selectTableData.length > 1) {
        iMessage.warn(this.$t('SPR_FRM_ZNXZYTSJ'));
      } else if (this.selectTableData.length < 1) {
        iMessage.warn(this.$t('SPR_FRM_XGYSPJ_QXZYTSJTJ'))
      }
    },
    openPage (row) {
      if (row.ratingStatus === '草稿' || row.ratingStatus === '驳回') {
        this.$router.push({
          path: '/supplier/frmrating/newsupplierrating/rating1',
          query: row
        })
      } else {
        this.handleExampleDownload(row)
      }
    }
  },
};
</script>

<style scoped>
</style>
