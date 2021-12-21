<template>
  <iPage>
    <div class="header">{{$t('MT_HUIYIZHANSHI')}} Meeting Live</div>
    <iCard class="card-same-screen-box">
      <div class="title-info">
        <p class="info-line-1">
          <span class="meeting-type">
            {{ result.meetingTypeName }}
            <!-- CSC -->
          </span>
          <span class="meeting-name">
            {{ result.name }}
            <!-- CW24/2020 SVW SCS Meeting for Production Purchasing -->
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
        :data="dataList"
        :rowClassName="tableRowClassName"
      >
        <el-table-column
          label="#"
          align="center"
          width="100"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span class="table-index">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <!-- 议题主题 -->
        <el-table-column
          prop="topic"
          align="center"
          label="Present Items"
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
        <!-- <el-table-column align="center" label=""></el-table-column> -->
        <!-- 零件号 -->
        <el-table-column
          prop="tnr"
          align="center"
          label="Part No."
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="scope.row.tnr">{{ scope.row.tnr }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>

        <!-- 零件中文名 -->
        <el-table-column
          prop="benCn"
          align="center"
          label="BEN(DE)"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="scope.row.benCn">{{ scope.row.benDe }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>

        <!-- 车型 -->
        <el-table-column
          prop="carline"
          align="center"
          label="Carline"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="scope.row.carline">{{ scope.row.carline }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>

        <!-- 支持者 -->
        <el-table-column
          prop="supporterEn"
          align="center"
          label="Sourcing"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="scope.row.supporterEn">{{
              scope.row.supporterEn
            }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>

        <!-- 演讲人 -->
        <el-table-column
          prop="presenterEn"
          align="center"
          label="Linie"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="scope.row.presenterEn">{{
              scope.row.presenterEn
            }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>

        <!-- 演讲人部门 -->
        <el-table-column
          prop="presenterDept"
          align="center"
          label="Commodity"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="scope.row.presenterDept">{{
              scope.row.presenterDept
            }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>

        <!-- EP -->
        <el-table-column
          prop="ep"
          align="center"
          label="EP"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="scope.row.ep">{{ scope.row.ep }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>

        <!-- 状态 -->
        <el-table-column
          prop="status"
          align="center"
          label="Status"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="scope.row.state">{{ statusObj[scope.row.state] }}</span>
            <span v-else>-</span>
          </template>
        </el-table-column>

        <!-- 时间 -->
        <el-table-column
          prop="startTime"
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
            <span v-else>-</span>
          </template>
        </el-table-column>
      </iTableML>
      <iPagination
        v-update
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :prev-text="$t('MT_SHANGYIYE')"
        :next-text="$t('MT_XIAYIYE')"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.total"
      />
    </iCard>
    <topicLookDialog
      v-if="openAddTopic"
      :openAddTopic="openAddTopic"
      @closeDialog="closeDialog"
      :topicInfo="topicInfo"
      :isMeetingShow="true"
    />
  </iPage>
</template>
<script>
import { iCard, iPage, iPagination } from 'rise'
import iTableML from '@/components/iTableML'
import { getMeetingDetail } from '@/api/meeting/home'
import timeClock from '@/assets/images/time-clock.svg'
import positionMark from '@/assets/images/position-mark.svg'
import topicLookDialog from './components/topicLookDialog.vue'
import { pageMixins } from '@/utils/pageMixins'
import dayjs from 'dayjs'
export default {
  mixins: [pageMixins],
  components: {
    iPage,
    iCard,
    iTableML,
    iPagination,
    topicLookDialog
  },
  data() {
    return {
      processUrl: process.env.VUE_APP_POINT,
      processUrlPortal: process.env.VUE_APP_POINT_PORTAL,
      timeClock,
      positionMark,
      data: [],
      dataTable: [],
      result: {},
      typeObj: {},
      statusObj: {
        '01': '未进行',
        '02': '进行中',
        '03': '已结束'
      },
      timer: '',
      openAddTopic: false,
      topicInfo: {},
      id: ''
    }
  },
  created() {
    this.id = this.$route.query.id
    console.log(215, this.$route)
  },
  mounted() {
    // this.getTypeList();
    this.query()
    this.timer = setInterval(() => {
      this.query()
    }, 10000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  computed: {
    dataList() {
      const { currPage, pageSize } = this.page
      return this.data?.slice((currPage - 1) * pageSize, pageSize * currPage)
    }
  },
  methods: {
    handleEndTime(row) {
      // let startTime =  new Date(`${row.startDate} ${row.startTime}`).getTime()
      let startTimeDate = new Date(`${row.startDate} ${row.startTime}`)
      let endTime =
        new Date(`${row.startDate} ${row.startTime}`).getTime() +
        3600 * 8 * 1000
      let endTimeDate = new Date(endTime)
      let str = dayjs(endTime).format('HH:mm')
      let startHour = startTimeDate.getHours()
      let endHour = endTimeDate.getHours()
      if (endHour < startHour) {
        return '~' + str + ' +1'
      }
      return '~' + str
    },
    lookOrEdit(row) {
      console.log('row', row)
      if (row.source === '04') {
        // window.open(
        //     `${this.processUrl}/designate/decisiondata/mtz?desinateId=${row.fixedPointApplyId}&isPreview=1`,
        //     "_blank"
        // );
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
        this.topicInfo = row
        this.openAddTopic = true
      }
    },
    closeDialog() {
      this.openAddTopic = false
    },
    // getTypeList() {
    //   let param = {
    //     pageSize: 10,
    //     pageNum: 1,
    //   };
    //   let obj = {};
    //   getMettingType(param).then((res) => {
    //     console.log('fawfafwaf',res)
    //     // res.data.forEach((item) => {
    //     //   obj[item.id] = item.name;
    //     // });
    //     // this.typeObj = obj;
    //   });
    // },
    query() {
      const param = { id: this.id }
      getMeetingDetail(param).then((res) => {
        this.result = res
        this.data = res.themens
        this.page.total = this.data.length
      })
    },
    handleCurrentChange(val) {
      this.page.currPage = val
    },
    handleSizeChange(val) {
      this.page.currPage = 1
      this.page.pageSize = val
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

.form-item-click {
  color: blue;
  cursor: pointer;
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
      /* line-height: 35px; */
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;

      .meeting-type {
        font-size: 0.9rem;
        display: inline-block;
        line-height: 1.5rem;
        height: 1.5rem;
        font-weight: bold;
        box-shadow: 0 0 0.5rem 0 rgb(124 124 124 / 16%);
        border-radius: 0.3125rem;
        background-color: #3b7ffe;
        color: #fff;
        margin-right: 0.5rem;
        padding: 0 0.5rem;
        /* background-color: #0556f3;
        color: #fff;
        text-align: center;
        padding: 0 0.2rem;
        font-size: 1rem;
        box-shadow: 0 0 0.5rem 0 rgb(124 124 124 / 16%);
        border-radius: 0.3125rem;
        margin-right: 0.5rem; */
      }

      .meeting-name {
        font-size: 1.3rem;
        display: inline-block;
        line-height: 2.1875rem;
        height: 2.1875rem;
        font-weight: bold;
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

  .open-link-text {
    color: #acb8cf !important;
  }
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
