<template>
	<div>
		<iSearch @sure="sure" @reset="reset" icon>
			<el-form>
				<iFormItem :label="language('类型名称')">
					<iInput v-model="queryForm.name" clearable placeholder="请输入" />
				</iFormItem>
				<iFormItem :label="language('状态')">
					<iSelect
						v-model="queryForm.published"
						filterable
						placeholder="请选择"
						clearable
					>
						<el-option
							v-for="item in statusList"
							:key="item.id"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</iSelect>
				</iFormItem>
				<iFormItem :label="language('是否置顶')">
					<iSelect
						v-model="queryForm.isTop"
						filterable
						placeholder="请选择"
						clearable
					>
						<el-option
							v-for="item in topList"
							:key="item.id"
							:label="item.label"
							:value="item.value"
						>
						</el-option>
					</iSelect>
				</iFormItem>
				<iFormItem :label="language('添加日期')">
					<el-date-picker
						v-model="addTime"
						type="daterange"
						range-separator="至"
						start-placeholder="开始日期"
						end-placeholder="结束日期"
						value-format="yyyy-MM-dd"
						style="width:320px"
					>
					</el-date-picker>
				</iFormItem>
			</el-form>
		</iSearch>
		<iCard class="margin-top20">
			<div class="btn">
                <iButton @click="addTypeFun">新增</iButton>
            </div>
			<iTableCustom
				class="margin-top20"
				:ref="'testTable'"
				:loading="tableLoading"
				:data="tableData"
				:columns="tableSetting"
				:extraData="extraData"
				@topChang="topChang"
				@statusChang="statusChang"
				@handle-selection-change="handleSelectionChange"
			>
			</iTableCustom>
			<iPagination
				v-update
				@size-change="handleSizeChange($event, getList)"
				@current-change="handleCurrentChange($event, getList)"
				background
				:current-page="page.currPage"
				:page-sizes="page.pageSizes"
				:page-size="page.pageSize"
				:layout="page.layout"
				:total="page.totalCount"
			/>
		</iCard>
		<AddTypeDialog
			ref="categoryDialog"
			v-show="showTypeDialog"
			:typeShow.sync="showTypeDialog"
		/>
		<AddDialog
			ref="typeDialog"
			v-show="dialogShow"
			:show.sync="dialogShow"
			:operateType="operateType"
			@refresh='getTableList'
		/>
	</div>
</template>

<script>
import { iInput, iFormItem, iSelect, iSearch, iTableCustom, iPagination, iCard, iButton } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { typeColumn } from './columnData'
import AddDialog from './addDialog'
import AddTypeDialog from './addTypeDialog'
import { deleteType, queryTypeList, topType, publishedTypeById } from '@/api/reportForm';
export default {
	components: {
		iInput,
		iFormItem,
		iSelect,
		iSearch,
		iTableCustom,
		iPagination,
		iCard,
		AddTypeDialog,
		iButton,
		AddDialog
	},
	mixins: [pageMixins],
	data () {
		return {
			queryForm: {
				name: '',
				published: '',
				isTop: '',
				startTime: '',
				endTime: ''
			},
			aaa: false,
			addTime: [],
			statusList: [
				{ label: '上架', value: true, id: '0' },
				{ label: '下架', value: false, id: '1' },
			],
			topList: [
				{ label: '是', value: true, id: '0' },
				{ label: '否', value: false, id: '1' },
			],
			tableLoading: false,
			tableData: [],
			tableSetting: typeColumn,
			extraData: {
				operate: this.operate
			},
			showTypeDialog: false,
			commonText: '上架的类型不允许',
			dialogShow: false,
			operateType: 'add',
			searchFlag: false
		}
	},
	mounted() {
		this.getTableLst()
	},
	methods: {
		async getTableLst() {
			let params = {
				page: this.page.currPage,
				size: this.page.pageSize
			}
			if (this.searchFlag) {
				Object.assign(params, this.queryForm)
			}
			this.tableLoading = true
			await queryTypeList(params).then(res => {
				if (res?.code === '200') {
					this.tableData = res?.data || []
					this.page.totalCount = res.total
					this.tableLoading = false
					this.searchFlag = false
				}
			})
		},
		sure() {
			if (this.addTime.length > 0) {
				this.queryForm.startTime = new Date(this.addTime?.[0] || '')
				this.queryForm.endTime = new Date(this.addTime?.[1] || '')
			}
			this.page.currPage = 1
			this.searchFlag = true
			this.getTableLst()
		},
		reset() {
			Object.keys(this.queryForm).forEach((item) => {
				this.queryForm[item] = ''
			})
			this.addTime = []
			this.page.currPage = 1
			this.searchFlag = false
			this.getTableLst()
		},
		async statusChang(row) {
			let params = {
				published: !row.published
			}
			await publishedTypeById(row.id, params).then(res => {
				if (res?.success) {
					this.$message({type: 'success', message: '已更改当前消息发送状态'})
					this.getTableList()
				}
			})
		},
		async topChang(row) {
			console.log(row, '22222')
			let params = {
				isTop: !row.isTop
			}
			await topType(row.id, params).then(res => {
				if (res?.success) {
					this.$message({type: 'success', message: '已更改当前置顶状态'})
					this.getTableList()
				}
			})
		},
		operate(type, row) {
			switch(type) {
				case 'modify':
					this.modify(row)
					break;
				case 'del':
					this.del(row)
					break;
				case 'add':
					this.addReportType(row)
					break;
				default:
					break
			}
		},
		del(row){
			console.log(row, '111')
			if (row.published) return this.$message({type: 'warning', message: `${this.commonText}删除!!!`})
            this.$confirm('确定删除此流程指导书吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
				await deleteType(row.id).then(res => {
					console.log(res, '22')
					if (res?.success) {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.getTableList()
					}
				})
                
            })
        },
		modify(row) {
			console.log('modify', row)
			if (row.published) return this.$message({type: 'warning', message: `${this.commonText}修改!!!`})
			this.dialogShow = true
			this.operateType = 'edit'
			let currRow = JSON.parse(JSON.stringify(row))
			this.$refs.typeDialog.initModify(currRow)
		},
		addReportType(row) {
			if (row.published) return this.$message({type: 'warning', message: `${this.commonText}添加分类!!!`})
			this.showTypeDialog = true
			this.$refs.categoryDialog.getTableList(row.id)
		},
		addTypeFun() {
			console.log('添加类型')
			this.dialogShow = true
			this.operateType = 'add'
			this.$refs.typeDialog.getUsersList()
			this.$refs.typeDialog.getOrganizationsList()
		}
	}
}
</script>

<style lang="scss" scoped>
.btn{
    text-align: right;
}
</style>


