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
      loading:false,
      tempHtml:""
    }
  },
  created() {
    this.editorContent = this.value
  },
  methods: {
    async textChange() {
      let html = this.editorContent
      this.$emit('input', html)
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
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
