<template>
<div>
    <div class="tanc_book">
        <div>
            <span>{{language('MTZSHENQINGDANMING', 'MTZ申请单名')}}</span>
            <span style="color:red">*</span>
        </div>
        <input-custom v-model="form.name"
                    style="width:220px"
                    :editPlaceholder="language('QINGSHURU','请输入')"
                    :placeholder="language('QINGSHURU','请输入')">
        </input-custom>
    </div>
    <div class="tanc_book">
        <span>{{language('CHUANGJIANSHIJIAN', '创建时间')}}</span>
        <iInput v-model="form.creatTime" :disabled="true" style="width:220px"></iInput>
    </div>
    <div slot="footer" class="dialog-footer">
        <iButton @click="handleSubmit">{{language('QUEREN', '确认')}}</iButton>
        <iButton @click="closeDiolog">{{language('QUXIAO', "取消")}}</iButton>
    </div>
</div>
</template>

<script>
import inputCustom from '@/components/inputCustom'
import { getNowFormatDate } from "@/views/mtz/debounce";

import { iButton,iInput,iMessage } from "rise";
export default {
    components:{
        iButton,
        inputCustom,
        iInput,
        iMessage
    },
    data(){
        return{
            form:{
                
            },
        }
    },
    created(){
        this.form.creatTime = getNowFormatDate()
    },
    methods:{
        closeDiolog(){
            this.$emit("close","")
        },
        handleSubmit(){
            if(!this.form.name || this.form.name==""){
                iMessage.error("请填写MTZ申请单名！")
                return false;
            }
            let routeData = this.$router.resolve({
                path: `/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/applyInfor`
            })
            window.open(routeData.href, '_blank')
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