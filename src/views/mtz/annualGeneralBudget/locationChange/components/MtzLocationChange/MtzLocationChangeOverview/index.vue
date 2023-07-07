<!--
 * @Author: your name
 * @Date: 2021-10-25 17:43:45
 * @LastEditTime: 2021-10-26 19:36:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\index.vue
-->
<!-- MTZ变更分页页面 -->
<template>
  <div class="page-content">
    <theSearch ref="theSearch"></theSearch>
    <theTable class="margin-top20"
              ref="theTable"></theTable>
  </div>
</template>

<script>
import { iPage, iCard } from 'rise'
import theSearch from './components/theSearch'
import theTable from './components/theTable'
export default {
  name: '',
  components: {
    theSearch,
    theTable
  },
  data () {
    return {

    }
  },
  created () {
    console.log(this.$i18n.locale)
  },
  methods: {

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