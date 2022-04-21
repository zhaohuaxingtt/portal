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
import { iCard,iButton,iInput } from "rise";
import tableList from './table'
import { getUserInfo } from "@/api/register/home"
import { batchSaveOrUpd } from '@/api/mainDataSupplier/list/bank'
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
            oldData:[],
        }
    },
    created(){
        
    },
    methods:{
        save(){
            this.detail.gpSupplierDetails.forEach(e => {
                e.supplierId = this.$route.query.id;
            });
            batchSaveOrUpd(
                this.detail.gpSupplierDetails
            ).then(res=>{
                console.log(res.data)
            })
        },
        cancel(){
            this.editType = true;

            console.log(this.oldData)
            this.detail.gpSupplierDetails = _.cloneDeep(this.oldData);
        },
        editClick(){
            this.editType = false;
        },
        handleSelectionChange(e){

        },
        chioseEamil(val,data){
            if(val){
                getUserInfo({
                    purchaserEmail: val
                }).then(res=>{
                    data.businessBuyerName = res.data.nameZh;
                    data.businessBuyerNum = res.data.userNum;
                    data.businessBuyerDept = res.data.purchaserSection;
                    data.businessBuyerId = res.data.id;
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