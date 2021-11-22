<template>
    <div class="file-list">
        <div>name</div>
        <i class="close el-icon-close"></i>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="scss" scoped>
.file-list{
    display: flex;
    align-items: flex-end;
    margin: 10px 0;
    max-width: 300px;
    justify-content: space-between;
}
.close{
    margin-left: 30px;
    cursor: pointer;
    border-radius: 50%;
    background-color: #ccc;
    opacity: .5;

    &:hover{
        opacity: 1;
    }
}
</style>