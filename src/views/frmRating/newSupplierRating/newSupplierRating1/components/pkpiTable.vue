<!--
 * @Author: zbin
 * @Date: 2021-05-21 10:39:35
 * @Descripttion: your project
-->
<template>
  <iCard collapse :title="$t('SPR_FRM_XGYSPJ_GYSZRPGMX_DFZB')">
    <pkpiTable1 v-bind="$attrs" v-on="$listeners" />
    <pkpiTable2 v-bind="$attrs" v-on="$listeners" ref="pkpiTable2" />
    <pkpiTable3 v-bind="$attrs" v-on="$listeners" />
  </iCard>
</template>

<script>
import { iCard } from 'rise';
import { pageMixins } from '@/utils/pageMixins';
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import pkpiTable1 from "./pkpiTable1";
import pkpiTable2 from "./pkpiTable2";
import pkpiTable3 from "./pkpiTable3";

export default {
  mixins: [pageMixins, generalPageMixins],
  components: {
    iCard,
    pkpiTable1,
    pkpiTable2,
    pkpiTable3,
  },
  data() {
    return {
      tableListData: [],
      pkpiTable1ListData: [],
      tableLoading: false,
    };
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
