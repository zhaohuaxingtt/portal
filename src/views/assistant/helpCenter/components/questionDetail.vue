<template>
  <div class="right-content ml20 flex flex-column" v-loading="detailLoading">
	<div class="search-box flex justify-end items-center">
		<iButton @click="handleQuestion">{{ language('我要提问') }}</iButton>
	</div>
	<div class="line"></div>
	<div class="title-des flex items-center mt20">{{ title }}</div>
	<div class="mt20 label" v-if="getCurrModuleName(questionModuleId)">{{ getCurrModuleName(questionModuleId) }}</div>
	<div class="ques-box flex flex-column">
		<div v-for="(ques, idx) in chatList" :key="idx" class="item-ques flex flex-column">
			<div v-if="ques.replyType === 'transfer'" class="transfer-content flex flex-row items-center justify-center">
				<img src="@/assets/images/icon/horn.png" alt="" class="horn-png">
				<div>{{`管理员${ques.replyUserName}将任务转派给了管理员${ques.handlerToUserName}`}}</div>
			</div>
			<div v-else class="flex flex-row">
				<div class="item-who"> {{ques.replyType==='reply'?'管理员':'我'}} </div>
				<div class="desc-box">
					<div class="desc" v-html="ques.content"></div>
					<div class="date">{{ ques.createDate }}</div>
				</div>
			</div>
		</div>
	</div>
	<div class="flex mt20" v-show="fileList.length > 0">
		<div>附件：</div>
		<iUpload 
			ref="attachment"
			disabled
			v-model="fileList"
		/>
	</div>
	<div class="solution-box" v-show="solutionFlag">
		<div class="good-box flex flex-row items-center justify-center cursor" @click="good">
			<i class="icon good"></i>
			<div class="good-text">已解决</div>
		</div>
		<div class="good-box flex flex-row items-center justify-center cursor" @click="bad">
			<i class="icon bad"></i>
			<div class="good-text">未解决</div>
		</div>
	</div>
  </div>
</template>

<script>
import { iButton } from 'rise';
import { queryDetailByIdApi, closeQuestionApi } from '@/api/assistant'
import iUpload from '../../components/iUpload.vue'
import moment from 'moment'
export default {
	name: 'QuestionDetail',
	components: {
		iButton,
		iUpload
	},
	props: {
		moudleList: {
			type: Array,
			default: () => []
		}
	},
	data() {
		return {
			detailLoading: false,
			solutionFlag: false,
			title: '',
			moudleName: null,
			chatList: [],
			fileList:[],
			currQuesFavourFlag: false,  //  当前问题是否点赞
			currQuestionId: null,  //  当前问题id
			currQuesInfo: null,  //  当前问题的全部信息
			showAttachFlag: false,
			questionModuleId:""
		}
	},
	methods: {
		//  我的问题 点击已解决关闭问题
		good() {
			if (!this.currQuestionId) return
			// if (this.currQuesFavourFlag) return this.$message.warning("您已对该问题点赞, 请勿重复点击")  // 已对该问题点赞
			closeQuestionApi(this.currQuestionId).then((res) => {
				if (res?.code === '200') {
					this.$message.success("很开心该回答能帮助您...")
					this.solutionFlag = false
					this.$emit('changeQuesStatus', this.currQuestionId)
					// this.getJudgeFavour(this.currQuestionId)
				}
			})
		},
		bad() {
			console.log('未解决 打开追问 并带信息')
			this.$emit('handleZwQues', this.title, this.currQuesInfo)
		},
		handleQuestion() {
			console.log('打开智能弹窗')
			this.$emit('handleQuestion')
		},
		async getCurrQuesDetail(list) {
			this.questionModuleId = list.questionModuleId
			this.currQuestionId = list.id
			this.title = list.questionTitle
			await this.getQuesDetail(list.id)
			// await this.getJudgeFavour()
		},
		async getQuesDetail(id) {
			if (!id) return
			this.detailLoading = true
			this.showAttachFlag = false
			await queryDetailByIdApi(id).then((res) => {
				if (res?.code === '200') {
					const { data } = res
					// 获取当前问题的附件(用户上传及管理员回复的附件)
					let currQuesFileList = []
					if (data.attachmentDTOList.length > 0) {
						this.showAttachFlag = true
						currQuesFileList = data.attachmentDTOList || []
					}
					if (data.replyQuestionList.length > 0) {
						data.replyQuestionList.map(item => {
							if (item.attachmentList.length > 0) {
								this.showAttachFlag = true
								currQuesFileList = currQuesFileList.concat(item.attachmentList)
							}
						})
					}
					this.fileList = currQuesFileList || []
					this.currQuesInfo = data
					this.solutionFlag = this.currQuesInfo.questionStatus === 'reply' ? true : false
					this.dealData(data?.replyQuestionList || [], data?.questionTitle, data?.createDate)
					this.detailLoading = false
				}
			})
		},
		dealData(replyList, questionTitle, createDate) {
			let list = []
			if (questionTitle && createDate) {
				list.push({
					content: questionTitle,
					createDate: moment(createDate).format('YYYY-MM-DD hh:mm:ss'),
					replyType: 'question'
				})
			}
			if (replyList.length > 0) list = [...list, ...replyList]
			this.chatList = list
		},
		getCurrModuleName(id) {
			let f = this.moudleList.find(item => item.id === id)
			return f ? f.menuName : ""
		},	
		// 获取该用户是否给该问题点赞
		// async getJudgeFavour() {
		// 	if (!this.currQuestionId) return
		// 	await judgeFavour({ faqId: this.currQuestionId }).then((res) => {
		// 		if (res?.code === '200') {
		// 			this.currQuesFavourFlag = res?.data
		// 		}
		// 	})
		// },
	}
}
</script>

