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
          <el-table-column type="selection" align="center"></el-table-column>
          <el-table-column
            show-overflow-tooltip
            align="center"
            label="#"
            width="50"
          >
            <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.itemNo }}</span>
            </template>
          </el-table-column>
          <el-table-column show-overflow-tooltip align="center" label="MBDL名称" width="120" >
            <!-- <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row }}</span>
            </template> -->
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="英文名称" width="120" >
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="采购分类" width="120" >
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="有效期起" width="120" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.createDate }}</span>
            </template>
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="有效期止" width="120" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.updateDate }}</span>
            </template>
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="主要申请部门" width="120" >
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="股别" width="120" >
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="提交人" width="120" >
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="时间" width="120" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.time }}</span>
            </template>
          </el-table-column>
           <!-- <el-table-column show-overflow-tooltip align="center" label="状态" width="110" >
             <template slot-scope="scope">
              <span class="open-link-text">{{ scope.row.state }}</span>
            </template>
          </el-table-column> -->
          <el-table-column
            prop="status"
            width="110"
            min-width="70"
            align="center"
            label="状态"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ statusObj[scope.row.state] }}
            </template>
          </el-table-column>
           <el-table-column show-overflow-tooltip align="center" label="会议结论/纪要" width="120" >
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
        '01': '未进行',
        '02': '进行中',
        '03': '已结束'
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
