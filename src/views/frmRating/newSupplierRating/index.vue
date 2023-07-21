<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: zbin
 * @LastEditTime: 2021-06-04 18:25:39
 * @Descripttion: your project
-->
<template>
  <iPage class="newSupplierRating">
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
      this.$refs.theTable.getReset();
      this.$refs.theTable.getTableList(req);
    },
  },
};
</script>

<style scoped lang="scss">
.newSupplierRating{
  position: relative;
  display: flex;
  flex-flow: column;
  height: 100%;
  ::v-deep .table-card {
    flex: 1;
    overflow: hidden;
    min-height: 400px;
    display: flex;
    flex-flow: column;
    .card-body-box {
      flex: 1;
      overflow: hidden;
      .cardBody {
        display: flex;
        flex-flow: column;
      }
      .table-box {
        flex: 1;
        display: flex;
        flex-flow: column;
        overflow: hidden;
        .i-table-custom{
          flex: 1;
          overflow: hidden;
        }
      }
    }
  }
}
::v-deep .nav>div{
  max-width: 170px!important;
}

::v-deep .nav>div:last-child{
  max-width: 180px!important;
  span{
    margin-right:0
  }
}
</style>
