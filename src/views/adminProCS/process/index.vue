<template>
    <iPage>
        <Search v-model="keyWord" @confirm="query" @reset="rest"></Search>
        <iCard class="margin-top20">
            <div class="margin-bottom20 flex justify-between">
                <div>
                    <iButton @click="addFun">添加流程</iButton>
                    <iButton @click="handleMainChart">主流程图</iButton>
                </div>
                <div>
                    <iButton :disabled="disabled || selectList.length == 0" @click="edit">修改</iButton>
                    <iButton :disabled="disabled || selectList.length == 0" @click="del">删除</iButton>
                </div>
            </div>
            <iTableCustom
                :loading="tableLoading"
                :data="tableListData"
                :columns="tableSetting"
                :extraData="{
                    updateState,
                    updateMsg
                }"
                singleChoice
                @handle-selection-change="handleSelectionChange"
                />

            <iPagination
                v-update
                @size-change="handleSizeChange($event, query)"
                @current-change="handleCurrentChange($event, query)"
                background
                :current-page="page.currPage"
                :page-sizes="page.pageSizes"
                :page-size="page.pageSize"
                :layout="page.layout"
                :total="page.totalCount"
                />
        </iCard>
        <processDetail></processDetail>

        <addProcess :show.sync="dialog" ref="addDialog" @refresh='query'></addProcess>
    </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton, iTableCustom } from 'rise'
import Search from '../components/search.vue';
import { pageMixins } from '@/utils/pageMixins'
import addProcess from './addProcess.vue';
import processDetail from "./processDetail/index.vue";
import tableSetting from './table';
import {queryProcessList, deleteProcess, changeProcsState, changeProcsSendMessage} from '@/api/adminProCS';
export default {
    mixins:[pageMixins],
    components: {
        iPage,
        Search,
        iCard,
        iPagination,
        iButton,
        addProcess,
        processDetail,
        iTableCustom
    },
    data() {
        return {
            keyWord:"",
            tableLoading: false,
            tableListData: [],
            tableSetting,
            selectList:[],
            dialog:false,
            disabled:false,
            mainChartDialog: false
        }
    },
    watch:{
       selectList(n){
           if(n[0] && n[0].state){
               this.disabled = true
           }else{
               this.disabled = false
           }
       } 
    },
    created() {
        this.query()
    },
    methods: {
        async query(){
            try {
                this.tableLoading = true
                let res = await queryProcessList({page:this.page.currPage - 1,size:this.page.pageSize})
                this.tableListData = res?.content || []
                this.page.totalCount = res?.totalPages || 0
            } finally {
                this.tableLoading = false
            }
        },
        reset(){
            this.page.currPage = 1
            this.query()
        },
        edit(){

        },
        async del(){
            let id = this.selectList[0]?.id
            this.tableLoading = true
            await deleteProcess(id).then(res => {
                if (res?.success) {
                    this.$message({type: 'success', message: "成功删除该条流程"})
                    this.query()
                }
            })
        },
        async updateState(v,index,row){
            try {
                this.tableLoading = true
                await changeProcsState(row.id,{published: v})
                this.tableListData[index].published = v
                this.$message.success("修改成功")
            } finally {
                this.tableLoading = false
            }
        },
        // 是否发送消息
        async updateMsg(v,index,row){
            try {
                this.tableLoading = true
                await changeProcsSendMessage(row.id,{sendMessage: v})
                this.tableListData[index].send = v
                this.$message.success("修改成功")
            } finally {
                this.tableLoading = false
            }
        },
        handleSelectionChange(v){
            this.selectList = v
        },
        handleMainChart() {
            this.$router.push('/adminProCS/process/mainProcess')
        },
        addFun() {
            this.$refs.addDialog.organizationList()
            this.$refs.addDialog.usersList()
            this.dialog = true
        }
    },
}
</script>

<style lang="scss" scoped>
@import "./../comon";
.routerpage {
    overflow-x: hidden;
}

</style>