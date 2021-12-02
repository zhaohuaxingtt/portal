<template>
	<div>
		<div class="attch-box flex flex-row items-center">
			<div class="attach-text">附件：</div>
			<img v-if="load==='down'" src="@/assets/images/fujian.png" alt="" class="fujian-png">
			<div v-if="load==='down'" class="load-text cursor" @click="handleLoad">{{ language('下载') }}</div>
			<el-upload
				v-if="load==='up'"
				:before-upload="beforeAttachUpload"
							:show-file-list="false"
							accept="image/png,image/jpeg,image/gif,image/jpg"
							:http-request="httpUpload"
			>
				<iButton class="ml20">{{ language('添加附件') }}</iButton>
			</el-upload>
			<div v-if="load==='up'" class="text-tip ml20">{{ attachText }}</div>
		</div>
		<div v-if="fileList.length > 0 || load === 'show' " class="file-list">
			<div v-for="(file, idx) in fileList" :key="idx" class="flex">
				<div>{{ file.name }}</div>
				<i class="close el-icon-close" @click="deleteFile(file)"></i>
			</div>
		</div>
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
		},
		text: {
			type: String,
			default: '附件'
		}
	},
	data() {
		return {
			copyFile: '',
			fileList: [],
			attachText: '只能上传不超过20MB的文件'
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
		},
		deleteFile(file) {
			// this.fileList.filter(item => { item.id === file.id })
			this.fileList.map((item, index) => {
				if (item.id === file.id) {
					this.fileList.splice(index, 1)
				}
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
		.text-tip {
			font-size: 14px;
			color: #000000;
			opacity: 0.31;
		}
	}
	.file-list{
    padding: 10px 8px;
    display: flex;
		flex-direction: row;
    // align-items: flex-end;
		min-width: 100px;
    margin: 10px 0;
    justify-content: space-between;
    transition: all .3s ease;
    border-radius: 4px;
    color: #444;
    &:hover{
        background-color: #f5f7fa;
        color: #2369f1;
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
</style>