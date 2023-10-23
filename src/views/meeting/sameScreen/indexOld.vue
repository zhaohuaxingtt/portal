<template>
  <iPage>
    <div class="header">{{$t('MT_HUIYITONGPING')}}</div>
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
      <ul class="content-box">
        <li
          v-for="(item, index) in data"
          :key="index"
          :class="{
            'right-item': index === 1,
            'normal-item': !isActive,
            'content-item': true,
            'center-item': index === 2
          }"
        >
          <span class="right-num">
            <span class="right-num-1">{{ activeIndex + index + 1 }}</span>
            <img class="right-num-2" :src="percentLine" alt="" srcset="" />
            <span class="right-num-3">{{ result.themens.length }}</span>
          </span>
          <div class="meeting-name">
            {{
              item.state == '02'
                ? 'LIVE!'
                : item.state == '01'
                ? 'NEXT'
                : 'FINISHED'
            }}
          </div>
          <div class="meeting-content">{{ item.topic }}</div>
          <ul class="table-box">
            <li class="table-item">
              <span>{{$t('MT_SHICHANG')}}</span>
              <span>{{ item.duration }}{{$t('MT_FENZHONG')}}</span>
            </li>
            <li class="table-item double-item">
              <span>{{$t('MT_YANJIANGREN')}}</span>
              <span
                >{{ item.presenter
                }}{{
                  item.presenterNosys
                    ? item.presenter
                      ? ',' + item.presenterNosys
                      : item.presenterNosys
                    : ''
                }}</span
              >
            </li>
            <li class="table-item">
              <span>{{$t('MT_YANJIANGRENBUMEN')}}</span>
              <span
                >{{ item.presenterDept
                }}{{
                  item.presenterDeptNosys
                    ? item.presenterDept
                      ? ',' + item.presenterDeptNosys
                      : item.presenterDeptNosys
                    : ''
                }}</span
              >
            </li>
            <li class="table-item double-item">
              <span>{{$t('MT_SHIJIAN')}}</span>
              <span style="color: #67C23A">{{
                item.startTime ? item.startTime.substring(0, 5) : ''
              }}</span>
            </li>
          </ul>
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
      isActive: true // 判断有无正在进行中的议题
    }
  },
  watch: {
    data: {
      handler(v) {
        console.log('v', v)
      }
    }
  },
  methods: {
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
        if (!active) {
          this.isActive = false
          this.activeIndex = 0
          // this.data = themensUnuse.slice(0,2);
          this.data = res.themens.slice(0, 2)
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
        font-size: 16px;
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
      flex: 1;
      width: 810px;
      height: 644px;
      /* width: 530px; */
      /* height: 457px; */
      color: #000000;
      background: #ffffff;
      border: 1px solid #67C23A;
      border-radius: 10px;
      font-size: 16px;
      margin-bottom: 20px;
      padding: 40px;
      position: relative;

      .right-num {
        .right-num-1 {
          position: absolute;
          font-weight: bold;
          right: 40px;
          top: 10px;
          font-size: 36px;
          color: #67C23A;
        }
        .right-num-2 {
          position: absolute;
          right: 24px;
          top: 36px;
        }
        .right-num-3 {
          position: absolute;
          font-weight: bold;
          right: 18px;
          top: 48px;
          font-size: 16px;
          color: #000000;
        }
      }

      .meeting-name {
        font-weight: bold;
        font-size: 72px;
        line-height: 80px;
        color: #67C23A;
        letter-spacing: 0;
      }

      .meeting-content {
        font-weight: bold;
        line-height: 35px;
        height: 35px;
        font-size: 40px;
        color: #000000;
        letter-spacing: 0;
        margin: 40px 0 80px;
      }

      .table-box {
        border-top: 1px solid #dee3ed;
        /* border-bottom: 1px solid #DEE3ED; */

        .table-item {
          display: flex;
          justify-content: space-between;
          line-height: 50px;
          padding: 0 40px 0 20px;

          span {
            font-size: 16px;
            color: #000000;
            letter-spacing: 0;
          }

          span:nth-of-type(1) {
            font-weight: 700;
          }
          span:nth-of-type(2) {
            font-weight: 400;
          }
        }

        .double-item {
          background: rgba(22, 96, 241, 0.03);
        }
      }
    }
    .right-item {
      margin-left: 15px;
      border: 1px solid #999999;

      .meeting-name {
        color: #424242;
      }
    }
    .center-item {
      margin-left: 15px;
      border: 1px solid #999999;
      .meeting-name {
        color: #424242;
      }
    }
    .normal-item {
      border: 1px solid #999999;

      .meeting-name {
        color: #424242;
      }
    }
  }
}
</style>
