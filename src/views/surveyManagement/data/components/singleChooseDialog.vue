<template>
  <iDialog
    title="问卷数据"
    :visible.sync="openSingleChooseDetailsBol"
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
                @change="changeUserType($event)"
                v-model="ruleForm.userType"
                placeholder="全部用户"
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
      <el-tabs v-model="activeName" @tab-click="clickTabs">
        <el-tab-pane
          :label="item.name"
          :name="'first' + index"
          v-for="(item, index) of arrobj"
          :key="index"
          class="tab-item set-item"
        >
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
                ><template slot-scope="scope">
                  <span>{{
                    presentListObj[scope.row["userType"]] || "-"
                  }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="联系人姓名"
                width="160"
                ><template slot-scope="scope">
                  <span>{{ scope.row["nameZh"] || "-" }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="用户登录名"
                width="160"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row["userName"] || "-" }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="供应商/部门名称"
                width="316"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row["department"] || "-" }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="邮箱"
                width="207"
              >
                <template slot-scope="scope">
                  <span>{{ scope.row["email"] || "-" }}</span>
                </template>
              </el-table-column>
              <el-table-column
                show-overflow-tooltip
                align="center"
                label="SAP号"
                width="207"
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
                width="207"
              >
                <template slot-scope="scope">
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
                width="207"
              >
                <template slot-scope="scope">
                  <span>{{
                    (scope.row.supplierUserDTO &&
                      scope.row.supplierUserDTO["temporaryNum"]) ||
                    "-"
                  }}</span>
                </template>
              </el-table-column>
            </iTableML>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </iDialog>
</template>
<script>
import { iDialog, iButton, iSelect, iMessage, iFormItem, iLabel } from "rise";
import iTableML from "@/components/iTableML";
import { questionReportDetail } from "@/api/survey/surveyData.js";
import { exportFile } from "@/utils/exportFileUtil";
import iEditForm from "@/components/iEditForm";
import store from '@/store'
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
    openSingleChooseDetailsBol: {
      type: Boolean,
      default: false,
    },
    chooseDetails: {
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
      activeName: "first0",
      arrobj: [],
      optionDetails: [],
      initTableData: [],
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
    if (this.chooseDetails.answerReports == null) {
      this.arrobj = [];
    } else {
      this.arrobj = [...this.chooseDetails.answerReports];
    }
    this.arrobj.unshift({
      name: "全部",
    });
    this.arrobj.pop();
    this.query();
  },
  methods: {
    changeUserType(e) {
      this.ruleForm.userType = e;
      this.query();
    },
    clickTabs() {
      const index = Number(this.activeName.split("first")[1]);
      const currentObj = this.optionDetails.find((item) => {
        return item.name === this.arrobj[index].name;
      });
      if (currentObj) {
        this.tableData = currentObj.answerDetails
          ? currentObj.answerDetails
          : [];
      } else {
        this.tableData = this.initTableData;
      }
    },
    query() {
      const data = {
        surveyId: this.surveyId,
        questionId: this.chooseDetails.id,
        userType: this.ruleForm.userType,
      };
      questionReportDetail(data).then((res) => {
        let arr = [];
        let obj = {};
        this.optionDetails = res.optionDetails;
        res.optionDetails.forEach((item) => {
          if (item.answerDetails) {
            arr = arr.concat(item.answerDetails);
          }
        });
        this.tableData = arr.reduce((cur, next) => {
          if (!obj[next.id]) {
            obj[next.id] = true;
            cur.push(next);
          }
          return cur;
        }, []);
        this.initTableData = [...this.tableData];
      });
    },
    goback() {
      this.$emit("backIndexDialog", "single");
    },
    exportAllDetails() {
      this.goback();
    },
    exportReport() {
      exportFile({
        url: process.env.VUE_APP_SURVEY+`/surveyService/exportQuestionReport?userId=`+store.state.permission.userInfo.id,
        // url: "/surveyApi/surveyService/exportQuestionReport",
        data: {
          questionId: this.chooseDetails.id,
          surveyId: this.surveyId,
          userType: this.ruleForm.userType,
        },
        // callback: (e) => {
        //   if (!e) {
        //     iMessage.error("导出失败");
        //   }
        // },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep .el-dialog__headerbtn {
  display: none !important;
}
::v-deep .el-tabs__header {
  margin-bottom: 20px;
  height: 28px;
  display: flex;
  align-items: center;

  .el-tabs__nav-wrap {
    &::after {
      height: 0px !important;
    }
    .el-tabs__item {
      // padding: 0 49px;
      height: 28px;
      line-height: 28px;
      font-size: 20px;
      font-weight: 400;
      color: #727272;
      text-shadow: 0px 0px 8px rgba(45, 97, 213, 0.18);
    }
    .is-active {
      position: relative;
      font-size: 20px;
      font-weight: 600;
      color: #000000;
      text-shadow: 0px 0px 8px rgba(45, 97, 213, 0.18);
    }
    .el-tabs__active-bar {
      position: absolute;
      width: 100%;
      height: 3px;
    }
  }
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
