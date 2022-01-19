<template>
  <i-card v-permission.auto='MTZ_REPORT_DISPLAY_ANNUAL_BUDGET_BRAND_PAGE|年度预算品牌页面'>
    <div class="title-box">
      <div class="left-box">
        <span>{{this.queryForm.year}}年总金额:{{this.curYearPrice|format}}人民币</span>
        <span class="span-1">{{this.queryForm.year-1}}年总⾦额：{{this.lastYearPrice|format}}⼈⺠币</span>
      </div>
      <div class="right-box">
        <show-me-components :is-only-myself='queryForm.onlySeeMySelf' @showOnlyMyselfData='showOnlyMyselfData' />
        <year-change-components class="margin-left20" @changeYear='changeYear' />
      </div>
    </div>
    <i-table-custom
      :loading='loading'
      class="margin-top20"
      :columns="brandMTZTitle"
      :data="brandMTZList"
    ></i-table-custom>
  </i-card>
</template>

<script>
import { iCard } from 'rise'
import ShowMeComponents from '@/views/mtz/annualGeneralBudget/reportsShow/components/comm/ShowMeComponents'
import YearChangeComponents from '@/views/mtz/annualGeneralBudget/reportsShow/components/comm/YearChangeComponents'
import iTableCustom from '@/components/iTableCustom'
import { yearBrand } from '@/api/mtz/reportsShow'
export default {
  name: 'index',
  components: {
    iTableCustom,
    YearChangeComponents,
    ShowMeComponents,
    iCard
  },
  computed: {

  },
  created() {
    this.changeTableTile()
    // this.queryYearBrand()
  },
  data() {
    return {
      loading:false,
      queryForm:{
        onlySeeMySelf:false,
        year:''
      },
      curYearPrice:'',//当前年度总额
      lastYearPrice:'',//上一年度总额
      brandMTZList: [],
      brandMTZTitle: []
    }
  },
  methods: {
    changeTableTile(){
      this.brandMTZTitle=[
        {
          prop: 'brandName',
          label: '品牌',
          i18n: 'LK_PINGPAI',
          headerAlign: 'center',
          align: 'center',
          tooltip: true
        },
        {
          prop: 'curPrice',
          label: `${this.queryForm?.year}MTZ预算(百万)`,
          headerAlign: 'center',
          align: 'center',
          tooltip: true,
          customRender:(h, scope)=>{
            return <span>{scope.row.curPrice?.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')}</span>
          }
        },
        {
          prop: 'lastPrice',
          label: `${this.queryForm?.year-1}MTZ预算(百万)`,
          headerAlign: 'center',
          align: 'center',
          tooltip: true,
          customRender:(h, scope,)=>{
            return <span>{scope.row.lastPrice?.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')}</span>
          }
        }
      ]
    },
    showOnlyMyselfData(val){
      this.queryForm.onlySeeMySelf=val
      this.queryYearBrand()
    },
    changeYear(year){
      this.queryForm.year=year
      this.queryYearBrand()
    },

    queryYearBrand(){
      this.loading = true
      yearBrand(this.queryForm).then(res=>{
        if(res.code==200){
          this.curYearPrice=res.data.curYearPrice
          this.lastYearPrice=res.data.lastYearPrice
          if(res.data.brandDataList){
            this.brandMTZList=res.data.brandDataList
          }else{
            this.brandMTZList=[]
          }
          this.changeTableTile()
        }else{
          this.$message.error(res.desZh)
          this.curYearPrice=0
          this.lastYearPrice=0
          this.brandMTZList=[]
        }
      }).finally(()=>this.loading = false)
    }
  }
}
</script>

<style scoped lang='scss'>
.title-box {
  display: flex;
  justify-content: space-between;
  .left-box {
    span {
      font-size: 20px;
      font-weight: bold;
      color: black;
    }
    .span-1 {
      margin-left: 20px;
    }
  }
}
.right-box {
  display: flex;
  justify-content: flex-start;
}
</style>