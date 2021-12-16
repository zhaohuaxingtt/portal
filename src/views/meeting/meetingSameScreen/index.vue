<template>
  <iPage>
    <div class="header">{{ $t('MT_HUIYITONGPING') }}</div>
    <iCard class="card-same-screen-box">
      <div class="title-info">
        <div class="info-line-1">
          <div class="meeting-type">{{ result.meetingTypeName }}</div>
          <div class="meeting-name">{{ result.name }}</div>
        </div>
        <p class="info-line-2">
          <span class="date-time-start">
            <img :src="timeClock" alt="" srcset="" />
            <span>{{
              result.startDate +
              ' ' +
              result.startTime.substring(0, 5) +
              '~' +
              result.endTime.substring(0, 5)
            }}</span>
          </span>
          <span class="date-time-end">
            <img :src="positionMark" alt="" srcset="" />
            <span>{{ result.meetingPlace }}</span>
          </span>
        </p>
      </div>
      <ul class="content-box" v-if="result.state==='04'">
        <li v-for="(item, index) in data" :key="index" class="content-item">
          <div class="title" v-if="item.state == '02'">
            <div class="live">
              <div class="small"></div>
              <div class="middle"></div>
              <div class="big"></div>
              <div class="live-word">LIVE !</div>
            </div>
            <div class="model">
              <span class="left">{{ item.topic }}</span
              ><span class="right">
                <span class="right-left">{{ activeIndex + 1 }}</span
                ><span class="itrial">/</span
                ><span class="right-right">{{ result.themens.length }}</span>
              </span>
            </div>
          </div>
          <div class="no-live-title" v-else>
            <div class="no-live">
              <div v-if="item.state === '01'" class="live-word">NEXT</div>
              <div v-if="item.state === '03'" class="live-word">FINISH</div>
            </div>
            <div class="model">
              <span class="left">{{ item.topic }}</span
              ><span class="right">
                <span class="right-left">{{
                  activeIndex + index + 1 - finishSecond
                }}</span
                ><span class="itrial">/</span
                ><span class="right-right">{{ result.themens.length }}</span>
              </span>
            </div>
          </div>
          <ul class="table-box" v-if="!item.isBreak">
            <li class="prop-list">
              <span>Duration</span>
              <span class="prop-list-right" :title="item.duration">{{
                item.duration
              }}</span>
            </li>
            <li class="prop-list">
              <span>Sourcing</span>
              <span class="prop-list-right" :title="item.supporter">
                {{ item.supporter }}
              </span>
            </li>
            <li class="prop-list">
              <span>Linie</span>
              <span class="prop-list-right" :title="item.presenter">
                {{ item.presenter }}
              </span>
            </li>
            <li class="prop-list">
              <span>Commodity</span>
              <span class="prop-list-right" :title="item.presenterDept">
                {{ item.presenterDept }}
              </span>
            </li>
            <li class="prop-list">
              <span>Carline</span>
              <span class="prop-list-right" :title="item.carline">
                {{ item.carline }}
              </span>
            </li>
            <li class="prop-list">
              <span>Time</span>
              <span v-if="item.state === '02'" class="live-span-time"
                >{{ start(item) }} / Live!</span
              >
              <span v-if="item.state === '03'" class="no-live-span-time"
                >{{ start(item) }}/Finish</span
              >
              <span v-if="item.state === '01'" class="no-live-span-time"
                >{{ start(item) }}/Next</span
              >
            </li>
          </ul>
          <div v-else class="break-container">
            <div class="img-box">
              <img :src="rest" />
            </div>
          </div>
        </li>
      </ul>
      <ul class="content-box" v-else>
        <li v-for="(item, index) in data" :key="index" class="content-item">
          <div class="title" v-if="item.state == '02'">
            <div class="live">
              <div class="small"></div>
              <div class="middle"></div>
              <div class="big"></div>
              <div class="live-word">LIVE !</div>
            </div>
            <div class="model">
              <span class="left">{{ item.topic }}</span
              ><span class="right">
                <span class="right-left">{{ activeIndex + 1 }}</span
                ><span class="itrial">/</span
                ><span class="right-right">{{ result.themens.length }}</span>
              </span>
            </div>
          </div>
          <div class="no-live-title" v-else>
            <div class="no-live">
              <div v-if="item.state === '01'" class="live-word">NEXT</div>
              <div v-if="item.state === '03'" class="live-word">FINISH</div>
            </div>
            <div class="model">
              <span class="left">{{ item.topic }}</span
              ><span class="right">
                <span class="right-left">{{
                  index+1
                }}</span
                ><span class="itrial">/</span
                ><span class="right-right">{{ result.themens.length }}</span>
              </span>
            </div>
          </div>
          <ul class="table-box" v-if="!item.isBreak">
            <li class="prop-list">
              <span>Duration</span>
              <span class="prop-list-right" :title="item.duration">{{
                item.duration
              }}</span>
            </li>
            <li class="prop-list">
              <span>Sourcing</span>
              <span class="prop-list-right" :title="item.supporter">
                {{ item.supporter }}
              </span>
            </li>
            <li class="prop-list">
              <span>Linie</span>
              <span class="prop-list-right" :title="item.presenter">
                {{ item.presenter }}
              </span>
            </li>
            <li class="prop-list">
              <span>Commodity</span>
              <span class="prop-list-right" :title="item.presenterDept">
                {{ item.presenterDept }}
              </span>
            </li>
            <li class="prop-list">
              <span>Carline</span>
              <span class="prop-list-right" :title="item.carline">
                {{ item.carline }}
              </span>
            </li>
            <li class="prop-list">
              <span>Time</span>
              <span v-if="item.state === '02'" class="live-span-time"
                >{{ start(item) }} / Live!</span
              >
              <span v-if="item.state === '03'" class="no-live-span-time"
                >{{ start(item) }}/Finish</span
              >
              <span v-if="item.state === '01'" class="no-live-span-time"
                >{{ start(item) }}/Next</span
              >
            </li>
          </ul>
          <div v-else class="break-container">
            <div class="img-box">
              <img :src="rest" />
            </div>
          </div>
        </li>
      </ul>
      <addTopic
        v-if="openAddTopicDialog"
        :openDialog="openAddTopicDialog"
        @closeDialog="handleCloseAddTopicDialog"
        :editOrAdd="editOrAdd"
        :selectedTableData="selectedTableData"
        :meetingInfo="result"
      />
      <!-- 生成会议纪要 -->
      <newSummaryDialog
        v-if="openNewSummary"
        :open="openNewSummary"
        :id="id"
        :receiverId="result.receiverId"
        @handleOK="handleNewSummaryOK"
        @handleCancel="handleCloseSummary"
        @refreshTable="refreshTable"
      />
    </iCard>
  </iPage>
