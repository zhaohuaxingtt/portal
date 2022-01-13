<!--
 * @author: shujie
 * @createTime: 2021-5-24 16:11:06
 * @Description:财务分析
 -->
<template>
	<div>
		<!-- 提示信息 -->
		<iCard title="Reminder" collapse class="margin-top20">
			<iInput :disabled="isDisabled" type='textarea' :autosize='rowRange'  placeholder="Please enter." v-model="info.promptInfo" maxlength="120"
              show-word-limit></iInput>
		</iCard>
		<!-- 财报分析 -->
		<iCard title="Financial Statement Analysis" collapse class="margin-top20">
			<tableList :tableData="info.list" :tableTitle="tableTitle" :tableLoading="tableLoading" :index="true" :selection="false" @handleSelectionChange="handleSelectionChange">
				<template #status="scope">
					<iInput :disabled="isDisabled" v-model="scope.row.status" @change="updateData(scope.row,'status', $event)"></iInput>
				</template>
				<template #comment="scope">
					<iInput :disabled="isDisabled" v-model="scope.row.comment" type='textarea' :autosize='{minRows:1}' @change="updateData(scope.row,'comment', $event)" maxlength="120"
              show-word-limit></iInput>
				</template>
			</tableList>
		</iCard>
		<div class="remark">The financial analysis is based on the financial data from the third party & supplier interview.</div>
	</div>
		
</template>

<script>
	import {iCard,iInput} from 'rise';
	import tableList from '@/components/commonTable';
	import {finAnalysis} from '../data';
	import {getFinancialAnalysis,postFinancialAnalysis} from '@/api/frmRating/depthRating/depthReport.js'
	import {getDictByCode} from '@/api/dictionary'
	// import {setWaterMark,removeWatermark} from 'rise/utils/watermark'
	export default{
		components:{iCard,iInput,tableList},
		data() {
			return {
				rowRange: {minRows:3,maxRows:6},
				tableTitle:finAnalysis,
				tableLoading: false,
				info:{
					promptInfo:'',
					list:[]
				}
			}
		},
		props: {
			isDisabled :{type:Boolean,default:false}
		},
			mounted(){
			// console.log(this.userInfo)
			// setWaterMark(this.userInfo.nameZh+this.userInfo.id+this.userInfo.deptDTO.deptNum+'仅供CS内部使用',1000,700)
			this.id = this.$route.query.id;
			this.getOverView()
		},
		destroyed(){
			// removeWatermark()
		},
		computed:{
			// eslint-disable-next-line no-undef
			...Vuex.mapState({
				userInfo: (state) => state.permission.userInfo,
			}),

		},
		methods:{
			getOverView(){
				getFinancialAnalysis(this.id,'en').then((result) => {
					if(result.data){
						this.info=result.data
						this.info.deepCommentSupplierId=this.id
						if(!result.data.list || result.data.list.length==0){
							getDictByCode('FINANCIAL_TO_CASE_TYPE').then((res)=>{
								// console.log(res)
								this.info.list=res.data[0].subDictResultVo.map((r)=>{
										return {
											indexName:r.nameEn,
											indexCode:r.code
										}
									})
							})
						}
					}
				}).catch((err) => {
					
				});
			},
			postOverView() {
				postFinancialAnalysis({
					...this.info,
					deepCommentSupplierId:this.id,
					lang:'en'
				}).then((result) =>{
					if(result.code==200){
						this.$message.success(result.desZh)
						this.getOverView()
					}else{
						this.$message.error(result.desZh)
					}
				}).catch((err) => {
					
				});
			},
			updateData(all,type,value){
				console.log(all,type,value)
				const newList=window._.cloneDeep(this.info.list)
				const obj = newList[all.index]
				obj[type]= value
				newList.splice(all.index, 1, obj)
				this.info={
					...this.info,
					list:newList
				}
			},
		},
	}
</script>

<style lang="scss" scoped="scoped">
	.title {
		font-weight: bold;
		font-size: 18px;
		color: $color-black;
		margin: 20px 0;
	}
	.remark{
		margin-top:15px;
		font-size: 16px;
		font-family: Arial;
		font-weight: 400;
		line-height: 18px;
		color: #000000;
		opacity: 0.42;
	}
</style>
