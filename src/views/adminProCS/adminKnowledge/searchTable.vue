<template>
	<el-card class="mt20">
		<div class="flex flex-row justify-end mt20 mb20">
			<iButton @click="addGlossary">{{ language(`${addText}`) }}</iButton>
      <iButton @click="modifyHandler" :disabled='selectedItems.length == 0'>{{ language('修改') }}</iButton>
      <iButton @click="delHandler" :disabled='selectedItems.length == 0'>{{ language('删除') }}</iButton>
    </div>
		<iTableCustom
      ref="testTable"
      :loading="tableLoading"
      :data="tableListData"
      :columns="tableSetting"
			@publishChang='publishChang'
			@stateChang="stateChang"
			@sendChang="sendChang"
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

		<AddKnowledgeType
			ref="addKnowledgeType"
			v-show="showTypeDialog"
			:typeShow.sync="showTypeDialog"
			:operateType="operateType"
		/>

		<AddKnowledgeContent
			ref="addKnowledgeContent"
			v-show="showContentDialog"
			:contentShow.sync="showContentDialog"
			:operateType="operateType"
		/>
	</el-card>
</template>

<script>
import {iPagination, iTableCustom, iButton} from 'rise';
import { pageMixins } from '@/utils/pageMixins'
import { contentColumn, typeColumn } from './tableColumn'
import AddKnowledgeType from './addKnowledgeType.vue'
import AddKnowledgeContent from './addKnowledgeContent'
export default {
	components: {
		iButton,
		iPagination,
		iTableCustom,
		AddKnowledgeType,
		AddKnowledgeContent
	},
	props: {
		manageType: {
			type: String,
			default: 'content'
		}
	},
	mixins: [pageMixins],
	data() {
		return {
			selectedItems: [],
			tableSetting: [],
			tableLoading: false,
			tableListData: [],
			operateType: 'add',  // 知识类型的操作类型
			showTypeDialog: false,  // 知识类型的的展示flag
			showContentDialog: false,  // 知识内容展示flag
			typeContent: [
				{name: '知识类型', enName: 'asde', createdAt: '2021-12-11', published: true}
			],
			contentData: [
				{name:'测试小分类', title: '测试标题', speaker: '测试主讲人', openingDate: '2020-12-20', section: '测试课程', department: '测试部门一', state: true, send: true, summary: '测试内容概要'}
			]
		}
	},
	created() {
    this.tableSetting = this.manageType === 'content' ? contentColumn(this) : typeColumn(this)
		this.tableListData = this.manageType === 'content' ? this.contentData : this.typeContent
  },
	mounted() {
		this.selectedItems = []
		this.getTableList()
	},
	methods: {
		publishChang(row){
			// 更改当前类型管理的发布状态
			console.log(row,'----=====')
		},
		stateChang(row) {
			console.log(row, 'stateChang')
		},
		sendChang(row) {
			console.log(row, 'sendChang')
		},
		getTableList(va) {
			this.tableLoading = true
			let params = {
				keyword: va ? va : '',
				pageNum:this.page.currPage,
				pageSize: this.page.pageSize,
				type: this.manageType
			}
			console.log(params, "123")
			this.tableLoading = false
		},
		addGlossary() {
			if (this.manageType === 'content') {
				console.log('内容')
				this.showContentDialog = true
				this.operateType = 'add'
			} else {
				this.showTypeDialog = true
				this.operateType = 'add'
				console.log('333')
			}
			
		},
		modifyHandler() {
			if (this.manageType === 'content') {
				console.log('内容')
				this.showContentDialog = true
				this.operateType = 'edit'
				this.$refs.addKnowledgeContent.initModify(this.selectedItems[0])
			} else {
				this.showTypeDialog = true
				this.operateType = 'edit'
				console.log('1111')
				this.$refs.addKnowledgeType.initModify(this.selectedItems[0])
			}
		},
		delHandler() {
			console.log('2222')
		},
		handleSelectionChange(val) {
      this.selectedItems = val
    },
	},
	computed: {
		addText() {
			return this.manageType === 'content' ? '添加内容' : '添加知识类型'
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../comon.scss';
</style>