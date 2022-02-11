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
		class="qs-dialog"
		top="30px"
	>
		<div class="content">
			<div v-if="zwFlag">
				<div class="zw-box flex-1">
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
					placeholder="将零件号、RFQ、单据号和操作步骤描述出来，如有截图请上传附件，谢谢!"
				></iInput>
			</div>
			<iEditor 
				v-else 
				ref="iEditor" 
				v-model="askContent"
				:html="askContent"
				id="qs-editor"
			/>
			<div class="attach-box flex">
				<div>附件：</div>
				<iUpload
					ref="attachment"
					v-model="fileList"
				>
					<div class="upload-txt flex" style="align-items: end;">
						<iButton>添加附件</iButton>
						<span class="upload-txt" @click.stop=";">只能上传不超过20MB的文件</span>
					</div>
				</iUpload>
			</div>
		</div>
		<div class="flex flex-row mt20 justify-end items-center btns">
			<iButton @click="clearDialog">{{ language('退出') }}</iButton>
			<iButton @click="sendMessage">{{ language('发送') }}</iButton>
		</div>
	</iDialog>
</template>

<script>
import { iDialog, iButton, iInput } from 'rise'
import iUpload from './iUpload.vue'
import iEditor from './iEditor'
import { submitQuestion, submitAwContent } from "@/api/assistant"
export default {
	name: 'questioningDialog',
	components:{ iDialog, iUpload, iButton, iEditor, iInput },
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
			type: String,
			default: ''
		},
		currQuestionId: {
			type: String,
			default: ''
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
			this.assistantQuestionDTO = {
				attachmentDTOList: [],
				questionLableId: '',
				questionModuleId: '',
				questionTitle: ''
			}
		},
		clearDialog() {
			this.init()
			this.$emit('closeQuesDialog', false, this.currQuestionId)
		},
		sendMessage() {
			if(!this.askContent) return this.$message.warning("请输入内容")
			if (this.zwFlag) {
				// 追问提交问题
				console.log(this.questionAnswerContent, "====")
				let params = {
					replyContent: this.askContent,
					questionId: this.questionAnswerContent.id,
					attachmentList: this.fileList
				}
				submitAwContent(params).then((res) => {
					console.log(res, "111122233")
					if (res?.code === '200') {
						this.$message.success('您的问题已提交,请等待管理员答复！')
						this.clearDialog()
					}
				})
			} else {
				// 提问提交问题
				this.assistantQuestionDTO.questionLableId = this.currLabelId 
				this.assistantQuestionDTO.questionModuleId = this.currentMoudleId
				this.assistantQuestionDTO.questionTitle = this.askContent
				this.assistantQuestionDTO.attachmentDTOList = this.fileList
				submitQuestion(this.assistantQuestionDTO).then((res) => {
					console.log(res, '000000')
					if (res?.code === '200') {
						this.$message.success('您的问题已提交,请等待管理员答复！')
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
		// height: 150px;
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
		// height: 160px;
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
		height: 150px;
		margin-top:16px;
	}
	.btns {
		height: 60px;
	}
</style>