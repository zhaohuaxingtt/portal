<template>
    <div>
      <iSelect  multiple v-model="row.moldUserIds" >
        <el-option
        v-for="item in moldAnalyseOption"
        :key="item.id"
        :label="item.name"
        :value="item.id"
        >
        </el-option>  
    </iSelect>
    </div>
</template>

<script>
import {iSelect } from 'rise'
export default {
    name:'moldAnalyseSelect',
    components:{iSelect},
    props:{
        row:{
            type:Object,
            default:()=>{
                return {moldUserIds:''}
            }
        },
        moldAnalyseOption:{
            type:Array,
            default:()=>[]
        }
    },
    data(){
        return{
        }
    },
}
</script>

<style lang="scss" scoped>
</style>