<template>
	<iDialog :title="dialogTitle" style="margin-top:10vh" :visible.sync="show" v-if="show" width="500px" @close='closeDialogBtn' append-to-body class="glossaryForm">
		<el-form v-loading="loading" ref="form" :model="newGlossaryForm" :rules="newGlossaryRules" label-width="100px" class="glossaryForm validate-required-form">
			<iFormItem :label="language('标题')" prop='title'>
				<iInput v-model="newGlossaryForm.title" placeholder="请输入"></iInput>
			</iFormItem>
			<iFormItem :label="language('标题首字母')" prop='firstLetter'>
				<iInput v-model="newGlossaryForm.firstLetter" placeholder="请输入"></iInput>
			</iFormItem>
			<iFormItem :label="language('发布日期')" prop='publishDate'>
				<el-date-picker
					v-model="newGlossaryForm.publishDate"
					type="date"
					style="width:100%;"
					placeholder="选择日期">
				</el-date-picker>
			</iFormItem>
			<iFormItem :label="language('版本号')" prop='version'>
				<iInput v-model="newGlossaryForm.version" placeholder="请输入"></iInput>
			</iFormItem>
			<iFormItem :label="language('词条内容')" prop='termsContent'>
				<iInput resize="none" :rows="3" type="textarea" v-model="newGlossaryForm.termsContent" placeholder="请输入" maxLength=100></iInput>
			</iFormItem>
			<div class="flex flex-row upload-box" v-if="type==='edit'">
				<div class="upload-text">上传图片</div>
				<iUpload 
					v-model="fileList"
					:accept="acceptPicType"
					:maxSize="maxSize"
				>
					<div>
						<iButton>添加图片</iButton>
						<span style="marginLeft:20px" @click.stop=";">可添加多张图片，支持图片格式'jpg'，'png'，'gif'，单张图片不能超过10M</span>
					</div>
				</iUpload>
			</div>
			<div class="flex justify-end btn">
				<iButton @click="close">{{ language('取消') }}</iButton>
				<iButton @click.native="sure">{{ language('确定') }}</iButton>
			</div>
		</el-form>
	</iDialog>
</template>

<script>
import { iDialog, iFormItem, iInput, iButton } from 'rise'
import iUpload from '../components/iUpload.vue'
import { createGlossary } from '@/api/adminProCs'
export default {
	name: 'addGlossary',
	components: {
		iDialog,
		iFormItem,
		iInput,
		iUpload,
		iButton
	},
	props: {
		type: {
			type: String,
			default: 'add'
		},
		show: {
			type: Boolean,
			default: false
		}
	},
	data() {
		let firstLetter_valid = (rule, value, callback) =>{
			if(!value){
				callback(new Error("请输入标题首字母"));
				return;
			}
			if(value.length > 1) return callback(new Error("只能填写一个字母"));
			var reg = /^[A-Z]+$/; //验证规则
			if (reg.test(value)) {
				callback();
				return;
			}else{
				callback(new Error("请输入大写字母"));
			}
		}
		return {
			visible: false,
			newGlossaryForm: {
				title: '',
				firstLetter: '',
				version: '',
				publishDate: '',
				termsContent: ''
			},
			newGlossaryRules: {
				title: { required:true,message:"请输入标题",trigger:'blur' },
				firstLetter: { required:true, validator: firstLetter_valid,trigger:'blur' },
				version: { required:true,message:"请输入版本号",trigger:'blur' },
				publishDate: { required:true,message:"请选择发布时间",trigger:'blur' },
				termsContent: { required:true,message:"请输入词条内容",trigger:'blur' }
			},
			fileList: [],
			acceptPicType: "image/*",
			maxSize: 10,
			loading: false
		}
	},
	methods: {
		closeDialogBtn () {
			this.$emit('update:show', false)
			this.fileList = []
		},
		close () {
			this.clearFormVal()
			this.closeDialogBtn();
		},
		clearFormVal() {
			Object.keys(this.newGlossaryForm).map(key => this.newGlossaryForm[key] = '')
			// this.newGlossaryForm.title = ''
			// this.newGlossaryForm.firstLetter = ''
			// this.newGlossaryForm.version = ''
			// this.newGlossaryForm.publishDate = ''
			// this.newGlossaryForm.termsContent = ''
		},
		sure() {
			this.$refs.form.validate(async v => {
				if(v){
					try {
						this.loading = true
						await createGlossary(this.newGlossaryForm).then((res) => {
							console.log(res, '1222')
						})
						// this.clearFormVal()
						this.closeDialogBtn()
					} finally {
						this.loading = false
					}
				}
			})
		},
		initModifyContent(va) {
			let content = va?.[0]
			// this.newGlossaryForm = content
			Object.assign(this.newGlossaryForm, content)
			// this.newGlossaryForm = JSON.parse(JSON.stringify(content))
		}
	},
	computed: {
		dialogTitle() {
			return this.type === 'add' ? '新增词条' : '修改词条'
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../comon.scss';
	.glossaryForm {
		padding-bottom: 10px;
	}
	.btn {
		padding-bottom: 20px;
	}
	.upload-box {
		width: 100%;
		padding-bottom: 20px;
		.upload-text {
			width: 122px;
		}
		.upload-pic {
			width: 100%;
			border: 1px solid red;
		}
	}
	
</style>