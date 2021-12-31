<template>
  <!--转派-->
  <iDialog
    :title="$t('MT_HUIYICHUANGJIAN')"
    :visible.sync="openAddSingle"
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
          <!-- <div class="form-item-row1-col1">
            <iFormItem label="会议名称" prop="name">
              <iLabel :label="$t('会议名称')" slot="label"></iLabel>
              <iInput v-model="ruleForm.name" />
            </iFormItem>
          </div>
          <div class="form-item-row1-col2"></div> -->
          <div class="form-item-row1-col3">
            <iFormItem label="会议类型" prop="meetingTypeId">
              <iLabel
                :label="$t('MT_HUIYILEIXING')"
                slot="label"
                required
              ></iLabel>
              <iSelect
                v-model="ruleForm.meetingTypeId"
                :placeholder="$t('MT_QINGXUANZEHUIYILEIXNG')"
                @change="handleChangeSelect"
              >
                <el-option
                  v-for="(item, index) in meetingTypeList"
                  :key="index"
                  :label="item.name"
                  :value="item.id.toString()"
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </div>
        </el-row>
        <el-row class="form-row">
          <div class="form-item-row2-col1">
            <iFormItem label="会议日期" prop="startDate">
              <iLabel
                :label="$t('MT_HUIYIRIQI')"
                slot="label"
                required
              ></iLabel>
              <iDatePicker
                value-format="yyyy-MM-dd"
                type="date"
                v-model="ruleForm.startDate"
                :picker-options="datePickerOptions"
                :placeholder="$t('MT_QINGXUANZEKAISHISHIJIAN')"
                @change="changeData"
              />
            </iFormItem>
          </div>
          <div class="form-item-row2-col2"></div>
          <div class="form-item-row2-col3">
            <iFormItem label="开始时间" prop="startTime">
              <iLabel
                :label="$t('MT_KAISHISHIJIAN')"
                slot="label"
                required
              ></iLabel>
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
              <iLabel
                :label="$t('MT_HUIYIDIZHI')"
                slot="label"
                required
              ></iLabel>
              <iInput v-model="ruleForm.meetingPlace" />
            </iFormItem>
          </div>
        </el-row>
        <el-row class="form-row">
          <div class="form-item-row4-col1">
            <iFormItem label="收件人" prop="receiverId">
              <iLabel
                :label="$t('MT_SHOUJIANREN')"
                slot="label"
                required
              ></iLabel>
              <iSelect
                v-model="ruleForm.receiverId"
                :placeholder="$t('MT_QINGXUANZESHOUJIANREN')"
              >
                <el-option
                  v-for="(item, index) in receiverListShow"
                  :key="index"
                  :label="item.groupName"
                  :value="item.id.toString()"
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </div>
        </el-row>
        <el-row class="form-row">
          <div class="form-item-row5-col1">
            <iFormItem label="与会人" prop="attendeeId">
              <iLabel :label="$t('MT_YUHUIREN')" slot="label" required></iLabel>
              <iSelect
                v-model="ruleForm.attendeeId"
                @change="changeAttendee"
                :placeholder="$t('MT_QINGXUANZEYUHUIREN')"
              >
                <el-option
                  v-for="(item, index) in attendeeListShow"
                  :key="index"
                  :label="item.groupName"
                  :value="item.id.toString()"
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </div>
        </el-row>
        <!-- <el-row class="form-row">
          <iInput
            type="textarea"
            :rows="3"
            placeholder=""
            v-model="ruleForm.attendee"
          />
        </el-row> -->
        <el-row class="form-row">
          <iFormItem prop="attendee" class="form-item-row8-col1">
            <iInput
              type="textarea"
              :rows="3"
              placeholder=""
              v-model="ruleForm.attendee"
            />
          </iFormItem>
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
  iSelect,
  iDatePicker,
  iMessage
} from 'rise'
import iEditForm from '@/components/iEditForm'
import { addMeeting } from '@/api/meeting/home'
// import { baseRules } from './data.js'
import dayjs from '@/utils/dayjs.js'
import { datestring } from '@/utils/utils.js'

