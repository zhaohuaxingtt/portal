<template>
	<el-card class="mt20">
		<div class="flex flex-row justify-end mt20 mb20">
			<iButton @click="addKnowledge">{{ language(`${addText}`) }}</iButton>
      <iButton @click="modifyHandler" :disabled='selectedItems.length == 0'>{{ language('修改') }}</iButton>
      <iButton @click="delHandler" :disabled='selectedItems.length == 0'>{{ language('删除') }}</iButton>
			<iButton v-show="manageType!=='content'" @click="addTypeFun" :disabled='selectedItems.length == 0'>{{ language('添加知识分类') }}</iButton>
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
			ref="addKnowledgeTypeDialog"
			v-show="showTypeDialog"
			:typeShow.sync="showTypeDialog"
			:operateType="operateType"
			@refresh='getTableList'
		/>

		<AddKnowledgeContent
			ref="addKnowledgeContent"
			v-show="showContentDialog"
			:contentShow.sync="showContentDialog"
			:operateType="operateType"
			@refresh='getTableList'
		/>

		<AddType
			ref="addTypeDialog"
			v-show="showKnowTypeDialog"
			:typeShow.sync="showKnowTypeDialog"
		/>
	</el-card>
</template>

<script>
import {iPagination, iTableCustom, iButton} from 'rise';
import { pageMixins } from '@/utils/pageMixins'
import { contentColumn, typeColumn } from './tableColumn'
import AddKnowledgeType from './addKnowledgeType.vue'
import AddKnowledgeContent from './addKnowledgeContent'
import AddType from './addType.vue'
import { getContentList, queryKnowledgeTypeList, delKnowledgeTypeById, publishedKnowledgeTypeById } from '@/api/adminProCS';
import moment from 'moment'
export default {
	components: {
		iButton,
		iPagination,
		iTableCustom,
		AddKnowledgeType,
		AddKnowledgeContent,
		AddType
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
			showKnowTypeDialog: false,  // 知识分类dialog flag
			typeContent: [
				{ name: '知识类型', enName: 'asde', createdAt: '2021-12-11', published: true, id: '1' }
			],
			contentData: [
				{ name:'测试小分类', title: '测试标题', speaker: '测试主讲人', openingDate: '2020-12-20', id: '1', section: '测试课程', department: '测试部门一', state: true, send: true, summary: '测试内容概要' }
			]
		}
	},
	async created() {
		// if (this.manageType === 'content') {
		// 	this.tableSetting = contentColumn(this)
		// } else {
		// 	this.tableSetting = typeColumn(this)

		// }
    this.tableSetting = this.manageType === 'content' ? contentColumn(this) : typeColumn(this)
		await this.getTableList()
		// this.tableListData = this.manageType === 'content' ? this.contentData : this.typeContent
  },
	mounted() {
		this.selectedItems = []
	},
	methods: {
		async publishChang(row){
			this.tableLoading = true
			// 更改当前类型管理的发布状态
			let formData = new FormData()
			formData.append('published', !row.published)
			await publishedKnowledgeTypeById(row.id, formData).then(res => {
				console.log(res, '122222')
				if (res?.success) {
					this.$message({type: 'success', message: '已更改当前发布状态'})
					this.getTableList()
				}
			}).catch(()=>{
        this.$refs.testTable.clearSelection()
      })
		},
		stateChang(row) {
			console.log(row, 'stateChang')
			this.tableListData.map(item => {
				if (item.id === row.id) {
					item.state = !row.state
				}
			})
		},
		sendChang(row) {
			console.log(row, 'sendChang')
			this.tableListData.map(item => {
				if (item.id === row.id) {
					item.send = !row.send
				}
			})
		},
		async getTableList(va) {
			this.tableLoading = true
			let params = {
				keyword: va ? va : '',
				page: this.page.currPage - 1,
				size: this.page.pageSize
			}
			let res = null
			if (this.manageType === 'content') {
				res = await getContentList(params)
			} else {
				res = await queryKnowledgeTypeList(params)
			}
			if (res) {
				this.tableListData = res.content || []
				this.page.totalCount = res.totalElements
				if (this.manageType === 'content') {
					console.log('111')
				} else {
					this.tableListData.map(item => {
						item.createdAt = moment(item.createdAt).format('YYYY-MM-DD')
					})
				}
			}
			this.tableLoading = false
		},
		addKnowledge() {
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
			if (this.selectedItems.length === 0) return this.$message('请选择...')
			if (this.manageType === 'content') {
				console.log('内容')
				this.showContentDialog = true
				this.operateType = 'edit'
				this.$refs.addKnowledgeContent.initModify(this.selectedItems[0])
			} else {
				if (this.selectedItems[0]?.published) return this.$message({type: 'warning', message: '上架的类型不能修改'})
				this.showTypeDialog = true
				this.operateType = 'edit'
				console.log('1111')
				this.$refs.addKnowledgeTypeDialog.initModify(this.selectedItems[0])
			}
		},
		delHandler() {
			if (this.manageType !== 'content') {
				if (this.selectedItems[0]?.published) return this.$message({type: 'warning', message: '上架的类型不能修改'})
			}
			this.$confirm('是否删除已选中选项','提示',{
        confirmButtonText:'确认',
        cancelButtonText:"取消",
        type:'warning'
      }).then(async ()=>{
				if (this.manageType === 'content') {
					console.log('22')
				} else {
					await delKnowledgeTypeById(this.selectedItems[0].id).then(res => {
						if (res.success) {
							this.$message({type: 'success', message: '已删除当前类型'})
							this.getTableList()
						}
					})
				}
      }).catch(()=>{
        this.$refs.testTable.clearSelection()
      })
		},
		addTypeFun() {
			console.log('1234')
			if (this.manageType !== 'content') {
				if (this.selectedItems[0]?.published) return this.$message({type: 'warning', message: '上架的知识类型不能添加分类'})
			}
			this.showKnowTypeDialog = true
			this.$refs.addTypeDialog.currTypeId = this.selectedItems[0]?.id
			this.$refs.addTypeDialog.getTableList()
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