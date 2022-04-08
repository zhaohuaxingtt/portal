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
                <span v-if="scope.row.industryPosition=='Y'">{{scope.row.businessBuyerEmail}}</span>
                <iInput v-else v-model="scope.row.businessBuyerEmail" @change="chioseEamil($event,scope.row)"></iInput>
            </template>
            <template #businessBuyerNum="scope">
                <span v-if="scope.row.industryPosition=='Y'">{{scope.row.businessBuyerNum}}</span>
                <iInput v-else v-model="scope.row.businessBuyerNum"></iInput>
            </template>
            <template #businessBuyerDept="scope">
                <span v-if="scope.row.industryPosition=='Y'">{{scope.row.businessBuyerDept}}</span>
                <iInput v-else v-model="scope.row.businessBuyerDept"></iInput>
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
import { getUserInfo } from "@/api/register/home"
export default {
    props:{
        supplierData:{
            type: Array,
            default: () => []
        }
    },
    components:{
        iCard,
        tableList,
        iInput
    },
    data(){
        return{
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
        chioseEamil(val,data){
            if(val){
                getUserInfo({
                    purchaserEmail: val
                }).then(res=>{
                    data.businessBuyerName = res.data.nameZh;
                    data.businessBuyerNum = res.data.userNum;
                    data.businessBuyerDept = res.data.purchaserSection;
                })
            }else{
                data.businessBuyerName = "";
                data.businessBuyerNum = "";
                data.businessBuyerDept = "";
            };
        }
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