<template>
    <el-tooltip class="item" effect="light" :content="txtInfo" placement="top">
        <el-button size="mini" circle type="primary">{{num}}</el-button>
    </el-tooltip>
</template>
 
<script>
export default {
    name: 'iTooltip',
    props: {
        txtInfo: {
            type: String,
            default: ''
        },
        num: {
            type: String,
            default: 1,
        }
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>
 
<style lang="less">

</style>
