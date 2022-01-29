<template>
	<iDialog
		:title="dialogTitle"
		:visible.sync="contentShow" 
		v-if="contentShow"
		width="60%" 
		@close='close' 
		append-to-body
	>
		<el-form
			label-position="left"
			:model="newContentForm" 
			:rules="newContentRules" 
			label-width="100px" 
			class="contentForm validate-required-form"
			v-loading="loading"
			ref="knowledgeContentForm"
		>
			<iFormItem :label="language('知识分享类型')" prop='knowledgeSection'>
				<iSelect
          v-model="newContentForm.knowledgeSection"
          filterable
          placeholder="请选择knowledge类型"
					clearable
					@change="handleSection"
        >
          <el-option
            v-for="item in knowledgeSectionList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </iSelect>
			</iFormItem>
			<iFormItem :label="language('知识标题')" prop='title'>
				<iInput v-model="newContentForm.title" placeholder="请输入知识标题" maxLength=50></iInput>
			</iFormItem>
			<iFormItem :label="language('知识概要')" prop='summary'>
				<iInput resize="none" :rows="2" type="textarea" v-model="newContentForm.summary" placeholder="" maxLength=100></iInput>
			</iFormItem>
			<iFormItem :label="language('主讲人')" prop='speaker'>
				<iInput v-model="newContentForm.speaker" placeholder="请输入主讲人"></iInput>
			</iFormItem>
			<iFormItem :label="language('开课日期')" prop='beginDate'>
				<el-date-picker
					v-model="newContentForm.beginDate"
					type="date"
					placeholder="请选择开课日期">
				</el-date-picker>
			</iFormItem>
			<iFormItem :label="language('知识分类')" prop='knowledgeCategory'>
				<iSelect
          v-model="newContentForm.knowledgeCategory"
          filterable
          placeholder="请选择知识分类"
					clearable
					multiple
        >
          <el-option
            v-for="item in knowledgeCategoryList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </iSelect>
			</iFormItem>
			<iFormItem :label="language('所属科室')" prop='organizations'>
				<iSelect
					v-model="newContentForm.organizations"
					filterable
					placeholder="请选择所属科室"
					clearable
					multiple
				>
					<el-option
						v-for="item in organizationsList"
						:key="item.id"
						:label="item.nameZh"
						:value="item.id"
					>
					</el-option>
				</iSelect>
			</iFormItem>
			<iFormItem :label="language('上传附件')">
				<iUpload 
					v-model="fileList"
					maxSize= 10
					:limit="1"
					:uploadHandle="uploadHandle"
					:removeHandle="removeHandle"
					:isCustHttp="true"
				>
					<div>
						<iButton>添加附件</iButton>
						<!-- <span style="marginLeft:20px" @click.stop=";">支持图片格式'jpg'，'png'，'gif'，图片不能超过10M</span> -->
					</div>
				</iUpload>
			</iFormItem>
			<iFormItem :label="language('上传知识封面')">
				<ImgCutter
					class="avatar-uploader"
					fileType=".jpg, .jpeg, .png"
					:rate = 'imgCutterRate'
					@cutDown='upload'
				>
					<div slot="open">
						<img v-if="imageUrl" :src="imageUrl" @error="handleImageError" class="avatar" />
						<!-- <img v-else src="../../../assets/images/popupPic.png"   class="avatar"> -->
						<i v-else class="el-icon-circle-plus-outline avatar-uploader-icon">
						</i>
					</div>
				</ImgCutter>
				<div v-if="imgName" class="delete-box" @click="deleteImg">{{`移除${imgName}`}}</div>
			</iFormItem>
		</el-form>
		<div class="flex justify-end btn">
			<iButton @click="close">{{ language('取消') }}</iButton>
			<iButton @click="sure">{{ language('确定') }}</iButton>
		</div>
	</iDialog>
</template>

