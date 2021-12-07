<template>
  <div class="vue-editor" v-loading="loading">
    <div v-if="disabled" v-html="value"></div>
    <vue-editor
      v-else
      v-model="editorContent"
      :editor-toolbar="toolbar"
      useCustomImageHandler
      @text-change="textChange"
      @image-added="handleImageAdded"
      @selection-change="handleSelectionChange"
      ref="vueEditor"
    />
    <el-dialog
      title="提示"
      :visible.sync="dialog"
      width="500px"
      append-to-body
      center>
      <img :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'
import { uploadFileWithNOTokenTwo } from '@/api/file/upload'

export default {
  name: 'Editor',
  props: {
    value: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    toolbar: {
      type: Array,
      default: function() {
        return [
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ size: ['small', false, 'large', 'huge'] }], // 用户自定义下拉
          ['bold', 'italic', 'underline', 'strike'], // 切换按钮
          ['image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ indent: '-1' }, { indent: '+1' }], // 减少缩进/缩进
          [{ color: [] }, { background: [] }], // 主题默认下拉，使用主题提供的值
          [{ align: [] }],
          ['clean'] // 清除格式
        ]
      }
    }
  },
  components: {
    VueEditor
  },
  data() {
    return {
      editorContent: '',
      blurCursorIndex: 0,

      dialog:false,
      imgUrl:"",
      loading:false
    }
  },
  created() {
    this.editorContent = this.value
  },
  methods: {
    textChange() {
      this.editorContent = this.editorContent.replace(/<img*/g,`<img class="editor-img" `)
          console.log(this.editorContent);
        this.$emit('input', this.editorContent)
        this.$$forceUpdate()
        this.$nextTick(async () => {
          let imgs = this.$refs.vueEditor ? this.$refs.vueEditor.$el.querySelectorAll('img') : ""

          if(imgs){
            let img = Array.from(imgs).find(e => {
              return e.src.includes("data:image/")
              // 图片预览
              // e.addEventListener("click",(el) => {
              //   el.stopPropagation()
              //   this.dialog = true
              //   this.imgUrl = el.target.src
              // })
            })
            console.log(img);
            if(img){
              let file = this.dataURLtoFile(img.src,'test.png')
              // let path = await this.upload(file)
              // console.log(path);

              // this.handleImageAdded(file,this.$refs.vueEditor.quill,0,this.$refs.vueEditor.resetUploader)
              // this.$refs.vueEditor.imageAdded(file)
            }
          }
        })
    },
    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      console.log(file,Editor, cursorLocation, resetUploader);
      console.log(cursorLocation, resetUploader);
      this.loading = true
      try {
        let path = await this.upload(file)
        Editor.insertEmbed(cursorLocation, 'image', path)
        resetUploader()
      } finally {
        this.loading = false
      }
    },
    upload(file){
      return new Promise(async (resolve,reject) => {
        try {
          const formData = new FormData()
          formData.append('businessId', 1)
          formData.append('type', 1)
          formData.append('isTemp', 0)
          formData.append('applicationName', 'rise')
          formData.append('file', file)
          formData.append(
            'currentUser',
            this.$store.state.permission.userInfo.userName
          )
          const { data } = await uploadFileWithNOTokenTwo(formData)
          resolve(data.path)
        } finally {
          reject()
        }
      })
    },
    insertHTML(html) {
      const quill = this.$refs.vueEditor.quill
      if (quill.getSelection()) {
        const cursorIndex = quill.getSelection().index
        quill.clipboard.dangerouslyPasteHTML(cursorIndex, html)
        quill.setSelection(cursorIndex + html.length)
      } else {
        const cursorIndex = this.blurCursorIndex
          ? this.blurCursorIndex
          : quill.getHTML().length
        quill.clipboard.dangerouslyPasteHTML(cursorIndex, html)
        quill.setSelection(cursorIndex + html.length)
      }
    },
    handleSelectionChange(range) {
      if (range) {
        this.blurCursorIndex = range.index
      }
    }
  },
  watch: {
    value(newVal) {
      this.editorContent = newVal
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~vue2-editor/dist/vue2-editor.css';

/* Import the Quill styles you want */
@import '~quill/dist/quill.core.css';
@import '~quill/dist/quill.bubble.css';
@import '~quill/dist/quill.snow.css';
.vue-editor {
  line-height: normal;
  ::v-deep .ql-toolbar.ql-snow {
    border: 1px solid #eee;
  }
  ::v-deep .ql-container.ql-snow {
    border: 1px solid #eee;
  }
  ::v-deep .ql-snow .ql-toolbar button,
  ::v-deep .ql-snow.ql-toolbar button {
    opacity: 0.8;
  }
}
</style>
