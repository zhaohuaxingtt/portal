<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: caopeng
 * @Descripttion: your project
-->
<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <div class="floatright">
        <!-- 复制-->
        <iButton v-permission="SUPPLIER_FRMRATING_RISKSIGNAL_FUZHI" @click="handleView('copy')">{{ $t('SPR_FRM_FXXH_FZ') }}</iButton>
        <!-- 新建-->
        <iButton @click="handleView('creat')">{{ $t('SPR_FRM_FXXH_XJ') }}</iButton>
        <!-- 删除-->
        <iButton @click="handleDelete">{{ $t('LK_SHANCHU') }}</iButton>
      </div>
    </div>
    <tableList :openPageProps="'tsPpSupplierName'" @openPage="openPage" :openPageGetRowData="true" :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :index="true" @handleSelectionChange="handleSelectionChange">
      <template #content="scope">
        <span class="cursor openLinkText" @click="handleView('view',scope.row)">{{$t('LK_CHAKAN')}}</span>
      </template>
      <template #isBreak="scope">
        {{scope.row.isBreak == true ? '是' : '否'}}
      </template>
      <template #oldRiskSignalId="scope">
        <span v-if="scope.row.oldRiskSignalId" class="cursor openLinkText" @click="handleView('view',{id:scope.row.oldRiskSignalId})">{{$t('LK_CHAKAN')}}</span>
      </template>
      <template #furtherRatingResult="scope">
        <icon :name="scope.row.furtherRatingResult==='红'?'iconhongdeng':scope.row.furtherRatingResult==='绿'?'iconlvdeng':scope.row.furtherRatingResult==='黄'?'iconhuangdeng':''" symbol></icon>
      </template>
    </tableList>
    <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes" :page-size="page.pageSize" :layout="page.layout" :current-page='page.currPage' :total="page.totalCount" />
  </iCard>
</template>

<script>
import { iCard, iButton, iPagination, iMessage, icon } from 'rise';
import tableList from '@/components/commonTable';
import { tableTitle } from './data';
import { pageMixins } from '@/utils/pageMixins';
import resultMessageMixin from '@/mixins/resultMessageMixin';
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import { getRiskSignal, riskDelete } from "@/api/frmRating/riskSignal/riskSignal.js";

export default {
  mixins: [resultMessageMixin, pageMixins, generalPageMixins],
  components: {
    iCard,
    iButton,
    tableList,
    iPagination, icon
  },
  data() {
    return {
      tableListData: [],
      selectTableData: [],
      tableTitle,
      tableLoading: false,
    };
  },
  created() {
    this.getTableList()
  },
  methods: {
    async getTableList(reqParams) {
      this.tableLoading = true;
      try {
        const req = {
          pageNo: this.page.currPage,
          pageSize: this.page.pageSize,
          ...reqParams,
        };
        const res = await getRiskSignal(req);
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
    handleSelectionChange(e) {
      this.selectTableData = e
    },
    handleDelete() {
      var p = 1
      this.selectTableData.forEach((item) => {
        if (item.statusName) {
          iMessage.warn(this.$t('SPR_FRM_FXXH_YTJDFXXHSJBKSC'))
          p = 0
          return false
        }
      })
      p && this.deleteItem('idList', riskDelete)
    },
    openPage(row) {
      console.log(row);
      this.$router.push({ path: '/supplier/view-suppliers', query: { supplierToken: row.supplierToken, supplierType: 4 } })
    },
    handleView(flag, row) {
      if (flag === 'creat') {
        this.$router.push({ path: '/supplier/frmrating/riskSignal/details', query: { flag: flag } })
      } else if (flag === 'view') {
        this.$router.push({ path: '/supplier/frmrating/riskSignal/details', query: { id: row.id, flag: flag } })
      } else if (flag === 'copy') {
        if (this.selectTableData.length === 1) {
          if (this.selectTableData[0].status === 'MANAGEMENT') {
            this.$router.push({ path: '/supplier/frmrating/riskSignal/details', query: { id: this.selectTableData[0].id, flag: flag } })
          } else {
            iMessage.warn(this.$t('SPR_FRM_FXXH_ZTWYCZDFXXHCNDJFZ'))
          }
        } else if (this.selectTableData.length === 0) {
          iMessage.warn(this.$t('SPR_FRM_XGYSPJ_QXZYTSJTJ'))
        } else {
          iMessage.warn(this.$t('SPR_FRM_FXXH_FZFXXHJZCDXQCXGXNSXFZDFXXH'))
        }
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.openLinkText {
  color: $color-blue;
}
</style>
