<template>
  <div
    class="meeting-card"
    @click="handleGoMeetingDetail(item.id)"
    ref="meetingCard"
  >
    <!-- 背景 -->
    <div class="meeting-card-head">
      <div
        class="start-time"
        :class="{ 'fs-color': ['05', '06'].includes(item.state) }"
      >
        {{ item.strStartTime }}
      </div>
      <div v-if="progressBarVisible" class="progress-bar-container">
        <div class="progress-bar" :style="progressStyle" ref="progressBar">
          <p class="circle"></p>
          <p class="twim_item"></p>
        </div>
      </div>
    </div>
    <!-- 信息 -->
    <div class="meeting_info" :class="meetingInfoClass">
      <!-- icon -->
      <div class="avatar">
        <icon symbol :name="avatarIconName" />
      </div>
      <div class="info">
        <div class="name f-family" :title="item.name">
          {{ item.name }}
        </div>
        <div class="time" style="Arial, 'PingFang SC'">
          {{ item.strStartTime }}
          {{ item.strStartTime && item.strEndTime ? `-` : '' }}
          {{ item.strEndTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'rise'
export default {
  name: 'meetingItem',
  components: { Icon },
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  computed: {
    avatarIconName() {
      if (['05', '06'].includes(this.item.state)) {
        return 'iconhuiyi-2'
      }
      if (['02', '03'].includes(this.item.state)) {
        return 'iconhuiyi-shouye'
      }
      return 'iconhuiyi-3'
    },
    meetingInfoClass() {
      if (['05', '06'].includes(this.item.state)) {
        return 'pass'
      }
      if (['02', '03'].includes(this.item.state)) {
        return 'future'
      }
      return 'ongoing'
    },
    start() {
      const startDate = this.item.startDate || '1970-01-01'
      const startTime = this.item.startTime || '00:00:00'
      return startDate + ' ' + startTime
    },
    end() {
      const endDate = this.item.endDate || '1970-01-01'
      const endTime = this.item.endTime || '23:59:59'
      return endDate + ' ' + endTime
    },
    progressBarVisible() {
      /* if (!this.visible) {
        return false
      } */
      const { state } = this.item
      const now = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      return state === '04' && now >= this.start && now <= this.end
    },
    totalSeconds() {
      return moment(this.end).valueOf() - moment(this.start).valueOf()
    }
  },
  data() {
    return {
      progressStyle: {},
      intervalTime: 5, // 单位秒
      raf: null,
      progressTimestamp: 0,
      visible: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.progressBarVisible) {
        this.handleListenProgressBar()
      }
    })
  },
  methods: {
    handleGoMeetingDetail(id) {
      window.location.href = `/portal/#/meeting/near-meeting/detail?id=${id}`
    },
    handleListenProgressBar() {
      this.raf = window.requestAnimationFrame(() => {
        this.moveProgressBar()
      })
    },
    moveProgressBar() {
      if (!this.progressTimestamp) {
        this.progressTimestamp = new Date().valueOf()
      }
      const nowValue = new Date().valueOf()
      const startValue = moment(this.start).valueOf()
      const endValue = moment(this.end).valueOf()

      if (nowValue < endValue) {
        if (nowValue >= this.progressTimestamp) {
          const rate = (nowValue - startValue) / (endValue - startValue)
          this.progressStyle = {
            top: rate * 100 + '%'
          }
          this.progressTimestamp += this.intervalTime * 1000
        }
        this.handleListenProgressBar()
      } else {
        this.clearAnimationFrame()
      }
    },
    clearAnimationFrame() {
      this.visible = false
      if (this.raf) {
        window.cancelAnimationFrame(this.raf)
      }
    }
  },
  destroyed() {
    this.clearAnimationFrame()
  }
}
</script>

<style lang="scss" scoped>
.start-time {
  margin-right: 10px;
  font-weight: 500;
  font-family: Arial, 'PingFang SC';
  font-size: 16px;
}
.meeting-card {
  margin-bottom: 8px;
  margin-left: 20px;
  display: flex;
  cursor: pointer;
  width: 100%;
  .fs-color {
    color: #afb0b3;
  }
  .progress-bar {
    position: absolute;
    right: 0;
    top: 0;
    display: flex;
    align-items: center;
    transform: translateY(-50%);
    .circle {
      width: 10px;
      height: 10px;
      border: 2px solid #05bb8b;
      border-radius: 50%;
    }
    .twim_item {
      width: 16px;
      height: 2px;
      background: #05bb8b;
    }
  }
  .meeting_info {
    display: flex;
    flex: 1;
    padding: 2px;
    align-items: center;
    &.pass {
      border-left: 3px solid #afb0b3;
      color: #afb0b3;
      // background: #fff;
      background: linear-gradient(
        135deg,
        #ffffff 15%,
        #e0e4ec 0,
        #e0e4ec 25%,
        #ffffff 0,
        #ffffff 40%,
        #e0e4ec 0,
        #e0e4ec 50%,
        #ffffff 0,
        #ffffff 65%,
        #e0e4ec 0,
        #e0e4ec 75%,
        #ffffff 0,
        #ffffff 90%,
        #e0e4ec 0,
        #e0e4ec 100%,
        #ffffff 0
      );
      border-right: 14px solid #fff;
      width: 220px !important;
    }
    &.ongoing {
      border-left: 3px solid #05bb8b;
      color: #05bb8b;
      background: #e0f7f1;
      border-right: 14px solid #fff;
      width: 220px !important;
    }
    &.future {
      border-left: 3px solid #1763f7;
      color: #1763f7;
      background: #f2f8ff;
      border-right: 14px solid #fff;
      width: 220px !important;
    }
    .avatar {
      padding: 0 10px;
    }
    .info {
      height: 50px;
      flex: 1;
      overflow: hidden;
      .name {
        margin-top: 4px;
        text-align: left;
        font-weight: bold;
        font-size: 16px;
        height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .f-family {
        font-family: Arial, 'PingFang SC';
        font-size: 14px;
      }
      .time {
        text-align: left;
        > div:first-child {
          margin-bottom: 5px;
        }
      }
    }
  }
}
.meeting-card-head {
  position: relative;
  .progress-bar-container {
    margin: 2px 0px 2px 0;
    position: absolute;
    right: 0;
    top: 0;
    height: calc(100% - 4px);
  }
}
</style>
