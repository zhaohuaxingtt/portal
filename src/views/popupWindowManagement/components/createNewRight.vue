<template>
  <div class="right-content">
      <p class="title">{{language('弹窗图片')}}</p>
      <el-upload
        class="avatar-uploader"

      >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <p class="right-content-bottom">{{language('建议使用16:9比例图片，不超过10M')}}</p>
  </div>
</template>

<script>
import {} from 'rise'
export default {
  name:'createNewRight',
  components:{}
}
</script>

<style lang="scss" scoped>
.right-content{
  border-left: 4px solid #D0D4D9;
  border-radius: 4px;
  height: 300px;
  padding-left: 200px;
  width: 600px;
  .title{
    margin-bottom: 20px;
  }
  .right-content-bottom{
    margin-top: 20px;
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
    width: 340px;
    height: 200px;
    line-height: 200px;
    text-align: center;
    background-color: #F8F8FA;
    border: 1px dashed #D0D4D9;
    border-radius: 2px;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>