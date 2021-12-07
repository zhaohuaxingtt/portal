<template>
  <iDialog :visible.sync="dialogVisible" width="80%" @close="onClose">
    <div slot="title" class="dialog-title">
      <span class="el-dialog__title">{{ language('补充材料') }}12121</span>
      <div class="text-right btns">
        <el-upload
          action="1"
          :show-file-list="false"
          with-credentials
          :on-success="handleUploadSuccess"
          :before-upload="handleBeforeUpload"
          :http-request="httpUpload"
          accept="image/jpeg,	
image/gif,	
image/png,application/pdf,application/vnd.ms-powerpoint,application/vnd.ms-excel,application/msword,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation"
          multiple
        >
          <iButton
            type="default"
            :loading="uploadLoading"
            size="small"
            class="btn-upload"
          >
            <span>
              {{ language('上传附件') }}
            </span>
          </iButton>
        </el-upload>
        <iButton
          type="default"
          :loading="uploadLoading"
          size="small"
          @click="del"
        >
          {{ language('删除附件') }}
        </iButton>
        <iButton
          type="default"
          :loading="uploadLoading"
          size="small"
          @click="save"
        >
          {{ language('保存') }}
        </iButton>
      </div>
    </div>

    <div class="attach-info">
      <div class="name">{{ language('补充材料节点') }}</div>
      <div class="item node">
        <iSelect :placeholder="language('请选择')" v-model="form.node">
          <el-option
            v-for="item of taskNodes"
            :label="
              item.activityName + `${item.approver && '-'}` + item.approver
            "
            :value="item.taskId"
            :key="item.taskId"
          />
        </iSelect>
      </div>
      <div class="item comment">
        <iInput
          :placeholder="language('请输入补充材料留言内容')"
          v-model="form.comment"
        />
      </div>
    </div>

    <i-table-custom
      :data="tableData"
      :columns="attachColumns"
      :loading="loading"
      :extra-data="tableExtraData"
      @handle-selection-change="handleSelectionChange"
    />

    <div slot="footer" class="dialog-footer">
      <iPagination
        v-update
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        background
        :current-page="currentPage"
        :page-size="pageSize"
        :total="attachList.length"
        :layout="page.layout"
      />
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iButton, iInput, iSelect, iPagination, iMessage } from 'rise'
import iTableCustom from '@/components/iTableCustom'
import {
  saveApprovalAttach,
  uploadApprovalAttach,
  fetchTaskNodes
} from '@/api/approval/attach'
import { pageMixins } from '@/utils/pageMixins'
import deleteMixin from '@/mixins/deleteMixin'
export default {
  name: 'DialogAppendAttachment',
  components: { iDialog, iButton, iInput, iSelect, iPagination, iTableCustom },
  mixins: [pageMixins, deleteMixin],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    attachColumns: {
      type: Array,
      default: function () {
        return []
      }
    },
    instanceId: {
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
      selectedTableData: [],
      tableExtraData: {},
      taskNodes: [],
      currentPage: 1,
      pageSize: 10
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
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleSizeChange(size) {
      this.pageSize = size
    },
    handleSelectionChange(val) {
      this.selectedTableData = val
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
    onSubmit() {
      this.$emit('save')
    },
    onClose() {
      this.$emit('close')
    },
    async httpUpload(content) {
      this.uploadLoading = true
      let formData = new FormData()
      formData.append('file', content.file)
      formData.append('applicationName', 'riseApproval')
      formData.append('businessId', this.instanceId)
      formData.append('isTemp', 0)
      formData.append('type ', 1)
      formData.append(
        'currentUser',
        this.$store.state.permission.userInfo.userName
      )
      await uploadApprovalAttach(formData)
        .then((res) => {
          this.attachList.push(res)
        })
        .catch((err) => {
          console.log('uploadApprovalAttach err', err)
          iMessage.error(this.$t('LK_SHANGCHUANSHIBAI'))
        })

      this.uploadLoading = false
    },
    save() {
      if (!this.form.node) {
        iMessage.error(this.language('补充材料节点必选'))
        return false
      }
      /* if (this.attachList.length === 0) {
        iMessage.error(this.$t('APPROVAL.NO_ATTACH'))
        return false
      } */

      const taskFiles = this.attachList.map((e) => e.id).join(',')

      const data = {
        addMaterialUserId: this.$store.state.permission.userInfo.id,
        attachmentList: [],
        comment: this.form.comment,
        processInstanceId: this.instanceId,
        taskFiles,
        taskId: this.form.node
      }
      this.uploadLoading = true
      saveApprovalAttach(data)
        .then((res) => {
          if (res.result) {
            iMessage.success(this.language('保存成功'))
            this.attachList.length = 0
            this.$emit('success')
            if (window.opener) {
              window.opener.location.reload()
            }
          }
        })
        .catch(() => {
          iMessage.error(this.language('保存失败'))
          this.uploadLoading = false
        })
    },
    del() {
      const filePathes = this.selectedTableData.map((e) => e.filePath)
      if (filePathes.length === 0) {
        iMessage.error(this.$t('APPROVAL.CHOOSE_LEASET_ONE_ATTACH'))
        return false
      }
      this.onDelete().then(() => {
        this.attachList = this.attachList.filter((e) => {
          return filePathes.indexOf(e.filePath) === -1
        })
        this.page.totalCount = this.attachList.length
      })
    },
    handleUploadSuccess() {},
    handleBeforeUpload() {}
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
  display: flex;
  align-items: center;
  .name {
    margin-right: 124px;
  }

  .item.node {
    width: 255px;
    margin-right: 60px;
  }
  .item.comment {
    flex: 1;
  }
  margin-bottom: 30px;
}
.btns {
  display: flex;
}
.btn-upload {
  margin-right: 10px;
}
</style>
