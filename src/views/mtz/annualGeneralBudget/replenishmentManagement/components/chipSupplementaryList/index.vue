<!--
 * @Author: your name
 * @Date: 2021-10-06 21:19:28
 * @LastEditTime: 2023-01-31 13:40:18
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\chipSupplementaryList\index.vue
-->
<template>
  <div>
    <theSearch></theSearch>
    <theTable class="margin-top20"></theTable>
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
}
</script>

<style lang="scss"  scoped>
</style>
