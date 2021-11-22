<template>
  <iDialog
    title="问卷数据"
    :visible.sync="openBlankDetailsBol"
    width="108.75rem"
    :close-on-click-modal="false"
  >
    <div class="conatiner">
      <div class="button-list">
        <iButton @click="exportAllDetails" class="margin-right20">返回</iButton>
        <iButton @click="exportReport" class="margin0">导出数据</iButton>
        <div class="empty"></div>
        <div class="goback" @click="goback">
          <i class="el-icon-arrow-left"></i>
        </div>
      </div>
      <iEditForm>
        <el-form
          :model="ruleForm"
          ref="ruleForm"
          :hideRequiredAsterisk="true"
          class="form-box"
        >
          <iFormItem prop="userType">
            <div class="operate">
              <iLabel
                :label="$t('用户类型')"
                slot="label"
                class="operate-name"
              ></iLabel>
              <iSelect
                v-model="ruleForm.userType"
                placeholder="全部用户"
                @change="changeUserType($event)"
                class="operate-select"
              >
                <el-option
                  :value="item.value"
                  :label="item.label"
                  v-for="item of presentList"
                  :key="item.value"
                ></el-option>
              </iSelect>
            </div>
          </iFormItem>
        </el-form>
      </iEditForm>
      <div class="table-area">
        <iTableML tooltip-effect="light" :data="tableData" class="table-ml">
          <el-table-column
            show-overflow-tooltip
            type="index"
            align="center"
            label="序号"
            width="80"
          >
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="用户类型"
            width="120"
          >
            <template slot-scope="scope">
              <span>{{ presentListObj[scope.row["userType"]] || "-" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="nameZh"
            align="center"
            label="联系人姓名"
            width="160"
            ><template slot-scope="scope">
              <span>{{ scope.row["nameZh"] || "-" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="userName"
            align="center"
            label="用户登录名"
            width="160"
            ><template slot-scope="scope">
              <span>{{ scope.row["userName"] || "-" }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="SAP号"
            width="120"
            ><template slot-scope="scope">
              <span>{{
                (scope.row.supplierUserDTO &&
                  scope.row.supplierUserDTO["sapNum"]) ||
                "-"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="SVW号"
            width="120"
            ><template slot-scope="scope">
              <span>{{
                (scope.row.supplierUserDTO &&
                  scope.row.supplierUserDTO["svwCode"]) ||
                "-"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="临时号"
            width="120"
            ><template slot-scope="scope">
              <span>{{
                (scope.row.supplierUserDTO &&
                  scope.row.supplierUserDTO["temporaryNum"]) ||
                "-"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="left" label="问题答案"
            ><template slot-scope="scope">
              <span>{{ scope.row["answer"] || "-" }}</span>
            </template>
          </el-table-column>
        </iTableML>
      </div>
    </div>
  </iDialog>
</template>
<script>
import { iDialog, iButton, iSelect, iFormItem, iLabel, iMessage } from "rise";
import iTableML from "@/components/iTableML";
import { questionReportDetail } from "@/api/survey/surveyData.js";
import iEditForm from "@/components/iEditForm";
import { exportFile } from "@/utils/exportFileUtil";
export default {
  components: {
    iDialog,
    iButton,
    iSelect,
    iTableML,
    iFormItem,
    iLabel,
    iEditForm,
  },
  props: {
    openBlankDetailsBol: {
      type: Boolean,
      default: false,
    },
    blankDetails: {
      type: Object,
      default() {
        return {};
      },
    },
    surveyId: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      tableData: [],
      ruleForm: {
        userType: "",
      },
      presentList: [
        {
          label: "全部用户",
          value: "",
        },
        {
          label: "员工用户",
          value: 1,
        },
        {
          label: "供应商用户",
          value: 2,
        },
      ],
      presentListObj: {
        1: "员工用户",
        2: "供应商用户",
      },
    };
  },
  mounted() {
    console.log("blankDetails", this.blankDetails);
    this.query();
  },
  methods: {
    changeUserType(e) {
      this.ruleForm.userType = e;
      this.query();
    },
    query() {
      const data = {
        surveyId: this.surveyId,
        questionId: this.blankDetails.id,
        userType: this.ruleForm.userType,
      };
      questionReportDetail(data).then((res) => {
        this.tableData = [...res.answerDetails];
        console.log("this.tableData", this.tableData);
      });
    },
    goback() {
      this.$emit("backIndexDialog", "blank");
    },
    exportAllDetails() {
      this.goback();
    },
    exportReport() {
      exportFile({
        url: "/rise-survey/surveyService/exportQuestionReport",
        data: {
          questionId: this.blankDetails.id,
          surveyId: this.surveyId,
          userType: this.ruleForm.userType,
        },
        callback: (e) => {
          if (!e) {
            iMessage.error("导出失败");
          }
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__headerbtn {
  display: none !important;
}

.conatiner {
  height: 925px;
  font-family: PingFangSC-Semibold, PingFang SC;
  padding-bottom: 40px;
  .table-area {
    height: 651px;
    overflow-y: auto;
  }
  .operate {
    display: flex;
    height: 35px;
    align-items: center;
    margin-bottom: 31px;
    .operate-select {
      height: 35px;
      width: 300px;
    }
    .operate-name {
      width: 124px;
      height: 35px;
      font-weight: 400;
      color: #000000;
      font-size: 16px;
      text-shadow: 0px 0px 8px rgba(45, 97, 213, 0.18);
      line-height: 35px;
    }
  }
  .button-list {
    position: absolute;
    width: 100%;
    height: 35px;
    right: 40px;
    text-align: right;
    transform: translate(0px, -60px);
    .margin-right20 {
      width: 130px;
      margin-right: 20px;
    }
    .margin0 {
      width: 100px;
      margin: 0;
    }
    .empty {
      display: none;
      position: absolute;
      width: 30px;
      height: 30px;
      background-color: #fff;
      right: 0;
      top: 0;
      transform: translateX(50px);
      z-index: 1;
    }
    .goback {
      position: absolute;
      width: 60px;
      height: 60px;
      background: #1660f1;
      border-radius: 50%;
      top: 462.5px;
      left: 10px;
      cursor: pointer;
      color: #fff;
      text-align: center;
      line-height: 60px;
      font-size: 42px;
    }
  }
}
</style>
