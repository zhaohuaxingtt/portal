<template>
  <iPage>
    <div class="navBox">
      <iNavMvp :list="tabRouterList" class="margin-bottom20" routerPage :lev="1"/>
      <div class="btnRow">
        <!--发起初评清单-->
        <iButton @click="initiateAPreliminaryReviewList" v-permission="PORTAL_SUPPLIER_NAV_FRMZONGHEGUANLI_FQCPQD">{{ $t('SPR_FRM_FRMGL_FQCPQD') }}</iButton>
        <!--待确认初评清单-->
        <iButton @click="openToBeConfirmedList" v-permission="PORTAL_SUPPLIER_NAV_FRMZONGHEGUANLI_DQRCPQD">{{ $t('SPR_FRM_FRMGL_DQRCPQD') }}</iButton>
        <!--查看模型-->
        <iButton @click="openViewModel" v-permission="PORTAL_SUPPLIER_NAV_FRMZONGHEGUANLI_CHAKANMOXING">{{ $t('SPR_FRM_FRMGL_CKMX') }}</iButton>
      </div>
    </div>
    <theSearch @getTableList="getTableList" class="margin-bottom20" name="theSearch"/>
    <theTable ref="theTable"/>
    <!--待确认初评清单-->
    <confirmedPreliminaryReviewListDialog
        v-model="confirmedPreliminaryReviewListDialog"
    />
    <!--查看模型-->
    <viewModelDialog
        v-model="viewModelDialog"
    />
  </iPage>
</template>

<script>
import {iPage, iNavMvp, iButton} from 'rise';
import theSearch from './components/theSearch';
import theTable from './components/theTable';
import {tabRouterList} from '../data';
import confirmedPreliminaryReviewListDialog from './components/confirmedPreliminaryReviewListDialog';
import viewModelDialog from './components/viewModelDialog';

export default {
  components: {
    iPage,
    iNavMvp,
    iButton,
    theSearch,
    theTable,
    confirmedPreliminaryReviewListDialog,
    viewModelDialog,
  },
  data() {
    return {
      tabRouterList,
      confirmedPreliminaryReviewListDialog: false,
      viewModelDialog: false,
    };
  },
  methods: {
    getTableList() {
      this.$refs.theTable.handleSearch();
    },
    initiateAPreliminaryReviewList() {
      const {href} = this.$router.resolve({
        path: '/supplier/frmrating/frmintegratedmanagement/initiateapreliminaryrating',
      });
      window.open(href);
    },
    openToBeConfirmedList() {
      this.confirmedPreliminaryReviewListDialog = true;
    },
    openViewModel() {
      this.viewModelDialog = true;
    },
  },
};
</script>

<style scoped lang="scss">
.navBox {
  position: relative;

  .btnRow {
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>
