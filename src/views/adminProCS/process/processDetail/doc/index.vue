<template>
    <iCard>
        <div class="flex justify-between margin-bottom20">
            <div class="flex">
                <iInput style="width:220px" :placeholder="language('请输入')" v-model="keyWord" />
                <iButton style="margin-left:10px">搜索</iButton>
            </div>
            <div>
                <iButton @click="dialog.show = true">添加ProD文档</iButton>
            </div>
        </div>
        <ITable :tableSetting='tableSetting' :query="query" :extraData="extraData"></ITable>
        
        <iDialog
            title="新增ProD文档"
            :visible.sync="dialog.show" 
            width="800px" 
            @close='close' 
            append-to-body
            class="process-dialog"
            top="30px"
        >
            <div class="content">
                <div class="flex margin-bottom20">
                    <iInput style="width:220px" :placeholder="language('请输入')" v-model="dialog.keyWord" />
                    <iButton style="margin-left:10px">搜索</iButton>
                </div>
                <ITable :tableSetting='docSetting'></ITable>
            </div>
            <div class="flex felx-row mt20 pb20 justify-end ">
                <iButton @click="close">{{ language('取消') }}</iButton>
                <iButton @click="confirm">{{ language('确认') }}</iButton>
            </div>
        </iDialog>
    </iCard>
</template>

<script>
import {iInput, iCard, iButton,iDialog } from 'rise';
import ITable from './../../components/ITable';
import {DOC} from '../tables';

export default {
    components:{
        iInput,
        iCard,
        iButton,
        ITable,
        iDialog
    },
    data() {
        return {
            tableSetting: DOC,
            docSetting:[
                 {
                    type:'index',
                    label:'序号',
                    width: 100
                },
                {
                    prop:'title',
                    label:'文档名称'
                },
                {
                    prop:'publishTime',
                    label:'发布日期'
                }
            ],
            extraData:{
                del:this.del
            },
            dialog:{
                show: false,
                keyWord:""
            }
        }
    },
    methods: {
        confirm(){

        },
        query(page){
            console.log(page);
        },
        del(row){
            this.$confirm('确定删除此文档吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            })
        },
        close(){
            this.dialog.show = false
        }
    },
    
}
</script>

<style lang="scss" scoped>
@import "./../../../comon";
</style>