<template>
    <div>
        <iInput @input="handleInput" v-model="row.exchangeRate" :placeholder="language('请输入汇率')" ></iInput>
    </div>
</template>

<script>
import {iInput} from 'rise'
export default {
    name:'parities-input',
    components:{iInput},
    props:{
        row:{
            type:Object,
            default:()=>{}
        }
    },
    data(){
        return {

        }
    },
    methods:{
        handleInput(val){
            this.row.exchangeRate =val.replace(/[^0-9.]/g, '')
        }
    }
}
</script>

<style>

</style>