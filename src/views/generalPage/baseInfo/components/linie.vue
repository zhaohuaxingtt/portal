<template>
    <iCard :title="$t('CAIGOUYUANXINXI')" collapse>
        <table-list
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="tableLoading"
            @handleSelectionChange="handleSelectionChange"
            ref="commonTable"
            :selection="false"
        >
        </table-list>
    </iCard>
</template>

<script>
import { iCard } from "rise";
import tableList from './table'
import { tableTitle } from './data'
export default {
    props:{
        supplierData:{
            type: Object,
            default: () => { }
        }
    },
    components:{
        iCard,
        tableList
    },
    data(){
        return{
            tableListData:[
                
            ],
            tableTitle:tableTitle,
            tableLoading:false,
        }
    },
    created(){

    },
    methods:{
        handleSelectionChange(e){

        },
    }
}
</script>

<style>

</style>