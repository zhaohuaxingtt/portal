<template>
    <iCard>
        <div class="flex justify-between margin-bottom20">
            <div class="flex">
                <iInput style="width:220px" :placeholder="language('请输入')" v-model="keyWord" />
            </div>
            <div>
                <iButton style="margin-left:10px">搜索</iButton>
                <iButton @click="addQuestionFun">添加常见问题</iButton>
                <iButton @click="modifyQuestionFun" :disabled='selectedItems.length == 0'>修改</iButton>
                <iButton :disabled='selectedItems.length == 0'>删除</iButton>
                <iButton :disabled='selectedItems.length == 0'>问题回答</iButton>
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
    </iCard>
</template>

<script>
import { iCard, iInput, iButton, iPagination, iTableCustom} from 'rise';
import { pageMixins } from '@/utils/pageMixins'
import { QUESTION } from '../tables.js'
import addQuestion from './addQuestion.vue'
export default {
    name: 'question',
    components: {
        iCard,
        iButton,
        iInput,
        iPagination,
        iTableCustom,
        addQuestion
    },
    mixins: [pageMixins],
    data() {
        return {
            tableLoading: false,
            tableSetting: QUESTION,
            tableListData: [
                {firstLetter: 'a', name: '测试问题藐视', updatedAt: '2020-11-20'}
            ],
            selectedItems: [],
            type: 'add',
            addQuestionDialog: false
        }
    },
    methods: {
        handleSelectionChange(val) {
            console.log(val, '2345')
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
        }
    }
}
</script>

<style lang="scss" scoped>
@import "./../../../comon";
</style>