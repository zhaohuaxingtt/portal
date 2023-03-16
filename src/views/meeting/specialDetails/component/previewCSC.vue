<!--
 * @Author: YoHo
 * @Date: 2023-01-31 21:09:43
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\meeting\specialDetails\component\previewCSC.vue
-->
<template>
  <div class="page" ref="page">
    <div class="content">
      <div class="header">
        <div class="title">
          <div class="item">
            <span>{{ meetingInfo.name || '' }}</span>
            <span class="value">
              <img
                @click="prev"
                class="list-icon cursor left"
                :src="allow"
                alt="上箭头"
              />
              <span class="count"> {{ 1 + index }}/{{ themens.length }} </span>
              <img
                @click="next"
                class="list-icon cursor right"
                :src="allow"
                alt="下箭头"
              />
              <el-popover
                popper-class="meeting-list"
                placement="bottom-end"
                :visible-arrow="false"
                width="330"
                trigger="click"
                class="menu"
                @show="showItem"
              >
                <ul class="item-list" ref="menu">
                  <li
                    class="list-item cursor"
                    @click="click(item, i)"
                    v-for="(item, i) in themens || []"
                    :key="i"
                    :class="{
                      'is-disabled': ['MTZ', 'CSF', 'CHIP'].includes(item.type),
                      'is-active': i == index
                    }"
                  >
                    <div class="content">
                      <p class="text margin-bottom5">
                        <span>{{ 1 + i }}</span
                        ><span
                          >{{ item.presenterDept }} {{ item.presenterEn }}</span
                        >
                      </p>
                      <p>{{ item.topic }}</p>
                    </div>
                  </li>
                </ul>
                <img
                  class="list-icon-menu cursor"
                  slot="reference"
                  :src="menu"
                  alt="数据列表"
                />
              </el-popover>
            </span>
          </div>
          <div class="item" v-if="index > -1">
            <span> {{ 1 + index }}. {{ detail.topic || '' }} </span>
            <span class="value">
              <img :src="alarm" class="icon" alt="" />
              <span class="value margin-right20">
                {{ time | handleTransTime }}</span
              >
              <img :src="clock" class="icon" alt="" />
              <span class="value">{{ newDate }}</span>
            </span>
          </div>
        </div>
      </div>
      <attch
        v-if="detail.type == 'MANUAL'"
        :key="detail.id"
        :attachments="detail.attachments"
      />
      <iframe
        v-else-if="detail.source == '04'"
        :key="detail.id"
        :src="src"
        frameborder="0"
        width="100%"
        height="100%"
        class="iframe margin-top5"
      ></iframe>
      <div v-else>-</div>
    </div>
  </div>
</template>

