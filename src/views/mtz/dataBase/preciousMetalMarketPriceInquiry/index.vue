<!--
 * @Author: your name
 * @Date: 2021-09-01 17:43:06
 * @LastEditTime: 2021-09-28 17:29:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\dataBase\preciousMetalMarketPriceInquiry\index.vue
-->
<template>
  <div class="margin-top25 page-content">
    <theTableSearch
        :tableSearchProps="tableSearchProps"
        @getTableList="getTableList"
        @handleSearchReset="handleSearchReset"
        name="theSearch"
    />
    <theTable class="margin-top20" ref="theTable"/>
  </div>
</template>

<script>
import {tableSearchProps} from './components/data';
import theTableSearch from '@/components/theTableSearch/index';
import theTable from './components/theTable';

export default {
  components: {
    theTableSearch,
    theTable,
  },
  data() {
    return {
      tableSearchProps,
    };
  },
  methods: {
    handleSearchReset() {
      this.$refs.theTable.page.currPage = 1
      this.$refs.theTable.page.pageSize = 10
    },
    getTableList() {
      this.$refs.theTable.page.currPage = 1
      this.$refs.theTable.getTableList();
    },
  },
};
</script>

<style scoped>

</style>
