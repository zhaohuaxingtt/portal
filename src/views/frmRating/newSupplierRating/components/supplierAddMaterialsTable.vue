<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iCard :title="$t('SPR_FRM_XGYSPJ_GYSJYJRDCLZ')">
    <tableList :tableData="tableListData" :tableTitle="supplierAddMaterialsTableTitle" :selection="false" :tableLoading="tableLoading" :index="true" @handleSelectionChange="handleSelectionChange" />
  </iCard>
</template>

<script>
import { iCard, iButton } from 'rise';
import tableList from '@/components/commonTable';
import { pageMixins } from '@/utils/pageMixins';
import { supplierAddMaterialsTableTitle } from './data';
import { getApprove } from "@/api/frmRating/newSupplierRating/newSupplierRating.js";
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    tableList,
  },
  data() {
    return {
      tableListData: [],
      supplierAddMaterialsTableTitle,
      tableLoading: false,
    };
  },
  created() {
    this.getTableList()
  },
  methods: {
    async getTableList() {
      const res = await getApprove({ ratingId: this.$route.query.ratingId })
      if (res.result) {
        this.tableListData = [res.data]
      }
    },
  },
};
</script>

<style scoped>
</style>
