<template>
  <div id="powerBi"></div>
</template>

<script>
import { getPowerBiVal } from '@/api/achievement'
import { EKL_BAOBIAO_PARAMS } from '@/constants'
import * as pbi from 'powerbi-client'

export default {
  data() {
    return {
      formData: {
        cleintId: '66e3fa4b-152e-4bfb-8a9d-18b820459df1',
        tenantId: '8716a3b9-b827-484b-92ad-ed90aaf4d707',
        clientSecret: '6cpyeTY~dAmL-Uub2X8Om30Mm2EUk-d.TS',
        workspaceId:
          EKL_BAOBIAO_PARAMS[process.env.NODE_ENV].wfbmsj.workspaceId,
        reportId: EKL_BAOBIAO_PARAMS[process.env.NODE_ENV].wfbmsj.reportId,
        datasets: EKL_BAOBIAO_PARAMS[process.env.NODE_ENV].wfbmsj.datasets,
        username: this.$store.state.permission.userInfo.id,
        roles: []
      }
    }
  },
  mounted() {
    // let roleList = this.$store.state.permission.userInfo.roleList
    // if(roleList.length == 1 && roleList.some(item =>item.code == 'CGBZ')) {
    //     this.formData.username = this.$store.state.permission.userInfo.id;
    // }
    this.$emit('getData', this.formData)
  }
}
</script>
