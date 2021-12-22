<template>
    <iPage>
        <Search @confirm="search" @reset="reset"></Search>
        <iCard class="margin-top20">
            <div class="margin-bottom20 flex justify-between">
                <div>
                    <iButton @click="dialog = true">添加流程</iButton>
                    <iButton>主流程图</iButton>
                </div>
                <div>
                    <iButton :disabled="disabled" @click="edit">修改</iButton>
                    <iButton :disabled="disabled" @del="del">删除</iButton>
                </div>
            </div>
            <el-table :data="tableListData" ref="table" class="single-choise" borderstyle="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="50" align="center" :selectable="handleSelectable"></el-table-column>
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="标题" align="center"></el-table-column>
                <el-table-column prop="updateDt" label="更新日期" align="center"></el-table-column>
                <el-table-column prop="version" label="版本号" align="center"></el-table-column>
                <el-table-column prop="state" label="状态" align="center">
                    <template slot-scope="{$index}">
                        <el-switch v-model="tableListData[$index].state" active-text="上架" inactive-text="下架" @change="updateState($event,$index)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="send" label="是否发送消息" align="center">
                    <template slot-scope="{$index}">
                        <el-switch v-model="tableListData[$index].send" active-text="是" inactive-text="否" @change="updateMsg($event,$index)"></el-switch>
                    </template>
                </el-table-column>
            </el-table>
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

        <addProcess :show.sync="dialog"></addProcess>
    </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton } from 'rise'
import Search from '../components/search.vue';
import { pageMixins } from '@/utils/pageMixins'
import addProcess from './addProcess.vue';
import tableCol from './table';
export default {
    mixins:[pageMixins],
    components: {
        iPage,
        Search,
        iCard,
        iPagination,
        iButton,
        addProcess
    },
    data() {
        return {
            keyWord:"",
            tableLoading: false,
            tableListData: [
                {id:1, state:false,send:true},
                {id:2, state:false,send:true},
                ],
            tableSetting:tableCol,
            selectList:[],
            dialog:false,
            disabled:false
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
    methods: {
        query(){

        },
        search(){},
        reset(){},
        edit(){
            if(this.selectList.length == 0) return this.$message.warning("请选择一条数据")
        },
        del(){
            if(this.selectList.length == 0) return this.$message.warning("请选择一条数据")
        },
        updateState(v,index){
            // this.$set(this.extraData.tableListData[index],"state",!v)
            let row = this.tableListData[index]
            if(this.selectList[0] && this.selectList[0].id == row.id && row.state){
               this.disabled = true
            }else{
                this.disabled = false
            }
        },
        // 是否发生消息
        updateMsg(v,index){
            // this.$set(this.extraData.tableListData[index],"send",!v)
        },
        handleSelectionChange(v){
            this.selectList = v
        },
        handleSelectable(row){
            if(this.selectList.length > 0){
                if (this.selectList[0].id == row.id) {
                    return true
                } else{
                    return false
                }
            }
            return true
        }
    },
}
</script>

<style lang="scss" scoped>
@import "./../comon";
.routerpage {
    overflow-x: hidden;
}
.single-choise {
    ::v-deep thead .el-table-column--selection .cell {
      display: none;
    }
}
</style>