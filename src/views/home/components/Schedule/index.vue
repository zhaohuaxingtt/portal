<template>
  <div class="schedule-container">
<!--    <div class="calendar">-->
<!--      <v-calendar-->
<!--        :attributes="attrs"-->
<!--        :mask="{-->
<!--          title: 'YYYY MMM',-->
<!--          weekdays: 'WWW'-->
<!--        }"-->
<!--        :disabledDates="holiday"-->
<!--        :firstDayOfWeek="2"-->
<!--        @handleDayClick="handleDayClick"-->
<!--        @dayfocusout="handleDayFocusOut"-->
<!--        @handleToPage="handleToPage"-->
<!--        ref="calendar"-->
<!--      />-->
<!--    </div>-->
    <!-- flex-center-center -->
    <!-- <div class="trangle"></div> -->
<!--    <div v-if="meetingList.length == 0" class="empty-meeting">-->
<!--      {{ language('今日无会议安排') }}-->
<!--    </div>-->
<!--    <div class="meeting-container" v-if="meetingList.length > 0">-->
<!--      <template>-->
<!--        <div class="info_container">-->
<!--          <meetingItem-->
<!--            v-for="(item, index) in meetingList"-->
<!--            :key="index"-->
<!--            :item="item"-->
<!--          />-->
<!--        </div>-->
<!--      </template>-->
<!--    </div>-->
    <div class="iMeeting-div">
      <div v-for="(item, index) in meetingListThisWeek" class="iMeeting-day-item-div" :key="index">
        <div class='week-day-title'>{{ language(item.weekDay) + ' ' + (isZh ? item.weekDayZh : item.weekDayEn) }}</div>
          <div v-if="item.meetingList.length === 0" class="empty-i-meeting">
            {{ language('今日无会议安排') }}
          </div>
          <div v-else>
            <iMeetingItem v-for="(meetingItem, meetingItemIndex) in item.meetingList" :item="meetingItem" :key="meetingItemIndex"/>
          </div>
        <div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import VCalendar from 'v-calendar/lib/components/calendar.umd'
