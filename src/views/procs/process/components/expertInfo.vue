<template>
    <iDialog
        title=""
        :visible.sync="show" 
        width="500px" 
        @close='close' 
        append-to-body
        class="process-dialog"
    >
        <div class="info">
            <div class="info-top">
                <el-avatar size="medium" :src="info.profilePicture" class="avatar" icon="el-icon-user-solid"></el-avatar>
                <div class="info-name">
                    <div class="zn-name">{{info.name}} <span class="en-name">{{info.gender == "MALE" ? "MR." : "MISS"}} {{info.nameEn}}</span></div>
                    <div>{{info.organization ? info.organization.code : ""}} {{info.position ? info.position.name : ""}} {{info.uid}}</div>
                </div>
            </div>
            <div class="info-item">
                <i class="icon el-icon-map-location"></i>
                <span class="cursor">{{info.officeLoc}}</span>
            </div>
            <div class="info-item">
                <i class="icon el-icon-phone-outline"></i>
                <span class="cursor">{{info.phoneNumber}}</span>
            </div>
            <div class="info-item">
                <i class="icon el-icon-message"></i>
                <span class="cursor">{{info.email}}</span>
            </div>
            <div class="info-item">
                <i class="icon el-icon-chat-dot-round"></i>
                <span class="cursor">{{info.wechatId}}</span>
            </div>
        </div>
    </iDialog>
</template>

<script>
    import {iDialog} from 'rise';
    export default {
        components:{
            iDialog
        },
        props:{
            show:{
                type:Boolean,
                default:false
            },
            info:{
                type: Object,
                default: () => {}
            }
        },
        methods: {
            close(){
                this.$emit("update:show",false)
            }
        },
    }
</script>

<style lang="scss" scoped>


.info{
    margin: 0 auto;
    padding-bottom: 40px;
    color: #666;
    .info-top{
        display: flex;
        align-items: center;
        .avatar{
            margin-right: 10px;
            width:50px;
            height:50px;
            line-height: 50px;
        }
    }
    .info-name{
        // display: flex;
        .zn-name{
            font-size: 30px;
            font-weight: bold;
            color: #000;
        }
        .en-name{
            font-size: 18px;
        }

    }

    .info-item{
        padding: 15px 10px;
        .icon{
            margin-right: 20px;
            font-size: 20px;
            color: #1660F1;
        }
    }
}
</style>