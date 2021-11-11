<template>
<div>
    <div class="tanc_book">
        <div>
            <span>{{language('MTZSHENQINGDANMING', 'MTZ申请单名')}}</span>
            <span style="color:red">*</span>
        </div>
        <iInput v-model="form.name"
                    style="width:220px"
                    :placeholder="language('QINGSHURU','请输入')">
        </iInput>
    </div>
    <!-- <div class="tanc_book">
        <span>{{language('CHUANGJIANSHIJIAN', '创建时间')}}</span>
        <iInput v-model="form.creatTime" :disabled="true" style="width:220px"></iInput>
    </div> -->
    <div slot="footer" class="dialog-footer">
        <iButton @click="handleSubmit">{{language('QUEREN', '确认')}}</iButton>
        <!-- <iButton @click="closeDiolog">{{language('QUXIAO', "取消")}}</iButton> -->
    </div>
</div>
</template>

<script>
import inputCustom from '@/components/inputCustom'
import { getNowFormatDate } from "@/views/mtz/debounce";
import { deepClone } from "./applyInfor/util"
import store from "@/store";

import { mtzConfirm,relation } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';

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
            }else{
                mtzConfirm({
                    appName:this.form.name
                }).then(res=>{
                    var data = deepClone(this.$route.query);
                    data.mtzAppId = res.data;

                    if(this.$route.query.appId){
                        data.appId = this.$route.query.appId;
                        store.commit("routerMtzData",data);
                        sessionStorage.setItem("MtzLIst",JSON.stringify(data))
                        relation({
                            mtzAppId:res.data,
                            ttNominateAppId:this.$route.query.appId
                        }).then(prame=>{
                            console.log(prame)
                            if(prame.code == 200){
                                iMessage.success(prame.desZh)
                                this.$emit("close","")
                            }else{
                                iMessage.error(prame.desZh)
                            }
                        })
                    }else{
                        store.commit("routerMtzData",data);
                        sessionStorage.setItem("MtzLIst",JSON.stringify(data))
                    }
                    
                    this.$emit("close","")
                });

                
            }
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