<template>
  <iDialog
    :visible.sync="dialogStatusManageObj.openDeleteTopDialog"
    width="23.75rem"
    :close-on-click-modal="false"
    @close="close"
  >
    <iEditForm class="content">
      <div class="delete-info">{{ $t('确认删除该议题吗?') }}</div>
      <div class="button-list">
        <iButton @click="clearDiolog" class="cancel"
          >{{ $t('LK_QUXIAO') }}
        </iButton>
        <iButton @click="handleSubmit" class="confirm" :loading="loading"
          >{{ $t('LK_QUEREN') }}
        </iButton>
      </div>
    </iEditForm>
  </iDialog>
</template>

<script>
import { iButton, iDialog, iMessage } from 'rise'
import iEditForm from '@/components/iEditForm'
import { deleteThemen } from '@/api/meeting/details'

export default {
  components: {
    iDialog,
    iButton,
    iEditForm
  },
  props: {
    dialogStatusManageObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    selectedTableData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    clearDiolog() {
      this.close()
    },
    handleSubmit() {
      this.loading = true
      const data = { ...this.selectedTableData[0] }
      deleteThemen(data)
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            iMessage.success('删除成功')
          }

          this.$emit('flushTable')
          this.close()
        })
        .catch(() => {
          this.loading = false
          // iMessage.error('删除失败')
          this.$emit('flushTable')
          this.close()
        })
    },
    close() {
      this.$emit('input', false)
      this.$emit('closeDialog', false)
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__header {
  padding-top: 20px;
  padding-bottom: 20px;
}

.content {
  /* background-color: red; */
  background-image: url('../../../../assets/images/delete.png');
  background-repeat: no-repeat;
  background-position: center top;
  padding-top: 74px;
  background-size: 64px 64px;

  .button-list {
    display: flex;
    justify-content: center;
    padding: 0 40px 40px;

    .cancel {
      flex-grow: 1;
      flex-shrink: 0;
      margin-right: 20px;
      width: 100px;
      height: 35px;
      padding: 0;
      line-height: 35px;
    }

    .confirm {
      width: 100px;
      height: 35px;
      flex-grow: 1;
      flex-shrink: 0;
      margin-left: 0;
      padding: 0;
      line-height: 35px;
    }
  }

  .delete-info {
    margin: 0 auto 30px;
    width: 134px;
    height: 35px;
    font-size: 14px;
    color: #000;
    line-height: 35px;
    text-align: center;
    white-space: nowrap;
  }
}
</style>
