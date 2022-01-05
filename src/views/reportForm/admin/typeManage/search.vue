<template>
	<div>
		<iSearch @sure="sure" @reset="reset" icon>
			<el-form>
				<iFormItem :label="language('类型名称')">
					<iInput v-model="queryForm.typeName" clearable placeholder="请输入" />
				</iFormItem>
				<iFormItem :label="language('状态')">
					<iSelect
						v-model="queryForm.status"
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
						v-model="queryForm.topFlag"
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
						v-model="queryForm.addTime"
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
			v-show="showTypeDialog"
			:typeShow.sync="showTypeDialog"
		/>
		<AddDialog
			v-show="dialogShow"
			:show.sync="dialogShow"
			:operateType="operateType"
		/>
	</div>
</template>

<script>
import { iInput, iFormItem, iSelect, iSearch, iTableCustom, iPagination, iCard, iButton } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { typeColumn } from './columnData'
import AddDialog from './addDialog'
import AddTypeDialog from './addTypeDialog'
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
				typeName: '',
				status: '',
				topFlag: '',
				startAddDate: '',
				endAddDate: ''
			},
			aaa: false,
			addTime: [],
			statusList: [
				{ label: '上架', value: '1', id: '0' },
				{ label: '下架', value: '2', id: '1' },
			],
			topList: [
				{ label: '是', value: '1', id: '0' },
				{ label: '否', value: '2', id: '1' },
			],
			tableLoading: false,
			tableData: [
				{typeName: '测试类型名称', addDate: '2020-12-20', manager: '1111,2222,3333,4444,5555,666,777', org: 'CS', people: '张三', top: true, status: false, id: '1'}
			],
			tableSetting: typeColumn,
			extraData: {
				operate: this.operate
			},
			showTypeDialog: false,
			commonText: '上架的类型不允许',
			dialogShow: false,
			operateType: 'add'
		}
	},
	methods: {
		sure() {
			console.log(this.queryForm, '1111')
			if (this.addTime.length > 0) {
				this.queryForm.startAddDate = this.addTime?.[0] || ''
				this.queryForm.endAddDate = this.addTime?.[1] || ''
			}
			this.page.currPage = 1
		},
		reset() {
			Object.keys(this.queryForm).forEach((item) => {
				this.queryForm[item] = ''
			})
			this.addTime = []
			this.page.currPage = 1
		},
		statusChang(row) {
			console.log(row, '1111')
			this.tableData.map(item => {
				if (item.id === row.id) {
					item.status = !item.status
				}
			})
		},
		topChang(row) {
			console.log(row, '22222')
			this.tableData.map(item => {
				if (item.id === row.id) {
					item.top = !item.top
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
			if (row.status) return this.$message({type: 'warning', message: `${this.commonText}删除!!!`})
            this.$confirm('确定删除此流程指导书吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            })
        },
		modify(row) {
			console.log('modify', row)
			if (row.status) return this.$message({type: 'warning', message: `${this.commonText}修改!!!`})
			this.dialogShow = true
			this.operateType = 'edit'
		},
		addReportType(row) {
			if (row.status) return this.$message({type: 'warning', message: `${this.commonText}添加分类!!!`})
			console.log('addReportType', row)
			this.showTypeDialog = true
		},
		addTypeFun() {
			console.log('添加类型')
			this.dialogShow = true
			this.operateType = 'add'
		}
	}
}
</script>

<style lang="scss" scoped>
.manager-title {
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.btn{
    text-align: right;
}
</style>


