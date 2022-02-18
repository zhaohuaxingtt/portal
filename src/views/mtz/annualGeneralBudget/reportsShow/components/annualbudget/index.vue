<!--
 * @Author: YoHo
 * @Date: 2021-12-24 15:14:51
 * @LastEditTime: 2021-12-27 17:24:32
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <div>
    <div class="headerNav-sub">
      <!-- <iTabsList type="card" v-model="tab" @tab-click="handleTabClick">
        <el-tab-pane
          lazy
          v-for="(item, index) in subNavList"
          :key="index"
          :label="language(item.key, item.name)"
          :name="item.code"
        ></el-tab-pane>
      </iTabsList> -->

      <div class="mtz_ndys_nav">
        <div class="mtz_ndys_nav_all">
          <div v-for="(item,index) in subNavList" :key="index" :class="mtzAnnualBudgetNumber===Number(item.code)?'active':''" @click="handleTabClick(item)" v-permission="item.permissionKey">{{language(item.key, item.name)}}</div>
        </div>
      </div>
      
      <iButton v-if="showBtn" class="export" @click="exportReport" v-permission='MTZ_REPORT_ANNUAL_BUDGET_EXPORT'
        >导出</iButton
      >
      <!-- 品牌导出 -->
      <iButton v-show="showPinpai" class="export" @click="exportReportPP" v-permission='MTZ_REPORT_ANNUAL_BUDGET_EXPORT'>导出</iButton>

      <div class="export" v-show="showCar" style="display:flex;">
        <show-me-components class='margin-right30' @showOnlyMyselfData='leftShowOnlyMyselfData' />
        <iButton @click="exportReportCAR" v-permission='MTZ_REPORT_ANNUAL_BUDGET_EXPORT'>导出</iButton>
      </div>
    </div>
    <router-view ref="child"></router-view>
  </div>
</template>

<script>
import { iTabsList, iButton } from 'rise'
import { subNavListOne,subNavListtwo } from '@/views/mtz/annualGeneralBudget/reportsShow/config/config'
import ShowMeComponents from '@/views/mtz/annualGeneralBudget/reportsShow/components/comm/ShowMeComponents'

import store from "@/store";
export default {
  name: 'index',
  components: {
    iTabsList,
    iButton,
    ShowMeComponents
  },
  data() {
    return {
      tab: '1',
      subNavList:[],
      showBtn: false,
      showPinpai:false,
      showCar:false,
      // tabsValue:1
    }
  },
  computed:{
    mtzAnnualBudgetNumber(){
      // console.log(this.$store.state.location.mtzAnnualBudgetNumber)
      return this.$store.state.location.mtzAnnualBudgetNumber;
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    if(to.name == "materialGroup"){
      store.commit("mtzAnnualBudgetNav", 1);
    }else if(to.name == "classMaterial"){
      store.commit("mtzAnnualBudgetNav", 2);
    }else if(to.name == "department"){
      store.commit("mtzAnnualBudgetNav", 3);
    }else if(to.name == "brand"){
      store.commit("mtzAnnualBudgetNav", 4);
    }else if(to.name == "model"){
      store.commit("mtzAnnualBudgetNav", 5);
    }
    next()
  },
  created() {
    // if(this.$store.state.permission.userInfo.deptDTO.level=='K2' || this.$store.state.permission.userInfo.deptDTO.level=='K3'){
      // this.subNavList=subNavListtwo
    // }else{
      this.subNavList=subNavListOne
    // }


    if (this.$route.name == 'materialGroup') {
      this.tab = '1'
    }
    if (this.$route.name == 'classMaterial') {
      this.tab = '2'
    }
    if (this.$route.name == 'department') {
      this.tab = '3'
    }
    if (this.$route.name == 'brand') {
      this.tab = '4'
      this.showPinpai = true;
    }
    if (this.$route.name == 'model') {
      this.tab = '5'
      this.showCar = true;
    }
  },
  mounted() {
    this.show()
    var navList = document.querySelectorAll(".mtz_ndys_nav_all>div");
    var number = 0;
    navList.forEach(e=>{
      if(e.innerText == store.state.location.nowSetToPath.meta.title){
        number++;
        e.click();
      }
    })
    if(number == 0){
      navList[0].click();
    }
  },
  methods: {
    show() {
      this.showBtn =
        typeof this.$refs.child?.exportReport == 'function' || false
    },
    handleTabClick(tab) {
      if (Number(tab.code) !== this.tabsValue) {
        this.tabsValue = Number(tab.code);
        store.commit("mtzAnnualBudgetNav", Number(tab.code));
      }
      let item = this.subNavList.find((item) => item.code == tab.code)
      if (item != null && item.path != this.$route.path) {
        this.$router.replace({
          path: item.path
        })
      }
    },
    exportReport() {
      if (typeof this.$refs.child.exportReport == 'function') {
        this.$refs.child.exportReport()
      }
    },
    exportReportPP(){
      this.$refs.child.Upload();
    },
    exportReportCAR(){
      this.$refs.child.Upload();
    },
    leftShowOnlyMyselfData(val){
      this.$refs.child.leftShowOnlyMyselfData(val);
      this.$refs.child.rightShowOnlyMysel(val);
    },
  }
}
</script>

<style lang="scss" scoped>
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


.headerNav-sub {
  position: relative;
  .export {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>