<script>
import { iDialog, iFormItem, iInput, iSelect, iButton } from 'rise'
import iUpload from '../components/iUpload.vue'
import ImgCutter from 'vue-img-cutter'
import { uploadFileWithNOTokenTwo } from '@/api/file/upload'
import { queryCurrType, getCurrCategory, createKnowledgeContent, modifyKnowledgeContent } from '@/api/adminProCS';
import { getDeptDropDownList } from '@/api/authorityMgmt'
export default {
	name: 'addKnowledgeContent',
	components: {
		iDialog,
		iFormItem,
		iInput,
		iSelect,
		iUpload,
		iButton,
		ImgCutter
	},
	data() {
		return {
			newContentForm: {
				knowledgeSection: '',
				title: '',
				summary: '',
				speaker: '',
				beginDate: '',
				knowledgeCategory: [],
				organizations: []
			},
			newContentRules: {
				knowledgeSection: { required:'true',message:"请选择知识分享类型",trigger:'select' },
				title: { required:'true',message:"请输入知识标题",trigger:'blur' },
				summary: { required:'true',message:"请输入知识概要",trigger:'blur' },
				speaker: { required:'true',message:"请输入主讲人",trigger:'blur' },
				beginDate: { required:'true',message:"请选择开课日期",trigger:'blur' },
				knowledgeCategory: { required:'true',message:"请选择知识分类",trigger:'select' },
				organizations: { required:'true',message:"请选择所属科室",trigger:'select' }
			},
			acceptPicType: "image/*",
			// 调取接口
			knowledgeSectionList: [],
			// 选择知识类型时 获取知识分类
			knowledgeCategoryList: [],
			// 调取接口获取科室数据
			organizationsList: [],
			imgCutterRate: '16 : 9',
			imageUrl: '',
			uploadFileStream: null,
			coverFile: null,
			fileList: [],
			loading: false,
			modifyContentId: null
		}
	},
	props: {
		operateType: {
			type: String,
      default: 'add'
		},
		contentShow: {
			type: Boolean,
			default: false
		},
		manageType: {
			type: String,
      default: 'content'
		}
	},
	computed: {
		dialogTitle() {
			return this.operateType === 'add' ? '新增知识类型' : '修改知识类型'
		}
	},
	created() {
		if (this.manageType === 'content') {
			this.getCurrTypeList()
			this.organizationsInfo()
		}
	},
	methods: {
		async getCurrTypeList() {
			this.knowledgeSectionList = []
			await queryCurrType().then(res => {
				if (res) {
					res.map(item => {
						this.knowledgeSectionList.push({
							label: item.name,
							id: item.id
						})
					})
				}
			})
		},
		closeDialogBtn () {
			Object.keys(this.newContentForm).map(key => this.newContentForm[key] = '')
      this.$emit('update:contentShow', false)
    },
		close () {
      this.closeDialogBtn();
			Object.keys(this.newContentForm).map(key => this.newContentForm[key] = '')
			this.imageUrl = ''
			this.coverFile = null
			this.uploadFileStream = null
			this.imgName = ''
			this.fileList = []
			this.$emit('refresh')
    },
		handleImageError(){
      let img = document.querySelector('avatar')
      img.src = this.linkUrl()
    },
		linkUrl(){
      return this.imageUrl
    },
		beforeAvatarUpload(file){
      const isLt10M = file.size / 10240 / 10240 < 10;
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过 10MB!');
      }
      return  isLt10M;
    },
		async upload(content){
      let form = new FormData()
      form.append('file',content.file)
      form.append('applicationName','popupImage')
			console.log(content, "12345")
			this.coverFile = content.dataURL
      uploadFileWithNOTokenTwo(form).then((result)=>{
        if(result.code == '200'){
					console.log(result, "12222")
					let data = result.data
          this.imageUrl = data.path
					this.imgName = `${data?.name.split('.')[0]}.${data?.extensionName}`
          this.$emit('imgUrl',this.imageUrl)
        }else{
          this.$message.error(result.desZh)
        }
      })
    },
		deleteImg() {
			this.imageUrl = ''
		},
		handleSection(va) {
			this.getCurrCategoryData(va)
		},
		async getCurrCategoryData(va) {
			await getCurrCategory(va).then(res => {
				if (res) {
					this.knowledgeCategoryList = res
				}
			})
		},
		sure() {
			this.$refs.knowledgeContentForm.validate(async v => {
				if (v) {
					try {
						this.newContentForm.openingDate = moment(this.newContentForm.beginDate).format('YYYY-MM-DD HH:mm:ss')
						this.newContentForm.file = this.uploadFileStream  // 老系统修改的时候没有传值
						this.newContentForm.coverFileName = this.imgName || `${this.newContentForm.title}.png`
						this.newContentForm.coverFile = this.coverFileName
						let formData = new FormData()
						Object.keys(this.newContentForm).forEach(key => {
							formData.append(key,this.newContentForm[key])
						})
						this.loading = true
						if (this.operateType === 'add') {
							await createKnowledgeContent(formData).then((res) => {
								if (res) {
									this.$message({type: 'success', message: '新增知识内容成功.'})
									this.loading = false
								}
							})
						} else {
							await modifyKnowledgeContent(this.modifyContentId, formData).then(res => {
								if (res) {
									this.$message({type: 'success', message: '修改知识内容成功.'})
									this.loading = false
								}
							})
						}
						this.close()
					} finally {
						this.loading = false
					}
				}
			})
		},
		async initModify(currVa) {
			this.loading = true
			await this.getCurrTypeList()
			await this.organizationsInfo()
			this.modifyContentId = currVa.id
			let obj = {
				speaker: currVa.speaker,
				summary: currVa.summary,
				title: currVa.title,
			}
			Object.assign(this.newContentForm, obj)
			await this.getCurrCategoryData(currVa.section?.id)
			this.loading = false
			this.newContentForm.knowledgeSection = currVa.section?.id
			this.newContentForm.beginDate = currVa.openingDate
			currVa.category.map(item => {
				this.newContentForm.knowledgeCategory.push(item.id)
			})
			this.fileList.push({
				fileName: currVa.attachMents[0].originalFileName,
				fileUrl: currVa.attachMents[0].url.split('uploader/')[1]
			})
			this.imageUrl = currVa?.cover.split('uploader/')[1]
			this.coverFile = this.imageUrl
			// this.imgName = `${currVa.title}.png`
		},
		uploadHandle(file){
			console.log(file, '2222')
			this.uploadFileStream = file
			return new Promise((resolve) => {
				resolve({
					name: file.name
				})
			})
		},
		removeHandle(file, idx) {
			this.fileList.splice(idx, 1)
		},
		async organizationsInfo() {
			await getDeptDropDownList({}).then((res) => {
			this.organizationMenu = res.data || []
			this.organizationsList = this.organizationMenu.slice(0, 200)
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../comon.scss';
	.contentForm {
		padding-bottom: 20px;
	}
	.delete-box {
	width: 100%;
	height: 40px;
	line-height: 40px;
	text-align: center;
	border: 1px solid #D0D4D9;
	cursor: pointer;
	color: #F8F8FA;
	background-color: red;
}
.avatar-uploader{
  z-index: 9999;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 360px;
    height: 220px;
    line-height: 220px;
    text-align: center;
    background-color: #F8F8FA;
    border: 1px dashed #D0D4D9;
    border-radius: 2px;
		width: 100%;
		margin-top: 20px;
  }
  .avatar {
    width: 100%;
		margin-top: 20px;
  }
	.btn {
		padding-bottom: 20px;
	}
</style>