<template>
  <div>
    <iTableML
      tooltip-effect="light"
      :data="data"
      :rowClassName="tableRowClassName"
    >
      <!-- <el-table-column
        type="index"
        align="center"
        label="NO."
      ></el-table-column> -->
      <!-- <el-table-column prop="follow" align="center" label="Follow/Create">
        <template scope="scope">
          <img
            @click="changeUnfollow(scope.row)"
            v-if="scope.row.follow && scope.row.state != '03'"
            src="../../../../../../assets/images/empty-star.svg"
            class="focus-icon"
          />
          <img
            @click="changeFollow(scope.row)"
            v-if="!scope.row.follow && scope.row.state != '03'"
            src="../../../../../../assets/images/solid-star.svg"
            class="focus-icon"
          />
        </template>
      </el-table-column> -->
      <el-table-column
        prop="follow"
        align="center"
        label="NO."
        width="50"
      >
        <template scope="scope">
          <!-- <div class="img-word">
            <div>
              {{ scope.$index + 1 }}
            </div>
            <div >
              <img
                @click="changeUnfollow(scope.row)"
                v-if="scope.row.follow && scope.row.state != '03'"
                src="@/assets/images/empty-star.svg"
              />
              <img
                @click="changeFollow(scope.row)"
                v-if="!scope.row.follow && scope.row.state != '03'"
                src="@/assets/images/solid-star.svg"
              />
            </div>
          </div> -->
          <div class="img-word">
            <!-- <div>
              {{ scope.$index + 1 }}
            </div> -->
            <div class="img-box">
              <span>
                {{ scope.$index + 1 }}
              </span>
              <!-- <div class="follow-new">
                <img
                  class="follow"
                  @click="handleUnfollow(scope.row, following)"
                  v-if="scope.row.follow && scope.row.state != '03'"
                  src="@/assets/images/empty-star.svg"
                />
              </div>
              <div class="follow-new">
                <img
                  class="follow"
                  @click="handleFollow(scope.row, following)"
                  v-if="!scope.row.follow && scope.row.state != '03'"
                  src="@/assets/images/solid-star.svg"
                />
              </div> -->
              <div
                v-show="
                  currentUserId !== Number(scope.row.createBy) &&
                    scope.row.state !== '03' &&
                    !Boolean(scope.row.isBreak) &&
                    Boolean(scope.row.follow) &&
                    !isThemenHavaMy(scope.row)
                "
                @click="handleUnfollow(scope.row, following)"
                class="follow-new"
              >
                <img src="@/assets/images/empty-star.svg" class="follow" />
              </div>
              <div
                v-show="
                  currentUserId !== Number(scope.row.createBy) &&
                    scope.row.state === '03' &&
                    !Boolean(scope.row.isBreak) &&
                    Boolean(scope.row.follow) &&
                    !isThemenHavaMy(scope.row)
                "
                class="follow-new"
              >
                <img src="@/assets/images/empty-star.svg" class="follow" />
              </div>
              <div
                v-show="
                  currentUserId !== Number(scope.row.createBy) &&
                    scope.row.state !== '03' &&
                    !Boolean(scope.row.isBreak) &&
                    !Boolean(scope.row.follow) &&
                    !isThemenHavaMy(scope.row)
                "
                @click="handleFollow(scope.row, following)"
                class="follow-new"
              >
                <img src="@/assets/images/solid-star.svg" class="follow" />
              </div>
              <div
                v-show="
                  currentUserId !== Number(scope.row.createBy) &&
                    scope.row.state === '03' &&
                    !Boolean(scope.row.isBreak) &&
                    !Boolean(scope.row.follow) &&
                    !isThemenHavaMy(scope.row)
                "
                class="follow-new"
              >
                <img src="@/assets/images/solid-star.svg" class="follow" />
              </div>
              <div
                v-show="
                  (currentUserId === Number(scope.row.createBy) &&
                    !Boolean(scope.row.isBreak)) ||
                    (isThemenHavaMy(scope.row) && !Boolean(scope.row.isBreak))
                "
                class="follow-new"
              >
                <img src="@/assets/images/add-follow-red.svg" class="follow" />
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="count"
        align="center"
        label="Count"
        width="70"
      >
        <template scope="scope">
          <span>{{
            !scope.row.count && scope.row.isBreak ? "/" : scope.row.count
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="topic"
        align="center"
        label="Topic"
        width="220"
      >
        <template scope="scope">
          <span>{{
            !scope.row.topic && scope.row.isBreak ? "/" : scope.row.topic
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="duration"
        align="center"
        label="Duration"
        width="90"
      >
        <template scope="scope">
          <span>{{
            !scope.row.duration && scope.row.isBreak ? "/" : scope.row.duration
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="time"
        align="center"
        label="Time"
      >
        <template scope="scope">
          <span v-if="scope.row.startTime">{{
            scope.row.startTime && scope.row.startTime.substring(0, 5)
          }}</span>
          <span v-if="scope.row.startTime && scope.row.endTime">~</span>
          <span v-if="scope.row.endTime">{{
            scope.row.endTime && scope.row.endTime.substring(0, 5)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="presenter"
        align="center"
        label="Presenter"
      >
        <template scope="scope">
          <span>{{ scope.row.presenter }}</span>
          <span
            v-if="
              (scope.row.presenter && scope.row.presenterNosys) ||
                scope.row.isBreak
            "
            >/</span
          >
          <span>{{ scope.row.presenterNosys }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="presenterDept"
        align="center"
        label="Presenter Dept."
      >
        <template scope="scope">
          <span>{{ scope.row.presenterDept }}</span>
          <span
            v-if="
              (scope.row.presenterDept && scope.row.presenterDeptNosys) ||
                scope.row.isBreak
            "
            >/</span
          >
          <span>{{ scope.row.presenterDeptNosys }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="supporter"
        align="center"
        label="Supporter"
      >
        <template scope="scope">
          <span>{{ scope.row.supporter }}</span>
          <span
            v-if="
              (scope.row.supporter && scope.row.supporterNosys) ||
                scope.row.isBreak
            "
            >/</span
          >
          <span>{{ scope.row.supporterNosys }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="supporterDept"
        align="center"
        label="Supporter Dept."
      >
        <template scope="scope">
          <span>{{ scope.row.supporterDept }}</span>
          <span
            v-if="
              (scope.row.supporterDept && scope.row.supporterDeptNosys) ||
                scope.row.isBreak
            "
            >/</span
          >
          <span>{{ scope.row.supporterDeptNosys }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="status"
        width="120"
        min-width="120"
        align="center"
        label="Status"
      >
        <template scope="scope">
          {{ statusObj[scope.row.state] }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="remark"
        align="center"
        label="Remark"
      >
        <template scope="scope">
          <span>{{
            !scope.row.remark && scope.row.isBreak ? "/" : scope.row.remark
          }}</span>
        </template>
      </el-table-column>
    </iTableML>
    <iPagination
      v-update
      @current-change="handleCurrentChange($event, query)"
      background
      :current-page="pageNum"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      prev-text="上一页"
      next-text="下一页"
      :total="total"
    />
  </div>
</template>

<script>
import { iPagination, iMessage } from "rise";
import iTableML from "@/components/iTableML";
import { follow, unfollow } from "@/api/meeting/myMeeting";

export default {
  components: {
    iPagination,
    iTableML,
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
    total: {
      type: Number || String,
      default: () => {
        return 0;
      },
    },
    pageSize: {
      type: Number || String,
      default: () => {
        return 1;
      },
    },
    pageNum: {
      type: Number || String,
      default: () => {
        return 1;
      },
    },
  },
  data() {
    return {
      following: false,
      statusObj: {
        "01": "未进行",
        "02": "进行中",
        "03": "已结束",
      },
    };
  },
  mounted() {
    this.currentUserId = Number(sessionStorage.getItem("userId"));
  },
  methods: {
    isThemenHavaMy(item) {
      const presenterId = item.presenterId ? item.presenterId.split(",") : [];
      const supporterId = item.supporterId ? item.supporterId.split(",") : [];
      const currentUserIdStr = this.currentUserId.toString();
      if (
        presenterId.includes(currentUserIdStr) ||
        supporterId.includes(currentUserIdStr)
      ) {
        return true;
      }
      return false;
    },
    // 切换分页
    handleCurrentChange(e) {
      this.$emit("handleCurrentChange", e);
    },

    // 行高亮
    tableRowClassName(row) {
      if (row.row.state === "03") {
        return "unuse-row";
      } else if (row.row.state === "02") {
        return "active-row";
      }
      return "narmal-row";
    },

    // 取消关注
    handleUnfollow(e, bol) {
      this.following = true;
      if (!bol) {
        let param = {
          meetingId: e.meetingId,
          themenId: e.id,
        };
        // this.$confirm("是否取消关注该议题?", "提示", {
        //   confirmButtonText: "是",
        //   cancelButtonText: "否",
        //   type: "warning",
        // }).then(() => {
        unfollow(param)
          .then((res) => {
            iMessage.success("取消关注成功!");
            this.$emit("query", this);
          })
          .catch((err) => {
            iMessage.error("取消关注失败!");
          });
        // });
      }
    },
    // 添加关注
    handleFollow(e, bol) {
      this.following = true;
      if (!bol) {
        let param = {
          meetingId: e.meetingId,
          themenId: e.id,
        };
        // this.$confirm("是否确定关注该议题?", "提示", {
        //   confirmButtonText: "是",
        //   cancelButtonText: "否",
        //   type: "warning",
        // }).then(() => {
        follow(param)
          .then((res) => {
            iMessage.success("关注成功");
            this.$emit("query", this);
          })
          .catch((err) => {
            iMessage.error("关注失败");
          });
        // });
      }
    },
  },
};
</script>

<style scoped lang="scss">
/* .img-word {
  display: flex;
  justify-content: center;
  div:first-child {
    width: 30px;
    text-align: center;
    margin-right: 9.42px;
  }
} */
.img-word {
  display: flex;
  /* justify-content: center; */
  /* position: relative; */
  justify-content: center;
  align-items: center;
  /* transform: translateX(-10px); */
  div:first-child {
    /* margin-left: 30px; */
    flex-grow: 1;
    flex-shrink: 0;
    width: 20px;
    text-align: center;
    /* margin-right: 9.42px; */
    /* margin-right: 5px; */
  }
  .img-box {
    flex: 1;
    position: relative;
    transform: translateY(2px);
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      flex-grow: 1;
      flex-shrink: 0;
      /* position: absolute;
      left: 0;
      top: 0; */
      width: 20px;
      height: 20px;
      object-fit: contain;
    }
    .follow-new {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
    .follow {
      margin-left: 4px;
      cursor: pointer;
    }
  }
}
.focus-icon {
  cursor: pointer;
}

::v-deep .el-pagination {
  margin-top: 30px !important;
  margin-bottom: 30px !important;
}
::v-deep .unuse-row {
  color: #acb8cf;
}
::v-deep .active-row {
  background: #1660f1;
  color: #fff;
}

::v-deep .el-table--enable-row-hover .el-table__body .active-row:hover > td {
  background: #1660f1;
  color: #fff;
}
::v-deep .el-table__body tr.active-row > td {
  background: #1660f1;
  color: #fff;
}
</style>
