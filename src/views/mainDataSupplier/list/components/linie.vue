<template>
    <iCard :title="$t('CAIGOUYUANXINXI')" collapse>
        <template slot="header-control">
            <i-button v-if="editType"
                        @click="editClick">{{ language('编辑') }}</i-button>
            <i-button v-if="!editType"
                        @click="save">{{ language('保存') }}</i-button>
            <i-button v-if="!editType"
                        @click="cancel">{{ language('取消') }}</i-button>
        </template>
        <table-list
            :tableData="detail.gpSupplierDetails"
            :tableTitle="tableTitle"
            :tableLoading="tableLoading"
            @handleSelectionChange="handleSelectionChange"
            ref="commonTable"
            :selection="false"
        >   
            <template #businessBuyerEmail="scope">
                <span v-if="editType">{{scope.row.businessBuyerEmail}}</span>
                <iInput v-else v-model="scope.row.businessBuyerEmail"></iInput>
            </template>
            <template #businessBuyerNum="scope">
                <span v-if="editType">{{scope.row.businessBuyerNum}}</span>
                <iInput v-else v-model="scope.row.businessBuyerNum"></iInput>
            </template>
            <template #businessBuyerDept="scope">
                <span v-if="editType">{{scope.row.businessBuyerDept}}</span>
                <iInput v-else v-model="scope.row.businessBuyerDept"></iInput>
            </template>
            <template #businessContactEmail="scope">
                <span v-if="editType">{{scope.row.businessContactEmail}}</span>
                <iInput v-else v-model="scope.row.businessContactEmail"></iInput>
            </template>
            <template #businessContactUser="scope">
                <span v-if="editType">{{scope.row.businessContactUser}}</span>
                <iInput v-else v-model="scope.row.businessContactUser"></iInput>
            </template>
        </table-list>
    </iCard>
</template>

<script>
import { iCard,iButton,iInput } from "rise";
import tableList from './table'
import { tableTitle } from './data'
export default {
    props:{
        detail:{
            type: Object,
            default: () => { }
        }
    },
    components:{
        iCard,
        tableList,
        iButton,
        iInput
    },
    data(){
        return{
            editType:true,
            tableListData:[
                
            ],
            tableTitle:tableTitle,
            tableLoading:false,
        }
    },
    created(){

    },
    methods:{
        save(){
            
        },
        cancel(){
            this.editType = true;
        },
        editClick(){
            this.editType = false;
        },
        handleSelectionChange(e){

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