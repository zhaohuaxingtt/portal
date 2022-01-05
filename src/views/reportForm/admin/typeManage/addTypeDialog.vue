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
        <el-form class="form">
            <iFormItem :label="language('类型名称')">
                <iInput width="120px" v-model="typeName" placeholder="请输入" clearable></iInput>
            </iFormItem>
            <iFormItem class="btn">
                <iButton @click="search">{{ language('查询') }}</iButton>
                <iButton @click="add" style="marge-left:20px">{{ language('添加') }}</iButton>
            </iFormItem>
        </el-form>
        <div style="padding-bottom: 20px">
            <iTableCustom
                :ref="'testTable'"
                :loading="tableLoading"
                :data="tableData"
                :columns="tableSetting"
                :extraData="extraData"
            >
            </iTableCustom>
            <iPagination
                v-update
                @size-change="handleSizeChange($event, getList)"
                @current-change="handleCurrentChange($event, getList)"
                background
                :current-page="page.currPage"
                :page-sizes="page.pageSizes"
                :page-size="page.pageSize"
                :layout="page.layout"
                :total="page.totalCount"
            />
        </div>
    </iDialog>
</template>

<script>
import { iDialog, iFormItem, iInput, iButton, iTableCustom, iPagination } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { addTypeColumn } from './columnData'
export default {
    name: 'addTypeDialog',
    components: {
        iDialog,
        iFormItem,
        iInput,
        iButton,
        iTableCustom,
        iPagination
    },
    mixins: [pageMixins],
    props: {
        typeShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dialogTitle: '添加报表分类',
            visible: false,
            typeName: "",
            tableLoading: false,
            tableData: [
                { id: '1', name: '类型名称1' }
            ],
            tableSetting: addTypeColumn,
            extraData: {
                del: this.del
            }
        }
    },
    methods: {
        closeDialogBtn () {
            this.$emit('update:typeShow', false)
        },
        search() {
            console.log(this.typeName, 'typeName')
        },
        add() {
            if (!this.typeName) return this.$message({type: 'warning', message: '请先填写类型名称再添加!'})
            this.tableData.push({
                name: this.typeName,
                id: '2'
            })
            this.typeName = ''
        },
        del(row){
            console.log(row, '1234')
			if (row.status) return this.$message({type: 'warning', message: '上架的类型不允许删除!!!'})
            this.$confirm('确定删除此流程指导书吗?', '提示', {
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
.form {
    display: flex;
    justify-content: space-between;
    .btn {
        display: flex;
        align-items: flex-end;
    }
}
</style>