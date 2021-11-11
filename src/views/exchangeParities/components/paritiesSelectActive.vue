<template>
  <div>
      <iSelect v-model="row.isEffect" v-if=" type == 'isEffect'">
          <el-option
            v-for="item in effectoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
      </iSelect>
      <iSelect v-model="row.type" v-else>
          <el-option
            v-for="item in exchangRateOption"
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
    name:'parities-select-active',
    components:{
        iSelect
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
    data(){
        return{
            effectoptions:[
                {
                    label:'是',
                    value:true
                },
                {
                    label:'否',
                    value:false
                }
            ],
            exchangRateOption:[
                {
                    label:'项目汇率',
                    value:1
                },
                {
                    label:'SAP汇率',
                    value:0
                }
            ]
        }
    }
}
</script>

<style>

</style>