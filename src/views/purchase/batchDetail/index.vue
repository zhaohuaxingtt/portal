<template>
    <keep-alive>
        <component :is="currentView"></component>
    </keep-alive>

</template>

<script>
    import baseTable from './baseTable';
    import trackTable from './trackTable';
    import spareBaseTable from './spareBaseTable';
    import spareTrackTable from './spareTrackTable';
    export default {
        components: {
            baseTable,
            trackTable,
            spareBaseTable,
            spareTrackTable
        },
        data() {
            return {
                currentView:''
            };
        },
        mounted() {
            const {title,version,id,billType,type} = this.$route.query
            if(billType == 1&&type==1) { // 基础 批量件
                this.currentView = 'baseTable'
            }
            if(billType == 2&&type==1) { // 追踪 批量件
                this.currentView = 'trackTable'
            }
            if(billType == 1&&type==2) { // 基础 配附件
                this.currentView = 'spareBaseTable'
            }
            if(billType == 2&&type==2) { // 追踪 配附件
                this.currentView = 'spareTrackTable'
            }
        },
        methods: {
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
