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
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
            style="width: 320px"
          >
          </el-date-picker>
        </iFormItem>
      </el-form>
    </iSearch>
    <iCard class="margin-top20">
      <div class="btn">
        <iButton @click="addTypeFun">新增</iButton>
        <button-table-setting @click="$refs.testTable.openSetting()" />
      </div>
      <iTableCustom
        class="margin-top20"
        :ref="'testTable'"
        :loading="tableLoading"
        :data="tableData"
        :columns="tableSetting"
        :extraData="extraData"
        permission-key="ADMIN_REPORT_TYPE"
        @topChang="topChang"
        @statusChang="statusChang"
        @handle-selection-change="handleSelectionChange"
      >
      </iTableCustom>
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
      @refresh="getTableList"
    />
  </div>
</template>

<script>
import {
  iInput,
  iFormItem,
  iSelect,
  iSearch,
  iTableCustom,
  iPagination,
  iCard,
  iButton
} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { typeColumn } from './columnData'
import AddDialog from './addDialog'
import AddTypeDialog from './addTypeDialog'
import {
  deleteType,
  queryTypeList,
  topType,
  publishedTypeById,
  reportTypeDetailById
} from '@/api/reportForm'
import moment from 'moment'
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
		this.getTableList()
	},
	methods: {
		async getTableList() {
			let params = {
				current: this.page.currPage,
				size: this.page.pageSize
			}
			if (this.searchFlag) {
				Object.assign(params, this.queryForm)
			}
			try {
				this.tableLoading = true
				await queryTypeList(params).then(res => {
					console.log(res, '111')
					if (res?.code === '200') {
						this.tableData = res?.data || []
						this.tableData.map(item => {
							item.createdAt = moment(item.createdAt).format('YYYY-MM-DD hh:mm:ss')
						})
						this.page.totalCount = res.total
						this.tableLoading = false
						this.searchFlag = false
					}
				})
			} finally {
				this.tableLoading = false
			}
		},
		sure() {
			if (this.addTime.length > 0) {
				this.queryForm.startTime = new Date(this.addTime?.[0] || '')
				this.queryForm.endTime = new Date(this.addTime?.[1] || '')
			}
			this.page.currPage = 1
			this.searchFlag = true
			this.getTableList()
		},
		reset() {
			Object.keys(this.queryForm).forEach((item) => {
				this.queryForm[item] = ''
			})
			this.addTime = []
			this.page.currPage = 1
			this.searchFlag = false
			this.getTableList()
		},
		async statusChang(row) {
			let formData = new FormData()
			formData.append('published', !row.published)
			this.tableLoading = true
			await publishedTypeById(row.id, formData).then(res => {
				if (res?.success) {
					this.$message({type: 'success', message: '已更改当前上下架状态'})
					this.getTableList()
				}
			})
		},
		async topChang(row) {
			let formData = new FormData()
			formData.append('isTop', !row.isTop)
			this.tableLoading = true
			await topType(row.id, formData).then(res => {
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
            this.$confirm('确定删除此类型吗?', '提示', {
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
		async modify(row) {
		console.log('modify', row)
		if (row.published)
			return this.$message({
			type: 'warning',
			message: `${this.commonText}修改!!!`
			})
		let currDetail = null
		this.tableLoading = true
		await reportTypeDetailById(row.id).then((res) => {
			if (res) {
			currDetail = res
			this.tableLoading = false
			this.$refs.typeDialog.getUsersList()
			this.$refs.typeDialog.getOrganizationsList()
			this.dialogShow = true
			this.operateType = 'edit'
			this.$refs.typeDialog.initModify(currDetail)
			}
		})
		},
		addReportType(row) {
		if (row.published)
			return this.$message({
			type: 'warning',
			message: `${this.commonText}添加分类!!!`
			})
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
.btn {
  text-align: right;
}
</style>
