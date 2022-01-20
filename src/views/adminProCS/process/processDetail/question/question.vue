<template>
    <iCard>
        <div class="flex justify-between margin-bottom20">
            <div class="flex">
                <iInput style="width:220px" :placeholder="language('请输入')" v-model="keyWord" />
            </div>
            <div>
                <iButton @click="search">搜索</iButton>
                <iButton @click="addQuestionFun">添加常见问题</iButton>
                <iButton @click="modifyQuestionFun" :disabled='selectedItems.length == 0'>修改</iButton>
                <iButton @click="delQuestionFun" :disabled='selectedItems.length == 0'>删除</iButton>
                <iButton @click="handleQuestionAnswer" :disabled='selectedItems.length == 0'>问题回答</iButton>
            </div>
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
            v-if="showPage"
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
        <addQuestion
            ref="questionDialog"
            v-show="addQuestionDialog" 
            :show.sync="addQuestionDialog" 
            :type="type"
        />
		<questionAnswer
			ref="questionAnswerDialog"
			v-show="questionAnswerShow" 
            :show.sync="questionAnswerShow" 
		/>
    </iCard>
</template>

<script>
import { iCard, iInput, iButton, iPagination, iTableCustom} from 'rise';
import { pageMixins } from '@/utils/pageMixins'
import { QUESTION } from '../tables.js'
import addQuestion from './addQuestion.vue'
import questionAnswer from './questionAnswer'
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
            tableListData: [
                { firstLetter: 'a', name: '测试问题藐视', updatedAt: '2020-11-20' },
				{ firstLetter: 'b', name: '测试问题视', updatedAt: '2020-11-21' }
            ],
            selectedItems: [],
            type: 'add',
            addQuestionDialog: false,
            keyWord: '',
			questionAnswerShow: false
        }
    },
    methods: {
        handleSelectionChange(val) {
            this.selectedItems = val
        },
        addQuestionFun() {
            this.type = 'add'
            this.addQuestionDialog = true
        },
        modifyQuestionFun() {
            this.type = 'edit'
            this.addQuestionDialog = true
            this.$refs.questionDialog.initModifyQuestion(this.selectedItems)
        },
        search() {
            console.log(this.keyWord, "keyWord")
        },
        delQuestionFun() {
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
        },
		handleQuestionAnswer() {
			console.log(this.selectedItems[0], '2222')
			this.questionAnswerShow = true
			this.$refs.questionAnswerDialog.initDialog(this.selectedItems[0])
		}
    }
}
</script>

<style lang="scss" scoped>
@import "./../../../comon";
</style>