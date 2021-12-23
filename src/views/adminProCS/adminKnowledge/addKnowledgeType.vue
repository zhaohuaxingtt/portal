<template>
	<iDialog
		:title="dialogTitle"
		style="margin-top:10vh"
		:visible.sync="typeShow" 
		v-if="typeShow"
		width="60%" 
		@close='closeDialogBtn' 
		append-to-body
	>
		<el-form 
			label-position="left" 
			:model="newTypeForm" 
			:rules="newTypeRules" 
			label-width="100px" 
			class="typeForm"
		>
			<iFormItem :label="language('知识类型')" prop='name'>
				<iInput v-model="newTypeForm.name" placeholder="请输入类型名称"></iInput>
			</iFormItem>
			<iFormItem :label="language('英文名')" prop='enName'>
				<iInput v-model="newTypeForm.enName" placeholder="请输入知识英文名称"></iInput>
			</iFormItem>
			<iFormItem :label="language('封面图片')" prop='coverPhoto'>
				<div class="photo-content">
					<div class="photo-text">请上传封面图片</div>
					<ImgCutter
						class="avatar-uploader"
						fileType=".jpg, .jpeg, .png"
						:rate = 'imgCutterRate'
						@cutDown='upload'
						:file-list="fileList"
					>
						<div slot="open">
							<img v-if="imageUrl" :src="imageUrl" @error="handleImageError" @load="handleImageLoad" class="avatar" />
							<!-- <img v-else src="../../../assets/images/popupPic.png"   class="avatar"> -->
							<i v-else class="el-icon-circle-plus-outline avatar-uploader-icon">
							</i>
						</div>
					</ImgCutter>
					<div v-if="imageUrl" class="delete-box" @click="deleteImg">{{`移除${imgName}`}}</div>
				</div>
			</iFormItem>
		</el-form>
		<div class="flex justify-end btn">
			<iButton @click="close">{{ language('取消') }}</iButton>
			<iButton @click="sure">{{ language('确定') }}</iButton>
		</div>
	</iDialog>
</template>

<script>
import { iDialog, iFormItem, iInput, iButton } from 'rise'
import ImgCutter from 'vue-img-cutter'
import { uploadFileWithNOTokenTwo } from '@/api/file/upload'
export default {
	name: 'addKnowledgeType',
	components: {
		iDialog,
		iFormItem,
		iInput,
		ImgCutter,
		iButton
	},
	props: {
		operateType: {
			type: String,
      default: 'add'
		},
		typeShow: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			visible: false,
			newTypeForm: {
				name: '',
				enName: '',
				coverPhoto: ''
			},
			newTypeRules: {
				name: { required:'true',message:"请输入类型名称",trigger:'blur' },
				enName: { required:'true',message:"请输入知识英文名称",trigger:'blur' },
				coverPhoto: { required:'true',message:"请上传封面图片",trigger:'blur' }
			},
			imgCutterRate: '16 : 9',
			fileList: [],
			imageUrl: ''
		}
	},
	methods: {
		closeDialogBtn () {
      this.$emit('update:typeShow', false)
    },
		close () {
      this.closeDialogBtn();
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
		sure() {
			console.log(this.newTypeForm, "98989")
		},
		initModify(currVa) {
			this.newTypeForm = currVa
		}
	},
	computed: {
		dialogTitle() {
			return this.operateType === 'add' ? '新增知识类型' : '修改知识类型'
		}
	}
}
</script>

<style lang="scss" scoped>
@import '../comon.scss';
.typeForm {
	padding-bottom: 20px;
}
.photo-content {
	.photo-text {
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border: 1px solid #D0D4D9;
		cursor: pointer;
	}
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