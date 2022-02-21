<template>
    <div id='powerBi'></div>
</template>

<script>
  import {getPowerBiVal} from '@/api/achievement'
  import * as pbi from 'powerbi-client';

  export default {
    data() {
      return {
        formData: {
          cleintId: '66e3fa4b-152e-4bfb-8a9d-18b820459df1',
          tenantId: '8716a3b9-b827-484b-92ad-ed90aaf4d707',
          clientSecret: '6cpyeTY~dAmL-Uub2X8Om30Mm2EUk-d.TS',
           workspaceId: process.env.NODE_ENV !== 'UAT' ? 'addf20a8-7f65-445c-a737-0f636f428e76' : '876776a9-f959-442e-a011-b4bade0dd862',
          reportId: process.env.NODE_ENV !== 'UAT' ? 'c272ae69-a6b4-4407-bd0e-f67953de36ce' : 'f8d1c804-6583-4574-ba06-1f591aa58cd4',
          datasets: process.env.NODE_ENV !== 'UAT' ? ['0571b1ad-b958-4057-aff9-7b9239c811b6'] : ['addf20a8-7f65-445c-a737-0f636f428e76'],
          username: '5',
          roles: ['cs_permission', 'dept_permission'],
        },
      }
    },
    mounted() {
      this.$emit('getData', this.formData)
    },

  };
</script>

