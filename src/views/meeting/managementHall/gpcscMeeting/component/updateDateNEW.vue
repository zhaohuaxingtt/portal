<!--
 * @Author: HS  CSC改期
 * @FilePath: \front-portal\src\views\meeting\managementHall\gpcscMeeting\component\updateDateNEW.vue
-->
<template>
  <div>
      <search @sure="search" @reset="reset">
      <el-form @keyup.enter.native="sure">
        <el-form-item
          style="width: 440px"
          :label="language('HUIYIMINGCHENG', '会议名称')"
          prop="meetingName"
        >
          <i-input
            v-model="formData.meetingName"
            :placeholder="language('请输入', '请输入')"
          /> 
        </el-form-item>
        <el-form-item
          :label="language('HUIYILEIXING', '会议类型')"
          prop="meetingTypeId"
        >
          <iSelect
            v-model="formData.meetingTypeId"
            :placeholder="language('请选择', '请选择')"
          >
            <el-option
              v-for="item in meetingTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item :label="language('ZHUANGTAI', '状态')" prop="states">
          <iSelect
            multiple
            clearable
            collapse-tags
            v-model="formData.states"
            :placeholder="language('请选择', '请选择')"
          >
            <el-option
              v-for="item in meetingStatus"
              :key="item.code"
              :label="item.name"
              :value="item.code"
            ></el-option>
          </iSelect>
        </el-form-item>
        <el-form-item
          style="width: 398px;"
          :label="language('会议日期', '会议日期')"
        >
          <div class="datetime flex">
            <iDatePicker
              type="date"
              :picker-options="pickerOptionsBegin"
              :placeholder="language('请选择', '请选择')"
              v-model="formData.startDateBegin"
              value-format="yyyy-MM-dd"
              @change="changeStart"
            />
            <span class="to-date">{{ language('至', '至') }}</span>
            <iDatePicker
              type="date"
              :picker-options="pickerOptionsEnd"
              :placeholder="language('请选择', '请选择')"
              v-model="formData.startDateEnd"
              value-format="yyyy-MM-dd"
              @change="changeEnd"
            />
          </div>
        </el-form-item>
        <el-form-item :label="language('周次', '周次')" prop="weekOfYears">
          <iSelect
            v-model="formData.weekOfYears"
            :placeholder="language('请选择', '请选择')"
            multiple
            clearable
            collapse-tags
          >
            <el-option
              v-for="item in weekList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </iSelect>
        </el-form-item>
      </el-form>
    </search>
    <el-divider></el-divider>
    <div class="padding-bottom35">
      <div class="flex-end-center margin-bottom25">
        <iButton @click="sure">{{ language('QUEDING', ' 确定') }}</iButton>
      </div>
      <commonTable
        @handle-selection-change="handleSelectionChange"
        :height="400"
        :customClass="true"
        :index="true"
        openPageProps="name"
        :openPageGetRowData="true"
        @openPage="goDetail"
        :tableLoading="loading"
        :tableData="tableData"
        :tableTitle="tableColumns"
      >
        <template slot="startDate" slot-scope="scope">
          {{ meetingTime(scope.row) }}
        </template>
      </commonTable>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, query)"
        @current-change="handleCurrentChange($event, query)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </div>
  </div>
</template>

<script>
import commonTable from '@/components/commonTable'
import search from '@/components/iSearch/index.vue'
import { iDialog, iPagination, iButton, iInput, iSelect, iDatePicker, iMessage } from 'rise'
import { MEETING_SEARCH_DATA, MEETING_TABLE_COLUMNS,  weekListInit } from './dataDay'
import dayjs from '@/utils/dayjs.js'
import { pageMixins } from '@/utils/pageMixins'
import { getMettingType } from '@/api/meeting/type'
export default {
   mixins: [pageMixins],
   components: {
    search,
    iDialog,
    commonTable,
    iPagination,
    iSelect,
    iDatePicker,
    iInput,
    iButton
  },
  data() {
    return {
      formData: { ...MEETING_SEARCH_DATA },
      formDataDefault: { ...MEETING_SEARCH_DATA },
      loading: false,
    //   meetingType: [{ id: 149, name: 'MBDL会议' }],
      meetingTypeList:[],
      meetingStatus: [
        { name: '开放', code: '02' },
        { name: '锁定', code: '03' },
        { name: '开始', code: '04' }
      ],
      tableColumns: [...MEETING_TABLE_COLUMNS],
      tableData: [],
      selectRows: [],
      weekListInit,
      weekList: weekListInit,
      startWeek: 0,
      endWeek: dayjs(dayjs().year()).isoWeeksInYear()
    }
  },
  computed: {
    pickerOptionsBegin: function () {
      const _this = this
      return {
        // 开始时间禁止选择终止时间之后
        disabledDate(now) {
          if (!_this.formData.startDateEnd) return false
          let timeBegin = new Date(now).getTime()
          let timeEnd = new Date(_this.formData.startDateEnd).getTime()
          return timeBegin >= timeEnd
        }
      }
    },
    pickerOptionsEnd: function () {
      const _this = this
      return {
        // 终止时间禁止选择起始时间之前
        disabledDate(now) {
          let timeBegin = new Date(_this.formData.startDateBegin).getTime()
          let timeEnd = new Date(now).getTime()
          return timeBegin >= timeEnd
        }
      }
    }
  },
  created() {  
      this.getAllSelectList()
  },
  methods:{
      getAllSelectList() {
      let param = {
        pageSize: 1000,
        pageNum: 1,
        isCurrentUser: true
      }
      getMettingType(param).then((res) => {
        this.meetingTypeList = res.data
      })
    },
      // 查询
    search() {
      this.page.currPage = 1
      this.formDataDefault = this._.cloneDeep(this.formData)
      this.query()
    },
    // 重置
    reset() {
      this.formData = { ...MEETING_SEARCH_DATA }
      this.search()
    },
    //当前行
    handleSelectionChange(selection) {
      this.selectRows = selection
    },
    changeStart(e) {
      this.startWeek = dayjs(e).week() - 1
      let weekListInit = JSON.parse(JSON.stringify(this.weekListInit))
      this.weekList = weekListInit.slice(this.startWeek, this.endWeek)
      this.formData.weekOfYears = []
    },
    changeEnd(e) {
      if (e) {
        this.endWeek = dayjs(e).week()
      } else {
        this.endWeek = dayjs(dayjs().year()).isoWeeksInYear()
      }
      let weekListInit = JSON.parse(JSON.stringify(this.weekListInit))
      this.weekList = weekListInit.slice(this.startWeek, this.endWeek)
      this.formData.weekOfYears = []
    },
    //列表勾选确认
    sure(){

    }

  }

}
</script>

<style lang='scss' scoped>
.datetime {
  background-color: #f8f8fa;
  width: 100%;
  .to-date {
    padding: 0 10px;
    line-height: 35px;
    background-color: #f8f8fa;
  }
}
</style>