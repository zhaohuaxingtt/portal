<template>
  <div class='detail-content'>
		<div class="ask-btn">
			<iButton @click="putQuestion">{{ language('我要提问') }}</iButton>
		</div>
		<div v-if="currentMoudleId" class="detail-title flex flex-column items-start">
			<div class="moudle-name">{{ language(`${currMoudleName}`) }}</div>
			<div class="flex flex-wrap label-box">
				<div v-for="(item, idx) in labelList" :key="idx" class="item-label cursor" :class="labelIdx===idx ? 'activeIdx' : 'idx'" @click="handleLabel(item, idx)">
					{{ item.label }}
				</div>
			</div>
		</div>
		<div v-else>
			<div class="detail-title flex flex-column items-start">
				<div class="moudle-name">{{ language('热门问题') }}</div>
				<div class="flex flex-row hot-ques">
					<div v-for="(question, index) in hotProblemList" :key="index" :class="index===hotIdx?'first-hotQues':''" class="item-hotQues flex items-center cursor" @click="handleHotQues(question, index)">
						<div class="blue-box"></div>
						<div class="ml20">{{ `【热门】${question. problem}` }}</div>
					</div>
				</div>
			</div>
			<div class="moudle-label flex flex-wrap">
				<div v-for="(moedle, ix) in moudleLabelList" :key="ix" class="moudleLabel-item flex flex-column">
					<div class="flex items-center item-top">
						<div class="blue-line"></div>
						<div class="item-top-moudle">{{ moedle.moudleName }}</div>
					</div>
					<div class="flex flex-wrap item-content">
						<div class="content-label" v-for="(label, lx) in moedle.labelArr" :key="lx">
							<div class="label-name cursor">{{ label.labelName }}</div>
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
				<div v-for="(item, idx) in problemList" :key="idx" class="item-problem flex flex-row items-center" @click="handleProbelm(item, idx)">
					<div class="blue-box"></div>
					<div class="problem-text cursor">{{ `【热门】${item.problem}` }}</div>
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
			<AttachmentDownload />
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
import { updateFavour, getCurrLabelList, getProblemDetail } from '@/api/assistant'
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
		}
	},
	async mounted() {
		console.log('12345')
		await this.getLabelList()
	},
	data() {
		return {
			labelList: [],
			problemList: [
				{problem: '常用计量单位和基础计量单位的转换关系是什么？', key: '-1', id: 1},
				{problem: '保存时，提示未填写BMG怎么办？', key: '0', id: 2},
				{problem: '零件材料组如何与工艺组的关联关系是什么？', key: '1', id: 3}
			],
			problemQuery: {
				pageNum: 0,
				pageSize: 0,
				questionLableId: '',
				questionModuleId: ''
			},
			hotProblemList: [
				{
					problem: '保存时，提示未填写BMG怎么办？', key: '0'
				},
				{
					problem: '常用计量单位和基础计量单位的转换关系是什么？', key: '1'
				}
			],
			moudleLabelList: [
				{
					moudleName: '零件信息',
					labelArr: [
						{ labelName: '交易条款', id: '1' },
						{ labelName: '交易条款', id: '1' },
						{ labelName: '交易条款', id: '1' },
						{ labelName: '交易条款', id: '1' },
					]
				},
				{
					moudleName: '零件信息',
					labelArr: [
						{ labelName: '交易条款', id: '1' },
						{ labelName: '交易条款', id: '1' },
						{ labelName: '交易条款', id: '1' },
						{ labelName: '交易条款', id: '1' },
					]
				},
				{
					moudleName: '零件信息',
					labelArr: [
						{ labelName: '交易条款', id: '1' },
						{ labelName: '交易条款', id: '1' },
						{ labelName: '交易条款', id: '1' },
						{ labelName: '交易条款', id: '1' },
					]
				},
				{
					moudleName: '零件信息',
					labelArr: [
						{ labelName: '交易条款', id: '1' },
						{ labelName: '交易条款', id: '1' },
						{ labelName: '交易条款', id: '1' },
						{ labelName: '交易条款', id: '1' },
					]
				}
			],
			labelIdx: 0,
			labelText: '全部',
			currentFlag: 'listPage',
			problemText: '',
			desDetail: '供应商一共分成三类：一般，生产，共用 一般：',
			showTipsFlag: true,
			hotIdx: 0,
			favourQuery: null  // 点赞时的请求体
		}
	},
	methods: {
		handleLabel(item, idx) {
			console.log(item, "item")
			this.labelIdx = idx
			this.labelText = item.label
			this.currentFlag = 'listPage'
		},
		// 点击问题查询问题详情
		async handleProbelm(item, idx) {
			console.log(item, idx, "item")
			this.currentFlag = 'detailPage'
			this.problemText = item.problem
			await getProblemDetail(item.id).then(res => {
				console.log(res, '112344')
			})
		},
		badSolution() {
			console.log("点击跳转追问页面")
			this.$emit('handleZwQues', this.problemText, this.desDetail)
		},
		// 问题点赞 + 1
		goodSolution() {
			updateFavour(this.favourQuery).then((res) => {
				console.log(res, '11111')
			})
		},
		putQuestion() {
			this.$emit('handleQuestion')
		},
		// 点击热门问题 跳转该热门问题的详情
		async handleHotQues(item, index) {
			console.log(item, "item")
			this.hotIdx = index
			// this.currentMoudleId = index + 1 // 切换当前模块id
			this.currentFlag = 'detailPage'
			this.problemText = item.problem
			await getProblemDetail(item.id).then(res => {
				console.log(res, '112344')
			})
		},
		// 通过智能弹窗热门问题跳转问题详情
		initDetailPage(issue) {
			this.currentFlag = 'detailPage'
			this.favourQuery = issue
			this.problemText = issue.questionTitle
			this.desDetail = issue.answerContent
			console.log(this.currentFlag, "currentFlag")
		},
		async getLabelList() {
			if (!this.currentMoudleId) return
			await getCurrLabelList(this.currentMoudleId).then(res => {
				console.log(res, '1111111')
				if (res?.code === '200') {
					// this.labelList = res?.data || []
					this.labelList = [
						{label: '全部', key: '-1'},
						{label: "车型", key: '0'},
						{label: "零件信息", key: '1'},
						{label: "MTZ材料", key: '2'},
						{label: "供应商主数据", key: '3'}
					]
				}
			})
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