<template>
  <div>
    <Search
      ref="search"
      :searchList="searchList"
      :selectOptions="selectOptions"
      @sure="pageNotSendAlarmLetter"
    />
    <i-card :title="language('待发送报警信列表', '待发送报警信列表')">
      <template slot="header-control">
        <i-button @click="sent">{{
          language('发送报警信', '发送报警信')
        }}</i-button>
        <buttonTableSetting @click="edittableHeader" />
      </template>
      <tableList
        ref="tableList"
        index
        :tableData="tableData"
        :tableTitle="tableTitle"
        @handleSelectionChange="handleSelectionChange"
      >
        <template #bkaName="scope">
          <span class="link cursor" @click="gotoBKA(scope.row)">{{
            scope.row.bkaName
          }}</span>
        </template>
        <template #date="scope">
          <template v-if="scope.row.out">
            <span style="color: red"
              >{{ scope.row.date }}{{ ` 已超期${scope.row.out}天` }}</span
            >
          </template>
          <span v-else>{{ scope.row.date }}</span>
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
          <icon
            symbol
            @click="topType(scope.row)"
            v-if="scope.row.top"
            name="iconliebiaoyizhiding"
          />
          <icon
            symbol
            @click="topType(scope.row)"
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
import buttonTableSetting from '@/components/buttonTableSetting'
import { tableSortMixins } from 'rise/web/components/iTableSort/tableSortMixins'
import tableList from 'rise/web/components/iTableSort'
import Search from '../components/search'
import { sentTableTitle as tableTitle, statusList, reasonList, searchList } from '../data'
import { pageMixins } from '@/utils/pageMixins'
import { getToken } from '@/utils'
import { pageNotSendAlarmLetter } from '@/api/capacityManagement/index.js'
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
      tableData: [
        {
          bkaName: 'test',
          date: '2022-12-12',
          status: '2',
          closeReason: '3',
          closeDate: 'test',
          dept: 'test',
          linie: 'test',
          top: true,
          out: 5
        },
        {
          bkaName: 'test',
          date: '2023-12-12',
          status: '1',
          closeReason: '2',
          closeDate: 'test',
          dept: 'test',
          linie: 'test',
          top: false
        },
        {
          bkaName: 'test',
          date: '2023-12-12',
          status: '1',
          closeReason: '1',
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
        statusList,
        reasonList
      },
      multipleSelection: []
    }
  },
  created() {
    this.getDept()
    // this.pageNotSendAlarmLetter()
  },
  methods: {
    sent() {
      if (this.multipleSelection.length > 0) {
        this.typeShow = true
      }
      return iMessage.warn('请选择数据')
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
      return this.selectOptions.statusList.find((item) => item.value == value)
        .label
    },
    // 获取对应关闭原因
    getCloseReason(value) {
      return this.selectOptions.reasonList.find((item) => item.value == value)
        .label
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
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
      return iMessage.warn('暂无URL,跳转报警信详情')
      this.$router.push({
        path: '/bka',
        query: {
          row: row
        }
      })
    },
    // 数据置顶
    topType(row) {
      return iMessage.warn('暂无置顶,跳转报警信详情')
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