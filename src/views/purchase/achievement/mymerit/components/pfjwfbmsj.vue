<template>
    <div id='powerBi'></div>
</template>

<script>
  import {getPowerBiVal} from '@/api/achievement'
  import * as pbi from 'powerbi-client';
  import { EKL_BAOBIAO_PARAMS } from '@/constants';

  export default {
    data() {
      return {
        formData: {
          cleintId: '66e3fa4b-152e-4bfb-8a9d-18b820459df1',
          tenantId: '8716a3b9-b827-484b-92ad-ed90aaf4d707',
          clientSecret: '6cpyeTY~dAmL-Uub2X8Om30Mm2EUk-d.TS',
          workspaceId: EKL_BAOBIAO_PARAMS[process.env.NODE_ENV].pfjwfbmsj.workspaceId,
          reportId: EKL_BAOBIAO_PARAMS[process.env.NODE_ENV].pfjwfbmsj.reportId,
          datasets: EKL_BAOBIAO_PARAMS[process.env.NODE_ENV].pfjwfbmsj.datasets,
          username: this.$store.state.permission.userInfo.id,
          roles: ['cs_permission', 'dept_permission'],
        },
      }
    },
    mounted() {
      this.$emit('getData', this.formData)
    },

  };
</script>

