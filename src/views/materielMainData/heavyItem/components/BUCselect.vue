<template>
  <div>
      <el-checkbox v-model="checkSta" :disabled='edit' @change="changeSta"></el-checkbox>
  </div>
</template>

<script>
import {iFormItem} from 'rise'
export default {
  name:'BUCSelect',
  components:{iFormItem},
  props:{
    heavyItemList:{
      type:Array,
      default:() => []
    },
    edit:{
      type:Boolean,
      default:true
    }
  },
  watch:{
    heavyItemList(){
      this.init()
    }
  },
  data(){
    return {
      checkSta:false
    }
  },
  methods:{
    changeSta(){
      if(this.heavyItemList!= null && this.heavyItemList.indexOf('BUC') != -1  ){
        this.heavyItemList.splice(this.heavyItemList.indexOf('BUC'),1)
      }else{
        this.heavyItemList.push('BUC')
      }
    },
    init(){
      this.checkSta = this.heavyItemList.indexOf('BUC') > -1
    }
  },
  mounted(){
    this.init()
    /* if(this.heavyItemList!= null && this.heavyItemList.indexOf('BUC') != -1 ){
      this.checkSta = true
    } */
  }
}
</script>

<style>

</style>