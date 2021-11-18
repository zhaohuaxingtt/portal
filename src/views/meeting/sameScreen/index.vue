<template>
  <iPage>
    <div class="header">会议同屏</div>
    <iCard class="card-same-screen-box">
      <div class="title-info">
        <p class="info-line-1">
          <span class="meeting-type">{{ result.name }}</span>
          <span class="meeting-name">{{ typeObj[result.meetingTypeId] }}</span>
        </p>
        <p class="info-line-2">
          <span class="date-time-start">
            <img :src="timeClock" alt="" srcset="" />
            <span>{{
              result.startDate + ' ' + result.startTime + '~' + result.endTime
            }}</span>
          </span>
          <span class="date-time-end">
            <img :src="positionMark" alt="" srcset="" />
            <span>{{ result.meetingPlace }}</span>
          </span>
        </p>
      </div>
      <ul class="content-box">
        <!-- <li
          v-for="(item, index) in data"
          :key="index"
          :class="{
            'right-item': index === 1,
            'normal-item': !isActive,
            'content-item': true,
            'center-item': index === 2,
          }"
        > -->
        <li v-for="(item, index) in data" :key="index" class="content-item">
          <!-- <span class="right-num">
            <span class="right-num-1">{{ activeIndex + index + 1 }}</span>
            <img class="right-num-2" :src="percentLine" alt="" srcset="" />
            <span class="right-num-3">{{ result.themens.length }}</span>
          </span>
          <div class="meeting-name">
            {{
              item.state == "02"
                ? "LIVE!"
                : item.state == "01"
                ? "NEXT"
                : "FINISHED"
            }}
          </div>
          <div class="meeting-content">{{ item.topic }}</div> -->
          <!-- <span></span> -->
          <div class="title" v-if="item.state == '02'">
            <div class="live">
              <div class="big"></div>
              <div class="middle"></div>
              <div class="small"></div>
              <div class="live-word">Live!</div>
            </div>
            <div class="model">
              <span class="left">{{ item.topic }}</span
              ><span class="right">
                <span class="right-left">{{ activeIndex + 1 }}/</span
                ><span class="right-right">{{ result.themens.length }}</span>
              </span>
            </div>
          </div>
          <div class="no-live-title" v-else>
            <div class="no-live">
              <div v-if="item.state === '01'" class="live-word">Next</div>
              <div v-else class="live-word">Finish</div>
            </div>
            <div class="model">
              <span class="left">{{ item.topic }}</span
              ><span class="right">
                <span class="right-left"
                  >{{ activeIndex + index + 1 - finishSecond
                  }}<span class="itrial">/</span></span
                ><span class="right-right">{{ result.themens.length }}</span>
              </span>
            </div>
          </div>
          <ul class="table-box" v-if="!item.isBreak">
            <!-- <li class="table-item">
              <span>时长</span>
              <span>{{ item.duration }}分钟</span>
            </li>
            <li class="table-item double-item">
              <span>演讲人</span>
              <span
                >{{ item.presenter
                }}{{
                  item.presenterNosys
                    ? item.presenter
                      ? "," + item.presenterNosys
                      : item.presenterNosys
                    : ""
                }}</span
              >
            </li>
            <li class="table-item">
              <span>演讲人部门</span>
              <span
                >{{ item.presenterDept
                }}{{
                  item.presenterDeptNosys
                    ? item.presenterDept
                      ? "," + item.presenterDeptNosys
                      : item.presenterDeptNosys
                    : ""
                }}</span
              >
            </li>
            <li class="table-item double-item">
              <span>时间</span>
              <span style="color: #1660F1">{{
                item.startTime ? item.startTime.substring(0, 5) : ""
              }}</span>
            </li> -->
            <li class="prop-list">
              <span>Duration</span>
              <span>{{ item.duration }}</span>
            </li>
            <li class="prop-list">
              <span>Presenter</span>
              <span>
                {{ item.presenter
                }}{{
                  item.presenterNosys
                    ? item.presenter
                      ? ',' + item.presenterNosys
                      : item.presenterNosys
                    : ''
                }}
              </span>
            </li>
            <li class="prop-list">
              <span>Presenter Department</span>
              <span>
                {{ item.presenterDept
                }}{{
                  item.presenterDeptNosys
                    ? item.presenterDept
                      ? ',' + item.presenterDeptNosys
                      : item.presenterDeptNosys
                    : ''
                }}
              </span>
            </li>
            <li class="prop-list">
              <span>Supporter</span>
              <span>
                {{ item.supporter
                }}{{
                  item.supporterNosys
                    ? item.supporter
                      ? ',' + item.supporterNosys
                      : item.supporterNosys
                    : ''
                }}
              </span>
            </li>
            <li class="prop-list">
              <span>Supporter Department</span>
              <span>
                {{ item.supporterDept
                }}{{
                  item.supporterDeptNosys
                    ? item.supporterDept
                      ? ',' + item.supporterDeptNosys
                      : item.supporterDeptNosys
                    : ''
                }}
              </span>
            </li>
            <li class="prop-list">
              <span>Time</span>
              <span v-if="item.state === '02'" class="live-span-time"
                >{{ start(item) }}/Live!</span
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
    </iCard>
  </iPage>
