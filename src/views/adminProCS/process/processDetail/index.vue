<template>
    <div>
        <el-tabs v-model="currType">
            <el-tab-pane label="流程页面" name="page">
                <processPage></processPage>
            </el-tab-pane>
            <el-tab-pane label="ProD文档" name="doc">
                <doc></doc>
            </el-tab-pane>
            <el-tab-pane label="流程指导书" name="guide">
                <guide></guide>
            </el-tab-pane>
            <el-tab-pane label="常见问题" name="qs">
                <question></question>
            </el-tab-pane>
            <el-tab-pane label="流程附件" name="attachment">
                <attachment></attachment>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import attachment from './attachment.vue';
    import doc from './doc.vue';
    import guide from './guide.vue';
    import processPage from './processPage/index.vue';
    import question from './question.vue';
    export default {
        components: {
            attachment,
            doc,
            guide,
            processPage,
            question
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