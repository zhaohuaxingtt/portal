<template>

    <iPage>
        <div class="title"><span v-text="title"></span></div>
        <div class="card1">
            <iCard class="item">
                <div class="status">
                    <div class="status-value blue"><span v-text="headBase&&headBase.divide"></span> </div>
                    <div class="status-text">
                       <span v-text="$t('LK_DQZT') +':'"></span>
                       <span v-text="headBase&&headBase.status == '未完成'?$t('LK_WWC'): headBase&&headBase.status == '已完成'? $t('LK_YWC'):''"></span></div>
                    <icon class="icon" symbol name="iconyejijichubiaozhuangtai" />
                </div>
            </iCard>
            <iCard class="item">
                <div class="status">
                    <div class="status-value blue"> <span v-text="headBase&&headBase.startingTime"></span> </div>
                    <div class="status-text"><span v-text="$t('LK_FQSJ')"></span></div>
                    <icon class="icon" symbol name="iconyejijichubiaofaqishijian" />
                </div>
            </iCard>
            <iCard class="item">
                <div class="status">
                    <div class="status-value blue"><span v-text="headBase&&headBase.completionTime"></span></div>
                    <div class="status-text"> <span v-text="$t('LK_WCSJ')"></span> </div>
                    <icon class="icon" symbol name="iconyejijichubiaowanchengshijian" />
                </div>
            </iCard>
            <iCard class="item">
                <div class="status">
                    <div class="status-value red"><span v-text="headBase&&headBase.isConfirmSize"></span> </div>
                    <div class="status-text"><span v-text="$t('LK_DQESL')"></span></div>
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
    import theSearch from './baseTableComponents/theSearch';
    import theTable from './baseTableComponents/theTable';

    import {
        getHeadBaseDetail, // 头部数据
    } from '@/api/achievement';

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
            const {billType} = this.$route.query
            if(billType == 1) {
                this.getHeadDetail()
            }
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
            getHeadDetail() {
                this.$refs.theTable.handleSearch();
                const {title,version,id} = this.$route.query
                let ver = version?version:'V1'
                this.title = `${title}（产量版本：${ver}）`
                getHeadBaseDetail({seriesbaseId:id}).then(res => {
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
