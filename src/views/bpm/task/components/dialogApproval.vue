<template>
  <iDialog :visible.sync="dialogFormVisible" @close="onClose">
    <div slot="title">
      <span class="name">{{ dialogTitle }}</span>
      <span class="required">*</span>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="comment">
        <iInput
          v-model="ruleForm.comment"
          type="textarea"
          :rows="10"
          autocomplete="off"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <iButton type="default" :loading="loading" size="small" @click="onClose">
        {{ $t('APPROVAL.CANCEL') }}
      </iButton>
      <iButton type="default" :loading="loading" size="small" @click="onSave">
        {{ $t('APPROVAL.OK') }}
      </iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iInput, iButton, iMessage } from 'rise'
import {
  completeApproval,
  stageCompleteApproval
} from '@/api/approval/myApproval'
import { BPM_CATEGORY_RENAME_YIYI_LIST } from '@/constants'
export default {
  name: 'recallDialog',
  components: { iDialog, iInput, iButton },
  props: {
    item: {
      type: Object,
      require: true
    },
    visible: {
      type: Boolean,
      default: false,
      require: true
    },
    type: {
      type: Number,
      require: true
    },
    title: { type: String }
  },
  computed: {
    dialogTitle() {
      if (this.type === 2) {
        return this.$t('APPROVAL.REFUSE')
      }
      if (this.type === 3) {
        if (this.title) {
          return this.title
        }
        return this.$t('APPROVAL.APPEND_DATA')
      }
      return this.$t('APPROVAL.APPROVEL')
    }
  },
  data() {
    return {
      ruleForm: { comment: '' },
      rules: {
        comment: [
          { required: true, message: '请输入审批意见', trigger: 'blur' }
        ]
      },
      dialogFormVisible: false,
      loading: false
    }
  },
  created() {
    this.dialogFormVisible = this.visible
  },
  methods: {
    onSave() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.complete()
        }
      })
    },
    complete() {
      //agree  审批结果 1同意；2拒绝；3补充材料
      const defaultComment = BPM_CATEGORY_RENAME_YIYI_LIST.includes(
        this.item.procDefKey
      )
        ? {
            1: '无异议',
            2: '拒绝',
            3: '有异议'
          }
        : {
            1: '同意',
            2: '拒绝',
            3: '补充材料'
          }

      const data = {
        agree: this.type,
        taskAssignee: this.$store.state.permission.userInfo.id,
        taskId: this.item.taskId,
        variables: {},
        comment:
          `【${defaultComment[this.type.toString()]}】` + this.ruleForm.comment
      }
      console.log('data', data)
      this.loading = true
      const approvalResult = BPM_CATEGORY_RENAME_YIYI_LIST.includes(
        this.item.procDefKey
      )
        ? stageCompleteApproval(data)
        : completeApproval(data)
      approvalResult
        .then((res) => {
          this.loading = false
          if (res.result) {
            iMessage.success(this.$t('APPROVAL.APPROVAL_SUCCESS'))
            // this.$router.resolve({})
            this.$emit('success')
          } else {
            iMessage.error(this.$t('APPROVAL.APPROVAL_FAILED'))
          }
        })
        .catch((err) => {
          console.log('err', err)
          this.loading = false
          iMessage.error(this.$t('APPROVAL.APPROVAL_FAILED'))
        })
    },
    onClose() {
      this.$emit('close')
    }
  },
  watch: {
    visible(val) {
      this.dialogFormVisible = val
    }
  }
}
</script>

<style lang="scss" scoped>
.required {
  color: $color-update;
}
.name {
  font-size: 18px;
  font-weight: bold;
  margin-right: 2px;
}
</style>
