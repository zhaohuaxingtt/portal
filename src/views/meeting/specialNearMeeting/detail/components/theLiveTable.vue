<template>
  <div>
    <iTableML
      tooltip-effect="light"
      :data="data"
      :rowClassName="tableRowClassName"
    >
      <el-table-column width="15" align="center" label=""></el-table-column>
      <el-table-column prop="follow" align="left" label="No." width="50">
        <template slot-scope="scope">
          <div class="img-word">
            <div class="img-box">
              <span>
                {{ scope.$index + 1 }}
              </span>
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
      <el-table-column width="14" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="topic"
        align="center"
        label="Present Items"
        min-width="120"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.topic }}</span>
          <!-- <span v-if="scope.row.isBreak">{{ scope.row.topic }}</span>
          <span class="open-link-text" @click="lookOrEdit(scope.row)" v-else>{{
            scope.row.topic
          }}</span> -->
        </template>
      </el-table-column>
      <el-table-column width="44" align="center" label=""></el-table-column>
      <el-table-column
        prop="cscCount"
        align="center"
        label="Record"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.isBreak">-</span>
          <span v-else>{{
            (scope.row.cscCount || 0) + '/' + (scope.row.preCount || 0)
          }}</span>
        </template>
      </el-table-column>
      <el-table-column width="44" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="Part No."
        min-width="100"
        prop="tnr"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.tnr">-</span>
          <span v-else>{{ scope.row.tnr }}</span>
        </template>
      </el-table-column>
      <el-table-column width="44" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="BEN(CN)"
        min-width="100"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.benCn">{{ scope.row.benCn }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column width="44" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="Carline"
        min-width="100"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.carline">{{ scope.row.carline }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column width="44" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="Sourcing"
        min-width="100"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.supporter">-</span>
          <span v-else>{{ scope.row.supporter }}</span>
        </template>
      </el-table-column>
      <el-table-column width="44" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="Linie"
        min-width="100"
        prop="presenter"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.presenter">{{ scope.row.presenter }}</span>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column width="44" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="Commodity"
        min-width="100"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.presenterDept">-</span>
          <span v-else>{{ scope.row.presenterDept }}</span>
        </template>
      </el-table-column>
      <el-table-column width="44" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="EP"
        min-width="100"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.ep">-</span>
          <span v-else>{{ scope.row.ep }}</span>
        </template>
      </el-table-column>
      <el-table-column width="44" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="State"
        min-width="100"
      >
        <template slot-scope="scope">
          {{ stateObj[scope.row.state] }}
        </template>
      </el-table-column>
      <el-table-column width="4" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        label="Time"
        min-width="140"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.startTime">
            <span>{{
              Number(scope.row.plusDayStartTime) > 0
                ? scope.row.startTime.substring(0, 5) +
                  ' +' +
                  Number(scope.row.plusDayStartTime)
                : scope.row.startTime.substring(0, 5)
            }}</span
            ><span>~</span>
            <span v-if="scope.row.endTime">{{
              Number(scope.row.plusDayEndTime) > 0
                ? scope.row.endTime.substring(0, 5) +
                  ' +' +
                  Number(scope.row.plusDayEndTime)
                : scope.row.endTime.substring(0, 5)
            }}</span>
          </div>
          <span v-else>-</span>
        </template>
      </el-table-column>
      <el-table-column width="20" align="center" label=""></el-table-column>
    </iTableML>
    <iPagination
      v-update
      @current-change="handleCurrentChange($event, query)"
      background
      :current-page="pageNum"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :prev-text="$t('上一页')"
      :next-text="$t('下一页')"
      :total="total"
    />
    <addTopicNew
      v-if="openAddTopic"
      :openAddTopic="openAddTopic"
      :meetingInfo="meetingInfo"
      :editOrAdd="editOrAdd"
      @closeDialog="closeDialog"
      :topicInfo="lookThemenObj"
    >
    </addTopicNew>
  </div>
</template>

<script>
import { iPagination, iMessage } from 'rise'
import iTableML from '@/components/iTableML'
import { follow, unfollow } from '@/api/meeting/myMeeting'
import {
  stateObj,
  themenConclusion
} from '../../../specialNearMeeting/components/carouselBox/data.js'
import addTopicNew from '@/views/meeting/show/components/topicLookDialog.vue'

