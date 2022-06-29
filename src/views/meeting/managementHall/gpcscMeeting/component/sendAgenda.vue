<!--
 * @Author: yuszhou
 * @Date: 2021-02-19 15:12:20
 * @LastEditTime: 2022-06-29 10:22:36
 * @LastEditors: Please set LastEditors
 * @Description: 首页
 * @FilePath: \front-portal-gpd:\新建文件夹\front-portal\src\views\meeting\managementHall\gpcscMeeting\component\sendAgenda.vue
-->
<template>
  <div class="meeting-home">
    <!-- <theSearch
      @searchTableList="searchTableList"
      @handleSearchReset="handleSearchReset"
      @setTypeObj="setTypeObj"
      @deleteWeek="deleteWeek"
      :form="form"
    /> -->
    <theTable
      v-loading="loading"
      ref="theTable"
      :rowId="rowId"
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
      @handleCloseSaveOk='handleCloseSaveOk'
    />
  </div>
</template>

<script>
// import theSearch from './components/theSearch.vue'
// import theTable from './components/theTable.vue'
import theSearch from '@/views/meeting/managementHall/gpcscMeeting/common/theSearch.vue'
import theTable from '@/views/meeting/managementHall/gpcscMeeting/common/theTable.vue'
import { getMettingList } from '@/api/meeting/home'
import { findByRelationMeeting } from '@/api/meeting/gpMeeting'
import { getAttendee, getReceiver } from '@/api/meeting/type'
import { pageMixins } from '@/utils/pageMixins'
import resultMessageMixin from '@/mixins/resultMessageMixin'
import { tableListColumns } from '@/views/meeting/managementHall/gpcscMeeting/common/data.js'
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
    },
    rowId:{
      type: Array,
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
    this.rowId=this.rowId
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
    //关闭弹窗
    handleCloseSaveOk(){
      this.$emit('close')
    },
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
    // 数据列表请求
    query(e) {
      //  states 03  02  04
      console.log(this.form);
      console.log(this.rowId);
      console.log(this.$route.query.id);
      this.loading = true
      console.log(e)
      //getMettingList 这里替换为  预备会关联会议分页列表接口 findByRelationMeeting
      const query={
        meetingId:this.$route.query.id,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
        //这个查询是根据meetingid去查的  可以不传
        // relationMeetingId:this.rowId,
      } 
      findByRelationMeeting(query).then((res) => {
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
// .meeting-home {
//   width: 1740px;
// }
</style>

