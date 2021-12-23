<template>
    <div class="file-list">
        <div @click="$emit('click')">{{file.fileName}}</div>
        <i class="close el-icon-close" v-if="!disabled" @click="$emit('del',file)"></i>
    </div>
</template>

<script>
    export default {
        props:{
            file:{
                type: Object,
                default: () => {}
            },
            disabled:{
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss" scoped>
.file-list{
    padding: 2px 8px;
    display: flex;
    align-items: center;
    margin: 10px 0;
    max-width: 500px;
    min-width: 200px;
    justify-content: space-between;
    transition: all .3s ease;
    border-radius: 4px;
    color: #444;
    cursor: pointer;

    &:first-child{
        margin-top: 0;
    }
    &:hover{
        background-color: #f5f7fa;
        color: #2369f1;
    }
}
.close{
    padding: 2px;
    margin-left: 30px;
    cursor: pointer;
    border-radius: 50%;
    background-color: #ccc;
    opacity: .5;

    &:hover{
        opacity: .9;
    }
}
</style>