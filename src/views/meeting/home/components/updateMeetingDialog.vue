<template>
  <!--转派-->
  <iDialog
    :title="$t('MT_HUIYIXIUGAI')"
    :visible.sync="openUpdate"
    width="38.625rem"
    :close-on-click-modal="false"
    destroy-on-close
    @close="close"
  >
    <iEditForm>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        :hideRequiredAsterisk="true"
        class="form-box"
      >
        <el-row class="form-row">
          <div class="form-item-row1-col1">
            <iFormItem label="会议名称" prop="name">
              <iLabel :label="$t('MT_HUIYIMINGCHENG')" slot="label" required></iLabel>
              <iInput v-model="ruleForm.name" />
            </iFormItem>
          </div>
          <div class="form-item-row1-col2"></div>
          <div class="form-item-row1-col3">
            <iFormItem>
              <p class="type-title">{{ $t('MT_HUIYILEIXING') }}</p>
              <p class="type-name">{{ typeObject[ruleForm.meetingTypeId] }}</p>
            </iFormItem>
          </div>
        </el-row>
        <el-row class="form-row">
          <div class="form-item-row2-col1">
            <iFormItem label="会议日期" prop="startDate">
              <iLabel :label="$t('MT_HUIYIRIQI')" slot="label" required></iLabel>
              <iDatePicker
                value-format="yyyy-MM-dd"
                type="date"
                v-model="ruleForm.startDate"
                :picker-options="datePickerOptions"
                :placeholder="$t('MT_QINGXUANZEJIESHURIQI')"
                @change="changeData"
              />
            </iFormItem>
          </div>
          <div class="form-item-row2-col2"></div>
          <div class="form-item-row2-col3">
            <iFormItem label="开始时间" prop="startTime">
              <iLabel :label="$t('MT_KAISHISHIJIAN')" slot="label" required></iLabel>
              <el-time-picker
                value-format="HH:mm:ss"
                format="HH:mm"
                :placeholder="$t('MT_QINGXUANZEHUIYIKAISHIJIAN')"
                v-model="ruleForm.startTime"
                :picker-options="timePickerOptions"
              />
            </iFormItem>
          </div>
        </el-row>
        <el-row class="form-row">
          <div class="form-item-row3-col1">
            <iFormItem label="会议地址" prop="meetingPlace">
              <iLabel :label="$t('MT_HUIYIDIZHI')" slot="label" required></iLabel>
              <iInput v-model="ruleForm.meetingPlace" />
            </iFormItem>
          </div>
        </el-row>
        <div class="button-list">
          <el-form-item>
            <iButton @click="clearDiolog" plain class="cancel">{{
              $t('LK_QUXIAO')
            }}</iButton>
            <iButton @click="handleSubmit" plain>{{ $t('LK_BAOCUN') }}</iButton>
          </el-form-item>
        </div>
      </el-form>
    </iEditForm>
  </iDialog>
</template>

<script>
import {
  iDialog,
  iInput,
  iFormItem,
  iLabel,
  iButton,
  iDatePicker,
  iMessage
} from 'rise'
import iEditForm from '@/components/iEditForm'
import { updateMeeting, getMeetingById } from '@/api/meeting/home'
import { baseRulesUpdate } from './data.js'
import dayjs from '@/utils/dayjs.js'
import { datestring } from '@/utils/utils.js'

