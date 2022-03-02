<template>
    <div>
        <el-tabs v-model="currType" @tab-click="change">
            <el-tab-pane :label="language('流程页面')" name="page">
                <processPage ref="page" :id="pId" :flowChartId="flowChartId"></processPage>
            </el-tab-pane>
            <el-tab-pane :label="language('ProD文档')" name="doc">
                <doc ref="doc" :id="pId"></doc>
            </el-tab-pane>
            <el-tab-pane :label="language('流程指导书')" name="guide">
                <guide ref="guide" :id="id"></guide>
            </el-tab-pane>
            <el-tab-pane :label="language('常见问题')" name="qs">
                <question ref="qs" :id="id"></question>
            </el-tab-pane>
            <el-tab-pane :label="language('流程附件')" name="attachment">
                <attachment ref="attachment" :id="id"></attachment>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import attachment from './attachment/attachment.vue';
    import doc from './doc/index.vue';
    import guide from './guide/index.vue';
    import processPage from './processPage/index.vue';
    import question from './question/question.vue'
    export default {
        components: {
            attachment,
            doc,
            guide,
            processPage,
            question
        },
        props:{
            id:{
                default:""
            },
            flowChartId:{
                default:""
            }
        },
        data() {
            return {
                currType: "page"
            }
        },
        mounted() {
            this.$refs[this.currType].queryList("")
        },
        methods: {
            change(tab){
                this.$nextTick(() => {
                    this.$refs[tab.name].queryList()
                })
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>