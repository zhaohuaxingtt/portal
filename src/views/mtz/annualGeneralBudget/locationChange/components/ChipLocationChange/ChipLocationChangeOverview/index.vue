<!--
 * @Author: your name
 * @Date: 2021-10-25 17:43:45
 * @LastEditTime: 2021-10-26 19:36:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\index.vue
-->
<!-- 芯片变更分页页面 -->
<template>
  <div class="page-content">
    <theSearch ref="theSearch" :statusList="statusList"></theSearch>
    <theTable
      class="margin-top20"
      ref="theTable"
      :statusList="statusList"
    ></theTable>
  </div>
</template>

<script>
import theSearch from './components/theSearch'
import theTable from './components/theTable'
import { getLocationApplyStatus } from '@/api/mtz/annualGeneralBudget/chipChange'
export default {
  name: '',
  components: {
    theSearch,
    theTable
  },
  data() {
    return {
      statusList: []
    }
  },
  created() {
    console.log(this.$i18n.locale)
    this.getLocationApplyStatus()
  },
  methods: {
    //申请状态下拉
    getLocationApplyStatus() {
      getLocationApplyStatus({ keyWords: '' }).then((res) => {
        if (res && res.code === '200') {
          this.statusList = res.data.map((item) => ({
            value: item.code,
            label: item.message,
            labelEn: item.code
          }))
        } else {
          iMessage.error(res.desZh)
        }
      })
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