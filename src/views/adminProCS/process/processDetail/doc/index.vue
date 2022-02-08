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
                    <iButton style="margin-left:10px" @click="queryProDList">搜索</iButton>
                </div>
                <iTableCustom
                    :loading="prod.loading"
                    :data="prod.list"
                    :columns="docSetting"
                    ref="prodTable"
                    singleChoice
                    @handle-selection-change="handleSelectChange"
                    />
            </div>
            <div class="flex felx-row mt20 pb20 justify-end ">
                <iButton @click="close">{{ language('取消') }}</iButton>
                <iButton @click="save">{{ language('确认') }}</iButton>
            </div>
        </iDialog>
    </iCard>
</template>

<script>
import {iInput, iCard, iButton,iDialog,iTableCustom } from 'rise';
import ITable from './../../components/ITable';
import {DOC} from '../tables';
import {queryProcessProDList, addProcessProd, deleteProcessProd,queryProDList} from '@/api/adminProCS';

export default {
    components:{
        iInput,
        iCard,
        iButton,
        ITable,
        iDialog,
        iTableCustom
    },
    data() {
        return {
            keyWord:"",
            tableSetting: DOC,
            docSetting:[
                {
                    type: 'selection',
                    width: 50
                },
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
            id:this.$route.query.id,
            selectList:[],
            prod:{
                list:[],
                loading:false
            }
        }
    },
    methods: {
        async save(){
            if(this.selectList.length == 0) return this.$message.warning("请选择文档")
            // 添加文档 
            try {
                this.prod.loading = true
                let data = new FormData()
                for (const key in this.selectList[0]) {
                    data.append(key,this.selectList[0][key])
                }
                let res = await addProcessProd(this.id,data)
                if(res.error){
                    this.$message.warning(res.message)
                }else{
                    this.$message.success("添加成功")
                    this.dialog.show = false
                    this.queryList()
                }
            } finally {
                this.prod.loading = false
            }
        },
        handleSelectChange(v){
            this.selectList = v
        },
        open(){
            this.$nextTick(() => {
                this.queryProDList()
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
        async queryProDList(){
            try {
                this.prod.loading = true
                this.prod.list = await queryProDList({keyword:this.dialog.keyWord})
            } finally {
                this.prod.loading = false
            }
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
                this.queryList()
            })
        },
        close(){
            this.$refs.prodTable.clearSelection()
            this.dialog.show = false
        }
    },
    
}
</script>

<style lang="scss" scoped>
@import "./../../../comon";
</style>