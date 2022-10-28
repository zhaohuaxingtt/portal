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
        <i-button @click="closeAlarm">{{ language('处理', '处理') }}</i-button>
        <buttonTableSetting @click="edittableHeader" />
      </template>
      <iTableCustom
        ref="tableList"
        class="table"
        permissionKey="alarmList"
        :data="tableData"
        :columns="tableTitle"
        @gotoAlarm="gotoAlarm"
        @gotoSupplier="gotoSupplier"
        @gotoBKA="gotoBKA"
        @topType="topType"
        @handle-selection-change="handleSelectionChange"
      >
      </iTableCustom>
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
        <span>是否确认已处理完毕所选报警信</span>
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
    buttonTableSetting,
    iTableCustom
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
        return iMessage.warn('仅可处理已发送状态的报警信，请检查所选记录状态')
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
      console.log(val)
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
      let url =
        process.env.VUE_APP_HOST +
        `/bkm/sso.do?supplierId=${row.supplierId}&sapCode=${
          row.sapCode
        }&supplierName=${row.supplierName}&token=${getToken()}`
      window.open(url)
    },
    // 跳转BKA详情
    gotoBKA(row) {
      if (row.source != 'CAPACITY_RED_LIGHT') return
      let url =
        process.env.VUE_APP_HOST +
        `/bkm/bkaView/bkaView.do?bkaNo=${
          row.encryptionBkaId
        }&token=${getToken()}`
      window.open(url)
    },
    // 跳转报警信详情
    gotoAlarm(row) {
      let router = this.$router.resolve({
        path: '/capacityManagement/alarmLetter',
        query: {
          id: row.id,
          row: JSON.stringify(row)
        }
      })
      window.open(router.href, '_blank')
    },
    // 数据置顶
    topType(row) {
      const alarmLetterId = row.id
      const setType = row.sort ? 0 : 1
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