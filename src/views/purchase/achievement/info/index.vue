<template>
    <div>
        <el-card class="box-card">
            <el-button class="btn" type="text" @click="show=!show">
                <i class="el-icon-arrow-up f24" :class="show?'active':'active1'"></i>
            </el-button>
            <div class="fw f16 title">
                <span>基础信息</span>
                <el-popover
                        class="pl10"
                        placement="bottom"
                        title=""
                        width="180"
                        trigger="click"
                >
                    <ul class="tips-content fw f14">
                        <li> ⻓(mm)：100</li>
                        <li> 宽(mm)：200</li>
                        <li> ⾼(mm)：200</li>
                        <li> 重量（kg）：100</li>
                    </ul>
                    <span slot="reference">
                        <icon class="icon f22" symbol  name="icon-xinxitishi" />
                    </span>
                </el-popover>
                <span class=" bg">AEKO</span>
                <span class=" bg">Spare</span>
            </div>
            <el-collapse-transition>
                    <div class="content" v-show="show">
                        <div class="flex">
                            <div class="item1" style="width: 100px">
                                <div >材料组：</div>
                                <div >品牌：</div>
                                <div >FS：</div>
                                <div >配件FS：</div>
                                <div >EP：</div>
                                <div >SAP合同号：</div>
                                <div >RiSE合同号：</div>
                            </div>
                            <div class="item">
                                <div class="fw">023-空⽓悬挂</div>
                                <div class="fw icon-box" >VW <icon  class="icon f16" symbol name="icon-a-Icon-ArrowDropDown"/></div>
                                <div class="fw icon-box" >63599-戎海亮 <icon  class="icon f16" symbol name="icon-a-Icon-ArrowDropDown"/></div>
                                <div class="fw icon-box" >63566-⾦伟 <icon  class="icon f16" symbol name="icon-a-Icon-ArrowDropDown"/></div>
                                <div class="fw icon-box" >54321-王⻜ <icon  class="icon f16" symbol name="icon-a-Icon-ArrowDropDown"/></div>
                                <div class="fw icon-box" >5200012345 <icon  class="icon f16" symbol name="icon-a-Icon-ArrowDropDown"/></div>
                                <div class="fw icon-box" >RiSE52210115 <icon  class="icon f16" symbol name="icon-a-Icon-ArrowDropDown"/></div>
                            </div>
                            <div class="item1 pl20">
                                <div >科室：</div>
                                <div >采购⼯⼚：</div>
                                <div >Linie：</div>
                                <div >配件Linie：</div>
                                <div >EP售后：</div>
                                <div >截⽌⽇期：</div>
                                <div >模具合同号：</div>
                            </div>
                            <div class="item">
                                <div class="fw icon-box">CSE </div>
                                <div class="fw icon-box">1000-上海⼯⼚ <icon  class="icon f16" symbol name="icon-a-Icon-ArrowDropDown"/></div>
                                <div class="fw icon-box">62668-周燚 <icon  class="icon f16" symbol name="icon-a-Icon-ArrowDropDown"/></div>
                                <div class="fw icon-box">63566-⾦伟 <icon  class="icon f16" symbol name="icon-a-Icon-ArrowDropDown"/></div>
                                <div class="fw icon-box">63123-李强 <icon  class="icon f16" symbol name="icon-a-Icon-ArrowDropDown"/></div>
                                <div class="fw icon-box">2021-12-31 <icon  class="icon f16" symbol name="icon-a-Icon-ArrowDropDown"/></div>
                                <div class="fw icon-box">5200012366 <icon  class="icon f16" symbol name="icon-a-Icon-ArrowDropDown"/></div>
                            </div>

                        </div>
                        <div class="ml10">
                            <span>⻋型：</span>
                            <span style="padding-left: 50px;" class="fw">Tiguan L、Tiguan M、Tiguan X、Tiguan S、Tiguan P、 T-Cross</span>
                        </div>
                    </div>
            </el-collapse-transition>
        </el-card>
    </div>

</template>

<script>
    import {iButton, icon, iSelect} from 'rise';

    export default {
        components: {
            iButton,
            iSelect,
            icon
        },
        data() {
            return {
                show: true,
                options: [

                ],
                dataList:[
                    {

                    }
                ]
            };
        },
        computed:{

        },
        methods: {


        },
    };
</script>

<style scoped lang="scss">
    .box-card {
        width: 600px;
        position: relative;
        .btn{
            position: absolute;
            right: 20px;
            top:0px;
            .active {
                transition: transform .3s;
                transform: rotate(180deg)
            }
            .active1 {
                transition: transform .3s;
                transform: rotate(0deg)
            }
        }
        .title{
            font-size: 20px;
            .bg{
                font-size: 22px;
                color: #fff;
                display: inline-block;
                border-radius: 5px;
                margin-left: 10px;
                padding: 0 5px;
                background-color: rgb(101,200,212);
            }

        }
        .content{
            width: 568px;
            margin-top: 40px;
            font-size: 15px;
            .flex {
                align-items: center;
                .item {
                    flex: 1;
                    div{
                        height: 35px;
                        line-height: 35px;
                    }
                }
                .item1{
                    width: 120px;
                    div{
                        height: 35px;
                        line-height: 35px;
                    }
                }
            }
        }
    }

    .tips-content li{
        line-height: 30px;
        font-size: 16px;
    }
    .icon-box {
        position: relative;
        .icon {
            position: absolute;right: 20px;top:10px
        }
    }
</style>
