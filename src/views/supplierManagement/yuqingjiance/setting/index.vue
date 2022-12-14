<template>
    <iPage>
        <headerNav/>
        <div class="mtz_ndys_nav">
          <div class="mtz_ndys_nav_all">
            <div :class="tabsValue==1?'active':''" v-permission="PORTAL_SUPPLIER_NAV_YUQINGJIANCE_SETTING_WOGUANZHU"
                 @click="tableChange(1)"
                 >{{$t("我关注的供应商")}}</div>
            <div :class="tabsValue==2?'active':''" v-permission="PORTAL_SUPPLIER_NAV_YUQINGJIANCE_SETTING_YUQINGLAQUFANWEI"
                 @click="tableChange(2)"
                 >{{$t("舆情拉取范围设置")}}</div>
            <div :class="tabsValue==3?'active':''" v-permission="PORTAL_SUPPLIER_NAV_YUQINGJIANCE_SETTING_YUQINGSUPPLIERSET"
                 @click="tableChange(3)"
                 >{{$t("舆情供应商设置")}}</div>
          </div>
        </div>
        <div v-if="tabsValue == 1">
            <careSupplier />
        </div>
        <div v-if="tabsValue == 2">
            <rangeSetting />
        </div>
        <div v-if="tabsValue == 3">
            <supplierSetting />
        </div>
    </iPage>
</template>
  
<script>
import { iPage } from "rise"
import headerNav from "../components/headerNav"
import careSupplier from "./com/careSupplier"
import rangeSetting from "./com/rangeSetting"
import supplierSetting from "./com/supplierSetting"

export default {
    data(){
        return{
            tabsValue:1,
        }
    },
    created(){
        
    },
    components:{
        headerNav,
        iPage,
        careSupplier,
        rangeSetting,
        supplierSetting,
    },
    mounted () {
        this.$nextTick(_ => {
            if(this.$route.query.page){
                this.tabsValue = Number(this.$route.query.page)
            }else{
                var navList = document.querySelectorAll(".mtz_ndys_nav_all>div");
                if (navList.length !== 0) {
                    navList[0].click();
                }
            }
            
        })
    },
    methods:{
        tableChange (val) {
            if (val !== this.tabsValue) {
                this.tabsValue = val;
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.mtz_ndys_nav {
  margin-top: 20px;
  display: flex;
  margin-bottom: 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #727272;
  // box-shadow: 0 0 1.25rem rgb(0 0 0 / 8%);
  border: none;
  text-align: center;
  min-width: 9.375rem;
  .mtz_ndys_nav_all {
  }
  .mtz_ndys_nav_all > div {
    cursor: pointer;
    min-width: 140px;
    float: left;
    height: 2.5rem;
    box-sizing: border-box;
    line-height: 2.5rem;
    box-shadow: 0 0 1.25rem rgb(0 0 0 / 8%);
    padding-left: 20px;
    padding-right: 20px;
  }
  .mtz_ndys_nav_all > div:nth-child(1) {
    border-top-left-radius: 0.625rem;
    border-bottom-left-radius: 0.625rem;
    border-right: solid 1px #ececec;
  }
  .mtz_ndys_nav_all > div:nth-child(3) {
    border-left: solid 1px #ececec;
    border-top-right-radius: 0.625rem;
    border-bottom-right-radius: 0.625rem;
  }

  .active {
    background-color: #ffffff;
    background: #ffffff;
    color: #1660f1;
  }
}
</style>