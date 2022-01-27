<template>
    <div class="qs">
        <div v-for="(l,index) in qsList" :key="l.id">
            <div class="title">{{l.name}}</div>
            <div v-for="(answer,index1) in l.answerList" :key="answer.id">
                <div class="flex justify-between items-center">
                    <div class="tlt1">{{answer.name}}</div>
                    <el-button size="mini" @click="change(index,index1)">{{answer.more ? "收起" : "MORE"}}</el-button>
                </div>
                <div v-show="answer.more">
                    <div v-html="answer.richContent"></div>
                    <div class="time">最后编辑于 {{answer.updateTime}}</div>
                </div>
            </div>
            <template v-if="l.answerList.length > 0">
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
        props:{
            list:{
                type: Array,
                default: () => []
            },
            isQA:{
                type:Boolean,
                default: false
            }
        },
        watch:{
            list:{
                immediate:true,
                handler(n){
                    this.qsList = n.map(el => {
                        if(el.answerList.length > 0){
                            el.answerList.forEach(e => {
                                e.more = false
                            });
                        }
                        return el
                    });
                    
                    console.log(this.qsList);
                }
            }
        },
        data() {
            return {
                showInput:false,
                qsList:[]
            }
        },
        methods: {
            change(i1,i2){
                this.$set(this.qsList[i1].answerList[i2],'more', !this.qsList[i1].answerList[i2].more)
                this.$forceUpdate()
            }
        }
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
        .tlt1{
            margin: 10px 0;
            color: #666;
        }
        .time{
            margin-top: 30px;
            color: #999;
            text-align: right;
        }
    }
</style>