export default {
  components: {
    iPagination,
    iTableML,
    addTopicNew
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    total: {
      type: Number || String,
      default: () => {
        return 0
      }
    },
    pageSize: {
      type: Number || String,
      default: () => {
        return 1
      }
    },
    pageNum: {
      type: Number || String,
      default: () => {
        return 1
      }
    }
  },
  data() {
    return {
      lookThemenObj: {},
      editOrAdd: 'add',
      openAddTopic: false,
      processUrl: process.env.VUE_APP_POINT,
      processUrlPortal: process.env.VUE_APP_POINT_PORTAL,
      stateObj,
      themenConclusion,
      following: false,
      statusObj: {
        '01': '未进行',
        '02': '进行中',
        '03': '已结束'
      }
    }
  },
  mounted() {
    this.currentUserId = Number(sessionStorage.getItem('userId'))
  },
  methods: {
    lookOrEdit(row) {
      if (row.source === '04') {
        if (row.type === 'FS+MTZ') {
          window.open(
            `${this.processUrl}/designate/decisiondata/mtz?desinateId=${row.fixedPointApplyId}&isPreview=1`,
            '_blank'
          )
        } else if (row.type === 'MTZ') {
          window.open(
            `${this.processUrlPortal}/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/decisionMaterial?currentStep=3&mtzAppId=${row.fixedPointApplyId}`,
            '_blank'
          )
        } else {
          window.open(
            `${this.processUrl}/designate/decisiondata/title?desinateId=${row.fixedPointApplyId}&isPreview=1`,
            '_blank'
          )
        }
      } else {
        this.lookThemenObj = { ...row }
        this.editOrAdd = 'look'
        this.openAddTopic = true
      }
    },
    isThemenHavaMy(item) {
      const presenterId = item.presenterId ? item.presenterId.split(',') : []
      const supporterId = item.supporterId ? item.supporterId.split(',') : []
      const currentUserIdStr = this.currentUserId.toString()
      if (
        presenterId.includes(currentUserIdStr) ||
        supporterId.includes(currentUserIdStr)
      ) {
        return true
      }
      return false
    },
    // 切换分页
    handleCurrentChange(e) {
      this.$emit('handleCurrentChange', e)
    },

    // 行高亮
    tableRowClassName(row) {
      if (row.row.state === '03') {
        return 'unuse-row'
      } else if (row.row.state === '02') {
        return 'active-row'
      }
      return 'narmal-row'
    },

    // 取消关注
    handleUnfollow(e, bol) {
      if (e.state === '03') {
        iMessage.warn('已经结束的议题不可以添加关注!')
        return
      }
      this.following = true
      if (!bol) {
        let param = {
          meetingId: e.meetingId,
          themenId: e.id
        }
        // this.$confirm("是否取消关注该议题?", "提示", {
        //   confirmButtonText: "是",
        //   cancelButtonText: "否",
        //   type: "warning",
        // }).then(() => {
        unfollow(param).then((res) => {
          if (res.code === 200) {
            iMessage.success('取消关注成功!')
          }
          this.$emit('query', this)
        })
        // .catch((err) => {
        //   iMessage.error('取消关注失败!')
        // })
        // });
      }
    },
    // 添加关注
    handleFollow(e, bol) {
      if (e.state === '03') {
        iMessage.warn('已经结束的议题不可以取消关注!')
        return
      }
      this.following = true
      if (!bol) {
        let param = {
          meetingId: e.meetingId,
          themenId: e.id
        }
        // this.$confirm("是否确定关注该议题?", "提示", {
        //   confirmButtonText: "是",
        //   cancelButtonText: "否",
        //   type: "warning",
        // }).then(() => {
        follow(param).then((res) => {
          if (res.code === 200) {
            iMessage.success('关注成功')
          }
          this.$emit('query', this)
        })
        // .catch((err) => {
        //   iMessage.error('关注失败')
        // })
        // });
      }
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .cell {
  padding: 0 !important;
}
/* .img-word {
  display: flex;
  justify-content: center;
  div:first-child {
    width: 30px;
    text-align: center;
    margin-right: 9.42px;
  }
} */
/* .img-word {
  display: flex;
  align-items: center;
  span:first-child {
    display: block;
    flex-grow: 1;
    flex-shrink: 0;
    width: 20px;
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
      cursor: pointer;
    }
  }
} */
/* .img-word {
  display: flex;
  align-items: center;
  div:first-child {
    flex-grow: 1;
    flex-shrink: 0;
    width: 20px;
    text-align: center;
  }
  .img-box {
    flex: 1;
    position: relative;
    transform: translateY(2px);
    display: flex;
    align-items: center;
    img {
      flex-grow: 1;
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      object-fit: contain;
    }
  }
} */
.img-word {
  display: flex;
  /* justify-content: center; */
  /* position: relative; */
  /* justify-content: center; */
  align-items: center;
  /* transform: translateX(-10px); */
  span:first-child {
    display: block;
    /* margin-left: 30px; */
    flex-grow: 1;
    flex-shrink: 0;
    width: 20px;
    /* text-align: center; */
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
      /* margin-left: 4px; */
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
