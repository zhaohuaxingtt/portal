<template>
  <iDialog
    title="操作手册"
    :visible.sync="show"
    width="600px"
    @close="close"
    @open="open"
    append-to-body
  >
    <div class="content">
      <div class="flex content-item">
        <span>操作手册封面：</span>
        <iUpload
          v-model="form.operatorImage"
          accept="image/*"
          tipTxt="文件大小最大限制10MB!"
          :maxSize="10"
          :limit="1"
          isCustHttp
          :uploadHandle="uploadHandleImg"
          :removeHandle="removeHandleImg"
        ></iUpload>
      </div>
      <div class="flex content-item">
        <span>操作手册：</span>
        <iUpload
          v-model="form.operatorFile"
          btnTxt="选择文件"
          tipTxt="文件大小最大限制10MB!"
          :maxSize="10"
          :limit="1"
          isCustHttp
          :uploadHandle="uploadHandleFile"
          :removeHandle="removeHandleFile"
        ></iUpload>
      </div>
    </div>
    <div class="flex felx-row mt20 pb20 justify-end">
      <iButton @click="close">{{ language('关闭') }}</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton } from 'rise'
import iUpload from '../../../components/iUpload.vue'
import { uploadPageFile, deletePageFile } from '@/api/adminProCS'
import mixin from './../../../mixins'
export default {
  components: {
    iDialog,
    iButton,
    iUpload
  },
  mixins: [mixin],
  props: {
    show: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    info() {
      this.init()
    }
  },
  data() {
    return {
      form: {
        operatorImage: [],
        operatorFile: []
      },
      uploadHandleImg: this.uploadImg,
      uploadHandleFile: this.uploadFile,
      removeHandleImg: this.removeImg,
      removeHandleFile: this.removeFile
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.info) {
        const { attachMents } = this.info
        if (attachMents && attachMents.length) {
          const operatorImage = attachMents.find(
            (e) => e.name === 'operatorImage'
          )
          if (operatorImage) {
            this.form.operatorImage = [{ ...operatorImage }]
          }
          const operatorFile = attachMents.find(
            (e) => e.name === 'operatorFile'
          )
          if (operatorFile) {
            this.form.operatorFile = [{ ...operatorFile }]
          }
        }
      }
    },
    uploadImg(file) {
      return new Promise(async (res, rej) => {
        try {
          let data = new FormData()
          data.append('operatorImage', file)
          let r = await uploadPageFile(this.info.id, data)
          let f = r.find((e) => e.name == 'operatorImage')
          res({
            name: f.originalFileName,
            path: this.fileFmt(f.url),
            id: f.id
          })
          this.$emit('refresh')
        } catch (err) {
          rej(err)
        }
      })
    },
    uploadFile(file) {
      return new Promise(async (res, rej) => {
        try {
          let data = new FormData()
          data.append('operatorFile', file)
          let r = await uploadPageFile(this.info.id, data)
          let f = r.find((e) => e.name == 'operatorFile')
          res({
            name: f.originalFileName,
            path: this.fileFmt(f.url),
            id: f.id
          })
          this.$emit('refresh')
        } catch (err) {
          rej(err)
        }
      })
    },
    removeImg(file) {
      return new Promise(async (res, rej) => {
        try {
          await deletePageFile(file.id)
          this.$message.success('删除成功')
          this.form.operatorImage = []
          this.$emit('refresh')
          res()
        } catch (err) {
          rej(err)
        }
      })
    },
    removeFile(file) {
      return new Promise(async (res, rej) => {
        try {
          await deletePageFile(file.id)
          this.$message.success('删除成功')
          this.form.operatorFile = []
          this.$emit('refresh')
          res()
        } catch (err) {
          rej(err)
        }
      })
    },
    open() {
      if (this.info.attachMents) {
        this.info.attachMents.forEach((e) => {
          let file = {
            fileName: e.originalFileName,
            fileUrl: this.fileFmt(e.url),
            id: e.id
          }
          this.form[e.name] = [file]
        })
      }
    },
    close() {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../comon';
.content-item {
  margin-bottom: 20px;
  span {
    width: 200px;
    text-align: right;
  }
}
</style>
