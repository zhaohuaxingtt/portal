<template>
  <div>
    <Search
      ref="search"
      :searchList="searchList"
      :selectOptions="selectOptions"
      @sure="searchData"
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
        @handleSelectionChange="handleSelectionChange"
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
        <template #source="scope">
          <span>{{ getSourceType(scope.row.source) }}</span>
        </template>
        <template #bkaName="scope">
          <span
            class="link cursor"
            v-if="scope.row.source == 'CAPACITY_RED_LIGHT'"
            @click="gotoBKA(scope.row)"
            >{{ scope.row.warningLetterTitle }}</span
          >
          <span v-else>{{ scope.row.warningLetterTitle }}</span>
        </template>
        <template #shortageLevel="scope">
          <icon
            symbol
            v-if="scope.row.shortageLevel == 'low'"
            name="iconbaojiapingfengenzong-jiedian-hei"
          />
          <icon
            symbol
            v-if="scope.row.shortageLevel == 'middle'"
            name="iconbaojiapingfengenzong-jiedian-hong"
          />
          <icon
            symbol
            v-if="scope.row.shortageLevel == 'middleHigh'"
            name="iconbaojiapingfengenzong-jiedian-cheng"
          />
          <icon
            symbol
            v-if="scope.row.shortageLevel == 'high'"
            name="iconbaojiapingfengenzong-jiedian-huang"
          />
          <span class="margin-left5">{{
            getLevelLabel(scope.row.shortageLevel)
          }}</span>
        </template>
        <template #status="scope">
          <span>{{ getStatus(scope.row.status) }}</span>
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
        @size-change="handleSizeChange($event, getWarningLetterInfoPage)"
        @current-change="handleCurrentChange($event, getWarningLetterInfoPage)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
      <i-dialog
        :title="language('TISHI', '提示')"
        style="margin-top: 10vh"
        :visible.sync="typeShow"
        v-if="typeShow"
        width="400px"
        @close="close"
      >
        <span>是否确认关闭所选报警信</span>
        <template slot="footer">
          <div>
            <i-button @click="close">取消</i-button>
            <i-button @click="closeAlarmLetter">确认</i-button>
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
  toBeSentTableTitle as tableTitle,
  levelList,
  sourceTypeList,
  toBeStatusList as statusList,
  reasonList,
  toBeSearchList as searchList,
  eventList
} from '../data'
import { pageMixins } from '@/utils/pageMixins'
import {
  getWarningLetterInfoPage,
  closeAlarmLetter,
  setWarningLetterInfoAlarmLetterOrder
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
        levelList,
        sourceTypeList,
        statusList,
        reasonList,
        eventList
      },
      multipleSelection: []
    }
  },
  mounted() {
    this.getDept()
    this.searchData()
  },
  methods: {
    closeAlarm() {
      if (this.multipleSelection.length == 0) {
        return iMessage.warn('请至少选择一条记录')
      }
      if (this.multipleSelection.find((item) => item.status != 'SENT')) {
        return iMessage.warn('仅可关闭已发送状态的报警信，请检查所选记录状态')
      }
      this.typeShow = true
    },
    closeAlarmLetter() {
      closeAlarmLetter(this.multipleSelection.map((item) => item.id)).then(
        (res) => {
          console.log(res)
          if (res?.code == '200') {
            this.typeShow = false
            this.getWarningLetterInfoPage()
          }
        }
      )
    },
    close() {
      this.typeShow = false
    },
    getLevelLabel(level) {
      return levelList.find((item) => item.value == level)?.label
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    searchData() {
      this.page.currPage = 1
      this.getWarningLetterInfoPage()
    },
    // 获取报警信列表
    getWarningLetterInfoPage() {
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
      getWarningLetterInfoPage(params).then((res) => {
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
      return statusList.find((item) => item.value == value)?.label || value
    },
    // 获取对应来源
    getSourceType(value) {
      return sourceTypeList.find((item) => item.value == value)?.label || value
    },

    // 供应商跳转BKA
    gotoSupplier(row) {
      let url = process.env.VUE_APP_HOST + '/bkm/sso.do'
      window.open(url)
      return
      // return iMessage.warn('暂无URL,跳转BKA详情')
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
      let router = this.$router.resolve({
        path: '/capacityManagement/alarmLetter',
        query: {
          id: row.id
        }
      })
      window.open(router.href, '_blank')
    },
    // 数据置顶
    topType(alarmLetterId, setType) {
      //0 取消置顶， 1 置顶
      setWarningLetterInfoAlarmLetterOrder({
        alarmLetterId,
        setType
      }).then((res) => {
        console.log(res)
        if (res?.code == '200') {
          this.getWarningLetterInfoPage()
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