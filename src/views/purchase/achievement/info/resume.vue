<template>
    <div>
        <el-card class="box-card">
            <el-button class="btn" type="text" @click="show=!show">
                <i class="el-icon-arrow-up f24" :class="show?'active':'active1'"></i>
            </el-button>
            <div class="fw f20 title"><span>零件履历</span></div>
            <el-collapse-transition>
                <div class="content" v-show="show">
                    <div class="box">
                        <div class="item">
                            <span style="position: relative;top:-10px">寻源</span>
                            <div class="xianicon1"></div>
                        </div>
                        <div class="item"> LOI
                            <div class="xianicon"></div>
                        </div>
                        <div class="item"> 配附件定点
                            <div class="xianicon"></div>
                        </div>
                        <div class="item"> 定点
                            <div class="xianicon"></div>
                        </div>
                        <div class="item"> Kick-off
                            <div class="xianicon"></div>
                        </div>
                        <div class="item" @click="showClick">
                            <icon class="icon f16" symbol
                                  :name="status?'icon-a-Icon-Arrowshouqi':'icon-a-Icon-ArrowDropDown'"/>
                            <span class="pl10" :class="actived?'actived':''">AEKO</span>
                            <div :class="actived?'active-icon':'xian-icon'"></div>
                        </div>
                        <div v-for="item,index in list" v-show="status" @click="activeClick(index)"
                             class="item"
                             :class="item.status?'blue':''"
                             style=" font-size:12px">
                            <span v-text="item.name"></span>
                        </div>
                        <div class="item"> SOP
                            <div class="xianicon"></div>
                        </div>
                        <div class="item"> EOP
                            <div class="xianicon"></div>
                        </div>
                        <div class="item">
                            <span style="position: relative;top:10px">EOS</span>
                            <div class="xianicon2"></div>
                        </div>
                    </div>
                    <div class="box1 ml20">
                        <div class="flex">
                            <div class="item">
                                <div :key="index" v-for="item,index in dataList"><span v-text="item.time"></span>
                                    <icon class="icon f24" symbol :name="'icon-lingjian1'"/>
                                </div>
                            </div>
                            <div class="item1">
                                <div :key="index" v-for="item,index in dataList">
                                    <span v-text="item.name"></span>
                                    <span v-if="index==0" class="sour">Golbal Sourcing</span>
                                    <span v-if="item.remark" class="sour"><span v-text="item.remark"></span></span>
                                </div>

                            </div>

                        </div>
                    </div>
                    <div class="box2 pl20">
                        <div class="title">
                            <span class="icon"></span>
                            <span class="text">AEKO 1</span>
                        </div>
                        <div class="container">
                            <div> <span class="left">AEKO号：</span> <span class="fw" style="color: #1763f7;text-decoration: underline;">VZF6364</span></div>
                            <div> <span class="left">ES投产⽇期：</span><span class="fw">2019-08-11</span></div>
                            <div> <span class="left">ES取消⽇期：</span><span class="fw">2021-03-03</span></div>
                            <div> <span class="left">供应商：</span><span class="fw">11379-平湖科世科</span></div>
                            <div> <span class="left">Kick-off⽇期：</span><span class="fw">冻结</span></div>
                            <div> <span class="left">1st Tryout⽇期：</span><span class="fw">-0.92</span></div>
                            <div> <span class="left">OTS⽇期：</span><span class="fw">-</span></div>
                            <div> <span class="left">EM⽇期：</span><span class="fw">-</span></div>
                            <div> <span class="left">AEKO状态：</span><span class="fw">2019-10-10</span></div>
                            <div> <span class="left">Δ 价格：</span><span class="fw">2019-10-10</span></div>
                            <div> <span class="left">Δ 模具：</span><span class="fw">-</span></div>
                            <div> <span class="left">Δ 送样价格：</span><span class="fw">-</span></div>
                        </div>

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
                status: false,
                options: [],
                dataList: [
                    {
                        name: '寻源',
                        time: '2019-03-07',
                        active: false,
                        remark: ''
                    },
                    {
                        name: 'LOI',
                        time: '2019-03-07',
                        active: false,
                        remark: ''
                    },
                    {
                        name: '配附件定点',
                        time: '2019-03-07',
                        active: false,
                        remark: ''
                    },
                    {
                        name: '定点',
                        time: '2019-03-07',
                        active: false,
                        remark: '定点'
                    },
                    {
                        name: 'Kick-off',
                        time: '2019-03-07',
                        active: false,
                        remark: ''
                    },
                    {
                        name: 'AEKO 1',
                        time: '2019-03-07',
                        active: false,
                        remark: ''
                    },
                    {
                        name: '寻源',
                        time: '2019-03-07',
                        active: false,
                        remark: ''
                    },
                    {
                        name: '定点',
                        time: '2019-03-07',
                        active: false,
                        remark: 'AEKO'
                    },
                    {
                        name: 'AEKO 2',
                        time: '2019-03-07',
                        active: false,
                        remark: ''
                    },
                    {
                        name: 'AEKO 3',
                        time: '2019-03-07',
                        active: false,
                        remark: ''
                    },

                ],
                list: [
                    {
                        name: 'AEKO 1',
                        status: false
                    },
                    {
                        name: 'AEKO 2',
                        status: false
                    },
                    {
                        name: 'AEKO 3',
                        status: false
                    },
                    {
                        name: 'AEKO 4',
                        status: false
                    },

                ],
                actived: true
            };
        },
        computed: {},
        methods: {
            showClick() {
                this.status = !this.status
                this.list.map(item => item.status = false)
                this.actived = false
            },
            activeClick(index) {
                this.list.map(item => item.status = false)
                this.list[index].status = true
                this.actived = true
            },
        },
    };
