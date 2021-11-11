<template>
  <iPage>
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
</style>
