<template>
  <!--转派-->
  <iDialog
    title="关闭会议"
    :visible.sync="openCloseMeeting"
    width="23.75rem"
    :close-on-click-modal="false"
    destroy-on-close
    @close="handleClose"
  >
    <iEditForm>
      <el-form
        :model="rowState"
        :rules="closeMeetingRules"
        ref="ruleFormCloseMeeting"
        :hideRequiredAsterisk="true"
        class="form-box"
      >
        <el-row class="form-row">
          <div class="form-item">
            <iFormItem label="是否触发审批" prop="approvalProcessBoolean">
              <iLabel :label="$t('是否触发审批')" slot="label"></iLabel>
              <iSelect
                v-model="rowState.isTriggerApproval"
                placeholder="请选择"
                @change="changeTriggerApproval"
                :disabled="row.isTriggerApproval === 'false'"
              >
                <el-option
                  v-for="(item, index) in approvalBoolean"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </div>
        </el-row>
        <el-row class="form-row">
          <div class="form-item">
            <iFormItem label="审批流程" prop="approvalProcessId">
              <iLabel :label="$t('审批流程')" slot="label"></iLabel>
              <iSelect
                v-model="rowState.approvalProcessId"
                placeholder="请选择"
                :disabled="true"
              >
                <el-option
                  v-for="item in approvalProcessList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </div>
        </el-row>
        <el-row class="form-row form-upload">
          <iFormItem label="上传附件" prop="uploadFile">
            <iLabel :label="$t('上传附件')" slot="label"></iLabel>
            <el-upload
              action="1"
              :limit="1"
              :before-upload="beforeAvatarUpload"
              :show-file-list="true"
              :http-request="httpUpload"
              :on-remove="remove"
            >
              <iButton
                type="button"
                class="upload-button"
                :uploadLoading="uploadLoading"
              >
                请选择文件
                <span class="upload-text"><img :src="uploadIcon" /></span>
              </iButton>
              <div slot="tip" class="el-upload__tip">文件大小最大限制10MB</div>
            </el-upload>
          </iFormItem>
        </el-row>
        <div class="button-list">
          <el-form-item>
            <iButton @click="handleClose" plain class="cancel">{{
              '取消'
            }}</iButton>
            <iButton @click="handleSubmit" plain>{{ '确认' }}</iButton>
          </el-form-item>
        </div>
      </el-form>
    </iEditForm>
  </iDialog>
</template>

<script>
import { iDialog, iFormItem, iLabel, iButton, iSelect, iMessage } from 'rise'
import iEditForm from '@/components/iEditForm'
import { getApprovalProcessList, closeMeeting } from '@/api/meeting/home'
import { uploadFile } from '@/api/meeting/type'
import { approvalBoolean } from './data.js'
import uploadIcon from '@/assets/images/upload-icon.svg'

