<template>
    <div>
        <iSearch @sure='search' @reset="reset" icon>
            <el-form>
                <iFormItem :label='language("类型")'>
                    <iInput v-model="searchForm.type" :placeholder='language("请输入")'></iInput>
                </iFormItem>
                <iFormItem :label='language("状态")'>
                    <iSelect v-model="searchForm.state" filterable clearable>
                        <el-option v-for="item in status" :key="item.id" :label="item.lableName" :value="item.id"></el-option>
                    </iSelect>
                </iFormItem>
                <iFormItem :label='language("消息发送")'>
                     <iSelect v-model="searchForm.sendMsg" filterable clearable>
                        <el-option v-for="item in status" :key="item.id" :label="item.lableName" :value="item.id"></el-option>
                    </iSelect>
                </iFormItem>
                <iFormItem :label='language("发布日期")'>
                    <el-date-picker
                        v-model="searchForm.publicDate"
                        type="daterange"
                        range-separator="至"
                        style="width:320px;"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                </iFormItem>
            </el-form>
        </iSearch>

        <iCard class="margin-top20">
            <div class="btn">
                <iButton class="fr">新增</iButton>
            </div>
            <el-table :data="tableListData" class="margin-top20 single-choise" borderstyle="width: 100%" @selection-change="handleSelectionChange">
                <!-- <el-table-column type="selection" width="50" align="center" :selectable="handleSelectable"></el-table-column> -->
                <el-table-column type="index" label="类型" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="报告标题" align="center"></el-table-column>
                <el-table-column prop="updateDt" label="发布日期" align="center"></el-table-column>
                <el-table-column prop="state" label="状态" align="center">
                    <template slot-scope="{$index}">
                        <el-switch v-model="tableListData[$index].state" active-text="上架" inactive-text="下架" @change="updateState($event,$index)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column prop="send" label="通知" align="center">
                    <template slot-scope="{$index}">
                        <el-switch v-model="tableListData[$index].send" active-text="是" inactive-text="否" @change="updateMsg($event,$index)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <iButton type="text">修改</iButton>
                    <iButton type="text">删除</iButton>
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
    </div>
</template>

<script>
    import { iSearch,iFormItem,iInput,iCard,iButton,iPagination,iSelect } from 'rise'
    import { pageMixins } from '@/utils/pageMixins'

    export default {
        components:{
            iSearch,
            iFormItem,
            iInput,
            iCard,
            iButton,
            iPagination,
            iSelect
        },
        mixins:[pageMixins],
        data() {
            return {
                tableListData:[{}],
                selectList:[],
                status:[
                    {labelName:1,id:1}
                ],
                searchForm:{}
            }
        },
        methods: {
            query(){},
            search(){

            },
            reset(){},
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

.single-choise {
    ::v-deep thead .el-table-column--selection .cell {
      display: none;
    }
}
.btn{
    text-align: right;
}
</style>