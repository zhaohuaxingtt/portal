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
				:problemList="problemList"
				:currentMoudleIdx="currentMoudleIdx"
			/>
			<DataManage 
				@handleQuestion="handleQuestion"
			/>
		</div>
		<div class="flex flex-column content mt20" v-show="helpMoudle === 'problem'">
			<ProblemSearch />
			<div class="flex flex-row mt20 middle-content">
				<CommonProblem 
					:problemList="problemList"
					:currentMoudleIdx="currentMoudleIdx"
				/>
				<ProblemDetail 
					@handleQuestion="handleQuestion"
					@handleZwQues="handleZwQues"
				/>
			</div>
		</div>
		<div class="flex flex-row content mt20" v-show="helpMoudle === 'ask'">
			我的提问
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
import { getSystemMeun } from '@/api/assistant'

export default {
	data() {
		return {
			text: '用户助手',
			helpMoudle: "manual",  // manual 用户手册 problem 常见问题 ask 我的提问
			problemList: [],
			currentMoudleIdx: 1,
			intelligentVisible: false,
			questioningVisible: false,
			zwFlag: false,
			questioningTitle: ''
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
		QuestioningDialog
	},
	mounted() {
		this.getProbleList()
	},
	methods: {
		async getProbleList() {
			getSystemMeun().then((res) => {
				if (res.code === '200') {
					let { data: { menuList }} = res
					this.problemList = [...menuList[1]?.menuList, ...menuList[2]?.menuList]
				}
			})
		},
		// 右上方分类点击事件
		tabChange(val) {
			this.helpMoudle = val
		},
		// 打开智能弹窗
		handleQuestion() {
			console.log('handleQuestion')
			this.intelligentVisible = true
		},
		// 追问 打开问题弹框
		handleZwQues(title) {
			this.questioningVisible = true
			this.questioningTitle = title
			this.zwFlag = true
		},
		// 关闭智能弹框
		closeDialog(va) {
			this.intelligentVisible = va
		},
		// 关闭问题弹框
		closeQuesDialog(va) {
			this.questioningVisible = va
		},
		// 提问 打开问题弹框
		putAdminTw() {
			this.intelligentVisible = false
			this.questioningVisible = true
			this.questioningTitle = '提问'
			this.zwFlag = false
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