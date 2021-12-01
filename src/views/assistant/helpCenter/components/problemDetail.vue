<template>
  <div class='detail-content'>
		<div class="ask-btn">
			<iButton @click="putQuestion">{{ language('我要提问') }}</iButton>
		</div>
		<div v-if="currentMoudleId" class="detail-title flex flex-column items-start">
			<div class="moudle-name">{{ language(`${currMoudleName}`) }}</div>
			<div class="flex flex-wrap label-box">
				<div v-for="(item, idx) in labelList" :key="idx" class="item-label cursor" :class="labelIdx===item.id ? 'activeIdx' : 'idx'" @click="handleLabel(item, idx)">
					{{ item.lableName }}
				</div>
			</div>
		</div>
		<div v-else>
			<div class="detail-title flex flex-column items-start">
				<div class="moudle-name">{{ language('热门问题') }}</div>
				<div class="flex flex-row hot-ques">
					<div v-for="(question, index) in hotProblemList" :key="index" :class="index===hotIdx?'first-hotQues':''" class="item-hotQues flex items-center cursor" @click="handleHotQues(question, index)">
						<div class="blue-box"></div>
						<div class="ml20">{{ `【热门】${question. questionTitle}` }}</div>
					</div>
				</div>
			</div>
			<div class="moudle-label flex flex-wrap">
				<div v-for="(moudle, ix) in moudleLabelList" :key="ix" class="moudleLabel-item flex flex-column">
					<div class="flex items-center item-top">
						<div class="blue-line"></div>
						<div class="item-top-moudle">{{ moudle.menuName }}</div>
					</div>
					<div class="flex flex-wrap item-content">
						<div class="content-label" v-for="(label, lx) in moudle.assistantModuleLabelEntityList" :key="lx" @click="handleLabel(label, idx)">
							<div class="label-name cursor">{{ label.lableName }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="list-content" v-show="currentMoudleId  && currentFlag === 'listPage'">
			<div class="flex flex-row label-title items-center">
				<div class="blue-box"></div>
				<div class="label-text">{{ labelText }}</div>
			</div>
			<div class="flex flex-column problem-box">
				<div v-for="(item, idx) in problemList" :key="idx" class="item-problem flex flex-row items-center" @click="handleProblem(item, idx)">
					<div class="blue-box"></div>
					<div class="problem-text cursor">{{ `【热门】${item.questionTitle}` }}</div>
				</div>
			</div>
		</div>

		<div class="detail" v-show="currentMoudleId && currentFlag === 'detailPage'">
			<div class="flex flex-row detail-box items-center">
				<div class="black-box"></div>
				<div class="detail-text">{{ problemText }}</div>
			</div>
			<div class="des-box">
				<div class="des-title">{{ problemText }}</div>
				<div class="des-detail">{{ desDetail }}</div>
			</div>
			<AttachmentDownload v-if="showAttachFlag" />
			<div class="bottom-zan">
				<Solution
					:showTipsFlag="showTipsFlag"
					@badSolution="badSolution"
					@goodSolution="goodSolution"
				/>
			</div>
		</div>

	</div>
</template>

<script>
import AttachmentDownload from '../../components/attachmentDownload'
import Solution from '../../components/solution'
import { updateFavour, getCurrLabelList, getProblemDetail, queryFaqByPage, queryHotFaq, getAllModuleLabel, judgeFavour } from '@/api/assistant'
import {
	iButton
} from 'rise'
export default {
  name: 'ProblemDetail',
	components: {
		iButton,
		AttachmentDownload,
		Solution
	},
	props: {
		currentMoudleId: {
			type: Number,
			default: 0
		},
		currMoudleName: {
			type: String,
			default: ''
		},
		moudleList: {
			type: Array,
			default: () => []
		}
	},
	async mounted() {
		await this.getLabelList('init')
		// 从首页进入 没有对应的模块id 查询热门问题 取前两个 查全部模块及标签
		if (!this.currentMoudleId) {
			await this.getHotQueTwo()
			await this.getAllMoudleLabel()
		}
	},
	data() {
		return {
			labelList: [],
			problemList: [],
			problemQuery: {
				pageNum: 1,
				pageSize: 3,
				questionLableId: null,
				questionModuleId: null
			},
			hotProblemList: [],
			moudleLabelList: [],
			labelIdx: 0,
			labelText: null,
			currentFlag: 'listPage',
			problemText: '',
			desDetail: '',
			showTipsFlag: true,
			hotIdx: 0,
			favourQuestionId: null,  // 点赞时的请求id
			queryProblemList: [],  // 搜索框查询出的问题数组
			currQuesFavourFlag: false,  //  当前问题是否点赞
			showAttachFlag: false  //  是否展示附件下载
		}
	},
	methods: {
		async handleLabel(item) {
			this.labelIdx = item.id
			this.labelText = item.lableName	
			//  这里有问题  props传进来的 currentMoudleId  不允许修改
			this.currentMoudleId = item.moduleId
			if (this.labelList.length === 0) {
				await this.getLabelList()
			}
			if (!this.currMoudleName) {
				let currName = null
				this.moudleList.map(mou => {
					if (item.moduleId === mou.id) {
						currName = mou.menuName
					} else {
						currName = '示例模块名称'
					}
				})
				this.$emit('changeCurrValue', item.moduleId, currName)
			}
			this.$emit('changeCurrValue', item.moduleId)
			this.problemQuery.questionLableId = item.id
			this.problemQuery.questionModuleId = item.moduleId
			this.currentFlag = 'listPage'
			this.getProblemList()
		},
		// 点击问题查询问题详情
		async handleProblem(item, idx) {
			this.currentFlag = 'detailPage'
			this.problemText = item.questionTitle
			await getProblemDetail({id:item.id}).then(res => {
				if (res?.code === '200') {
					const { data } = res
					this.desDetail = data?.answerContent || '供应商一共分成三类：一般，生产，共用 一般：'
					this.showAttachFlag = data?.annexList.length > 0 && data?.annexString
					this.getJudgeFavour(item.questionId)
				} 
				// else {
				// 	this.getJudgeFavour(item.questionId)
				// }
			})
		},
		// 获取该用户是否给该问题点赞
		async getJudgeFavour(questionId) {
			await judgeFavour({ faqId: questionId || 3 }).then((res) => {
				console.log(res, '+++++')
				if (res?.code === '200') {
					this.currQuesFavourFlag = res?.data
				}
			})
		},
		badSolution() {
			// this.$emit('putAdminTw', this.problemText, this.desDetail)
			this.$emit('putAdminTw', this.labelIdx)
		},
		// 问题点赞 + 1
		goodSolution() {
			if (!this.favourQuestionId) return
			if (this.currQuesFavourFlag) return this.$message.warning("您已对该问题点赞！") // 已对该问题点赞
			updateFavour(this.favourQuestionId).then((res) => {
				if (res?.code === '200') {
					this.$message.success("很开心该回答能帮助您...")
				}
			})
		},
		putQuestion() {
			this.$emit('handleQuestion')
		},
		// 点击热门问题 跳转该热门问题的详情且查询当前热门问题的标签 模块name及id
		async handleHotQues(item, index) {
			console.log(item, "item")
			this.favourQuestionId = item.questionId || item.id
			this.hotIdx = index
			this.labelIdx = item.questionLableId
			this.labelList.map(label => {
				if (label.id === item.questionLableId) {
					this.labelText = item.lableName
				}
			})
			let currName = ''
			this.moudleList.map(moudle => {
				if (moudle.id == item.questionModuleId) {
					currName = moudle.menuName
				} else {
					currName = '示例模块名称'
				}
			})
			//  这里有问题  props传进来的 currentMoudleId currMoudleName  不允许修改
			// this.currentMoudleId = item.questionModuleId
			// this.currMoudleName = currName
			await this.$emit("changeCurrValue", item.questionModuleId, currName)
			this.currentFlag = 'detailPage'
			this.problemText = item.questionTitle
			await this.getLabelList()	
			await getProblemDetail({id:item.id}).then(res => {
				if (res?.code === '200') {
					const { data } = res
					this.desDetail = data?.answerContent || '供应商一共分成三类：一般，生产，共用 一般：'
					this.getJudgeFavour(item.questionId)
				}
			})
		},
		// 通过智能弹窗热门问题跳转问题详情
		initDetailPage(issue) {
			this.currentFlag = 'detailPage'
			this.favourQuestionId = issue.questionId || issue.id
			this.problemText = issue.questionTitle
			this.desDetail = issue.answerContent
			console.log(this.currentFlag, "currentFlag")
		},
		async getLabelList(va) {
			if (!this.currentMoudleId) return
			await getCurrLabelList(this.currentMoudleId).then(res => {
				if (res?.code === '200') {
					console.log(res, '1112234')
					this.labelList = res?.data || []
					this.labelIdx = this.labelIdx ? this.labelIdx : res?.data[0]?.id
					this.labelText = this.labelText ? this.labelText : res?.data[0]?.lableName
					if (va === 'init') {
						// 如第一次查询 标签id是第一个
						this.problemQuery.questionLableId = res?.data[0]?.id
					}
					// 根据模板id 标签id 
					if (this.queryProblemList.length > 0) return
					this.getProblemList()
				}
			})
		},
		async getProblemList() {
			this.problemQuery.questionModuleId = this.currentMoudleId
			await queryFaqByPage(this.problemQuery).then((res) => {
				console.log(res, '090000')
				if (res?.code === '200') {
					this.problemList = res?.data?.records || []
					// this.problemList = [
					// 	{questionTitle: '常用计量单位和基础计量单位的转换关系是什么？', key: '-1', id: 1},
					// 	{questionTitle: '保存时，提示未填写BMG怎么办？', key: '0', id: 2},
					// 	{questionTitle: '零件材料组如何与工艺组的关联关系是什么？', key: '1', id: 3}
					// ]
				}
			})
		},
		async getHotQueTwo() {
			if (this.currentMoudleId) return
			await queryHotFaq().then((res) => {
				this.hotProblemList = res?.data || []
			})
		},
		async getAllMoudleLabel() {
			await getAllModuleLabel().then((res) => {
				if (res?.code === '200') {
					this.moudleLabelList = res?.data || []
				}
			})
		},
		async getQueryProblemList(data, currLabelId) {
			this.queryProblemList = data || []
			this.labelIdx = currLabelId
			await this.getLabelList()
			let currNameId = ''
			let currName = ''
			this.currentFlag = 'listPage'
			this.labelList.map(item => {
				if (item.id === currLabelId) {
					currNameId = item.moduleId
					this.labelText = item.lableName
				}
			})
			this.moudleList.map(moudle => {
				if (moudle.id === currNameId) {
					currName = moudle.menuName
				} else {
					currName = '示例模块名称'
				}
			})
			this.currMoudleName = currName
			this.problemList = this.queryProblemList || []
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../../comon.scss";
	.detail-content {
		min-height: 100%;
		padding: 20px 40px 0px 40px;
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
		opacity: 1;
		border-radius: 5px;
		overflow-y: auto;
		margin-left: 20px;
		.ask-btn {
			float: right;
		}
		.detail-title {
			margin-top: 50px;
			width: 100%;
			padding-bottom: 20px;
			border-top: 1px dotted rgba(112, 112, 112, 0.14901960784313725);;
			border-bottom: 1px dotted rgba(112, 112, 112, 0.14901960784313725);;
			.moudle-name {
				margin-top: 24px;
				font-size: 20px;
				font-weight: bold;
				line-height: 26px;
				color: #000000;
			}
			.hot-ques {
				width: 100%;
				margin-top: 20px;
				.item-hotQues {
					width: 50%;
					height: 30px;
					font-weight: bold;
				}
				.first-hotQues {
					color: #1660F1;
					text-decoration: underline;
				}
			}
			.label-box {
				margin-top: 22px;
				.item-label {
					height: 20px;
					line-height: 20px;
					margin-right: 30px;
					margin-bottom: 10px;
				}
				.activeIdx {
					color: #1763F7;
					font-weight: bold;
					font-size: 18px;
				}
				.idx {
					color: #909091;
					font-size: 14px;
				}
			}
		}
		.moudle-label {
			width: 100%;
			margin-top: 40px;
			.moudleLabel-item {
				width: 50%;
				.item-top {
					height: 40px;
					.blue-line {
						width: 6px;
						height: 18px;
						background: #1763F7;
						opacity: 1;
						border-radius: 5px;
					}
					.item-top-moudle {
						margin-left: 20px;
						font-size: 18px;
						font-weight: bold;
					}
				}
				.item-content {
					margin-top: 20px;
					margin-bottom: 50px;
					margin-left: 20px;
					width: 100%;
					.content-label {
						width: 33.3%;
						.label-name {
							width: 100%;
							font-size: 14px;
							color: #666666;
							font-weight: bold;
							margin-top: 20px;
						}
					}
				}
			}
		}
		.list-content {
			margin-top: 40px;
			.label-title {
				.label-text {
					margin-left: 16px;
					font-size: 16px;
					color: #1660F1;
					text-decoration: underline;
				}
			}
			.problem-box {
					margin-top: 20px;
					.item-problem {
						margin-bottom: 20px;
						.problem-text {
							margin-left: 16px;
							font-size: 16px;
							font-weight: bold;
							color: #222222;
						}
					}
				}
		}
		.detail {
			position: relative;
			margin-top: 30px;
			.detail-box {
				.detail-text {
					margin-left: 16px;
					font-size: 16px;
					color: #000000;
					font-weight: bold;
				}
			}
			.des-box {
				margin-top: 20px;
				width: 100%;
				padding: 20px;
				border: 1px solid #F2F2F2;
				opacity: 1;
				border-radius: 2px;
				min-height: 100px;
				overflow-x: hidden;
				overflow-y: auto;
				.des-title {
					font-size: 18px;
					color: #000000;
				}
				.des-detail {
					margin-top: 20px;
					color: #666666;
					font-size: 14px;
					padding-bottom: 30px;
				}
			}
			.bottom-zan {
				position: absolute;
				bottom: -200px;
				left: 40%;
			}
		}
	}
	.blue-box {
		width: 8px;
		height: 8px;
		background: #1763F7;
		opacity: 1;
		border-radius: 50%;
	}
	.black-box {
		width: 8px;
		height: 8px;
		background: #000000;
		opacity: 1;
		border-radius: 50%;
	}
</style>