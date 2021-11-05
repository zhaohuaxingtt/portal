<template>
    <div :class="isShowFold?'floding-box':'box-height'">
        <div class="foldbox">
            <h2>{{foldName}}</h2>
            <div :class="isShowFold?'el-icon-arrow-down iconFont2':'el-icon-arrow-up iconFont'"
            @click="isShowFold=!isShowFold"></div>
        </div>
        <div class="btnList">
            <iButton v-for="(item,index) in btnList" :key="index" @click="handleClick(item.type)">{{item.name}}</iButton>
        </div>
        <slot></slot>
    </div>
</template>

<script>
import {iButton} from 'rise'
export default {
    components:{
        iButton
    },
    props:{
        foldName:{
            type:String,
            default: "标题"
        },
        btnList:{
            type:Array,
            default:()=>[]
        }
    },
    data(){
        return {
            isShowFold:true,
            activeNames:'1'
        }
    },
    methods: {
        handleClick(type){
            this.$emit('handleType',type)
        },
        handleChange(val){
           
        }

    }
}
</script>

<style lang="scss" scoped>
    .floding-box{
        animation: changeBigHight 0.5s;
        animation-iteration-count:1;
        animation-fill-mode:forwards;
    }
    .foldbox{
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-bottom: 10px;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .el-icon-arrow-down{
        cursor: pointer;
    }
    .btnList{
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
    }
    ::v-deep.el-collapse{
        border:none;
    }
    .box-height{
        animation: changeSmallHight 0.5s;
        animation-iteration-count:1;
        animation-fill-mode:forwards;
        overflow: hidden;
    }
    @keyframes changeSmallHight {
        0% {
            height: 200px;
        }
        100% {
             height: 30px;
        }
    }
    @keyframes changeBigHight {
        0% {
            height: 30px;
        }
        100% {
             height: 100%;
        }
    }
</style>>

