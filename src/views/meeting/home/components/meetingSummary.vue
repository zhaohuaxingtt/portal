
<template>
  <!--转派-->
  <iDialog
    title="会议修改"
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
              <iLabel :label="$t('会议名称')" slot="label"></iLabel>
              <iInput v-model="ruleForm.name" />
            </iFormItem>
          </div>
          <div class="form-item-row1-col2"></div>
          <div class="form-item-row1-col3">
            <iFormItem>
              <p class="type-title">会议类型</p>
              <p class="type-name">{{typeObject[ruleForm.meetingTypeId]}}</p>
            </iFormItem>
          </div>
        </el-row>
        <el-row class="form-row">
          <div class="form-item-row2-col1">
            <iFormItem label="会议日期" prop="startDate">
              <iLabel :label="$t('会议日期')" slot="label" required></iLabel>
              <iDatePicker
                value-format="yyyy-MM-dd"
                type="date"
                v-model="ruleForm.startDate"
                :picker-options="datePickerOptions"
                placeholder="请选择会议开始日期"
              />
            </iFormItem>
          </div>
          <div class="form-item-row2-col2"></div>
          <div class="form-item-row2-col3">
            <iFormItem label="开始时间" prop="startTime">
              <iLabel :label="$t('开始时间')" slot="label" required></iLabel>
              <el-time-picker
                value-format="hh:mm:ss"
                placeholder="请选择会议开始时间"
                v-model="ruleForm.startTime"
              />
            </iFormItem>
          </div>
        </el-row>
        <el-row class="form-row">
          <div class="form-item-row3-col1">
            <iFormItem label="会议地址" prop="meetingPlace">
              <iLabel :label="$t('会议地址')" slot="label" required></iLabel>
              <iInput v-model="ruleForm.meetingPlace" />
            </iFormItem>
          </div>
        </el-row>
        <div class="button-list">
          <el-form-item>
            <iButton @click="clearDiolog" plain class="cancel">{{
              $t("LK_QUXIAO")
            }}</iButton>
            <iButton type="primary" @click="handleSubmit" plain>{{
              '修改'
            }}</iButton>
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
  iMessage,
} from "rise";
import iEditForm from "@/components/iEditForm";
import { updateMeeting, getMeetingById } from "@/api/meeting/home";
import { baseRulesUpdate } from "./data.js";

export default {
  components: {
    iDialog,
    iDatePicker,
    iFormItem,
    iInput,
    iLabel,
    iButton,
    iEditForm,
  },
  props: {
    openUpdate: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
    typeObject: {
      type: Object,
      default: () => {
        return {};
      },
    },
    id: {
      type: String,
      default: () => {
        return '';
      },
    },
  },
  data() {
    return {
      ruleForm: {
        name: "",
        startDate: "",
        startTime: "",
        meetingPlace: "",
      },
      rules: baseRulesUpdate,
      datePickerOptions: { // 日期选择
        disabledDate: (date) => {
          return date < new Date() - 24*60*60*1000;
        }
      }
    };
  },
  mounted() {
    let param = {
      id: this.id,
    }
    getMeetingById(param).then((res) => {
      this.ruleForm = res;
      this.ruleForm.name = res.name
      this.ruleForm.startDate = res.startDate
      this.ruleForm.endDate = res.endDate
      this.ruleForm.startTime = res.startTime
      this.ruleForm.meetingPlace = res.meetingPlace
      this.ruleForm.id = res.id
      this.ruleForm.meetingTypeId = res.meetingTypeId
    })
  },
  methods: {
    close() {
      this.$emit("closeDialog", false);
    },
    clearDiolog(sub) {
      if (sub === "submit") {
        this.$emit("closeDialog", false);
      } else {
        // this.$confirm("是否取消编辑?", "提示", {
        //   confirmButtonText: "是",
        //   cancelButtonText: "否",
        //   type: "warning",
        // }).then(() => {
          this.$emit("closeDialog", false);
        // });
      }
    },
    handleSubmit() {
      // this.$confirm("是否保存该会议?", "提示", {
      //   confirmButtonText: "是",
      //   cancelButtonText: "否",
      //   type: "warning",
      // }).then(() => {
        this.submitForm("ruleForm");
      // });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let formData = this.ruleForm;
          updateMeeting(formData)
            .then((res) => {
              if (res) {
                this.clearDiolog("submit");
                iMessage.success("保存成功");
                this.$emit("refreshTable");
              } else {
                iMessage.success("保存失败");
                this.clearDiolog("submit");
              }
            })
            .catch((err) => {
              console.log("err", err);
            });
        } else {
          return false;
        }
      });
    },
    changeAttendee(e,) {
      this.attendeeList.forEach(item => {
        if (item.id == e) {
          this.ruleForm.attendee = item.attendeeName;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">

.form-box {
  padding-bottom: 30px;

  .form-row {
    display: flex;
    justify-content: start;
    margin-bottom: 20px;

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
