<!--
 * @Author: your name
 * @Date: 2021-10-25 17:43:45
 * @LastEditTime: 2021-11-18 15:17:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\index.vue
-->
<!-- MTZ变更分页页面 -->
<template>
  <div>
    <theSearch ref="theSearch"
               v-bind="$attrs"
               v-on="$listeners"></theSearch>
    <theTable ref="theTable"
              v-bind="$attrs"
              v-on="$listeners"
              class="margin-top20"></theTable>
  </div>
</template>

<script>
import { iButton } from 'rise'
import theSearch from './components/theSearch'
import theTable from './components/theTable'
export default {
  name: '',
  components: {
    theSearch,
    theTable,
  },
  data () {
    return {

    }
  },
  created () {

  },
  methods: {
    backBtn () {
      this.$router.go(-1)
    },
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