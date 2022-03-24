<template>
    <iCard :title="$t('CAIGOUYUANXINXI')" collapse>
        <template slot="header-control">
            <i-button v-permission="" v-if="editType"
                        @click="editClick">{{ language('编辑') }}</i-button>
            <i-button v-permission="" v-if="!editType"
                        @click="save">{{ language('保存') }}</i-button>
            <i-button v-permission="" v-if="!editType"
                        @click="cancel">{{ language('取消') }}</i-button>
        </template>
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
import { iCard,iButton } from "rise";
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
        iButton
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

<style>

</style>