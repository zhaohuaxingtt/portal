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
        <updatingFilesTableGPYear class="margin-top20" ref="updatingFiles"></updatingFilesTableGPYear>
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
        }
    },
    created(){

    },
    methods:{
        async handleTaskInfo(step) {
            this.saveLoading = true;
            setTimeout(() => {
                this.saveLoading = false;
            }, 200);
            const res = await checkUpSupplierFileReloadTask({
                taskId:this.$route.query.id,
                checkResult:step,
            })
            if(res.result){
                this.saveLoading = false;
                iMessage.success(res.desZh)
            }else{
                this.saveLoading = false;
                iMessage.error(res.desZh)
            }
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