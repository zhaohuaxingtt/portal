<template>
  <div class="right-content ml20">
	<div class="search-box flex justify-end items-center">
		<iButton @click="handleQuestion">{{ language('我要提问') }}</iButton>
	</div>
	<div class="line"></div>
	<div class="title-des flex items-center mt20">{{ title }}</div>
	<div class="label mt20">{{ moudleName }}</div>
	<div class="ques-box flex flex-column">
		<div v-for="(ques, idx) in chatList" :key="idx" class="item-ques flex flex-row">
			<div class="item-who"> {{ques.replyType==='reply'?'管理员':'我'}} </div>
			<div class="desc-box">
				<div class="desc">{{ ques.content }}</div>
				<div class="date">{{ ques.createDate }}</div>
			</div>
		</div>
	</div>
	<div class="solution-box">
		<div class="good-box flex flex-row items-center justify-center cursor" @click="good">
			<img src="@/assets/images/good.png" alt="" class="icon-png">
			<div class="good-text">已解决</div>
		</div>
		<div class="bad-box flex flex-row items-center justify-center cursor" @click="bad">
			<img src="@/assets/images/bad.png" alt="" class="icon-png">
			<div class="bad-text">未解决</div>
		</div>
	</div>
	
  </div>
</template>

<script>
import { iButton } from 'rise';
import { queryDetailByIdApi, judgeFavour, updateFavour } from '@/api/assistant'
import moment from 'moment'
export default {
	name: 'QuestionDetail',
	components: {
		iButton
	},
	data() {
		return {
			title: '',
			moudleName: '主数据管理',
			chatList: [],
			currQuesFavourFlag: false,  //  当前问题是否点赞
			currQuestionId: null,  //  当前问题id
			currQuesInfo: null  //  当前问题的全部信息
		}
	},
	methods: {
		good() {
			if (this.currQuesFavourFlag) return  // 已对该问题点赞
			updateFavour(this.currQuestionId).then((res) => {
				console.log(res, '11111')
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
			this.currQuestionId = list.id
			this.title = list.questionTitle
			await this.getJudgeFavour()
			this.getQuesDetail(list.id)
		},
		async getQuesDetail(id) {
			if (!id) return
			await queryDetailByIdApi(id).then((res) => {
				if (res?.code === '200') {
					const { data } = res
					this.currQuesInfo = data
					this.dealData(data?.replyQuestionList || [], data?.questionTitle, data?.createDate )
				}
			})
		},
		dealData(replyList, questionTitle, createDate) {
			let list = []
			if (questionTitle && createDate) {
				list.push({
					content: questionTitle,
					createDate: moment(createDate).format('YYYY-MM-DD'),
					replyType: 'question'
				})
			}
			if (replyList.length > 0) list = [...list, ...replyList]
			this.chatList = list
		},
		// 获取该用户是否给该问题点赞
		async getJudgeFavour() {
			await judgeFavour({ faqId: this.currQuestionId || 3 }).then((res) => {
				if (res?.code === '200') {
					this.currQuesFavourFlag = res?.data
				}
			})
		},
	}
}
</script>

<style lang="scss" scoped>
	@import "../../comon.scss";
	.right-content {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		box-shadow: 0px 0px 10px rgba(27, 29, 33, 0.08);
		opacity: 1;
		border-radius: 5px;
		padding: 30px 40px 20px 40px;
		overflow: auto;
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
			font-size: 18px;
			font-weight: bold;
			height: 40px;
		}
		.label {
			display: inline-block;
			background: #EDEDED;
			opacity: 1;
			border-radius: 8px;
			padding: 10px;
			color: #4B5C7D;
			font-size: 14px;
		}
		.ques-box {
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
		margin-top: 80px;
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
</style>