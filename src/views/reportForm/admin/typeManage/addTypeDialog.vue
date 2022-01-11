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
                <iInput width="120px" v-model="name" placeholder="请输入" clearable></iInput>
            </iFormItem>
            <iFormItem class="btn">
                <!-- <iButton @click="search">{{ language('查询') }}</iButton> -->
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
import { queryCurrCategory, createCurrCategory, deleteCurrCategory } from '@/api/reportForm'
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
            name: "",
            tableLoading: false,
            tableData: [
                { id: '1', name: '类型名称1' }
            ],
            tableSetting: addTypeColumn,
            extraData: {
                del: this.del
            },
            currTypeId: null
        }
    },
    methods: {
        closeDialogBtn () {
            this.$emit('update:typeShow', false)
        },
        // search() {
        //     console.log(this.name, 'name')
        // },
        add() {
            if (!this.currTypeId) return
            if (!this.name) return this.$message({type: 'warning', message: '请先填写类型名称再添加!'})
            let formData = new FormData()
            formData.append('name', this.name)
            this.tableLoading = true
            createCurrCategory(this.currTypeId, formData).then(res => {
                console.log(res, '123333')
                if (res) {
                    this.name = ''
                    this.tableData.push({
                        id: res.id,
                        name: res.name
                    })
                    this.tableLoading = false
                }
            })
        },
        del(row){
            console.log(row, '1234')
			if (row.status) return this.$message({type: 'warning', message: '上架的类型不允许删除!!!'})
            this.$confirm('确定删除此流程指导书吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                this.tableLoading = true
                deleteCurrCategory(row.id).then(res => {
                    console.log(res)
                    if (res?.success) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getTableList(this.currTypeId)
                        this.tableLoading = false
                    }
                })
                
            })
        },
        async getTableList(id) {
            if (!id) return
            this.currTypeId = id
            let params = {
				page: this.page.currPage - 1,
				size: this.page.pageSize
			}
            this.tableLoading = true
            await queryCurrCategory(id, params).then(res => {
                console.log(res, '234543')
                this.tableLoading = false
            })
        }
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