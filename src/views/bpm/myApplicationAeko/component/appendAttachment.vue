<template>
  <iDialog :visible.sync="dialogVisible" width="40%" @close="onClose">
    <div slot="title" class="dialog-title">
      <span class="el-dialog__title"
        >{{ $t('APPROVAL.APPEND_DATA') }} <span class="required">*</span></span
      >
    </div>

    <div class="attach-info">
      <el-form>
        <iFormItem :label="$t('APPROVAL.APPEND_DATA_NODE')">
          <iSelect
            :placeholder="$t('APPROVAL.PLEASE_CHOOSE')"
            v-model="form.node"
          >
            <el-option
              v-for="item of taskNodes"
              :label="item.activityName"
              :value="item.taskId"
              :key="item.taskId"
            >
              <span>{{ item.activityName }}</span>
              <span v-if="item.approver"> - </span>
              <span>{{ item.approver }}</span>
            </el-option>
          </iSelect>
        </iFormItem>
        <iFormItem>
          <div class="item comment">
            <iInput
              :placeholder="$t('APPROVAL.APPEND_DATA_COMMENT')"
              v-model="form.comment"
              type="textarea"
              rows="5"
            />
          </div>
        </iFormItem>
      </el-form>

      <el-upload
        action="1"
        show-file-list
        with-credentials
        :http-request="httpUpload"
        :on-remove="handleRemove"
        :before-remove="handleBeforeRemove"
        accept="image/jpeg,image/gif,image/png,application/pdf,application/vnd.ms-powerpoint,application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation"
        multiple
        tip=""
      >
        <iButton
          type="default"
          :loading="uploadLoading"
          size="small"
          class="btn-upload"
        >
          <span>
            {{ $t('APPROVAL.UPLOAD_ATTACH') }}
          </span>
        </iButton>
      </el-upload>
    </div>

    <div slot="footer" class="dialog-footer">
      <iButton @click="save">确定</iButton>
      <iButton @click="onClose">取消</iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iInput, iMessage, iFormItem, iSelect } from 'rise'
import {
  saveApprovalAttach,
  uploadApprovalAttach,
  fetchTaskNodes
} from '@/api/approval/attach'
import deleteMixin from '@/mixins/deleteMixin'
export default {
  name: 'appendAttachment',
  components: { iDialog, iButton, iInput, iFormItem, iSelect },
  mixins: [deleteMixin],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    instanceId: {
      type: String,
      require: true
    },
    taskId: {
      type: String,
      require: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      loading: false,
      uploadLoading: false,
      form: {
        node: '',
        comment: ''
      },
      attachList: [],
      taskNodes: []
    }
  },
  computed: {
    tableData() {
      const start = (this.currentPage - 1) * this.pageSize
      const end = this.currentPage * this.pageSize
      return this.attachList.filter((e, index) => {
        return index >= start && index < end
      })
    }
  },
  created() {
    this.dialogVisible = this.visible
    this.queryTaskNodes()
  },
  methods: {
    onClose() {
      this.$emit('close')
    },
    async queryTaskNodes() {
      const params = {
        processInstanceId: this.instanceId
      }
      const { data } = await fetchTaskNodes(params)
      this.taskNodes = data
      if (data.length === 1) {
        this.form.node = data[0].taskId
      }
    },
    async httpUpload(content) {
      this.uploadLoading = true
      let formData = new FormData()
      formData.append('file', content.file)
      formData.append('applicationName', 'riseApproval')
      formData.append('businessId', this.instanceId)
      formData.append('isTemp', 0)
      formData.append('type ', 1)
      formData.append('currentUserId', this.$store.state.permission.userInfo.id)
      await uploadApprovalAttach(formData)
        .then(res => {
          this.attachList.push(res)
        })
        .catch(err => {
          console.log(err)
          iMessage.error(this.$t('LK_SHANGCHUANSHIBAI'))
        })

      this.uploadLoading = false
    },
    save() {
      if (!this.form.node) {
        iMessage.error(this.$t('APPROVAL.NODE_REQUIRED'))
        return false
      }

      const taskFiles = this.attachList.map(e => e.id).join(',')

      const data = {
        addMaterialUserId: this.$store.state.permission.userInfo.id,
        attachmentList: this.attachList,
        comment: this.form.comment,
        processInstanceId: this.instanceId,
        taskFiles,
        taskId: this.form.node
      }
      this.uploadLoading = true
      saveApprovalAttach(data)
        .then(res => {
          if (res.result) {
            iMessage.success(this.$t('APPROVAL.SAVE_SUCCESSFUL'))
            this.attachList.length = 0
            this.$emit('success')
          } else {
            iMessage.error(res.desZh || this.$t('APPROVAL.SAVE_FAILED'))
          }
        })
        .catch(error => {
          iMessage.error(error.desZh || this.$t('APPROVAL.SAVE_FAILED'))
          this.uploadLoading = false
        })
    },
    handleBeforeRemove() {
      return this.onDelete()
    },
    handleRemove(file) {
      const index = this.attachList.findIndex(e => e.name === file.name)
      this.attachList.splice(index, 1)
      console.log('attachList', this.attachList)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 20px;
}
.attach-info {
  .item.comment {
    margin-bottom: 20px;
  }
  margin-bottom: 30px;
}
.btns {
  display: flex;
}
.btn-upload {
  margin-right: 10px;
}
.required {
  color: #f20;
}
</style>
