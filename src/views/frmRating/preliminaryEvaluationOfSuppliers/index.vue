<template>
  <iPage>
    <div class="margin-bottom20 clearFloat">
      <span class="font20 font-weight">
        {{ $t('SPR_FRM_CBPJ_GYSCPQK') }}
      </span>
      <div class="floatright">
        <iButton @click="openInitialCommentOnHistory">{{ $t('SPR_FRM_CBPJ_LSCP') }}</iButton>
      </div>
    </div>
    <supplierInformation
     class="margin-bottom20"
      ref="supplierInformation" />
    <detailedScore />
    <initialCommentOnHistoryDialog
     :supplierId="supplierId"
      v-model="initialCommentOnHistoryDialog" />
    <riskSignalTable />
  </iPage>
</template>

<script>
import { iPage, iButton } from 'rise';
import supplierInformation from './components/supplierInformation';
import detailedScore from './components/detailedScore';
import initialCommentOnHistoryDialog from './components/initialCommentOnHistoryDialog';
import riskSignalTable from "./components/riskSignalTable.vue";
export default {
  components: {
    iPage,
    iButton,
    supplierInformation,
    detailedScore,
    initialCommentOnHistoryDialog,
    riskSignalTable
  },
  data() {
    return {
      initialCommentOnHistoryDialog: false,
      supplierId: '',
    };
  },
  methods: {
    openInitialCommentOnHistory() {
      this.initialCommentOnHistoryDialog = true;
      this.supplierId = this.$refs.supplierInformation.detail.supplierId;
    },
  },
};
</script>

<style scoped>
</style>
