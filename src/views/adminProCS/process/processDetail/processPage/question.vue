<template>
    <iDialog
        title="常见问题"
        :visible.sync="show" 
        width="600px" 
        @close='close' 
        append-to-body
    >
        <div class="content">
            <div class="flex margin-bottom20">
                <iInput style="width:220px" :placeholder="language('请输入')" v-model="keyWord" />
                <iButton style="margin-left:10px">搜索</iButton>
            </div>
            <ITable :showPage="false" :tableSetting='tableSetting'></ITable>
        </div>
        <div class="flex felx-row mt20 pb20 justify-end ">
            <iButton @click="close">{{ language('取消') }}</iButton>
            <iButton @click="close">{{ language('确认') }}</iButton>
        </div>
    </iDialog>
</template>

<script>
import {iDialog,iButton} from 'rise';
import {QS_SETTING} from './tables';
export default {
    components: {
        iDialog,
        iButton
    },
    props:{
        show:{
            type:Boolean,
            default:false
        }
    },
    data() {
        return {
            keyWord:"",
            tableSetting:QS_SETTING
        }
    },
    methods: {
        close(){
            this.$emit("update:show",false)
        }
    },
}
</script>

<style lang="scss" scoped>
@import "./../../../comon";

</style>