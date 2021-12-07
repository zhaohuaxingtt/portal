<template>
	<iPage>
		<div class="flex justify-between">
			<div class="content-title">用户助手</div>
			<div class="types" slot="actions">
				<iTabBadge>
					<iTabBadgeItem
						:active="helpMoudle === 'manual'"
						:name="language('用户手册')"
						@click="tabChange('manual')"
					/>
					<iTabBadgeItem
						:active="helpMoudle === 'problem'"
						:name="language('常见问题')"
						@click="tabChange('problem')"
					/>
					<iTabBadgeItem
						:active="helpMoudle === 'ask'"
						:name="language('我的提问')"
						@click="tabChange('ask')"
					/>
				</iTabBadge>
			</div>
		</div>
		<div class="flex flex-row content mt20" v-if="helpMoudle === 'manual'">
			<CommonProblem
				:loading="listLoading"
				:moudleList="moudleList"
				:currentMoudleId="currentMoudleId ? currentMoudleId : this.$store.state.baseInfo.originalModuleId"
				@change="moduleChange"
			/>
			<DataManage
				:loading="listLoading"
				:currMoudleName="currentMoudleId ? currMoudleName : originalMoudleName"
				:currModuleDetailData="currModuleDetailData"
				@handleQuestion="handleQuestion"
			/>
		</div>
		<div class="flex flex-column content mt20" v-else-if="helpMoudle === 'problem'">
			<ProblemSearch 
				:moudleList="moudleList"
				@queryProblem="queryProblem"
			/>
			<div class="flex flex-row mt20 middle-content">
				<CommonProblem 
					:moudleList="moudleList"
					:currentMoudleId.sync="currentMoudleId"
					@change="moduleChange"
				/>
				<ProblemDetail
					ref="problemDetail"
					:currentMoudleId="currentMoudleId"
					:currMoudleName="currMoudleName"
					:queryProblemList="queryProblemList"
					:moudleList="moudleList"
					@changeCurrValue="changeCurrValue"
					@handleQuestion="handleQuestion"
					@handleZwQues="handleZwQues"
					@putAdminTw="putAdminTw"
				/>
			</div>
		</div>
		<div class="flex flex-row content mt20" v-else>
			<QuestionList 
				ref="questionList"
				:currentMoudleId="currentMoudleId ? currentMoudleId : this.$store.state.baseInfo.originalModuleId"
				:moudleList="moudleList"
				@selectQues="selectQues"
			/>
			<QuestionDetail
				ref="questionDetail"
				:moudleList="moudleList"
				@handleZwQues="handleZwQues"
				@handleQuestion="handleQuestion"
				@changeQuesStatus="changeQuesStatus"
			/>
		</div>
		<IntelligentDialog
			v-if="intelligentVisible"
			:intelligentVisible="intelligentVisible"
			:hotQuestionList="hotQuestionList"
			:fromPage="helpMoudle"
			:currentMoudleId="currentMoudleId"
			@closeDialog="closeDialog"
			@putAdminTw="putAdminTw"
			@gotoProblemDeatil="gotoProblemDeatil"
		/>

		<QuestioningDialog
			:questioningVisible="questioningVisible"
			:questioningTitle="questioningTitle"
			:questionAnswerContent="questionAnswerContent"
			:currentMoudleId="currentMoudleId ? currentMoudleId : this.$store.state.baseInfo.originalModuleId"
			:currLabelId="currLabelId"
			:zwFlag="zwFlag"
			@closeQuesDialog="closeQuesDialog"
		/>

	</iPage>
</template>

<script>

// import store from '@/store'
import { iPage } from 'rise'
import { iTabBadge, iTabBadgeItem } from '@/components/iTabBadge'
import CommonProblem from '../components/commonProblem'
import DataManage from './components/dataManage'
import ProblemSearch from './components/problemSearch'
import ProblemDetail from './components/problemDetail'
import IntelligentDialog from '../components/intelligentDialog'
import QuestioningDialog from '../components/questioningDialog'
import QuestionList from './components/questionList'
import QuestionDetail from './components/questionDetail'
import { getHotFiveQues, getUserDes, getModuleList } from '@/api/assistant'

