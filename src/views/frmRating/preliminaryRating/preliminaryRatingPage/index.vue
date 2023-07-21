<template>
  <iPage class="preliminaryRatingPage">
    <headerNav/>
    <theSearch @getTableList="getTableList" class="margin-bottom20" name="theSearch"/>
    <theTable ref="theTable"/>
  </iPage>
</template>

<script>
import {iPage} from 'rise'
import headerNav from '../components/headerNav'
import theSearch from './components/theSearch';
import theTable from './components/theTable';

export default {
  components: {
    iPage,
    headerNav,
    theSearch,
    theTable
  },
  data() {
    return {};
  },
  methods: {
    getTableList() {
      this.$refs.theTable.handleSearch();
    }
  }
};
</script>

<style scoped lang="scss">
.preliminaryRatingPage{
  position: relative;
  display: flex;
  flex-flow: column;
  height: 100%;
  ::v-deep .table-card {
    flex: 1;
    overflow: hidden;
    min-height: 400px;
    display: flex;
    flex-flow: column;
    .card-body-box {
      flex: 1;
      overflow: hidden;
      .cardBody {
        display: flex;
        flex-flow: column;
      }
      .table-box {
        flex: 1;
        display: flex;
        flex-flow: column;
        overflow: hidden;
        .i-table-custom{
          flex: 1;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