</template>
<script>
import { iPage, iCard } from 'rise'
import { getMeetingDetail } from '@/api/meeting/home'
import { getMettingType } from '@/api/meeting/type'
import timeClock from '@/assets/images/time-clock.svg'
import positionMark from '@/assets/images/position-mark.svg'
import percentLine from '@/assets/images/percent-line.svg'
import rest from '@/assets/images/rest.svg'
import dayjs from 'dayjs'
export default {
  components: {
    iPage,
    iCard
  },
  data() {
    return {
      timeClock,
      positionMark,
      percentLine,
      data: [],
      result: {},
      typeObj: {},
      activeIndex: 0,
      timer: '',
      isActive: true, // 判断有无正在进行中的议题
      finishSecond: 0,
      rest
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
  methods: {
    start(info) {
      return dayjs(new Date(`2021-9-23 ${info.startTime}`)).format('HH:mm')
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
        // let themensUnuse = res.themens.filter((item)=>{
        //   return item.state != '03';
        // })
        // let themensUnuse = res.themens;
        let active = false
        // console.log('themensUnuse', themensUnuse)
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
          // this.data = themensUnuse.slice(0,2);
          this.data = res.themens.slice(0, 3)
        }
        console.log(this.data)
      })
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
.break-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 342px;
}
.table-box {
  padding: 0 27px;
  .prop-list {
    height: 57px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    /* font-size: 20px; */
    font-size: 16px;
    font-family: Arial;
    font-weight: 400;
    .live-span-time {
      color: #00a378;
    }
    .no-live-span-time {
      color: #000000;
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
      line-height: 35px;

      .meeting-type {
        display: inline-block;
        /* font-size: 16px; */
        font-size: 14px;
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

  .content-box {
    margin-top: 40px;
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    .content-item {
      height: 449px;
      flex: 1;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
      .title {
        /* width: 526px; */
        width: 100%;
        margin: 0 auto;
        height: 105px;
        /* display: flex;
        justify-content: space-between;
        align-items: center; */
        background-color: #6c96ea;
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
            height: 12px;
            background: #fff;
            border-radius: 1px;
            margin-right: 2px;
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
            height: 3px;
            background: #fff;
            border-radius: 1px;
            margin-right: 5px;
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
          .right {
            font-size: 20px;
            margin-right: 30px;
            .right-right {
              color: #e8ebef;
              font-size: 16px;
              /* font-size: 24px; */
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
        background-color: #e2e6eb;
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
            color: #8f8f90;
          }
          .right {
            margin-right: 30px;
            .right-right {
              font-size: 16px;
              /* font-size: 24px; */
            }
          }
        }
      }
    }
    .content-item + .content-item {
      margin-left: 15px;
    }
  }
}
</style>
