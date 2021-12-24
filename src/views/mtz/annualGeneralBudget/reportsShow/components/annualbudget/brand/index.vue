<template>
  <i-card>
     <div class='title-box'>
       <div class='left-box'>
         <span>2021年总金额:340,400,200人民币</span>
         <span class='span-1'>2020年总⾦额：240,400,200⼈⺠币</span>
       </div>
       <div  class='right-box'>
         <show-me-components/>

         <year-change-components/>
       </div>


     </div>
  </i-card>
</template>

<script>
import {iCard,iSelect} from 'rise'
import ShowMeComponents from '@/views/mtz/annualGeneralBudget/reportsShow/components/comm/ShowMeComponents'
import YearChangeComponents from '@/views/mtz/annualGeneralBudget/reportsShow/components/comm/YearChangeComponents'
export default {
  name: 'index',
  components:{
    YearChangeComponents,
    ShowMeComponents,
    iCard,
  }
}
</script>

<style scoped lang='scss'>
.title-box{
  display: flex;
  justify-content: space-between;
  .left-box{
    span{
      font-size: 20px;
      font-weight: bold;
      color: black;
    }
    .span-1{
      margin-left: 20px;
    }
  }
}
.right-box{
  display: flex;
  justify-content: flex-start;
}
</style>