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
	</el-card>
</template>

<script>
import {iPagination, iTableCustom, iButton} from 'rise';
import { pageMixins } from '@/utils/pageMixins'
import { contentColumn, typeColumn } from './tableColumn'
import AddKnowledgeType from './addKnowledgeType.vue'
export default {
	components: {
		iButton,
		iPagination,
		iTableCustom,
		AddKnowledgeType
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
			showTypeDialog: false  // 知识类型的的展示flag
		}
	},
	created() {
    this.tableSetting = this.manageType === 'content' ? contentColumn : typeColumn
  },
	mounted() {
		this.getTableList()
	},
	methods: {
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
			} else {
				this.showTypeDialog = true
				this.operateType = 'add'
				console.log('333')
			}
			
		},
		modifyHandler() {
			if (this.manageType === 'content') {
				console.log('内容')
			} else {
				this.showTypeDialog = true
				this.operateType = 'edit'
				console.log('1111')
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