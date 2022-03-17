<template>
  <div id="powerBi"></div>
</template>

<script>
import { getPowerBiVal } from '@/api/achievement'
import { EKL_BAOBIAO_PARAMS } from '@/constants'
import * as pbi from 'powerbi-client'

export default {
  props: ['username'],
  data() {
    return {
      formData: {
        cleintId: '66e3fa4b-152e-4bfb-8a9d-18b820459df1',
        tenantId: '8716a3b9-b827-484b-92ad-ed90aaf4d707',
        clientSecret: '6cpyeTY~dAmL-Uub2X8Om30Mm2EUk-d.TS',
        workspaceId: EKL_BAOBIAO_PARAMS[process.env.NODE_ENV].zfgsj.workspaceId,
        reportId: EKL_BAOBIAO_PARAMS[process.env.NODE_ENV].zfgsj.reportId,
        datasets: EKL_BAOBIAO_PARAMS[process.env.NODE_ENV].zfgsj.datasets,
        username: process.env.NODE_ENV !== 'production' ? this.username : '',
        roles:
          process.env.NODE_ENV !== 'production'
            ? ['dept_permission']
            : ['dept_permission']
      }
    }
  },
  mounted() {
    this.$emit('getData', this.formData)
  }
}
</script>
