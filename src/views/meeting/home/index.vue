<!--
 * @Author: yuszhou
 * @Date: 2021-02-19 15:12:20
 * @LastEditTime: 2021-02-19 18:01:14
 * @LastEditors: Please set LastEditors
 * @Description: 首页
 * @FilePath: \rise\src\views\home\index.vue
-->
<template>
  <div class="meeting-home">
    <theSearch
      @searchTableList="searchTableList"
      @handleSearchReset="handleSearchReset"
      @setTypeObj="setTypeObj"
      @deleteWeek="deleteWeek"
      :form="form"
    />
    <theTable
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
import { getAttendee, getReceiver } from '@/api/meeting/type'
import { pageMixins } from '@/utils/pageMixins'
import resultMessageMixin from '@/mixins/resultMessageMixin'
import { tableListColumns } from './components/data'
// import {deleteString} from '@/utils/utils.js';

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
        meetingType: {},
        startDate: '',
        startTime: '',
        meetingPlace: '',
        receiverId: '',
        attendeeId: '',
        attendee: '',
        weekOfYears: []
      },
      meetingTypeList: [],
      attendeeList: [],
      receiverList: [],
      loading: false
    }
  },
  mounted() {
    this.getTableList()
    this.getSelectListAll()
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
    getTableList() {
      let param = {
        ...this.form,
        meetingTypeId: this.form.meetingType ? this.form.meetingType.id : '',
        pageNum: this.page.currPage,
        pageSize: 10,
        states: this.form.states ? [this.form.states] : []
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
        startTime: ''
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
<style lang="scss" scoped>
.meeting-home {
  width: 1740px;
}
</style>
