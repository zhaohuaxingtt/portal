<!--
 * @Author: yuszhou
 * @Date: 2021-02-19 15:12:20
 * @LastEditTime: 2022-12-28 18:00:10
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: 首页
 * @FilePath: \front-portal\src\views\meeting\home\index.vue
-->
<template>
  <div class="meeting-home">
    <theSearch
      @searchTableList="searchTableList"
      @handleSearchReset="handleSearchReset"
      @setTypeObj="setTypeObj"
      @deleteWeek="deleteWeek"
      :form="form"
      :meetingTypeList="meetingTypeList"
    />
    <theTable
    :form="form"
      v-loading="loading"
      ref="theTable"
      :page="page"
      :total="page.total"
      :tableListData="tableListData"
      :tableListColumns="tableListColumns"
      :typeObject="typeObject"
      :attendeeList="attendeeList"
      :receiverList="receiverList"
      :meetingTypeList="meetingTypeList"
      @handleChangePage="handleChangePage"
      @handleSizePage="handleSizePage"
      @getTableList="getTableList"
      :meetingTypeName="form.meetingType ? form.meetingType.name : ''"
    />
  </div>
</template>

<script>
import theSearch from './components/theSearch.vue'
import theTable from './components/theTable.vue'
import { getMettingList } from '@/api/meeting/home'
import { getAttendee, getReceiver, getMettingType } from '@/api/meeting/type'
import { pageMixins } from '@/utils/pageMixins'
import resultMessageMixin from '@/mixins/resultMessageMixin'
import { tableListColumns } from './components/data'
import { datestring } from '@/utils/utils.js'

export default {
  mixins: [pageMixins, resultMessageMixin],
  components: {
    theSearch,
    theTable
  },
  props: {
    //页面需要的menuType参数
    menuType: {
      type: String,
      default: 'admin' //原来的路由大厅是admin，tab页上的cf
    }
  },
  data() {
    return {
      tableListData: [],
      tableListColumns,
      typeObject: {},
      form: {
        states: [],
        name: '',
        // meetingTypeId: "",
        meetingTypeIdList:[],
        meetingType: {},
        startDate: '',
        startTime: '',
        meetingPlace: '',
        receiverId: '',
        attendeeId: '',
        attendee: '',
        weekOfYears: [],
        startDateBegin: datestring(
          new Date(new Date().valueOf()) - 24 * 60 * 60 * 1000 * 7
        )
        // startDateEnd: datestring(
        //   Number(new Date(new Date().valueOf())) + 24 * 60 * 60 * 1000 * 6
        // )
      },
      meetingTypeList: [],
      attendeeList: [],
      receiverList: [],
      loading: false
    }
  },
  mounted() {
    if(sessionStorage.getItem('msgInfo')){
      let data=JSON.parse(sessionStorage.getItem('search'))
      this.form=data||this.form
      this.getAllSelectList()
      // this.getTableList()
      this.getSelectListAll()
    }else{
      sessionStorage.removeItem('search')
      this.getAllSelectList()
      // this.getTableList()
      this.getSelectListAll()
    }
  },
  // watch: {
  //   form: {
  //     handler(v) {
  //       console.log("form", v);
  //     },
  //     immediate: true,
  //     deep: true,
  //   },
  // },
  methods: {
    getAllSelectList() {
      let param = {
        pageSize: 1000,
        pageNum: 1,
        isCurrentUser: true
      }
      getMettingType(param).then((res) => {
        this.meetingTypeList = res.data
        this.setTypeObj(res.data)
        this.getTableList()
      })
    },
    getTableList() {
      let param = {}
      let meetingTypeIdList = this.meetingTypeList?.map(item=>item.id)
      if(this.form?.meetingType?.id){
        meetingTypeIdList = [this.form.meetingType ? this.form.meetingType.id : '']
      }
      if (!this.form) {
        param = {
          meetingTypeId: '',
          meetingTypeIdList: meetingTypeIdList,
          pageNum: this.page.currPage,
          pageSize: this.page.pageSize,
          states: []
        }
      } else {
        param = {
          ...this.form,
          meetingTypeId: this.form.meetingType ? this.form.meetingType.id : '',
          meetingTypeIdList: meetingTypeIdList,
          pageNum: this.page.currPage,
          pageSize: this.page.pageSize,
          states: this.form.states ? [this.form.states] : []
        }
      }
      Reflect.deleteProperty(param, 'meetingType')
      this.query(param)
    },
    searchTableList() {
      this.page.currPage = 1
      this.getTableList()
    },
    query(e) {
      this.loading = true
      getMettingList(e)
        .then((res) => {
          this.tableListData = res.data
          this.page.total = res.total
        })
        .finally(() => (this.loading = false))
    },
    handleSearchReset() {
      this.form = {
        weekOfYears: [],
        startDate: '',
        startTime: '',
        startDateBegin: datestring(
          new Date(new Date().valueOf()) - 24 * 60 * 60 * 1000 * 7
        )
      }
      this.page.currPage = 1
      this.getTableList()
    },
    handleChangePage(e) {
      this.page.currPage = e
      let param = {
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
        ...this.form,
        meetingTypeId: this.form.meetingType ? this.form.meetingType.id : '',
        states: this.form.states ? [this.form.states] : []
      }
      this.query(param)
    },
    handleSizePage(e) {
      this.page.pageSize = e
      let param = {
        pageNum: this.page.currPage,
        pageSize: e,
        ...this.form,
        meetingTypeId: this.form.meetingType ? this.form.meetingType.id : '',
        states: this.form.states ? [this.form.states] : []
      }
      this.query(param)
    },
    setTypeObj(e) {
      let typeObj = {}
      this.meetingTypeList = e
      e.forEach((item) => {
        typeObj[item.id] = item.name
      })
      this.typeObject = typeObj
    },
    getSelectListAll() {
      const param = {
        pageNum: 1,
        pageSize: 999
      }
      getAttendee(param).then((res) => {
        this.attendeeList = res.data
      })
      getReceiver(param).then((res) => {
        this.receiverList = res.data
      })
    },
    deleteWeek() {
      this.form.weekOfYears = []
    }
  }
}
</script>
<style lang="scss" scoped></style>
