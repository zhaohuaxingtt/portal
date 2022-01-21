<template>
    <div>
        <el-tabs v-model="currType">
            <el-tab-pane label="流程页面" name="page">
                <processPage :id="id"></processPage>
            </el-tab-pane>
            <el-tab-pane label="ProD文档" name="doc">
                <doc :id="id"></doc>
            </el-tab-pane>
            <el-tab-pane label="流程指导书" name="guide">
                <guide :id="id"></guide>
            </el-tab-pane>
            <el-tab-pane label="常见问题" name="qs">
                <question :id="id"></question>
            </el-tab-pane>
            <el-tab-pane label="流程附件" name="attachment">
                <attachment :id="id"></attachment>
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
            }
        },
        data() {
            return {
                currType: "page"
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>