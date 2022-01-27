<template>
    <iPage>
        <Search v-model="keyword" @confirm="search" @reset="reset"></Search>
        <iCard class="margin-top20">
            <div class="margin-bottom20 flex justify-between">
                <div>
                    <iButton @click="addFun">添加流程</iButton>
                    <iButton @click="handleMainChart">主流程图</iButton>
                </div>
                <div>
                    <iButton :disabled="disabled" @click="edit">修改</iButton>
                    <iButton :disabled="disabled" @click="del">删除</iButton>
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

        <addProcess :show.sync="dialog" ref="addDialog" @refresh='query'></addProcess>
    </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton, iTableCustom } from 'rise'
import Search from '../components/search.vue';
import { pageMixins } from '@/utils/pageMixins'
import addProcess from './addProcess.vue';
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
        iTableCustom
    },
    data() {
        return {
            keyword:"",
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
           if(n.length > 0){
                if(n[0].published){
                   this.disabled = true
                }else{
                    this.disabled = false
                }
            }else{
                this.disabled = true
            }
       } 
    },
    created() {
        this.query()
    },
    methods: {
        async query(){
            try {
                let params = {
                    page: this.page.currPage - 1,
                    size: this.page.pageSize
                }
                if (this.keyword) {
                    params.keyword = this.keyword
                }
                this.tableLoading = true
                let res = await queryProcessList(params)
                this.tableListData = res?.content || []
                this.page.totalCount = res?.totalPages || 0
            } finally {
                this.tableLoading = false
            }
        },
        search(){
            this.page.currPage = 1
            this.query()
        },
        reset(){
            this.keyword = "" 
            this.search()
        },
        edit(){
            let id = this.selectList[0]?.id
            this.$router.push({path: '/adminProCS/process/edit', query: {id: id,flowChartId:this.selectList[0].flowChartId}})
        },
        async del(){
            let id = this.selectList[0]?.id
            this.tableLoading = true
            try {
                await deleteProcess(id).then(res => {
                    if (res?.success) {
                        this.$message({type: 'success', message: "成功删除该条流程"})
                        this.query()
                    }
                })
            } finally {
                this.tableLoading = false
            }
        },
        async updateState(v,index){
            let id = this.tableListData[index].id
            let formData = new FormData()
            formData.append('published', v)
            this.tableLoading = true
            try {
                await changeProcsState(id, formData).then(res => {
                    if (res?.success) {
                        this.$message({type: 'success', message: "修改当前状态成功"})
                        // this.query()
                        this.tableLoading = false
                        this.tableListData[index].published = v
                    }
                })
            } finally {
                this.tableLoading = false
            }
        },
        // 是否发送消息
        async updateMsg(v,index){
            let id = this.tableListData[index].id
            let formData = new FormData()
            formData.append('sendMessage', v)
            this.tableLoading = true
            try {
                await changeProcsSendMessage(id, formData).then(res => {
                    if (res?.success) {
                        this.$message({type: 'success', message: "修改发送消息成功"})
                        // this.query()
                        this.tableLoading = false
                        this.tableListData[index].send = v
                    }
                })
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