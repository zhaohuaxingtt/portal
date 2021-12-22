<template>
  <!--转派-->
  <iDialog
    :title="$t('MT_DAORUYITI')"
    :visible.sync="dialogStatusManageObj.openImportTopicDialog"
    width="39rem"
    :close-on-click-modal="false"
    @close="close"
  >
    <iEditForm>
      <el-form :model="ruleForm" ref="ruleForm" class="form">
        <iFormItem prop="coverImage" class="upload">
          <el-upload
            action="1"
            :before-upload="beforeAvatarUpload"
            :show-file-list="true"
            :http-request="httpUpload"
            :on-remove="handleRemove"
            :accept="accept"
          >
            <iButton type="button" class="upload-button">
              {{$t('MT_QINGXUANZEWENJIAN')}}<span class="upload-text"
                ><img :src="uploadIcon"
              /></span>
            </iButton>
            <div slot="tip" class="el-upload__tip">{{$t('MT_WENJIANDAXIAOZUIDAXIANZHI')}}10M</div>
          </el-upload>
        </iFormItem>
        <div class="button-list">
          <iButton @click="clearDiolog" class="cancel">{{
            $t('LK_QUXIAO')
          }}</iButton>
          <iButton @click="handleSubmit" class="save" :loading="loading">{{
            $t('LK_BAOCUN')
          }}</iButton>
        </div>
      </el-form>
    </iEditForm>
  </iDialog>
</template>

<script>
import { iDialog, iFormItem, iButton, iMessage } from 'rise'
import iEditForm from '@/components/iEditForm'
import uploadIcon from '@/assets/images/upload-icon.svg'
import { importThemen } from '@/api/meeting/details'
export default {
  components: {
    iDialog,
    iFormItem,
    iEditForm,
    iButton
  },
  props: {
    dialogStatusManageObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    meetingInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
      uploadIcon,
      importFiles: [],
      ruleForm: {},
      accept: '.xlsx'
    }
  },
  methods: {
    handleRemove(file) {
      this.importFiles = this.importFiles.filter((item) => {
        return item.file.get('file').uid === file.uid
      })
    },
    beforeAvatarUpload(file) {
      if (file.type !== this.accept) {
        this.$message.error(this.$t(`上传文件类型错误`))
        return false
      }
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error(this.$t('文件大小最大限制10M!'))
      }
      return isLt10M
    },
    // 上传过程
    async httpUpload(content) {
      this.uploadLoading = true
      let formData = new FormData()
      formData.append('file', content.file)
      this.importFiles.push({
        meetingId: this.meetingInfo.id,
        file: formData
      })
      this.uploadLoading = false
    },
    handlePreview(file) {
      console.log(file)
    },
    close() {
      this.$emit('input', false)
      this.$emit('closeDialog', false)
    },
    clearDiolog(sub) {
      if (sub === 'submit') {
        this.close()
      } else {
        // this.$confirm("是否取消编辑?", "提示", {
        //   confirmButtonText: "是",
        //   cancelButtonText: "否",
        //   type: "warning",
        // }).then(() => {
        this.close()
        // });
      }
    },
    handleSubmit() {
      // this.$confirm("是否导入议题？", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // }).then(() => {
      this.submitForm('ruleForm')
      // });
    },
    handleSaveAllFiles() {
      let promiseArr = []
      this.importFiles.forEach((data) => {
        let p = new Promise((resolve, reject) => {
          //开始保存
          importThemen(data)
            .then((data) => {
              resolve(data)
            })
            .catch((err) => {
              reject(err)
            })
          promiseArr.push(p)
        })
      })
      Promise.all(promiseArr)
        .then(() => {
          this.loading = false
          this.clearDiolog('submit')
          iMessage.success(this.$t('导入成功'))
          this.$emit('flushTable')
        })
        .catch(() => {
          this.loading = false
          this.clearDiolog('submit')
          iMessage.error(this.$t('导入失败'))
          this.$emit('flushTable')
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.handleSaveAllFiles()
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .form {
  background-image: url('../../../../assets/images/upload-bg.png');
  background-repeat: no-repeat;
  background-size: 80px 67.32px;
  background-position: 0 0;
  .el-upload__tip {
    text-align: center;
  }
  .el-icon-upload-success {
    display: none;
  }
  .button-list {
    padding: 0 15px;
    width: 100%;
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    margin-top: 30px;
    /* padding-left: 780px; */
    padding: 0 165px 0 159px;
    .cancel,
    .save {
      width: 100px;
      height: 35px;
      flex-grow: 1;
      flex-shrink: 0;
      line-height: 35px;
      padding: 0;
    }
    .save {
      margin-left: 20px;
      padding: 0;
      line-height: 35px;
    }
  }
  .upload {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
    .upload-button {
      position: relative;
      /* border: 1px solid #d8dce6; */
      width: 300px;
      height: 35px;
      line-height: 35px;
      padding: 0;
      color: #fff;
      background-color: #1660f1;
      .upload-text {
        position: absolute;
        right: 15px;
        top: 3px;
        img {
          width: 23.85px;
          height: 17.69px;
        }
      }
    }
    .el-upload-list__item {
      .el-upload-list__item-name {
        width: 300px;
        height: 32px;
        border-radius: 16px;
        background: #f7f7f7;
        line-height: 32px;
        overflow: hidden;
        margin-right: 0;
        color: #909399;
        text-indent: 12px;
        font-size: 14px;
      }
      .el-icon-close {
        display: block;
        margin-top: 5px;
        transform: translateX(-5px) scale(1.3);
        color: #909399;
      }
      .el-icon-document {
        display: none;
      }
      &:hover {
        width: 300px;
        height: 32px;
        border-radius: 16px;
        background: #f7f7f7;
        line-height: 32px;
        overflow: hidden;
        margin-right: 0;
      }
    }

    .el-upload-list__item-name + .el-upload-list__item-name {
      margin-top: 5px;
    }
  }
}
</style>
