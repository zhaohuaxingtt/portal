    <!-- 近期会议卡片 more 列表-->
<template>
  <div>
    近期会议卡片 more 列表
    <!-- <iTableML
      tooltip-effect="light"
      :data="data"
      :rowClassName="tableRowClassName"
    >
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
      <el-table-column
        show-overflow-tooltip
        prop="count"
        align="center"
        label="Count"
        width="70"
      >
        <template slot-scope="scope">
          <span>{{
            !scope.row.count && scope.row.isBreak ? '-' : scope.row.count
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
        <template slot-scope="scope">
          <span>{{
            !scope.row.topic && scope.row.isBreak ? '-' : scope.row.topic
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
        <template slot-scope="scope">
          <span>{{
            !scope.row.duration && scope.row.isBreak ? '-' : scope.row.duration
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="time"
        align="center"
        label="Time"
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
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="presenter"
        align="center"
        label="Presenter"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.presenter }}</span>
          <span v-if="scope.row.presenter && scope.row.presenterNosys">/</span>
          <span v-if="scope.row.isBreak">-</span>
          <span>{{ scope.row.presenterNosys }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="presenterDept"
        align="center"
        label="Presenter Dept."
      >
        <template slot-scope="scope">
          <span>{{ scope.row.presenterDept }}</span>
          <span v-if="scope.row.presenterDept && scope.row.presenterDeptNosys"
            >/</span
          >
          <span v-if="scope.row.isBreak">-</span>
          <span>{{ scope.row.presenterDeptNosys }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="supporter"
        align="center"
        label="Supporter"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.supporter }}</span>
          <span v-if="scope.row.supporter && scope.row.supporterNosys">/</span>
          <span v-if="scope.row.isBreak">-</span>
          <span>{{ scope.row.supporterNosys }}</span>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="supporterDept"
        align="center"
        label="Supporter Dept."
      >
        <template slot-scope="scope">
          <span>{{ scope.row.supporterDept }}</span>
          <span v-if="scope.row.supporterDept && scope.row.supporterDeptNosys"
            >/</span
          >
          <span v-if="scope.row.isBreak">-</span>
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
        <template slot-scope="scope">
          {{ $t(statusObj[scope.row.state]) }}
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="remark"
        align="center"
        label="Remark"
      >
        <template slot-scope="scope">
          <span>{{
            !scope.row.remark && scope.row.isBreak ? '-' : scope.row.remark
          }}</span>
        </template>
      </el-table-column>
    </iTableML> -->
    <iTableML
          tooltip-effect="light"
          @selectionChange="handleSelectionChange"
          :loading="tableLoading"
          :data="data"
          @go-detail="handleGoDetail"
          v-if="!showUpdateTopicButtonList"
          :rowClassName="tableRowClassName"
          :currentRow="currentRow"
          :isSingle="isSingle"
        >
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="#"
            width="50"
          >
            <template slot-scope="scope">
             <span>
              {{ scope.$index + 1 }}
            </span>
            </template>
          </el-table-column>
          <!-- MBDL名称    gpName  改 topic-->
          <el-table-column show-overflow-tooltip align="center" label="MBDL名称" width="120" >
            <template slot-scope="scope">
              <span class="open-link-text look-themen-click" @click="lookOrEdit(scope.row)">{{ scope.row.topic }}</span>
            </template>
          </el-table-column>
          <!-- 英文名称  mbdlNameEn -->
           <el-table-column show-overflow-tooltip align="center" label="英文名称" width="120" >
             <template slot-scope="scope">
              <span >{{ scope.row.mbdlNameEn }}</span>
            </template>
          </el-table-column>
          <!-- 采购分类  materialGroupName -->
           <el-table-column show-overflow-tooltip align="center" label="采购分类" width="120" >
             <template slot-scope="scope">
              <span >{{ scope.row.materialGroupName }}</span>
            </template>
          </el-table-column>
          <!-- 有效期起   validFrom-->
           <el-table-column show-overflow-tooltip align="center" label="有效期起" width="120" >
             <template slot-scope="scope">
              <span >{{ scope.row.validFrom }}</span>
            </template>
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="有效期止" width="120" >
             <template slot-scope="scope">
              <span >{{ scope.row.validTo }}</span>
            </template>
          </el-table-column>
          <!-- 主要申请部门  applyDept 改 supporterDept-->
           <el-table-column show-overflow-tooltip align="center" label="主要申请部门" width="120" >
             <template slot-scope="scope">
              <span >{{ scope.row.supporterDept }}</span>
             </template>
          </el-table-column>
          <!-- 股别  presenterDept -->
           <el-table-column show-overflow-tooltip align="center" label="股别" width="120" >
             <template slot-scope="scope">
              <span >{{ scope.row.presenterDept }}</span>
             </template>
          </el-table-column>
          <!-- 提交人   supporter 改 presenter-->
           <el-table-column show-overflow-tooltip align="center" label="提交人" width="120" >
             <template slot-scope="scope">
              <span >{{ scope.row.presenter }}</span>
             </template>
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="时间" width="120" >
             <!-- <template slot-scope="scope">
              <span >{{ scope.row.time }}</span>
            </template> -->
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
            </template>
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="状态" width="110" >
             <template slot-scope="scope">
              <span >{{ statusObj[scope.row.state] }}</span>
            </template>
          </el-table-column>
          <!-- 会议结论/纪要  conclusion-->
           <el-table-column show-overflow-tooltip align="center" label="会议结论/纪要" width="120" >
             <template slot-scope="scope">
              <!-- <span class="open-link-text" @click="handleResult(scope.row)">{{ resultObj[scope.row.conclusion] }}</span> -->
              <span v-if="scope.row.conclusion=='01'||  scope.row.conclusion=='11'" style="color:blue"
                 @click="handleResult(scope.row)">{{resultObj[scope.row.conclusion]}}</span>
                <span v-else>{{resultObj[scope.row.conclusion]}}</span>
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
      :prev-text="$t('MT_SHANGYIYE')"
      :next-text="$t('MT_XIAYIYE')"
      :total="total"
    />
  </div>
</template>

<script>
import { iPagination, iMessage } from 'rise'
import iTableML from '@/components/iTableML'
import { follow, unfollow } from '@/api/meeting/myMeeting'
import { findThemenById } from '@/api/meeting/gpMeeting'

export default {
  components: {
    iPagination,
    iTableML
  },
  props: {
    // data: {
    //   type: Array,
    //   default: () => {
    //     return []
    //   }
    // },
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
      data:{},
      statusObj: {
        '01': '未进行',
        '02': '进行中',
        '03': '已结束'
      },
      resultObj:{
        '01': '待定',
        '08': '通过',
        '09': '预备会议通过',
        '10': '不通过',
        '11': 'Last Call',
        '12': '分段定点'
      },
      following: false,
      // statusObj: {
      //   '01': 'MT_WEIJINXING',
      //   '02': 'MT_JINXINGZHONG',
      //   '03': 'MT_YIJIESHU'
      // }
    }
  },
  mounted() {
    this.currentUserId = Number(sessionStorage.getItem('userId'))
  },
  created() {  
    this.queryMeetingInfoById()
  },
  methods: {
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
        iMessage.warn(this.$t('MT_YIJIESHUDEYITIBUKEYITIANJIAGUANZHU'))
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
            iMessage.success(this.$t('MT_QUXIAOGUANZHUCHENGGONG'))
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
        iMessage.warn(this.$t('MT_YIJIESHUDEYITIBUKEYIQUXIAOGUANZHU'))
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
            iMessage.success(this.$t('MT_GUANZHUCHENGGONG'))
          }
          this.$emit('query', this)
        })
        // .catch((err) => {
        //   iMessage.error('关注失败')
        // })
        // });
      }
    },
    queryMeetingInfoById() {
      const data = {
        id:this.$route.query.id
      }
      findThemenById(data).then((res) => {
          console.log(res);
          this.data = res.themens
        })
        .catch((err) => {
          console.log(err)
        })
    },
  }
}
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
  .open-link-text{
    color: #fff;
  }
}
</style>
