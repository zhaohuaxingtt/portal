<template>
  <div class='i-meeting-item' :class="{ 'color-first-item': item.colorFirstItem }" @click="gotoMeetingUrl">
    <div class='i-meeting-item-date'>{{ item.strStartTime }}</div>
<!--    <div class='i-meeting-item-divide-line'></div>-->
    <div class='i-meeting-item-content-div'>
      <div class='i-meeting-item-title'>{{ item.name }}</div>
      <div class='i-meeting-item-location'><i class="el-icon-map-location"></i><span class="i-meeting-meeting-place">{{ item.meetingPlace }}</span></div>
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
      console.log("into iMeeting item mounted")
      this.$nextTick(() => {
        if (this.progressBarVisible) {
          this.handleListenProgressBar()
        }
      })
    },
    methods: {
      gotoMeetingUrl() {
        window.location.href = `/portal/#/meeting/near-meeting/detail?id=${this.item.id}`
      },
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
  .i-meeting-item {
    display: flex;
    //height: 48px;
    line-height: 48px;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    .i-meeting-item-date {
      color: rgb(127, 127, 127);
      height: 100%;
      width: 40px;
      margin-right: 10px;
    }
    //.i-meeting-item-divide-line {
    //  background-color: rgb(210, 216, 224);
    //  min-height: calc(48px - 5px);
    //  line-height: calc(48px - 5px);
    //  height: calc(100%);
    //  width: 5px;
    //  margin-left: 0;
    //  margin-right: 5px;
    //  margin-top: 5px;
    //  margin-bottom: 5px;
    //}
    .i-meeting-item-content-div {
      display: flex;
      //width: calc(100% - 40px - 10px - 10px - 5px);
      color: rgb(0, 0, 0);
      justify-content: center;
      flex-direction: column;
      margin-left: 0px;
      border-left: 8px solid rgb(127, 127, 127);
      padding-left: 10px;
      .i-meeting-item-title {
        color: rgb(127, 127, 127);
        //white-space: nowrap;
        //overflow: hidden;
        //text-overflow: ;
        word-break: break-all;
        word-wrap: break-word;
        //height: 32px;
        //line-height: 32px;
        line-height: 1rem;
        text-align: left;
        //width: calc(100% - 40px);
      }
      .i-meeting-item-location {
        color: rgb(127, 127, 127);
        //width: 70px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        //margin-left: 10px;
        height: 24px;
        line-height: 24px;
        margin-top: 4px;
        .i-meeting-meeting-place {
          margin-left: 16px;
        }
      }
      margin-bottom: 5px;
      margin-top: 5px;
    }
    //.i-meeting-item-content-div:hover {
    //  color: rgb(0, 85, 232);
    //  background-color: rgb(228, 237, 253);
    //  cursor: pointer;
    //  .i-meeting-item-divide-line {
    //    background-color: rgb(0, 85, 232);
    //  }
    //}
  }
  .i-meeting-item:hover, .i-meeting-item.color-first-item {
    color: rgb(0, 85, 232);
    background-color: rgb(228, 237, 253);
    cursor: pointer;
    .i-meeting-item-divide-line {
      background-color: rgb(0, 85, 232);
    }
    .i-meeting-item-content-div {
      border-left-color: rgb(0, 85, 232);
      color: rgb(36, 107, 243);
      .i-meeting-item-title {
        color: rgb(36, 107, 243);
      }
    }
    .i-meeting-item-date {
      color: rgb(36, 107, 243);
    }
    .i-meeting-item-location {
      color: rgb(36, 107, 243);
    }
   }
  .start-time {
    font-weight: 500;
    font-family: Arial, 'PingFang SC';
    font-size: 16px;
  }
  .meeting-card {
    margin-bottom: 8px;
    /* margin-left: 20px; */
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
        width: 8px;
        height: 2px;
        background: #05bb8b;
      }
    }
    .meeting_info {
      width: calc(100% - 70px);
      display: flex;
      flex: 1;
      padding: 2px;
      border-right: solid #fff 10px;
      align-items: center;
      &.pass {
        border-left: 3px solid #afb0b3;
        color: #afb0b3;
        background-image: linear-gradient(
                        135deg,
                        #fff 25%,
                        #f1f2f4 0,
                        #f1f2f4 50%,
                        #fff 0,
                        #fff 75%,
                        #f1f2f4 0
        );
        background-size: 60px 60px;
      }
      &.ongoing {
        border-left: 3px solid #05bb8b;
        color: #05bb8b;
        background: #e0f7f1;
      }
      &.future {
        border-left: 3px solid #1763f7;
        color: #1763f7;
        background: #f2f8ff;
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
          width: 100%;
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
    padding: 0px 20px 0px 10px;
    .progress-bar-container {
      margin: 2px 0px 2px 0;
      position: absolute;
      right: 0;
      top: 0;
      height: calc(100% - 4px);
    }
  }
</style>
