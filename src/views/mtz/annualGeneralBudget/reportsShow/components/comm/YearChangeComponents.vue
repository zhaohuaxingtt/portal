<template>
 <div class='year-change'>
   <span>{{  language('LK_QIEHUANNIANFEN', '切换年份') }}</span>
   <i-select class='my_select' v-model='year'  placeholder="请选择" @change='changeYear'>
     <el-option
       v-for="item in years"
       :key="item.code"
       :label="`${item.message}年`"
       :value="item.code">
     </el-option>
   </i-select>
 </div>

</template>

<script>
import {
  iSelect,
} from 'rise'
import { yearDropDown } from '@/api/mtz/reportsShow'
export default {
  name: 'YearChangeComponents',
  components:{
    iSelect,
  },
  data(){
    return {
      year:  '',
      years:[],

    }
  },
  created() {
    this.getDropDownYear()
  },
  methods:{
    getDropDownYear(){
      yearDropDown().then(res=>{
        if(res.code==200){
          this.years=res.data

          var year = new Date().getFullYear();
          var yearList = [];
          this.years.forEach((e,index) => {
            yearList.push({
              num: Math.abs(e.code - year),
              index: index
            })
          });
          var minNumber =  Math.min.apply(Math, yearList.map(function(o) {return o.num}))
          var message = 0;
          for(var i=0;i<yearList.length;i++){
            if(yearList[i].num == minNumber){
              message = yearList[i].index;
              break;
            }
          }
          this.changeYear(this.years[message].code)
          this.years=this.years.reverse()
          this.years=this.years.filter(item=>item.code!=null)

        }
      })
    },
    changeYear(year){
      this.year=year
      this.$emit('changeYear', year)
    }
  }
}
</script>

<style scoped lang='scss'>
.year-change{
  display: flex;
  align-items: center;
  span {
    font-size: 20px;
    color: #000000;
    align-content: center;
  }
  .my_select{
    margin-left: 10px;
    width:auto !important;
  }
}
</style>