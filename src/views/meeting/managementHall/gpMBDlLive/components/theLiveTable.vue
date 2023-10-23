<template>
  <iPage>
    <div class="container">
      <!-- <iTableML
        tooltip-effect="light"
        :data="tableData"
        :rowClassName="tableRowClassName"
      >
        <el-table-column width="24" align="center" label=""></el-table-column>
        <el-table-column
          prop="follow"
          align="left"
          label="No."
          width="60"
          min-width="60"
        >
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
                  @click="handleCancelFollow(scope.row, following)"
                  class="add-follow"
                >
                  <img src="@/assets/images/empty-star.svg" />
                </div>
                <div
                  v-show="
                    currentUserId !== Number(scope.row.createBy) &&
                    scope.row.state === '03' &&
                    !Boolean(scope.row.isBreak) &&
                    Boolean(scope.row.follow) &&
                    !isThemenHavaMy(scope.row)
                  "
                  class="add-follow"
                >
                  <img src="@/assets/images/empty-star.svg" />
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
                  class="add-follow"
                >
                  <img src="@/assets/images/solid-star.svg" />
                </div>
                <div
                  v-show="
                    currentUserId !== Number(scope.row.createBy) &&
                    scope.row.state === '03' &&
                    !Boolean(scope.row.isBreak) &&
                    !Boolean(scope.row.follow) &&
                    !isThemenHavaMy(scope.row)
                  "
                  class="add-follow"
                >
                  <img src="@/assets/images/solid-star.svg" />
                </div>
                <div
                  v-show="
                    (currentUserId === Number(scope.row.createBy) &&
                      !Boolean(scope.row.isBreak)) ||
                    (isThemenHavaMy(scope.row) && !Boolean(scope.row.isBreak))
                  "
                  class="add-follow"
                >
                  <img src="@/assets/images/add-follow-red.svg" />
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="33" align="center" label=""></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="count"
          align="center"
          label="Count"
          width="50"
          min-width="50"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.count }}</span>
            <span v-if="scope.row.isBreak">-</span>
          </template>
        </el-table-column>
        <el-table-column width="34" align="center" label=""></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="topic"
          align="center"
          label="Topic"
          width="220"
          min-width="220"
        ></el-table-column>
        <el-table-column width="33" align="center" label=""></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="duration"
          align="center"
          label="Duration"
          width="61"
          min-width="61"
        ></el-table-column>
        <el-table-column width="33" align="center" label=""></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="time"
          align="center"
          label="Time"
          width="100"
          min-width="100"
        >
        </el-table-column>
        <el-table-column width="33" align="center" label=""></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="presenter"
          align="center"
          label="Presenter"
          width="190"
          min-width="190"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.presenter && scope.row.presenterNosys"
              >{{ scope.row.presenter }}/{{ scope.row.presenterNosys }}</span
            >
            <span v-else
              >{{ scope.row.presenter }}{{ scope.row.presenterNosys }}</span
            >
            <span v-if="scope.row.isBreak">-</span>
          </template>
        </el-table-column>
        <el-table-column width="33" align="center" label=""></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="presenterDept"
          align="center"
          label="Presenter Dept."
          width="120"
          min-width="120"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.presenterDept && scope.row.presenterDeptNosys"
              >{{ scope.row.presenterDept }}/{{
                scope.row.presenterDeptNosys
              }}</span
            >
            <span v-else
              >{{ scope.row.presenterDept
              }}{{ scope.row.presenterDeptNosys }}</span
            >
            <span v-if="scope.row.isBreak">-</span>
          </template>
        </el-table-column>
        <el-table-column width="33" align="center" label=""></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="supporter"
          align="center"
          label="Supporter"
          width="150"
          min-width="150"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.supporter && scope.row.supporterNosys"
              >{{ scope.row.supporter }}/{{ scope.row.supporterNosys }}</span
            >
            <span v-else
              >{{ scope.row.supporter }}{{ scope.row.supporterNosys }}</span
            >
            <span v-if="scope.row.isBreak">-</span>
          </template>
        </el-table-column>
        <el-table-column width="33" align="center" label=""></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="supporterDept"
          align="center"
          label="Supporter Dept."
          width="130"
          min-width="130"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.supporterDept && scope.row.supporterDeptNosys"
              >{{ scope.row.supporterDept }}/{{
                scope.row.supporterDeptNosys
              }}</span
            >
            <span v-else
              >{{ scope.row.supporterDept
              }}{{ scope.row.supporterDeptNosys }}</span
            >
            <span v-if="scope.row.isBreak">-</span>
          </template>
        </el-table-column>
        <el-table-column width="33" align="center" label=""></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="state"
          align="center"
          label="Status"
          width="70"
          min-width="70"
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.state === '01'
                ? $t('MT_WEIJINXING')
                : scope.row.state === '02'
                ? $t('MT_JINXINGZHONG')
                : scope.row.state === '03'
                ? $t('MT_YIJIESHU')
                : ''
            }}</span>
          </template>
        </el-table-column>
        <el-table-column width="33" align="center" label=""></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="remark"
          align="center"
          label="Remark"
          width="130"
          min-width="130"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
            <span v-if="scope.row.isBreak">-</span>
          </template>
        </el-table-column>
        <el-table-column width="24" align="center" label=""></el-table-column>
      </iTableML> -->
      <iTableML
          tooltip-effect="light"
          @selectionChange="handleSelectionChange"
          :loading="tableLoading"
          :data="tableData"
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
             <template slot-scope="scope">
              <span >{{ scope.row.time }}</span>
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

    </div>
    <!-- <iPagination
        v-update
        @size-change="handleSizeChange($event, query)"
        @current-change="handleCurrentChange($event, query)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pages"
        :page-size="page.pageSize"
        layout="prev, pager, next"
        prev-text="上一页"
        next-text="下一页"
        :total="page.totalCount"
      /> -->
    <!-- <div class="warn-content">会议直播进程将每5秒自动刷新，请耐心等待。</div> -->
  </iPage>
