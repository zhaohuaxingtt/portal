<template>
    <iDialog
        :visible.sync="show"
        title="报文详情"
        @close="closeDialog"
        width="600px"
    >
        <div class="content" v-text="content"></div>
    </iDialog>
</template>

<script>
import {iDialog} from 'rise';
export default {
    components: {
        iDialog
    },
    props:{
        show:{
            type:Boolean,
            default:false
        },
        content:{
            type:String,
            default:""
        }
    },
    methods: {
        closeDialog(){
            this.$emit("update:content","")
            this.$emit("update:show",false)
        }
    },
}
</script>

<style lang="scss" scoped>
.content{
    padding: 10px 0 20px;
    min-height: 150px;
}
</style>