export default {
  components: {
    iDialog,
    iFormItem,
    iLabel,
    iButton,
    iSelect,
    iEditForm
  },
  props: {
    openCloseMeeting: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    id: {
      type: String || Number,
      default: () => {
        return ''
      }
    },
    row: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      approvalBoolean,
      uploadIcon,
      uploadLoading: false,
      attachment: {},
      datePickerOptions: {
        // 日期选择
        disabledDate: (date) => {
          return date < new Date() - 24 * 60 * 60 * 1000
        }
      },
      rowState: JSON.parse(JSON.stringify(this.row)),
      closeMeetingRules: {
        uploadFile: [
          // { required: this.row.isTriggerApproval == 'true' ? true : false, message: "请选择上传附件", trigger: "blur" },
          { required: false, message: '请选择上传附件', trigger: 'blur' }
        ]
      },
      approvalProcessList: []
    }
  },
  mounted() {
    getApprovalProcessList().then((res) => {
      if (res) {
        // let resUnuse = JSON.parse(JSON.stringify(res));
        let resUnuse = JSON.parse(JSON.stringify(res.data[0].subDictResultVo))
        resUnuse.forEach((item, index) => {
          resUnuse[index].id = item.id.toString()
        })
        this.approvalProcessList = resUnuse
      }
    })
  },
  methods: {
    handleClose() {
      this.$emit('handleClose')
    },
    handleSubmit(id) {
      // this.$refs['ruleFormCloseMeeting'].validate((valid) => {
      // if (valid) {
      let hashArr = window.location.hash.split('/')
      hashArr.pop()
      let param = {
        id: this.id,
        approvalProcessId: this.rowState.approvalProcessId,
        isTriggerApproval:
          this.rowState.isTriggerApproval == 'true' ? true : false,
        fromUrl:
          window.location.origin +
          window.location.pathname +
          hashArr.join('/') +
          '/details?id=' +
          id
      }
      if (this.attachment.id) {
        param.attachment = {
          attachmentId: this.attachment.id,
          attachmentName: this.attachment.name,
          attachmentUrl: this.attachment.attachmentUrl,
          source: '05'
        }
      }
      closeMeeting(param)
        .then((res) => {
          if (res) {
            // iMessage.success('关闭成功')
            this.$emit('handleOK',"close")
            this.handleClose()
          } else {
            // iMessage.success('关闭失败')
            this.handleClose()
          }
        })
        .catch((err) => {
          console.log('err', err)
        })
      //   } else {
      //     return false
      //   }
      // })
    },
    changeTriggerApproval(e) {
      if (e == 'false') {
        this.rowState.approvalProcessId = ''
      } else {
        this.rowState.approvalProcessId = this.row.approvalProcessId
      }
      // this.closeMeetingRules = {
      //   uploadFile: [
      //     { required: e === 'true' ? true : false, message: "请选择上传附件", trigger: "blur" },
      //   ],
      // };
    },
    async httpUpload(content) {
      this.uploadLoading = true
      let formData = new FormData()
      // formData.append("file", content.file);
      formData.append('multifile', content.file)
      formData.append('applicationName', 111)
      formData.append('businessId', 8025)
      formData.append('currentUserId', -1)
      formData.append('type', 1)
      await uploadFile(formData)
        .then((res) => {
          this.attachment = res
          iMessage.success(this.$t('上传成功'))
          this.$refs.ruleFormCloseMeeting.clearValidate('uploadFile')
        })
        .catch(() => {
          iMessage.error('上传失败')
        })
      this.uploadLoading = false
    },
    beforeAvatarUpload(file) {
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$message.error('上传头像图片大小不能超过10MB!')
      }
      return isLt10M
    },
    remove() {
      // this.$refs.ruleFormCloseMeeting.validateField('name', valid => {
      //   if(valid) {
      //       // 表单验证通过
      //   }
      // })
    }
  }
}
</script>

<style scoped lang="scss">
.form-box {
  padding-bottom: 30px;

  .form-row {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    width: 300px;

    .form-item {
      width: 300px;
    }
  }
  .form-upload {
    width: 300px;
    margin-bottom: 50px;
    display: flex;
    flex-shrink: 0;
    flex-grow: 1;
    display: block;
    .upload-button {
      position: relative;
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
    .el-upload__tip {
      text-align: center;
      color: #000000;
    }
  }

  .button-list {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    .el-form-item {
      margin-bottom: 0;
      .el-button {
        height: 35px;
        width: 100px;
        font-size: 16px;
        padding: 0rem;
        line-height: 35px;
      }
      .cancel {
        margin-right: 20px;
      }
    }
  }
}
/* ::v-deep .el-button--primary.is-plain {
  background: #e8effe;
  color: #1763f7;
} */

/* ::v-deep .is-required {
  .flex-align-center {
    position: relative;
    .start {
      position: absolute;
      display: none;
      width: 10px;
      height: 10px;
      background: #e30d0d;
      border-radius: 5px;
      left: -20px;
      overflow: hidden;
    }
  }
} */
</style>
