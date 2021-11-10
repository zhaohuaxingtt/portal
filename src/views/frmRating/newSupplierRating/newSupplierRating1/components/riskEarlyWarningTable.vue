<!--
 * @Author: zbin
 * @Date: 2021-05-21 10:39:35
 * @Descripttion: your project
-->
<template>
  <iCard collapse :title="$t('SPR_FRM_XGYSPJ_GYSZRPGMX_FXYJ')">
    <tableList :tableData="tableListData" :tableTitle="riskEarlyWarningTitle" :tableLoading="tableLoading" :index="true" @handleSelectionChange="handleSelectionChange">
      <template #isWarning='scope'>
        <span class="required" v-if="scope.row.isWarning==='预警'">{{scope.row.isWarning}}</span>
        <span class="requiredNo" v-else>{{scope.row.isWarning}}</span>
      </template>
    </tableList>
  </iCard>
</template>

<script>
import { iCard } from 'rise';
import tableList from '@/components/commonTable';
import { pageMixins } from '@/utils/pageMixins';
import { riskEarlyWarningTitle } from './data';

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    tableList,
  },
  props: {
    riskDTO: {
      type: Array, default: () => {
        return []
      }
    }
  },
  watch: {
    riskDTO(data) {
      this.tableListData = data
    }
  },
  data() {
    return {
      tableListData: [],
      riskEarlyWarningTitle,
      tableLoading: false,
    };
  },
  methods: {
  },
};
</script>

<style scoped>
.required {
  color: #E30B0D;
}
.requiredNo{
  color: #1660F1;
}
</style>
