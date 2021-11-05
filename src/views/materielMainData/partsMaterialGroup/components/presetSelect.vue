<template>
  <div>
    <iSelect v-model="row.presetType" @change="searchDescByType">
      <el-option 
        v-for="item in cbdPrese"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      >
      </el-option>
    </iSelect>
  </div>
</template>
<script>
import {iSelect} from "rise"
export default {
    components:{iSelect},
    props: {
      row: {  
        type: Object,
        default: function() {
          return {}
        }
      },
      cbdPrese: {
        type: Array,
        default: function() {
          return []
        }
      },
      restaurant: {
        type:Array,
        default:function(){
          return []
      }
    }
    },
    data(){
      return{
      }
    },
    methods:{
      searchDescByType(){
        
        this.cbdPrese.forEach((element) =>{
          if(this.row.presetType == element.code){
            this.restaurant = element.subSelectVos.map((item,index) =>{
              return Vue.set(this.restaurant,index,{value:item.code})
            })
          }
        })
        
      }
    },
    mounted(){
      this.searchDescByType()
    }
}
</script>
<style>

</style>