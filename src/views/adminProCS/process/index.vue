<template>
    <iPage>
        <Search @confirm="search" @reset="reset"></Search>
        <iCard class="margin-top20">
            <div class="margin-bottom20 flex justify-between">
                <div>
                    <iButton>添加流程</iButton>
                    <iButton>主流程图</iButton>
                </div>
                <div>
                    <iButton>修改</iButton>
                    <iButton>删除</iButton>
                </div>
            </div>
            <el-table :data="tableListData" class="single-choise" borderstyle="width: 100%" @selection-change="handleSelectionChange">
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
            dialog:true
        }
    },
    methods: {
        query(){

        },
        search(){},
        reset(){},
        updateState(v,index){
            // this.$set(this.extraData.tableListData[index],"state",!v)
        },
        updateMsg(v,index){
            // this.$set(this.extraData.tableListData[index],"send",!v)
        },
        handleSelectionChange(v){
            console.log(v);
            this.selectList = v
        },
        handleSelectable(row){
            if(this.selectList.length > 0){
                if (this.selectList[0].id == row.id) {
                    return true
                } else{
                    console.log(row);
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