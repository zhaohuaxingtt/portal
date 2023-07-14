<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: zbin
 * @LastEditTime: 2021-08-02 14:49:46
 * @Descripttion: 风险信号
-->
<template>
  <iPage class="riskSignal">
    <iNavMvp :list="tabRouterList" class="margin-bottom20" routerPage :lev="1" />
    <theSearch @getTableList="getTableList" class="margin-bottom20"></theSearch>
    <theTable :form="form" ref="theTable"></theTable>
  </iPage>
</template>

<script>
import { iPage, iNavMvp } from 'rise';
import { tabRouterList } from '../data';
import theSearch from "./components/theSearch.vue";
import theTable from "./components/theTable.vue";
export default {
  components: {
    iPage,
    iNavMvp,
    theSearch,
    theTable,
  },
  data() {
    return {
      tabRouterList,
      form:{}
    };
  },
  methods: {
    async getTableList(req) {
      this.form=req
      console.log(req)
      this.$nextTick(() => {
        this.$refs.theTable.search()
      })
    }
  },
};
</script>

<style scoped>

</style>

<style lang="scss" scoped>
.riskSignal{
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