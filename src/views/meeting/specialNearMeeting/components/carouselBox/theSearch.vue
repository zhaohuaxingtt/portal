<template>
  <div class="near-search-box">
    <iSearch
      @reset="handleSearchReset"
      @sure="searchTableList"
      :icon="false"
      style="margin-bottom: 40px"
    >
      <el-form>
        <!--第一行-->
        <el-row>
          <!--会议名称-->
          <el-form-item :label="$t('MT_HUIYIMINGCHENG')" style="width: 538px">
            <iInput
              :placeholder="$t('LK_QINGSHURU')"
              v-model="form.name"
            ></iInput>
          </el-form-item>
          <!--会议类型-->
          <el-form-item :label="$t('MT_HUIYILEIXING')">
            <iSelect
              :placeholder="$t('LK_QINGXUANZE')"
              v-model="form.meetingTypeId"
            >
              <el-option value="" :label="$t('all')"></el-option>
              <el-option
                :value="item.id"
                :label="item.name"
                v-for="item of meetingTypeList"
                :key="item.id"
              ></el-option>
            </iSelect>
          </el-form-item>
          <!--状态-->
          <el-form-item :label="$t('MT_ZHUANGTAI')">
            <iSelect :placeholder="$t('LK_QINGXUANZE')" v-model="form.states">
              <el-option value="" :label="$t('all')"></el-option>
              <el-option
                :value="item.value"
                :label="$t(item.i18n)"
                v-for="item of statusList"
                :key="item.value"
              ></el-option>
            </iSelect>
          </el-form-item>
          <iDateRangePicker
            :startDateProps="form.startDateBegin"
            :endDateProps="form.startDateEnd"
            @change-start="changeStart"
            @change-end="changeEnd"
            :pickerOptionsStartProps="datePickerOptionsStart"
            :pickerOptionsEndProps="datePickerOptionsEnd"
            :pickerOptionsEndFun="pickerOptionsEndFun"
            ref="iDateRangePicker"
            :label="$t('MT_HUIYIRIQI')"
          />
          <el-form-item :label="$t('MT_SHOUJIANREN')">
            <el-autocomplete
              v-model="form.receiver"
              :fetch-suggestions="querySearchAsync"
              :placeholder="$t('MT_QINGSHURU')"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <!-- 周次 -->
          <el-form-item :label="$t('MT_ZHOUCI')" class="LastSearchOption">
            <iSelect
              filterable
              :placeholder="$t('LK_QINGXUANZE')"
              v-model="form.weekOfYears"
              :multiple="true"
              :collapse-tags="true"
              onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))"
            >
              <el-option
                :value="item.value"
                :label="item.label"
                v-for="item of weekList"
                :key="item.value"
              ></el-option>
            </iSelect>
          </el-form-item>
        </el-row>
      </el-form>
    </iSearch>
  </div>
</template>

