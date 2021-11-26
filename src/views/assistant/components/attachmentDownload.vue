<template>
  <div class="attch-box flex felx-row items-center">
		<div class="attach-text">附件:</div>
		<img v-if="load==='down'" src="@/assets/images/fujian.png" alt="" class="fujian-png">
		<div v-if="load==='down'" class="load-text cursor" @click="handleLoad">{{ language('下载') }}</div>
		<el-upload
			:before-upload="beforeAttachUpload"
            :show-file-list="false"
            accept="image/png,image/jpeg,image/gif,image/jpg"
            :http-request="httpUpload"
		>
			<iButton class="ml20" v-if="load==='up'">{{ language('上传') }}</iButton>
		</el-upload>
		
	</div>
</template>

<script>
import { iButton } from 'rise'
import { uploadFile } from "@/api/assistant/uploadFile.js"
export default {
	name: 'attachment-doenload',
	components: { iButton },
	props: {
		load: {
			type: String,
			default: 'down'
		}
	},
	data() {
		return {
			copyFile: '',
			fileList: []
		}
	},
	methods: {
		handleLoad() {
			console.log('load')
		},
		beforeAttachUpload(file) {
			console.log(file, "file")
			const fileName = file.name
			this.copyFile = new File([file], fileName);
			const isLt20M = file.size / 1024 / 1024 < 20
			if (!isLt20M) return this.$$message.error("上传文件大小不能超过 20MB!")
		},
		async httpUpload() {
			let formData = new FormData()
			formData.append("file", this.copyFile);
			await uploadFile(formData).then((res) => {
				console.log(res, '111111111112222')
				this.fileList.push({
					name: res.name,
					id: res.id,
					path: res.path
				})
				this.$emit("getFilesList", this.fileList || [])
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import "../comon.scss";
	.attch-box {
		height: 40px;
		.attach-text {
			color: #4B4B4C;
			font-size: 16px;
		}
		.fujian-png {
			width: 22px;
			height: 22px;
			margin-left: 20px;
		}
		.load-text {
			color: #2369F1;
			text-decoration: underline;
			font-size: 16px;
			margin-left: 10px;
		}
	}
</style>