export default {
  components: {
    iDialog,
    iDatePicker,
    iFormItem,
    iInput,
    iLabel,
    iButton,
    iEditForm
  },
  props: {
    openUpdate: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    typeObject: {
      type: Object,
      default: () => {
        return {}
      }
    },
    id: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      ruleForm: {
        name: '',
        startDate: '',
        startTime: '',
        meetingPlace: ''
      },
      rules: baseRulesUpdate,
      datePickerOptions: {
        // 日期选择
        disabledDate: (date) => {
          return date < new Date() - 24 * 60 * 60 * 1000
        }
      },
      timePickerOptions: {
        // 时间选择
        selectableRange: '00:00:00 - 23:59:59'
      }
    }
  },
  mounted() {
    let param = {
      id: this.id
    }
    getMeetingById(param).then((res) => {
      this.ruleForm = res
      this.ruleForm.name = res.name
      this.ruleForm.startDate = res.startDate
      this.ruleForm.endDate = res.endDate
      this.ruleForm.startTime = res.startTime
      this.ruleForm.meetingPlace = res.meetingPlace
      this.ruleForm.id = res.id
      this.ruleForm.meetingTypeId = res.meetingTypeId
      let date = new Date(res.startDate)
      let dateToday = new Date()
      let dateUnuse = date.getMonth().toString() + date.getDate().toString()
      let dateTodayUnuse =
        dateToday.getMonth().toString() + dateToday.getDate().toString()
      if (dateUnuse == dateTodayUnuse) {
        this.timePickerOptions = {
          // 时间选择
          selectableRange:
            dayjs().hour().toString() +
            ':' +
            dayjs().minute().toString() +
            ':00' +
            ' - 23:59:59'
        }
      }
    })
  },
  methods: {
    close() {
      this.$emit('closeDialog', false)
    },
    clearDiolog(sub) {
      if (sub === 'submit') {
        this.$emit('closeDialog', false)
      } else {
        // this.$confirm("是否取消编辑?", "提示", {
        //   confirmButtonText: "是",
        //   cancelButtonText: "否",
        //   type: "warning",
        // }).then(() => {
        this.$emit('closeDialog', false)
        // });
      }
    },
    handleSubmit() {
      // this.$confirm("是否保存该会议?", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // }).then(() => {
      this.submitForm('ruleForm')
      // });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formData = this.ruleForm
          updateMeeting(formData)
            .then((res) => {
              if (res.code === 200) {
                iMessage.success('保存成功')
              }
              this.clearDiolog('submit')
              this.$emit('refreshTable')
            })
            .catch((err) => {
              console.log('err', err)
            })
        } else {
          return false
        }
      })
    },
    changeAttendee(e) {
      this.attendeeList.forEach((item) => {
        if (item.id == e) {
          this.ruleForm.attendee = item.attendeeName
        }
      })
    },
    changeData(e) {
      if (datestring() == e) {
        this.timePickerOptions = {
          // 时间选择
          selectableRange:
            dayjs().hour().toString() +
            ':' +
            dayjs().minute().toString() +
            ':00' +
            ' - 23:59:59'
        }
      } else {
        this.timePickerOptions = {
          // 时间选择
          selectableRange: '00:00:00' + ' - 23:59:59'
        }
      }
      this.ruleForm.startTime = ''
    }
  }
}
</script>

<style scoped lang="scss">
.form-box {
  padding-bottom: 30px;

  .form-row {
    display: flex;
    justify-content: start;
    margin-bottom: 28px;

    .form-item-row1-col1 {
      width: 250px;
    }
    .form-item-row1-col2 {
      width: 60px;
    }
    .form-item-row1-col3 {
      width: 250px;
      padding-left: 50px;

      .type-title {
        font-size: 14px;
        color: #909399;
        letter-spacing: 0;
        line-height: 16px;
        margin-bottom: 4px;
      }

      .type-name {
        font-size: 14px;
        color: #000000;
        letter-spacing: 0;
        line-height: 35px;
        padding-left: 20px;
      }
    }
    .form-item-row2-col1 {
      width: 250px;
    }
    .form-item-row2-col2 {
      width: 38px;
    }
    .form-item-row2-col3 {
      width: 250px;
    }
    .form-item-row3-col1 {
      width: 250px;
    }
    .el-input {
      height: 35px;
      width: 100%;

      ::v-deep .el-input__inner {
        height: 35px !important;
        box-shadow: 0 0 3px rgb(0 38 98 / 0.15);
        border-color: transparent;

        &:focus {
          border: 0;
        }
      }
    }
  }

  .button-list {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .el-form-item {
      margin-bottom: 0;
      .el-button {
        height: 35px;
        width: 100px;
      }
      .cancel {
        margin-right: 20px;
      }
    }
  }
}
::v-deep .el-button--primary.is-plain {
  background: #e8effe;
  color: #1763f7;
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
