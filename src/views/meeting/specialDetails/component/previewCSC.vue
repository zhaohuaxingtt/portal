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
        <div class="title">
          <p>{{ meetingInfo.name || '' }}</p>
          <p v-if="index>-1" >{{ 1 + index }}. {{ detail.topic || '' }}</p>
        </div>
        <div class="infos">
          <p class="item">
            <span class="name"></span>
            <span class="value">
              <img
                @click="prev"
                class="list-icon cursor"
                :src="upAllow"
                alt="上箭头"
              />
              <span class="count"> {{ 1 + index }}/{{ themens.length }} </span>
              <img
                @click="next"
                class="list-icon cursor"
                :src="downAllow"
                alt="下箭头"
              />
              <el-popover
                popper-class="meeting-list"
                placement="bottom-end"
                :visible-arrow="false"
                width="330"
                trigger="click"
                class="menu"
              >
                <ul class="item-list">
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
                  class="list-icon cursor"
                  slot="reference"
                  :src="menu"
                  alt="数据列表"
                />
              </el-popover>
            </span>
          </p>
          <p class="item">
            <span class="name"><i class="el-icon-alarm-clock"></i>{{ time | handleTransTime }}</span>
            <span class="value"><i class="el-icon-time"></i>{{ newDate }}</span>
          </p>
        </div>
      </div>
      <attch v-if="detail.type=='MANUAL'" :key="detail.id" :attachments="detail.attachments"/>
      <iframe
        v-else-if="detail.source=='04'"
        :key="detail.id"
        :src="src"
        frameborder="0"
        width="100%"
        height="100%"
        class="iframe margin-top20"
      ></iframe>
      <div v-else>-</div>
    </div>
  </div>
</template>

<script>
import { iPage, icon } from 'rise'
import upAllow from '@/assets/images/icon/up.png'
import downAllow from '@/assets/images/icon/down.png'
import menu from '@/assets/images/icon/menu.png'
import attch from './attch.vue'
import { findThemenById } from '@/api/meeting/details'
export default {
  components: {
    iPage,
    icon,
    attch
  },
  data() {
    return {
      upAllow,
      downAllow,
      menu,
      time: 0,
      index: -1,
      meetingInfo: {},
      themens: [],
      detail: {},
      timer: null,
      show:true,
      newDate:'',
      
    }
  },
  computed:{
    newDate(){
      return new Date().toTimeString()
    }
  },
  async created() {

    let query = this.$route.query
    this.meetingInfo = await findThemenById({ id: query.id })
    this.themens = this.meetingInfo?.themens
    this.meetingInfo.themens.forEach((item, index) => {
      if (item.fixedPointApplyId == query.desinateId) {
        this.click(item, index)
      }
    })
    this.timer = setInterval(() => {
      this.time += 1000
    }, 1000)
  },
  mounted(){
      window.addEventListener('message',(message)=>{
        if(message.data && message.data.type=='click'){
          this.show = false
        }
      }, false)
      this.getNewDate()
  },
  methods: {
    getNewDate(){
    this.timer2 = setInterval(() => {
      let h = new Date().getHours()
      let m = new Date().getMinutes()
      this.newDate = h+':'+m
    }, 1000)
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
      // let local = 'http://localhost:8081/sourcing/#'
      if(item.source == '04'){
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
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  flex: 0 0 auto;
  padding: 30px 80px 0;
}
.iframe {
  flex: 1 1 auto;
  width: 100%;
}
.title {
  font-size: 28px;
  font-weight: bold;
}
.infos {
  font-size: 28px;
  font-weight: bold;
  display: flex;
  flex-flow: column;
  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // border: 1px solid #eaeaea;
    flex: 1;
    &:first-child {
      border-bottom: 0;
    }
    .name {
      text-align: right;
      // min-width: 130px;
    }
    .value {
      padding-left: 10px;
      text-align: center;
      align-items: flex-start;
      justify-content: center;
      display: flex;
      flex: 1;
      .count {
        min-width: 80px;
      }
      .menu{
        writing-mode: vertical-lr;
      }
    }
  }
}
.item-list {
  max-height: 500px;
  overflow: auto;
  padding-right: 20px;
  padding: 0;
  color: #4f4f4f;
  .list-item {
    padding: 0 18px;
    .content{
      padding: 12px 0;
      // border-bottom: 1px solid #efefef;
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
    .content{
      padding: 12px 0;
      border-bottom: 0px;
    }
    &:hover{
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
  vertical-align: top;
  width: 30px;
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