<template>
	<el-card class="mt20 style">
		<div class="aaa" id="testDiv"></div>
		<div class="flex flex-row justify-end mt20 mb20">
			<iButton @click="addGlossary">{{ language('新增') }}</iButton>
      <iButton @click="modifyHandler" :disabled='selectedItems.length == 0'>{{ language('修改') }}</iButton>
      <iButton @click="delHandler" :disabled='selectedItems.length == 0'>{{ language('删除') }}</iButton>
    </div>
		<iTableCustom
      ref="testTable"
      :loading="tableLoading"
      :data="tableListData"
      :columns="tableSetting"
			singleChoice
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

		<addGlossaryDialog ref="glossaryDialog" v-show="showDialog" :show.sync="showDialog" @refresh='getTableList' :type="type" />
	</el-card>
</template>

<script>

import {iPagination, iTableCustom, iButton} from 'rise';
import { pageMixins } from '@/utils/pageMixins'
import { tableColumn } from './tableColumn'
import AddGlossaryDialog from './addGlossary'
import { glossaryListByPage, delGlossaryById } from '@/api/adminProCS';
export default {
	components: {
		iTableCustom,
		iPagination,
		iButton,
		AddGlossaryDialog
	},
  props:{
    params:{
      type: Object,
      default: () => {}
    }
  },
	mixins: [pageMixins],
	data () {
		return {
			tableLoading: false,
			tableSetting: tableColumn,
			tableListData: [],
			selectedItems: [],
			showDialog: false,
			type: 'add',
			clickFlag: false
		}
	},
	mounted() {
		this.getTableList()
	},
	methods: {
		async getTableList() {
      try {
        this.tableLoading = true
        let params = {
          pageNum:this.page.currPage,
          pageSize: this.page.pageSize,
          ...this.params
        }
        let res = await glossaryListByPage(params)
				console.log(res, '1222')
				if (res) {
					this.tableListData = res.content || []
					this.page.totalCount = res.totalElements
				}
        // if(res.code == 200){
        //   this.tableListData = res.data.records || []
        //   this.page.totalCount = res.data.total
        // }
      } finally {
        this.tableLoading = false
      }
		},
		handleSelectionChange(val) {
      this.selectedItems = val
    },
		addGlossary() {
			this.type = 'add'
			this.showDialog = true
		},
		modifyHandler() {
			this.type = 'edit'
			this.showDialog = true
			this.$refs.glossaryDialog.initModifyContent(this.selectedItems)
		},
		delHandler() {
			this.$confirm('是否删除已选中选项','提示',{
        confirmButtonText:'确认',
        cancelButtonText:"取消",
        type:'warning'
      }).then(async ()=>{
        await delGlossaryById(this.selectedItems[0].id)
        this.getTableList()
      }).catch(()=>{
        this.$refs.testTable.clearSelection()
      })
		}
	}
}
</script>


<style lang="scss" scoped>
@import '../comon.scss';
.style {
	position: relative;
}
.aaa {
	position: absolute;
	display: none;
	background-color: red;
}
</style>