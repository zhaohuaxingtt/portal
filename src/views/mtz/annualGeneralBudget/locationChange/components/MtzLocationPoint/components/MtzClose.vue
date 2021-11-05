<template>
<div>
    <div class="tanc_book">
        <iInput v-model="reason" type="textarea" :rows="10"></iInput>
    </div>
    <div slot="footer" class="dialog-footer">
        <iButton @click="handleSubmit">{{language('QUEREN', '确认')}}</iButton>
        <iButton @click="closeDiolog">{{language('QUXIAO', "取消")}}</iButton>
    </div>
</div>
</template>

<script>
import { mtzRecall } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';
import { iButton,iInput,iMessage } from "rise";
export default {
    components:{
        iButton,
        iInput
    },
    data(){
        return{
            reason:""
        }
    },
    created(){

    },
    methods:{
        closeDiolog(){
            this.$emit("close","")
        },
        handleSubmit(){
            if(this.reason == ""){
                iMessage.error("请务必填写撤回原因！")
                return false;
            }
            // mtzRecall().then(res=>{
            //     console.log(res);
            // })
            this.$emit("close","")
        }
    }
}
</script>

<style lang="scss" scoped>
.tanc_book{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom:25px;
    span{
        font-size:16px;
    }
}
.dialog-footer{
    padding-bottom:30px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
</style>