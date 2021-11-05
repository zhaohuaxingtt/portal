<!--
 * @author: shujie
 * @createTime: 2021-5-24 16:11:06
 * @Description:基本情况
 -->
<template>
	<div>
		<!-- 成立背景、基本情况、历史沿革 -->
		<iCard :title="$t('SPR_FRM_DEP_CLBJJBQKLSYG')" collapse class="margin-top20">
			<iInput type='textarea' :autosize='rowRange' :placeholder="$t('SPR_FRM_DEP_QSRGYSTGXX')" v-model='interViewData.backgroundSituationEvolution'></iInput>
			<div class="title">{{$t('SPR_FRM_DEP_HYJY')}}</div>
			<iInput type='textarea' :autosize='rowRange' :placeholder="$t('SPR_FRM_DEP_JTGDSJKZ')" v-model='interViewData.backgroundMeeting'></iInput>
		</iCard>
		<!-- 集团、股东、实际控制人（详见股权结构图） -->
		<iCard :title="$t('SPR_FRM_DEP_JTGDSJKZR')" collapse class="margin-top20">
			<tableList :tableData="interViewData.investorVOList" :tableTitle="tableTitle" :tableLoading="tableLoading" :index="true" @handleSelectionChange="handleSelectionChange">
			</tableList>
			<div class="title">{{$t('SPR_FRM_DEP_HYJY')}}</div>
			<iInput type='textarea' :autosize='rowRange' v-model="interViewData.actualControllerMeeting"></iInput>
		</iCard>
		<!-- 关联公司情况（详见股权结构图） -->
		<iCard :title="$t('SPR_FRM_DEP_GLGSQK')" collapse class="margin-top20">
			<div class="title">{{$t('SPR_FRM_DEP_GLGSJS')}}</div>
			<iInput type='textarea' :autosize='rowRange' :placeholder="$t('SPR_FRM_DEP_INPUT')" v-model="interViewData.relatedCompany"></iInput>
			<div class="title">{{$t('SPR_FRM_DEP_GLGSYWWLQK')}}</div>
			<iInput type='textarea' :autosize='rowRange' :placeholder="$t('SPR_FRM_DEP_INPUT')" v-model="interViewData.businessContacts"></iInput>
			<div class="title">{{$t('SPR_FRM_DEP_HYJY')}}</div>
			<iInput type='textarea' :autosize='rowRange' :placeholder="$t('SPR_FRM_DEP_INPUT')" v-model="interViewData.personSituationMeetingMinutes"></iInput>
		</iCard>
		<!-- 组织机构、人员情况 -->
		<iCard :title="$t('SPR_FRM_DEP_ZZJGRYQK')" collapse class="margin-top20">
			<iFormGroup row="4">
				<iFormItem :label="item.key?$t(item.key):item.name" v-for="(item,index) in organizationDetail" :key="index">
					<iDatePicker v-if="item.type=='date'" value-format="yyyy-MM-dd" v-model='interViewData[item.props]' style="width:100%"></iDatePicker>
					<iSelect v-else-if="item.type=='select'" v-model='interViewData[item.props]'>
						<el-option :value="item.code" :label="item.name" v-for="item in fromGroup[item.select]" :key="item.code"></el-option>
					</iSelect>
					<iInput v-else v-model='interViewData[item.props]'></iInput>
				</iFormItem>
			</iFormGroup>
			<div class="title">{{$t('SPR_FRM_DEP_GLTDQTRYQK')}}</div>
			<iInput type='textarea' :autosize='rowRange' :placeholder="$t('SPR_FRM_DEP_INPUT')" v-model="interViewData.teamOtherSituation"></iInput>
			<div class="title">{{$t('SPR_FRM_DEP_HYJY')}}</div>
			<iInput type='textarea' :autosize='rowRange' :placeholder="$t('SPR_FRM_DEP_INPUT')" v-model="interViewData.personSituationMeetingMinutes"></iInput>
		</iCard>
		<!-- 财务补充 -->
		<iCard :title="$t('SPR_FRM_DEP_JBQKBC')" collapse class="margin-top20">
			<iInput type='textarea' :autosize='rowRange' :placeholder="$t('SPR_FRM_DEP_INPUT')" v-model="interViewData.supplementMeetingMinutesBasicInfo"></iInput>
		</iCard>
	</div>
		
</template>

<script>
	import {iCard,iInput,iPage,iFormGroup,iFormItem,iDatePicker,iSelect} from 'rise';
	import tableList from '@/components/commonTable';
	import {groupShareholder,organizationDetail} from '../data';
	import {interviewMessage,interviewInfo} from '@/api/frmRating/depthRating/interView';
	import resultMessageMixin from '@/mixins/resultMessageMixin';
	import {selectDictByKeys} from '@/api/dictionary';
	export default{
		components:{iCard,iInput,iPage,tableList,iFormGroup,iFormItem,iDatePicker,iSelect},
		mixins: [resultMessageMixin],
		props:{
			id:{type:String}
		},
		data() {
			return {
				rowRange: {minRows:3,maxRows:6},
				tableTitle:groupShareholder,
				tableLoading: false,
				organizationDetail,
				interViewData:{},
				fromGroup:{}
			}
		},
		created() {
			this.getData()
			this.getAllSelect()
		},
		methods:{
			// 获取获取访谈清单
			getData(){
				interviewMessage({deepCommentSupplierId:this.id}).then(res=>{
					if (res.data) {
						this.interViewData=res.data
					}
				})
			},
			// 保存
			save(){
				this.interViewData.deepCommentSupplierId=this.id
				interviewInfo(this.interViewData).then(res=>{
					this.resultMessage(res,()=>{
						this.getData()
					})
				})
			},
			// 字段查询下拉框
			getAllSelect() {
				let data = ['EMPLOYEE_GENDER','TURE_FALSE']
				let url = 'keys='
				url = url + data.join('&keys=')
				selectDictByKeys(url).then(res => {
					if (res.data) {
						this.fromGroup = res.data
					}
				})
			},
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
