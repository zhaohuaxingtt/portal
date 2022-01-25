<!-- 会议展示  -->
<template>
  <div>
    <iPage>
      <div class="header">{{ $t('MT_HUIYIZHANSHI') }}</div>
      <iCard class="card-same-screen-box">
        <!-- 文字 -->
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
        <!-- 列表 -->
        <iTableML
           tooltip-effect="light"
          :data="dataTable"
          :rowClassName="tableRowClassName"
        >
            <!-- <el-table-column align="center" width="30"></el-table-column> -->
            <el-table-column
              type="selection"
              align="center"
              min-width="40"
            ></el-table-column>
            <!-- <el-table-column align="center" width="10"></el-table-column> -->
            <el-table-column align="center" label="#" width="23" >
              <template slot-scope="scope">
                <span style="span-index">{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <!-- 标记 -->
            <el-table-column align="center" label="标记" min-width="50">
              <template slot-scope="scope">
                <icon symbol :name="
                    scope.row.sign=='s' ? 'icon-baofeichuzhi' : scope.row.sign=='f' ?'icon-fenduandingdian':''" ></icon>
              </template>
            </el-table-column>
            <!-- 股别 presenterDept  -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="股别"
              min-width="136"
              prop="股别"
              sortable
            >
            <template slot-scope="scope">
                <span>{{scope.row.presenterDept}}</span>
              </template>
            </el-table-column>
            <!-- 项目  gpName 改 topic-->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="项目"
              min-width="198"
            >
              <template slot-scope="scope">
                 <span class="open-link-text look-themen-click" @click="handleCSC(scope.row)">{{scope.row.topic}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="15"></el-table-column> -->
            <!-- 上会次数 preCount-->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="上会次数"
              min-width="75"
              prop="上会次数"
            >
              <template slot-scope="scope">
                <span>{{scope.row.cscCount}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="15"></el-table-column> -->
            <!-- 采购申请号 procurementNumber 改 sourcingNo  -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="采购申请号"
              min-width="75"
            >
              <template slot-scope="scope">
                {{ scope.row.sourcingNo }}
              </template>
            </el-table-column>
            <!-- 申请部门  applyDept 改 supporterDept  -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="申请部门"
              min-width="59"
            >
              <template slot-scope="scope">
                <span>{{scope.row.supporterDept }}</span>
              </template>
            </el-table-column>
            <!-- 申请人  requestorName  改 supporter  -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="申请人"
              min-width="65"
              prop="ep"
            >
              <template slot-scope="scope">
                <span>{{scope.row.supporter}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="16"></el-table-column> -->
            <!-- 采购员  purchaserName  改 presenter  -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="采购员"
              min-width="115"
              prop="采购员"
            >
              <template slot-scope="scope">
                <span>{{scope.row.presenter}}</span>
              </template>
            </el-table-column>
            <!-- 时间  time-->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="时间"
              min-width="82"
            >
              <!-- <template slot-scope="scope">
                <span>{{scope.row.time}}</span>
              </template> -->
              <!-- <template slot-scope="scope">
                <span>
                  {{ scope.row.startDate.substring(0, 0) + ' ' + scope.row.startTime.substring(0, 5) }}
                  <span v-if="scope.row.endTime">{{  '~' + scope.row.endTime.substring(0, 5) }} </span>
                  <span v-else>~{{ handleEndTime(scope.row) }}</span>
                </span>
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
            <!-- <el-table-column align="center" width="14"></el-table-column> -->
            <!-- 状态  state-->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="状态"
              min-width="90"
              prop="presenterDept"
            >
               <template slot-scope="scope">
                  {{ statusObj[scope.row.state] }}
                </template> 
            </el-table-column>
            <!-- <el-table-column align="center" width="20"></el-table-column> -->
            <!-- 会议结论/纪要  conclusion-->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="会议结论/纪要"
              min-width="86"
            >
              <template slot-scope="scope">
                <span>{{ resultObj[scope.row.conclusion] }}</span>
              </template>
            </el-table-column>
            <!-- 是否推送大会 -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="是否推送大会"
              min-width="119"
              label-class-name="can-hideen"
            >
              <template slot-scope="scope">
                <span>{{scope.row.isSendBm == false ? '否' : scope.row.isSendBm == true ? '是' : ''}}</span>
              </template>
            </el-table-column>
            <!-- CSC汇报材料  cscStatus-->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="CSC汇报材料"
              min-width="119"
              label-class-name="can-hideen"
            >
              <template slot-scope="scope">
                <span>{{scope.row.cscStatus}}</span>
              </template>
            </el-table-column>
            <!-- 是否冻结  isCscFrozen-->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="是否冻结"
              width="89"
              label-class-name="can-hideen"
            >
              <template slot-scope="scope">
                <span>{{scope.row.conclusion == '02' ? '是' : '否' }}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="30"></el-table-column> -->
            <!-- 属性  attribute-->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="属性"
              width="88"
              prop="benDe"
              label-class-name="can-hideen"
            >
              <template slot-scope="scope">
                <span>{{scope.row.attribute}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column align="center" width="30"></el-table-column> -->
            <!-- CSC编号 -->
            <el-table-column
              show-overflow-tooltip
              align="center"
              label="CSC编号"
              min-width="90"
            >
              <template slot-scope="scope">
                <span>{{scope.row.cscCode}}</span>
              </template>
            </el-table-column>
         
        </iTableML>
        <iPagination
          v-update
          @current-change="handleCurrentChange($event)"
          background
          :page-size="pageSize"
          prev-text="上一页"
          next-text="下一页"
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
import dayjs from '@/utils/dayjs.js'
import { iPage, iCard, iPagination } from 'rise'
import iTableML from '@/components/iTableML'
// import { getMeetingDetail } from '@/api/meeting/home'
import { findThemenById } from '@/api/meeting/gpMeeting'
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
      resultObj:{
        '01': '待定',
        '02': '通过',
        '03': '预备会议通过',
        '04': '不通过',
        '05': 'Last Call',
        '06': '分段待定'
      },
      timeClock,
      positionMark,
      pageSize: 10,
      pageNum: 1,
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
      topicInfo: {}
    }
  },
  watch:{
    dataTable(){
      console.log(this.dataTable)
    }
  },
  methods: {
    handlePage(data = []) {
      // this.page.totalCount = data.length;
      // this.page.pageSize = 10;
      // this.tableData = data.filter((item, index) => {
      //   return index < 10;
      // });
      this.tableData = data
      this.tableData = this.tableData.map((item) => {
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
    handleEndTime(row) {
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
      findThemenById(this.$route.query).then((res) => {
        this.result = res
        this.data = res.themens
        this.dataTable = res.themens.slice(0, 1 * this.pageSize)
         this.handlePage(res.themens)
        this.handleCurrentChange(1)
         this.meetingInfo = res
         this.generateTime()
      })
    },
    generateTime() {
      const startDate = this.meetingInfo.startDate
      const startTime = this.meetingInfo.startTime
      const endDate = this.meetingInfo.endDate
      const endTime = this.meetingInfo.endTime
      this.begin = dayjs(new Date(`${startDate} ${startTime}`)).format(
        'YYYY/MM/DD HH:mm'
      )
      this.end = `~${dayjs(new Date(`${endDate} ${endTime}`)).format('HH:mm')}`
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
    },
    handleCSC(row){
      console.log(row);
      if (row.isBreak) {
        iMessage.error('改议题为休息')
      }else if(row.type == 'MANUAL'){
        iMessage.error('改议题为临时议题')
      }else{
        let num = null 
        if (row.documentType == '13') {
            num = 1
        }else{
            num = 3
        }
        window.open(`${process.env.VUE_APP_HOST}/gpurchase/#/myCscDetails/${row.fixedPointApplyId}?current=${num}`)
      } 
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
