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
                    workspaceId: process.env.EKL_BAOBIAO_PARAMS.zfcgysj.workspaceId,
                    reportId: process.env.EKL_BAOBIAO_PARAMS.zfcgysj.reportId,
                    datasets: process.env.EKL_BAOBIAO_PARAMS.zfcgysj.datasets,
                    username: this.username,
                    roles: ['dept_permission'],
                    supplier_code_name: this.supplier_code_name
                },
            }
        },

        mounted() {
            this.$emit('getData', this.formData)
        },

    };
</script>