</script>

<style scoped lang="scss">
    .box-card {
        margin-left: 20px;
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
            .box {
                vertical-align: top;
                margin-top: 50px;
                width: 120px;
                display: inline-block;
                border-right: solid 2px #ddd;
                text-align: right;
                padding-right: 20px;
                .item {
                    cursor: pointer;
                    position: relative;
                    .xianicon1 {
                        width: 10px;
                        height: 5px;
                        border-radius: 2px;
                        position: absolute;
                        right: -26px;
                        top: -10px;
                        background-color: #ddd;
                    }
                    .xianicon {
                        width: 10px;
                        height: 5px;
                        border-radius: 2px;
                        position: absolute;
                        right: -26px;
                        top: 10px;
                        background-color: #ddd;
                    }
                    .xianicon2 {
                        width: 10px;
                        height: 5px;
                        border-radius: 2px;
                        position: absolute;
                        right: -26px;
                        top: 10px;
                        background-color: #ddd;
                    }
                    .active-icon {
                        width: 10px;
                        height: 20px;
                        border-radius: 2px;
                        position: absolute;
                        right: -26px;
                        top: -5px;
                        background-color: #8bb1fb;
                    }
                    .xian-icon {
                        width: 10px;
                        height: 5px;
                        border-radius: 2px;
                        position: absolute;
                        right: -26px;
                        top: 0px;
                        background-color: #ddd;
                    }
                }

                div {
                    font-weight: 600;
                    font-size: 16px;
                    height: 24px;
                    line-height: 24px;
                    margin-top: 10px;
                }
                div:first-child {
                    margin-top: 0px;
                }

            }
            .box1 {
                vertical-align: top;
                position: relative;
                height: 828px;
                width: 450px;
                margin-top: 50px;
                display: inline-block;
                overflow-y: scroll;
                padding-bottom: 50px;
                padding-left: 80px;
                .flex {
                    .item {
                        border-right: 5px solid rgb(115, 159, 246);
                        padding-right: 20px;
                        font-size: 16px;
                        font-weight: bold;
                        div {
                            position: relative;
                            height: 100px;
                            .icon {
                                position: absolute;
                                right: -35px;

                            }
                        }

                    }
                    .item1 {
                        padding-left: 20px;
                        font-size: 16px;
                        font-weight: bold;
                        div {
                            height: 100px;
                            .sour {
                                background-color: rgb(100, 200, 212);
                                padding: 0 10px;
                                display: inline-block;
                                margin-left: 10px;
                                color: #fff;
                                font-size: 14px;
                                border-radius: 5px;
                            }
                        }
                    }
                }

            }
            .box2 {
                display: inline-block;
                margin-top: 50px;
                margin-left: 50px;
                .title {
                    font-weight: bold;
                    .icon {
                        display: inline-block;
                        vertical-align: top;
                        width: 10px;
                        height: 16px;
                        background-color: #1763f7
                    }
                    .text {
                        position: relative;
                        top: -5px;
                        left: 5px
                    }
                    color: #1763f7;
                    font-size: 20px;
                }
                .container {
                    font-weight: 600;
                    font-size: 16px;
                    padding-left: 20px;
                    margin: 20px auto;
                    div{
                        line-height: 60px;
                        height: 60px;
                        span{
                            display: inline-block;
                            width: 200px;
                        }
                    }
                }
            }
        }
    }

    .actived {
        color: #8bb1fb;
    }

    .blue {
        color: #8bb1fb;
    }

    ::v-deep .el-form-item {
        margin-bottom: 0px;
    }

    .actived {
        font-weight: 600;
    }

    ::-webkit-scrollbar { /*滾動條整體樣式*/
        width: 3px; /*高寬分別對應橫豎滾動條的尺寸*/
        height: 5px;
    }

    ::-webkit-scrollbar-thumb { /*滾動條里面小方塊*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px transparent;
        background: rgba(171, 208, 254, .5);
    }

    ::-webkit-scrollbar-track { /*滾動條里面軌道*/
        -webkit-box-shadow: inset 0 0 5px transparent;
        border-radius: 5px;
        background: rgba(171, 208, 254, .2);
    }
</style>
