<!--
 * @author: shujie
 * @createTime: 2021-5-24 16:11:06
 * @Description:企业概况
 -->
<template>
	<div>
		<!-- 基本信息 -->
		<iCard title="Basic Information" collapse class="margin-top20">
			<iFormGroup row="3">
				<iFormItem :label="item.name" v-for="(item,index) in baseInfoTitle" :key="index">
					<iInput :disabled="isDisabled" :value="info.supplier[item.props]"></iInput>
				</iFormItem>			
			</iFormGroup>			
		</iCard>
		<!-- 集团及关联公司 -->
		<iCard title="Group and Affiliates" collapse class="margin-top20">
			<iInput :disabled="isDisabled" type='textarea' :autosize='rowRange'  placeholder="Please enter." v-model="info.groupCompany" maxlength="120"
              show-word-limit></iInput>
		</iCard>
		<!-- 重要变更 -->
		<iCard title="Important Changes" collapse class="margin-top20">
			<iInput :disabled="isDisabled" type='textarea' :autosize='rowRange'  placeholder="Please enter." v-model="info.importantChange" maxlength="120"
              show-word-limit></iInput>
		</iCard>
		<!-- 融资信息 -->
		<iCard title="Financing Information" collapse class="margin-top20">
			<iInput :disabled="isDisabled" type='textarea' :autosize='rowRange'  placeholder="Please enter." v-model="info.financingInformation" maxlength="120"
              show-word-limit></iInput>
		</iCard>
		<!-- 业务情况 -->
		<iCard title="business overview" collapse class="margin-top20">
			<iInput :disabled="isDisabled" type='textarea' :autosize='rowRange'  placeholder="Please enter." v-model="info.businessSituation" maxlength="120"
              show-word-limit></iInput>
		</iCard>
		<!-- 搬迁情况 -->
		<iCard title="Relocation Status" collapse class="margin-top20">
			<iInput :disabled="isDisabled" type='textarea' :autosize='rowRange'  placeholder="Please enter." v-model="info.relocation" maxlength="120"
              show-word-limit></iInput>
		</iCard>
		<!-- 敏感信息 -->
		<iCard title="Sensitive Information" collapse class="margin-top20">
			<iInput :disabled="isDisabled" type='textarea' :autosize='rowRange'  placeholder="Please enter." v-model="info.sensitiveInformation" maxlength="120"
              show-word-limit></iInput>
		</iCard>
		<!-- 公司简介 -->
		<iCard title="Company Profile" collapse class="margin-top20">
			<iInput :disabled="isDisabled" type='textarea' :autosize='rowRange'  placeholder="Please enter." v-model="info.companyProfile" maxlength="120"
              show-word-limit></iInput>
		</iCard>
		<!-- 其他补充信息 -->
		<iCard title="Additional Information" collapse class="margin-top20">
			<iInput :disabled="isDisabled" type='textarea' :autosize='rowRange'  placeholder="Please enter." v-model="info.otherSupplementaryInfo" maxlength="120"
              show-word-limit></iInput>
		</iCard>
		<el-row :gutter="50">
			<el-col :span="14">
				<!-- 主营业务及客户情况 -->
				<iCard title="Main Business and Customer Profile"  class="margin-top20">
					<el-row :gutter="10">
						<el-col :span="12">
							<ring :chartData="info.mainCustomerList"/>
						</el-col>
						<el-col :span="12">
							<ring :chartData="info.mainProductList"/>
						</el-col>
					</el-row>
				</iCard>
			</el-col>
			<el-col :span="10">
				<iCard title="TO Status"  class="margin-top20">
					<bar :chartData="info.toList"/>
				</iCard>
			</el-col>
		</el-row>
		<!-- 备注 -->
		<iCard :title="$t('LK_BEIZHU')" collapse class="margin-top20">
			<iInput :disabled="isDisabled" type='textarea' :autosize='rowRange'  placeholder="Please enter." v-model="info.remark" maxlength="120"
              show-word-limit></iInput>
		</iCard>
		<div class="remark">Data source: public information and information provided by supplier & supplier interview</div>
	</div>
</template>

<script>
	import {iCard,iInput,iFormGroup,iFormItem} from 'rise';
	import {baseInfoTitle} from '../data';
	import {getCompanyOverview,postCompanyOverview} from '@/api/frmRating/depthRating/depthReport.js'
	import ring from './ring'
	import bar from './bar'
	// import {setWaterMark,removeWatermark} from 'rise/utils/watermark'
	export default{
		components:{iCard,iInput,iFormGroup,iFormItem,ring,bar},
		data() {
			return {
				rowRange: {minRows:3,maxRows:6},
				baseInfoTitle,
				tableLoading: false,
				info:{
					supplier:{}
				},
			}
		},
		props: {
			isDisabled :{type:Boolean,default:false}
		},
		mounted(){
			console.log(this.userInfo)
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
				getCompanyOverview(this.id,'en').then((result) => {
					if(result&&result.data!==null){
						this.info=result.data
						this.info.deepCommentSupplierId=this.id
					}
					
				}).catch((err) => {
					
				});
			},
			postOverView() {
				this.info.lang='en'
				postCompanyOverview(this.info).then((result) =>{
					if(result.code==200){
						this.$message.success(result.desZh)
						this.getOverView()
					}else{
						this.$message.error(result.desZh)
					}
				}).catch((err) => {
					
				});
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
