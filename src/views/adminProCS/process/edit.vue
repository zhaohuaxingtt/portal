<template>
    <iPage>
        <iButton class="btn" @click="$router.back()">返回主流程列表</iButton>
        <processDetail></processDetail>
    </iPage>
</template>

<script>
import { iPage, iButton } from 'rise'
import processDetail from "./processDetail/index.vue";
export default {
    components: {
        iPage,
        iButton,
        processDetail,
    },
    data() {
        return {
            currId: null
        }
    },
    created() {
        let query = this.$route.query
        this.currId = query.id
    },
    methods: {
        goBack() {
            console.log('back')
        }
    }
}
</script>

<style lang="scss" scoped>
    .btn {
        display: flex;
        justify-content: flex-end
    }
</style>