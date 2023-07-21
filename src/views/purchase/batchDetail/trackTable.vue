<template>

    <iPage class="tarck-table">
        <div class="title"><span v-text="title"></span></div>
        <div class="card1">
            <iCard class="item">
                <div class="status">
                    <div class="status-value blue"><span v-text="headBase&&headBase.calcDate"></span> </div>
                    <div class="status-text"><span v-text="$t('LK_SJJSJZSJ')"></span></div>
                    <icon class="icon" symbol name="iconyejijichubiaodaiquerenshuliang1" />
                </div>
            </iCard>
            <iCard class="item">
                <div class="status">
                    <div class="status-value success"> <span v-text="headBase&&headBase.totalNum"></span> </div>
                    <div class="status-text"><span v-text="$t('LK_GZLJZS')"></span></div>
                    <icon class="icon" symbol name="iconyejijichubiaowanchengshijian" />
                </div>
            </iCard>
            <iCard class="item">
                <div class="status">
                    <div class="status-value blue"><span v-text="headBase&&headBase.addNum"></span></div>
                    <div class="status-text"><span v-text="$t('LK_XZLJZS')"></span> </div>
                    <icon class="icon" symbol name="iconyejigenzongbiaoxinzenglingjian" />
                </div>
            </iCard>
            <iCard class="item">
                <div class="status">
                    <div class="status-value grey"><span v-text="headBase&&headBase.delNum"></span> </div>
                    <div class="status-text"><span v-text="$t('LK_QXLJZS')"></span></div>
                    <icon class="icon" symbol name="iconyejigenzongbiaoquxiaolingjian" />
                </div>
            </iCard>
        </div>
        <div style="margin-top: 20px;">
            <theSearch ref="theSearch" @getTableList="getTableList" @getForm="getForm" class="margin-bottom20" name="theSearch"/>
        </div>
        <theTable ref="theTable" class="table-card" :formData="formData" height="100%" :title="title" ></theTable>

    </iPage>

</template>

<script>
    import {iPage, iNavMvp, iButton,icon, iCard} from 'rise';
    import theSearch from './trackComponents/theSearch';
    import theTable from './trackComponents/theTable';

    import {getMonthPartlistById} from '@/api/achievement';

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
            this.getHeadDetail()
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
//                this.$refs.theTable.handleSearch();
                const {title,version,id} = this.$route.query
                let ver = version?version:'V1'
                this.title = `${title}`
                getMonthPartlistById({id}).then(res => {
                    if(res.result) {
                        this.headBase = res.data
                    }
                })
            }
        },
    };
</script>

<style scoped lang="scss">
.tarck-table{
  display: flex;
  flex-flow: column;
  height: 100%;
  .table-card {
    flex: 1;
    overflow: hidden;
    min-height: 320px;
    ::v-deep .card-body-box {
      height: 100%;
      .cardBody {
        display: flex;
        flex-flow: column;
      }
      .table-box {
        flex: 1;
        overflow: hidden;
      }
    }
  }
}
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
        position: absolute;
        bottom: 30px;
    }
</style>
