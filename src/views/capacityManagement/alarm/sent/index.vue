<template>
  <div>
    <Search
      ref="search"
      :searchList="searchList"
      :selectOptions="selectOptions"
      @sure="pageNotSendAlarmLetter"
    />
    <i-card :title="language('待反馈报警信', '待反馈报警信')">
      <template slot="header-control">
        <buttonTableSetting @click="edittableHeader" />
      </template>
      <tableList
        ref="tableList"
        index
        :selection="false"
        :tableData="tableData"
        :tableTitle="tableTitle"
      >
        <template #supplierName="scope">
          <span class="link cursor" @click="gotoSupplier(scope.row)">{{
            scope.row.supplierName
          }}</span>
        </template>
        <template #bkaName="scope">
          <span class="link cursor" @click="gotoBKA(scope.row)">{{
            scope.row.bkaName
          }}</span>
        </template>
        <template #taskEndDateStr="scope">
          <template v-if="scope.row.hasOverdue">
            <span style="color: red">{{ scope.row.taskEndDateStr }}</span>
          </template>
          <span v-else>{{ scope.row.taskEndDateStr }}</span>
        </template>
        <template #status="scope">
          <span>{{ getStatus(scope.row.status) }}</span>
        </template>
        <template #closeReason="scope">
          <span
            v-if="scope.row.closeReason == '1'"
            class="link cursor"
            @click="gotoAlarm(scope.row)"
            >{{ getCloseReason(scope.row.closeReason) }}</span
          >
          <span v-else>{{ getCloseReason(scope.row.closeReason) }}</span>
        </template>
        <template #sort="scope">
          <span v-if="scope.row.sort" @click="topType(scope.row.id, '0')">
            <icon symbol class="cursor" name="iconliebiaoyizhiding" />
          </span>
          <span @click="topType(scope.row.id, '1')" v-else>
            <icon symbol class="cursor" name="iconliebiaoweizhiding" />
          </span>
        </template>
      </tableList>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, pageNotSendAlarmLetter)"
        @current-change="handleCurrentChange($event, pageNotSendAlarmLetter)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
      <i-dialog
        :title="language('dialogTitle', 'dialogTitle')"
        style="margin-top: 10vh"
        :visible.sync="typeShow"
        v-if="typeShow"
        width="400px"
        @close="close"
      >
        <span>是否确认对以下所选BKA发送报警信</span>
        <div class="bka-list margin-top20">
          <p v-for="(item, index) in multipleSelection" :key="index">
            {{ Number(index) + 1 + '.' + item.bkaName }}
          </p>
        </div>
        <template slot="footer">
          <div>
            <i-button>取消</i-button>
            <i-button>确认</i-button>
          </div>
        </template>
      </i-dialog>
    </i-card>
  </div>
</template>

<script>
import { iCard, iButton, icon, iPagination, iDialog, iMessage } from 'rise'
import buttonTableSetting from '@/components/buttonTableSetting'
import { tableSortMixins } from 'rise/web/components/iTableSort/tableSortMixins'
import tableList from 'rise/web/components/iTableSort'
import Search from '../components/search'
import {
  sentTableTitle as tableTitle,
  statusList,
  reasonList,
  searchList
} from '../data'
import { pageMixins } from '@/utils/pageMixins'
import { getToken } from '@/utils'
import {
  pageNotSendAlarmLetter,
  setAlarmLetterOrder
} from '@/api/capacityManagement/index.js'
import { getDepartmentPullDown } from '@/api/partLifeCycle/partLifeCycleStar.js'

export default {
  components: {
    iCard,
    iButton,
    icon,
    iPagination,
    iDialog,
    tableList,
    Search,
    buttonTableSetting
  },
  mixins: [pageMixins, tableSortMixins],
  data() {
    return {
      typeShow: false,
      tableData: [],
      tableTitle,
      searchList,
      selectOptions: {
        statusList,
        reasonList
      },
      multipleSelection: []
    }
  },
  created() {
    this.getDept()
    this.pageNotSendAlarmLetter()
  },
  methods: {
    // 获取报警信列表
    pageNotSendAlarmLetter() {
      let params = this.$refs.search?.searchParams || {}
      params.taskEndDate = ''
      params.taskStartDate = ''
      if (params?.date?.length == 2) {
        params.taskEndDate = params.date[1]
        params.taskStartDate = params.date[0]
      }
      delete params.date
      params = {
        ...params,
        size: this.page.pageSize,
        current: this.page.currPage
      }
      pageNotSendAlarmLetter(params).then((res) => {
        if (res?.code == '200') {
          this.tableData = res.data.records
          this.page.totalCount = res.data.total
        }
      })
    },
    // 获取科室下拉数据
    getDept() {
      getDepartmentPullDown().then((res) => {
        if (res?.code == '200') {
          this.selectOptions
          let deptList = res.data.map((item) => {
            return {
              value: item.commodity,
              label: item.commodity
            }
          })
          this.$set(this.selectOptions, 'deptList', deptList)
        }
      })
    },
    // 获取对应状态
    getStatus(value) {
      return (
        this.selectOptions.statusList.find((item) => item.value == value)
          ?.label || value
      )
    },
    // 获取对应关闭原因
    getCloseReason(value) {
      return (
        this.selectOptions.reasonList.find((item) => item.value == value)
          ?.label || value
      )
    },
    // 供应商跳转BKA
    gotoSupplier(row) {
      let url = process.env.VUE_APP_HOST + '/bkm/sso.do'
      window.open(url)
      return
    },
    // 跳转BKA详情
    gotoBKA(row) {
      let url =
        process.env.VUE_APP_HOST +
        `/bkm/bkaView/bkaView.do?bkaNo=${row.encryptionBkaId}`
      window.open(url)
    },
    // 跳转报警信详情
    gotoAlarm(row) {
      // return iMessage.warn('暂无URL,跳转报警信详情')
      let router = this.$router.resolve({
        path: '/capacityManagement/alarmLetter',
        query: {
          id: row.id
        }
      })
      window.open(router.href, '_blank')
    },
    // 数据置顶
    topType(alarmLetterTaskId, setType) {
      console.log(alarmLetterTaskId, setType)
      //0 取消置顶， 1 置顶
      setAlarmLetterOrder({
        alarmLetterTaskId,
        setType
      }).then((res) => {
        console.log(res)
        if (res?.code == '200') {
          this.pageNotSendAlarmLetter()
        }
      })
      // return iMessage.warn('暂无置顶,跳转报警信详情')
    }
  }
}
</script>

<style lang="scss" scoped>
.bka-list {
  background: rgb(250, 250, 250);
  height: 150px;
  overflow: auto;
}
</style>