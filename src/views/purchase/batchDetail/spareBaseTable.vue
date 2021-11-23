<template>

    <iPage>
        <!--配附件基础表-->
        <div class="title"><span v-text="title"></span></div>
        <div class="card1">
            <iCard class="item">
                <div class="status">
                    <div class="status-value" :class="headBase&&headBase.status=='已完成'?'blue':'red'"><span v-text="headBase&&headBase.divide"></span> </div>
                    <div class="status-text">
                       <span v-text="$t('EKL_DQZT') +':'"></span>
                       <span v-text="headBase&&headBase.status? headBase.status:$t('EKL_WWC')"></span></div>
                    <icon class="icon" symbol name="iconyejijichubiaozhuangtai" />
                </div>
            </iCard>
            <iCard class="item">
                <div class="status">
                    <div class="status-value blue" > <span v-text="headBase&&headBase.startingTime"></span> </div>
                    <div class="status-text"><span v-text="$t('EKL_FQSJ')"></span></div>
                    <icon class="icon" symbol name="iconyejijichubiaofaqishijian" />
                </div>
            </iCard>
            <iCard class="item">
                <div class="status">
                    <div class="status-value blue"><span v-text="headBase&&headBase.completionTime"></span></div>
                    <div class="status-text"> <span v-text="$t('EKL_WCSJ')"></span> </div>
                    <icon class="icon" symbol name="iconyejijichubiaowanchengshijian" />
                </div>
            </iCard>
            <iCard class="item">
                <div class="status">
                    <div class="status-value" :class="headBase&&headBase.status=='已完成'?'blue':'red'"><span v-text="headBase&&headBase.isConfirmSize"></span> </div>
                    <div class="status-text"><span v-text="$t('EKL_DQESL')"></span></div>
                    <icon class="icon" symbol name="iconyejijichubiaodaiquerenshuliang1" />
                </div>
            </iCard>
        </div>
        <div style="margin-top: 20px;">
            <theSearch ref="theSearch" @getTableList="getTableList" @getForm="getForm" class="margin-bottom20" name="theSearch"/>
        </div>
        <div style="margin-top: 20px;">
            <theTable ref="theTable" :formData="formData" :title="title" @getHaedData="getHeadDetail"></theTable>
        </div>

    </iPage>

</template>

<script>
    import {iPage, iNavMvp, iButton,icon, iCard} from 'rise';
    import theSearch from './spareBaseTableComponent/theSearch';
    import theTable from './spareBaseTableComponent/theTable';
    import {getHeadspBaseDetail} from '@/api/achievement';// 头部数据

    export default {
        components: {
            iPage,
            iNavMvp,
            iButton,
            icon,
            iCard,
            theSearch,
            theTable,
        },
        data() {
            return {
                title: "",
                headBase:null,
                formData:{},
            };
        },
        mounted() {
            const {billType} = this.$route.query
            if(billType == 1) {
                this.getHeadDetail()
            }
        },
        methods: {
            getTableList(data) {
                this.$refs.theTable.handleSearch();
            },
            getForm(data) {
                this.formData = data
            },
            getHeadDetail() {
                this.$refs.theTable.handleSearch();
                const {title,id} = this.$route.query
                this.title = title
                getHeadspBaseDetail({seriesbaseId:id}).then(res => {
                    if(res.result) {
                        this.headBase = res.data
                    }
                })
            }
        },
    };
</script>

<style scoped lang="scss">
    .title {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
        height: 30px;
        color: #000;
    }

    .card1 {
        display: flex;
        height: 130px;
        .item {
            flex: 1;
            margin-right: 20px;
            position: relative;
            .icon {
                position: absolute;
                right: 40px;
                top: 26px;
                width: 78px;
                height: 78px;

                background-color: #E8F0FF;
                background-size: 42px 47px;
                background-repeat: no-repeat;
                background-position: 18px 15px;
                border-radius: 5px;
            }
        }
    }

    .card1 :last-child {
        margin-right: 0px;
    }

    .status-value {
        font-size: 42px;
        font-weight: bold;
        position: relative;
        top: -10px;
    }

    .blue {
        color: #1761F1;
    }

    .red {
        color: #D12A2A;
    }

    .status-text {
        font-size: 16px;
        color: #798489;
        position: absolute;
        bottom: 30px;
    }
</style>
