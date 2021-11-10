<!--
 * @author: shujie
 * @createTime: 2021-5-24 16:11:06
 * @Description:财务
 -->
<template>
	<div>
		<!-- 盈利能力 -->
		<iCard :title="$t('SPR_FRM_DEP_YLNL')" collapse class="margin-top20">
			<iInput v-model='interViewData.profitability' type='textarea' :autosize='rowRange' :placeholder="$t('SPR_FRM_DEP_YLNLPLACE')"></iInput>
		</iCard>
		<!-- 营运能力 -->
		<iCard :title="$t('SPR_FRM_DEP_YYNL')" collapse class="margin-top20">
			<iInput v-model='interViewData.operatingCapacity' type='textarea' :autosize='rowRange' :placeholder="$t('SPR_FRM_DEP_YYNLPLACE')"></iInput>
		</iCard>
		<!-- 偿债能力 -->
		<iCard :title="$t('SPR_FRM_DEP_CZNL')" collapse class="margin-top20">
			<iInput v-model='interViewData.solvency' type='textarea' :autosize='rowRange' :placeholder="$t('SPR_FRM_DEP_CZNLPLACE')"></iInput>
		</iCard>
		<!-- 资金与融资渠道 -->
		<iCard :title="$t('SPR_FRM_DEP_ZJYRZQD')" collapse class="margin-top20">
			<tableList :tableData="interViewData.bankList" :tableTitle="tableTitle" :tableLoading="tableLoading" :index="true" @handleSelectionChange="handleSelectionChange">
			</tableList>
			<div class="title">{{$t('SPR_FRM_DEP_HYJY')}}</div>
			<iInput v-model="interViewData.capitalMinutesMeeting" type='textarea' :autosize='rowRange' :placeholder="$t('SPR_FRM_DEP_HYJYPLACE')"></iInput>
		</iCard>
		<!-- 财务补充 -->
		<iCard :title="$t('SPR_FRM_DEP_CWBC')" collapse class="margin-top20">
			<iInput v-model='interViewData.financialSupplement' type='textarea' :autosize='rowRange' :placeholder="$t('SPR_FRM_DEP_CWBCPLACE')"></iInput>
		</iCard>
	</div>
</template>

<script>
	import {iCard,iInput} from 'rise';
	import tableList from '@/components/commonTable';
	import {CapitalFinancing} from '../data';
	import {interviewFinanceMessage,interviewFinanceInfo} from '@/api/frmRating/depthRating/interView';
	import resultMessageMixin from '@/mixins/resultMessageMixin';
	export default{
		mixins:[resultMessageMixin],
		components:{iCard,iInput,tableList},
		props:{
			id:{type:String}
		},
		data() {
			return {
				rowRange: {minRows:3,maxRows:6},
				tableTitle:CapitalFinancing,
				tableLoading: false,
				interViewData:{}
			}
		},
		created() {
			this.getData()
		},
		methods:{
			// 获取获取访谈清单
			getData(){
				interviewFinanceMessage({deepCommentSupplierId:this.id}).then(res=>{
					if (res.data) {
						this.interViewData=res.data
					}
				})
			},
			// 保存
			save(){
				this.interViewData.deepCommentSupplierId=this.id
				interviewFinanceInfo(this.interViewData).then(res=>{
					this.resultMessage(res,()=>{
						this.getData()
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped="scoped">
	.title {
		font-weight: bold;
		font-size: 18px;
		color: $color-black;
		margin: 20px 0;
	}
</style>
