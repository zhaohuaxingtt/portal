<template>
  <iDialog
    :title="language('添加流程指导书')"
    :visible.sync="show"
    width="600px"
    @close="close"
    append-to-body
    class="process-dialog"
  >
    <el-form
      :model="form"
      :rules="rules"
      label-width="90px"
      ref="form"
      v-loading="loading"
      class="validate-required-form"
    >
      <iFormItem :label="language('附件标题')" prop="name">
        <iInput
          v-model="form.name"
          class="w-250"
          maxlength="50"
          :placeholder="language('请输入')"
        ></iInput>
      </iFormItem>
      <iFormItem :label="language('发布日期')" prop="publishDate">
        <iDatePicker
          value-format="yyyy-MM-dd"
          type="date"
          v-model="form.publishDate"
          class="w-250"
          :placeholder="language('请选择')"
        />
      </iFormItem>
      <iFormItem :label="language('添加附件')" prop="fileList">
        <el-checkbox-group v-model="form.fileList"></el-checkbox-group>
        <i-upload
          v-model="form.fileList"
          :btnTxt="language('选择文件')"
          :maxSize="10"
          :limit="1"
          :tipTxt="language('文件大小最大限制20MB!')"
          isCustHttp
          :uploadHandle="uploadHandle"
          :removeHandle="removeHandle"
        ></i-upload>
      </iFormItem>
      <div class="flex felx-row mt20 pb20 justify-end">
        <iButton @click="close">{{ language('取消') }}</iButton>
        <iButton @click.native="save">{{ language('保存') }}</iButton>
      </div>
    </el-form>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iFormItem, iInput, iDatePicker } from 'rise'
import iUpload from '../../../components/iUpload.vue'
import { addProcessFile } from '@/api/adminProCS'

export default {
  components: {
    iDialog,
    iFormItem,
    iButton,
    iInput,
    iDatePicker,
    iUpload
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        publishDate: '',
        file: '',
        fileList: []
      },
      rules: {
        name: [
          { required: true, message: '请输入附件标题!', trigger: 'blur' },
          { max: 50, message: '附件标题长度不能超过50个字符!' }
        ],
        publishDate: {
          required: true,
          message: '请选择发布日期!',
          trigger: 'change'
        },
        fileList: {
          type: 'array',
          required: true,
          message: '请上传附件!',
          trigger: 'change'
        }
      },
      uploadHandle: this.upload,
      removeHandle: this.removeFile,
      processId: this.$route.query.id,
      loading: false
    }
  },
  methods: {
    save() {
      this.$refs.form.validate(async (v) => {
        if (v) {
          this.loading = true
          let data = {
            name: this.form.name,
            publishDate: moment(this.form.publishDate).format(
              'YYYY-MM-DD HH:mm:ss'
            ),
            fileType: 'PRO_ATTACHMENT',
            file: this.form.file
          }
          let formdata = new FormData()
          for (const key in data) {
            formdata.append(key, data[key])
          }
          try {
            await addProcessFile(this.processId, formdata)
            this.$emit('refresh')
            this.$message.success('保存成功')
            this.close()
          } finally {
            this.loading = false
          }
        }
      })
    },
    upload(file) {
      return new Promise((res) => {
        this.form.file = file
        res({
          name: file.name
        })
      })
    },
    removeFile() {
      this.form.fileList = []
      this.form.file = ''
    },
    close() {
      this.form = {
        name: '',
        version: '',
        publishDate: '',
        file: '',
        fileList: []
      }
      this.$refs.form.resetFields()
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../../comon';
</style>
