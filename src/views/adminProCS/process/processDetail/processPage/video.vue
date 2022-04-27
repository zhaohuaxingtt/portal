<template>
  <iDialog
    title="操作视频"
    :visible.sync="show"
    width="600px"
    @close="close"
    @open="open"
    append-to-body
  >
    <div class="content">
      <div class="flex content-item">
        <span>操作视频：</span>
        <iUpload
          v-model="videos"
          accept="video/*"
          btnTxt="选择视频"
          tipTxt="文件大小最大限制20MB!"
          :maxSize="10"
          :limit="1"
          isCustHttp
          :uploadHandle="uploadHandle"
          :removeHandle="removeHandle"
        ></iUpload>
      </div>
      <video
        v-if="videos.length > 0"
        ref="video"
        class="video"
        controls
        :src="videos[0].fileUrl"
      ></video>
      <div v-else style="text-align: center">暂无操作视频，请上传！</div>
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
      videos: [],
      uploadHandle: this.upload,
      removeHandle: this.remove
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
          const videos = attachMents.find((e) => e.name === 'operatorVideo')
          if (videos) {
            const newVideo = { ...videos }
            if (!newVideo.fileUrl && newVideo.url) {
              newVideo.fileUrl = newVideo.url
            }
            this.videos = [newVideo]
          }
        }
      }
    },
    upload(file) {
      return new Promise(async (res, rej) => {
        try {
          let data = new FormData()
          data.append('operatorVideo', file)
          let r = await uploadPageFile(this.info.id, data)
          let f = r.find((e) => e.name == 'operatorVideo')
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
    remove(file) {
      return new Promise(async (res, rej) => {
        try {
          await deletePageFile(file.id)
          this.$message.success('删除成功')
          this.videos = []
          this.$emit('refresh')
          res()
        } catch (err) {
          rej(err)
        }
      })
    },
    open() {
      if (this.info.attachMents) {
        let file = this.info.attachMents.find((e) => e.name == 'operatorVideo')
        if (file) {
          this.videos = [
            {
              fileName: file.originalFileName,
              fileUrl: this.fileFmt(file.url),
              id: file.id
            }
          ]
        }
      }
    },
    close() {
      this.$refs.video && this.$refs.video.pause()
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
.video {
  width: 80%;
  display: block;
  margin: 0 auto 40px;
}
</style>
