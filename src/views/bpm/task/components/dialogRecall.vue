<template>
  <iDialog
    :title="language('撤回理由')"
    :visible.sync="dialogFormVisible"
    @close="onClose"
  >
    <div v-loading="loading">
      <iInput v-model="reason" type="textarea" :rows="10" autocomplete="off" />
    </div>
    <div slot="footer" class="dialog-footer">
      <iButton type="info" :loading="loading" @click="onClose">
        {{ language('取消') }}
      </iButton>
      <iButton type="primary" :loading="loading" @click="recall">
        {{ language('确定') }}
      </iButton>
    </div>
  </iDialog>
</template>

<script>
import { iDialog, iInput, iButton } from 'rise'
import { recall } from '@/api/approval/myApplication'
export default {
  name: 'recallDialog',
  components: { iDialog, iInput, iButton },
  props: {
    instanceId: {
      type: String,
      require: true
    },
    visible: {
      type: Boolean,
      default: false,
      require: true
    }
  },
  data() {
    return {
      reason: '',
      dialogFormVisible: false,
      loading: false
    }
  },
  created() {
    this.dialogFormVisible = this.visible
  },
  methods: {
    recall() {
      const data = {
        processInstanceId: this.instanceId,
        deleteReason: this.reason
      }
      this.loading = true

      recall(data)
        .then((res) => {
          if (res.result) {
            this.$message.success(this.language('撤回成功'))
            this.$emit('success')
          } else {
            this.$message.error(res.desZh || this.language('撤回失败'))
          }
          this.loading = false
        })
        .catch((err) => {
          console.log('err', err)
          this.loading = false
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

<style lang="scss" scoped></style>
