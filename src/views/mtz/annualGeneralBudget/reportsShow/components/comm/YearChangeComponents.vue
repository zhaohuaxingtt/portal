<template>
 <div class='year-change'>
   <span>{{  language('LK_QIEHUANNIANFEN', '切换年份') }}</span>
   <i-select class='my_select' v-model='year'  placeholder="请选择" @change='changeYear'>
     <el-option
       v-for="item in years"
       :key="item.code"
       :label="`${item.message}年`"
       :disabled="item.code>new Date().getFullYear()"
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
          this.changeYear(res.data[0].code)
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