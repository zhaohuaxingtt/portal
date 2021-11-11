<template>
  <div>
    <div @click="viewPic">
      <iInput
        class="has-url"
        placeholder=""
        readonly
        v-model="fileInfo.name"
        v-show="!editable"
        disabled
      />
    </div>

    <el-upload
      action="1"
      :show-file-list="false"
      with-credentials
      :http-request="uploadImage"
      :before-upload="handleBeforeUpload"
      accept="image/jpeg,image/png,image/jpg"
      ref="uploadInput"
      class="upanel"
    >
      <iInput
        placeholder="请上传"
        readonly
        v-model="fileInfo.name"
        v-show="editable"
        v-loading="uploadLoading"
      >
        <icon
          slot="suffix"
          class="icon"
          symbol
          name="iconzichanfujianshangchuan"
          style="font-size: 16px"
        ></icon>
      </iInput>
    </el-upload>
    <p class="tips" v-show="editable">文件仅支持图片格式，像素比列（4:3）</p>
  </div>
</template>

<script>
import { iInput, Icon, iMessage } from 'rise'
import { uploadSignImage } from '@/api/authorityMgmt'
export default {
  name: 'uploadSign',
  components: { iInput, Icon },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    signPic: {
      type: Object,
      default: function () {
        return {}
      }
    },
    userInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  watch: {
    signPic(val) {
      if (val) {
        this.fileInfo = { ...this.signPic }
      }
    }
  },
  created() {
    if (this.signPic) {
      this.fileInfo = { ...this.signPic }
    }
  },
  data() {
    return {
      fileInfo: {},
      uploadLoading: false
    }
  },
  methods: {
    async uploadImage(content) {
      this.uploadLoading = true
      let formData = new FormData()
      formData.append('file', content.file)
      formData.append('userNum', this.userInfo.userNum)
      formData.append('userName', this.userInfo.nameZh)
      formData.append(
        'currentUser',
        this.$store.state.permission.userInfo.userName
      )
      await uploadSignImage(formData)
        .then((res) => {
          console.log('res', res)
          if (res.result) {
            const { data } = res
            this.fileInfo = data
            this.$emit('change', this.fileInfo)
          } else {
            iMessage.error('文件仅支持图片格式，像素比列（4:3）')
          }
        })
        .catch((err) => {
          console.log(err)
          iMessage.error('文件仅支持图片格式，像素比列（4:3）')
        })

      this.uploadLoading = false
    },
    handleUpload() {
      this.$refs.uploadInput.submit()
    },
    viewPic() {
      if (this.fileInfo.path) {
        window.open(this.fileInfo.path)
      }
      console.log('viewPic')
    },
    handleBeforeUpload(file) {
      if (file) {
        console.log('handleBeforeUpload', file)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .upanel {
  .el-upload {
    display: block;
  }
}
.tips {
  font-size: 12px;
  color: #999;
  line-height: 20px;
}
.has-url {
  ::v-deep .el-input__inner {
    color: $color-blue;
    text-align: center;
    cursor: pointer;
  }
}
</style>
