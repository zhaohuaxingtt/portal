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
            v-model="formData.name"
            :placeholder="language('请输入', '请输入')"
          /> 
        </el-form-item>
        <el-form-item
          :label="language('HUIYILEIXING', '会议类型')"
          prop="meetingTypeIds"
        > 
          <iSelect
            v-model="formData.meetingTypeIds"
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
        <!-- 不要周次 -->
        <!-- <el-form-item :label="language('周次', '周次')" prop="weekOfYears">
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
        </el-form-item> -->
      </el-form>
    </search>
    <el-divider></el-divider>
    <div class="padding-bottom35">
      <div class="flex-end-center margin-bottom25">
        <iButton :loading="loadingBtn" @click="sure">{{ language('QUEDING', ' 确定') }}</iButton>
      </div>
      <commonTable
        @handleSelectionChange="handleSelectionChange"
        :height="400"
        :customClass="true"
        :index="true"
        :openPageGetRowData="true"
        :tableLoading="loading"
        :tableData="tableData"
        :tableTitle="tableColumns"
      >
        <!-- <template slot="startDate" slot-scope="scope">
          {{ meetingTime(scope.row) }}
        </template> -->
        <template slot="weekOfYear" slot-scope="scope">
          <span>CW{{ scope.row.weekOfYear }}/53</span> 
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
// import { getMettingType } from '@/api/meeting/type'
import { findToReschedule , rescheduleThemen , findByPageForGP ,findByReschedule, updateMeeting} from '@/api/meeting/gpMeeting'
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
      loadingBtn:false,
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
  props: {
    rowId:{
      type: String,
    }
  },
  created() {  
    this.getAllSelectList()
    this.query()
  },
  methods:{
    //获取列表 
    query(){
      const params = {
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
        themenId:this.rowId,
        meetingId: this.$route.query.id,
        ...this.formDataDefault
      }
      findToReschedule(params).then((res) => {
        this.tableData = res.data
        this.page.totalCount = res.total
        this.tableData.forEach(x=>{
          this.meetingStatus.forEach(y=>{
            if (x.state == y.code) {
              x.state = y.name 
            }
          })
        })
      })
    },
    //会议类型  后面说还要改  /meetingTypeService/findByReschedule
    getAllSelectList() {
      let param = {
        pageSize: 1000,
        pageNum: 1,
        isCurrentUser: true,
        meetingId: this.$route.query.id,
      }
      findByReschedule(param).then((res) => {
        this.meetingTypeList = res.map(item => 
        ({id: Number(item.id), name: item.name}))
      })
    },
      // 查询
    search() {
      console.log(this.formData);
      this.page.currPage = 1
      this.formDataDefault =(this.formData)
      this.meetingTypeList.forEach(x=>{
        if (this.formData.meetingTypeIds==x.name) {
          this.formData.meetingTypeIds=x.id
        }
      })
      // this.formDataDefault.meetingTypeIds=[this.formData.meetingTypeIds]
      if (this.formDataDefault.meetingTypeIds=='') {
        this.formDataDefault.meetingTypeIds=[]
      }else{
        if (this.formDataDefault.meetingTypeIds!='') {
          if (this.formDataDefault.meetingTypeIds!=this.formData.meetingTypeIds) {
            
            this.formDataDefault.meetingTypeIds=[this.formData.meetingTypeIds]
          }else{
            this.formDataDefault.meetingTypeIds=[this.formData.meetingTypeIds]
          }
        }
      }

      // this.query()
      // 查询改为调别得接口  findByPageForGP
      this.getList()

    },
    // 这个接口仅仅只是查询调  findByPageForGP
    getList(){
      const params = {
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
        themenId:this.rowId,
        meetingId: this.$route.query.id,
        ...this.formDataDefault
      }
      findByPageForGP(params).then((res) => {
        this.tableData = res.data
        this.page.totalCount = res.total
        this.tableData.forEach(x=>{
          this.meetingStatus.forEach(y=>{
            if (x.state == y.code) {
              x.state = y.name 
            }
          })
        })
      })
      this.meetingTypeList.forEach(x=>{
        if (this.formData.meetingTypeIds==x.id) {
          this.formData.meetingTypeIds=x.name
        }
      })

    },
    // 重置
    reset() {
      this.formData = { ...MEETING_SEARCH_DATA }
      this.formDataDefault.meetingTypeIds=[]
      this.formDataDefault.weekOfYears=[]
      this.formDataDefault.states=[]
      this.formDataDefault.startDateBegin=null
      this.formDataDefault.startDateEnd=null
      // this.search()
      // 重置还是调原来的接口
      this.query()
    },
    //当前行
    handleSelectionChange(selection) {
      this.selectRows = selection
       console.log(this.selectRows)
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
    //列表勾选确认  rescheduleThemen
    sure(){
      console.log(this.selectRows)
     if (this.selectRows.length > 1 || this.selectRows < 1)
        return this.$alert(
          this.$t('请选择一条数据'),
          this.$t('温馨提示'),
          {
            type: 'warning'
          }
    )
      const params = {
        sourceMeetingId: this.$route.query.id,
        targetMeetingId:this.selectRows[0].id,
        themenId:this.rowId,

      }
      console.log(params);
      // return
      this.loadingBtn=true
      updateMeeting(params) .then((res) => {
          iMessage.success('改期成功')
          this.loadingBtn=false

          // iMessage.success(res.message)
          this.$emit('flushTable')
          this.$emit('close')
      })
        .catch((err)=>{
          this.loading=false
           this.$alert('系统异常', this.$t('GP_PROMPT'), {
            type: 'warning'
          })
        })
        

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