<template>
	<iCard>
		<div class="flex justify-between margin-bottom20">
            <div class="flex">
                <iInput style="width:220px" :placeholder="language('请输入')" v-model="keyWord" />
            </div>
            <div>
				<iButton @click="search">{{ language('搜索') }}</iButton>
				<iButton @click="addAttach">{{ language('新增流程附件') }}</iButton>
				<!-- <iButton @click="modifyAttach" :disabled='selectedItems.length == 0'>{{ language('修改') }}</iButton> -->
				<!-- <iButton @click="delAttach" :disabled='selectedItems.length == 0'>{{ language('删除') }}</iButton> -->
            </div>
        </div>
		<iTableCustom
			ref="testTable"
			:loading="tableLoading"
			:data="tableListData"
			:columns="tableSetting"
			:extraData="{
                del:delAttach
            }"
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
		<addAttach
            ref="attachDialog"
            v-show="addAttachDialog" 
            :show.sync="addAttachDialog" 
            :type="type"
			@refresh="queryList"
        />
	</iCard>
</template>

<script>
import { iCard, iInput, iButton, iPagination, iTableCustom } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { AttachColumn } from '../tables.js'
import addAttach from './addAttach.vue'
import {queryProcessFileList, deleteProcessFile} from '@/api/adminProCS';
export default {
    data () {
		return {
			keyWord: '',
			tableLoading: false,
			tableListData: [],
			tableSetting: AttachColumn,
			selectedItems: [],
			addAttachDialog: false,
			type: 'add',
            processId: this.$route.query.id
		}
	},
	components: {
		iCard,
		iInput,
		iButton,
		iPagination,
		iTableCustom,
		addAttach
	},
	mixins: [pageMixins],
	methods: {
		async queryList() {
			let data = {
                page: this.page.currPage - 1,
                size: this.page.pageSize,
                keyword: this.keyWord,
				fileType: "PRO_SAMPLE"
            }
            this.tableLoading = true
            try {
                let res = await queryProcessFileList(this.processId,data)
                this.tableListData = res.content
                this.page.totalCount = res.totalElements
            } finally {
                this.tableLoading = false
            }
		},
		search() {
			this.page.currPage = 1
			this.queryList()
		},
		modifyAttach() {
			console.log(this.keyword, 'modifyAttach')
		},
		addAttach() {
			console.log(this.keyword, 'addAttach')
			this.addAttachDialog = true
			this.type = 'add'
			this.$refs.testTable.clearSelection()
		},
		delAttach(row) {
			this.$confirm('是否删除此附件','提示',{
				confirmButtonText:'确认',
				cancelButtonText:"取消",
				type:'warning'
			}).then(async ()=>{
				this.tableLoading = true
				await deleteProcessFile(row.id)
				this.$message.success("删除成功")
				this.queryList()
			})
		}
	}    
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
</style>