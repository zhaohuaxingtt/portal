<!--
 * @author: shujie
 * @createTime: 2021-5-24 14:13:09
 * @Description:访谈清单
 -->
<template>
	<iPage>
		<div class="navBox flex-between-center">
			<span class="title">{{$t('SPR_FRM_DEP_FTQD')}}</span>
			<div class="flex-align-center">
				<iNavMvp :list="interViewTabList" :lev='2' right class="rightNav" @change="changeNav" />
				<!--导入-->
				<el-upload
					class="upload"
					:show-file-list="false"
					name="multipartFile"
					with-credentials
					:on-success="handleAvatarSuccess"
					:http-request="myUpload"
					accept=".xlsx">	
					<iButton :loading="uploadButtonLoading">{{ $t('SPR_FRM_DEP_IMPORT') }}</iButton>
				</el-upload>
				<!--保存-->
				<iButton class="margin-left10" @click="save">{{ $t('LK_BAOCUN') }}</iButton>
				<!-- 下载模板 -->
				<iButton class="margin-left10" @click="getInterviewGlobal">{{ $t('SPR_FRM_FRMGL_XZFTQDMB') }}</iButton>
				<!--查看财务分析结果-->
				<iButton @click='jumpFinancialAnalysis'>{{ $t('SPR_FRM_DEP_CKCWFXJG') }}</iButton>
				<!--生成会议纪要-->
				<iButton @click='openMeeting'>{{ $t('SPR_FRM_DEP_SCHYJY') }}</iButton>
			</div>
		</div>
		<basic v-if="currentNav==1" :id='id' ref="basic"></basic>
		<business v-else-if="currentNav==2" :id='id' ref="business" ></business>
		<finance v-else-if="currentNav==3" :id='id' ref="finance" ></finance>
		<other v-else-if="currentNav==4" :id='id' ref="other" ></other>
		<!-- 会议纪要弹窗 -->
		<creatMeeting v-model="meeting" :id='id'></creatMeeting>
	</iPage>
</template>

<script>
	import {iPage,iNavMvp,iButton} from 'rise';
	import {interViewTabList} from './data';
	import basic from './components/basic';
	import business from './components/business';
	import finance from './components/finance';
	import other from './components/other';
	import creatMeeting from './components/creatMeeting';
	import {interviewExcel,interviewGlobal} from '@/api/frmRating/depthRating/interView';
	import {downloadFile} from '@/api/file';
	import resultMessageMixin from '@/mixins/resultMessageMixin';
	export default {
		mixins:[resultMessageMixin],
		components: {
			iPage,
			iNavMvp,
			iButton,basic,business,finance,other,creatMeeting
		},
		data() {
			return {
				interViewTabList,
				currentNav: 1,
				meeting:false,//会议纪要
				id:"",//供应商id
				interViewData:{},//访谈清单数据
				uploadButtonLoading:false,
				ref:['basic','business','finance','other']
			};
		},
		created() {
			this.id=this.$route.query.id
		},
		methods: {
			changeNav(val) {
				if (this.currentNav!=val.value) {
					this.save()
					this.currentNav = val.value;
				}
			},
			// 打开会议纪要弹窗
			openMeeting(){
				this.meeting=true
			},
			// 保存
			save(){
				this.$refs[this.ref[this.currentNav-1]].save()
			},
			//导入
			async myUpload(content) {
				const loading = this.$loading({
					lock: true,
				});
				const formData = new FormData();
				formData.append('file', content.file);
				formData.append('deepCommentSupplierId', this.id);
				const res = await interviewExcel(formData);
				loading.close()
				this.resultMessage(res,()=>{
					this.$refs[this.ref[this.currentNav-1]].getData()
				})
			},
			handleAvatarSuccess() {
			},
			// 查看财报分析
			jumpFinancialAnalysis(){
				this.$router.push({
					path:'/supplier/frmrating/depthRating/financialAnalysis',
					query:{
						id:this.id
					}
				})
			},
			// 访谈清单模板 文件名、
			getInterviewGlobal(){
				interviewGlobal().then(res=>{
					this.resultMessage(res,()=>{
						this.handleExampleDownload(res.data.templateUrl)
					})
				})
			},
			// 下载访谈清单模板
			handleExampleDownload(fileName) {
				const req = {
					applicationName: 'rise',
					fileList: [fileName],
				}
				downloadFile(req)
			},
		},
	};
</script>

<style scoped lang="scss">
	.title {
		font-weight: bold;
		font-size: 20px;
		color: $color-black;
	}
	.upload{
		margin-left: 30px;
	}
</style>
