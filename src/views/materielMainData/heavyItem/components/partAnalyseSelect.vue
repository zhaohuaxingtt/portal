<template>
    <div>
      <iSelect v-model="row.partsUserIds" multiple >
        <el-option
        v-for="item in partAnalyseOption"
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
    name:'partAnalyseSelect',
    components:{iSelect},
    props:{
        row:{
            type:Object,
            default:()=>{
                return {partsUserIds: ''}
            }
        },
        partAnalyseOption:{
            type:Array,
            default:()=>[]
        }
    },
}
</script>

<style>

</style>