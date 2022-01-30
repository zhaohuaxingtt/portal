<template>
  <iSearch @reset="handleSearchReset" @sure="searchTableList" :icon="false">
    <el-form>
      <!--第一行-->
      <el-row>
        <!--会议名称-->
        <el-form-item
          :label="$t('MT_HUIYIMINGCHENG')"
          class="meeting-name-item"
        >
          <iInput
            :placeholder="$t('LK_QINGSHURU')"
            v-model="form.name"
          ></iInput>
        </el-form-item>
        <el-form-item :label="$t('MT_HUIYIDIDIAN')" class="meeting-name-item">
          <iInput
            :placeholder="$t('LK_QINGSHURU')"
            v-model="form.meetingPlace"
          ></iInput>
        </el-form-item>
        <!--会议类型-->
        <el-form-item :label="$t('MT_HUIYILEIXING')">
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            v-model="form.meetingType"
            value-key="id"
          >
            <el-option value="" :label="$t('all')"></el-option>
            <el-option
              :value="item"
              :label="item.name"
              v-for="item of meetingTypeList"
              :key="item.id"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-row>
      <el-row>
        <!--状态-->
        <el-form-item :label="$t('MT_ZHUANGTAI2')" class="LastSearchOption">
          <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.states">
            <el-option value="" :label="$t('all')"></el-option>
            <el-option
              :value="item.value"
              :label="$t(item.label)"
              v-for="item of statusList"
              :key="item.value"
            ></el-option>
          </iSelect>
        </el-form-item>
        <!-- <iDateRangePicker
          class="LastSearchOption"
          :startDateProps="form.startDateBegin"
          :endDateProps="form.startDateEnd"
          @change-start="changeStart"
          @change-end="changeEnd"
          :pickerOptionsStartProps="datePickerOptionsStart"
          :pickerOptionsEndProps="datePickerOptionsEnd"
          :pickerOptionsEndFun="pickerOptionsEndFun"
          ref="iDateRangePicker"
          :label="$t('MT_HUIYIRIQI')"
        /> -->
        <iDateRangePicker
          class="LastSearchOption"
          :startDateProps="form.startDateBegin"
          :endDateProps="form.startDateEnd"
          @change-start="changeStart"
          @change-end="changeEnd"
          ref="iDateRangePicker"
          :label="$t('MT_HUIYIRIQI')"
        />
        <!-- 周次 -->
        <el-form-item :label="$t('MT_ZHOUCI')" class="LastSearchOption">
          <iSelect
            :placeholder="$t('LK_QINGXUANZE')"
            onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))"
            v-model="form.weekOfYears"
            :multiple="true"
            :collapse-tags="true"
            :reserve-keyword="true"
            :filterable="true"
          >
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="(item, index) of weekList"
              :key="index"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-row>
    </el-form>
  </iSearch>
</template>

<script>
import { iInput, iSelect, iMessage } from 'rise'
import { getMettingType } from '@/api/meeting/type'
import { statusList } from './data'
import iDateRangePicker from '@/components/iDateRangePicker/index.vue'
import iSearch from '@/components/iSearch/index.vue'
import dayjs from '@/utils/dayjs.js'