<script>
import { iPage, icon } from 'rise'
import allow from '@/assets/images/icon/right.svg'
import menu from '@/assets/images/icon/menu.svg'
import alarm from '@/assets/images/icon/alarm.svg'
import clock from '@/assets/images/icon/clock.svg'
import attch from './attch.vue'
import { findThemenById } from '@/api/meeting/details'
import {
  findThemenById as GPFindThemenById,
  endCscThemen
} from '@/api/meeting/gpMeeting'
export default {
  components: {
    iPage,
    icon,
    attch
  },
  data() {
    return {
      allow,
      menu,
      alarm,
      clock,
      time: 0,
      index: -1,
      meetingInfo: {},
      themens: [],
      detail: {},
      timer: null,
      timer2: null,
      newDate: ''
    }
  },
  async created() {
    let query = this.$route.query
    this.project = query.project
    this.meetingInfo = await this.findThemenById(query)
    this.themens = this.meetingInfo?.themens
    this.meetingInfo.themens.forEach((item, index) => {
      if (
        item.fixedPointApplyId == (query.desinateId ||
        query.fixedPointApplyId)
      ) {
        this.click(item, index)
      }
    })
    this.timer = setInterval(() => {
      this.time += 1000
    }, 1000)
  },
  mounted() {
    window.addEventListener('message', this.closePop, false)
    this.getNewDate()
  },
  methods: {
    async findThemenById(query) {
      if (this.project == 'GP') {
        return await GPFindThemenById({ id: query.id })
      } else {
        return await findThemenById({ id: query.id })
      }
    },
    // 滚动到当前议题
    showItem() {
      this.$nextTick(() => {
        let active = this.$refs.menu.getElementsByClassName('is-active')[0]
        if (active)
          this.$refs.menu.scrollTo(
            0,
            [active][0].offsetTop - this.$refs.menu.offsetHeight / 2
          )
      })
    },
    getNewDate() {
      this.timer2 = setInterval(() => {
        let h = new Date().getHours()
        let m = new Date().getMinutes()
        h = h < 10 ? '0' + h : h
        m = m < 10 ? '0' + m : m
        this.newDate = h + ':' + m
      }, 1000)
    },
    closePop(message) {
      if (message.data && message.data.type == 'click') {
        this.$refs.page.click()
      }
    },
    prev() {
      if (this.index > 0) {
        this.click(this.themens[this.index - 1], this.index - 1)
      }
    },
    next() {
      if (this.index < this.themens.length - 1) {
        this.click(this.themens[this.index + 1], this.index + 1)
      }
    },
    click(item, index) {
      if (index == this.index) return
      if (['MTZ', 'CSF', 'CHIP'].includes(item.type)) return
      this.time = 0
      this.detail = item
      this.index = index
      let local
      //  = 'http://localhost:8081'
      if (this.project == 'GP') {
        let num = null
        let documentType = this.$route.query.documentType
        const documentTypeList = ['13', '14', '15']
        if (documentTypeList.includes(documentType)) {
          num = 1
        } else {
          num = 3
        }
        // if (documentTypeList.includes(documentType)) {
          // window.open(`${process.env.VUE_APP_HOST}/gp-portal/#/auditChangeDetail/${row.fixedPointApplyId}?current=${1}`)
        //   this.src = `${
        //     local || process.env.VUE_APP_HOST
        //   }/gp-portal/#/auditChangeDetail/${item.fixedPointApplyId}?current=1`
        // } else {
          this.src = `${
            local || process.env.VUE_APP_HOST
          }/gp-portal/#/previewCSC/${item.fixedPointApplyId}?current=${num}`
        // }
      } else if (item.source == '04') {
        if (item.type === 'FS+MTZ') {
          this.src =
            (local || process.env.VUE_APP_POINT) +
            `/previewCSC/mtz?route=force&desinateId=${item.fixedPointApplyId}&isPreview=1`
        } else {
          this.src =
            (local || process.env.VUE_APP_POINT) +
            `/previewCSC/title?route=force&desinateId=${item.fixedPointApplyId}&isPreview=1`
        }
      }
    }
  },
  destroyed() {
    if (this.timer) clearInterval(this.timer)
    if (this.timer2) clearInterval(this.timer2)
    window.removeEventListener('message', this.closePop)
  },
  filters: {
    handleTransTime(longTime) {
      if (longTime > 24 * 60 * 60 * 1000) return '1d+'
      let hour = Math.floor(longTime / (60 * 60 * 1000))
      let minutes = Math.floor((longTime - 60 * 60 * 1000 * hour) / (60 * 1000))
      let seconds = Math.floor(
        (longTime - 60 * 60 * 1000 * hour - 60 * 1000 * minutes) / 1000
      )
      hour = hour < 10 && hour >= 0 ? '0' + hour : hour
      minutes = minutes < 10 && minutes >= 0 ? '0' + minutes : minutes
      seconds = seconds < 10 && seconds >= 0 ? '0' + seconds : seconds
      return `${hour}:${minutes}:${seconds}`
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
  height: 100%;
  // padding: 30px 80px 20px;
  background: #fff;
  * {
    font-family: 'Arial', 'Helvetica', 'sans-serif';
    letter-spacing: 0;
  }
}
.content {
  height: 100%;
  display: flex;
  flex-flow: column;
}
.header {
  padding: 30px 80px 0;
}
.iframe {
  flex: 1 1 auto;
  width: 100%;
}
.title {
  font-size: 28px;
  font-weight: bold;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .icon {
      height: 24px;
      margin-right: 5px;
    }
    .value {
      display: inline-flex;
      align-items: center;
      .count {
        min-width: 60px;
        text-align: center;
        display: inline-block;
      }
    }
  }
  ::v-deep .el-popover__reference-wrapper {
    font-size: 0;
  }
}
.item-list {
  height: 450px;
  overflow: auto;
  padding-right: 20px;
  padding: 0;
  color: #4f4f4f;
  .list-item {
    padding: 0 18px;
    .content {
      padding: 12px 0;
      border-bottom: 1px solid #efefef;
    }
  }
  .text {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .is-active {
    background: #364d6e;
    color: #fff;
    .content {
      padding: 12px 0;
      border-bottom: 0px;
    }
    &:hover {
      background: #364d6e;
      color: #fff;
      opacity: 1;
    }
  }

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    min-height: 8px;
    min-width: 8px;
  }
  &::-webkit-scrollbar-track {
    width: 8px;
  }
}
.list-icon {
  margin: 0 5px;
  height: 32px;
  &.right {
    transform: rotateZ(90deg);
  }
  &.left {
    transform: rotateZ(-90deg);
  }
}
.list-icon-menu {
  margin: 0 5px;
  height: 32px;
  vertical-align: bottom;
}
.is-disabled {
  cursor: not-allowed;
  opacity: 0.7;
}
</style>
<style lang="scss">
.meeting-list {
  margin-top: 40px !important;
  padding: 0;
  border: 0;
  font-size: 16px;
}
</style>