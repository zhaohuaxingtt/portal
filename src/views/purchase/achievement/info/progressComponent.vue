<template>
    <div>
        <el-card class="box-card" style="position: relative;">
            <el-button class="btn" type="text" @click="show=!show">
                <i class="el-icon-arrow-up f24" :class="show?'active':'active1'"></i>
            </el-button>
            <div class="fw f20">演变进程</div>
            <el-collapse-transition>
                <div class="content f16" v-show="show" style="position: relative">
                    <div class="left-box">
                        <div class="fw">Aeko /AeA</div>
                        <div style="margin-top: 100px;">
                            <el-form>
                                <el-form-item class="fw" :label="$t('EKL_JIAGEBIANHUA')">
                                    <iSelect style="width: 140px;height: 30px; font-size: 12px;"
                                             filterable
                                             clearable
                                             @change="changVal"
                                             :placeholder="$t('LK_QINGXUANZE')"
                                             v-model="form.code">
                                        <el-option
                                                :value="item.code"
                                                :label="item.name"
                                                v-for="item,index in options"
                                                :key="index"></el-option>
                                    </iSelect>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div class="right-box">
                        <div class="box" :style="width + 'px'">
                            <div class="item" :class="item.active?'actived':''"  :key="index" v-for="item,index in dataList">
                                <p v-text="item.date"></p>
                                <p class="mt10" v-text="item.code"></p>
                            </div>

                        </div>
                        <div class="row" :style="width + 'px'">
                            <div class="item" :key="index" v-for="item,index in dataList">
                                <icon class="icon f24" symbol :name="item.active?'icon-lingjian5':'icon-lingjian1'"/>
                            </div>

                        </div>
                        <div class="box" :style="width + 'px'">
                            <div class="item mt20" :class="item.active?'actived bule':''"  v-text="item.partNumber" :key="index" v-for="item,index in dataList"></div>
                        </div>
                        <div class="box mb10" :style="width + 'px;padding-bottom:10px'">
                            <div class="item mt20" :key="index" v-for="item,index in dataList">
                                <el-popover
                                        placement="bottom"
                                        title=""
                                        width="220"
                                        trigger="click"
                                >
                                    <ul class="tips-content f14">
                                        <li>AEKO/价格：<span v-text="item.aeko"></span></li>
                                        <li>投资⾦额：<span v-text="item.amount"></span></li>
                                        <li>原零件号：<span v-text="item.partNumber"></span></li>
                                    </ul>
                                    <div slot="reference">
                                        <div class="hover" :class="item.active?'actived bule':''" @click="clickItem(index)" v-text="item.aeko"></div>
                                    </div>
                                </el-popover>
                            </div>
                        </div>
                    </div>
                </div>
            </el-collapse-transition>
        </el-card>
        <!--改变价格模态框-->
        <changePriceModal :display="display"></changePriceModal>
    </div>

</template>

<script>
    import {iButton, icon, iSelect} from 'rise';
    import changePriceModal from './changePriceModal.vue'
    export default {
        components: {
            iButton,
            iSelect,
            icon,
            changePriceModal
        },
        data() {
            return {
                display:false,
                show: true,
                options: [
                    {
                        code: '1000',
                        name: '1000-上海⼯⼚'
                    },
                    {
                        code: '2000',
                        name: '2000-重庆⼯⼚'
                    }
                ],
                form: {
                    code: ''
                },
                dataList:[
                    {
                        date:'2019-09-01',
                        code:'E12345',
                        aeko:'40.1/40.1',
                        amount:'Δ 100Mio.',
                        partNumber:'11D930185F',
                    },
                    {
                        date:'2019-09-01',
                        code:'E12345',
                        aeko:'40.1/40.1',
                        amount:'Δ 100Mio.',
                        partNumber:'11D930185F',
                    },
                    {
                        date:'2019-09-01',
                        code:'E12345',
                        aeko:'40.1/40.1',
                        amount:'Δ 100Mio.',
                        partNumber:'11D930185F',
                    },
                    {
                        date:'2019-09-01',
                        code:'E12345',
                        aeko:'40.1/40.1',
                        amount:'Δ 100Mio.',
                        partNumber:'11D930185F',
                    },
                    {
                        date:'2019-09-01',
                        code:'E12345',
                        aeko:'40.1/40.1',
                        amount:'Δ 100Mio.',
                        partNumber:'11D930185F',
                    },
                    {
                        date:'2019-09-01',
                        code:'E12345',
                        aeko:'40.1/40.1',
                        amount:'Δ 100Mio.',
                        partNumber:'11D930185F',
                    },
                    {
                        date:'2020-05-01',
                        code:'E12346',
                        aeko:'41.1/40.1',
                        amount:'Δ 200Mio.',
                        partNumber:'11D960185F',
                    },
                    {
                        date:'2021-11-01',
                        code:'E12347',
                        aeko:'42.1/40.1',
                        amount:'Δ 300Mio.',
                        partNumber:'11D970135F',
                    },
                    {
                        date:'2021-02-01',
                        code:'E12348',
                        aeko:'43.1/40.1',
                        amount:'Δ 400Mio.',
                        partNumber:'11D370185F',
                    },
                    {
                        date:'2021-02-01',
                        code:'E12348',
                        aeko:'43.1/40.1',
                        amount:'Δ 400Mio.',
                        partNumber:'11D370185F',
                    },

                ]
            };
        },
        computed:{
            width() {
                return 'width:' + (this.dataList.length*150)
            },
        },
        methods: {
            getTableList() {
                this.$refs.theTable.getTableList();
            },
            clickItem(index) {
                this.display = false
                this.dataList.map(item => {
                    item.active? item.active = false:''
                })
                this.$set(this.dataList[index],'active',true)
            },
            changVal(val) {
                this.display = true
            },

        },
    };
</script>

<style scoped lang="scss">
    .box-card {
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
        .content{
            margin-top: 60px;
            position: relative;
            .left-box{
                display: inline-block;
                width: 240px;
            }
            .right-box{
                width: calc(100% - 240px);
                overflow-x: scroll;
                display: inline-block;
                margin: 0 auto;
                position: absolute;
                bottom: 0px;
                .box {
                    .item {
                        width: 150px;
                        text-align: center;
                        display: inline-block;
                        .hover{
                            cursor: pointer;
                        }
                    }
                }
                .row {
                    font-size: 16px;
                    height: 5px;
                    background-color: #8bb1fb;
                    border-radius: 10px;
                    margin: 30px 0 6px 65px;
                    .item {
                        width: 150px;
                        display: inline-block;
                        position: relative;
                        top: -10px
                    }
                }
            }
        }
    }
    .tips-content {
        font-weight: bold;
        font-size: 16px;
        li {
            line-height: 30px;

        }
    }
    ::v-deep .el-form-item {
        margin-bottom: 0px;
    }
    .actived{
        font-weight: 600;
    }
    ::v-deep .tablelist th tr {
        height: 39px;
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