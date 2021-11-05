<template>
  <section class="card">
    <div
      :class="
        themen.state === '04' ? 'card-header' : 'card-header card-header-no'
      "
    >
      <div class="title">
        <div class="live" v-if="themen.state === '04'">
          <div class="big"></div>
          <div class="middle"></div>
          <div class="small"></div>
          <div class="live-word">LIVE!</div>
        </div>
        <div v-else class="no-live">
          <div
            v-if="
              themen.state === '01' ||
                themen.state === '02' ||
                themen.state === '03'
            "
          >
            NEXT
          </div>
          <div v-else>
            FINISH
          </div>
        </div>
        <div class="model">{{ themen.dept }}</div>
      </div>
      <h3 class="meeting-name">{{ themen.name }}</h3>
      <h4 class="block">
        <i class="el-icon-time"></i
        ><span class="text">{{
          `${themen.startDate} ${themen.startTime}`
        }}</span>
      </h4>
      <h4 class="block">
        <div class="img-box">
          <img
            src="~@/assets/images/place-white.svg"
            class="img"
            v-if="themen.state === '04'"
          />
          <img src="~@/assets/images/place-grey.svg" class="img" v-else />
        </div>
        <span class="text">{{ themen.meetingPlace }}</span>
      </h4>
    </div>
    <div class="card-body">
      <dl class="info-list">
        <dt
          class="info-header"
          v-if="
            themen.state === '01' ||
              themen.state === '02' ||
              themen.state === '03'
          "
        >
          <div class="time-info">
            <p class="top">距离会议还有</p>
            <p class="bottom">
              <span>{{ day }}</span
              >天<span>{{ hour }}:{{ minutes }}:{{ seconds }}</span>
            </p>
          </div>
        </dt>
        <dd class="info" v-for="(item, index) of themen.themens" :key="index">
          <span class="doc-name">{{ index + 1 }}.{{ item.topic }}</span>
          <div class="doc-info">{{ item.result }}</div>
        </dd>
      </dl>
    </div>
    <div class="card-footer">
      <div class="two-buttons">
        <div
          class="text"
          @click="
            () => {
              handleDownLoad(themen)
            }
          "
          v-if="isPdfFile(themen)"
        >
          <div class="img-box">
            <img src="~@/assets/images/download.svg" class="img" />
          </div>
          Agenda
        </div>

        <div
          class="text"
          @click="
            () => {
              handleDownLoadMinutes(themen)
            }
          "
          v-if="isSource02(themen)"
        >
          <div class="img-box">
            <img src="~@/assets/images/download.svg" class="img" />
          </div>
          Minutes
        </div>
      </div>
      <!-- <div v-else></div> -->
      <iButton @click="goToDetail(themen.id)" class="button">MORE</iButton>
    </div>
  </section>
</template>

