<template>
    <iCard :title="$t('CAIGOUYUANXINXI')" collapse>
        <table-list
            :tableData="supplierData"
            :tableTitle="tableTitle"
            :tableLoading="tableLoading"
            @handleSelectionChange="handleSelectionChange"
            ref="commonTable"
            :selection="false"
        >
            <template #businessBuyerEmail="scope">
                <iInput v-model="scope.row.businessBuyerEmail"></iInput>
            </template>
            <template #businessBuyerNum="scope">
                <iInput v-model="scope.row.businessBuyerNum"></iInput>
            </template>
            <template #businessBuyerDept="scope">
                <iInput v-model="scope.row.businessBuyerDept"></iInput>
            </template>
            <template #businessContactEmail="scope">
                <iInput v-model="scope.row.businessContactEmail"></iInput>
            </template>
            <template #businessContactUser="scope">
                <iInput v-model="scope.row.businessContactUser"></iInput>
            </template>
        </table-list>
    </iCard>
</template>

<script>
import { iCard,iInput } from "rise";
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
        tableList,
        iInput
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
            this.tableListData = e;
        },
    }
}
</script>

<style scoped lang="scss">
::v-deep .el-form-item{
    margin:0!important;
}

::v-deep .el-table .el-table__row .el-input{
    width:100%!important;
}
</style>