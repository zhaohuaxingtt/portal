<template>
	<iDialog
		:visible.sync="intelligentVisible"
		:title="intelligentTitle"
		@close="clearDialog"
		width="60%"
	>
		<div class="chat-box">
			<div v-for="(item, idx) in chatList" :key="idx">
				<div class="flex flex-row mt20" :class="item.type !== 'admin' ? 'rightContent' : 'leftContent'">
					<div class="icon-box">
						<img src="~@/assets/images/administrator.png" alt="" class="icon" />
						<!-- <img :src="(idx+1) %2 === 0 ? '~@/assets/images/administrator.png' : '~@/assets/images/inte-admin.png'" alt="" class="icon"/> -->
					</div>	
					<div class="flex flex-column content-box" :class="item.type !== 'admin' ? 'right-box' : 'left-box'">
						<div class="auth-text" :class="item.type !== 'admin' ? 'rightText' : 'leftText'">{{ item.type !== 'admin' ? '自己' : '管理员'}}</div>
						<div v-if="idx === 0" class="ask-box moren-box">
							<div class="moren-text">{{`亲爱的${nameZh}，您是遇到了以下问题吗？点击问题查看答案…`}}</div>
							<div v-for="(issue, index) in chatList[0].hotIssues" :key="index">
								<div class="flex flex-row issue-box items-center" @click="handleIssue(issue)">
									<div class="blue-box"></div>
									<div class="issue-text cursor">{{ issue.questionTitle }}</div>
								</div>
							</div>
						</div>
						<div v-else-if="item.type !== 'admin'" class="ask-box put-ques">
							{{ item.question }}
						</div>
						<!-- <div v-else class="ask-box put-ask" v-for="(content, index) in item.answerContent" :key="index" >
							<div class="ask-text">{{ item.answerContent }}</div>
							<div class="goon-put cursor" @click="handleTw">向管理员继续提问</div>
						</div> -->
						<div v-else class="ask-box moren-box">
							<div v-if="Array.isArray(item.answerContent) && item.answerContent.length > 0">
								<div v-for="(content, index) in item.answerContent" :key="index">
									<div class="flex flex-row issue-box items-center" @click="handleIssue(content)" >
										<div class="blue-box"></div>
										<div class="issue-text cursor">{{ content.questionTitle }}</div>
									</div>
								</div>
							</div>
							<div v-else-if="typeof(item.answerContent) === 'string'">
								<div class="flex flex-row issue-box items-center">
									<div class="blue-box"></div>
									<div class="issue-text">{{ item.answerContent }}</div>
								</div>
							</div>
							<div v-else>
								抱歉，未能找到相关问题，您可以直接向管理员提问
							</div>
							<div class="goon-put cursor" @click="handleTw">向管理员继续提问</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="input-ask">
			<iInput
              v-model="keywords"
              type="textarea"
              resize="none"
              rows="4"
            />
			<div class="flex felx-row mt20 justify-end ">
				<iButton @click="clearDialog">{{ language('退出') }}</iButton>
				<iButton @click.native="sendMessage">{{ language('发送') }}</iButton>
			</div>
		</div>
	</iDialog>
</template>

<script>
import { iDialog, iInput, iButton } from 'rise'
import { getSmartContent } from '@/api/assistant'


export default {
	name:'intelligentDialog',
	components:{ iDialog, iInput, iButton },
	props: {
		intelligentVisible: {
			type: Boolean,
			default: false
		},
		hotQuestionList: {
			type: Array,
			default: () => {
				return []
			}
		},
		fromPage: {
			type: String,
			default: 'manual'
		}
	},
	mounted() {
		this.initChatList()
	},
	computed: {
    nameZh() {
			let permission = this.$store?.state?.permission
			return permission?.userInfo?.nameZh
    }
  },
	data() {
		return {
			intelligentTitle: '智能问答',
			keywords: '',
			chatList: [
				{
					hotIssues: [],
					type: 'admin'
				}
			]
		}
	},
	methods: {
		initChatList() {
			// 初始化智能列表
			this.chatList[0].hotIssues = [...this.hotQuestionList]
		},
		clearDialog() {
			this.$emit('closeDialog', false)
		},
		async sendMessage() {
			this.chatList.push({
				question: this.keywords,
				answerContent: [],
				type: 'user'
			})
			await getSmartContent({question: this.keywords}).then((res) => {
				if (res?.code === '200') {
					this.chatList.push({
						question: '',
						answerContent: res?.data || [],
						type: 'admin'
					})
				}
				this.keywords = ''
			})
		},
		handleIssue(issue) {
			// 点击问题 跳转常见问题详情页面  修改为不跳转 显示该问题答案
			// this.$emit('gotoProblemDeatil', issue, this.fromPage)
			console.log(issue, "issue")
			this.chatList.push({
				question: '',
				answerContent: issue.answerContent.replace(/<[^>]+>/g, '') || '',
				type: 'admin'
			})
		},
		handleTw() {
			this.$emit('putAdminTw')
		}
	}
}
</script>

<style lang="scss" scoped>
	@import "../comon.scss";
	.chat-box {
		padding: 10px 30px 30px 30px;
		background: #F8F9FA;
		height: 640px;
		overflow-y: auto;
	}
	.icon {
		width: 30px;
		height: 30px;
	}
	.item-box {
		padding: 14px;
	}
	.rightContent {
		display: flex;
		flex-direction: row-reverse;
	}
	.leftContent {
		justify-content: flex-start;
		width: 100%;
	}
	.rightText {
		text-align: right;
	}
	.right-box {
		margin-right: 10px;
	}
	.left-box {
		margin-left: 10px;
		display: flex;
		align-items: flex-start
	}
	.auth-text {
		font-size: 16px;
		color: #000000;
	}
	.moren-box {
		// height: 280px;
		background: #FFFFFF;
		opacity: 1;
		border-radius: 4px;
		padding: 20px 14px;
		.moren-text {
			font-size: 16px;
			color: #0D2451;
			opacity: 0.42;
		}
	}
	.content-box {
		// width: 100%;
	}
	.ask-box {
		margin-top: 10px;
	}
	.blue-box {
		width: 8px;
		height: 8px;
		background: #1763F7;
		opacity: 1;
		border-radius: 50%;
	}
	.issue-text {
		color: #2369F1;
		text-decoration: underline;
		font-size: 16px;
		margin-left: 20px;
	}
	.issue-box {
		width: 100%;
		height: 40px;
	}
	.put-ques {
		height: 44px;
		background: #1660F1;
		opacity: 1;
		border-radius: 4px;
		padding-left: 20px;
		padding-right: 20px;
		line-height: 44px;
		text-align: center;
		font-size: 16px;
		color: #FFFFFF;
	}
	.put-ask {
		height: 74px;
		background: #FFFFFF;
		opacity: 1;
		border-radius: 4px;
		padding: 10px;
		// line-height: 74px;
		text-align: center;
		.ask-text {
			color: #0D2451;
			font-size: 16px;
		}
		.goon-put {
			color: #2369F1;
			text-decoration: underline;
			font-size: 14px;
			text-align: left;
			margin-top: 10px;
		}
	}
	.input-ask {
		width: 100%;	
		height: 200px;
		background: #FFFFFF;
		opacity: 1;
		margin-top: 10px;
	}
	.goon-put {
		color: #2369F1;
		text-decoration: underline;
		font-size: 14px;
		text-align: left;
		margin-top: 10px;
	}
</style>