export default {
  components: {
    iSearch,
    iInput,
    iSelect,
    iDateRangePicker
  },
  props: {
    form: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      sortArr: [],
      meetingTypeList: [],
      statusList,
      // startWeek: curWeekNum - 1,
      // endWeek: dayjs(dayjs().year()).isoWeeksInYear(),
      // endWeek: this.handleWeeks(),
      weekListInit: [],
      weekList: []
      // datePickerOptionsStart: {
      //   // 日期选择
      //   disabledDate: (date) => {
      //     let newDate = new Date().valueOf()
      //     return (
      //       date.valueOf() < newDate - 24 * 60 * 60 * 1000 * 14 ||
      //       date.valueOf() > newDate + 24 * 60 * 60 * 1000 * 6
      //     )
      //   }
      // },
      // datePickerOptionsEnd: {
      //   // 日期选择
      //   disabledDate: (date) => {
      //     let newDate = new Date().valueOf()
      //     return (
      //       date.valueOf() < newDate - 24 * 60 * 60 * 1000 * 14 ||
      //       date > newDate + 24 * 60 * 60 * 1000 * 6
      //     )
      //   }
      // },
      // pickerOptionsEndFun: new Date().valueOf() + 24 * 60 * 60 * 1000 * 6
    }
  },
  created() {
    this.weekListInit = this.getWeekList(this.form.startDateBegin)
    this.weekList = [...this.weekListInit]
  },
  mounted() {
    this.getAllSelectList()
  },
  watch: {
    'form.meetingType': {
      handler(value) {
        if (!value) {
          return
        }
        if (value.name === 'CSC') {
          this.statusList = [
            {
              label: '草稿',
              value: '01',
              i18n: 'MT_CAOGAO'
            },
            {
              label: '开放',
              value: '02',
              i18n: 'MT_KAIFANG'
            },
            {
              label: '开始',
              value: '04',
              i18n: 'MT_KAISHI'
            },
            {
              label: '结束',
              value: '05',
              i18n: 'MT_JIESHU'
            },
            {
              label: '关闭',
              value: '06',
              i18n: 'MT_GUANBI'
            }
          ]
        } else {
          this.statusList = [
            {
              label: '草稿',
              value: '01',
              i18n: 'MT_CAOGAO'
            },
            {
              label: '开放',
              value: '02',
              i18n: 'MT_KAIFANG'
            },
            {
              label: '锁定',
              value: '03',
              i18n: 'MT_SUODING'
            },
            {
              label: '开始',
              value: '04',
              i18n: 'MT_KAISHI'
            },
            {
              label: '结束',
              value: '05',
              i18n: 'MT_JIESHU'
            },
            {
              label: '关闭',
              value: '06',
              i18n: 'MT_GUANBI'
            }
          ]
        }
      }
    }
  },
  methods: {
    // keyUp(e) {
    //   e.target.value = e.target.value.replace(/[^\d]/g, '')
    // },
    // 获取一年中的周数
    //param: xxx-xxx-xxx 或者 xxx
    handleWeeks(year) {
      const compuYear = year
        ? year.toString().includes('-')
          ? dayjs(year).format('YYYY')
          : year
        : dayjs().year()
      const currentFistYearDay = `${compuYear}-01-01`
      const isLeap = dayjs(currentFistYearDay).isLeapYear() // true
      const totalDay = isLeap ? 366 : 365
      const weekNum2 = new Date(currentFistYearDay).getDay()===0?7:new Date(currentFistYearDay).getDay()
      const shouldDel = weekNum2 === 1 ? 0 : 7 - weekNum2 + 1
      const weekNum = Math.ceil((totalDay - shouldDel) / 7)
      return weekNum
    },
    // 获取当前日期在当前年的第几周
    //param xxx-xxx-xxx
    getCurWeekNum(e) {
      const year = dayjs(e).year()
      const currentFistYearDay = `${year}-01-01`
      const weekNum2 = new Date(currentFistYearDay).getDay()===0?7:new Date(currentFistYearDay).getDay()
      const shouldDel = weekNum2 === 1 ? 0 : 7 - weekNum2 + 1
      const curDayNum = dayjs(e).dayOfYear()
      let curWeekNum = Math.ceil((curDayNum - shouldDel) / 7)
      if (curWeekNum < 1) {
        const preLastYearDay = `${year - 1}-12-31`
        return {
          state: 'pre',
          number: this.getCurWeekNum(preLastYearDay).number,
          year: year - 1,
          weeks: this.handleWeeks(year - 1),
          compuYear: preLastYearDay
        }
      }
      return {
        state: 'current',
        number: curWeekNum,
        year,
        weeks: this.handleWeeks(year)
      }
    },
    //获取当前年的第一个周一是几月几日
    getDateByYear(year) {
      const yearFirstDate = `${year}-01-01`
      const week = new Date(yearFirstDate).getDay()
      if (week === 1) {
        return yearFirstDate
      }
      return `${year}-01-0${9 - week}`
    },
    //根据起始日期和结束日期来选择
    //param XXX-XXX-XXX
    getWeekList(fromD, endD) {
      const endDate = endD
        ? endD
        : fromD
        ? `${dayjs(fromD).year()}-12-31`
        : `${dayjs().year()}-12-31`
      const fromDate = fromD ? fromD : this.getDateByYear(dayjs(endDate).year())
      let weekList = []
      const from = new Date(fromDate).getTime()
      const to = new Date(endDate).getTime()
      if (from > to) {
        iMessage.error('date error!!!')
        return false
      }
      const fromYearD = dayjs(fromDate).year()
      const endYearD = dayjs(endDate).year()
      if (fromYearD === endYearD) {
        //周数
        const weekNum = this.handleWeeks(fromDate)
        //获取当前日期在当前年的第几周
        const weekFrom = this.getCurWeekNum(fromDate)
        const weekTo = this.getCurWeekNum(endDate)
        if (weekFrom.state === 'current' && weekTo.state === 'current') {
          for (let index = weekFrom.number; index <= weekTo.number; index++) {
            let str = index <= 9 ? '0' + index : index
            weekList.push({
              label: 'CW' + str + '/' + weekNum,
              value: index
            })
          }
          return weekList
        } else {
          let dateF = weekFrom.state === 'pre' ? weekFrom.compuYear : fromDate
          let dateE = weekTo.state === 'pre' ? weekTo.compuYear : endDate
          return this.getWeekList(dateF, dateE)
        }
      }
      const fromYear = Number(dayjs(fromDate).format('YYYY'))
      const toYear = Number(dayjs(endDate).format('YYYY'))
      let yearList = []
      for (let index = fromYear; index <= toYear; index++) {
        yearList.push(index)
      }
      let everyYearWeeksList = yearList.map((item) => {
        if (item === fromYear) {
          return this.getWeekList(fromDate, fromYear + '-12-31')
        }
        if (item === toYear) {
          const firstDate = this.getDateByYear(toYear)
          return this.getWeekList(firstDate, endDate)
        }
        let list = []
        const wholeYearWeekNum = this.handleWeeks(item)
        for (let ind = 1; ind <= wholeYearWeekNum; ind++) {
          let str = ind <= 9 ? '0' + ind : ind
          list.push({
            label: 'CW' + str + '/' + wholeYearWeekNum,
            value: ind
          })
        }
        return list
      })
      weekList = this.deleMuptil(everyYearWeeksList.flat())
      this.sortArr = []
      this.getBigestFromArrObj(weekList)
      weekList = this.sortArr
      return weekList
    },
    deleMuptil(arr) {
      let obj = {}
      arr = arr.reduce((cur, next) => {
        if (!obj[next.label]) {
          obj[next.label] = true
          cur.push(next)
        }
        return cur
      }, [])
      return arr
    },
    //获取数组里的最大值
    getBigestFromArrObj(arr) {
      let arrCopy = [...arr]
      let maxObj = arr[0]
      let curIndex = 0
      if (arr.length < 1) {
        return
      }
      if (arr.length === 1) {
        maxObj = arr[0] || {}
        this.sortArr.unshift(maxObj)
        return
      }
      if (arr.length > 1) {
        for (let index = 0; index <= arr.length; index++) {
          if (arr[index] && arr[index].value > maxObj.value) {
            maxObj = arr[index]
            curIndex = index
          }
        }
      }
      arrCopy.splice(curIndex, 1)
      this.sortArr.unshift(maxObj)
      return this.getBigestFromArrObj(arrCopy)
    },
    handleSearchReset() {
      this.form = {}
      this.weekList = [...this.weekListInit]
      this.$nextTick(() => {
        this.$refs.iDateRangePicker.initDate()
      })
      this.$emit('handleSearchReset')
    },
    searchTableList() {
      this.$emit('searchTableList')
    },
    getAllSelectList() {
      let param = {
        pageSize: 1000,
        pageNum: 1,
        isCurrentUser: true
      }
      getMettingType(param).then((res) => {
        this.meetingTypeList = res.data
        this.$emit('setTypeObj', res.data)
      })
    },
    changeStart(e) {
      this.form.startDateBegin = e
      // this.startWeek = dayjs(e).week() - 1
      // this.startWeek = this.getCurWeekNum(e)
      // let weekListInit = JSON.parse(JSON.stringify(this.weekListInit))
      // this.weekList = weekListInit.slice(this.startWeek - 1, this.endWeek)
      this.weekList = this.getWeekList(
        this.form.startDateBegin,
        this.form.startDateEnd
      )
      this.$emit('deleteWeek')
    },
    changeEnd(e) {
      this.form.startDateEnd = e
      // if (e) {
      //   // this.endWeek = dayjs(e).week()
      //   this.endWeek = this.getCurWeekNum(e)
      // } else {
      //   // this.endWeek = dayjs(dayjs().year()).isoWeeksInYear()
      //   this.endWeek = this.handleWeeks()
      // }
      // let weekListInit = JSON.parse(JSON.stringify(this.weekListInit))
      // this.weekList = weekListInit.slice(this.startWeek - 1, this.endWeek)
      this.weekList = this.getWeekList(
        this.form.startDateBegin,
        this.form.startDateEnd
      )
      this.$emit('deleteWeek')
    }
  }
}
</script>

<style scoped>
::v-deep .LastSearchOption {
  margin-top: 20px;
}

::v-deep .iSearch-content {
  justify-content: space-between;
}
::v-deep .cardBody {
  padding: 1.875rem 1.5rem !important;
}
.meeting-name-item {
  width: 538px !important;
}
</style>
