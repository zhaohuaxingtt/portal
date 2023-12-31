<template>
  <iCard class="near-meeting-table">
    <iTableML
      tooltip-effect="light"
      :data="data"
      :rowClassName="tableRowClassName"
    >
      <el-table-column width="27" align="center" label=""></el-table-column>
      <el-table-column
        type="index"
        align="center"
        label="No."
        width="40"
        min-width="40"
      ></el-table-column>
      <el-table-column width="81" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        :label="$t('MT_HUIYIMINGCHENG')"
        width="340"
        min-width="340"
      >
        <template slot-scope="scope">
          <span @click="goToDetail(scope.row.id)" class="open-link-text">{{
            scope.row.name
          }}</span>
        </template>
      </el-table-column>
      <el-table-column width="81" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="meetingTypeName"
        align="center"
        :label="$t('MT_HUIYILEIXING')"
        min-width="90"
        width="90"
      ></el-table-column>
      <el-table-column width="81" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="state"
        align="center"
        :label="$t('MT_HUIYIZHUANGTAI')"
        min-width="70"
        width="70"
      >
        <template slot-scope="scope">
          <span
            :class="[
              {
                draft: scope.row.state == '01',
                open: scope.row.state == '02',
                lock: scope.row.state == '03',
                begin: scope.row.state == '04',
                end: scope.row.state == '05',
                close: scope.row.state == '06'
              },
              'circle'
            ]"
            >{{ $t(statusObj[scope.row.state]) }}</span
          >
        </template>
      </el-table-column>
      <el-table-column width="81" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="meetingPlace"
        align="center"
        :label="$t('MT_HUIYIDIDIAN')"
        width="150"
        min-width="150"
      ></el-table-column>
      <el-table-column width="61" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="time"
        align="center"
        :label="$t('MT_HUIYISHIJIAN')"
        min-width="240"
        width="240"
      >
        <template slot-scope="scope">
          <span>{{
            `${scope.row.startDate}
              ${scope.row.startTime ? scope.row.startTime.substring(0, 5) : ''}~
              ${
                scope.row.endTime
                  ? scope.row.endTime.substring(0, 5)
                  : handleEndTime(scope.row)
              }`
          }}</span>
        </template>
      </el-table-column>
      <el-table-column width="60" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="weekOfYear"
        align="center"
        :label="$t('MT_ZHOUCI_')"
        min-width="90"
        width="90"
      >
        <template slot-scope="scope">
          <span>CW{{ scope.row.weekOfYear }}/{{ handleWeeks() }}</span>
        </template>
      </el-table-column>
      <el-table-column width="81" align="center" label=""></el-table-column>
      <el-table-column
        show-overflow-tooltip
        prop="presenterDept"
        align="center"
        :label="$t('MT_FUJIAN')"
        min-width="60"
        width="60"
      >
        <template slot-scope="scope">
          <span class="attachments-box">
            <el-popover placement="right" trigger="click">
              <div class="enclosure-popover">
                <p class="title">{{ $t('MT_FUJIAN') }}</p>
                <ul>
                  <li
                    v-for="item in scope.row.attachments"
                    :key="item.attachmentId"
                    class="open-link-text enclosure-item"
                    @click="downloadEnclosure(item)"
                  >
                    <img :src="enclosure" alt="" srcset="" />
                    <span style="color: #1763f7">{{
                      item.attachmentName
                    }}</span>
                  </li>
                </ul>
              </div>
              <div slot="reference" class="enclosure">
                <img :src="enclosure" alt="" />
                <span class="open-link-text attachments-num">{{
                  scope.row.attachments ? scope.row.attachments.length : 0
                }}</span>
              </div>
            </el-popover>
          </span>
        </template>
      </el-table-column>
      <el-table-column width="27" align="center" label=""></el-table-column>
      <!-- <el-table-column prop="supporter" align="center" label="操作" min-width="200">
        <template slot-scope="scope">
          <p class="action-box" @click="newSummary(scope.row.id)">
            <img class="new-file" :src="newFile" alt="" srcset="" />
            <span>查看会议纪要</span>
          </p>
        </template>
      </el-table-column> -->
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
    <!-- 生成会议纪要 -->
    <newSummaryDialog
      v-if="open"
      :open="open"
      :id="id"
      @handleCancel="handleCancel"
    />
  </iCard>
