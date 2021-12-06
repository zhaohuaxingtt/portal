<template>
  <div class="card-same-screen-box">
    <ul class="content-box">
      <li class="content-item">
        <div class="title" v-if="themen.state == '02'">
          <div class="live">
            <div class="small"></div>
            <div class="middle"></div>
            <div class="big"></div>
            <div class="live-word">LIVE !</div>
          </div>
          <div class="model">
            <span class="left">{{ themen.topic }}</span
            ><span class="right">
              <span class="right-left">{{ num }}</span
              ><span class="itrial">/</span
              ><span class="right-right">{{ total }}</span>
            </span>
          </div>
        </div>
        <div class="no-live-title" v-else>
          <div class="no-live">
            <div v-if="themen.state === '01'" class="live-word">NEXT</div>
            <div v-if="themen.state === '03'" class="live-word">FINISH</div>
          </div>
          <div class="model">
            <span class="left">{{ themen.topic }}</span
            ><span class="right">
              <span class="right-left">{{ num }}</span
              ><span class="itrial">/</span
              ><span class="right-right">{{ total }}</span>
            </span>
          </div>
        </div>
        <ul class="table-box" v-if="!themen.isBreak">
          <li class="prop-list">
            <span>Duration</span>
            <span class="prop-list-right" :title="themen.duration">{{
              themen.duration
            }}</span>
          </li>
          <li class="prop-list">
            <span>Sourcing</span>
            <span class="prop-list-right" :title="themen.supporter">
              {{ themen.supporter }}
            </span>
          </li>
          <li class="prop-list">
            <span>Linie</span>
            <span class="prop-list-right" :title="themen.presenter">
              {{ themen.presenter }}
            </span>
          </li>
          <li class="prop-list">
            <span>Commodity</span>
            <span class="prop-list-right" :title="themen.presenterDept">
              {{ themen.presenterDept }}
            </span>
          </li>
          <li class="prop-list">
            <span>Carline</span>
            <span class="prop-list-right" :title="themen.carline">
              {{ themen.carline }}
            </span>
          </li>
          <li class="prop-list">
            <span>Time</span>
            <span v-if="themen.state === '02'" class="live-span-time"
              >{{ nowTime }} / Live!</span
            >
            <span v-if="themen.state === '03'" class="no-live-span-time">
              `{{ `${endDate} ${themen.endTime}` }}/Finish</span
            >
            <span v-if="themen.state === '01'" class="no-live-span-time"
              >{{ `${startDate} ${themen.startTime}` }}/Next</span
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
  </div>
</template>
<script>
import dayjs from 'dayjs'
import rest from '@/assets/images/rest.svg'
export default {
  props: {
    themen: {
      type: Object,
      default: () => {
        return {}
      }
    },
    total: {
      type: Number,
      default: () => {
        return 0
      }
    },
    num: {
      type: Number,
      default: () => {
        return 0
      }
    },
    startDate: {
      type: String,
      default: () => {
        return ''
      }
    },
    endDate: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      rest,
      nowTime: dayjs(new Date()).format('HH:mm:ss'),
      timer: ''
    }
  },
  mounted() {
    if (this.themen.state === '02') {
      this.timer = setInterval(() => {
        this.nowTime = this.getNowTime()
      }, 5000)
    }
  },
  methods: {
    getNowTime() {
      return dayjs(new Date()).format('HH:mm:ss')
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss" scoped>
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
  .break-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 435px;
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
}
</style>
