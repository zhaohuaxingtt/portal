<!--
 * @Author: your name
 * @Date: 2021-10-25 17:43:45
 * @LastEditTime: 2021-12-02 16:17:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\index.vue
-->
<!-- MTZ变更分页页面 -->
<template>
  <div>
    <theSearch ref="theSearch" v-bind="$attrs" v-on="$listeners"></theSearch>
    <theTable
      ref="theTable"
      v-bind="$attrs"
      v-on="$listeners"
      :dateList="dateList"
      class="margin-top20"
    ></theTable>
  </div>
</template>

<script>
import theSearch from './components/theSearch'
import theTable from './components/theTable'
export default {
  name: '',
  components: {
    theSearch,
    theTable
  }
}
</script>

<style lang="scss" scoped>
.title {
  justify-content: space-between;
  .titleText {
    font-size: 20px;
    font-family: Arial;
    line-height: 23px;
  }
}
</style>