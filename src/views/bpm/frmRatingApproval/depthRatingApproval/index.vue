<!--
 * @Author: 舒杰
 * @Date: 2021-06-08 16:51:54
 * @LastEditTime: 2021-07-13 09:50:34
 * @LastEditors: 舒杰
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\bpm\frmRatingApproval\depthRatingApproval\index.vue
-->
<!--
 * @author: shujie
 * @createTime: 2021-5-21 11:45:11
 * @Description:深评审批清单
 -->
<template>
	<!--深评审批清单-->
		<div class="iPage">
			<!-- <div class="margin-bottom20 flex-between-center">
				<div class="title flex-align-center">{{$t('SPR_FRM_DEP_SPSPQD')}}</div>
				<div class="floatright">
					<iButton>{{ $t('SUPPLIER_PIZHUN') }}</iButton>
					<iButton>{{ $t('LK_JUJUE') }}</iButton>
					<iButton>{{ $t('APPROVAL.APPEND_DATA') }}</iButton>
				</div>
			</div> -->
			<iCard>
				<tableList :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="tableLoading" :index="true"
					@handleSelectionChange="handleSelectionChange" :selection="false"/>
				<iPagination v-update @size-change="handleSizeChange($event, getTableList)"
					@current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
					:page-size="page.pageSize" :layout="page.layout" :current-page='page.currPage'
					:total="page.totalCount" />
			</iCard>
		</div>
		
</template>

<script>
	import {iPage,iCard,iPagination} from 'rise';
	import tableList from '@/components/commonTable';
	import {pageMixins} from '@/utils/pageMixins';
	import {depthRatingApprovalTitle} from './data';
	import {approvalListQuery} from '@/api/approval/frmRating';
	export default {
		mixins: [pageMixins],
		components: {
			iPagination,
			tableList,
			iPage,
			iCard
		},
		props: {
			value: {
				type: Boolean
			},
		},
		data() {
			return {
				tableListData: [],
				tableTitle: depthRatingApprovalTitle,
				tableLoading: false,
			};
		},
		created() {
			this.getTableList()
		},
		methods: {
			clearDiolog() {
				this.$emit('input', false);
			},
			getTableList() {
				let data={
					approvalBusinessId:this.$route.query.approvalBusinessId,
					stopApprovalBusinessId:this.$route.query.stopApprovalBusinessId,
					pageNo:this.page.currPage,
					pageSize:this.page.pageSize,
				}
				approvalListQuery(data).then(res=>{
					if (res.data) {
						this.tableListData=res.data
					}
				})
			},
		},
	};
</script>

<style scoped lang="scss">
	.iPage{
		width:100%;
		height: 100%;
		overflow-y: scroll;
	}
	.title {
		font-weight: bold;
		font-size: 20px;
		color: $color-black;
	}

</style>
