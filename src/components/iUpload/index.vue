<template>
  <div class="file-form-uploader">
    <el-upload
      ref="upload"
      :action="uploadURL"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :file-list="fileList"
      :data="extraData"
      :headers="{
        token: getToken()
      }"
      :accept="
        fileTypes
          .map((type) => {
            return `.${type}`
          })
          .join(',')
      "
    >
      <el-button type="primary">
        <i class="el-icon-upload2"></i>
        上传文件
      </el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传
        <span v-for="(item, index) in fileTypes" :key="index">
          {{ `.${item}${index === fileTypes.length - 1 ? '' : '、'}` }}
        </span>
        文件
      </div>
    </el-upload>
  </div>
</template>

<script>
import { getToken } from '@/utils'
export default {
  props: {
    fileIds: {
      type: Array,
      default: function () {
        return []
      }
    },
    extraData: {
      type: Array,
      default: function () {
        return {
          applicationName: 'rise-dev',
          type: '1',
          businessId: '01',
          isTemp: 0,
          currentUserId: 1
        }
      }
    },
    fileTypes: {
      type: Array,
      default: function () {
        return [
          'mpg',
          'mp4',
          'rmvb',
          'rm',
          'mpeg',
          'avi',
          'wmv',
          'mov',
          'flv',
          'jpg',
          'jpeg',
          'gif',
          'png',
          'bmp',
          'mp3',
          'wma',
          'wav',
          'txt',
          'doc',
          'docx',
          'xls',
          'xlsx',
          'ppt',
          'pptx',
          'swf',
          'pdf',
          'tiff',
          'tif',
          'ai',
          'psd',
          'fla',
          'wmp',
          'zip',
          'rar',
          'tar',
          'gz',
          'z',
          'iso',
          'cab',
          'jar',
          'ceb',
          'wps',
          'ttf'
        ]
      }
    }
  },
  async mounted() {
    const http = new XMLHttpRequest()
    const url = `/fileudApi/batchSelectByIds`
    http.open('POST', url, true)
    http.setRequestHeader('content-type', 'application/json')
    http.onreadystatechange = () => {
      if (http.readyState === 4) {
        const result = JSON.parse(http.responseText)
        this.fileList = result
      }
    }
    const sendData = this.fileIds
    http.send(JSON.stringify(sendData))
  },
  data() {
    return {
      uploadURL: '/fileudApi/udSingleFile',
      fileList: []
    }
  },
  methods: {
    getToken,
    handlePreview(file) {
      console.log('preview', file)
      window.open(file.path || file.response.path, '_blank')
    },
    handleRemove(file, fileList) {
      console.log('remove', file, fileList)
      this.$emit('callback', fileList)
    },
    handleSuccess(response, file, fileList) {
      console.log('success', response, file, fileList)
      this.$emit('callback', fileList)
    },
    handleError(err, file, fileList) {
      console.log('err', err, file, fileList)
    },
    handelProgress(event, file, fileList) {
      console.log('progress', event, file, fileList)
    }
  }
}
</script>