<script>
import { iButton, iMessage } from 'rise'
import { MOCK_FILE_URL } from '@/constants'
import { download } from '@/utils/downloadUtil'
export default {
  components: {
    iButton
  },
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
      timer: '',
      presenterDept: '',
      day: '00',
      hour: '00',
      minutes: '00',
      seconds: '00',
      start: ''
    }
  },
  mounted() {
    // this.presenterDept = webStorage.get('userInfo').presenterDept;
    if (
      this.themen.state === '01' ||
      this.themen.state === '02' ||
      this.themen.state === '03'
    ) {
      requestAnimationFrame(this.handleTime)
    }
  },
  methods: {
    handleDownLoadMinutes(themen) {
      if (!themen.attachments) {
        iMessage.error('没有要下载的附件!')
        return
      }
      const file = themen.attachments.find(item => {
        return item.source === '02'
      })
      console.log(file, file.attachmentId)
      file &&
        download({
          fileIds: file.attachmentId,
          filename: file.attachmentName,
          callback: e => {
            if (!e) {
              iMessage.error('下载失败')
            }
          }
        })
    },
    isSource02(themen) {
      if (
        themen.attachments.length > 0 &&
        themen.attachments.some(item => {
          return item.source === '02'
        })
      ) {
        return true
      }
      return false
    },
    isPdfFile(themen) {
      if (
        themen.attachments.length > 0 &&
        themen.attachments.some(item => {
          const arr = item.attachmentName.split('.')
          const suffix = arr[arr.length - 1]
          return (suffix === 'pdf' || suffix === 'PDF') && item.source === '01'
        })
      ) {
        return true
      }
      return false
    },
    //计算剩余时间
    handleTime() {
      let startDate = this.themen.startDate
      let startTime = this.themen.startTime
      let time = new Date(`${startDate} ${startTime}`).getTime()
      let restTime = time - new Date().getTime()
      this.handleTransTime(restTime)
      requestAnimationFrame(this.handleTime)
    },
    //毫秒转 天 时分秒
    //天: 24 * 60 *60*1000
    handleTransTime(longTime) {
      let day = Math.floor(longTime / (24 * 60 * 60 * 1000))
      let hour = Math.floor(
        (longTime - 24 * 60 * 60 * 1000 * day) / (60 * 60 * 1000)
      )
      let minutes = Math.floor(
        (longTime - 24 * 60 * 60 * 1000 * day - 60 * 60 * 1000 * hour) /
          (60 * 1000)
      )
      let seconds = Math.floor(
        (longTime -
          24 * 60 * 60 * 1000 * day -
          60 * 60 * 1000 * hour -
          60 * 1000 * minutes) /
          1000
      )
      this.day = day < 10 && day >= 0 ? '0' + day : day
      this.hour = hour < 10 && hour >= 0 ? '0' + hour : hour
      this.minutes = minutes < 10 && minutes >= 0 ? '0' + minutes : minutes
      this.seconds = seconds < 10 && seconds >= 0 ? '0' + seconds : seconds
    },
    handleDownLoad(themen) {
      if (!themen.attachments) {
        iMessage.error('没有要下载的附件!')
        return
      }
      const file = themen.attachments.find(item => {
        const arr = item.attachmentName.split('.')
        const suffix = arr[arr.length - 1]
        return (suffix === 'pdf' || suffix === 'PDF') && item.source === '01'
      })
      file &&
        download({
          fileIds: file.attachmentId,
          filename: file.attachmentName,
          callback: e => {
            if (!e) {
              iMessage.error('下载失败')
            }
          }
        })
    },
    goToDetail(e) {
      this.$router.push({
        path: '/meeting/near-meeting/detail',
        query: {
          id: e
        }
      })
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 4px;
}
.card {
  font-family: Arial;
  position: relative;
  width: 566px;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
  height: 400px;
  overflow: hidden;

  .card-header {
    width: 100%;
    height: 160px;
    background-color: #6c96ea;
    border-radius: 10px 10px 0px 0px;
    .title {
      width: 526px;
      margin: 0 auto;
      height: 56px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .live {
        display: flex;
        align-items: flex-end;
        margin-right: 5px;
        color: #fff;
        transform: translateY(-3px);
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
          margin-right: 5px;
        }
        .live-word {
          font-size: 16px;
          transform: translateY(3px);
        }
      }

      .model {
        font-size: 14px;
        font-weight: 400;
        line-height: 23px;
        color: #ffffff;
      }
    }
    .meeting-name {
      height: 27px;
      font-size: 24px;
      font-weight: 400;
      line-height: 27px;
      color: #ffffff;
      margin-bottom: 15px;
      margin-left: 20px;
    }
    .block {
      height: 16px;
      font-weight: 400;
      color: #ffffff;
      margin-bottom: 15px;
      margin-left: 20px;
      display: flex;
      align-items: center;
      i {
        font-size: 16px;
      }
      .text {
        display: block;
        font-size: 14px;
        margin-left: 10px;
      }
      .img-box {
        width: 16px;
        height: 16px;
        .img {
          width: 16px;
          height: 16px;
          object-fit: scale-down;
        }
      }
    }
  }
  .card-header-no {
    background: rgba(95, 111, 143, 0.14);
    .no-live {
      font-size: 16px;
      color: #5f6f8f;
    }
    .title {
      .model {
        color: #5f6f8f;
      }
    }
    .meeting-name {
      color: #5f6f8f;
    }
    .block {
      color: #707070;
    }
  }
  .card-body {
    width: 100%;
    background-color: #fff;
    padding-right: 4px;
    .info-list {
      overflow-y: auto;
      padding-left: 20px;
      height: 180px;
      .info-header {
        height: 80px;
        padding-right: 12px;
        .time-info {
          width: 100%;
          height: 100%;
          border-bottom: 1px dashed #d9dee5;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .top {
            height: 20px;
            font-size: 14px;
            font-weight: 400;
            line-height: 23px;
            color: #707070;
          }
          .bottom {
            height: 28px;
            font-size: 20px;
            font-weight: 400;
            line-height: 28px;
            color: #ffb04d;
          }
        }
      }
      .info {
        margin-top: 20px;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        .doc-name {
          display: block;
          max-width: 258px;
          height: 20px;
          color: #707070;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        .doc-info {
          margin-top: 5px;
          height: 20px;
          color: #00a378;
        }
      }
    }
  }
  .card-footer {
    width: 100%;
    background-color: #fff;
    position: absolute;
    height: 60px;
    bottom: 0;
    z-index: 10;
    box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    .two-buttons {
      display: flex;
      .text + .text {
        margin-left: 16px;
      }
    }
    .button {
      height: 35px;
      width: 100px;
      flex-shrink: 1;
      flex-grow: 0;
    }
    .text {
      font-size: 14px;
      font-weight: 400;
      color: #1660f1;
      cursor: pointer;
      .img-box {
        width: 16px;
        height: 16px;
        margin-right: 8px;
        display: inline-block;
        .img {
          width: 16px;
          height: 16px;
          object-fit: scale-down;
          vertical-align: -2px;
        }
      }
    }
  }
}
</style>