<style lang="scss" scoped>
	@import "../../comon.scss";
	.right-content {
		width: 72%;
		height: 100%;
		background: #FFFFFF;
		box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
		opacity: 1;
		border-radius: 5px;
		padding: 30px 40px 20px 40px;
		.search-box {
			height: 60px;
		}
		.line {
			width: 100%;
			height: 0px;
			border: 1px solid rgba(112, 112, 112, 0.14901960784313725);
			opacity: 1;
			margin-top: 20px;
		}
		.title-des {
			color: #000000;
			font-size: 16px;
			font-weight: bold;
			height: 40px;
		}
		.label {
			// display: inline-block;
			// background: #EDEDED;
			// opacity: 1;
			// border-radius: 8px;
			// padding: 10px;
			// color: #4B5C7D;
			// font-size: 14px;
			max-width: 100px;
			background: #ededed;
			border-radius: 10px;
			color: #4b5c7d;
			padding: 10px;
			text-align: center;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
		.ques-box {
			flex: 1;
			margin-top: 40px;
			height: 420px;
			border: 1px solid #F2F2F2;
			opacity: 1;
			border-radius: 2px;
			overflow-y: auto;
			.item-ques {
				margin: 20px 20px;
				.item-who {
					width: 80px;
					font-size: 16px;
					color: #000000;
				}
				.desc-box {
					display: inline-block;
					background: #F8F8FA;
					opacity: 1;
					border-radius: 4px;
					padding: 20px;
					.desc {
						color: #000000;
						font-size: 14px;
					}
					.date {
						color: #888888;
						font-size: 12px;
						margin-top: 10px;
					}
				}
			}
		}
	}
	.solution-box {
		margin-top: 20px;
		display: flex;
		align-items: center;
		justify-content: center
	}
	.good-box {
		width: 100px;
		height: 30px;
		background: #EDEDED;
		opacity: 1;
		border-radius: 16px;
		margin-right: 20px;
		&:hover{
			background: #1962F1;
			.good-text {
				color: #fff;
			}

			.icon {
				&.good{
					background-image: url("~@/assets/images/assistant/zan.jpg");
				}
				&.bad{
					width: 18px;
					height: 18px;
					background-image: url("~@/assets/images/assistant/nozan.jpg");
				}
			}
		}
		.good-text {
			color: #4B5C7D;
			font-size: 14px;
			margin-left: 6px;
		}
	}
	.bad-box {
		width: 100px;
		height: 30px;
		background: #1962F1;;
		opacity: 1;
		border-radius: 16px;
		.bad-text {
			color: #FFFFFF;
			font-size: 14px;
			margin-left: 6px;
		}
	}
	.icon-png {
		width: 20px;
		height: 20px;
	}
	.transfer-content {
		width: 100%;
		margin-bottom: 20px;
	}
	.horn-png {
		width: 16px;
		height: 16px;
		margin-right: 10px;
	}
	.icon {
		width: 20px;
		height: 20px;
		background-repeat: no-repeat;
		background-size: contain;
		&.good{
			background-image: url("~@/assets/images/assistant/zan_active.jpg");
		}
		&.bad{
			width: 18px;
			height: 18px;
			background-image: url("~@/assets/images/assistant/nozan_active.jpg");
		}
	}
</style>