<script>
import { iInput, iSelect } from 'rise'
import { getMettingType } from '@/api/meeting/type'
import { getPageListByParam } from '@/api/usercenter/receiver.js'
import iDateRangePicker from '@/components/iDateRangePicker/index.vue'
import iSearch from '@/components/iSearch/index.vue'
import dayjs from '@/utils/dayjs.js'
import { datestring } from '@/utils/utils.js'
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
      restaurants: [],
      timeout: null,
      meetingTypeList: [],
      statusList: [
        // {
        //   label: "草稿",
        //   value: "01",
        // },
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
      ],
      datePickerOptionsStart: {
        // 日期选择
        disabledDate: (date) => {
          let newDate = new Date().valueOf()
          return (
            date.valueOf() < newDate - 24 * 60 * 60 * 1000 * 14 ||
            date.valueOf() > newDate + 24 * 60 * 60 * 1000 * 6
          )
        }
      },
      datePickerOptionsEnd: {
        // 日期选择
        disabledDate: (date) => {
          let newDate = new Date().valueOf()
          return (
            date.valueOf() < newDate - 24 * 60 * 60 * 1000 * 14 ||
            date > newDate + 24 * 60 * 60 * 1000 * 6
          )
        }
      },
      pickerOptionsEndFun: new Date().valueOf() + 24 * 60 * 60 * 1000 * 6,
      startWeek: 0,
      // endWeek: dayjs(dayjs().year()).isoWeeksInYear(),
      endWeek: 0,
      weekListInit: [],
      weekList: [],
      startDate: '',
      endDate: ''
    }
  },
  created() {
    this.startDate = datestring(
      new Date(new Date().valueOf()) - 24 * 60 * 60 * 1000 * 13
    )
    this.endDate = datestring(
      Number(new Date(new Date().valueOf())) + 24 * 60 * 60 * 1000 * 6
    )
    this.startWeek = this.getCurWeekNum(this.startDate)
    this.endWeek = this.getCurWeekNum(this.endDate)
    this.weekListInit = this.getWeekList(this.startWeek, this.endWeek)
    this.weekList = this.getWeekList(this.startWeek, this.endWeek)
  },
  mounted() {
    this.getAllSelectList()
  },
  methods: {
    getWeekList(startWeek, endWeek) {
      let list = []
      if (startWeek <= endWeek) {
        for (let index = startWeek; index <= endWeek; index++) {
          let str = index < 9 ? '0' + index : index
          list.push({
            label:
              'CW' + str + '/' + this.handleWeeks(`${dayjs().year()}-01-01`),
            value: index
          })
        }
      } else {
        let middleYear = dayjs(
          this.form.startDateBegin ? this.form.startDateBegin : this.startDate
        ).year()
        for (let index = startWeek; index <= middleYear; index++) {
          let str = index < 9 ? '0' + index : index
          list.push({
            label: 'CW' + str + '/' + this.handleWeeks(`${middleYear}-01-01`),
            value: index
          })
        }
        let curWeekNum = this.getCurWeekNum(
          this.form.startDateEnd ? this.form.startDateEnd : this.endDate
        )
        for (let index = 1; index <= curWeekNum; index++) {
          let str = index < 9 ? '0' + index : index
          list.push({
            label:
              'CW' + str + '/' + this.handleWeeks(`${middleYear + 1}-01-01`),
            value: index
          })
        }
      }
      return list
    },
    getCurWeekNum(e) {
      const weekNum2 = new Date(e).getDay()
      const shouldDel = weekNum2 === 1 ? 0 : 7 - weekNum2 + 1
      const curDayNum = dayjs(e).dayOfYear()
      const curWeekNum = Math.ceil((curDayNum - shouldDel) / 7)
      return curWeekNum
    },
    handleWeeks(e) {
      const currentFistYearDay = e ? e : `${dayjs().year()}-01-01`
      const isLeap = dayjs(currentFistYearDay).isLeapYear() // true
      const totalDay = isLeap ? 366 : 365
      const weekNum2 = new Date(currentFistYearDay).getDay()
      const shouldDel = weekNum2 === 1 ? 0 : 7 - weekNum2 + 1
      const weekNum = Math.ceil((totalDay - shouldDel) / 7)
      return weekNum
    },
    async querySearchAsync(queryString, cb) {
      let res = await this.getUsersAll(queryString)
      res = res || { data: [] }
      let userArr = res.data || []
      userArr = userArr.map((item) => {
        return {
          value: item.nameZh,
          ...item
        }
      })
      cb(userArr)
    },
    handleSelect(item) {
      this.form.receiverId = item.id
      // console.log("this.form.receiver.id", this.form.receiverId);
    },

    async getUsersAll(str) {
      const data = {
        nameZh: str
      }
      let res = await getPageListByParam(data)
      return res
    },
    handleSearchReset() {
      this.form = {}
      this.weekList = [...this.weekListInit]
      this.$nextTick(() => {
        this.$refs.iDateRangePicker.c()
      })
      this.$emit('handleSearchReset')
    },
    searchTableList() {
      this.$emit('searchTableList')
    },
    getAllSelectList() {
      let param = {
        pageSize: 1000,
        pageNum: 1
      }
      getMettingType(param).then((res) => {
        this.meetingTypeList = res.data.filter((item) => {
          return item.category === '02'
        })
      })
    },
    changeStart(e) {
      this.form.startDateBegin = e

      // this.startWeek = dayjs(e).week() - 1
      // let weekListInit = JSON.parse(JSON.stringify(this.weekListInit))
      // this.weekList = weekListInit.slice(this.startWeek, this.endWeek)
      this.weekList = this.getWeekList(
        this.getCurWeekNum(
          this.form.startDateBegin ? this.form.startDateBegin : this.startDate
        ),
        this.getCurWeekNum(
          this.form.startDateEnd ? this.form.startDateEnd : this.endDate
        )
      )
      this.$emit('deleteWeek')
    },
    changeEnd(e) {
      this.form.startDateEnd = e
      // if (e) {
      //   this.endWeek = dayjs(e).week()
      // } else {
      //   // this.endWeek = dayjs(dayjs().year()).isoWeeksInYear()
      //   this.endWeek = this.handleWeeks()
      // }
      // let weekListInit = JSON.parse(JSON.stringify(this.weekListInit))
      // this.weekList = weekListInit.slice(this.startWeek, this.endWeek)
      this.weekList = this.getWeekList(
        this.getCurWeekNum(
          this.form.startDateBegin ? this.form.startDateBegin : this.startDate
        ),
        this.getCurWeekNum(
          this.form.startDateEnd ? this.form.startDateEnd : this.endDate
        )
      )
      this.$emit('deleteWeek')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .near-search-box .cardBody {
  padding: 0 0 30px !important;
}
::v-deep .el-autocomplete {
  width: 220px !important;
}
</style>
