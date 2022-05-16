<template>
    <iPage>
        <div style="font-size:1.35rem;margin-bottom:15px;" class="year_button">
            <span style="font-weight:bold">{{detail.desc}}</span>
            <div>
                <iButton @click="handleTaskInfo(true)" :loading="saveLoading">{{ $t('SUPPLIER_PIZHUN') }}</iButton>
                <iButton @click="handleTaskInfo(false)" :loading="saveLoading">{{ $t('LK_JUJUE') }}</iButton>
            </div>
        </div>
        <yearTable class="margin-top20" ref="yearTable"></yearTable>
        <updatingFilesTableGPYear class="margin-top20" ref="updatingFiles" @getSupplierToken="getSupplierToken"></updatingFilesTableGPYear>
    </iPage>
</template>

<script>
import { iPage,iButton,iMessage } from 'rise'
import updatingFilesTableGPYear from '@/views/generalPage/relevantAttachments/components/updatingFilesTableGPYear'
import yearTable from "./yearTable";
import {
  checkUpSupplierFileReloadTask
} from '@/api/register/relevantAttachments'

export default {
    name:"",
    components:{
        iPage,
        iButton,
        updatingFilesTableGPYear,
        yearTable
    },
    data(){
        return{
            detail:{
                desc:"三年不活跃准入材料重新上传申请"
            },
            saveLoading:false,
            supplierToken:'',
        }
    },
    created(){

    },
    methods:{
        getSupplierToken(val){
            this.supplierToken = val;
        },
        async handleTaskInfo(step) {
            this.saveLoading = true;
            checkUpSupplierFileReloadTask({
                taskId:this.$route.query.id,
                checkResult:step,
                supplierToken:this.supplierToken
            }).then(res=>{
                if(res.result){
                    iMessage.success(res.desZh)
                }else{
                    iMessage.error(res.desZh)
                }
                this.saveLoading = false;
            }).catch(res=>{
                console.log(res);
                this.saveLoading = false;
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.year_button{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
</style>