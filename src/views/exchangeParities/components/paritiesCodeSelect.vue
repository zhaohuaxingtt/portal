<template>
  <div>
      <iSelect v-model="row.originCurrencyCode" v-if="type">
          <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.code"
            :value="item.value"
          >
          </el-option>
      </iSelect>

      <iSelect v-model="row.currencyCode" v-else>
          <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
      </iSelect>
  </div>
</template>

<script>
import {iSelect} from 'rise'
export default {
    name:'parities-code-select',
    components:{iSelect},
    props:{
        selectOptions:{
            type:Array,
            default:()=>[]
        },
        row:{
            type:Object,
            default:()=>{}
        },
        type:{
            type:String,
            default:''
        }
    },
    data(){
        return{

        }
    }
}
</script>

<style>

</style>