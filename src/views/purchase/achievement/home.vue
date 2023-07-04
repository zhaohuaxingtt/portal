<template>
    <div class="home">
        <theSearch @getTableList="getTableList" class="margin-bottom20" name="theSearch"/>
        <theTable class="table-card" ref="theTable" height="100%"/>
    </div>
</template>

<script>
    import {iPage, iNavMvp, iButton} from 'rise';
    import theSearch from './components/theSearch';
    import theTable from './components/theTable';
    import {tabRouterList, btnsgroup1} from './data';

    export default {
        components: {
            iPage,
            iNavMvp,
            iButton,
            theSearch,
            theTable,
        },
        data() {
            return {
                tabRouterList,
                btnsgroup1,
                indexBtn: 0,
            };
        },
        mounted() {

        },
        methods: {
            getTableList() {
                this.$refs.theTable.getTableList();
            },
            exchangeSelectState(item,index) {
                this.indexBtn = index
            },
        },
    };
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-flow: column;
  height: 100%;
  .table-card {
    flex: 1;
    overflow: hidden;
    min-height: 400px;
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
</style>
