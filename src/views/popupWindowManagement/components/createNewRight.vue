<template>
  <div class="right-content">
      <p class="title">{{language('弹窗图片')}}</p>
      <ImgCutter
        class="avatar-uploader"
        fileType=".jpg, .jpeg, .png"
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
      <p class="right-content-bottom">{{language('建议使用16:9比例图片，不超过10M')}}</p>
  </div>
</template>

<script>
import ImgCutter from 'vue-img-cutter'
import {uploadFileWithNoToken} from '@/api/file/upload';
export default {
  name:'createNewRight',
  components:{ImgCutter},
  data(){
    return{
      imageUrl: '',
      fileList:[]
    }
  },
  methods:{
    handleImageError(){
      console.log(this.imageUrl,'this.linkUrl');
      let img = document.querySelector('avatar')
      img.src = this.linkUrl()
    },
    handleImageLoad(){

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
    reset(){
      this.imageUrl=''
    },
    async upload(content){
      let form = new FormData()
      form.append('file',content.file)
      form.append('applicationName','popupImage')
      // const result = await uploadFileWithNoToken(form)
      uploadFileWithNoToken(form).then((result)=>{
        if(result.code == '200'){
          this.imageUrl = result.data.filePath
        }else{
          this.$message.error(result.desZh)
        }
      })
      
    },
    handelChangePic(file,fileList){
      if(fileList > 0){
        this.fileList = [fileList[fileList.length - 1]]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.right-content{
  border-left: 2px solid #D0D4D9;
  border-radius: 4px;
  height: 300px;
  padding-left: 80px;
  width: 440px;
  .title{
    margin-bottom: 20px;
  }
  .right-content-bottom{
    margin-top: 20px;
    color: #999999;
  }
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
  }
  .avatar {
    width: 360px;
    height: 220px;
    display: block;
  }
</style>