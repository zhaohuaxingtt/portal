<template>
  <iPage>
    <div class="container">
      <iTableML
        tooltip-effect="light"
        :data="tableData"
        :rowClassName="tableRowClassName"
      >
        <el-table-column width="20" align="center" label=""></el-table-column>
        <el-table-column prop="follow" align="left" label="#" min-width="15">
          <template slot-scope="scope">
            <div class="img-word">
              <span>
                {{ scope.$index + 1 }}
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column width="44" align="center" label=""></el-table-column>
        <el-table-column
          show-overflow-tooltip
          prop="topic"
          align="center"
          label="Present Items"
          :width="setColumnWidth(tabData)"
        >
          <!-- min-width="120" -->
          <template slot-scope="scope">
            <span>{{ scope.row.topic }}</span>
            <!-- <span v-if="scope.row.isBreak">{{ scope.row.topic }}</span> -->
            <!-- <span
              class="open-link-text"
              @click="lookOrEdit(scope.row)"
              v-else
              >{{ scope.row.topic }}</span
            > -->
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
        >
          <template slot-scope="scope">
            <span v-if="!scope.row.tnr">-</span>
            <span v-else>{{ scope.row.tnr }}</span>
          </template>
        </el-table-column>
        <el-table-column width="44" align="center" label=""></el-table-column>
        <!-- <el-table-column
          show-overflow-tooltip
          align="center"
          label="BEN(CN)"
          min-width="100"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.benCn">{{ scope.row.benCn }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column> -->
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
          label="Status"
          min-width="100"
        >
          <template slot-scope="scope">
            {{ scope.row.state ? $t(stateObj[scope.row.state]) : '-' }}
          </template>
        </el-table-column>
        <el-table-column width="24" align="center" label=""></el-table-column>
        <el-table-column
          show-overflow-tooltip
          align="center"
          label="Time"
          min-width="120"
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
      <addTopicNew
        v-if="openAddTopic"
        :openAddTopic="openAddTopic"
        :meetingInfo="meetingInfo"
        :editOrAdd="editOrAdd"
        @closeDialog="closeDialog"
        :topicInfo="lookThemenObj"
        :isGetInfoById="true"
      >
      </addTopicNew>
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
import { stateObj } from './data'
import dayjs from 'dayjs'
import addTopicNew from '@/views/meeting/show/components/topicLookDialog.vue'

export default {
  mixins: [pageMixins],
  components: {
    // iPagination,
    iTableML,
    addTopicNew
  },
  data() {
    return {
      processUrl: process.env.VUE_APP_POINT,
      processUrlPortal: process.env.VUE_APP_POINT_PORTAL,
      processUrlGpPortal:process.env.VUE_APP_POINT_GP_PORTAL,
      lookThemenObj: {},
      stateObj,
      tableLoading: false,
      tableData: [],
      // resThemeData: [],
      currentUserId: '',
      following: false,
      editOrAdd: 'add',
      openAddTopic: false
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
    closeDialog() {
      this.openAddTopic = false
    },
    lookOrEdit(row) {
      // if (row.source === '04') {
      //   // window.open(
      //   //     `${this.processUrl}/designate/decisiondata/mtz?desinateId=${row.fixedPointApplyId}&isPreview=1`,
      //   //     "_blank"
      //   // );
      //   if (row.type === 'FS+MTZ') {
      //     window.open(
      //       `${this.processUrl}/designate/decisiondata/mtz?desinateId=${row.fixedPointApplyId}&isPreview=1`,
      //       '_blank'
      //     )
      //   } else if (row.type === 'MTZ') {
      //     window.open(
      //       `${this.processUrlPortal}/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/decisionMaterial?currentStep=3&mtzAppId=${row.fixedPointApplyId}`,
      //       '_blank'
      //     )
      //   } else {
      //     window.open(
      //       `${this.processUrl}/designate/decisiondata/title?desinateId=${row.fixedPointApplyId}&isPreview=1`,
      //       '_blank'
      //     )
      //   }
      // } else {
      this.lookThemenObj = { ...row }
      this.editOrAdd = 'look'
      this.openAddTopic = true
      // }
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
          time: `${startTime}~${endTime}`
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
    },
    //表格列字符限制
    setColumnWidth(data) {
      if (!data || data.length === 0) {
        return
      }
      let index = 0
      let maxStr = ''
      for (let i = 0; i < data.length; i++) {
        if (data[i].topic === null) {
          return
        }
        const nowline = data[i].topic + ''
        const maxline = data[index].topic + ''
        if (nowline.length > maxline.length) {
          index = i
        }
      }
      maxStr = data[index].topic
      let columnWidth = 0
      for (let char of maxStr) {
        if (char >= 'A' && char <= 'Z') {
          columnWidth += 8
        } else if (char >= 'a' && char <= 'z') {
          columnWidth += 6
        } else if (char >= '\u4e00' && char <= '\u9fa5') {
          columnWidth += 13
        } else {
          columnWidth += 7
        }
      }
      if (columnWidth < 120) {
        // 设置最小宽度
        columnWidth = 120
      }
      if (columnWidth > 306) {
        columnWidth = 306
      }
      return columnWidth + 'px'
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
  background: #1660f1 !important;
  color: #fff;
}
.add-follow {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: 16px;
}
::v-deep .active-row {
  background-color: #1660f1 !important;
  .cell {
    .open-link-text {
      color: #fff !important;
    }
  }
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
