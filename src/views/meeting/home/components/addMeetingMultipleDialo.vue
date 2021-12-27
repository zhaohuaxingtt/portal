<template>
  <!--转派-->
  <iDialog
    :title="$t('MT_PILIANGHUIYICHUANGJIAN')"
    :visible.sync="openAddMultiple"
    width="38.625rem"
    :close-on-click-modal="false"
    :destroy-on-close="true"
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
        <!-- 第一行 start -->
        <!-- <el-row class="form-row">
          <div class="form-item-row1-col1">
            <iFormItem label="会议名称" prop="name">
              <iLabel :label="$t('会议名称')" slot="label"></iLabel>
              <iInput v-model="ruleForm.name" />
            </iFormItem>
          </div>
        </el-row> -->
        <!-- 第一行 end -->
        <!-- 第二行 start -->
        <el-row class="form-row">
          <div class="form-item-row2-col1">
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
          <div class="form-item-row2-col2"></div>
          <div class="form-item-row2-col3">
            <iFormItem label="会议间隔" prop="meetingInterval">
              <iLabel
                :label="$t('MT_HUIYIJIANGE')"
                slot="label"
                required
              ></iLabel>
              <div class="time-box">
                <iSelect
                  v-model="ruleForm.meetingInterval"
                  :placeholder="$t('MT_QINGXUANZEHUIYIJIANGE')"
                >
                  <el-option
                    v-for="(item, index) in intervalList"
                    :key="index"
                    :label="item.label"
                    :value="item.value.toString()"
                  >
                  </el-option>
                </iSelect>
                <span>{{ $t('MT_ZHOUCI') }}</span>
              </div>
            </iFormItem>
          </div>
        </el-row>
        <!-- 第二行 end -->
        <!-- 第三行 start -->
        <el-row class="form-row">
          <div class="form-item-row3-col1">
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
                :picker-options="dateStartPickerOptions"
                :placeholder="$t('MT_QINGXUANZEKAISHISHIJIAN')"
                @change="changeStartDate"
              />
            </iFormItem>
          </div>
          <div class="form-item-row3-col2">{{ $t('MT_TO') }}</div>
          <div class="form-item-row3-col3">
            <iFormItem label="" prop="endDate">
              <iLabel label="" required></iLabel>
              <iDatePicker
                value-format="yyyy-MM-dd"
                type="date"
                v-model="ruleForm.endDate"
                :picker-options="dateEndPickerOptions"
                :placeholder="$t('MT_QINGXUANZEJIESHURIQI')"
              />
            </iFormItem>
          </div>
        </el-row>
        <!-- 第三行 end -->
        <!-- 第四行 start -->
        <el-row class="form-row">
          <div class="form-item-row4-col1">
            <iFormItem label="会议周期" prop="meetingCycle">
              <iLabel
                :label="$t('MT_HUIYIZHOUQI')"
                slot="label"
                required
              ></iLabel>
              <iSelect
                v-model="ruleForm.meetingCycle"
                multiple
                collapse-tags
                :placeholder="$t('MT_QINGXUANZEHUIYIZHOUQI')"
              >
                <el-option
                  v-for="(item, index) in cycleList"
                  :key="index"
                  :label="item.label"
                  :value="item.value.toString()"
                >
                </el-option>
              </iSelect>
            </iFormItem>
          </div>
          <div class="form-item-row4-col2"></div>
          <div class="form-item-row4-col3">
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
              />
            </iFormItem>
          </div>
        </el-row>
        <!-- 第四行 end -->
        <!-- 第五行 start -->
        <el-row class="form-row">
          <div class="form-item-row5-col1">
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
        <!-- 第五行 end -->
        <!-- 第六行 start -->
        <el-row class="form-row">
          <div class="form-item-row6-col1">
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
        <!-- 第六行 end -->
        <!-- 第七行 start -->
        <el-row class="form-row">
          <div class="form-item-row7-col1">
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
        <!-- 第七行 end -->
        <!-- 第八行 start -->
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
        <!-- 第八行 end -->
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
import { baseRulesMultiple, cycleList, intervalList } from './data.js'

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
    openAddMultiple: {
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
      cycleList,
      intervalList,
      ruleForm: {
        name: '',
        meetingTypeId: '',
        startDate: '',
        endDate: '',
        startTime: '',
        meetingPlace: '',
        receiverId: '',
        attendeeId: '',
        attendee: '',
        meetingCycle: [],
        meetingInterval: '',
        isBatch: true
      },
      rules: baseRulesMultiple,
      dateStartPickerOptions: {
        // 日期选择
        disabledDate: (date) => {
          return date < new Date() - 24 * 60 * 60 * 1000
        }
      },
      dateEndPickerOptions: {
        // 日期选择
        disabledDate: (date) => {
          return date < new Date() - 24 * 60 * 60 * 1000
        }
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
        this.ruleForm = {}
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
          addMeeting(formData)
            .then((res) => {
              if (res.code === 200) {
                iMessage.success(this.$t('MT_BAOCUNCHENGGONG'))
              }
              this.$emit('refreshTable')
              this.clearDiolog('submit')
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
    changeStartDate(e) {
      let startDate = new Date(e)
      this.dateEndPickerOptions = {
        disabledDate: (date) => {
          return date < startDate
        }
      }
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
      .time-box {
        width: 250px;
        display: flex;
        align-items: center;
        span {
          width: 35px;
          display: inline-block;
          font-size: 14px;
          margin-left: 10px;
          white-space: nowrap;
        }
      }
    }
    .form-item-row4-col1,
    .form-item-row5-col1,
    .form-item-row6-col1,
    .form-item-row7-col1 {
      width: 538px;
    }
    .form-item-row3-col1 {
      width: 250px;
    }
    .form-item-row3-col2 {
      margin-top: 24px;
      width: 38px;
      text-align: center;
      display: inline-block;
      height: 35px;
      line-height: 35px;
      background: #f8f8fa;
    }
    .form-item-row3-col3 {
      width: 250px;
      ::v-deep .is-required {
        .start {
          display: none;
        }
        .flex-align-center {
          margin-bottom: 10px;
        }
      }
    }
    .form-item-row4-col1 {
      width: 250px;
    }
    .form-item-row4-col2 {
      width: 38px;
    }
    .form-item-row4-col3 {
      width: 250px;
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

/* ::v-deep .el-button--primary.is-plain {
  background: #e8effe;
  color: #1763f7;
} */

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
