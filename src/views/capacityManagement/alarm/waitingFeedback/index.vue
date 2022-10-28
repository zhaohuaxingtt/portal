<template>
  <div>
    <Search
      ref="search"
      :searchList="searchList"
      :selectOptions="selectOptions"
      @sure="searchData"
    />
    <i-card :title="language('待反馈报警信', '待反馈报警信')">
      <template slot="header-control">
        <buttonTableSetting @click="edittableHeader" />
      </template>
      <iTableCustom
        permissionKey="waitingFeedback"
        ref="tableList"
        class="table"
        :data="tableData"
        @gotoBKA="gotoBKA"
        @gotoSupplier="gotoSupplier"
        @gotoAlarm="gotoAlarm"
        @topType="topType"
        :columns="tableTitle"
      >
      </iTableCustom>
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
import {
  iCard,
  iButton,
  icon,
  iPagination,
  iDialog,
  iMessage,
  iTableCustom
} from 'rise'
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
import {
  pageNotSendAlarmLetter,
  setAlarmLetterOrder
} from '@/api/capacityManagement/index.js'
import { getDepartmentPullDown } from '@/api/partLifeCycle/partLifeCycleStar.js'
import { getToken } from '@/utils'

export default {
  components: {
    iCard,
    iButton,
    icon,
    iPagination,
    iDialog,
    tableList,
    Search,
    iTableCustom,
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
  mounted() {
    this.getDept()
    this.searchData()
  },
  methods: {
    searchData() {
      this.page.currPage = 1
      this.pageNotSendAlarmLetter()
    },
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
      let url =
        process.env.VUE_APP_HOST +
        `/bkm/sso.do?supplierId=${row.supplierId}&sapCode=${
          row.sapCode
        }&supplierName=${row.supplierName}&token=${getToken()}`
      window.open(url)
    },
    // 跳转BKA详情
    gotoBKA(row) {
      let url =
        process.env.VUE_APP_HOST +
        `/bkm/bkaView/bkaView.do?bkaNo=${
          row.encryptionBkaId
        }&token=${getToken()}`
      window.open(url)
    },
    // 跳转报警信详情
    gotoAlarm(row) {
      if (row.closeReason != 'SEND_ALARM_LETTER') return
      row.source = 'CAPACITY_RED_LIGHT'
      let router = this.$router.resolve({
        path: '/capacityManagement/alarmLetter',
        query: {
          id: row.alarmLetterId,
          row: JSON.stringify(row)
        }
      })
      window.open(router.href, '_blank')
    },
    // 数据置顶
    topType(row) {
      const alarmLetterTaskId = row.id
      const setType = row.sort ? 0 : 1
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
.table {
  ::v-deep th > .cell {
    .slotHeader {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-flex;
    }
    .label-require {
      color: #f56c6c;
      font-style: normal;
    }
  }
}
</style>