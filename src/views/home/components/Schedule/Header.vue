<template>
  <div class="flex-between-center-center ekl-header">
    <div class="tab-tabs">
      <div style="width: 100%">
        <div class="meeting-week-value-div">
          <div class='tab-title'>
            <i class="el-icon-arrow-left" @click="handleClickPre"></i>
          </div>
          <div class="meeting-week-value">{{ startDate.format("YYYY") + '-CW' + this.startDate.week() }}</div>
          <div class='tab-title'>
            <i class="el-icon-arrow-right" @click="handleClickNext"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
  export default {
    name: 'meetingHeader',
    data() {
      return {
        startDate: null,
        endDate: null
      }
    },
    created() {
      const dateArray = this.getCurrentWeekdays()
      this.startDate = dateArray[0]
      this.endDate = dateArray[1]
      this.emitTabClick()
    },
    methods: {
      emitTabClick() {
        const startDateMoment = moment(this.startDate.format('YYYY-MM-DD'), 'YYYY-MM-DD')
        const endDateMoment = moment(this.endDate.format('YYYY-MM-DD'), 'YYYY-MM-DD')
        this.$emit('tab-click', [startDateMoment, endDateMoment])
        this.$forceUpdate()
      },
      // 获取当周的开始结束时间，星期1至星期7
      getCurrentWeekdays() {
        const startDate = moment().weekday(0)
        const endDate = moment().weekday(6)
        return [startDate, endDate];
      },
      /**
       * 获取上一周的开始结束时间
       * @returns {*[]}
       */
      getLastWeekdays() {
        const startDate = this.startDate.subtract(7, 'days');
        const endDate = this.endDate.subtract(7, 'days');
        return [startDate, endDate];
      },
      /**
       * 获取下一周的开始结束时间
       * @returns {*[]}
       */
      getNextWeekdays() {
        const startDate = this.startDate.add(7, 'days');
        const endDate = this.endDate.add(7, 'days');
        return [startDate, endDate];
      },
      handleClickPre() {
        const dateArray = this.getLastWeekdays()
        this.startDate = dateArray[0]
        this.endDate = dateArray[1]
        this.emitTabClick()
      },
      handleClickNext() {
        const dateArray = this.getNextWeekdays()
        this.startDate = dateArray[0]
        this.endDate = dateArray[1]
        this.emitTabClick()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .ekl-header {
    margin-right: 10px;
    max-width: calc(100% - 60px);

    .tab-tabs {
      width: 100%;
      .meeting-week-value-div {
        display: flex;
        justify-content: space-between;
        .tab-title {
          color: hsl(0deg 0% 53%);
          font-size: 20px;
          font-weight: 900;
        }
        .tab-title:hover {
          cursor: pointer;
        }
        .meeting-week-value {
          font-size: 16px;
          min-width: 105px;
          height: 24px;
          line-height: 24px;
          //width: 24px;
          text-align: center;
          color: rgb(255, 255, 255);
          font-weight: normal;
        }
      }
    }
  }
</style>
