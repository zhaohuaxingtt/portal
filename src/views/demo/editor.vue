<template>
  <div class="app-editor">
    <vue-tinymce v-model="content" :setup="setup" :setting="setting" />
  </div>
</template>

<script>
/* import tinymce from 'tinymce'
import VueTinymce from '@packy-tang/vue-tinymce'

//样式
import 'tinymce/skins/content/default/content.min.css'

import 'tinymce/skins/ui/oxide/skin.css'
import 'tinymce/skins/ui/oxide/content.css'

//主题
import 'tinymce/themes/silver'

//插件
import 'tinymce/plugins/link' //链接插件
import 'tinymce/plugins/image' //图片插件
import 'tinymce/plugins/media' //媒体插件
import 'tinymce/plugins/table' //表格插件
import 'tinymce/plugins/lists' //列表插件
import 'tinymce/plugins/quickbars' //快速栏插件
import 'tinymce/plugins/fullscreen' //全屏插件

import 'tinymce/icons/default/icons'

//本地化
import './editor-i18n.js'

Vue.use(VueTinymce)
export default {
  name: 'Editor',
  data() {
    return {
      content: '<p>html content</p>',
      setting: {
        menubar: true,
        toolbar:
          'undo redo | fullscreen | formatselect alignleft aligncenter alignright alignjustify | link unlink | numlist bullist | image  table | fontselect fontsizeselect forecolor backcolor | bold italic underline strikethrough | indent outdent | superscript subscript | removeformat |',
        toolbar_drawer: 'sliding',
        quickbars_selection_toolbar:
          'removeformat | bold italic underline strikethrough | fontsizeselect forecolor backcolor',
        plugins: 'link image media table lists fullscreen quickbars',
        height: 350,
        language: 'zh_CN'
      }
    }
  },
  methods: {
    setup(editor) {
      console.log(editor)
    }
  }
} */
</script>

<style lang="scss" scoped>
.app-editor {
  height: 350px;
}
</style>
