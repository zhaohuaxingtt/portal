<template>
  <i-card>
    <div class="title-box">
      <div class="left-box">
        <span>2021年总金额:340,400,200人民币</span>
        <span class="span-1">2020年总⾦额：240,400,200⼈⺠币</span>
      </div>
      <div class="right-box">
        <show-me-components />
        <year-change-components class="margin-left20" />
      </div>
    </div>
    <i-table-custom
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
import {
yearBrand
} from '@/api/mtz/reportsShow'
export default {
  name: 'index',
  components: {
    iTableCustom,
    YearChangeComponents,
    ShowMeComponents,
    iCard
  },
  data() {
    return {
      brandMTZList: [
        { brandName: '大众', yearMtzMoney: 400, nextYearMtzMoney: 300 }
      ],
      brandMTZTitle: [
        {
          prop: 'brandName',
          label: '品牌',
          i18n: 'LK_PINGPAI',
          headerAlign: 'center',
          align: 'center',
          tooltip: true
        },
        {
          prop: 'yearMtzMoney',
          label: '2021MTZ预算(百万)',
          headerAlign: 'center',
          align: 'center',
          tooltip: true
        },
        {
          prop: 'nextYearMtzMoney',
          label: '2020MTZ预算(百万)',
          headerAlign: 'center',
          align: 'center',
          tooltip: true
        }
      ]
    }
  },
  methods: {
    queryYearBrand(){
      yearBrand().then(res=>{

      })
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