<!--
 * @author: shujie
 * @createTime: 2021-5-24 16:11:06
 * @Description:其他
 -->
<template>
	<div>
		<!-- '突发事件的影响（如：疫情、事故、自然灾害等）' -->
		<iCard :title="$t('SPR_FRM_DEP_TFSJDYX')" collapse class="margin-top20">
			<iInput v-model='interViewData.emergency' type='textarea' :autosize='rowRange' :placeholder="$t('SPR_FRM_DEP_TFSJDYXPLACE')"></iInput>
		</iCard>
		<!-- 涉诉情况 -->
		<iCard :title="$t('SPR_FRM_DEP_SSQK')" collapse class="margin-top20">
			<iInput v-model='interViewData.lawsuitSituation' type='textarea' :autosize='rowRange' :placeholder="$t('SPR_FRM_DEP_SSQKPLACE')"></iInput>
		</iCard>
		<!-- 其他 - 补充 -->
		<iCard :title="$t('SPR_FRM_DEP_QTBC')" collapse class="margin-top20">
			<iInput v-model='interViewData.otherSupplement' type='textarea' :autosize='rowRange' :placeholder="$t('SPR_FRM_DEP_QTBCPLACE')"></iInput>
		</iCard>
	</div>
		
</template>

<script>
	import {iCard,iInput} from 'rise';
	import {interviewOtherMessage,interviewOtherInfo} from '@/api/frmRating/depthRating/interView';
	import resultMessageMixin from '@/mixins/resultMessageMixin';
	export default{
		mixins:[resultMessageMixin],
		components:{iCard,iInput},
		props:{
			id:{type:String}
		},
		data() {
			return {
				rowRange: {minRows:3,maxRows:6},
				interViewData:{}
			}
		},
		created() {
			this.getData()
		},
		methods:{
			// 获取获取访谈清单
			getData(){
				interviewOtherMessage({deepCommentSupplierId:this.id}).then(res=>{
					if (res.data) {
						this.interViewData=res.data
					}
				})
			},
			// 保存
			save(){
				this.interViewData.deepCommentSupplierId=this.id
				interviewOtherInfo(this.interViewData).then(res=>{
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
</style>
