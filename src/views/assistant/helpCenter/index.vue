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
		<div class="flex flex-row content mt20" v-show="helpMoudle === 'manual'">
			<CommonProblem
				:loading="listLoading"
				:moudleList="moudleList"
				:currentMoudleId.sync="currentMoudleId"
			/>
			<DataManage
				:loading="listLoading"
				@handleQuestion="handleQuestion"
			/>
		</div>
		<div class="flex flex-column content mt20" v-show="helpMoudle === 'problem'">
			<ProblemSearch />
			<div class="flex flex-row mt20 middle-content">
				<CommonProblem 
					:moudleList="moudleList"
					:currentMoudleId.sync="currentMoudleId"
				/>
				<ProblemDetail
					:moudleId="currentMoudleId" 
					@handleQuestion="handleQuestion"
					@handleZwQues="handleZwQues"
				/>
			</div>
		</div>
		<div class="flex flex-row content mt20" v-show="helpMoudle === 'ask'">
			<QuestionList />
			<QuestionDetail 
				@handleZwQues="handleZwQues"
				@handleQuestion="handleQuestion"
			/>
		</div>
		<IntelligentDialog 
			:intelligentVisible="intelligentVisible"
			@closeDialog="closeDialog"
			@putAdminTw="putAdminTw"
		/>

		<QuestioningDialog
			:questioningVisible="questioningVisible"
			:questioningTitle="questioningTitle"
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
import { getSystemMeun, getModuleList, getHotFiveQues } from '@/api/assistant'

export default {
	data() {
		return {
			text: '用户助手',
			helpMoudle: "manual",  // manual 用户手册 problem 常见问题 ask 我的提问
			moudleList: [],
			currentMoudleId: null,
			intelligentVisible: false,  // 智能弹框visible
			questioningVisible: false,  // 追问 提问visible
			zwFlag: false,  // 追问 提问标志
			questioningTitle: '',  // 追问 提问弹框title
			listLoading: false,
			currentUrl: ''
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
		let { currentUrl } = this.$route.params
		console.log(currentUrl, "params")
		this.currentUrl = currentUrl
	},
	async mounted() {
		await this.getMoudleList()
		await this.getCurrentModule()
	},
	methods: {
		async getMoudleList() {
			this.listLoading = true
			await getSystemMeun().then((res) => {
				if (res.code === '200') {
					let { data: { menuList }} = res
					this.listLoading = false
					this.moudleList = [...menuList[1]?.menuList, ...menuList[2]?.menuList]
				}
			})
		},
		// 根据当前url和模块列表定位具体模块
		getCurrentModule() {
			console.log(this.moudleList, "moudleList")
			this.currentMoudleId = 785
		},
		// 右上方分类点击事件
		tabChange(val) {
			this.helpMoudle = val
		},
		// 打开智能弹窗
		async handleQuestion() {
			console.log('handleQuestion')
			await getHotFiveQues(this.currentMoudleId).then((res) => {
				console.log(res, '111111111')
			})
			this.intelligentVisible = true
		},
		// 关闭智能弹框
		closeDialog(va) {
			this.intelligentVisible = va
		},
		// 追问 打开问题弹框
		handleZwQues(title) {
			console.log(title, "handleZwQues")
			this.questioningVisible = true
			this.questioningTitle = title
			this.zwFlag = true
		},
		// 提问 打开问题弹框
		putAdminTw() {
			this.intelligentVisible = false
			this.questioningVisible = true
			this.questioningTitle = '提问'
			this.zwFlag = false
		},
		// 关闭问题弹框
		closeQuesDialog(va) {
			this.questioningVisible = va
		},
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