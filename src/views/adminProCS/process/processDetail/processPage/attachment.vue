<template>
    <iDialog
        title="附件"
        :visible.sync="show" 
        width="600px" 
        @close='close' 
        append-to-body
        class="process-dialog"
    >
        <div class="content">
            <div class="flex margin-bottom20">
                <iInput style="width:220px" :placeholder="language('请输入')" v-model="keyWord" />
                <iButton style="margin-left:10px">搜索</iButton>
            </div>
            <ITable :tableSetting='tableSetting'></ITable>
        </div>
        <div class="flex felx-row mt20 pb20 justify-end ">
            <iButton @click="close">{{ language('取消') }}</iButton>
            <iButton @click="close">{{ language('确认') }}</iButton>
        </div>
    </iDialog>
</template>

<script>
import {iDialog,iButton,iInput} from 'rise';
import {ATTACH_SETTING} from './tables';
import ITable from './../../components/iTable.vue';

export default {
    components: {
        iDialog,
        iButton,
        iInput,
        ITable
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
            tableSetting:ATTACH_SETTING
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