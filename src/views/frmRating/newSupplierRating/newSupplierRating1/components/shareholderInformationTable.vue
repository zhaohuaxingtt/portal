<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 11:33:33
 * @LastEditors: zbin
 * @LastEditTime: 2021-05-28 16:12:39
 * @Descripttion: your project
-->
<template>
  <iCard collapse :title="$t('SPR_FRM_XGYSPJ_GDXX')">
    <tableList :tableData="tableListData" :tableTitle="shareholderInformationTitle" :tableLoading="tableLoading" :index="true" @handleSelectionChange="handleSelectionChange" />
  </iCard>
</template>

<script>
import { iCard } from 'rise';
import tableList from '@/components/commonTable';
import { shareholderInformationTitle } from './data';
import { pageMixins } from '@/utils/pageMixins';
import resultMessageMixin from '@/mixins/resultMessageMixin';
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import { getInvestorList } from "@/api/frmRating/newSupplierRating/newSupplierRating";

export default {
  mixins: [resultMessageMixin, pageMixins, generalPageMixins],
  components: {
    iCard,
    tableList,
  },
  data() {
    return {
      tableListData: [],
      selectTableData: [],
      shareholderInformationTitle,
      tableLoading: false,
    };
  },
  created() {
    this.getTableList()
  },
  mounted(){
  },
  methods: {
    async getTableList() {
      this.tableLoading = true;
      try {
        const req = {
          ratingSupplierId: this.$route.query.supplierId
        };
        const res = await getInvestorList(req);
        if (res.result) {
          this.tableListData = res.data && res.data.list;
          this.page.currPage = res.data.pageNum;
          this.page.pageSize = res.data.pageSize;
          this.page.totalCount = res.data.total || 0;
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
