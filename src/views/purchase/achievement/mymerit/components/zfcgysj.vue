<template>
    <div id='powerBi'></div>
</template>

<script>
    import {getPowerBiVal} from '@/api/achievement'
    import * as pbi from 'powerbi-client';

    export default {
        props:['username'],
        data() {
            return {
                formData: {
                    cleintId: '66e3fa4b-152e-4bfb-8a9d-18b820459df1',
                    tenantId: '8716a3b9-b827-484b-92ad-ed90aaf4d707',
                    clientSecret: '6cpyeTY~dAmL-Uub2X8Om30Mm2EUk-d.TS',
                    workspaceId: process.env.NODE_ENV !== 'production' ? '876776a9-f959-442e-a011-b4bade0dd862' : '876776a9-f959-442e-a011-b4bade0dd862',
          reportId: process.env.NODE_ENV !== 'production' ? 'f8d1c804-6583-4574-ba06-1f591aa58cd4' : '06bfe2a1-4814-4dd6-a9ec-1687aa896d06',
          datasets: process.env.NODE_ENV !== 'production' ? ['addf20a8-7f65-445c-a737-0f636f428e76'] : ['b331bdd5-e6c6-4a4c-922a-0099058cf3f3'],
                    username: this.username,
                    roles: ['dept_permission'],
                },
            }
        },

        mounted() {
            this.$emit('getData', this.formData)
        },

    };
</script>
