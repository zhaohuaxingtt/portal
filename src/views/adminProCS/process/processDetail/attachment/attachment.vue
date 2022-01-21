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
				<iButton @click="delAttach" :disabled='selectedItems.length == 0'>{{ language('删除') }}</iButton>
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
        />
	</iCard>
</template>

<script>
import { iCard, iInput, iButton, iPagination, iTableCustom } from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { AttachColumn } from '../tables.js'
import addAttach from './addAttach.vue'
export default {
    data () {
		return {
			keyWord: '',
			tableLoading: false,
			tableListData: [
				{name: '2222', version: '1.2.3', publishDate: '2020-12-21'}
			],
			tableSetting: AttachColumn,
			selectedItems: [],
			addAttachDialog: false,
			type: 'add',
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
		getTableList() {
			console.log(this.keyword, '124')
		},
		search() {
			this.getTableList()
		},
		handleSelectionChange(val) {
            this.selectedItems = val
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
		delAttach() {
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
		}
	}    
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
</style>