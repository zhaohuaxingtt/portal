<!--
 * @Author: YoHo
 * @Date: 2023-01-09 14:11:54
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\terms\signDetail\components\clauseDialog\single.vue
-->
<template>
  <iDialog
    :title="$t('请完成以下条款签署')"
    :visible.sync="openDialog"
    append-to-body="true"
    width="70%"
    top="5vh"
    @close="clearDiolog"
  >
    <div>
      <div>
        <el-steps direction="vertical" :active="1">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step
            title="步骤 3"
            description="这是一段很长很长很长的描述性文字"
          ></el-step>
        </el-steps>
      </div>
      <div ref="editer" class="editer" id="editerPreview"></div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-checkbox class="check-box" v-model="check" slot="label"
        ><span class="label-text">{{
          language('我已仔细阅读并同意以上条款内容')
        }}</span></el-checkbox
      >
      <el-button @click="clearDiolog">{{ $t('取消') }}</el-button>
      <el-button type="primary" @click="handleSubmit">{{
        $t('保存')
      }}</el-button>
    </span>
  </iDialog>
</template>

<script>
import { iDialog, iCard, iSelect, iFormItem, iLabel, iMessage } from 'rise'
import E from 'wangeditor'
import UploadMenu from './UploadPanel'
export default {
  components: {
    iDialog,
    iCard,
    iSelect,
    iFormItem,
    iLabel,
  },
  props: {
    openDialog: { type: Boolean, default: false },
    id: { type: Number, default: -1 },
    supplierId: { type: Number, default: -1 }
  },
  data() {
    return {
      check: false,
      openUploadFileDialog: false,
      lastDate: '',
      signNode: [
        {
          id: '1',
          name: '询价承诺书',
          confirm: '',
          refuse: ''
        },
        {
          id: '2',
          name: '合规协议告知书',
          confirm: '',
          refuse: ''
        },
        {
          id: '3',
          name: '可再生能源使用承诺书',
          confirm: '',
          refuse: ''
        }
      ],
      value1: '',
      value2: '',
      list2: [
        {
          id: '1',
          label: '下一个条款',
          value: 1
        },
        {
          id: '2',
          label: '流程终止（True）',
          value: 2
        },
        {
          id: '3',
          label: '流程终止（False）',
          value: 3
        }
      ]
    }
  },
  mounted() {
    this.createEditor()
  },
  methods: {
    createEditor() {
      let that = this
      this.editor = new E('#editerPreview')
      // 配置菜单栏，设置不需要的菜单
      this.editor.config.excludeMenus = [
        // "list",
        // "todo",
        // "emoticon",
        'image'
        // "video",
        // "table",
        // "code",
      ]
      // 配置字体
      this.editor.config.fontNames = [
        // 字符串形式
        '黑体',
        '仿宋',
        '楷体',
        '标楷体',
        '华文仿宋',
        '华文楷体',
        '宋体',
        '微软雅黑',
        'Arial',
        'Tahoma',
        'Verdana',
        'Times New Roman',
        'Courier New'
      ]
      this.editor.config.menus = this.editor.config.menus.concat('uploadMenu') // 配置菜单栏，删减菜单，调整顺序
      this.editor.config.customUploadImg = async (files, callaback) => {
        const urls = []
        for (let i = 0; i < files.length; i++) {
          const res = await this.upload(files[i])
          urls.push(res)
        }
        callaback(urls)
      }
      this.editor.menus.extend('uploadMenu', UploadMenu) // 配置扩展的菜单
      this.editor.config.onchange = function (newHtml) {
        that.termsText = newHtml
      }
      this.editor.create()
      this.editor.txt.html(this.termsText)
    },
    clearDiolog() {
      this.$emit('closeDialog', false)
      this.$emit('flushTable')
    },
    handleSubmit() {
      console.log('handleSubmit:执行保存')
      this.clearDiolog()
    }
  }
}
</script>

<style scoped lang="scss">
.card-title {
  display: flex;
  justify-content: space-between;
  margin-right: 20px;
}
.active {
  ::v-deep .cardBody {
    background-color: rgb(237, 242, 252);
  }
}
.card-content {
  display: flex;
  align-items: center;
  .item-title {
    font-size: 16px;
  }
  .item-text {
    font-size: 14px;
  }
}
</style>
