<template>
  <div>
    <iCard class="margin-top20">
      <div class="margin-bottom20 clearFloat">
        <div class="top">
          <div class="survey">问卷明细</div>
          <iButton @click="handleAdd">{{ "新建" }}</iButton>
        </div>
      </div>
      <iTableML
        tooltip-effect="light"
        :data="tableListData"
        :tableLoading="tableLoading"
      >
        <el-table-column
          label="序号"
          type="index"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column align="center" width="80px" label="问卷编码"
          ><template slot-scope="scope">
            <span>{{ scope.row["surveyCode"] }}</span>
          </template></el-table-column
        >
        <el-table-column
          show-overflow-tooltip
          width="250px"
          align="center"
          label="问卷名称"
          ><template slot-scope="scope">
            <span
              :class="'open-link-text cursor'"
              @click="handlePreview(scope.row)"
              >{{ scope.row["name"] }}</span
            >
          </template></el-table-column
        >
        <el-table-column align="center" label="问卷模块">
          <template slot-scope="scope">
            <span>{{ surveyModelObj[scope.row["surveyModel"]] }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="问卷类型"
          ><template slot-scope="scope">
            <span>{{ surveyTypeObj[scope.row["type"]] }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" label="问卷发起人"
          ><template slot-scope="scope">
            <span>{{ scope.row["initiator"] }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" label="问卷状态"
          ><template slot-scope="scope">
            <span>{{ surveyStatusObj[scope.row["state"]] }}</span>
          </template></el-table-column
        >
        <el-table-column align="center" label="问卷数据"
          ><template slot-scope="scope">
            <span
              v-if="
                scope.row.state === 1 ||
                Number(scope.row.createBy) !== Number(currentUserId)
              "
              >-</span
            >

            <span
              v-else
              :class="'open-link-text cursor'"
              @click="handleData(scope.row)"
              >{{
                scope.row["answeredNumber"] == null
                  ? "0"
                  : scope.row["answeredNumber"]
              }}{{
                scope.row["putoutNumber"] == null
                  ? "/" + "0"
                  : "/" + scope.row["putoutNumber"]
              }}</span
            >
          </template></el-table-column
        >
        <el-table-column align="center" width="150px" label="创建时间">
          <template slot-scope="scope">
            <span>{{ scope.row["createDate"].substring(0, 16) }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="150px" label="截止时间">
          <template slot-scope="scope">
            <span>{{
              scope.row["endTime"] && scope.row["endTime"].substring(0, 16)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="170px"
          ><template slot-scope="scope">
            <div class="operation-box" v-if="scope.row['state'] !== 5">
              <p
                v-if="
                  scope.row.state === 1 &&
                  Number(scope.row.createBy) === Number(currentUserId)
                "
                @click="handleDelete(scope.row.id)"
                :class="'open-link-text cursor'"
              >
                <span>删除</span>
              </p>

              <p
                v-if="
                  scope.row.state === 1 &&
                  Number(scope.row.createBy) === Number(currentUserId)
                "
                class="divide"
              >
                |
              </p>

              <p
                v-if="
                  (scope.row.state === 1 &&
                    new Date(scope.row.endTime) >= new Date(currentDate) &&
                    Number(scope.row.createBy) === Number(currentUserId)) ||
                  (scope.row.state === 1 &&
                    scope.row.endTime == null &&
                    Number(scope.row.createBy) === Number(currentUserId))
                "
                @click="handlePublish(scope.row.id)"
                :class="'open-link-text cursor'"
              >
                <span>发布</span>
              </p>

              <p
                v-if="
                  (scope.row.state === 1 &&
                    new Date(scope.row.endTime) >= new Date(currentDate) &&
                    Number(scope.row.createBy) === Number(currentUserId)) ||
                  (scope.row.state === 1 &&
                    scope.row.endTime == null &&
                    Number(scope.row.createBy) === Number(currentUserId))
                "
                class="divide"
              >
                |
              </p>

              <p
                v-if="Number(scope.row.createBy) === Number(currentUserId)"
                @click="handleCopy(scope.row.id, scope.$index)"
                :class="'open-link-text cursor'"
              >
                <span>复制</span>
              </p>
            </div>
          </template></el-table-column
        >
      </iTableML>
      <iPagination
        v-update
        @current-change="handleCurrentChange($event)"
        @size-change="handleSizeChange($event)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        prev-text="上一页"
        next-text="下一页"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.total"
      />
    </iCard>
    <surveyData
      :surData="surData"
      :open="open"
      @closeDialog="closeDialog"
      v-if="open"
    />
    <preSurvey
      :preData="preData"
      :preOpen="preOpen"
      @closePreDialog="closePreDialog"
      v-if="preOpen"
    />
  </div>
</template>

<script>
import { iCard, iButton, iPagination, iMessage } from "rise";
import iTableML from "@/components/iTableML";
import { surveyTypeObj, surveyStatusObj, surveyModelObj } from "./data";
import { deleteSurvey, copySurvey, publishSurvey } from "@/api/survey/survey";
import surveyData from "@/views/surveyManagement/data/index.vue";
import preSurvey from "../../preview/index.vue";
import store from "@/store";
export default {
  components: {
    iCard,
    iButton,
    iPagination,
    iTableML,
    surveyData,
    preSurvey,
  },
  props: {
    tableListData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    typeObject: {
      type: Object,
      default: () => {
        return {};
      },
    },
    page: {
      type: Object,
      default: () => {
        return {};
      },
    },
    tableLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      surveyTypeObj,
      surveyStatusObj,
      surveyModelObj,
      // 问卷数据
      surData: {},
      // 问卷数据弹窗
      open: false,
      // 预览弹窗
      preOpen: false,
      // 预览数据
      preData: {},
      currentDate: "",
    };
  },
  watch: {
    preOpen: {
      handler(bol) {
        console.log("bol", bol);
      },
    },
  },
  mounted() {
    this.currentUserId = store.state.permission.userInfo.id;
    this.currentDate = new Date(+new Date() + 8 * 3600 * 1000)
      .toJSON()
      .substr(0, 16)
      .replace("T", " ");
  },
  methods: {
    closeDialog() {
      this.open = false;
    },
    handleData(row) {
      if (row) {
        this.surData = { ...row };
      }
      this.open = true;
    },
    flushTable() {
      this.$emit("refTabList");
    },

    handlePreview(row) {
      if (row) {
        this.preData = { ...row };
      }
      this.preOpen = true;
    },
    closePreDialog() {
      this.preOpen = false;
    },
    // 删除
    handleDelete(id) {
      this.$confirm("是否要删除该问卷？", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      }).then(
        () => {
          let param = { id: id };
          deleteSurvey(param).then(() => {
            iMessage.success("删除成功！");
            this.flushTable();
          });
        }
        // (err) => {
        //   iMessage.error(err);
        // }
      );
    },
    // 发布
    handlePublish(id) {
      this.$confirm("是否要发布该问卷？", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      }).then(
        () => {
          let param = { id: id };
          publishSurvey(param).then((res) => {
            if (res.code === 200) {
              iMessage.success("发布成功！");
              this.flushTable();
            } else {
              this.flushTable();
            }
          });
        }
        // (err) => {
        //   iMessage.error(err);
        // }
      );
    },
    // 复制
    handleCopy(id, index) {
      this.$confirm("是否要复制该问卷？", "提示", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
      }).then(
        () => {
          let param = { id: id };
          copySurvey(param).then((data) => {
            this.tableListData.splice(index + 1, 0, data);
            iMessage.success("复制成功！");
            // this.flushTable();
          });
        }
        // (err) => {
        //   iMessage.error(err);
        // }
      );
    },
    // 创建
    handleAdd() {
      this.$router.push({
        path: "/survey/create",
      });
    },

    handleCurrentChange(e) {
      this.$emit("handleChangePage", e);
    },
    handleSizeChange(e) {
      this.$emit("handleSizeChange", e);
    },
  },
};
</script>

<style scoped lang="scss">
::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}
.top {
  display: flex;
  justify-content: space-between;
  .survey {
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
    line-height: 23px;
  }
}
.operation-box {
  display: flex;
  justify-content: center;
  .divide {
    padding: 0 10px;
  }
}
</style>
