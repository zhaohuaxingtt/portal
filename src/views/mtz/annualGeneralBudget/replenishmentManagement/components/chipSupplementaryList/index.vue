<!--
 * @Author: your name
 * @Date: 2021-10-06 21:19:28
 * @LastEditTime: 2023-03-03 16:58:09
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipSupplementaryList\index.vue
-->
<template>
  <div class="page-content">
    <theSearch ref="search"></theSearch>
    <theTable class="margin-top20" @getSearch="getSearch"></theTable>
  </div>
</template>
  
<script>
import { iPage } from 'rise'
import theSearch from './components/theSearch'
import theTable from './components/theTable'
export default {
  components: {
    iPage,
    theSearch,
    theTable
  },
  methods:{
    getSearch(callback){
      callback(
        this.$refs.search.searchForm
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.page-content{
  flex: 1;
  display: flex;
  flex-flow: column;
  overflow: hidden;
  min-height: 650px;
  ::v-deep .table-card {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-flow: column;
    .card-body-box {
      flex: 1;
      overflow: hidden;
      .cardBody {
        display: flex;
        flex-flow: column;
        overflow: hidden;
        .table-box {
          flex: 1;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
