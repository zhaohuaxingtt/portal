<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: zbin
 * @LastEditTime: 2021-06-04 18:25:39
 * @Descripttion: your project
-->
<template>
  <iPage>
    <iNavMvp :list="tabRouterList" class="margin-bottom20" routerPage :lev="1" />
    <theSearch @getTableList="getTableList" class="margin-bottom20" />
    <theTable ref="theTable" />
  </iPage>
</template>

<script>
import { iPage, iNavMvp } from 'rise';
import theTable from "./components/theTable";
import { tabRouterList } from '../data';
import theSearch from './components/theSearch';

export default {
  components: {
    iPage,
    iNavMvp,
    theSearch,
    theTable
  },
  data() {
    return {
      tabRouterList,
    };
  },
  created(){
    console.log(24578);
  },
  methods: {
    getTableList(req) {
      this.$refs.theTable.getTableList(req);
    },
  },
};
</script>

<style scoped>
</style>
