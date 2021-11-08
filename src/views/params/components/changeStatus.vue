<template>
    <div>
        <el-switch v-model="row.state" :active-value='1' :inactive-value='0' @change='saveSta'></el-switch>
    </div>
</template>

<script>
import {updateDict} from '@/api/params'
export default {
    name:'changeSta',
    props:{
        row:{
            type:Object,
            default:()=>{}
        }
    },
    computed:{
    },
    watch:{
        // row: {
        //     deep:true,
        //     handler:function(newvalue,old){
        //         updateDict(newvalue).then((val) =>{
        //             if(val.code == 200){
        //                 this.$message.success('更新成功')
        //             }
        //         })
        //     }
        // }
    },
    data(){
        return {
        }
    },
    methods:{
        saveSta(){
            updateDict(this.row).then((val) =>{
                    if(val.code == 200){
                        this.$message.success('更新成功')
                    }
                })
        }
    }
}
</script>

<style>

</style>