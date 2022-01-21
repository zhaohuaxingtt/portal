<template>
    <div>
        <iSearch @sure='search' @reset="reset" icon>
            <el-form>
                <iFormItem :label='language("报告标题")'>
                    <iInput v-model="searchForm.name" :placeholder='language("请输入")' filterable></iInput>
                </iFormItem>
                <iFormItem :label='language("状态")'>
                    <iSelect v-model="searchForm.published" filterable clearable>
                        <el-option v-for="item in publishedList" :key="item.id" :label="item.labelName" :value="item.id"></el-option>
                    </iSelect>
                </iFormItem>
                <iFormItem :label='language("消息发送")'>
                     <iSelect v-model="searchForm.isSendMessage" filterable clearable>
                        <el-option v-for="item in sendList" :key="item.id" :label="item.labelName" :value="item.id"></el-option>
                    </iSelect>
                </iFormItem>
                <iFormItem :label='language("发布日期")'>
                    <el-date-picker
                        v-model="publicDate"
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
                :loading="tableLoading"
                :columns="tableSetting"
				@stateChange="stateChange"
				@msgChange="msgChange"
                :extraData="{
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

        <editContent ref="editDialog" :show.sync="dialog.show" :params="dialog.form" :operateType="operateType" @refresh='query'></editContent>
    </div>
</template>

<script>
    import { iSearch,iFormItem, iTableCustom, iInput,iCard,iButton,iPagination,iSelect } from 'rise'
    import { pageMixins } from '@/utils/pageMixins'
    import editContent from './editContent.vue';
    import tableSetting from './table';
    import { queryReportContentList, reportContentDetailById, publishedContentById, sendContentById, deleteContent } from '@/api/reportForm';
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
                tableListData:[],
                publishedList :[
                    { labelName: '上架', id: true },
                    { labelName: '下架', id: false }
                ],
                sendList: [
                    { labelName: '发送', id: true },
                    { labelName: '未发送', id: false }
                ],
                searchForm:{
                    name: '',
                    published: null,
                    isSendMessage: null
                },
                publicDate: [],
                dialog:{
                    show:false,
                    form:{}
                },
                searchFlag: false,
                tableLoading: false,
				operateType: 'add'
            }
        },
        created(){
            this.query()
        },
        methods: {
            async query(){
                let params = {
                    current: this.page.currPage,
                    size: this.page.pageSize
                }
                if (this.searchFlag) {
                    Object.assign(params, this.searchForm)
                }
                this.tableLoading = true
                await queryReportContentList(params).then(res => {
                    console.log(res)
                    if (res?.code === '200') {
                        this.tableListData = res?.data || []
                        this.page.totalCount = res.total
                        this.tableLoading = false
                        this.searchFlag = false
                    }
                })
            },
            search(){
                if (this.publicDate.length > 0) {
                    this.searchForm.startTime = this.publicDate[0]
                    this.searchForm.endTime = this.publicDate[1]
                }
                this.page.currPage = 1
                this.searchFlag = true
                this.query()
            },
            reset(){
                this.searchForm = {}
                this.searchFlag = false
				this.page.currPage = 1
                this.query()
            },
            stateChange(row){
				let formData = new FormData()
				formData.append('published', !row.published)
				publishedContentById(row.id, formData).then(res => {
					if (res?.success) {
						this.$message({type: 'success', message: '已更改当前消息发送状态'})
						this.query()
					}
				})
            },
            msgChange(row){
				let params = {
					isSendMessage: !row.isSendMessage
				}
				let formData = new FormData()
				Object.keys(params).forEach(key => {
					formData.append(key,params[key])
				})
				sendContentById(row.id, formData).then(res => {
					if (res?.success) {
						this.$message({type: 'success', message: '已更改当前通知状态'})
						this.query()
					}
				})
            },
            add(){
                this.dialog.form = {}
                this.dialog.show = true
				this.operateType = 'add'
				this.$refs.editDialog.getTypeList()
            },
            async edit(row){
                if(row.state) return this.$message.warning("请先下架，再进行修改操作")
                this.tableLoading = true
                await reportContentDetailById(row.id).then(res => {
                    if (res) {
                        res.file = [
                            {fileName: res.source, fileUrl: res.cover}
                        ]
                        this.dialog.form = res
                        this.dialog.show = true
                        this.operateType = 'modify'
                        this.tableLoading = false
                        this.$refs.editDialog.currId = res.id
                        this.$refs.editDialog.getTypeList()
                        this.$refs.editDialog.getCurrCategory(res.reportSectionId)
                    }
                })
            },
            del(row){
                if(row.state) return this.$message.warning("请先下架，再进行删除操作")
                this.$confirm('确定要删除此项？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
					await deleteContent(row.id).then(res => {
						if (res?.success) {
							this.$message({
								type: 'success',
								message: '删除成功!'
							});
							this.query()
						}
					})
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