<template>
  <iDialog
    :visible.sync="dialogStatusManageObj.openSplitDialog"
    width="23.75rem"
    :close-on-click-modal="false"
    @close="close"
  >
    <iEditForm class="content">
      <div class="delete-info">{{$t('确认拆分该议题吗?')}}</div>
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
import { spiltThemen } from '@/api/meeting/details'

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
    },
    meetingInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    clearDiolog() {
      this.close()
    },
    handleSubmit() {
      this.loading = true;
      const data = {
        meetingId: this.meetingInfo.id,
        themenId: this.selectedTableData[0].id
      }
      spiltThemen(data)
        .then(() => {
          this.loading = false;
          iMessage.success('拆分成功')
          this.$emit('flushTable')
          this.close()
        })
        .catch((err) => {
          this.loading = false;
          iMessage.error('拆分失败 ' + err)
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
  background-image: url('../../../../assets/images/clip.png');
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
      line-height: 35px;
      padding: 0;
    }

    .confirm {
      width: 100px;
      height: 35px;
      flex-grow: 1;
      flex-shrink: 0;
      margin-left: 0;
      line-height: 35px;
      padding: 0;
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
