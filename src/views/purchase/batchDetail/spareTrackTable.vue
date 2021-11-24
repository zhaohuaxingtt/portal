<template>

    <iPage>
        <!--配附件跟踪表-->
        <div class="title"><span v-text="title"></span></div>
        <div class="card1">
            <iCard class="item">
                <div class="status">
                    <span class="status-text" v-text="$t('EKL_SJJSJZSJ')"></span>
                    <span class="status-value blue" v-text="headBase&&headBase.calcDate"></span>
                    <icon class="icon" symbol name="iconyejijichubiaodaiquerenshuliang1" />
                </div>
            </iCard>
            <iCard class="item">
                <div class="status">
                    <span class="status-text" v-text="$t('EKL_GZLJZS')"></span>
                    <span class="status-value success" v-text="headBase&&headBase.sumAll"></span>
                    <icon class="icon" symbol name="iconyejijichubiaowanchengshijian" />
                </div>
            </iCard>

        </div>
        <div style="margin-top: 20px;">
            <theSearch ref="theSearch" @getTableList="getTableList" @getForm="getForm" class="margin-bottom20" name="theSearch"/>
        </div>
        <div style="margin-top: 20px;">
            <theTable ref="theTable" :formData="formData" :title="title" @setHead="getHeadDetail"></theTable>
        </div>

    </iPage>

</template>

<script>
    import {iPage, iNavMvp, iButton,icon, iCard} from 'rise';
    import theSearch from './sparetrackTableComponent/theSearch';
    import theTable from './sparetrackTableComponent/theTable';

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
                selectData:null,
            };
        },
        mounted() {
            const {title,version,id,year} = this.$route.query
            this.title = `${year}年业绩进度跟踪`
        },
        methods: {
            getTableList() {
                this.$refs.theTable.handleSearch();
            },
            getForm(data) {
                this.formData = data
            },
            setSelectData(data) {
                this.selectData = data
            },
            getHeadDetail(data) {
                this.headBase = data
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
    .status
    .status-value {
        font-size: 42px;
        font-weight: bold;
        position: relative;
        top:24px;
        padding-left: 100px;
    }

    .blue {
        color: #1761F1;
    }
    .success{
        color: #1AAA7E;
    }
    .red {
        color: #D12A2A;
    }
    .grey{
        color:#48597B;
    }
    .status-text {
        font-size: 16px;
        color: #798489;
        padding-left: 54px;
        position: relative;
        top: 16px;
    }
</style>
