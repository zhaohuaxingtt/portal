<template>
  <iDialog
    :title="$t('MT_XIUGAIHUIYILEIXINGXINXI')"
    :visible.sync="openEditMeetingDialog"
    width="30rem"
    :close-on-click-modal="false"
    @close="close"
  >
    <iEditForm>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        :hideRequiredAsterisk="true"
      >
        <iFormItem prop="name">
          <!-- <iLabel :label="$t('会议类型')" slot="label"></iLabel> -->
          <div>
            <p>{{ $t('MT_HUIYILEIXING') }}</p>
            <p class="name">{{ ruleForm.name }}</p>
          </div>
        </iFormItem>

        <iFormItem label="会议简介" prop="meetingInfoDesc">
          <iLabel :label="$t('MT_HUIYIJIANJIE')" slot="label"></iLabel>
          <div class="form-row">
            <iInput type="textarea" v-model="ruleForm.meetingInfoDesc"></iInput>
          </div>
        </iFormItem>

        <div class="image-box">
          <img
            ref="img"
            :src="ruleForm.coverImage"
            class="avatar"
            alt=""
            @error="handleError"
            @load="handleLoad"
          />
        </div>
        <div class="form-upload">
          <iFormItem prop="coverImage">
            <el-upload
              action="1"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :show-file-list="false"
              :http-request="httpUpload"
            >
              <iButton
                type="button"
                class="upload-button"
                :uploadLoading="uploadLoading"
              >
                {{ $t('MT_XIUGAIFENGMIANTU') }}<span class="upload-text"></span>
              </iButton>
              <div slot="tip" class="el-upload__tip">
                {{ $t('MT_WENJIANDAXIAOZUIDAXIANZHI') }}15MB
              </div>
            </el-upload>
          </iFormItem>
        </div>

        <div class="button-list">
          <el-form-item>
            <iButton @click="close" plain class="cancel">{{
              $t('MT_QUXIAO')
            }}</iButton>
            <iButton @click="handleSubmit('ruleForm')" plain>{{
              $t('MT_BAOCUN')
            }}</iButton>
          </el-form-item>
        </div>
      </el-form>
    </iEditForm>
  </iDialog>
</template>

<script>
import { iDialog, iInput, iFormItem, iLabel, iButton, iMessage } from 'rise'
import iEditForm from '@/components/iEditForm'
// import { MOCK_FILE_URL } from "@/constants";
import { updateMettingType, uploadFile } from '@/api/meeting/type'
import { MeetingTypeRules } from './data'
export default {
  components: {
    iDialog,
    iFormItem,
    iInput,
    iLabel,
    iButton,
    iEditForm
  },
  props: {
    loading: { type: Boolean, default: false },
    openEditMeetingDialog: {
      type: Boolean,
      default: () => {
        return true
      }
    },
    clickMeetingTypeScope: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      uploadLoading: false,
      rules: MeetingTypeRules,
      ruleForm: {
        name: '',
        meetingInfoDesc: '',
        coverImage: ''
      }
      //coverImage: "",
    }
  },
  mounted() {
    /* if (this.editOrAdd === "edit") {
      this.ruleForm = { ...this.clickScope };
    } */
    this.ruleForm = { ...this.clickMeetingTypeScope }
  },
  methods: {
    // 更新图片
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
          // this.ruleForm.coverImage = res.url;
          this.ruleForm.coverImage = res.data[0].path
          iMessage.success(this.$t('MT_SHANGCHUANCHENGGONG'))
        })
        .catch(() => {})
      this.uploadLoading = false
    },
    handleAvatarSuccess() {},
    handleLoad() {
      this.$refs['img'].classList.remove('error')
    },
    handleError() {
      this.$refs['img'].classList.add('error')
    },
    close() {
      this.$emit('closeEditMeetingDialog', false)
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const formData = this.ruleForm
          updateMettingType(formData)
            .then((data) => {
              if (data) {
                this.close()
                this.$message.success(this.$t('MT_BAOCUNCHENGGONG'))
                this.$emit('flushCard')
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt15M = file.size / 1024 / 1024 < 15
      if (!isJPG) {
        this.$message.error(this.$t('MT_JINZHICHITUPIANGESHI'))
      }
      if (!isLt15M) {
        this.$message.error(
          this.$t('MT_SHANGCHUANTUPIANDAXIAOBUNENGCHAOGUO15MB')
        )
      }
      return isJPG && isLt15M
    }
  }
}
</script>

<style lang="scss" scoped>
.form-upload {
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  height: 100px;
  flex-shrink: 0;
  flex-grow: 1;
  .upload-button {
    position: relative;
    /* border: 1px solid #d8dce6; */
    width: 400px;
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
    margin-top: 20px;
    text-align: center;
  }
}
.name {
  padding-left: 15px;
  font-size: 20px;
  line-height: 28px;
  font-weight: bold;
}
.image-box {
  width: 100%;
  background-image: url('../../../../../assets/images/imgBg.svg');
  background-repeat: no-repeat;
  background-color: #eee;
  background-position: center;
  margin-right: 40px;
  position: relative;
  .el-avatar {
    display: block;
    display: none;
  }
  .avatar {
    margin-bottom: 10px;
    width: 400px;
    height: 225px;
    display: block;
    object-fit: scale-down;
  }
  .error {
    visibility: hidden;
  }
}
.button-list {
  display: flex;
  height: 60px;
  justify-content: center;
  align-items: center;
  .el-form-item {
    margin-bottom: 30px;
    .el-button {
      height: 35px;
      width: 100px;
    }
    .cancel {
      margin-left: 20px;
    }
  }
}
/* ::v-deep .is-required {
  .flex-align-center {
    position: relative;
    .start {
      position: absolute;
      display: block;
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
