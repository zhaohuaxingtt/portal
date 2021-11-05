<!--
 * @Author: zbin
 * @Date: 2021-05-21 10:39:35
 * @Descripttion: your project
-->
<template>
  <tableList :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :selection='false' :index="true" @handleSelectionChange="handleSelectionChange">
    <template #value="scope">
      <span v-if="scope.row.index===14">{{scope.row.value+'|'+scope.row.value2}}</span>
      <span v-else>{{scope.row.value}}</span>
    </template>
  </tableList>
</template>

<script>
import { iCard, iButton } from 'rise';
import tableList from '@/components/commonTable';
import { pageMixins } from '@/utils/pageMixins';
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import { pkpiTitle1 } from './data';

export default {
  mixins: [pageMixins, generalPageMixins],
  components: {
    iCard,
    tableList,
    iButton,
  },
  props: ['scoreDTO'],
  watch: {
    scoreDTO(data) {
      this.tableListData = data
    }
  },
  data() {
    return {
      tableListData: [],
      tableTitle: pkpiTitle1,
      tableLoading: false,
    };
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
