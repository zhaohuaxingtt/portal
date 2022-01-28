<template>
    <iPage>
        <iButton class="btn mb20" @click="$router.back()">返回主流程列表</iButton>
		<ProcessForm ref="form" type="edit"></ProcessForm>
        <processDetail v-if="detail.id" :id="currId" :flowChartId="detail.flowChartId"></processDetail>
    </iPage>
</template>

<script>
import { iPage, iButton } from 'rise'
import processDetail from "./processDetail/index.vue";
import ProcessForm from './components/processForm.vue';

export default {
    components: {
        iPage,
        iButton,
        processDetail,
        ProcessForm
    },
    data() {
        return {
            currId: null,
            detail: {}
        }
    },
    async mounted() {
        this.currId = this.$route.query.id
        this.detail = await this.$refs.form.queryDetail(this.$route.query.id)
    }
}
</script>

<style lang="scss" scoped>
@import "./../comon";
    .btn {
        display: flex;
        justify-content: flex-end
    }
</style>