</template>

<script>
// import { iPagination } from "rise";
// import tableListColumns from "./data.js";
import iTableML from '@/components/iTableML'
import { pageMixins } from '@/utils/pageMixins'
import { follow, unfollow } from '@/api/meeting/live'
import dayjs from 'dayjs'

export default {
  mixins: [pageMixins],
  components: {
    // iPagination,
    iTableML
  },
  data() {
    return {
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
      tableLoading: false,
      tableData: [],
      // resThemeData: [],
      currentUserId: '',
      following: false
    }
  },
  props: {
    meetingInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    resThemeData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  watch: {
    resThemeData: {
      handler(newV) {
        let tabData = this.handleTime(newV)
        // this.tableData = [
        //   ...tabData.slice(
        //     (this.page.currPage - 1) * 10,
        //     this.page.currPage * 10
        //   ),
        // ];
        this.tableData = tabData
      },
      immediate: true,
      deep: true
    }
  },
  mounted() {
    this.currentUserId = Number(sessionStorage.getItem('userId'))
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
    handleCancelFollow(row, bol) {
      this.following = true
      if (!bol) {
        // this.$confirm("是否取消关注该议题？", "提示", {
        //   confirmButtonText: "是",
        //   cancelButtonText: "否",
        //   type: "warning",
        // }).then(() => {
        const params = {
          meetingId: this.meetingInfo.id,
          themenId: row.id
        }
        unfollow(params)
          .then(() => {
            this.$emit('refreshList', true, this)
          })
          .catch((err) => {
            console.log('请求异常', err)
            this.following = false
          })
        // });
      }
    },
    handleFollow(row, bol) {
      this.following = true
      if (!bol) {
        // this.$confirm("是否确定关注该议题？", "提示", {
        //   confirmButtonText: "是",
        //   cancelButtonText: "否",
        //   type: "warning",
        // }).then(() => {
        const params = {
          meetingId: this.meetingInfo.id,
          themenId: row.id
        }
        follow(params)
          .then(() => {
            this.$emit('refreshList', false, this)
            // this.following = false;
          })
          .catch((err) => {
            console.log('请求异常', err)
            this.following = false
          })
      }
      // });
    },
    query() {
      const _this = this
      return {
        that: _this,
        tableData: _this.tableData,
        resThemeData: _this.resThemeData,
        page: _this.page
      }
    },
    handleSizeChange: () => {},
    handleTime(tableData) {
      return tableData.map((item) => {
        const startTime = dayjs(`2020-6-30 ${item.startTime}`).format('HH:mm')
        const endTime = dayjs(`2020-6-30 ${item.endTime}`).format('HH:mm')
        return {
          ...item,
          time: `${
            Number(item.plusDayStartTime) > 0
              ? startTime + ' +' + Number(item.plusDayStartTime)
              : startTime
          }~${
            Number(item.plusDayEndTime) > 0
              ? endTime + ' +' + Number(item.plusDayEndTime)
              : endTime
          }`
        }
      })
    },
    //选择页数
    handleCurrentChange: (curPage, query) => {
      const _this = query()
      //分页并累加总时长
      _this.page.currPage = curPage
      _this.tableData = _this.resThemeData.filter((item, index) => {
        if (
          index >= (_this.page.currPage - 1) * _this.page.pageSize &&
          index < _this.page.currPage * _this.page.pageSize
        ) {
          return true
        }
        return false
      })
      // console.log(_this.that);
      _this.that.$data.tableData = _this.that.handleTime(_this.tableData)

      //发送
      // _this.that.$data.tableData = _this.tableData.map((item) => {
      //   const startTime = dayjs(`2020-6-30 ${item.startTime}`).format("HH:mm");
      //   const endTime = dayjs(`2020-6-30 ${item.endTime}`).format("HH:mm");
      //   return {
      //     ...item,
      //     time: `${startTime}~${endTime}`,
      //   };
      // });
    },
    handlePage(data = []) {
      // let startTime = new Date(
      //   `${this.meetingInfo.startDate} ${this.meetingInfo.startTime}`
      // ).getTime();
      // let endTime;
      this.page.totalCount = data.length
      this.page.pageSize = 10
      this.tableData = data.filter((item, index) => {
        return index < 10
      })
      this.tableData = this.handleTime(this.tableData)
      // this.tableData = this.tableData.map((item) => {
      //   // startTime = endTime ? endTime + 60 * 1000 : startTime;
      //   // endTime = startTime + item.duration * 60 * 1000;
      //   const startTime = dayjs(`2020-6-30 ${item.startTime}`).format("HH:mm");
      //   const endTime = dayjs(`2020-6-30 ${item.endTime}`).format("HH:mm");
      //   return {
      //     ...item,
      //     time: `${startTime}~${endTime}`,
      //   };
      // });
    },
    queryMeetingInfoById() {
      // this.resThemeData = [...this.meetingInfo.themens];
      this.handlePage(this.resThemeData)
    },
    // 行高亮
    tableRowClassName(row) {
      if (row.row.state === '03') {
        return 'unuse-row'
      } else if (row.row.state === '02') {
        return 'active-row'
      }
      return 'narmal-row'
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-table_1_column_2 {
  position: relative;
  .table-index {
    position: absolute;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }
}

::v-deep .cell {
  padding: 0 !important;
}
.img-word {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* justify-content: center; */
  /* position: relative; */
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
    /* justify-content: center; */
    align-items: center;
    img {
      flex-grow: 1;
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      /* position: absolute; */
      /* left: 0;
      top: 0; */
      object-fit: contain;
    }
  }
}
.warn-content {
  height: 75px;
  line-height: 75px;
  color: #999;
  text-align: right;
  white-space: nowrap;
  font-size: 12px;
}
.container {
  max-height: 500px;
  overflow-y: auto;
  /* padding-bottom:20px; */
}
::v-deep .el-pagination {
  margin-top: 30px !important;
  margin-bottom: 30px !important;
}
::v-deep .unuse-row {
  color: #acb8cf;
}
::v-deep .active-row {
  background: #67C23A !important;
  color: #fff;
}
.add-follow {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 16px;
}
::v-deep .el-table--enable-row-hover .el-table__body .active-row:hover > td {
  background: #67C23A;
  color: #fff;
}
::v-deep .el-table__body tr.active-row > td {
  background: #67C23A;
  color: #fff;
  .open-link-text{
    color: #fff;
  }
}
</style>
