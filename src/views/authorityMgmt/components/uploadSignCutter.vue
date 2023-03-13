<template>
  <div>
    <div v-show="!editable" @click="viewPic">
      <iInput
        class="has-url"
        placeholder=""
        readonly
        v-model="fileInfo.name"
        disabled
      />
    </div>
    <div v-show="editable">
      <iInput
        :placeholder="
          userInfo.userNum && userInfo.nameZh
            ? '请上传'
            : '请先输入员工号和中文名再上传'
        "
        readonly
        v-model="fileInfo.name"
        v-show="!userInfo.userNum || !userInfo.nameZh"
      >
        <icon
          slot="suffix"
          class="icon"
          symbol
          name="iconzichanfujianshangchuan"
          style="font-size: 16px; cursor: pointer"
        />
      </iInput>
      <ImgCutter
        :cutWidth="400"
        :cutHeight="300"
        v-if="visible"
        rate="4:3"
        fileType="png"
        @cutDown="handleCutDown"
        @onChooseImg="onChooseImg"
      >
        <iInput
          :placeholder="
            userInfo.userNum && userInfo.nameZh
              ? '请上传'
              : '请先输入员工号和中文名再上传'
          "
          readonly
          v-model="fileInfo.name"
          v-show="userInfo.userNum && userInfo.nameZh"
          v-loading="uploadLoading"
          element-loading-spinner="el-icon-loading"
          slot="open"
        >
          <icon
            slot="suffix"
            class="icon"
            symbol
            name="iconzichanfujianshangchuan"
            style="font-size: 16px; cursor: pointer"
          ></icon>
        </iInput>
      </ImgCutter>

      <p class="tips" v-show="editable">文件仅支持图片格式，像素比列（4:3）</p>
    </div>
  </div>
</template>

<script>
import { iInput, Icon, iMessage } from 'rise'
import { uploadSignImage } from '@/api/authorityMgmt'
import ImgCutter from 'vue-img-cutter'
export default {
  name: 'uploadSignCutter',
  components: { iInput, Icon, ImgCutter },
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
      uploadLoading: false,
      visible:true
    }
  },
  methods: {
    onChooseImg(content){
      if(content.type.indexOf('image')<0){
        iMessage.error('请上传图片格式的文件')
        this.visible = false
        this.$nextTick(()=>{
          this.visible = true
        })
      }
    },
    handleCutDown(content) {
      this.uploadLoading = true
      let formData = new FormData()
      formData.append('file', content.file)
      formData.append('userNum', this.userInfo.userNum || '')
      formData.append('userName', this.userInfo.nameZh || '')
      formData.append(
        'currentUser',
        this.$store.state.permission.userInfo.userName
      )
      uploadSignImage(formData)
        .then((res) => {
          if (res.result) {
            const { data } = res
            this.fileInfo = data
            this.$emit('change', this.fileInfo)
          } else {
            iMessage.error(res.desZh || '文件仅支持图片格式，像素比列（4:3）')
          }
        })
        .finally(() => {
          this.uploadLoading = false
        })
    },
    viewPic() {
      if (this.fileInfo.path) {
        window.open(this.fileInfo.path)
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