</template>

<script>
import { iPagination, iMessage, iCard } from 'rise'
import iTableML from '@/components/iTableML'
import enclosure from '@/assets/images/enclosure.svg'
import newFile from '@/assets/images/meeting-home/newFile.svg'
// import { findThemenById } from "@/api/meeting/details";
import newSummaryDialog from './newSummaryDialog.vue'
import { download } from '@/utils/downloadUtil'
import dayjs from 'dayjs'

export default {
  components: {
    iPagination,
    iTableML,
    iCard,
    newSummaryDialog
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
      enclosure,
      newFile,
      open: false,
      id: '',
      statusObj: {
        '01': 'MT_CAOGAO',
        '02': 'MT_KAIFANG',
        '03': 'MT_SUODING',
        '04': 'MT_KAISHI',
        '05': 'MT_JIESHU',
        '06': 'MT_GUANBI'
      }
    }
  },
  mounted() {},
  methods: {
    handleWeeks() {
      const currentFistYearDay = `${dayjs().year()}-01-01`
      const isLeap = dayjs(currentFistYearDay).isLeapYear() // true
      const totalDay = isLeap ? 366 : 365
      const weekNum2 =
        new Date(currentFistYearDay).getDay() === 0
          ? 7
          : new Date(currentFistYearDay).getDay()
      const shouldDel = weekNum2 === 1 ? 0 : 7 - weekNum2 + 1
      const weekNum = Math.ceil((totalDay - shouldDel) / 7)
      return weekNum
    },
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
        return str + ' +1'
      }
      return str
    },

    goToDetail(e) {
      this.$router.push({
        path: '/meeting/near-meeting/detail',
        query: {
          id: e
        }
      })
    },

    // 切换分页
    handleCurrentChange(e) {
      this.$emit('handleCurrentChange', e)
    },

    // 下载附件
    downloadEnclosure(e) {
      if (e.attachmentUrl) {
        window.open(`${e.attachmentUrl}`, '_blank')
      } else {
        download({
          fileIds: e.attachmentId,
          filename: e.attachmentName,
          callback: (e) => {
            if (!e) {
              iMessage.error(this.$t('MT_XIAZAISHIBAI'))
            }
          }
        })
      }
    },

    // 生成会议纪要
    newSummary(e) {
      this.id = e
      this.open = true
    },

    handleCancel() {
      this.open = false
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .cell {
  padding: 0 !important;
}
.near-meeting-table {
  /* ::v-deep .circle:before {
    content: "";
    display: inline-block;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    position: relative;
    top: 2px;
    margin-right: 10px;
  }

  ::v-deep .draft:before {
    background: #FCC687;
  }
  ::v-deep .open:before {
    background: #09BDFE;
  }
  ::v-deep .lock:before {
    background: #F286A0;
  }
  ::v-deep .begin:before {
    background: #1CBDB4;
  }
  ::v-deep .end:before {
    background: #8E9EAB;
  }
  ::v-deep .close:before {
    background: #887BF2;
  } */

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

  ::v-deep .attachments-box {
    display: flex;
    justify-content: center;

    .attachments-icon {
      width: 20px;
      height: 20px;
    }

    .attachments-num {
      line-height: 20px;
    }
    .enclosure {
      display: flex;
      img {
        margin-right: 4px;
      }
    }
  }

  ::v-deep .action-box {
    display: flex;
    justify-content: center;

    img {
      margin-right: 6px;
      width: 18px;
      height: 20px;
    }
    span {
      line-height: 20px;
    }
  }
  ::v-deep .cardBody {
    padding-bottom: 0;
  }
}

.attachments-box {
  cursor: pointer;
}

.enclosure-popover {
  .title {
    font-size: 14px;
    color: #000000;
    letter-spacing: 0;
    font-weight: 700;
  }

  .enclosure-item {
    margin-top: 10px;
    display: flex;
    cursor: pointer;

    img {
      margin-right: 10px;
    }
  }
}
</style>
