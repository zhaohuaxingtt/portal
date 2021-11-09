<template>
  <div class="i-calendar">
    <v-date-picker
      :masks="masks"
      show-iso-weeknumbers
      :attributes="holiday"
      v-model="value"
      :disabled-dates="disabledDates"
      @dayclick="handleDayClick"
      @dayfocusout="handleDayFocusOut"
      @update:to-page="handleToPage"
      @update:from-page="handleFromPage"
      @popoverWillShow="handlePopoverWillShow"
    >
      <template v-slot="{ inputValue, togglePopover }">
        <input
          class="bg-white border px-2 py-1 rounded"
          :value="inputValue"
          v-on:click="togglePopover"
        />
      </template>
    </v-date-picker>
  </div>
</template>

<script>
import { DatePicker as VDatePicker } from 'v-calendar'
export default {
  components: {
    VDatePicker
  },
  props: {
    holiday: {
      type: Array,
      default: () => {
        return []
      }
    },
    disabledDates: {
      type: Array,
      default: () => {
        return []
      }
    },
    masks: {
      type: Object,
      default: () => {
        return {
          input: 'YYYY-MM-DD'
        }
      }
    }
  },
  data() {
    return {
      days: 365
    }
  },
  methods: {
    handlePopoverWillShow() {
      const currentHolidayFirstItem =
        this.holiday.length && this.holiday[0].dates
      const currentHolidayYear =
        /\d{4}/g.exec(currentHolidayFirstItem) &&
        /\d{4}/g.exec(currentHolidayFirstItem)[0]
      const year = new Date().getFullYear()
      if (!this.holiday.length || year != currentHolidayYear) {
        this.getHoliday(year)
      }
    },
    queryCalendar(year, queryType) {
      return new Promise((resolve, reject) => {
        const http = new XMLHttpRequest()
        const url = `/baseInfo/web/queryCalendar`
        http.open('POST', url, true)
        http.setRequestHeader('content-type', 'application/json')
        http.onreadystatechange = () => {
          if (http.readyState === 4) {
            const result = JSON.parse(http.response)
            resolve(result)
          }
        }
        const sendData = {
          queryDayNum: this.days,
          queryType: queryType,
          startDay: `${year}-01-01`
        }
        http.send(JSON.stringify(sendData))
      }).catch(error => {
        console.log(error)
      })
    },
    async getHoliday(year) {
      this.checkYear(year)
      const result_1 = await this.queryCalendar(year, 2)
      const result_2 = await this.queryCalendar(year, 3)
      if (result_1.code === '200' && result_2.code === '200') {
        let data_1 = result_1.data || []
        let data_2 = result_2.data || []
        data_1 = data_1.map(item => {
          const date =
            /\d{4}-\d{1,2}-\d{1,2}/g.exec(item.dateContent) &&
            /\d{4}-\d{1,2}-\d{1,2}/g.exec(item.dateContent)[0]
          return {
            dates: date,
            highlight: { fillMode: 'light', color: 'gray' }
          }
        })
        data_2 = data_2.map(item => {
          const date =
            /\d{4}-\d{1,2}-\d{1,2}/g.exec(item.dateContent) &&
            /\d{4}-\d{1,2}-\d{1,2}/g.exec(item.dateContent)[0]
          return {
            dates: date,
            highlight: { fillMode: 'light', color: 'gray' }
          }
        })
        const all = data_1.concat(data_2)
        this.holiday = all
      }
    },
    checkYear(year) {
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        this.days = 366
      } else {
        this.days = 365
      }
    },
    handleFromPage(page) {},
    handleToPage(page) {
      const currentYear = new Date().getFullYear()
      if (page.year !== currentYear) {
        this.getHoliday(page.year)
      }
    },
    handleDayClick(day) {
      this.$emit('input', day.id)
    },
    handleDayFocusOut() {}
  }
}
</script>

<style lang="scss">
.i-calendar {
  input {
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    height: 40px;
    line-height: 40px;
  }
  input:focus-visible {
    outline: 0;
  }
  input:focus {
    border-color: #409eff;
    outline: none;
  }
}
</style>
