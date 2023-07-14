<template>
	<div>
		<div class="attch-box flex flex-row items-center">
			<div class="attach-text">附件：</div>
			<!-- <img v-if="load==='down'" src="@/assets/images/fujian.png" alt="" class="fujian-png">
			<div v-if="load==='down'" class="load-text cursor">{{ language('下载') }}</div> -->
			<el-upload
				v-if="load==='up'"
				:before-upload="beforeAttachUpload"
				:limit="5"
				multiple
				:show-file-list="false"
				:accept="
					fileTypes
					.map(type => {
						return `.${type}`
					})
					.join(',')
				"
				:http-request="httpUpload"
				:disabled="loading"
			>
				<iButton class="ml20" :loading="loading">{{ language('添加附件') }}</iButton>
			</el-upload>
			<div v-if="load==='up'" class="text-tip ml20">{{ attachText }}</div>
		</div>
		<div v-show="fileList.length > 0" class="file-list">
			<div v-for="(file, idx) in fileList" :key="idx" class="flex cursor item-file" @click="handleLoad(file)">
				<div>{{ load === 'down' ? file.fileName : file.name }}</div>
				<i :class="load==='down' ? '' : 'el-icon-close close' " @click.stop="deleteFile(file)"></i>
			</div>
		</div>
		<el-dialog
			:visible="dialogVisible"
			@close="closeDialog"
			width="60%"
			class="file-dialog"
		>
			<div class="flex items-center justify-center ">
				<img :src="fileUrl" alt="" class="img-style">
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { iButton } from 'rise'
import { uploadFile, getFileId } from "@/api/assistant/uploadFile.js"
export default {
	name: 'attachment-doenload',
	components: { iButton },
	props: {
		//  up 上传  down 下载
		load: {
			type: String,
			default: 'down'
		},
		text: {
			type: String,
			default: '附件'
		},
		fileTypes: {
			type: Array,
			default: function() {
				return [
				'jpg',
				'jpeg',
				'gif',
				'png',
				'txt',
				'doc',
				'docx',
				'xls',
				'xlsx',
				'ppt',
				'pptx',
				'pdf'
				]
			}
		}
	},
	data() {
		return {
			loading:false,
			dialogVisible: false,
			copyFile: [],
			fileList: [],
			fileUrl: '',
			attachText: '只能上传不超过20MB的文件'
		}
	},
	methods: {
		handleLoad(file) {
			if (this.load === 'up') return
			let fileTypeArr = ['jpg',
				'jpeg',
				'gif',
				'png']
			const fileExtension = file.fileName.substring(file.fileName.lastIndexOf('.') + 1);
			if (fileTypeArr.includes(fileExtension)) {
				console.log("=====")
				this.dialogVisible = true
				this.fileUrl = file.fileUrl
			} else {
				getFileId(file?.bizId).then((res) => {
					console.log(res, '1111111111')
				})
			}
		},
		beforeAttachUpload(file) {
			if (this.fileList.length > 5) return this.$message.error("上传文件不能超过5个")
			if (file) {
				const fileName = file.name
				this.copyFile = new File([file], fileName);
				const isLt20M = file.size / 1024 / 1024 < 20
				if (!isLt20M) return this.$message.error("上传文件大小不能超过 20MB!")
			}
		},
		async httpUpload() {
			if (this.copyFile) {
				this.loading = true
				let formData = new FormData()
				formData.append("file", this.copyFile);
				await uploadFile(formData).then((res) => {
					this.fileList.push({
						name: res.name,
						id: res.id,
						path: res.path
					})
					this.$emit("getFilesList", this.fileList || [])
				})
				this.loading = false
			}
		},
		deleteFile(file) {
			if (this.load === 'down') return
			this.fileList.map((item, index) => {
				if (item.id === file.id) {
					this.fileList.splice(index, 1)
				}
			})
		},
		setFileList(l){
			this.fileList = l
		},
		closeDialog() {
			this.dialogVisible = false
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
		.text-tip {
			font-size: 14px;
			color: #000000;
			opacity: 0.31;
		}
	}
	.file-list{
		min-width: 100px;
    transition: all .3s ease;
    border-radius: 4px;
    color: #444;
		height: 150px;
		overflow: auto;
		padding-bottom: 50px;
		.item-file {
			padding: 5px 8px;
			margin: 6px 0;
			&:hover{
        background-color: #f5f7fa;
        color: #2369f1;
  }
		}
	}
	.close{
    padding: 4px;
    margin-left: 30px;
    cursor: pointer;
    border-radius: 50%;
    background-color: #ccc;
    opacity: .5;

    &:hover{
        opacity: .9;
    }
	}
	.file-dialog{
		::v-deep .el-dialog{
			min-height: 120px;
		}
	}
	.img-style {
		width: 100%;
    	padding: 10px;
	}
</style>