export default {
	data() {
		return {
			text: '用户助手',
			helpMoudle: "manual",  // manual 用户手册 problem 常见问题 ask 我的提问
			moudleList: [],
			currentMoudleId: null,  // 当前模块id
			currMoudleName: null,   // 当前模块名称	
			currModuleDetailData: null,  // 当前模块内容
			intelligentVisible: false,  // 智能弹框visible
			questioningVisible: false,  // 追问 提问visible
			zwFlag: false,  // 追问 提问标志
			questioningTitle: '',  // 追问 提问弹框title
			questionAnswerContent: '',
			listLoading: false,
			hotQuestionList: [],  // 热门问题
			currentMenu: [],  // 当前的二级模块菜单
			originalMoudleName: '',  // 无模块id展示的模块名称
			currLabelId: null,  // 当前标签的id(常见问题筛查查询时才有)
			queryProblemList: []  // 常见问题模块查询时的问题列表
		}
	},
	components: {
		iPage,
		iTabBadge,
		iTabBadgeItem,
		CommonProblem,
		DataManage,
		ProblemSearch,
		ProblemDetail,
		IntelligentDialog,
		QuestioningDialog,
		QuestionList,
		QuestionDetail
	},
	created() {
		// 获取当前路径
		let params  = this.$route.params
		this.currentMenu = params.currentMenu
	},
	async mounted() {
		await this.getMoudleList()
		await this.getCurrentModule()
	},
	methods: {
		async getMoudleList() {
			this.listLoading = true
			await getModuleList().then((res) => {
				if (res.code === '200') {
					this.listLoading = false
					this.moudleList = res?.data || []
				}
			})
		},
		// 根据当前url和模块列表定位具体模块及模块名称
		getCurrentModule() {
			let currFlag = false
			console.log(this.currentMenu, "this.currentMenu")
			this.moudleList.map(item => {
				if (this.currentMenu?.includes(item.permissionKey)) {
					this.currentMoudleId = item.id
					this.currMoudleName = item.menuName
					this.$store.dispatch('setOriginalModuleId', item.id)
					this.$store.dispatch('setCurrPageFlag', true)
					currFlag = true
				}
			})
			if (!currFlag) {
				this.currentMoudleId = ''
				this.originalMoudleName = this.moudleList[0].menuName
				this.$store.dispatch('setOriginalModuleId', this.moudleList[0].id)
				this.$store.dispatch('setCurrPageFlag', false)
			}
			this.getManauContent()
		},
		// 获取用户手册内容
		getManauContent() {
			let queryContentId = ''
			if (!this.currentMoudleId) {
				queryContentId = this.moudleList[0].id
			} else {
				queryContentId = this.currentMoudleId
			}
			let params = {
				moduleId: queryContentId,
				source: this.$store.state.permission.userInfo.userType == 1 ? "inner" : "supplier"
			}
			getUserDes(params).then(res => {
				if (res?.code === '200') {
					// this.currModuleDetailData = '实打实的就喀什角动量喀什觉得'
					this.currModuleDetailData = res?.data?.manualContent
				}
			})
		},
		// 右上方分类点击事件
		tabChange(val) {
			this.helpMoudle = val
			this.moudleList.map(item => {
				if(item.id === this.currentMoudleId) {
					this.currMoudleName = item.menuName
				}
			})
		},
		// 打开智能弹窗
		handleQuestion() {
			let moudleId = this.$store.state.baseInfo.originalModuleId
			getHotFiveQues(moudleId).then((res) => {
				if (res?.code === '200') {
					this.hotQuestionList = res?.data
					this.intelligentVisible = true
				}
			})
		},
		// 关闭智能弹框
		closeDialog(va) {
			this.intelligentVisible = va
			this.hotQuestionList = []
		},
		// 追问 打开问题弹框
		handleZwQues(title, content) {
			console.log(title, content, "handleZwQues")
			this.questioningVisible = true
			this.questioningTitle = title
			this.questionAnswerContent = content
			this.zwFlag = true
		},
		// 提问 打开问题弹框
		putAdminTw(labelId) {
			this.intelligentVisible = false
			this.questioningVisible = true
			this.questioningTitle = '提问'
			this.zwFlag = false
			this.currLabelId = labelId
		},
		// 关闭问题弹框
		closeQuesDialog(va) {
			this.questioningVisible = va
		},
		// 根据弹窗热门问题跳转到常见问题详情
		gotoProblemDeatil(issue, fromPage) {
			console.log(issue, "issue")
			this.intelligentVisible = false
			this.helpMoudle = 'problem'
			this.currentMoudleId = issue.questionModuleId
			this.moudleList.map(item => {
				if (item.id === issue.questionModuleId) {
					this.currMoudleName = item.menuName
				}
			})
			this.$nextTick(() => {
				this.$refs.problemDetail.initDetailPage(issue)
			})
			
		},
		// 选择模块变化时 的事件
		moduleChange(moudle) {
			this.currentMoudleId = moudle.id
			this.currMoudleName = moudle.menuName
			if (this.helpMoudle === 'manual') {
				this.getManauContent()
			} else if (this.helpMoudle === 'problem') {
				this.$nextTick(() => {
					this.$refs.problemDetail.currentFlag = 'listPage'
					this.$refs.problemDetail.labelText = null
					this.$refs.problemDetail.labelIdx = 0
					this.$refs.problemDetail.problemDetail = []
					this.$refs.problemDetail.problemQuery.pageNum = 1
					this.$refs.problemDetail.getLabelList('init')
				})
			} else {
				return false
			}
			
		},
		// 根据模块id获取模块名称
		getCurrModuleName(id) {
			let m = this.moudleList.find(pm => pm.id == id)
			return m ? m.menuName : ""
		},
		// 根据常见问题查询条件筛查数据
		queryProblem(queryValue) {
			const { questionLableId, questionModuleId } = queryValue
			this.currentMoudleId = questionModuleId
			this.currLabelId = questionLableId
			this.currMoudleName = this.getCurrModuleName(questionModuleId)
			console.log(this.currMoudleName, "this.currMoudleName")
			this.$nextTick(() => {
				this.$refs.problemDetail.getQueryProblemList(questionLableId, queryValue)
			})
		},
		changeCurrValue(id, name) {
			this.currentMoudleId = id
			if (name) this.currMoudleName = name
		},
		selectQues(list) {
			console.log(list, '====')
			this.$refs.questionDetail.getCurrQuesDetail(list || {})
		},
		//  改变点赞问题的状态
		changeQuesStatus(quesId) {
			this.$res.questionList.changeCurrQuesStatus(quesId)
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../comon.scss";
	.content-title {
		font-weight: bold;
		color: #000000;
		opacity: 1;
		font-size: 18px;
	}
	.content {
		width: 100%;
		height: 94%;
	}
	.middle-content {
		height: calc(100% - 140px);
		width: 100%;
		.right-content {
			width: 100%;
			height: 100%;
			margin-left: 20px;
			background: #FFFFFF;
			box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
			opacity: 1;
			border-radius: 5px;
		}
	}
</style>