<template>
  <!--转派-->
  <iDialog
    :title="
      editOrAdd === 'add'
        ? $t('MT_XINZENGXIUXI')
        : editOrAdd === 'look'
        ? $t('MT_CHAKANXIUXI')
        : $t('MT_BIANJIXIUXI')
    "
    :visible.sync="dialogStatusManageObj.openAddRestDialog"
    width="20.625rem"
    :close-on-click-modal="false"
    @close="close"
  >
    <iEditForm>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        :hideRequiredAsterisk="true"
      >
        <div class="meeting">
          <div class="meeting-type">{{$t('MT_YITILEIXING')}}</div>
          <div class="meeting-rest">
            <!-- {{ typeObject[meetingInfo.meetingTypeId] }} -->
            {{$t('MT_HUIYIXIUXI')}}
          </div>
        </div>
        <iFormItem label="议题名称" prop="topic" :hideRequiredAsterisk="true">
          <iLabel :label="$t('MT_YITIMINGCHENG')" slot="label" required></iLabel>
          <iInput
            v-model="ruleForm.topic"
            :disabled="Boolean(editOrAdd === 'look') || ruleForm.state === '02'"
          ></iInput>
        </iFormItem>
        <iFormItem label="用时" prop="duration" class="time">
          <iLabel :label="$t('MT_YONGSHI')" slot="label" required></iLabel>
          <div class="time-box">
            <iInput
              v-model="ruleForm.duration"
              type="number"
              :disabled="Boolean(editOrAdd === 'look')"
            ></iInput>
            <span>{{$t('MT_FENZHONG')}}</span>
          </div>
        </iFormItem>
        <div class="button-list" v-if="editOrAdd !== 'look'">
          <iButton @click="clearDiolog" class="cancel">{{
            $t('LK_QUXIAO')
          }}</iButton>
          <iButton @click="handleSubmit" class="save" :loading="loading">{{
            $t('LK_BAOCUN')
          }}</iButton>
        </div>
        <div class="button-list-look" v-else></div>
      </el-form>
    </iEditForm>
  </iDialog>
</template>

<script>
import { iDialog, iInput, iFormItem, iLabel, iButton, iMessage } from 'rise'
import iEditForm from '@/components/iEditForm'
import { baseRules } from './data'
import { addRestThemen, updateRestThemen } from '@/api/meeting/details'

export default {
  components: {
    iDialog,
    iFormItem,
    iInput,
    iLabel,
    iEditForm,
    iButton
  },
  props: {
    lookThemenObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    editOrAdd: {
      type: String,
      default: () => {
        return 'add'
      }
    },
    selectedTableData: {
      type: Array,
      default: () => {
        return []
      }
    },
    typeObject: {
      type: Object,
      default: () => {
        return {}
      }
    },
    dialogStatusManageObj: {
      type: Object,
      default: () => {
        return {}
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
      ruleForm: {
        topic: '休息 Break',
        duration: 10
      },
      rules: baseRules
    }
  },
  created() {
    if (this.editOrAdd === 'edit') {
      this.ruleForm = { ...this.selectedTableData[0] }
      return
    }
    if (this.editOrAdd === 'look') {
      this.ruleForm = this.lookThemenObj
      return
    }
    this.ruleForm = { ...this.ruleForm, duration: 10 }
  },
  methods: {
    close() {
      this.$emit('input', false)
      this.$emit('closeDialog', false)
    },
    clearDiolog(sub) {
      if (sub === 'submit') {
        this.close()
      } else {
        // this.$confirm("是否取消编辑?", "提示", {
        //   confirmButtonText: "是",
        //   cancelButtonText: "否",
        //   type: "warning",
        // }).then(() => {
        this.close()
        // });
      }
    },
    handleSubmit() {
      this.loading = true
      // this.$confirm("是否保存休息议题？", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // }).then(() => {
      this.submitForm('ruleForm')
      // });
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.editOrAdd === 'edit') {
            const formData = {
              // ...this.meetingInfo,
              ...this.ruleForm,
              // itemNo: this.meetingInfo.themens.length + 1,
              meetingId: this.meetingInfo.id,
              isBreak: true,
              themenId: this.selectedTableData[0]
                ? this.selectedTableData[0].id
                : null
              // state: "04",
            }
            //开始保存
            updateRestThemen(formData)
              .then(data => {
                if (data) {
                  this.loading = false
                  this.clearDiolog('submit')
                  iMessage.success('保存成功')
                  this.$emit('flushTable')
                } else {
                  this.loading = false
                  this.clearDiolog('submit')
                  iMessage.error('error')
                  this.$emit('flushTable')
                }
              })
              .catch(err => {
                console.log('err', err)
              })
          } else {
            const formData = {
              // ...this.meetingInfo,
              ...this.ruleForm,
              id: '',
              // itemNo: this.meetingInfo.themens.length + 1,
              meetingId: this.meetingInfo.id,
              isBreak: true,
              themenId: this.selectedTableData[0]
                ? this.selectedTableData[0].id
                : null
              // state: "04",
            }
            //开始保存
            addRestThemen(formData)
              .then(data => {
                if (data) {
                  this.loading = false
                  this.clearDiolog('submit')
                  iMessage.success('保存成功')
                  this.$emit('flushTable')
                } else {
                  this.loading = false
                  this.clearDiolog('submit')
                  iMessage.error('error')
                  this.$emit('flushTable')
                }
              })
              .catch(err => {
                this.loading = false
                console.log('err', err)
              })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.time {
  display: flex;
  flex-direction: column;
  .time-box {
    display: flex;
    align-items: center;
    span {
      width: 28px;
      font-size: 14px;
      margin-left: 20px;
      flex-shrink: 0;
      flex-grow: 1;
      display: block;
      white-space: nowrap;
    }
  }
}
.meeting {
  height: 62px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  .meeting-type {
    height: 20px;
    color: #909399;
    line-height: 20px;
    text-align: center;
  }
  .meeting-rest {
    height: 35px;
    color: #000;
    line-height: 35px;
    text-align: center;
    margin-left: 20px;
  }
}
.button-list {
  padding: 0 15px;
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 30px;
  .cancel,
  .save {
    width: 100px;
    height: 35px;
    flex-grow: 1;
    flex-shrink: 0;
    padding: 0;
    line-height: 35px;
  }
  .save {
    margin-left: 20px;
  }
}
.button-list-look {
  width: 100%;
  height: 15px;
}
/* ::v-deep .is-required {
  .flex-align-center {
    position: relative;
    .start {
      position: absolute;
      display: block;
      width: 10px;
      height: 10px;
      background: #e30d0d;
      border-radius: 5px;
      left: -20px;
      overflow: hidden;
    }
  }
} */
</style>
