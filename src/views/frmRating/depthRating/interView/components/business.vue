<!--
 * @author: shujie
 * @createTime: 2021-5-24 16:11:06
 * @Description:业务上下游
 -->
<template>
	<div>
		<!-- 集团、股东、实际控制人（详见股权结构图） -->
		<iCard :title="$t('SPR_FRM_DEP_ZYCPJZBCPGY')" collapse class="margin-top20">
			<tableList :tableData="interViewData.prodPropList" :tableTitle="mainProduct" :tableLoading="tableLoading" :index="true" @handleSelectionChange="handleSelectionChange">
			</tableList>
			<!-- 主要业务模式和加工深度务 -->
			<div class="title">{{$t('SPR_FRM_DEP_ZYYWMSHJGSD')}}</div>
			<iInput type='textarea' :autosize='rowRange'  :placeholder="$t('SPR_FRM_DEP_INPUT')"v-model='interViewData.mainBusinessProcessingDepth'></iInput>
			<!-- 设备投资、原材料、进出口业务 -->
			<div class="title">{{$t('SPR_FRM_DEP_SBTZYCLJCKYW')}}</div>
			<iInput type='textarea' :autosize='rowRange'  :placeholder="$t('SPR_FRM_DEP_INPUT')"v-model='interViewData.business'></iInput>
			<!-- 会议纪要 -->
			<div class="title">{{$t('SPR_FRM_DEP_HYJY')}}</div>
			<iInput type='textarea' :autosize='rowRange'  :placeholder="$t('SPR_FRM_DEP_INPUT')"v-model='interViewData.productsProportionMeeting'></iInput>
		</iCard>
		<!-- 主要客户 -->
		<iCard title='主要客户' collapse class="margin-top20">
			<tableList :tableData="interViewData.customerList" :tableTitle="mainCustomers" :tableLoading="tableLoading" :index="true" @handleSelectionChange="handleSelectionChange">
			</tableList>
			<!-- 会议纪要 -->
			<div class="title">{{$t('SPR_FRM_DEP_HYJY')}}</div>
			<iInput type='textarea' :autosize='rowRange'  :placeholder="$t('SPR_FRM_DEP_INPUT')"v-model='interViewData.customersMeetingMinutes'></iInput>
		</iCard>
		<!-- SVW业务情况 -->
		<iCard :title="$t('SPR_FRM_DEP_SVWYWQK')" collapse class="margin-top20">
			<!-- 合作时间 -->
			<div class="flex-align-center cooperation">
				<span>{{$t('SPR_FRM_DEP_HZSJ')}}</span>
				<iInput :placeholder="$t('SPR_FRM_DEP_INPUT')"v-model='interViewData.cooperationTime'></iInput>
			</div>
			<!-- 供货产品 -->
			<div class="title">{{$t('SUPPLIER_GONGHUOCHANPIN')}}</div>
			<iInput type='textarea' :autosize='rowRange'  :placeholder="$t('SPR_FRM_DEP_INPUT')"v-model='interViewData.supplyProduct'></iInput>
			<!-- 过去，现在及未来的项目情况 -->
			<div class="title">{{$t('SPR_FRM_DEP_GQXZJWLDXMQK')}}</div>
			<iInput type='textarea' :autosize='rowRange'  :placeholder="$t('SPR_FRM_DEP_INPUT')"v-model='interViewData.projectSituation'></iInput>
			<!-- 会议纪要 -->
			<div class="title">{{$t('SPR_FRM_DEP_HYJY')}}</div>
			<iInput type='textarea' :autosize='rowRange'  :placeholder="$t('SPR_FRM_DEP_INPUT')"v-model='interViewData.svwBusinessSituationMeetingMinutes'></iInput>
		</iCard>
		<!-- 业务发展及投资 -->
		<iCard :title="$t('SPR_FRM_DEP_YWFZJTZ')" collapse class="margin-top20">
			<iInput v-model='interViewData.businessDevelopmentInvestment' type='textarea' :autosize='rowRange'  placeholder='当年销售预测、未来三年销售预测（关联数据：营业收入）、固定资产投入（关联数据：固定资产、在建工程、无形资产、长期待摊费用、购建固定资产、无形资产和其他长期资产支付的现金）、投资与业务情况比较…'></iInput>
		</iCard>
		<!-- 主要供应商 -->
		<iCard :title="$t('SPR_FRM_DEP_ZYGYS')" collapse class="margin-top20">
			<tableList :tableData="interViewData.supplierList" :tableTitle="mainSupplier" :tableLoading="tableLoading" :index="true" @handleSelectionChange="handleSelectionChange">
			</tableList>
			<!-- 会议纪要 -->
			<div class="title">{{$t('SPR_FRM_DEP_HYJY')}}</div>
			<iInput v-model='interViewData.supplierMeetingMinutes' type='textarea' :autosize='rowRange'  placeholder='是否进口、是否强势（关联指标：预付账款）…'></iInput>
		</iCard>
		<!-- 产能情况 -->
		<iCard :title="$t('SPR_FRM_DEP_CNQK')" collapse class="margin-top20">
			<iInput v-model='interViewData.productionCapacity' type='textarea' :autosize='rowRange'  placeholder='计划产能、实际产能、已使用产能（开工率）…'></iInput>
		</iCard>
		<!-- 业务&上下游-补充 -->
		<iCard :title="$t('SPR_FRM_DEP_YWSXYBC')" collapse class="margin-top20">
			<iInput v-model='interViewData.upDownSupplement' type='textarea' :autosize='rowRange'  placeholder='模具、土地租用/自有（关联数据：无形资产）…'></iInput>
		</iCard>
	</div>
</template>

<script>
	import {iCard,iInput} from 'rise';
	import tableList from '@/components/commonTable';
	import {mainProduct,mainCustomers,mainSupplier} from '../data';
	import {interviewUpDownMessage,interviewUpDownInfo} from '@/api/frmRating/depthRating/interView';
	import resultMessageMixin from '@/mixins/resultMessageMixin';
	export default{
		mixins:[resultMessageMixin],
		components:{iCard,iInput,tableList},
		data() {
			return {
				rowRange: {minRows:3,maxRows:6},
				mainProduct,
				mainCustomers,
				mainSupplier,
				tableLoading: false,
				interViewData:{}
			}
		},
		props:{
			id:{type:String}
		},
		created() {
			this.getData()
		},
		methods:{
			// 获取获取访谈清单
			getData(){
				interviewUpDownMessage({deepCommentSupplierId:this.id}).then(res=>{
					if (res.data) {
						this.interViewData=res.data
					}
				})
			},
			// 保存
			save(){
				this.interViewData.deepCommentSupplierId=this.id
				interviewUpDownInfo(this.interViewData).then(res=>{
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
		font-size: 16px;
		color: $color-black;
		margin: 20px 0;
	}
	.cooperation{
		>span{
			width: 115px;
			font-weight: bold;
			font-size: 16px;
			color: $color-black;
		}
	}
</style>
