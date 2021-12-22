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
        <el-form-item :label="$t('MT_ZHUANGTAI')" class="LastSearchOption">
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
              v-for="item of weekList"
              :key="item.value"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-row>
    </el-form>
  </iSearch>
</template>

<script>
import { iInput, iSelect } from 'rise'
import { getMettingType } from '@/api/meeting/type'
import { statusList, weekListInit } from './data'
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
      meetingTypeList: [],
      statusList,
      startWeek: 0,
      endWeek: dayjs(dayjs().year()).isoWeeksInYear(),
      weekListInit,
      weekList: weekListInit
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
  mounted() {
    this.getAllSelectList()
  },
  watch: {
    'form.weekOfYears': {
      handler(val) {
        console.log('val', val)
      },
      immediate: true
    },
    'form.meetingType': {
      handler(value) {
        if (!value) {
          return
        }
        if (value.name === 'CSC') {
          this.statusList = [
            {
              label: '草稿',
              value: '01'
            },
            {
              label: '开放',
              value: '02'
            },
            {
              label: '开始',
              value: '04'
            },
            {
              label: '结束',
              value: '05'
            },
            {
              label: '关闭',
              value: '06'
            }
          ]
        } else {
          this.statusList = [
            {
              label: '草稿',
              value: '01'
            },
            {
              label: '开放',
              value: '02'
            },
            {
              label: '锁定',
              value: '03'
            },
            {
              label: '开始',
              value: '04'
            },
            {
              label: '结束',
              value: '05'
            },
            {
              label: '关闭',
              value: '06'
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
    handleSearchReset() {
      this.form = {}
      this.weekList = weekListInit
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