</template>
<script>
import { iPage, iCard } from 'rise'
import { getMeetingDetail } from '@/api/meeting/home'
import { getMettingType } from '@/api/meeting/type'
import timeClock from '@/assets/images/time-clock.svg'
import positionMark from '@/assets/images/position-mark.svg'
import rest from '@/assets/images/rest.svg'
import dayjs from 'dayjs'

import addTopic from './component/addTopic.vue'
import newSummaryDialog from './component/newSummaryDialog.vue'
// import { findThemenById } from '@/api/meeting/details'
export default {
  components: {
    iPage,
    iCard,
    addTopic,
    newSummaryDialog
  },
  data() {
    return {
      id: this.$route.query.id,
      openAddTopicDialog: false,
      editOrAdd: 'edit',
      openNewSummary: false,
      meetingInfo: {},
      selectedTableData: [],

      timeClock,
      positionMark,
      rest,
      data: [
        // {
        //   state:'02',
        //   topic:'花花',
        //   isBreak:false,
        //   duration:'dcdv',
        //   Sourcing:'jjao',
        //   SourcingNosys:'aaaaa',
        //   SourcingDept:'wefef',
        //   SourcingDeptNosys:'bbbbb',
        //   Commodity:'hhhh',
        //   CommodityNosys:'cccccc',
        //   CommodityDept:'hudhufh',
        //   CommodityDeptNosys:'ddddd',
        //   startTime:'08:00:00'
        // },
        // {
        //   state:'01',
        //   topic:'花花1',
        //   isBreak:false,
        //   duration:'dcdv',
        //   Sourcing:'jjao',
        //   SourcingNosys:'aaaaa',
        //   SourcingDept:'wefef',
        //   SourcingDeptNosys:'bbbbb',
        //   Commodity:'hhhh',
        //   CommodityNosys:'cccccc',
        //   CommodityDept:'hudhufh',
        //   CommodityDeptNosys:'ddddd',
        //   startTime:'08:00:00'
        // },
        // {
        //   state:'03',
        //   topic:'花花2',
        //   isBreak:false,
        //   duration:'dcdv',
        //   Sourcing:'jjao',
        //   SourcingNosys:'aaaaa',
        //   SourcingDept:'wefef',
        //   SourcingDeptNosys:'bbbbb',
        //   Commodity:'hhhh',
        //   CommodityNosys:'cccccc',
        //   CommodityDept:'hudhufh',
        //   CommodityDeptNosys:'ddddd',
        //   startTime:'08:00:00'
        // }
      ],
      result: {
        name: '',
        meetingTypeName: '',
        startDate: '',
        startTime: '',
        endTime: '',
        meetingPlace: '',
        themens: []
      },
      typeObj: {},
      activeIndex: 0,
      timer: '',
      isActive: true, // 判断有无正在进行中的议题
      finishSecond: 0
    }
  },
  watch: {
    data: {
      handler(v) {
        console.log('v', v)
      }
    },
    result: {
      handler(v) {
        console.log('v', v)
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
  },
  methods: {
    handleAddTopic() {
      this.openAddTopicDialog = true
    },
    handleCloseAddTopicDialog() {
      this.openAddTopicDialog = false
    },
    handleSummaryOpen() {
      this.openNewSummary = true
    },
    handleCloseSummary() {
      this.openNewSummary = false
    },
    start(info) {
      if (info.startTime) {
        return dayjs(new Date(`2021-9-23 ${info.startTime}`)).format('HH:mm')
      }
      return ''
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
        this.selectedTableData = [res.themens[1]]
        this.result = res
        let active = false
        for (let index = 0; index < res.themens.length; index++) {
          let item = res.themens[index]
          if (item.state == '02') {
            active = true
            this.data = res.themens.slice(index, index + 3)
            this.activeIndex = index
            break
          }
        }
        if (this.data.length === 1) {
          if (this.activeIndex - 2 >= 0) {
            this.finishSecond = 2
            this.data.unshift(res.themens[this.activeIndex - 1])
            this.data.unshift(res.themens[this.activeIndex - 2])
          } else {
            if (this.activeIndex - 1 >= 0) {
              this.finishSecond = 1
              this.data.unshift(res.themens[this.activeIndex - 1])
            }
          }
        } else {
          if (this.data.length === 2 && this.activeIndex - 1 >= 0) {
            this.finishSecond = 1
            this.data.unshift(res.themens[this.activeIndex - 1])
          }
        }
        console.log('this.data', this.data)
        if (!active) {
          this.isActive = false
          this.activeIndex = 0
          this.data = res.themens.slice(0, 3)
        }
        console.log(this.data)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.break-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 342px;
}
.table-box {
  padding: 25px 27px;
  .prop-list {
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    /* font-size: 20px; */
    font-size: 16px;
    font-family: Arial;
    font-weight: 400;
    .live-span-time {
      color: #01bf8a;
      font-weight: bold;
    }
    .no-live-span-time {
      color: #000000;
    }
    .prop-list-right {
      font-size: 14px;
      margin-left: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 60%;
      text-align: right;
    }
  }
  .prop-list + .prop-list {
    border-top: 1px solid #d9dee5;
  }
}
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

    .info-line-1 {
      display: flex;
      justify-content: center;
      align-items: center;
      .meeting-type {
        font-size: 18px;
        padding: 0 5px;
        min-width: 50px;
        line-height: 30px;
        height: 30px;
        color: white;
        background: #4b88fb;
        box-shadow: 0 0 8px 0 rgba(124, 124, 124, 0.16);
        border-radius: 4px;
        text-align: center;
        margin-right: 10px;
        font-weight: bold;
      }
      .meeting-name {
        font-size: 26px;
        line-height: 35px;
        height: 35px;
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

  .content-box {
    margin-top: 30px;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    .content-item {
      min-height: 449px;
      flex: 1;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
      max-width: 539px;
      .title {
        /* width: 526px; */
        width: 100%;
        margin: 0 auto;
        height: 105px;
        /* display: flex;
        justify-content: space-between;
        align-items: center; */
        background-color: #5c92f8;
        .live {
          display: flex;
          align-items: flex-end;
          margin-right: 8px;
          color: #fff;
          transform: translateY(-2px);
          height: 36px;
          margin-left: 15px;
          .big {
            width: 2px;
            height: 3px;
            background: #fff;
            border-radius: 1px;
            margin-right: 5px;
            transform: translateY(-4px);
          }
          .middle {
            width: 2px;
            height: 6px;
            background: #fff;
            border-radius: 1px;
            margin-right: 2px;
            transform: translateY(-4px);
          }
          .small {
            width: 2px;
            height: 12px;
            background: #fff;
            border-radius: 1px;
            margin-right: 2px;
            transform: translateY(-4px);
          }
          .live-word {
            /* font-size: 25px; */
            font-size: 16px;
            transform: translateY(8px);
            font-family: Arial;
            font-weight: bold;
            line-height: 36px;
          }
        }
        .model {
          color: #fff;
          height: 42px;
          /* font-size: 30px; */
          font-size: 18px;
          font-family: Arial;
          font-weight: bold;
          line-height: 42px;
          margin-left: 30px;
          margin-top: 15px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          .left {
            max-width: 391px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .itrial {
            /* font-size: 26px; */
            padding: 0 2px;
          }
          .right {
            font-size: 18px;
            margin-right: 30px;
            .right-right {
              // color: #e8ebef;
              /* font-size: 26px; */
              font-size: 16px;
            }
          }
        }
      }
      .no-live-title {
        /* width: 526px; */
        width: 100%;
        margin: 0 auto;
        height: 105px;
        /* display: flex;
        justify-content: space-between;
        align-items: center; */
        background-color: #e3e6ed;
        .no-live {
          display: flex;
          align-items: flex-end;
          margin-right: 8px;
          color: #fff;
          transform: translateY(-2px);
          height: 36px;
          margin-left: 15px;
          .live-word {
            /* font-size: 25px; */
            font-size: 16px;
            transform: translateY(8px);
            font-family: Arial;
            font-weight: bold;
            line-height: 36px;
            color: #5f6f8f;
          }
        }
        .model {
          color: #5f6f8f;
          height: 42px;
          /* font-size: 30px; */
          font-size: 18px;
          font-family: Arial;
          font-weight: bold;
          line-height: 42px;
          margin-left: 30px;
          margin-top: 15px;
          margin-bottom: 12px;
          display: flex;
          justify-content: space-between;
          .left {
            max-width: 391px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .itrial {
            // color: #8f8f90;
            /* font-size: 26px; */
            padding: 0 2px;
          }
          .right {
            margin-right: 30px;
            .right-right {
              // color: #8f8f90;
              /* font-size: 26px; */
              font-size: 16px;
            }
          }
        }
      }
    }
    .content-item + .content-item {
      margin-left: 40px;
    }
  }
}
</style>
