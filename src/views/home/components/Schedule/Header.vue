<template>
  <div class="flex-between-center-center ekl-header">
    <div class="tab-tabs">
      <div style="width: 100%">
        <div class="meeting-week-value-div">
          <div class='tab-title'>
            <i class="el-icon-arrow-left" @click="handleClickPre"></i>
          </div>
          <div class="meeting-week-value">{{ curWeekInfo }}</div>
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
    computed: {
      curWeekInfo() {
        if(this.startDate) {
          return this.startDate.format("YYYY") + '-CW' + this.startDate.week()
        } else {
          return ''
        }
      },
    },
    created() {
      const dateArray = this.getCurrentWeekdays()
      this.startDate = dateArray[0]
      this.endDate = dateArray[1]
    },
    methods: {
      // 获取当周的开始结束时间，周日至周一
      getCurrentWeekdays() {
        const startDate = moment().startOf("weeks");
        const endDate = moment().endOf("weeks");
        return [startDate, endDate];
      },
      /**
       * 获取上一周的开始结束时间
       * @returns {*[]}
       */
      getLastWeekdays() {
        const startDateMoment = moment(this.startDate)
        const endDateMoment = moment(this.endDate)
        const startDate = startDateMoment.week(startDateMoment.week() - 1).startOf("weeks");
        const endDate = endDateMoment.week(endDateMoment.week() - 1).endOf("weeks");
        return [startDate, endDate];
      },
      /**
       * 获取下一周的开始结束时间
       * @returns {*[]}
       */
      getNextWeekdays() {
        const startDateMoment = moment(this.startDate)
        const endDateMoment = moment(this.endDate)
        const startDate = startDateMoment.week(startDateMoment.week() + 1).startOf("weeks");
        const endDate = endDateMoment.week(endDateMoment.week() + 1).endOf("weeks");
        return [startDate, endDate];
      },
      handleClickPre() {
        const dateArray = this.getLastWeekdays()
        this.startDate = dateArray[0]
        this.endDate = dateArray[1]
        this.$emit('tab-click', dateArray)
      },
      handleClickNext() {
        const dateArray = this.getNextWeekdays()
        this.startDate = dateArray[0]
        this.endDate = dateArray[1]
        this.$emit('tab-click', dateArray)
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
          font-size: 20px;
          min-width: 105px;
          //width: 24px;
          text-align: center;
          color: rgb(255, 255, 255);
          font-weight: normal;
        }
      }
    }
  }
</style>
