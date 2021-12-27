<template>
 <div class='year-change'>
   <span>{{  language('LK_QIEHUANNIANFEN', '切换年份') }}</span>
   <i-select class='my_select'></i-select>
 </div>
</template>

<script>
import {iSelect} from 'rise'
export default {
  name: 'YearChangeComponents',
  components:{
    iSelect,
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