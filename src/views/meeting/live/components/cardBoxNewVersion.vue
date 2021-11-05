<template>
  <div class="card-content">
    <div class="card">
      <div class="header-live" v-if="themen.state === '02'">
        <div class="meeting-state">
          <div class="live">
            <div class="big"></div>
            <div class="middle"></div>
            <div class="small"></div>
          </div>
          <div>LIVE!</div>
        </div>
      </div>
      <div class="header-other" v-else>
        <div class="meeting-state">
          {{ themen.state === '01' ? 'Next' : 'Finish' }}
        </div>
      </div>
      <div class="header-info">
        <div
          :class="themen.state !== '02' ? 'themen-name long-name' : 'long-name'"
          ref="boxTopic"
        >
          <span ref="spanTopic" :title="themen.topic" class="long-name-span">
            {{ themen.topic }}</span
          >
        </div>
        <div
          :class="
            themen.state !== '02' ? 'themen-num  themen-num-no' : 'themen-num'
          "
        >
          <span class="current-num">{{ index ? index : themen.itemNo }}</span
          >/{{ total }}
        </div>
      </div>
      <div class="container" v-if="!themen.isBreak">
        <div class="ul-li">
          <div class="left">Item No</div>
          <div class="right">{{ themen.itemNo }}</div>
        </div>
        <div class="ul-li">
          <div class="left">Count</div>
          <div class="right">{{ themen.count }}</div>
        </div>
        <div class="ul-li">
          <div class="left">Presenter</div>
          <div class="right">
            {{ themen.presenter
            }}{{
              themen.presenter && themen.presenterNosys
                ? ',' + themen.presenterNosys
                : themen.presenterNosys
                ? themen.presenterNosys
                : ''
            }}
          </div>
        </div>
        <div class="ul-li">
          <div class="left">Presenter Department</div>
          <div class="right">
            {{ themen.presenterDept
            }}{{
              themen.presenterDept && themen.presenterDeptNosys
                ? ',' + themen.presenterDeptNosys
                : themen.presenterDeptNosys
                ? themen.presenterDeptNosys
                : ''
            }}
          </div>
        </div>
        <div class="time">
          <div class="time-left">Time</div>
          <div class="time-right-live" v-if="themen.state === '02'">
            {{ themen.startTime }}/Live!
          </div>
          <div class="time-right" v-else>
            {{ themen.startTime }}/
            {{ themen.state === '01' ? 'Next' : 'Finished' }}!
          </div>
        </div>
      </div>
      <div class="rest" v-else>
        <div class="img-box">
          <img src="~@/assets/images/rest.svg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    index: {
      type: Number,
      default: 0
    },
    meetingName: {
      type: String,
      default: () => {
        return ''
      }
    },
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
    current: {
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
      timer: '',
      nowTime: dayjs(new Date()).format('HH:mm:ss')
    }
  },
  created() {
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
  },
  watch: {
    themen: {
      handler(data) {
        // console.log(data);
      }
    }
  },
  computed: {
    dom: function() {
      console.log(this.$refs.boxTopic.$el)
      console.log(this.$refs.spanTopic.$el)
      return 0
    }
  }
}
</script>
<style lang="scss" scoped>
/* @keyframes liveBounce{
   0%{
       transform: scale(0);
   }
   50%{
       transform: scale(1.5);
   }
   100%{
       transform: scale(1);
   }
} */
.long-name {
  width: 420px;
  .long-name-span {
    display: block;
    max-width: 420px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.card-content {
  position: relative;
  flex-grow: 1;
  flex-shrink: 0;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  box-shadow: 0 0 1.25rem rgb(27 29 33 / 8%);
}
.card {
  width: 100%;
  border-radius: 10px;
  border-color: 1px solid #ccc;
  box-shadow: 0 0 20px rgba(255, 255, 255, 1);
  overflow: hidden;
  .header-info {
    position: absolute;
    display: flex;
    justify-content: space-between;
    height: 25px;
    width: 100%;
    padding: 0 23px 0 20px;
    top: 47px;
    line-height: 25px;
    font-size: 18px;
    /* font-family: Arial; */
    font-weight: 400;
    color: #ffffff;
    .themen-num {
      height: 22px;
      line-height: 22px;
      font-size: 16px;
      .current-num {
        font-size: 20px;
      }
    }
    .themen-name {
      color: #5f6f8f;
    }
    .themen-num-no {
      color: rgba(143, 143, 144, 1);
      .current-num {
        color: rgba(95, 111, 143, 1);
      }
    }
  }
  .header-live {
    position: relative;
    height: 80px;
    background-color: rgba(108, 150, 234, 1);
    .meeting-state {
      position: absolute;
      display: flex;
      height: 22px;
      font-size: 16px;
      color: #fff;
      align-items: center;
      font-size: 16px;
      /* font-family: Arial; */
      font-weight: bold;
      line-height: 23px;
      top: 7px;
      left: 11px;
      .live {
        display: flex;
        align-items: flex-end;
        margin-right: 5px;
        color: #fff;
        .big {
          width: 2px;
          height: 12px;
          background: #fff;
          border-radius: 1px;
          margin-right: 2px;
        }
        .middle {
          width: 2px;
          height: 6px;
          background: #fff;
          border-radius: 1px;
          margin-right: 2px;
        }
        .small {
          width: 2px;
          height: 3px;
          background: #fff;
          border-radius: 1px;
        }
      }
    }
  }
  .header-other {
    position: relative;
    height: 80px;
    background-color: rgba(95, 111, 143, 0.14);
    .meeting-state {
      position: absolute;
      display: flex;
      height: 22px;
      font-size: 16px;
      color: rgba(95, 111, 143, 1);
      align-items: center;
      font-size: 16px;
      /* font-family: Arial; */
      font-weight: bold;
      line-height: 23px;
      top: 7px;
      left: 11px;
    }
  }
  .container {
    padding: 0 20px;
    background-color: #fff;
    .ul-li {
      height: 60px;
      border-bottom: 1px solid #d9dee5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #000;
      /* font-family: Arial; */
      .left {
        font-size: 16px;
      }
      .right {
        font-size: 14px;
      }
    }
    .time {
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #000;
      /* font-family: Arial; */
      .time-left {
        font-size: 16px;
      }
      .time-right {
        font-size: 14px;
      }
      .time-right-live {
        font-size: 14px;
        color: rgba(0, 163, 120, 1);
      }
    }
  }
  .rest {
    width: 100%;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    padding: 0 20px;
    .img-box {
      width: 60px;
      height: 60px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
