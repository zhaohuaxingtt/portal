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
				<div class="ques">
					{{ questioningTitle }}
				</div>
				<div class="ask">
					该问题的第一次回答
				</div>
			</div>
			<div class="te-text">{{ language('提问') }}</div>
		</div>
		<div class="editor">
			（1）供应商在首页点击注册，打开供应商账号申请界面；
		</div>
		<div class="attach-box">
			<AttachmentDownload
				load="up"
			/>
		</div>
		<div class="flex felx-row mt20 justify-end items-center btns">
			<iButton @click="clearDialog">{{ language('退出') }}</iButton>
			<iButton @click="sendMessage">{{ language('发送') }}</iButton>
		</div>
	</iDialog>
</template>

<script>
import { iDialog, iButton } from 'rise'
import AttachmentDownload from './attachmentDownload'
export default {
	name: 'questioningDialog',
	components:{ iDialog, AttachmentDownload, iButton },
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
		}
	},
	methods: {
		clearDialog() {
			this.$emit('closeQuesDialog', false)
		},
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
		color: #131523;
		font-size: 16px;
	}
	.editor {
		margin-top: 30px;
		width: 100%;
		height: 260px;
		border: 1px solid #D0D4D9;
		opacity: 1;
		border-radius: 2px;
		color: #000000;
		font-size: 18px;
	}
	.attach-box {
		height: 100px;
		margin-top:16px
	}
	.btns {
		height: 60px;
	}
</style>