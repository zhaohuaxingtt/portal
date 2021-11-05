<template>
    <div>
        <el-card class="box-card">
            <el-button class="btn" type="text" @click="show=!show">
                <i class="el-icon-arrow-up f24" :class="show?'active':'active1'"></i>
            </el-button>
            <div class="fw f20 title"><span>供应信息</span></div>
            <el-collapse-transition>
                <div class="content" v-show="show">
                    <div class="mt20 f14 fw">供应商份额</div>
                    <div class="mt20 f14 ">
                        <div :key="index" v-for="item,index in dataList">
                            <div class="flex mt10">
                                <span class="item" style="width:70px;" v-text="item.name"></span>
                                <span class="item bar" v-text="item.amount"></span>
                            </div>
                            <div class="flex mt10">
                                <span class="item" style="width:70px;" v-text="item.proportion"></span>
                                <div style="width: 100%">
                                    <span class="item bar1" :style="'width:'+ item.proportion" v-text="item.price"></span>
                                </div>

                            </div>

                        </div>
                        <!--<div class="flex">-->
                            <!--<span class="item" style="width:70px;">60%</span>-->
                            <!--<span class="item bar" :style="width">60.000</span>-->
                        <!--</div>-->
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
                options: [],
                dataList: [
                    {
                        name:'科世科',
                        amount:'100.000',
                        price:'60.000',
                        proportion:'60%'
                    },
                    {
                        name:'日泰',
                        amount:'100.000',
                        price:'60.000',
                        proportion:'60%'
                    }
                ]
            };
        },
        computed: {
            width() {
                return
            }
        },
        methods: {},
    };
</script>

<style scoped lang="scss">
    .box-card {
        width: 600px;
        position: relative;
        .btn {
            position: absolute;
            right: 20px;
            top: 0px;
            .active {
                transition: transform .3s;
                transform: rotate(180deg)
            }
            .active1 {
                transition: transform .3s;
                transform: rotate(0deg)
            }
        }
        .content {
            .bar {
                height: 20px;
                width: 100%;
                background-color: rgb(22, 96, 241);
                text-align: right;
                color: #fff;
                padding-right: 10px;
                border-radius: 5px;
            }
            .bar1 {
                display: block;
                height: 20px;
                background-color: rgb(115, 161, 250);
                text-align: right;
                color: #fff;
                padding-right: 10px;
                border-radius: 5px;
            }
        }
    }

</style>
