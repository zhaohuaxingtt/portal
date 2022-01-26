<template>
    <div class="qs">
        <div v-for="l in list" :key="l.id">
            <div class="title">{{l.name}}</div>
            <div class="flex justify-between items-center">
                <div>测试问题问答</div>
                <iButton>MORE</iButton>
            </div>
            <div>1.回答1</div>
            <div>sdasdasdaddas</div>
            <template v-if="isQA">
                <div v-show="!showInput" class="opearte mt20 cursor" @click="showInput = true"><i class="el-icon-edit"></i> 提问</div>
                <div v-if="showInput" class="mt20">
                    <iInput v-model="val" placeholder="请输入问题"></iInput>
                    <div class="mt10 flex justify-end">
                        <iButton>确定</iButton>
                        <iButton @click="showInput = false">取消</iButton>
                    </div>
                </div>
            </template>
            <div class="flex mt20">
                <div class="opearte mr20 cursor"><i class="el-icon-share"></i>分享</div>
                <div class="opearte cursor"><i class="el-icon-star-off"></i>收藏</div>
            </div>
        </div>

    </div>
</template>

<script>
    import {iButton, iInput} from 'rise';

    export default {
        components:{
            iButton,
            iInput
        },
        prop:{
            list:{
                type: Array,
                default: () => []
            },
            isQA:{
                type:Boolean,
                default: false
            }
        },
        data() {
            return {
                showInput:false
            }
        },
    }
</script>

<style lang="scss" scoped>
@import "./../../comon";
  .qs{
        margin: 20px;
        padding: 20px;
        border: 1px solid #BBC4D6;
        border-radius: 10px;

        .title{
            color: #1660F1;
            font-size: 18px;
            font-weight: bold;
        }
        
        .opearte{
            color: #666;
        }
    }
</style>