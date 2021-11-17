<!--
 * @Author: your name
 * @Date: 2021-10-26 15:55:24
 * @LastEditTime: 2021-11-17 16:55:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\newMtzlocationChange\index.vue
-->
<!--
 * @Author: your name
 * @Date: 2021-10-25 17:43:45
 * @LastEditTime: 2021-10-26 11:48:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\index.vue
-->
<!-- MTZ变更分页页面 -->
<template>
  <div>
    <div class="flex title margin-bottom20">
      <span class="titleText">{{language('MTZBIANGENG','MTZ变更')}}</span>
      <iButton @click="backBtn">{{language('FANHUI','返回')}}</iButton>
    </div>
    <theSearch ref="theSearch"></theSearch>
    <theTable ref="theTable"
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
    iButton
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
    }
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