import VCalendar from './iCalendar.vue'
import meetingItem from './meetingItem'
import iMeetingItem from './iMeetingItem'
import moment from 'moment'
import { getSchedule, queryCalendar } from '@/api/home'
import { mapState } from 'vuex'
export default {
  filters: {
    timePoint: function (value) {
      return moment(value).format('LT')
    }
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    meetingTabItems: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  components: {
    VCalendar,
    meetingItem,
    iMeetingItem
  },
  data() {
    return {
      meetingList: [],
      date: new Date(),
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth() + 1,
      attrs: [],
      holiday: [],
      expectMeeting: [],
      meetingListThisWeek: [],
      WEEKS_EN_TEXT: [
        'MONDAY_TEXT',
        'TUESDAY_TEXT',
        'WEDNESDAY_TEXT',
        'THURSDAY_TEXT',
        'FRIDAY_TEXT',
        'SATURDAY_TEXT',
        'SUNDAY_TEXT'
      ]
    }
  },
  computed: {
    ...mapState({
      userId: (userId) => userId.permission.userInfo
    }),
    WEEKS_TEXT() {
      return [
        this.$t('MONDAY_TEXT'),
        this.$t('TUESDAY_TEXT'),
        this.$t('WEDNESDAY_TEXT'),
        this.$t('THURSDAY_TEXT'),
        this.$t('FRIDAY_TEXT'),
        this.$t('SATURDAY_TEXT'),
        this.$t('SUNDAY_TEXT')
      ]
    },
    isZh() {
      return this.$i18n.locale === "zh"
    }
  },
  async mounted() {
    // 1
    this.getCalendar()
  },
  watch: {
    meetingTabItems: {
      handler: function (val) {
        this.genMeetingListThisWeek(val)
      },
      immediate: true
    },
  },
  methods: {
    genMeetingListThisWeek(val) {
      let meetingListThisWeek = []
      if(val) {
        let beginMoment = val[0]
        console.log("genMeetingListThisWeek", beginMoment)
        for(let i=0; i < 7; i++) {
          let meetingList = []
          if(i > 0) {
            for(let j=0; j<=i; j++) {
              meetingList.push({
                location: 'M303',
                title: 'CW 36/2022 小会(50万<=CSC的会议xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
                beginHour: '09:00'
              })
            }
          }
          const meetingListItem = {
            weekDay: this.WEEKS_EN_TEXT[i],
            weekDayZh: beginMoment.format('MM月DD日'),
            weekDayEn: beginMoment.locale('en').format('DD,MMMM'),
            meetingList
          }
          meetingListThisWeek.push(meetingListItem)
          beginMoment.add(1, 'days')
        }
      }
      this.meetingListThisWeek = meetingListThisWeek
    },
    checkYear(year) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        this.days = 366
      } else {
        this.days = 365
      }
    },
    async getCalendar() {
      // 2
      const { result_1, result_2 } = await this.getHoliday()

      if (
        result_1.code === '200' &&
        result_2.code === '200'
        // data_3.length > 0
      ) {
        let data_1 = result_1.data || []
        let data_2 = result_2.data || []
        // let reg = /\s+/
        let newArr = []
        let disabledDates = [...data_1, ...data_2]
        // disabledDates.forEach(item => {
        //   let b = item.dateContent.split(reg)
        //   newArr.push({
        //     start: b[0],
        //     end: b[0]
        //   })
        // })
        // 月份从0开始
        disabledDates.map((item) => {
          newArr.push({
            start: new Date(item.year, item.month * 1 - 1, item.day),
            end: new Date(item.year, item.month * 1 - 1, item.day)
          })
        })
        this.holiday = newArr
        // 3
        const result_3 = await this.getMeetingList(
          {
            // 用户id
            year: this.currentYear,
            month: this.currentMonth
          },
          this.userId.id
        )
        let data_3 = result_3 || []
        data_3.forEach((item) => {
          item.dot = 'yellow'
        })
        let all = [...data_3]
        this.attrs = all
        this.meetingList =
          this.attrs?.find((a) => {
            return a.dates === moment().format('YYYY-MM-DD')
          })?.customData || []
      }
    },
    /*获取节假日 2*/
    async getHoliday() {
      this.checkYear(this.currentYear)
      const result_1 = await queryCalendar({
        queryDayNum: this.days,
        queryType: 2, //2：法定节假日
        startDay: `${this.currentYear}-01-01`
      })
      const result_2 = await queryCalendar({
        queryDayNum: this.days,
        queryType: 3, //3：非法定假期（自定义假期）
        startDay: `${this.currentYear}-01-01`
      })
      return { result_1, result_2 }
    },
    /*获取会议日期列表 */
    async getMeetingList(page, id) {
      const result = await getSchedule(page, id)
      return result
    },
    // 翻页触发
    async handleToPage(page) {
      if (page.month !== this.currentMonth) {
        this.currentMonth = page.month
        const body = {
          year: page.year,
          month: page.month
        }
        let result = await this.getMeetingList(body, this.userId.id)
        // 深度克隆 this.attrs  过滤掉数据会议
        let attrs = _.cloneDeep(this.attrs)
        console.log(attrs, '0++++x')
        attrs = attrs.filter((item) => {
          return !item.dot
        })
        result.forEach((item) => {
          item.dot = 'yellow'
        })
        result && result.length > 0 ? (this.attrs = attrs.concat(result)) : ''
        this.meetingList = []
        let duringMonth = true
        result.forEach((item) => {
          if (item.dates === moment().format('YYYY-MM-DD')) {
            duringMonth = false
            this.meetingList.push(...item.customData)
          }
        })
        if (duringMonth) {
          result.forEach((item) => {
            this.meetingList.push(...item.customData)
          })
        }
      }
      if (page.year !== this.currentYear) {
        this.currentYear = page.year
        const body = {
          year: page.year,
          month: page.month
        }
        let result = await this.getMeetingList(body, this.userId.id)
        const { result_1, result_2 } = this.getHoliday()
        if (result_1.code === '200' && result_2.code === '200') {
          let data_1 = result_1.data || []
          let data_2 = result_2.data || []
          // let reg = /\s+/
          let newArr = []
          let disabledDates = [...data_1, ...data_2]
          // disabledDates.forEach((item) => {
          // let b = item.dateContent.split(reg)
          // disabledDates.forEach(item => {
          //   let b = item.dateContent.split(reg)
          //   newArr.push({
          //     start: b[0],
          //     end: b[0]
          //   })
          // })
          disabledDates.map((item) => {
            newArr.push({
              start: new Date(item.year, item.month * 1 - 1, item.day),
              end: new Date(item.year, item.month * 1 - 1, item.day)
            })
          })
          this.holiday = newArr
          result.forEach((item) => {
            item.dot = 'yellow'
          })
          let all = [...result]
          this.attrs = all
        }
      }
    },
    async handleDayClick(day) {
      let result_4 = await this.getMeetingList(
        {
          // 用户id
          year: this.currentYear,
          month: this.currentMonth
        },
        this.userId.id
      )
      result_4 = result_4.filter((item) => item.dates == day)
      this.meetingList = result_4[0]?.customData || []
    },
    handleDayFocusOut() {
      this.meetingList = []
    }
  }
}
</script>

<style lang="scss">
.schedule-container {
  text-align: center;
  position: relative;
  .calendar {
    margin-top: -17px;
    padding-bottom: 12px;

    .vc-title {
      position: relative;

      &::after {
        content: '';
        position: absolute;
        z-index: 100;
        right: -40px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #343434;
      }
    }
  }
  .trangle {
    position: absolute;
    z-index: 100;
    right: 20%;
    top: 7.5%;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid #343434;
  }
  .vc-container {
    width: 100%;
    border: none !important;
    .vc-day-content:focus {
      background: linear-gradient(168deg, #4d88fc 0%, #06348e 100%);
      color: #fff;
      box-shadow: 0px 4px 6px rgba(15, 56, 111, 0.16);
    }
    .vc-nav-item.is-active {
      color: #fff;
    }
  }
  .empty-meeting {
    margin-top: 10px;
    height: 100%;
  }
  .empty-i-meeting {
    margin-top: 10px;
    margin-bottom: 10px;
    height: 100%;
    min-height: 20px;
  }
  .info_container {
    overflow-x: hidden;
    overflow-y: auto;
    position: absolute;
    bottom: -50%;
    cursor: pointer;
    left: 0;
    height: 180px;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;
    padding-top: 5px;
  }
}
.iMeeting-div {
  .iMeeting-day-item-div {
    margin-top: 5px;
    margin-bottom: 5px;
    border-bottom: 2px dashed rgb(214, 214, 214);
  }
  .week-day-title {
    text-align: left;
    font-size: 16px;
    font-weight: bold;
    height: 24px;
    line-height: 24px;
  }
}
</style>
