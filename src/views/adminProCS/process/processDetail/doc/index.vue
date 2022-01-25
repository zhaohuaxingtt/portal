<template>
    <iCard>
        <div class="flex justify-between margin-bottom20">
            <div class="flex">
                <iInput style="width:220px" :placeholder="language('请输入')" v-model="keyWord" />
                <iButton style="margin-left:10px" @click="queryList('rest')">搜索</iButton>
            </div>
            <div>
                <iButton @click="dialog.show = true">添加ProD文档</iButton>
            </div>
        </div>
        <ITable ref="table" :tableSetting='tableSetting' :query="query" :extraData="extraData" :query-method="query"></ITable>
        
        <iDialog
            title="新增ProD文档"
            :visible.sync="dialog.show" 
            width="800px" 
            @close='close' 
            @open="open"
            append-to-body
            class="process-dialog"
            top="30px"
            v-loading="dialog.loading"
        >
            <div class="content">
                <div class="flex margin-bottom20">
                    <iInput style="width:220px" :placeholder="language('请输入')" v-model="dialog.keyWord" />
                    <iButton style="margin-left:10px" @click="queryPrdList('rest')">搜索</iButton>
                </div>
                <ITable ref="tablePrd" :tableSetting='docSetting' :query-method="queryPrd" @selectChange="selectChange"></ITable>
            </div>
            <div class="flex felx-row mt20 pb20 justify-end ">
                <iButton @click="close">{{ language('取消') }}</iButton>
                <iButton @click="save">{{ language('确认') }}</iButton>
            </div>
        </iDialog>
    </iCard>
</template>

<script>
import {iInput, iCard, iButton,iDialog } from 'rise';
import ITable from './../../components/ITable';
import {DOC} from '../tables';
import {queryProcessProDList, addProcessProd, deleteProcessProd,queryProDList} from '@/api/adminProCS';

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
            keyWord:"",
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
                keyWord:"",
                list:[],
                loading:false
            },
            query: this.queryTable,
            queryPrd: this.queryProDList,
            id:this.$route.query.id,
            selectList:[]
        }
    },
    methods: {
        async save(){
            if(this.selectList.length == 0) return this.$message.warning("请选择文档")
            // 添加文档 not do
            // await addProcessProd(this.id)
        },
        selectChange(v){
            this.selectList = v
        },
        open(){
            this.$nextTick(() => {
                this.queryPrdList('rest')
            })
        },
        // 查询外面列表
        queryList(t){
            this.$refs.table.query(t)
        },
        queryTable(page){
            return new Promise(async (reslove,reject) => {
                let data = {
                    page: page.currPage - 1,
                    size: page.pageSize,
                    keyword: this.keyWord
                }
                try {
                    let res = await queryProcessProDList(this.id, data)
                    reslove(res)
                } catch(err) {
                    reject(err)
                }
            })
        },
        // 查询添加文档里的列表
        queryPrdList(t){
            this.$refs.tablePrd.query(t)
        },
        async queryProDList(page){
            return new Promise(async (reslove,reject) => {
                try {
                    let data = {
                        page: page.currPage - 1,
                        size: page.pageSize,
                        keyword: this.dialog.keyWord
                    }
                    let res = await queryProDList(data)
                    reslove(res)
                } catch(err) {
                    reject(err)
                }
            })
        },
        del(row){
            this.$confirm('确定删除此文档吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await deleteProcessProd(row.id)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.queryTable()
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