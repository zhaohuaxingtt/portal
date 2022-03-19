<template>
    <iDialog
        :title="dialogTitle"
        style="margin-top:10vh"
        :visible.sync="show" 
        width="60%" 
        @close='closeDialogBtn' 
        @open="open"
        append-to-body
    >
        <el-form
            label-position="left"
            label-width="100px"
        >
            <iFormItem :label="language('问题描述')">
                <div>{{ info.name }}</div>
			</iFormItem>
        </el-form>
        <div class="flex flex-row questionForm">
            <div class="answer">问题回答</div>
            <div class="form">
                <div class="mb20">
                    <iButton @click="addQuestionAnswer">添加问题回答</iButton>
                </div>
                <iTableCustom
                    ref="testTable"
                    :loading="tableLoading"
                    :data="tableListData"
                    :columns="tableSetting"
                    :extraData="{
                        operate:operate,
                    }"
                />
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
                <div class="flex justify-end btn">
                    <iButton @click="closeDialogBtn">{{ language('返回子流程列表') }}</iButton>
                </div>
            </div>
        </div>
        <addAnswer
            ref="answerDialog"
            :show.sync="addAnswerDialog"
            :type="type"
            :detail="detail"
            :qsId="this.info.id"
            @refresh="query"
        />
        <feedback :show.sync="feedback.show" :id="feedback.id"></feedback>
    </iDialog>
</template>

<script>
import { pageMixins } from '@/utils/pageMixins'
import { questionColumn } from './table.js'
import { iDialog, iFormItem, iButton, iPagination, iTableCustom } from 'rise'
import addAnswer from './addAnswer'
import feedback from './feedback.vue'
import {queryFAQAnswerList, deleteIssueAnswer} from '@/api/adminProCS';

export default {
    name: 'questionAnswer',
    components: {
        iDialog,
        iFormItem,
        iButton,
        iPagination,
        iTableCustom,
        addAnswer,
        feedback
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        info:{
            type: Object,
            default: () => {}
        }
    },
    mixins: [pageMixins],
    data() {
        return {
            dialogTitle: '常见问题回答',
            tableLoading: false,
            tableListData: [],
            tableSetting: questionColumn,
            type: 'add',
            addAnswerDialog: false,
            detail:{},
            feedback:{
                show:false,
                id:""
            }
        }
    },
    methods: {
        closeDialogBtn() {
            this.tableListData = []
            this.$emit('update:show', false)
        },
        close() {
            this.closeDialogBtn()
        },
        open(){
            this.$nextTick(() => {  
                this.query()
            })
        },
        async query(){
            try {
                this.tableLoading = true
                let data = {
                    page: this.page.currPage - 1,
                    size: this.page.pageSize
                }
                let res = await queryFAQAnswerList(this.info.id,data)
                this.tableListData = res.content
                this.page.totalCount = res.totalElements
            
            } finally {
                this.tableLoading = false
            }
        },
        addQuestionAnswer() {
            this.detail = {}
            this.addAnswerDialog = true
        },
         operate(type,row){
            switch (type) {
                case "edit":
                    this.detail = JSON.parse(JSON.stringify(row))
                    this.addAnswerDialog = true
                    break;
            
                case "del":
                    this.$confirm('确定删除此回答吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async () => {
                        this.tableLoading = true
                        await deleteIssueAnswer(row.id)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.query()
                    })
                    break;
                case "feedback":
                    this.feedback.id = row.id
                    this.feedback.show = true
                    break;
            }
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
.btn {
    padding-top: 20px;
}
</style>