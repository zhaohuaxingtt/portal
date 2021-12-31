<template>
	<iDialog
		:title="dialogTitle"
		:visible.sync="contentShow" 
		v-if="contentShow"
		width="60%" 
		@close='closeDialogBtn' 
		append-to-body
	>
		<el-form
			label-position="left"
			:model="newContentForm" 
			:rules="newContentRules" 
			label-width="100px" 
			class="contentForm validate-required-form"
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
        >
          <el-option
            v-for="item in knowledgeCategoryList"
            :key="item.id"
            :label="item.label"
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
        >
          <el-option
            v-for="item in organizationsList"
            :key="item.id"
            :label="item.label"
            :value="item.id"
          ></el-option>
        </iSelect>
			</iFormItem>
			<iFormItem :label="language('上传附件')">
				<iUpload 
					v-model="newContentForm.fileList"
					:accept="acceptPicType"
					maxSize= 10
					:limit="1"
				>
					<div>
						<iButton>添加图片</iButton>
						<span style="marginLeft:20px" @click.stop=";">支持图片格式'jpg'，'png'，'gif'，图片不能超过10M</span>
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
						<img v-if="imageUrl" :src="imageUrl" @error="handleImageError" @load="handleImageLoad" class="avatar" />
						<!-- <img v-else src="../../../assets/images/popupPic.png"   class="avatar"> -->
						<i v-else class="el-icon-circle-plus-outline avatar-uploader-icon">
						</i>
					</div>
				</ImgCutter>
				<div v-if="imageUrl" class="delete-box" @click="deleteImg">{{`移除${imgName}`}}</div>
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
				knowledgeCategory: '',
				organizations: ''
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
			knowledgeSectionList: [
				{ id: '0', label: '月报' }, 
				{ id: '1', label: '测试知识型类型' }
			],
			// 选择知识类型时 获取知识分类
			knowledgeCategoryList: [
				{ id: '0', label: '一' }, 
				{ id: '1', label: '二' }
			],
			// 调取接口获取科室数据
			organizationsList: [
				{ id: '0', label: '科室一' }, 
				{ id: '1', label: '科室二' }
			],
			imgCutterRate: '16 : 9',
			imageUrl: ''
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
		}
	},
	computed: {
		dialogTitle() {
			return this.operateType === 'add' ? '新增知识类型' : '修改知识类型'
		}
	},
	methods: {
		closeDialogBtn () {
			Object.keys(this.newContentForm).map(key => this.newContentForm[key] = '')
      this.$emit('update:contentShow', false)
    },
		close () {
      this.closeDialogBtn();
			Object.keys(this.newContentForm).map(key => this.newContentForm[key] = '')
			this.imageUrl = ''
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
			console.log(va, '获取知识类型')
		},
		sure() {
			console.log(this.newContentForm, "233456")
		},
		initModify(currVa) {
			// console.log(currVa, "2355")
			// this.newContentForm = currVa
			Object.assign(this.newContentForm, currVa)
			this.newContentForm.beginDate = currVa.openingDate
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