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
                    workspaceId: process.env.NODE_ENV !== 'production' ? 'c272ae69-a6b4-4407-bd0e-f67953de36ce' : '876776a9-f959-442e-a011-b4bade0dd862',
          reportId: process.env.NODE_ENV !== 'production' ? '02151d5a-899c-4880-93af-20a6efe8765b' : 'f3fe9132-dda7-4a9e-81ff-eac032974cfe',
          datasets: process.env.NODE_ENV !== 'production' ? ['61525451-7923-46ca-bee0-6c3dfb969b6f'] : ['4b849a8e-6f67-4fab-a6ab-7f41919780b9'],
                    username: process.env.NODE_ENV !== 'production' ? this.username : '',
                    roles: process.env.NODE_ENV !== 'production' ? ['dept_permission'] : [],
                },
            };
        },
        mounted() {
            this.$emit('getData', this.formData)
        },

    };
</script>
