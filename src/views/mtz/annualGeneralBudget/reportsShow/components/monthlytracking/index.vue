<template>
  <div>
    <div class='headerNav-sub'>
      <!-- <iTabsList type='card' v-model='tab' @tab-click='handleTabClick'>
        <el-tab-pane lazy v-for='(item,index) in monthlyTrackingNavList' :key='index' :label='language(item.key, item.name)'
                     :name='item.code'
        ></el-tab-pane>
      </iTabsList> -->
      <div class="mtz_ndys_nav">
        <div class="mtz_ndys_nav_all">
          <div v-for="(item,index) in monthlyTrackingNavList" :key="index" :class="mtzAnnualBudgetNumber===Number(item.code)?'active':''" @click="handleTabClick(item)" v-permission="item.permissionKey">{{language(item.key, item.name)}}</div>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { iTabsList } from 'rise'
import { monthlyTrackingNavList } from '@/views/mtz/annualGeneralBudget/reportsShow/config/config'
import store from "@/store";
export default {
  name: 'index',
  components: {
    iTabsList
  },
  data() {
    return {
      tab: '1',
      monthlyTrackingNavList,
    }
  },
  computed:{
    whiteBtnList() {
      return this.$store.state.permission.whiteBtnList
    },
    mtzAnnualBudgetNumber(){
      return this.$store.state.location.mtzAnnualBudgetNumber;
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    if(to.name == "monthlyBudgetTracking"){
      store.commit("mtzAnnualBudgetNav", 1);
    }else if(to.name == "causeAnalysisDifference"){
      console.log(11111111111)
      store.commit("mtzAnnualBudgetNav", 2);
    }else if(to.name == "monthlyTrackingPayment"){
      store.commit("mtzAnnualBudgetNav", 3);
    }else if(to.name == "modelMonthlyBudgetTracking"){
      store.commit("mtzAnnualBudgetNav", 4);
    }
    next()
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

    this.checkHasEnterMenu();
  },
  methods:{
    handleTabClick(tab) {
      if (Number(tab.code) !== this.tabsValue) {
        this.tabsValue = Number(tab.code);
        store.commit("mtzAnnualBudgetNav", Number(tab.code));
      }
      let item = this.monthlyTrackingNavList.find((item) => item.code == tab.code)
      if (item != null && item.path != this.$route.path) {
        this.$router.replace({
          path: item.path
        })
      }
    },
    checkHasEnterMenu() {
      const { path } = this.$route
      const menuList = [
        ...this.monthlyTrackingNavList,
      ]
      const menuItem = menuList.find((e) => e.path === path)
      if (menuItem) {
        const permissionKey = menuItem.permissionKey
        console.log(
          'this.whiteBtnList[permissionKey]',
          this.whiteBtnList[permissionKey]
        )
        // 入口url不在授权列表
        if (!this.whiteBtnList[permissionKey]) {
          let redirectUrl = ''
          for (let i = 0; i < menuList.length; i++) {
            const menu = menuList[i]
            if (this.whiteBtnList[menu.permissionKey]) {
              redirectUrl = menu.path
              store.commit("mtzAnnualBudgetNav", Number(menu.code));
              break
            }
          }
          console.log('redirectUrl', redirectUrl)
          if (redirectUrl) {
            this.$router.push({ path: redirectUrl })
          }
        }
      }
    },
    // handleTabClick(tab) {
    //   let item = monthlyTrackingNavList.find(item => item.code == tab.name)
    //   if (item != null) {
    //     this.$router.replace({
    //       path: item.path
    //     })
    //   }
    // }
  }
}
</script>

<style scoped lang="scss">
.mtz_ndys_nav{
  margin-top:20px;
  display: flex;
  margin-bottom:20px;
  font-size:1rem;
  font-weight: bold;
  color:#727272;
  // box-shadow: 0 0 1.25rem rgb(0 0 0 / 8%);
  border: none;
  text-align: center;
  min-width: 9.375rem;
  .mtz_ndys_nav_all{
    
  }
  .mtz_ndys_nav_all>div{
    cursor: pointer;
    min-width:140px;
    float:left;
    height: 2.5rem;
    box-sizing: border-box;
    line-height: 2.5rem;
    box-shadow: 0 0 1.25rem rgb(0 0 0 / 8%);
    padding-left:20px;
    padding-right:20px;
  }
  .mtz_ndys_nav_all>div:nth-child(1){
    border-top-left-radius: 0.625rem;
    border-bottom-left-radius: 0.625rem;
    border-right: solid 1px #ececec;
  }
  .mtz_ndys_nav_all>div:nth-child(3){
    border-left: solid 1px #ececec;
    border-top-right-radius: 0.625rem;
    border-bottom-right-radius: 0.625rem;
  }

  .active{
    background-color: #ffffff;
    background: #ffffff;
    color:#1660f1;
  }
}
</style>