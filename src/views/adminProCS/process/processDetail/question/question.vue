<template>
    <iCard>
        <div class="flex justify-between margin-bottom20">
            <div class="flex">
                <iInput style="width:220px" :placeholder="language('请输入')" v-model="keyWord" />
            </div>
            <div>
                <iButton @click="search">{{language('搜索')}}</iButton>
                <iButton @click="addQuestionFun">{{language('添加常见问题')}}</iButton>
                <!-- <iButton @click="modifyQuestionFun" :disabled='selectedItems.length == 0'>修改</iButton>
                <iButton @click="delQuestionFun" :disabled='selectedItems.length == 0'>删除</iButton>
                <iButton @click="handleQuestionAnswer" :disabled='selectedItems.length == 0'>问题回答</iButton> -->
            </div>
        </div>

        <iTableCustom
            ref="testTable"
            :loading="tableLoading"
            :data="tableListData"
            :columns="tableSetting"
            :extraData="{
                operate:operate,
            }"
            singleChoice=true
            @handle-selection-change="handleSelectionChange"
        />
        <iPagination
            v-update
            @size-change="handleSizeChange($event, queryList)"
            @current-change="handleCurrentChange($event, queryList)"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount"
        />
        <addQuestion
            ref="questionDialog"
            :show.sync="addQuestionDialog" 
            :type="type"
            @refresh="queryList"
        />
		<questionAnswer
			ref="questionAnswerDialog"
            :show.sync="questionAnswerShow" 
            :info="qsInfo"
		/>
    </iCard>
</template>

<script>
import { iCard, iInput, iButton, iPagination, iTableCustom} from 'rise';
import { pageMixins } from '@/utils/pageMixins'
import { QUESTION } from '../tables.js'
import addQuestion from './addQuestion.vue'
import questionAnswer from './questionAnswer'
import {queryProcessFAQList,deleteProcessFAQ} from '@/api/adminProCS';
export default {
    name: 'question',
    components: {
        iCard,
        iButton,
        iInput,
        iPagination,
        iTableCustom,
        addQuestion,
		questionAnswer
    },
    mixins: [pageMixins],
    data() {
        return {
            tableLoading: false,
            tableSetting: QUESTION,
            tableListData: [],
            selectedItems: [],
            type: 'add',
            addQuestionDialog: false,
            keyWord: '',
			questionAnswerShow: false,
            qsInfo:{},
            processId: this.$route.query.id
        }
    },
    created () {
    },
    methods: {
        async queryList(){            
            let data = {
                page: this.page.currPage - 1,
                size: this.page.pageSize,
                keyword: this.keyWord
            }
            this.tableLoading = true
            try {
                let res = await queryProcessFAQList(this.processId,data)
                this.tableListData = res.content
                this.page.totalCount = res.totalElements
            } finally {
                this.tableLoading = false
            }
        },
        handleSelectionChange(val) {
            this.selectedItems = val
        },
        addQuestionFun() {
            this.type = 'add'
            this.addQuestionDialog = true
        },
        search() {
            this.page.currPage = 1
            this.queryList()
        },
        operate(type,row){
            switch (type) {
                case "answer":
                    this.questionAnswerShow = true
                    this.qsInfo = JSON.parse(JSON.stringify(row))
                    // this.$refs.questionAnswerDialog.initDialog(JSON.parse(JSON.stringify(row)))
                    break;
                case "edit":
                    this.type = 'edit'
                    this.addQuestionDialog = true
                    this.$refs.questionDialog.initForm(row)
                    break;
            
                case "del":
                    this.$confirm('确定删除此问题吗?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(async () => {
                        this.tableLoading = true
                        await deleteProcessFAQ(row.id)
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.queryList()
                    })
                    break;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./../../../comon";
</style>