<template>
    <iDialog
            title="E12354-2023-06-10"
            :visible.sync="display"
            width="90%"
            :close-on-click-modal="false"
    >
        <div class="content">
            <el-form>
                <el-form-item class="fw" :label="$t('EKL_JIAGEBIANHUA')">
                    <iSelect style="width: 140px;height: 30px; font-size: 12px;"
                             filterable
                             :placeholder="language('请选择')"
                             v-model="gc_code">
                        <el-option
                                :value="item.code"
                                :label="item.name"
                                v-for="item,index in options"
                                :key="index">
                        </el-option>
                    </iSelect>
                </el-form-item>
            </el-form>
            <div class="content-box">
                <div class="">
                    <div class="box" :style="width + 'px'">
                        <div class="item" :class="item.active?'actived':''"  :key="index" v-for="item,index in dataList">
                            <p v-text="item.date"></p>
                            <p class="mt10" v-text="item.code"></p>
                        </div>
                    </div>
                    <div class="row" :style="rowidth + 'px'">
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
                <div class="mt80">
                    <div class="box pl150" :style="width + 'px'">
                        <div class="item" :class="item.active?'actived':''"  :key="index" v-for="item,index in dataList1">
                            <p v-text="item.date"></p>
                            <p class="mt10" v-text="item.code"></p>
                        </div>
                    </div>
                    <div class="row" style="margin-left: 115px" :style="rowidth1 + 'px;'">
                        <div class="items" :style="index==0?'padding-left:65px':'padding-left:126px'" :key="index" v-for="item,index in dataList1">
                            <icon class="icon f24" symbol :name="item.active?'icon-lingjian5':'icon-lingjian1'"/>
                        </div>

                    </div>
                    <div class="box pl150" :style="width + 'px'">
                        <div class="item mt20" :class="item.active?'actived bule':''"  v-text="item.partNumber" :key="index" v-for="item,index in dataList1"></div>
                    </div>
                    <div class="box mb10 pl150" :style="width + 'px;padding-bottom:10px'">
                        <div class="item mt20" :key="index" v-for="item,index in dataList1">
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
                <div class="mt80 mb30">
                    <div class="box pl150" :style="width + 'px'">
                        <div class="item" :class="item.active?'actived':''"  :key="index" v-for="item,index in dataList1">
                            <p v-text="item.date"></p>
                            <p class="mt10" v-text="item.code"></p>
                        </div>
                    </div>
                    <div class="row" style="margin-left: 115px" :style="rowidth1 + 'px;'">
                        <div class="items" :style="index==0?'padding-left:65px':'padding-left:126px'" :key="index" v-for="item,index in dataList1">
                            <icon class="icon f24" symbol :name="item.active?'icon-lingjian5':'icon-lingjian1'"/>
                        </div>

                    </div>
                    <div class="box pl150" :style="width + 'px'">
                        <div class="item mt20" :class="item.active?'actived bule':''"  v-text="item.partNumber" :key="index" v-for="item,index in dataList1"></div>
                    </div>
                    <div class="box mb10 pl150" :style="width + 'px;padding-bottom:10px'">
                        <div class="item mt20" :key="index" v-for="item,index in dataList1">
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
                <div class="leftborder"></div>
            </div>


        </div>
    </iDialog>
</template>

