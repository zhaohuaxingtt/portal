<template>
  <div :id="id"></div>
</template>

<script>
import { uploadFileWithNOTokenTwo } from '@/api/file/upload'

import Editor from 'wangeditor'
import { iMessage } from 'rise'
export default {
  props: {
    value: {},
    html: {
      //最开始的html，有原始值必传
      type: String,
      default: 'editor'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      //一个组件存在多个editor是需加不同id
      type: String,
      default: 'editor'
    },
    zIndex: {
      type: Number,
      default: 333
    }
  },
  data() {
    return {
      editor: null
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    html(n) {
      if (n != this.editor.txt.html()) {
        // this.editor.txt.html(n || "<p><br></p>")
        this.editor.txt.html(n || '')
      }
    },
    disabled(n) {
      if (n) {
        this.editor && this.editor.disable()
      } else {
        this.editor && this.editor.enable()
      }
    }
  },
  methods: {
    init() {
      this.editor = new Editor(`#${this.id}`)
      this.editor.config.customUploadImg = (files, insertImgFn) => {
        // resultFiles 是 input 中选中的文件列表
        // insertImgFn 是获取图片 url 后，插入到编辑器的方法
        files.forEach(async (file) => {
          let path = await this.upload(file)
          insertImgFn(path)
        })
      }
      this.editor.config.onchange = (newHtml) => {
        //    this.$emit("input",newHtml || "<p><br></p>")
        this.$emit('input', newHtml || '')
      }
      this.editor.config.uploadImgMaxLength = 10
      console.log(this.editor.config)
      // 插入链接
      this.editor.config.linkCheck = (text, url) => {
        if (!url) {
          return
        }
        if (
          (url.indexOf('http://') === -1 && url.indexOf('https://') === -1) ||
          url.length <= 10
        ) {
          iMessage.error('请输入必须是以 http/https 开头的正确链接地址')
          return
        }
        return true
      } // 也支持 async 函数

      //   // 更新链接
      //   this.editor.config.MENU_CONF['editLink'] = {
      //     checkLink: (text, url) => {
      //       if (!url) {
      //         return
      //       }
      //       if (url.indexOf('http') !== 0) {
      //         return '链接必须以 http/https 开头'
      //       }
      //       return true
      //     } // 也支持 async 函数
      //   }

      if (this.disabled) {
        setTimeout(() => {
          this.editor.disable()
        }, 300)
      }
      if (this.value) {
        this.editor.txt.html(this.value)
        let timer = setInterval(() => {
          if (!this.editor.txt.html()) {
            this.editor.txt.html(this.value)
          } else {
            clearInterval(timer)
          }
        }, 500)
      }
      this.editor.config.zIndex = this.zIndex
      this.editor.height = 300
      this.editor.config.menuTooltipPosition = 'down'
      this.editor.config.showLinkImg = false //隐藏网络图片上传
      this.editor.create()
    },
    upload(file) {
      return new Promise(async (resolve, reject) => {
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
    insertHtml(html) {
      if (!html) {
        return
      }
      this.editor.cmd.do('insertHTML', html)
    }
  }
}
</script>

<style lang="scss" scoped>
#editor {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  ::v-deep .w-e-text-container {
    flex: 1;
  }
}
</style>
