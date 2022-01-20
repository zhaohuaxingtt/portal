<template>
    <iDialog
        :title="dialogTitle"
        style="margin-top:10vh"
        :visible.sync="show" 
        v-if="show" 
        width="60%" 
        @close='closeDialogBtn' 
        append-to-body
    >
        <el-form
            label-position="left"
            label-width="100px"
        >
            <iFormItem :label="language('问题描述')">
                <div>{{ name }}</div>
			</iFormItem>
        </el-form>
        <div class="flex flex-row questionForm">
            <div class="answer">问题回答</div>
            <div class="form">
                <div class="mb20">
                    <iButton @click="addQuestionAnswer">添加问题回答</iButton>
                    <iButton @click="modifyQuestionAnswer" :disabled='selectedItems.length == 0'>修改</iButton>
                    <iButton @click="delQuestionAnswer" :disabled='selectedItems.length == 0'>删除</iButton>
                </div>
                <iTableCustom
                    ref="testTable"
                    :loading="tableLoading"
                    :data="tableListData"
                    :columns="tableSetting"
                    singleChoice=true
                    @handle-selection-change="handleSelectionChange"
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
                />
            </div>
        </div>
        <addAnswer
            ref="answerDialog"
            v-show="addAnswerDialog"
            :show.sync="addAnswerDialog"
            :type="type"
        />
    </iDialog>
</template>

<script>
import { pageMixins } from '@/utils/pageMixins'
import { questionColumn } from './table.js'
import { iDialog, iFormItem, iButton, iPagination, iTableCustom } from 'rise'
import addAnswer from './addAnswer'
export default {
    name: 'questionAnswer',
    components: {
        iDialog,
        iFormItem,
        iButton,
        iPagination,
        iTableCustom,
        addAnswer
    },
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    mixins: [pageMixins],
    data() {
        return {
            dialogTitle: '常见问题回答',
            visible: false,
            name: '',
            tableLoading: false,
            tableListData: [
                { name: '测试问题回答', feedBackCount: '12', pageRichContent: '测试问题回答内容'}
            ],
            tableSetting: questionColumn,
            selectedItems: [],
            type: 'add',
            addAnswerDialog: false
        }
    },
    methods: {
        closeDialogBtn() {
            this.$emit('update:show', false)
        },
        close() {
            this.closeDialogBtn()
        },
        initDialog(currVa) {
            this.name = currVa.name
        },
        handleSelectionChange(val) {
            this.selectedItems = val
        },
        addQuestionAnswer() {
            console.log('asdff')
            this.addAnswerDialog = true
            this.type = 'add'
            this.$refs.testTable.clearSelection()
        },
        modifyQuestionAnswer() {
            this.addAnswerDialog = true
            this.type = 'edit'
            this.$refs.answerDialog.initInfo(this.selectedItems[0])
            this.$refs.testTable.clearSelection()
        },
        delQuestionAnswer() {
            this.$confirm('是否删除已选中选项','提示',{
				confirmButtonText:'确认',
				cancelButtonText:"取消",
				type:'warning'
			}).then(async ()=>{
				this.tableListData.map((item, idx) => {
				if (item.id === this.selectedItems[0]?.id) {
					this.tableListData.splice(idx, 1)
				}
			})
			}).catch(()=>{
				this.$refs.testTable.clearSelection()
			})
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
.questionForm {
	padding-bottom: 20px;
}
.answer {
    width: 120px;
    height: 32px;
    line-height: 32px;
}
.form {
    width: 100%;
}
</style>