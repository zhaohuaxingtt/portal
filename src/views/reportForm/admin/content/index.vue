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
                <iButton @click="add">新增</iButton>
            </div>
            <iTableCustom
                class="margin-top20"
                :data="tableListData"
                :columns="tableSetting"
                :extraData="{
                    stateChange:stateChange,
                    msgChange,
                    edit,
                    del
                    }"
                >
                </iTableCustom>
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

        <editContent :show.sync="dialog.show" :params="dialog.form"></editContent>
    </div>
</template>

<script>
    import { iSearch,iFormItem, iTableCustom, iInput,iCard,iButton,iPagination,iSelect } from 'rise'
    import { pageMixins } from '@/utils/pageMixins'
    import editContent from './editContent.vue';
    import tableSetting from './table';
    import { queryReportContentList } from '@/api/reportForm';
    export default {
        components:{
            iSearch,
            iFormItem,
            iInput,
            iCard,
            iButton,
            iPagination,
            iSelect,
            editContent,
            iTableCustom
        },
        mixins:[pageMixins],
        data() {
            return {
                tableSetting,
                tableListData:[{id:1,state:false,notice:true,type:1,name:'test'}],
                selectList:[],
                status:[
                    {labelName:1,id:1}
                ],
                searchForm:{},
                dialog:{
                    show:false,
                    form:{}
                },
            }
        },
        created(){
            this.query()
        },
        methods: {
            async query(){
                let data = {
                    page:0,
                    size:10,
                    keyword:"",
                    sort:"publishDate,DESC"
                }
                let res = await queryReportContentList(data) 
            },
            search(){
                
            },
            reset(){
                this.searchForm = {}
            },
            stateChange(e,index){
                this.tableListData[index].state = e
            },
            msgChange(e,index){
                this.tableListData[index].notice = e
            },
            add(){
                this.dialog.form = {}
                this.dialog.show = true
            },
            edit(row){
                if(row.state) return this.$message.warning("请先下架，再进行修改操作")
                this.dialog.form = row
                this.dialog.show = true
            },
            del(row){
                if(row.state) return this.$message.warning("请先下架，再进行删除操作")
                this.$confirm('确定要删除此项？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                })  
            }
        },
    }
</script>

<style lang="scss" scoped>

.btn{
    text-align: right;
}
</style>