<template>
  <div>
    <iPage>
      <div class="header">{{ $t('MT_HUIYIZHANSHI') }}</div>
      <iCard class="card-same-screen-box">
        <div class="title-info">
          <p class="info-line-1">
            <span class="meeting-type">
              {{ result.name }}
            </span>
            <span class="meeting-name">
              {{ typeObj[result.meetingTypeId] }}
            </span>
          </p>
          <p class="info-line-2">
            <span class="date-time-start">
              <img :src="timeClock" alt="" srcset="" />
              <span>{{
                `${result.startDate} ${result.startTime.substring(0, 5)}
                ~
                ${
                  Number(
                    result.themens[result.themens.length - 1].plusDayEndTime
                  ) > 0
                    ? result.endTime.substring(0, 5) +
                      ` +${Number(
                        result.themens[result.themens.length - 1].plusDayEndTime
                      )}`
                    : result.endTime.substring(0, 5)
                }`
              }}</span>
            </span>
            <span class="date-time-end">
              <img :src="positionMark" alt="" srcset="" />
              <span>{{ result.meetingPlace }}</span>
            </span>
          </p>
        </div>
        <iTableML
          tooltip-effect="light"
          :data="dataTable"
          :rowClassName="tableRowClassName"
        >
          <el-table-column width="20" align="center" label=""></el-table-column>
          <el-table-column
            width="28"
            min-width="28"
            label="No."
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span class="table-index">{{ scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column width="41" align="center" label=""></el-table-column>
          <el-table-column
            prop="count"
            width="42"
            min-width="42"
            align="center"
            label="Count"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column width="41" align="center" label=""></el-table-column>
          <el-table-column
            prop="topic"
            width="220"
            min-width="220"
            align="center"
            label="Topic"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.isBreak">{{ scope.row.topic }}</span>
              <span
                class="open-link-text"
                @click="lookOrEdit(scope.row)"
                v-else
                >{{ scope.row.topic }}</span
              >
            </template>
          </el-table-column>
          <el-table-column width="41" align="center" label=""></el-table-column>
          <el-table-column
            prop="duration"
            width="61"
            min-width="61"
            align="center"
            label="Duration"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column width="31" align="center" label=""></el-table-column>
          <el-table-column
            prop="startTime"
            width="110"
            min-width="110"
            align="center"
            label="Time"
            show-overflow-tooltip
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
          <el-table-column width="31" align="center" label=""></el-table-column>
          <el-table-column
            width="190"
            min-width="190"
            align="center"
            label="Presenter"
            show-overflow-tooltip
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
          <el-table-column width="41" align="center" label=""></el-table-column>
          <el-table-column
            width="110"
            min-width="110"
            align="center"
            label="Presenter Dept."
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.presenterDept && scope.row.presenterDeptNosys"
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
          <el-table-column width="41" align="center" label=""></el-table-column>
          <el-table-column
            width="140"
            min-width="140"
            align="center"
            label="Supporter"
            show-overflow-tooltip
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
          <el-table-column width="41" align="center" label=""></el-table-column>
          <el-table-column
            width="120"
            min-width="120"
            align="center"
            label="Supporter Dept."
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span
                v-if="scope.row.supporterDept && scope.row.supporterDeptNosys"
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
          <el-table-column width="41" align="center" label=""></el-table-column>
          <el-table-column
            prop="status"
            width="70"
            min-width="70"
            align="center"
            label="Status"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ $t(statusObj[scope.row.state]) }}
            </template>
          </el-table-column>
          <el-table-column width="41" align="center" label=""></el-table-column>
          <el-table-column
            prop="remark"
            width="130"
            min-width="130"
            align="center"
            label="Remark"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.isBreak">-</span>
              <span v-else>{{ scope.row.remark }}</span>
            </template>
          </el-table-column>
          <el-table-column width="20" align="center" label=""></el-table-column>
        </iTableML>
        <iPagination
          v-update
          @current-change="handleCurrentChange($event)"
          background
          :page-size="pageSize"
          :prev-text="$t('MT_SHANGYIYE')"
          :next-text="$t('MT_XIAYIYE')"
          layout="prev, pager, next"
          :current-page="pageNum"
          :total="data.length"
        />
      </iCard>
    </iPage>
    <topicLookDialog
      :openAddTopic="openAddTopic"
      @closeDialog="closeDialog"
      :topicInfo="topicInfo"
    />
  </div>
