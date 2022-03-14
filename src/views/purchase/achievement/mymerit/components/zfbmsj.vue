<template>
    <div id='powerBi'></div>
</template>

<script>
  import {getPowerBiVal} from '@/api/achievement'
  import * as pbi from 'powerbi-client';

  export default {
    props: ['username'],
    data() {
      return {
        formData: {
          cleintId: '66e3fa4b-152e-4bfb-8a9d-18b820459df1',
          tenantId: '8716a3b9-b827-484b-92ad-ed90aaf4d707',
          clientSecret: '6cpyeTY~dAmL-Uub2X8Om30Mm2EUk-d.TS',
          workspaceId: process.env.EKL_BAOBIAO_PARAMS.zfbmsj.workspaceId,
          reportId: process.env.EKL_BAOBIAO_PARAMS.zfbmsj.reportId,
          datasets: process.env.EKL_BAOBIAO_PARAMS.zfbmsj.datasets,
          username: '',
          roles: [],
        },
      };
    },

    mounted() {
      // 部长 部长助理 || 部长助理or采购员 部门视图
      this.$emit('getData', this.formData)
    },
  };
</script>

