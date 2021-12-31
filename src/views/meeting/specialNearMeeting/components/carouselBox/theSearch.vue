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
import { weekListInit } from './data'
import { getPageListByParam } from '@/api/usercenter/receiver.js'
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
      endWeek: dayjs(dayjs().year()).isoWeeksInYear(),
      weekListInit,
      weekList: weekListInit
    }
  },
  mounted() {
    this.getAllSelectList()
  },
  methods: {
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
      this.weekList = weekListInit
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
      this.startWeek = dayjs(e).week() - 1
      let weekListInit = JSON.parse(JSON.stringify(this.weekListInit))
      this.weekList = weekListInit.slice(this.startWeek, this.endWeek)
      this.$emit('deleteWeek')
    },
    changeEnd(e) {
      this.form.startDateEnd = e
      if (e) {
        this.endWeek = dayjs(e).week()
      } else {
        this.endWeek = dayjs(dayjs().year()).isoWeeksInYear()
      }
      let weekListInit = JSON.parse(JSON.stringify(this.weekListInit))
      this.weekList = weekListInit.slice(this.startWeek, this.endWeek)
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
