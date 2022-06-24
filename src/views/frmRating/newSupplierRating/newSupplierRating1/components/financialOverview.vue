<!--
 * @Author: zbin
 * @Date: 2021-05-21 10:39:35
 * @Descripttion: your project
-->
<template>
  <iCard collapse :title="$t('SPR_FRM_XGYSPJ_GYSZRPGMO_CWXX')">
    <tableList :tableData="tableListData"
                :tableTitle="financialOverviewTitle"
                :tableLoading="tableLoading"
                :index="true"
                @handleSelectionChange="handleSelectionChange">
      <template #firstValue="scope">
        <span>{{scope.row.firstValue?Number(scope.row.firstValue).toFixed(2):""}}</span>
      </template>
      <template #secondValue="scope">
        <span>{{scope.row.secondValue?Number(scope.row.secondValue).toFixed(2):""}}</span>
      </template>
      <template #thirdValue="scope">
        <span>{{scope.row.thirdValue?Number(scope.row.thirdValue).toFixed(2):""}}</span>
      </template>
    </tableList>
  </iCard>
</template>

<script>
import { iCard } from 'rise';
import tableList from '@/components/commonTable';
import { pageMixins } from '@/utils/pageMixins';
import { financialOverviewTitle } from './data';

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    tableList,
  },
  props: {
    financeDTO: {
      type: Array, default: () => {
        return []
      }
    }
  },
  data() {
    return {
      tableListData: [],
      financialOverviewTitle,
      tableLoading: false,
    };
  },
  watch: {
    financeDTO(data) {
      this.tableListData = data
    }
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
