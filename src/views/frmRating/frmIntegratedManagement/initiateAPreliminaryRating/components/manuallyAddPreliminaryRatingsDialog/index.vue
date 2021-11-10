<template>
  <!--  手动添加初步评级-->
  <iDialog
      :title="$t('SPR_FRM_FRMGL_SDTJCBPJ')"
      :visible.sync="value"
      width="90%"
      @close="clearDiolog"
      :close-on-click-modal="false"
  >
    <div class="content">
      <theSearch @getTableList="getTableList" name="theSearch"/>
      <theTable ref="theTable"/>
    </div>
  </iDialog>
</template>

<script>
import {iDialog} from 'rise';
import theSearch from './components/theSearch';
import theTable from './components/theTable';

export default {
  components: {
    iDialog,
    theSearch,
    theTable,
  },
  props: {
    value: {type: Boolean},
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false);
    },
    getTableList() {
      this.$refs.theTable.handleSearch();
    },
  },
};
</script>

<style scoped lang="scss">
.content {
  padding-bottom: 40px;
}
</style>
