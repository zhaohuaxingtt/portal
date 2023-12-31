<template>
  <iDialog
    :visible.sync="dialogFormVisible"
    width="60%"
    @close="onClose"
    lock-scroll="false"
    destroy-on-close="true"
    :title="isRead ? formTitles.createTitle : formTitles.editTitle"
  >
    <div class="main" v-loading="loading">
      <div class="content">
        <el-form
          :model="formData"
          :rules="rules"
          ref="ruleForm"
          label-position="left"
          label-width="110px"
          class="validate-required-form"
        >
          <el-row gutter="20">
            <el-col :span="12">
              <iFormItem :label="language('中文名称')" prop="appNameCn">
                <iInput
                  :placeholder="language('请输入')"
                  :disabled="isRead"
                  v-model="formData.appNameCn"
                  maxlength="20"
                ></iInput>
              </iFormItem>
            </el-col>
            <el-col :span="12">
              <iFormItem :label="language('英文名称')" prop="appNameEn">
                <iInput
                  :placeholder="language('请输入')"
                  :disabled="isRead"
                  v-model="formData.appNameEn"
                  maxlength="20"
                ></iInput>
              </iFormItem>
            </el-col>
            <el-col :span="12">
              <iFormItem :label="language('系统URL')" prop="url">
                <iInput
                  v-model="formData.url"
                  :disabled="isRead"
                  :placeholder="language('请输入')"
                ></iInput>
              </iFormItem>
            </el-col>
            <el-col :span="24">
              <iFormItem :label="language('系统功能说明')" prop="description">
                <iInput
                  :placeholder="language('请输入')"
                  :disabled="isRead"
                  v-model="formData.description"
                  maxlength="100"
                ></iInput>
              </iFormItem>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div slot="footer">
      <div class="buttons">
        <iButton v-if="isRead" @click="edit">
          {{ language('编辑') }}
        </iButton>
        <iButton v-if="!isRead" @click="comfirm">
          {{ language('确认') }}
        </iButton>
        <iButton v-if="!isRead" @click="reset">
          {{ language('重置') }}
        </iButton>
      </div>
    </div>
  </iDialog>
</template>

<script>
import { iFormItem, iInput, iButton, iDialog, iMessage } from 'rise'
import {
  saveApplication,
  updateApplication,
  queryApplicationDetail
} from '@/api/applications'
export default {
  components: {
    iFormItem,
    iInput,
    iButton,
    iDialog
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    isRead: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      loading: false,
      formData: {
        appNameCn: '',
        appNameEn: '',
        description: '',
        url: ''
      },
      formTitles: {
        createTitle: '新建/浏览页面',
        editTitle: '新建/编辑页面'
      },
      rules: {
        appNameCn: [
          { required: true, message: '请输入中文名称', trigger: 'blur' },
          { max: 20, message: '长度在 20 个字符内', trigger: 'blur' }
        ],
        appNameEn: [
          { required: true, message: '请输入英文名称', trigger: 'blur' },
          { max: 20, message: '长度在 20 个字符内', trigger: 'blur' }
        ],
        url: [{ required: true, message: '请输入系统URL', trigger: 'blur' }],
        description: [
          { max: 100, message: '长度在 100 个字符内', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.dialogFormVisible = this.visible
    this.orginalData = _.cloneDeep(this.formData)
    if (this.id) {
      this.getDetail()
    }
  },
  watch: {
    visible() {
      this.dialogFormVisible = this.visible
    }
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    edit() {
      this.isRead = false
      this.isEdit = true
    },
    getDetail() {
      this.loading = true
      let param = { id: this.id }
      queryApplicationDetail(param)
        .then((val) => {
          if (val.code == 200) {
            this.loading = false
            this.formData = val.data
            this.orginalData = _.cloneDeep(val.data)
          } else {
            iMessage.error(val.desZh || '获取数据失败')
          }
        })
        .catch((error) => {
          this.loading = false
          iMessage.error(error.desZh || '获取数据失败')
        })
    },
    comfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.save()
        }
      })
    },
    save() {
      this.loading = true
      const res = this.id
        ? updateApplication(this.formData)
        : saveApplication(this.formData)
      res
        .then((val) => {
          if (val.code == 200) {
            //编辑成功
            this.loading = false
            this.dialogFormVisible = false
            this.$emit('update')
            this.$emit('close')
          } else {
            iMessage.error(val.desZh || '编辑失败')
          }
        })
        .catch((err) => {
          this.loading = false
          iMessage.error(err.desZh || '编辑失败')
        })
    },
    reset() {
      //重置
      this.formData = _.cloneDeep(this.orginalData)
    }
  }
}
</script>

<style lang="scss" scoped>
.titleHeader {
  font-size: 20px;
  margin-bottom: 20px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}
</style>
