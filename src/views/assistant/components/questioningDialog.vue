<!-- 
    追问dialog
		zwFlag true 为追问 false 为提问
-->
<template>
  <iDialog
		:visible.sync="questioningVisible"
		:title="questioningTitle"
		@close="clearDialog"
		width="60%"
	>
		<div v-if="zwFlag">
			<div class="zw-box">
				<!-- <div class="ques">
					{{ questioningTitle }}
				</div> -->
				<div class="ask" v-for="(item) in questionAnswerContent.replyQuestionList" :key="item.id">
					<div v-html="item.content"></div>
				</div>
			</div>
			<div class="te-text">{{ language('提问') }}</div>
		</div>
		<div class="editor-box" v-if="!zwFlag">
			<iInput
        type="textarea"
        :rows="6"
        v-model="askContent"
				resize="none"
      ></iInput>
		</div>
		<iEditor v-else ref="iEditor" v-model="askContent" />
		<div class="attach-box flex flex-column">
			<AttachmentDownload
				load="up"
				@getFilesList="getFilesList"
			/>
		</div>
		<div class="flex flex-row mt20 justify-end items-center btns">
			<iButton @click="clearDialog">{{ language('退出') }}</iButton>
			<iButton @click="sendMessage">{{ language('发送') }}</iButton>
		</div>
	</iDialog>
</template>

<script>
import { iDialog, iButton, iInput } from 'rise'
import AttachmentDownload from './attachmentDownload'
import iEditor from '@/components/iEditor'
import { submitQuestion, submitAwContent } from "@/api/assistant"
export default {
	name: 'questioningDialog',
	components:{ iDialog, AttachmentDownload, iButton, iEditor, iInput },
	props: {
		questioningVisible: {
			type: Boolean,
			default: false
		},
		questioningTitle: {
			type: String,
			default: ''
		},
		zwFlag: {
			type: Boolean,
			default: false
		},
		questionAnswerContent: {
			type: String,
			default: () => {}
		},
		currentMoudleId: {
			type: Number,
			default: 0
		},
		currLabelId: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			fileList: [],
			askContent: '',
			assistantQuestionDTO: {
				attachmentDTOList: [],
				questionLableId: '',
				questionModuleId: '',
				questionTitle: ''
			}
		}
	},
	methods: {
		init() {
			this.fileList = []
			this.askContent = ''
		},
		clearDialog() {
			this.init()
			this.$emit('closeQuesDialog', false)
		},
		getFilesList(fileList) {
			console.log(fileList, "11111")
			this.fileList = fileList
		},
		sendMessage() {
			if (this.zwFlag) {
				// 追问提交问题
				console.log(this.questionAnswerContent, "====")
				let list = []
				if (this.fileList.length > 0) {
					this.fileList.map(item => {
						list.push({
							fileName: item.name,
							fileUrl: item.path,
							bizType: '',
							bizId: 0
						})
					})
				}
				let params = {
					replyContent: this.askContent,
					questionId: this.questionAnswerContent.id,
					list
				}
				submitAwContent(params).then((res) => {
					console.log(res, "111122233")
				})
			} else {
				// 提问提交问题
				this.assistantQuestionDTO.questionLableId = this.currLabelId 
				this.assistantQuestionDTO.questionModuleId = this.currentMoudleId
				this.assistantQuestionDTO.questionTitle = this.askContent
				this.fileList.map(item => {
					this.assistantQuestionDTO.attachmentDTOList.push({
						fileName: item.name,
						fileUrl: item.path,
						bizType: '',
						bizId: 0
					})
				})
				submitQuestion(this.assistantQuestionDTO).then((res) => {
					console.log(res, '000000')
					if (res?.code === '200') {
						this.$message.success('您的问题已提交,请等待管理远答复！')
						this.clearDialog()
					}
				})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../comon.scss";
	.zw-box {
		width: 100%;
		height: 150px;
		border: 1px solid #F2F2F2;
		opacity: 1;
		border-radius: 2px;
		color: #666666;
		font-size: 16px;
		.ques {
			padding: 20px;
		}
		.ask {
			padding: 20px;
		}
	}
	.te-text {
		margin-top: 70px;
		margin-bottom: 40px;
		color: #131523;
		font-size: 20px;
	}
	.editor-box {
		margin-top: 30px;
		width: 100%;
		height: 160px;
		// border: 1px solid #D0D4D9;
		// opacity: 1;
		// border-radius: 2px;
		color: #000000;
		font-size: 18px;
	}
	.editor {
		margin-top: 30px;
		width: 100%;
		height: 260px;
	}
	.attach-box {
		height: 100px;
		margin-top:16px
	}
	.btns {
		height: 60px;
	}
</style>