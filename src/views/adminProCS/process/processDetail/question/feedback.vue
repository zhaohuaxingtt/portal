<template>
    <iDialog
        :title="dialogTitle"
        :visible.sync="show" 
        width="60%" 
        @close='closeDialogBtn' 
        @open="open"
        append-to-body
    >
        <div class="questionForm">
            <div class="flex margin-bottom20">
                <iInput style="width:220px" clearable :placeholder="language('请输入')" v-model="keyword" />
                <iButton style="margin-left:10px" @click="query">搜索</iButton>
            </div>
            <iTableCustom
                ref="testTable"
                :loading="tableLoading"
                :data="tableListData"
                :columns="tableSetting"
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
        </div>
    </iDialog>
</template>

<script>
import { pageMixins } from '@/utils/pageMixins'
import { iDialog, iButton, iPagination, iTableCustom, iInput } from 'rise'
import {answerFeedBackList} from '@/api/adminProCS';

export default {
    name: 'questionAnswer',
    components: {
        iDialog,
        iButton,
        iPagination,
        iTableCustom,
        iInput
    },
    props: {
        show: {
            type: Boolean,
            default: false
        },
        id:{
            default: ""
        }
    },
    mixins: [pageMixins],
    data() {
        return {
            dialogTitle: '常见问题回答',
            tableLoading: false,
            tableListData: [],
            tableSetting: [
                {
                    type:'index',
                    label:'序号',
                    width: 100
                },
                {
                    prop:'feedBackContent',
                    label:'内容',
                    align: 'center',
                    tooltip: true
                },
                {
                    prop:'userName',
                    label:'提交人',
                    align: 'center'
                },
                {
                    prop:'createdAt',
                    label:'提交时间',
                    align: 'center'
                },
            ],
            keyword:""
        }
    },
    methods: {
        closeDialogBtn() {
            this.keyword = ""
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
                    size: this.page.pageSize,
                    keyword: this.keyword
                }
                let res = await answerFeedBackList(this.id,data)
                this.tableListData = res.content
                this.page.totalCount = res.totalElements
            
            } finally {
                this.tableLoading = false
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