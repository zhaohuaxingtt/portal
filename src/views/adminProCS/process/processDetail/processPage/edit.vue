<template>
  <iDialog
    :title="language(`${id ? '编辑' : '新增'}子页面`)"
    :visible.sync="show"
    width="800px"
    @close="close"
    @open="open"
    append-to-body
    class="process-dialog"
    top="30px"
    v-loading="loading"
  >
    <div class="content">
      <el-form
        :model="form"
        :rules="rules"
        label-width="90px"
        ref="form"
        class="validate-required-form"
      >
        <iFormItem :label="language('页面标题')" prop="name">
          <iInput
            v-model="form.name"
            class="w-250"
            maxlength="50"
            :placeholder="language('请输入')"
          ></iInput>
        </iFormItem>
        <iFormItem :label="language('更新日期')" prop="updateDt">
          <iDatePicker
            type="date"
            v-model="form.updateDt"
            class="w-250"
            :placeholder="language('请选择')"
          />
        </iFormItem>
        <iFormItem :label="language('排序')" prop="orderBy">
          <iInput
            v-model="form.orderBy"
            type="number"
            class="w-250"
            :placeholder="language('请输入')"
          ></iInput>
        </iFormItem>
        <iFormItem :label="language('词条')">
          <div class="insert-glossary flex flex-between-center">
            <iSelect v-model="glossaryId" filterable>
              <el-option
                v-for="item in glossaryList"
                :value="item.id"
                :label="item.title"
                :key="item.id"
              />
            </iSelect>
            <div class="margin-left20">
              <iButton @click="handleInsertGlossary">{{
                language('插入')
              }}</iButton>
            </div>
          </div>
        </iFormItem>
        <iFormItem :label="language('页面内容')" prop="pageRichContent">
          <iEditor
            v-model="form.pageRichContent"
            id="pageEditor"
            class="flex-1"
            :html="form.pageRichContent"
            ref="editor"
          ></iEditor>
        </iFormItem>
      </el-form>
    </div>
    <div class="flex felx-row mt20 pb20 justify-end">
      <iButton @click="close">{{ language('取消') }}</iButton>
      <iButton @click="openPreview">{{ language('预览') }}</iButton>
      <iButton @click.native="save">{{ language('保存') }}</iButton>
    </div>

    <iDialog
      :title="language('编辑子页面')"
      :visible.sync="preview"
      width="800px"
      @close="preview = false"
      append-to-body
      class="process-dialog"
      top="50px"
    >
      <div class="content preview-c w-e-text">
        <h3 class="title" v-text="form.name"></h3>
        <div class="inner" v-html="form.pageRichContent"></div>
      </div>
    </iDialog>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iFormItem, iInput, iDatePicker, iSelect } from 'rise'
import iEditor from '../../components/iEditor.vue'
import {
  ProcessAddPage,
  ProcessEditPage,
  getProcessPage
} from '@/api/adminProCS'
import moment from 'moment'
import { glossaryList } from '@/api/procs'
export default {
  components: {
    iDialog,
    iFormItem,
    iButton,
    iInput,
    iDatePicker,
    iEditor,
    iSelect
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    id: {
      default: ''
    }
  },
  data() {
    let orderBy_valid = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入排序'))
        return
      }
      var reg = /^[1-9]\d*$/ //验证规则
      if (reg.test(value)) {
        callback()
        return
      } else {
        callback(new Error('只能输入大于0的整数'))
      }
    }
    return {
      form: {
        name: '',
        updateDt: '',
        orderBy: '',
        pageRichContent: ''
      },
      rules: {
        name: { required: true, message: '请输入页面标题!', trigger: 'blur' },
        updateDt: {
          required: true,
          message: '请选择更新日期!',
          trigger: 'change'
        },
        orderBy: { required: true, validator: orderBy_valid, trigger: 'blur' }
      },
      preview: false,
      pId: this.$route.query.id,
      loading: false,
      glossaryList: [],
      glossaryId: ''
    }
  },
  methods: {
    save() {
      this.$refs.form.validate(async (v) => {
        if (v) {
          // api
          this.form.updateDt = moment(this.form.updateDt).format(
            'YYYY-MM-DD HH:mm:ss'
          )
          let formdata = new FormData()
          for (const key in this.form) {
            formdata.append(key, this.form[key])
          }
          this.loading = true
          try {
            if (this.form.id) {
              let res = await ProcessEditPage(this.form.id, formdata)
              if (res.error) {
                this.$message.warning(res.message)
              } else {
                this.$message.success('修改成功')
                this.close()
                this.$emit('refresh')
              }
            } else {
              let res = await ProcessAddPage(this.pId, formdata)
              if (res.error) {
                this.$message.warning(res.message)
              } else {
                this.$message.success('添加成功')
                this.close()
                this.$emit('refresh')
              }
            }
          } finally {
            this.loading = false
          }
        }
      })
    },

    close() {
      this.form = {
        name: '',
        updateDt: '',
        orderBy: '',
        pageRichContent: ''
      }
      this.$refs.form.resetFields()
      this.$emit('update:show', false)
    },
    async open() {
      if (this.id) {
        this.loading = true
        try {
          this.form = await getProcessPage(this.id)
          this.form.pageRichContent = this.form.richContent
          delete this.form.richContent
        } finally {
          this.loading = false
        }
      }
      this.queryGlossaryList()
    },
    openPreview() {
      if (!this.form.name || !this.form.pageRichContent)
        return this.$message.warning('请输入页面标题及页面内容')
      this.preview = true
    },
    async queryGlossaryList() {
      this.glossaryList = await glossaryList(this.keyword)
    },
    handleInsertGlossary() {
      if (!this.glossaryId) {
        return
      }
      const item = this.glossaryList.find((e) => e.id === this.glossaryId)
      if (item) {
        this.$refs.editor.insertHtml(
          `<a href="/portal/#/cf-ProCS/glossaryManage?id=${this.glossaryId}">${item.title}</a>`
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../comon';
.preview-c {
  margin-bottom: 30px;
  padding: 10px;
  background-color: #f7f8fa;
  .title {
    margin: 10px 0;
    padding: 10px 0;
    color: #0077c8;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    font-size: 18px;
  }
  .inner {
    padding: 10px 5px;
    background-color: #fff;
  }
}

.cild {
  position: relative;
}
</style>
