<template>
    <iPage>
        <div style="font-size:1.35rem;margin-bottom:15px;" class="year_button">
            <span style="font-weight:bold">{{detail.desc}}</span>
            <iButton @click="saveInfos">{{ $t('LK_TIJIAO') }}</iButton>
        </div>
        <updatingFilesTableGPYear class="margin-top20" ref="updatingFiles"></updatingFilesTableGPYear>
        <freeUploadTableGPYear class="margin-top20"
                 ref="freeUpload" />
    </iPage>
</template>

<script>
import { iPage,iButton } from 'rise'
import updatingFilesTableGPYear from '@/views/generalPage/relevantAttachments/components/updatingFilesTableGPYear'
import freeUploadTableGPYear from '@/views/generalPage/relevantAttachments/components/freeUploadTableGPYear'

export default {
    name:"",
    components:{
        iPage,
        iButton,
        updatingFilesTableGPYear,
        freeUploadTableGPYear
    },
    data(){
        return{
            detail:{
                desc:"三年不活跃准入材料重新上传"
            }
        }
    },
    created(){

    },
    methods:{
        async saveInfos (step) {
            await Promise.all([
                this.$refs.updatingFiles.saveInfos(step),
                this.$refs.freeUpload.saveInfos(step)
            ])
        },
        async handleNextStep () {
            let flag = false
            const res = await Promise.all([
                this.$refs.updatingFiles.handleNextStep(),
                this.$refs.freeUpload.handleNextStep()
            ])
            flag = res[0] && res[1]
            return flag
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