</template>
<script>
import { iPage, iCard, iPagination } from 'rise'
import iTableML from '@/components/iTableML'
import { getMeetingDetail } from '@/api/meeting/home'
import { getMettingType } from '@/api/meeting/type'
import timeClock from '@/assets/images/time-clock.svg'
import positionMark from '@/assets/images/position-mark.svg'
import topicLookDialog from './components/topicLookDialog.vue'

export default {
  components: {
    iPage,
    iCard,
    iTableML,
    iPagination,
    topicLookDialog
  },
  data() {
    return {
      timeClock,
      positionMark,
      pageSize: 10,
      pageNum: 1,
      data: [],
      dataTable: [],
      result: {},
      typeObj: {},
      statusObj: {
        '01': 'MT_WEIJINXING',
        '02': 'MT_JINXINGZHONG',
        '03': 'MT_YIJIESHU'
      },
      timer: '',
      openAddTopic: false,
      topicInfo: {}
    }
  },

  methods: {
    lookOrEdit(row) {
      this.topicInfo = row
      this.openAddTopic = true
    },
    closeDialog() {
      this.openAddTopic = false
    },
    getTypeList() {
      let param = {
        pageSize: 1000,
        pageNum: 1
      }
      let obj = {}
      getMettingType(param).then((res) => {
        res.data.forEach((item) => {
          obj[item.id] = item.name
        })
        this.typeObj = obj
      })
    },
    query() {
      getMeetingDetail(this.$route.query).then((res) => {
        this.result = res
        this.data = res.themens
        this.dataTable = res.themens.slice(0, 1 * this.pageSize)
        this.handleCurrentChange(1)
      })
    },
    handleCurrentChange(pageNum) {
      // 页码切换
      this.pageNum = pageNum
      this.currentChangePage(this.data, this.pageNum)
    },
    // 分页方法
    currentChangePage(data, pageNum) {
      let from = (pageNum - 1) * this.pageSize
      let to = pageNum * this.pageSize
      this.dataTable = data.slice(from, to)
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
  },
  mounted() {
    this.getTypeList()
    this.query()
    this.timer = setInterval(() => {
      this.query()
    }, 10000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss" scoped>
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
/* ::v-deep .el-tooltip {
  width: ;
} */
.header {
  font-size: 18px;
  font-weight: bold;
}
.card-same-screen-box {
  padding: 10px 0;
  margin-top: 27px;
  color: #000;

  .title-info {
    background: rgba(22, 96, 241, 0.09);
    border-radius: 4px;
    padding: 20px 0 22px;
    text-align: center;
    margin-bottom: 40px;

    .info-line-1 {
      line-height: 35px;

      .meeting-type {
        display: inline-block;
        padding: 0 20px;
        min-width: 150px;
        line-height: 35px;
        height: 35px;
        background: white;
        color: #1763f7;
        box-shadow: 0 0 8px 0 rgba(124, 124, 124, 0.16);
        border-radius: 5px;
        text-align: center;
        margin-right: 20px;
        font-size: 16px;
      }
      .meeting-name {
        font-size: 16px;
        display: inline-block;
        line-height: 35px;
        height: 35px;
      }
    }
    .info-line-2 {
      display: flex;
      justify-content: center;

      .date-time-start {
        display: flex;
        line-height: 50px;
        margin-right: 40px;

        span {
          margin-left: 10px;
          font-size: 16px;
        }
      }
      .date-time-end {
        display: flex;
        line-height: 50px;
        span {
          margin-left: 10px;
          font-size: 16px;
        }
      }
    }
  }
}
::v-deep .unuse-row {
  color: #acb8cf;
}
::v-deep .active-row {
  background: #1660f1 !important;
  color: #fff;
  .open-link-text {
    color: #fff !important;
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
