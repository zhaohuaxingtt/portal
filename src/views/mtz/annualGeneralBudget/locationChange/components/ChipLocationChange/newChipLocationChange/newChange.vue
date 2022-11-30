<!--
 * @Author: your name
 * @Date: 2021-10-25 17:43:45
 * @LastEditTime: 2022-11-30 22:31:21
 * @LastEditors: 余继鹏 917955345@qq.com
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