<template>
  <div>
    <div class='headerNav-sub'>
      <iTabsList type='card' v-model='tab' @tab-click='handleTabClick'>
        <el-tab-pane lazy v-for='(item,index) in monthlyTrackingNavList' :key='index' :label='language(item.key, item.name)'
                     :name='item.code'
        ></el-tab-pane>
      </iTabsList>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { iTabsList } from 'rise'
import { monthlyTrackingNavList } from '@/views/mtz/annualGeneralBudget/reportsShow/config/config'
export default {
  name: 'index',
  components: {
    iTabsList
  },
  data() {
    return {
      tab: '1',
      monthlyTrackingNavList
    }
  },
  created() {
    if (this.$route.name == 'monthlyBudgetTracking') {
      this.tab = '1'
    }
    if (this.$route.name == 'causeAnalysisDifference') {
      this.tab = '2'
    }

    if (this.$route.name == 'monthlyTrackingPayment') {
      this.tab = '3'
    }
    if (this.$route.name == 'modelMonthlyBudgetTracking') {
      this.tab = '4'
    }

  },
  methods:{
    handleTabClick(tab) {
      let item = monthlyTrackingNavList.find(item => item.code == tab.name)
      if (item != null) {
        this.$router.replace({
          path: item.path
        })
      }

    }
  }
}
</script>

<style scoped>

</style>