<script>
    import {iButton, icon, iSelect, iDialog} from 'rise';

    export default {
        components: {
            iButton,
            iSelect,
            icon,
            iDialog,
        },
        props: {
            display: {
                type: Boolean,
            }
        },
        computed:{
            width() {
                return 'width:' + (this.dataList.length*150)
            },
            rowidth() {
                return 'width:' + ((this.dataList.length-1)*150)
            },
            rowidth1() {
                return 'width:' + ((this.dataList.length-1)*150-60)
            }
        },
        data() {
            return {
                options: [
                    {
                        code: '1000',
                        name: '1000-上海⼯⼚'
                    }
                ],
                gc_code:'',
                dataList: [
                    {
                        date: '',
                        code: '',
                        aeko: '',
                        amount: '',
                        partNumber: '11D930185F',
                    },
                    {
                        date: '2019-09-01',
                        code: 'E12345',
                        aeko: '40.1/40.1',
                        amount: 'Δ 100Mio.',
                        partNumber: '11D930185F',
                    },
                    {
                        date: '2019-09-01',
                        code: 'E12345',
                        aeko: '40.1/40.1',
                        amount: 'Δ 100Mio.',
                        partNumber: '11D930185F',
                    },
                    {
                        date: '2019-09-01',
                        code: 'E12345',
                        aeko: '40.1/40.1',
                        amount: 'Δ 100Mio.',
                        partNumber: '11D930185F',
                    },
                    {
                        date: '2019-09-01',
                        code: 'E12345',
                        aeko: '40.1/40.1',
                        amount: 'Δ 100Mio.',
                        partNumber: '11D930185F',
                    },
                    {
                        date: '2019-09-01',
                        code: 'E12345',
                        aeko: '40.1/40.1',
                        amount: 'Δ 100Mio.',
                        partNumber: '11D930185F',
                    },
                    {
                        date: '2019-09-01',
                        code: 'E12345',
                        aeko: '40.1/40.1',
                        amount: 'Δ 100Mio.',
                        partNumber: '11D930185F',
                    },
                    {
                        date: '2019-09-01',
                        code: 'E12345',
                        aeko: '40.1/40.1',
                        amount: 'Δ 100Mio.',
                        partNumber: '11D930185F',
                    },
                    {
                        date: '2020-05-01',
                        code: 'E12346',
                        aeko: '41.1/40.1',
                        amount: 'Δ 200Mio.',
                        partNumber: '11D960185F',
                    },
                    {
                        date: '2021-11-01',
                        code: 'E12347',
                        aeko: '42.1/40.1',
                        amount: 'Δ 300Mio.',
                        partNumber: '11D970135F',
                    },
                    {
                        date: '2021-02-01',
                        code: 'E12348',
                        aeko: '43.1/40.1',
                        amount: 'Δ 400Mio.',
                        partNumber: '11D370185F',
                    },
                    {
                        date: '2021-02-01',
                        code: 'E12348',
                        aeko: '43.1/40.1',
                        amount: 'Δ 400Mio.',
                        partNumber: '11D370185F',
                    },

                ],
                dataList1: [

                    {
                        date: '2019-09-01',
                        code: 'E12345',
                        aeko: '40.1/40.1',
                        amount: 'Δ 100Mio.',
                        partNumber: '11D930185F',
                    },
                    {
                        date: '2019-09-01',
                        code: 'E12345',
                        aeko: '40.1/40.1',
                        amount: 'Δ 100Mio.',
                        partNumber: '11D930185F',
                    },
                    {
                        date: '2019-09-01',
                        code: 'E12345',
                        aeko: '40.1/40.1',
                        amount: 'Δ 100Mio.',
                        partNumber: '11D930185F',
                    },
                    {
                        date: '2019-09-01',
                        code: 'E12345',
                        aeko: '40.1/40.1',
                        amount: 'Δ 100Mio.',
                        partNumber: '11D930185F',
                    },
                    {
                        date: '2019-09-01',
                        code: 'E12345',
                        aeko: '40.1/40.1',
                        amount: 'Δ 100Mio.',
                        partNumber: '11D930185F',
                    },
                    {
                        date: '2019-09-01',
                        code: 'E12345',
                        aeko: '40.1/40.1',
                        amount: 'Δ 100Mio.',
                        partNumber: '11D930185F',
                    },
                    {
                        date: '2019-09-01',
                        code: 'E12345',
                        aeko: '40.1/40.1',
                        amount: 'Δ 100Mio.',
                        partNumber: '11D930185F',
                    },
                    {
                        date: '2020-05-01',
                        code: 'E12346',
                        aeko: '41.1/40.1',
                        amount: 'Δ 200Mio.',
                        partNumber: '11D960185F',
                    },
                    {
                        date: '2021-11-01',
                        code: 'E12347',
                        aeko: '42.1/40.1',
                        amount: 'Δ 300Mio.',
                        partNumber: '11D970135F',
                    },
                    {
                        date: '2021-02-01',
                        code: 'E12348',
                        aeko: '43.1/40.1',
                        amount: 'Δ 400Mio.',
                        partNumber: '11D370185F',
                    },
                    {
                        date: '2021-02-01',
                        code: 'E12348',
                        aeko: '43.1/40.1',
                        amount: 'Δ 400Mio.',
                        partNumber: '11D370185F',
                    },

                ],
            };
        },
        methods: {
            getTableList() {
                this.$refs.theTable.getTableList();
            },
            clickItem(index) {
                this.dataList.map(item => {
                    item.active ? item.active = false : ''
                })
                this.$set(this.dataList[index], 'active', true)
            }

        },
    };
</script>

<style scoped lang="scss">
    .content{
        margin-top: 20px;
        height: 800px;

        .content-box{
            width:100%;
            overflow-x: scroll;
            display: inline-block;
            margin: 0 auto;
            position: relative;
            .leftborder{
                position: absolute;
                top:82px;
                left:115px;
                width: 5px;
                height: 515px;
                background-color: #8bb1fb;
            }
            .box {
                margin-left: -30px;
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
                margin: 30px 0 6px 30px;
                position: relative;
                .item {
                    width: 150px;
                    display: inline-block;
                    position: relative;
                    top: -10px
                }
                .item:last-child{
                    width:24px;
                    display:block;
                    height: 24px;
                    position: absolute;
                    top: -10px;
                    right: -24px;
                }
                .items{
                    display: inline-block;
                    position: relative;
                    top: -10px
                }
            }
        }
    }
    .pl150{
        padding-left: 150px;
    }
    .actived{
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