<template>
  <iPage>
    <div class="navBox">
      {{$t('EKL_YJGL_PLJYSCLGL')}}
    </div>
    <theTable ref="theTable"/>

    <!--查看模型-->
    <viewModelDialog
        v-model="viewModelDialog"
    />
  </iPage>
</template>

<script>
import {iPage, iNavMvp, iButton} from 'rise';
import theTable from './components/theTable';
import {tabRouterList} from './data';

export default {
  components: {
    iPage,
    iNavMvp,
    iButton,
    theTable,
  },
  data() {
    return {
      tabRouterList,
    };
  },
  methods: {
    getTableList() {
      this.$refs.theTable.handleSearch();
    }
  },
};
</script>

<style scoped lang="scss">
.navBox {
  margin-bottom: 20px;
  font-size: 16px;
  font-weight: 700;

}

</style>
