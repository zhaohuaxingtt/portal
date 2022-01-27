<template>
    <iDialog
		:title="dialogTitle"
		style="margin-top:10vh"
		:visible.sync="typeShow" 
		v-if="typeShow"
		width="60%" 
		@close="close"
		append-to-body
	>
        <el-form
            label-position="left"
            label-width="100px"
            :model="newTypeForm"
            :rules="newTypeRules"
            class="typeForm validate-required-form"
        >
            <el-row>
                <iFormItem :label="language('知识分类')" prop='name'>
                    <el-col span="14">
                        <iInput v-model="newTypeForm.name" placeholder="请输入知识类型名称" maxLength="10"></iInput>
                    </el-col>
                     <el-col span="4" class="ml20">
                        <iButton @click="add">{{ language('添加') }}</iButton>
                    </el-col>
                </iFormItem>
            </el-row>
        </el-form>
        <iTableCustom
            :loading="tableLoading"
            :data="tableListData"
            :columns="tableSetting"
            :extraData="extraData"
        />
        <iPagination
            v-update
            @size-change="handleSizeChange($event, getTableList)"
            @current-change="handleCurrentChange($event, getTableList)"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount"
            class="typeForm"
        />

    </iDialog>
</template>

<script>
import { iDialog, iFormItem, iInput, iButton, iTableCustom, iPagination } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { column } from './tableColumn'
import { addCategory, queryCategory, deleteCategory } from '@/api/adminProCS';
export default {
    components: {
        iDialog,
        iFormItem,
        iInput,
        iButton,
        iTableCustom,
        iPagination
    },
    props: {
        typeShow: {
            type: Boolean,
            default: false
        }
    },
    mixins: [pageMixins],
    data() {
        return {
            visible: false,
            dialogTitle: '知识分类',
            newTypeForm: {
                name: ''
            },
            newTypeRules: {
                name: { required:'true',message:"请输入知识分类名称",trigger:'blur' },
            },
            tableSetting: column,
            tableListData: [],
            extraData: {
                del: this.del
            },
			currTypeId: null,
            tableLoading: false
        }
    },
    methods: {
		getTableList() {
			let params = {
				page: this.page.currPage - 1,
				size: this.page.pageSize
			}
            this.tableLoading = true
			queryCategory(this.currTypeId, params).then(res => {
                if (res) {
                    this.tableListData = res.content || []
                    this.page.totalCount = res.totalElements
                    this.tableLoading = false
                }
			})
		},
        closeDialogBtn () {
            this.$emit('update:typeShow', false)
			this.newTypeForm.name = ''
        },
        close () {
            this.closeDialogBtn();
        },
        async add() {
			if (!this.newTypeForm.name) return this.$message({type: 'warning', message: '请先填写知识分类名称'})
			let formData = new FormData()
			formData.append('name', this.newTypeForm.name)
            this.tableLoading = true
			await addCategory(this.currTypeId, formData).then(res => {
				if (res) {
					this.newTypeForm.name = ''
					this.$message({type: 'success', message: '新增二级分类成功'})
                    this.tableLoading = false
					this.getTableList()
				}
			})
        },
        del(row){
            this.$confirm('是否删除已选中选项?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                 this.tableLoading = true
                await deleteCategory(row.id).then(res => {
                    if (res) {
                        this.tableLoading = false
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getTableList()
                    }
                })
                
            })
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../comon.scss';
.typeForm {
	padding-bottom: 20px;
}
.row {
    margin-left: -1px;
}
</style>