export default {
  components: {
    iDialog,
    iSelect,
    iDatePicker,
    iFormItem,
    iInput,
    iLabel,
    iButton,
    iEditForm
  },
  props: {
    openAddSingle: {
      type: Boolean,
      default: () => {
        return false
      }
    },
    meetingTypeList: {
      type: Array,
      default: () => {
        return []
      }
    },
    attendeeList: {
      type: Array,
      default: () => {
        return []
      }
    },
    receiverList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      attendeeListShow: [],
      receiverListShow: [],
      ruleForm: {
        name: '',
        meetingTypeId: '',
        startDate: '',
        startTime: '',
        meetingPlace: '',
        receiverId: '',
        attendeeId: '',
        attendee: '',
        isBatch: false,
        timeDisabled: true
      },
      rules: {
        meetingTypeId: [
          {
            required: true,
            message: this.$t('MT_QINGXUANZEHUIYILEIXNG'),
            trigger: 'blur'
          }
        ],
        startDate: [
          {
            required: true,
            message: this.$t('MT_QINGXUANZEKAISHIRIQI'),
            trigger: 'change'
          }
        ],
        endDate: [
          {
            required: true,
            message: this.$t('MT_QINGXUANZEJIESHURIQI'),
            trigger: 'change'
          }
        ],
        startTime: [
          {
            required: true,
            message: this.$t('MT_QINGXUANZEKAISHISHIJIAN'),
            trigger: 'change'
          }
        ],
        meetingPlace: [
          {
            required: true,
            message: this.$t('MT_QINGSHURUHUIYIDIZHI'),
            trigger: 'blur'
          },
          {
            min: 1,
            max: 255,
            message: this.$t('MT_ZUIDACHANGDU255ZIFU'),
            trigger: 'blur'
          }
        ],
        receiverId: [
          {
            required: true,
            message: this.$t('MT_QINGXUANZESHOUJIANREN'),
            trigger: 'change'
          }
        ],
        attendeeId: [
          {
            required: true,
            message: this.$t('MT_QINGXUANZEYUHUIREN'),
            trigger: 'change'
          }
        ],
        attendee: [
          {
            required: true,
            message: this.$t('MT_QINGSHURUYUHUIREN'),
            trigger: 'blur'
          },
          {
            min: 1,
            max: 1024,
            message: this.$t('MT_ZUIDACHANGDU1024ZIFU'),
            trigger: 'change'
          }
        ]
      },
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
  computed: {
    attendeeInfo() {
      return {
        attendeeList: this.attendeeList,
        meetingTypeId: this.ruleForm.meetingTypeId
      }
    },
    receiverInfo() {
      return {
        receiverList: this.receiverList,
        meetingTypeId: this.ruleForm.meetingTypeId
      }
    }
  },
  watch: {
    attendeeInfo: {
      handler(attendeeInfoObj) {
        this.attendeeListShow = attendeeInfoObj.attendeeList.filter(
          (item) =>
            Number(item.meetingTypeId) === Number(attendeeInfoObj.meetingTypeId)
        )
      },
      immediate: true,
      deep: true
    },
    receiverInfo: {
      handler(receiverInfoObj) {
        this.receiverListShow = receiverInfoObj.receiverList.filter(
          (item) =>
            Number(item.meetingTypeId) === Number(receiverInfoObj.meetingTypeId)
        )
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleChangeSelect() {
      this.ruleForm.receiverId = ''
      this.ruleForm.attendeeId = ''
      this.ruleForm.attendee = ''
    },
    close() {
      this.$emit('closeDialog', false)
    },
    clearDiolog(sub) {
      if (sub === 'submit') {
        this.$emit('closeDialog', false)
      } else {
        // this.$confirm("是否取消新增?", "提示", {
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
          formData.endDate = this.ruleForm.startDate
          addMeeting(formData)
            .then((res) => {
              if (res) {
                this.clearDiolog('submit')
                iMessage.success(this.$t('MT_BAOCUNCHENGGONG'))
                this.$emit('refreshTable')
              } else {
                iMessage.success(this.$t('MT_BAOCUNSHIBAI'))
                this.clearDiolog('submit')
              }
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
      // let date = new Date();
      // let yy = date.getFullYear();
      // let mm = date.getMonth() >= 10 ? (date.getMonth() + 1).toString() : '0' + (date.getMonth() + 1);
      // let dd = date.getDate() >= 10 ? date.getDate().toString() : '0' + date.getDate();
      // let yymmdd = yy + '-' + mm + '-' + dd;
      // if (yymmdd == e) {
      //   this.timePickerOptions = { // 时间选择
      //     selectableRange: dayjs().hour().toString() + ':' + dayjs().minute().toString() + ":00" + ' - 23:59:59',
      //   }
      // }
      // this.ruleForm.startTime = '';
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
    justify-content: center;
    margin-bottom: 28px;

    .form-item-row1-col1 {
      width: 298px;
    }
    .form-item-row1-col2 {
      width: 60px;
    }
    .form-item-row1-col3 {
      /* width: 180px; */
      width: 538px;
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
    .form-item-row3-col1,
    .form-item-row4-col1,
    .form-item-row5-col1 {
      width: 538px;
    }
    .form-item-row8-col1 {
      width: 538px;
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
::v-deep .el-button {
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
