<template>
    <iDialog
		:title="dialogTitle"
		style="margin-top:10vh"
		:visible.sync="typeShow" 
		v-if="typeShow"
		width="60%" 
		@close='closeDialogBtn' 
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
                <iFormItem :label="language('知识类型')" prop='name'>
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
            tableListData: [
                { name: '分类名称1', id: 1 },
                { name: '分类名称2', id: 2 }
            ],
            extraData: {
                del: this.del
            }
        }
    },
    mounted() {
        this.page.totalCount = this.tableListData.length
    },
    methods: {
        closeDialogBtn () {
            this.$emit('update:typeShow', false)
        },
        close () {
            this.closeDialogBtn();
        },
        add() {
            this.tableListData.push({
                name: this.newTypeForm.name,
                id: 3
            })
        },
        del(row){
            console.log(row, '1234')
            this.$confirm('确定删除此文档吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
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