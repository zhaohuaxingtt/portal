<template>
 <div class='year-change'>
   <span>{{  language('LK_QIEHUANNIANFEN', '切换年份') }}</span>
   <iDatePicker v-model='year'  placeholder="请选择"
                 :picker-options="pickerOptions"
                 value-format="yyyy"
                 @change='changeYear'
                 type="year"></iDatePicker>
 </div>

</template>

<script>
import {
  iDatePicker,
} from 'rise'
export default {
  name: 'YearChangeComponents',
  components:{
    iDatePicker,
  },
  data(){
    return {
      year:  new Date(),
      pickerOptions:{
        disabledDate: (time) => {
            let nowYear = new Date().getFullYear();
            return time.getFullYear()>nowYear;
        }
    },
    }
  },
  methods:{
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