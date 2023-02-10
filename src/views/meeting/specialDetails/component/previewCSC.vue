<!--
 * @Author: YoHo
 * @Date: 2023-01-31 21:09:43
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\meeting\specialDetails\component\previewCSC.vue
-->
<template>
  <div class="page">
    <div class="content">
      <div class="header">
        <div>
          <p class="title">{{detail.meetingName||'-'}}</p>
          <p class="subTitle">
            {{detail.topic}}
          </p>
        </div>
        <div class="infos">
          <div class="item">
            <div class="name">Agenda No:</div>
            <div class="value">
              <icon
                @click.native="prev"
                class="list-icon"
                symbol
                name="iconfilterquyukuaijiantoushouqi"
              />
              <span> {{ 1 + index }}/{{ themens.length }} </span>
              <icon
                @click.native="next"
                class="list-icon"
                symbol
                name="iconfilterquyukuaijiantouzhankai"
              />
              <el-popover
                placement="top-end"
                :visible-arrow="false"
                width="300"
                trigger="click"
              >
                审批清单
                <ul class="item-list margin-top10">
                  <li
                    @click="click(item, index)"
                    v-for="(item, index) in themens || []"
                    :key="index"
                  >
                    <p>{{ item.topic }}</p>
                    <p class="text">
                      <span>No:{{ item.fixedPointApplyId }}</span
                      ><span
                        >{{ item.presenterDept }} {{ item.presenterEn }}</span
                      >
                    </p>
                    <el-divider></el-divider>
                  </li>
                </ul>
                <icon
                  class="list-icon"
                  slot="reference"
                  symbol
                  name="iconxiaoxi"
                />
              </el-popover>
            </div>
          </div>
          <div class="item">
            <div class="name">Timing:</div>
            <div class="value">{{ time | handleTransTime }}</div>
          </div>
        </div>
      </div>
      <iframe
        :src="src"
        frameborder="0"
        width="100%"
        height="100%"
        class="iframe margin-top20"
      ></iframe>
    </div>
  </div>
</template>

<script>
import { iPage, icon } from 'rise'
import {
  findThemenById,
  endThemen,
  startThemen,
  // recallThemen,
  passThemenRecall,
  rejectThemenRecall,
  deleteThemen,
  resortThemen,
  spiltThemen
} from '@/api/meeting/details'
export default {
  components: {
    iPage,
    icon
  },
  data() {
    return {
      time: 0,
      index: -1,
      meetingInfo: {},
      themens: [],
      detail:{}
    }
  },
  async created() {
    let query = this.$route.query
    this.meetingInfo = await findThemenById({ id: query.id })
    this.themens = this.meetingInfo.themens
    this.meetingInfo.themens.forEach((item, index) => {
      if (item.fixedPointApplyId == query.desinateId) {
        this.click(item, index)
      }
    })
    let timer = setInterval(() => {
      this.time += 1000
    }, 1000)
  },
  methods: {
    prev() {
      console.log(this.index)
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
      this.detail = item
      this.time = 0
      this.index = index
      let local
      // let local = 'http://localhost:8081/sourcing/#'
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
  },
  destroyed(){
    if(this.timer) clearInterval(this.timer)
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
  padding: 30px 80px 20px;
  background: #fff;
}
.content {
  height: 100%;
  display: flex;
  flex-flow: column;
}
.header {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  flex: 0 0 auto;
}
.iframe {
  flex: 1 1 auto;
  width: 100%;
}
.title {
  font-size: 24px;
  font-weight: bold;
}
.subTitle {
  font-size: 20px;
  font-weight: bold;
}
.infos {
  height: 60px;
  display: flex;
  flex-flow: column;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #666;
    line-height: 30px;
    font-weight: bold;
    &:first-child {
      border-bottom: 0;
    }
    .name {
      width: 120px;
      text-align: right;
      font-size: 16px;
    }
    .value {
      width: 200px;
      text-align: center;
      font-size: 16px;
      align-items: center;
    }
  }
}
.item-list {
  max-height: 500px;
  overflow: auto;
  padding-right: 20px;
  .text {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
}
.list-icon {
  font-size: 18px;
  margin: 0 10px;
}
</style>