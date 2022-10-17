<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 11:33:33
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-08 12:28:19
 * @Descripttion: your project
-->
<template>
  <iCard collapse
         :title="$t('SPR_FRM_XGYSPJ_GDXX')">
    <p style="color:red;margin-bottom:10px;">{{$t("ZYGDCGSGJLSZQS")}}</p>
    <tableList :tableData="tableListData"
               :tableTitle="shareholderInformationTitle"
               :tableLoading="tableLoading"
               :index="true"
               @handleSelectionChange="handleSelectionChange">
      <template v-slot:currency="scope">
        <span>{{currency(scope.row.currency)}}</span>
      </template>
    </tableList>
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
import { getDictByCode } from '@/api/dictionary'

export default {
  mixins: [resultMessageMixin, pageMixins, generalPageMixins],
  components: {
    iCard,
    tableList,
  },
  data () {
    return {
      tableListData: [],
      selectTableData: [],
      shareholderInformationTitle,
      tableLoading: false,
      currencyList: []
    };
  },
  created () {
    this.getDictByCode()
    this.getTableList()
  },
  mounted () {
  },
  computed: {
    currency () {
      return function (data) {
        this.currencyList.forEach(item => {
          if (item.code === data) {
            return item.name
          }
        })
      }
    }
  },
  methods: {
    async getDictByCode () {
      let res = await getDictByCode('PP_CSTMGMT_CURRENCY')
      this.currencyList = res.data[0].subDictResultVo
    },
    async getTableList () {
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
