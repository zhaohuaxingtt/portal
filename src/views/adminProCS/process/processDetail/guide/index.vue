<template>
    <iCard>
        <div class="flex justify-between margin-bottom20">
            <div class="flex">
                <iInput style="width:220px" :placeholder="language('请输入')" v-model="keyWord" />
                <iButton style="margin-left:10px" @click="queryList('rest')">搜索</iButton>
            </div>
            <div>
                <iButton @click="dialog.show = true">添加流程指导书</iButton>
            </div>
        </div>
        <ITable ref="table" :tableSetting='tableSetting' :extraData="extraData" :query-method="query"></ITable>

        <addGuide :show.sync="dialog.show" @refresh="queryList"></addGuide>        
    </iCard>
</template>

<script>
import {iInput, iCard, iButton } from 'rise';
import ITable from './../../components/ITable';
import {GUIDE} from '../tables';
import addGuide from './addGuide.vue';
import {queryProcessFileList,deleteProcessFile} from '@/api/adminProCS';

export default {
    components:{
        iInput,
        iCard,
        iButton,
        ITable,
        addGuide
    },
    data() {
        return {
            keyWord:"",
            tableSetting: GUIDE,
            docSetting:[
                 {
                    type:'index',
                    label:'序号',
                    width: 100,
                    align: 'center'
                },
                {
                    prop:'name',
                    label:'文档名称',
                    
                },
                {
                    prop:'publishDate',
                    label:'发布日期'
                }
            ],
            extraData:{
                del:this.del
            },
            dialog:{
                show: false,
                keyWord:""
            },
            query: this.queryTable,
            id:this.$route.query.id,
        }
    },
    methods: {
        queryList(t){
            this.$refs.table.query(t)
        },
        queryTable(page){
            return new Promise(async (reslove,reject) => {
                let data = {
                    page: page.currPage - 1,
                    size: page.pageSize,
                    keyword: this.keyWord,
                    fileType: "PRO_ATTACHMENT"
                }
                try {
                    let res = await queryProcessFileList(this.id, data)
                    reslove(res)
                } catch(err) {
                    reject(err)
                }
            })
        },
        del(row){
            this.$confirm('确定删除此流程指导书吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
				await deleteProcessFile(row.id)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.queryList()
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