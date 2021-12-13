<template>
  <div class='detail-content'>
		<div class="ask-btn">
			<iButton @click="putQuestion">{{ language('我要提问') }}</iButton>
		</div>
		<div v-if="currentMoudleId" class="detail-title flex flex-column items-start">
			<div class="moudle-name">{{ language(`${currMoudleName}`) }}</div>
			<div class="flex flex-wrap label-box" v-loading="labelLoading">
				<div v-for="(item, idx) in labelList" :key="idx" class="flex flex-row item-label cursor" :class="labelIdx===item.id ? 'activeIdx' : 'idx'" @click="handleLabel(item, idx)">
					<div :class="labelIdx===item.id ? 'blue-line' : ''"></div>
					<div>{{ item.lableName }}</div>
				</div>
			</div>
		</div>
		<div v-if="!currentMoudleId && !onlyShowQuestion">
			<div class="detail-title flex flex-column items-start" v-loading="hotQuesLoading">
				<div class="moudle-name">{{ language('热门问题') }}</div>
				<div class="flex flex-row hot-ques">
					<div v-for="(question, index) in hotProblemList" :key="index" class="item-hotQues flex items-center cursor" @click="handleHotQues(question, index)">
						<div class="blue-box"></div>
						<div class="ml20 hot-tlt">{{ `【热门】${question. questionTitle}` }}</div>
					</div>
				</div>
			</div>
			<div class="moudle-label flex flex-wrap" v-loading="allModuleLabelLoading">
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

		<div class="list-content" v-if="onlyShowQuestion">
			<div class="flex flex-column problem-box" v-loading="problemLoading" v-if="problemList.length > 0">
				<div v-for="(item, idx) in problemList" :key="idx" class="item-problem flex flex-row items-center" @click="handleProblem(item, idx)">
					<div class="blue-box"></div>
					<div class="problem-text cursor">{{ `${item.questionTitle}` }}</div>
				</div>
			</div>
			<div v-else>暂无该标签所属问题,您可提交您的疑问</div>
			<el-pagination 
				:total="totalCount" 
				:current-page="problemQuery.pageNum" 
				:page-size="problemQuery.pageSize"
				@current-change="handleCurrentChange"
			></el-pagination>
		</div>

		<div class="list-content" v-show="currentMoudleId  && currentFlag === 'listPage'">
			<!-- <div class="flex flex-row label-title items-center">
				<div class="blue-box"></div>
				<div class="label-text">{{ labelText }}</div>
			</div> -->
			<div class="flex flex-column problem-box" v-loading="problemLoading" v-if="problemList.length > 0">
				<div v-for="(item, idx) in problemList" :key="idx" class="item-problem flex flex-row items-center" @click="handleProblem(item, idx)">
					<div class="blue-box"></div>
					<div class="problem-text cursor">{{ `${item.questionTitle}` }}</div>
				</div>
			</div>
			<div v-else>暂无该标签所属问题,您可提交您的疑问</div>
			<el-pagination 
				:total="totalCount" 
				:current-page="problemQuery.pageNum" 
				:page-size="problemQuery.pageSize"
				@current-change="handleCurrentChange"
			></el-pagination>
		</div>

		<div class="detail" v-show="currentMoudleId && currentFlag === 'detailPage'">
			<div class="flex flex-row detail-box items-center">
				<div class="black-box"></div>
				<div class="detail-text">{{ problemText }}</div>
			</div>
			<div class="des-box">
				<div class="des-title">{{ problemText }}</div>
				<div v-html="desDetail" class="des-detail"></div>
			</div>
			<AttachmentDownload 
				ref="attachment"
				v-if="showAttachFlag && attach.length > 0"
			/>
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
			type: String,
			default: ''
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
			console.log('8900890')
			this.init()
		}
	},
	data() {
		return {
			problemLoading: false,  //  问题列表loading
			labelLoading: false,  //  查询标签loading
			allModuleLabelLoading: false,  //  查询全部模板标签loading
			hotQuesLoading: false,  // 查询热门问题loading 
			labelList: [],
			problemList: [],
			problemQuery: {
				pageNum: 1,
				pageSize: 5,
				questionLableId: null,
				questionModuleId: null,
				questionTitle: null
			},
			totalCount: 0,
			hotProblemList: [],
			moudleLabelList: [],
			attach: [],
			labelIdx: '',
			labelText: null,
			currentFlag: 'listPage',
			problemText: '',
			desDetail: '',
			showTipsFlag: true,
			hotIdx: 0,
			formSource: null,
			favourQuestionId: null,  // 点赞时的请求id
			currQuesFavourFlag: false,  //  当前问题是否点赞
			showAttachFlag: false,  //  是否展示附件下载
			onlyShowQuestion: false,
			onlyShowDetail: false
		}
	},
	methods: {
		async turnPageInit(query) {
			console.log(query, query.id, "query")
			this.onlyShowDetail= true
			this.currentFlag = 'detailPage'
			this.onlyShowQuestion = false
			this.labelIdx = query.labelIdx
			await this.getLabelList(this.labelIdx)
			this.labelLoading = false
			await getProblemDetail({id: query.id}).then(res => {
				if (res?.code === '200') {
					const { data } = res
					this.desDetail = data?.answerContent || '供应商一共分成三类：一般，生产，共用 一般：'
					this.problemText = data.questionTitle
					this.showAttachFlag = data?.annexList.length > 0
					this.attach = data?.annexList
					this.$nextTick(() => {
						if (this.showAttachFlag) {
							console.log(this.$refs.attachment, "111111")
							this.$refs.attachment.fileList = data?.annexList
						}
					})
					this.getJudgeFavour(query.id)
				}
			})
		},
		async init(){
			this.onlyShowQuestion = false
			await this.getHotQueTwo()
			await this.getAllMoudleLabel()
		},
		async handleLabel(item) {
			//  重置查询参数
			this.problemQuery.pageNum = 1
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
			console.log(item, "item")
			this.onlyShowQuestion = false
			if (!this.currentMoudleId) {
				//  只输入标题查询时 还没定位到当前问题的模块标题 点击问题时 才能确定
				console.log(item, "12345678")
				let currName = ''
				this.moudleList.map(mou => {
					if (item.questionModuleId === mou.id) {
						currName = mou.menuName
					}
				})
				console.log(currName, "currName")
				this.$emit("update:currentMoudleId", item.questionModuleId)
				this.$emit("update:currMoudleName", currName)
				this.labelIdx = item.questionLableId
				this.$nextTick(() => {
					this.getLabelList()
				})
				
			}
			this.currentFlag = 'detailPage'
			this.problemText = item.questionTitle
			this.problemLoading = true
			this.favourQuestionId = item.id
			await getProblemDetail({id:item.id}).then(res => {
				if (res?.code === '200') {
					const { data } = res
					this.problemLoading = false
					this.desDetail = data?.answerContent || '供应商一共分成三类：一般，生产，共用 一般：'
					this.showAttachFlag = data?.annexList.length > 0
					this.attach = data?.annexList
					this.$nextTick(() => {
						if (this.showAttachFlag) {
							console.log(this.$refs.attachment, "111111")
							this.$refs.attachment.fileList = data?.annexList
						}
					})
					this.getJudgeFavour(item.questionId || item.id)
				}
			})
		},
		// 获取该用户是否给该问题点赞
		async getJudgeFavour(questionId) {
			await judgeFavour({ faqId: questionId }).then((res) => {
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
					this.getJudgeFavour(this.favourQuestionId)
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
				}
			})
			//  这里有问题  props传进来的 currentMoudleId currMoudleName  不允许修改
			// this.currentMoudleId = item.questionModuleId
			// this.currMoudleName = currName
			this.$emit("changeCurrValue", item.questionModuleId, currName)
			this.$nextTick(() => {
				this.currentFlag = 'detailPage'
				this.problemText = item.questionTitle
				this.getLabelList()
				this.problemLoading = true
				getProblemDetail({id:item.id}).then(res => {
					if (res?.code === '200') {
						const { data } = res
						this.desDetail = data?.answerContent || '供应商一共分成三类：一般，生产，共用 一般：'
						this.problemLoading = false
						this.getJudgeFavour(item.questionId)
					}
				})
			})
		},
		// 通过智能弹窗热门问题跳转问题详情
		async initDetailPage(issue) {
			this.labelIdx = issue.questionLableId
			await this.getLabelList()
			this.labelList.map(label => {
				if (label.id === issue.questionLableId) {
					this.labelText = label.lableName
				}
			})
			this.currentFlag = 'detailPage'
			this.favourQuestionId = issue.questionId || issue.id
			this.problemText = issue.questionTitle
			this.desDetail = issue.answerContent
			this.showAttachFlag = (issue?.annexList || []).length > 0
		},
		async getLabelList(va) {
			if (!this.currentMoudleId) return
			this.labelLoading = true
			await getCurrLabelList(this.currentMoudleId).then(res => {
				if (res?.code === '200') {
					console.log(res, "23456")
					this.labelList = res?.data || []
					this.labelList.unshift({
						lableName: "全部",
						id: '',
						moduleId: this.labelList[0]?.moduleId
					})
					this.labelIdx = this.labelIdx ? this.labelIdx : res?.data[0]?.id
					// this.labelText = this.labelText ? this.labelText : res?.data[0]?.lableName
					if (va === 'init') {
						// 如第一次查询 标签id是第一个
						this.problemQuery.questionLableId = res?.data[0]?.id
					} else {
						this.problemQuery.questionLableId = this.labelIdx
					}
					// 查询标签结束后 会查询该标签下的问题
					if (this.formSource === 'query') return this.labelLoading = false
					if (this.onlyShowDetail) return
					this.problemList = []
					this.labelLoading = false
					this.getProblemList()
				}
			})
		},
		handleCurrentChange(current) {
			console.log(current, "11")
			this.problemQuery.pageNum = current
			this.getProblemList()
		},
		async getProblemList() {
			this.problemQuery.questionModuleId = this.currentMoudleId
			await queryFaqByPage(this.problemQuery).then((res) => {
				if (res?.code === '200') {
					const { data } = res
					this.problemList = data?.records || []
					this.totalCount = data.total
					this.problemQuery.pageSize = data.size
					this.problemQuery.pageNum = data.current
					this.formSource = null
				}
			})
		},
		async getHotQueTwo() {
			if (this.currentMoudleId) return
			this.hotQuesLoading = true
			await queryHotFaq().then((res) => {
				this.hotQuesLoading = false
				this.hotProblemList = res?.data || []
			})
		},
		async getAllMoudleLabel() {
			this.allModuleLabelLoading = true
			await getAllModuleLabel().then((res) => {
				if (res?.code === '200') {
					this.allModuleLabelLoading = false
					this.moudleLabelList = res?.data || []
				}
			})
		},
		async getQueryProblemList(currLabelId, queryValue) {
			this.problemQuery.pageNum = 1
			this.formSource = 'query'
			this.labelIdx = currLabelId
			//  查询时有模块id
			if (this.currentMoudleId) {
				this.onlyShowQuestion = false
				this.currentFlag = 'listPage'
				await this.getLabelList()
				let currNameId = ''
				this.labelList.map(item => {
					if (item.id === currLabelId) {
						currNameId = item.moduleId
						this.labelText = item.lableName
					}
				})
				if (!this.currMoudleName) {
					let currName = ''
					this.moudleList.map(moudle => {
						if (moudle.id === currNameId) {
							currName = moudle.menuName
						}
					})
					this.currMoudleName = currName
				}
				Object.assign(this.problemQuery, queryValue)
				await this.getProblemList()
			} else {
				//  无模块id 需根据查询问题反推模块及标签
				this.onlyShowQuestion = true
				console.log("1111111")
				Object.assign(this.problemQuery, queryValue)
				await this.getProblemList()
			}
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
				font-size: 16px;
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
				.hot-tlt:hover {
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
					.blue-line {
						width: 4px;
						height: 20px;
						background: #1763F7;
						margin-right: 10px;
						border-radius: 5px;
					}
				}
				
				:hover {
					color: #1660F1;
					text-decoration: underline;
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
						font-size: 16px;
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
						:hover {
							color: #1763F7;
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
						:hover {
							color: #1660F1;
							text-decoration: underline;
						}
					}
				}
		}
		.detail {
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
				margin-top: 20px;
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