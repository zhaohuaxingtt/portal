<template>
  <div>
      <iDatePicker v-model="row.effectiveStartTime" v-show="type"></iDatePicker>
      <iDatePicker v-model="row.effectiveEndTime" v-show='!type' :picker-options="pickerOptions" dis></iDatePicker>
  </div>
</template>

<script>
import {iDatePicker} from 'rise'
export default {
    name:'parities-select-time',
    components:{
        iDatePicker
    },
    props:{
        row:{
            type:Object,
            default:()=>{}
        },
        type:{
            type:String,
            default:''
        }
    },
    computed:{
        pickerOptions(){
            var _this = this
           return{
            disabledDate(time){
                var date = new Date(_this.row.effectiveStartTime).getTime() + 60*60*24
                return time.getTime() < date
            } 
           } 
        }
    },
    created(){
        console.log(this.row);
    },
    data(){
        return{
        }
    },
}
</script>

<style>

</style>