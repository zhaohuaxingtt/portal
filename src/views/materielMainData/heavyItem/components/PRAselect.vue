<template>
  <div>
    <el-checkbox v-model="checkSta" :disabled='edit' @change="changeSta"></el-checkbox>
  </div>
</template>

<script>

export default {
  name:'PRASelect',
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
  data(){
    return {
      checkSta:false
    }
  },
  watch: {
    heavyItemList(val) {
      this.init()
    }
  },
  methods:{
    changeSta(){
      if(this.heavyItemList!= null && this.heavyItemList.indexOf('PRA') != -1 ){
        this.heavyItemList.splice(this.heavyItemList.indexOf('PRA'),1)
      }else{
        this.heavyItemList.push('PRA')
      }
    },
    init() {
      this.checkSta = this.heavyItemList.indexOf('PRA') > -1
    }
  },
  mounted(){
    this.init()
    /* if(this.heavyItemList!= null && this.heavyItemList.indexOf('PRA') != -1){
      this.checkSta = true
    } */
  }, 
}
</script>

<style>

</style>