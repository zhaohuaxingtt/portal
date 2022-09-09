<template>
  <div>
    <Search
      ref="search"
      :searchList="searchList"
      :selectOptions="selectOptions"
      @sure="pageNotSendAlarmLetter"
    />
    <i-card :title="language('报警信列表', '报警信列表')">
      <template slot="header-control">
        <i-button @click="closeAlarm">{{ language('关闭', '关闭') }}</i-button>
        <buttonTableSetting @click="edittableHeader" />
      </template>
      <tableList
        ref="tableList"
        index
        :tableData="tableData"
        :tableTitle="tableTitle"
      >
        <template #alarm="scope">
          <span class="link cursor" @click="gotoAlarm(scope.row)">{{
            language('CHAKAN', '查看')
          }}</span>
        </template>
        <template #supplierName="scope">
          <span class="link cursor" @click="gotoSupplier(scope.row)">{{
            scope.row.supplierName
          }}</span>
        </template>
        <template #sourceType="scope">
          <span>{{ getSourceType(scope.row.sourceType) }}</span>
        </template>
        <template #bkaName="scope">
          <span
            class="link cursor"
            v-if="scope.row.sourceType == '1'"
            @click="gotoBKA(scope.row)"
            >{{ scope.row.bkaName }}</span
          >
          <span v-if="scope.row.sourceType == '2'">{{
            scope.row.eventType
          }}</span>
          <span v-if="scope.row.sourceType == '3'">{{
            scope.row.eventName
          }}</span>
        </template>
        <template #level="scope">
          <icon
            symbol
            v-if="scope.row.level == 1"
            name="iconbaojiapingfengenzong-jiedian-hei"
          />
          <icon
            symbol
            v-if="scope.row.level == 2"
            name="iconbaojiapingfengenzong-jiedian-hong"
          />
          <icon
            symbol
            v-if="scope.row.level == 3"
            name="iconbaojiapingfengenzong-jiedian-cheng"
          />
          <icon
            symbol
            v-if="scope.row.level == 4"
            name="iconbaojiapingfengenzong-jiedian-huang"
          />
          <span class="margin-left5">{{ getLevelLabel(scope.row.level) }}</span>
        </template>
        <template #status="scope">
          <span>{{ getStatus(scope.row.status) }}</span>
        </template>
        <template #sort="scope">
          <icon
            symbol
            @click="topType(scope.row.alarmLetterTaskId, 0)"
            v-if="scope.row.top"
            name="iconliebiaoyizhiding"
          />
          <icon
            symbol
            @click="topType(scope.row.alarmLetterTaskId, 1)"
            v-else
            name="iconliebiaoweizhiding"
          />
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
// import buttonTableSetting from '@/components/buttonTableSetting'
import { tableSortMixins } from 'rise/web/components/iTableSort/tableSortMixins'
import tableList from 'rise/web/components/iTableSort'
import Search from '../components/search'
import {
  toBeSentTableTitle as tableTitle,
  levelList,
  sourceTypeList,
  statusList,
  reasonList,
  toBeSearchList as searchList,
  eventList
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
    Search
    // buttonTableSetting
  },
  mixins: [pageMixins, tableSortMixins],
  data() {
    return {
      typeShow: false,
      tableData: [
        {
          alarm: '123',
          supplierName: '供应商1',
          sourceType: '1',
          level: '1',
          sentDate: '123',
          bkaName: 'test',
          status: '1',
          closeDate: 'test',
          dept: 'test',
          linie: 'test',
          top: true,
          out: 5
        },
        {
          alarm: '123',
          sourceType: '2',
          level: '2',
          sentDate: '123',
          bkaName: 'test',
          status: '2',
          closeDate: 'test',
          dept: 'test',
          linie: 'test',
          eventType: 'TEST/突发事件',
          meetName: 'BKM会议',
          top: true,
          top: false
        },
        {
          alarm: '123',
          sourceType: '3',
          level: '3',
          sentDate: '123',
          bkaName: 'test',
          status: '2',
          closeDate: 'test',
          dept: 'test',
          linie: 'test',
          eventName: '自己输入名称',
          top: false,
          closeLink: true
        },
        {
          alarm: '123',
          sourceType: '2',
          level: '4',
          sentDate: '123',
          bkaName: 'test',
          status: '2',
          closeDate: 'test',
          dept: 'test',
          linie: 'test',
          top: false,
          closeLink: true
        }
      ],
      tableTitle,
      searchList,
      selectOptions: {
        levelList,
        sourceTypeList,
        statusList,
        reasonList,
        eventList
      },
      multipleSelection: []
    }
  },
  created() {
    this.getDept()
    this.pageNotSendAlarmLetter()
  },
  methods: {
    closeAlarm() {
      if (this.multipleSelection.length > 0) {
        this.typeShow = true
      }
      return iMessage.warn('请选择数据')
    },
    close() {
      this.typeShow = false
    },
    getLevelLabel(level) {
      return levelList.find((item) => item.value == level)?.label
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
        currPage: this.page.currPage
      }
      pageNotSendAlarmLetter(params).then((res) => {
        if (res?.code == '200') {
          this.tableData = res.data.records
          this.page.total = res.data.total
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
              value: item.deptId,
              label: item.commodity
            }
          })
          this.$set(this.selectOptions, 'deptList', deptList)
        }
      })
    },
    // 获取对应状态
    getStatus(value) {
      return statusList.find((item) => item.value == value).label
    },
    // 获取对应关闭原因
    getSourceType(value) {
      return sourceTypeList.find((item) => item.value == value).label
    },

    // 供应商跳转BKA
    gotoSupplier(row) {
      return iMessage.warn('暂无URL,跳转BKA详情')
    },
    // 跳转BKA详情
    gotoBKA(row) {
      let url =
        process.env.VUE_APP_HOST + '/bkm/login.do' + '?userno=' + getToken()
      window.open(url)
      return
      return this.item.url
      return (
        this.item.menuList &&
        this.item.menuList.length &&
        this.item.menuList[0].url
      )
      return iMessage.warn('暂无URL,跳转BKA详情')
      window.open(`/portal/#/bka/template/detail/${row.id}`)
    },
    // 跳转报警信详情
    gotoAlarm(row) {
      // return iMessage.warn('暂无URL,跳转报警信详情')
      this.$router.push({
        path: '/alarmLetter',
        query: {
          row: row
        }
      })
    },
    // 数据置顶
    topType(alarmLetterTaskId, setType) {
      //0 取消置顶， 1 置顶
      setAlarmLetterOrder({
        alarmLetterTaskId,
        setType
      }).then((res) => {
        console.log(res)
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