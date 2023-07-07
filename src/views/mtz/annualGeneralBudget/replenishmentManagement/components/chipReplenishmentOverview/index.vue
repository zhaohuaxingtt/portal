<!--
 * @Author: your name
 * @Date: 2021-10-06 21:19:28
 * @LastEditTime: 2023-01-13 16:06:54
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipReplenishmentOverview\index.vue
-->
<template>
  <div class="page-content">
    <search class="margin-bottom20" ref="searchBox"></search>
    <theTable ref="theTable"></theTable>
  </div>
</template>

<script>
import search from './components/search'
import theTable from './components/theTable'

export default {
  componentName: 'Index',
  components: {
    search,
    theTable,
  }
}
</script>

<style lang="scss" scoped>
.page-content{
  flex: 1;
  display: flex;
  flex-flow: column;
  overflow: hidden;
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
