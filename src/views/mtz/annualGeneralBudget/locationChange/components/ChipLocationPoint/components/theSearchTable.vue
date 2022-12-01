<!-- mtz定点 -->
<template>
  <div>
    <search
      @sure="sure"
      @reset="reset"
      :searchFormData="searchFormData"
      :searchForm="searchForm"
      :options="options"
    />

    <iCard class="margin-top20">
      <template v-slot:header>
        <span class="headTitle">{{ $t('XIANGQINGLIEBIAO') }}</span>
        <div class="opration">
          <iButton
            @click="handleClickFreeze"
            v-permission="PORTAL_CHIP_POINT_DONGJIE"
            >{{ language('DONGJIE', '冻结') }}</iButton
          >
          <iButton
            @click="handleClickUnfreeze"
            v-permission="PORTAL_CHIP_POINT_JIEDONG"
            >{{ language('JIEDONG', '解冻') }}</iButton
          >
          <iButton
            @click="handleClickNomi"
            v-permission="PORTAL_CHIP_POINT_DINGDIAN"
            >{{ language('DINGDIAN', '定点') }}</iButton
          >
          <iButton
            @click="unNominate"
            v-permission="PORTAL_CHIP_POINT_QUXIAODINGDIAN"
            >{{ language('QUXIAODINGDIAN', '取消定点') }}</iButton
          >
          <iButton
            @click="handleClickOutFlow"
            v-permission="PORTAL_CHIP_POINT_HUIWAILIUZHUAN"
            >{{ language('HUIWAILIUZHUAN', '会外流转') }}</iButton
          >
          <iButton
            @click="addChip"
            v-permission="PORTAL_CHIP_POINT_XINJIANCHIPDINGDIANSHENQING"
            >{{
              language('XINJIANCHIPDINGDIANSHENQING', '新建定点申请')
            }}</iButton
          >
          <iButton
            @click="handleClickRecall"
            v-permission="PORTAL_CHIP_POINT_CHEHUI"
            >{{ language('CHEHUI', '撤回') }}</iButton
          >
          <iButton
            @click="handleClickRecallPointAdmin"
            v-permission="PORTAL_CHIP_POINT_CHEHUIPOINTADMIN"
            >{{ $t('LK_TUIHUI') }}</iButton
          >
          <iButton
            @click="deleteData"
            v-permission="PORTAL_CHIP_POINT_SHANCHU"
            >{{ language('SHANCHU', '删除') }}</iButton
          >
        </div>
      </template>
      <tableList
        class="margin-top20"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :index="true"
        border
        @handleSelectionChange="handleSelectionChange"
      >
        <template slot="status" slot-scope="scope">
          <span>
            {{ getStatus(scope.row.status) }}
          </span>
        </template>
        <template slot="appNo" slot-scope="scope">
          <p class="openPage" @click="handleClickFsupplierName(scope.row)">
            {{ scope.row.appNo }}
          </p>
        </template>
        <template slot="type" slot-scope="scope">
          <span>
            {{ getType(scope.row.workflowType) }}
          </span>
        </template>
        <template slot="freezeDate" slot-scope="scope">
          <p class="date-time-cell">
            {{ scope.row.freezeDate ? scope.row.freezeDate.split(' ')[0] : '' }}
          </p>
          <p class="date-time-cell">
            {{ scope.row.freezeDate ? scope.row.freezeDate.split(' ')[1] : '' }}
          </p>
        </template>
        <template slot="nominateDate" slot-scope="scope">
          <p class="date-time-cell">
            {{
              scope.row.nominateDate ? scope.row.nominateDate.split(' ')[0] : ''
            }}
          </p>
          <p class="date-time-cell">
            {{
              scope.row.nominateDate ? scope.row.nominateDate.split(' ')[1] : ''
            }}
          </p>
        </template>
      </tableList>
      <iPagination
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :current-page="page.currPage"
        :total="page.totalCount"
        :layout="page.layout"
      >
      </iPagination>
    </iCard>
    <iDialog
      :title="language('CHEHUIYUANYIN', '撤回原因')"
      :visible.sync="mtzReasonShow"
      v-if="mtzReasonShow"
      width="40%"
      @close="reasonClose"
    >
      <MtzClose
        @close="reasonClose"
        @handleSubmitRecall="handleSubmitRecall"
      ></MtzClose>
    </iDialog>
  </div>
</template>

<script>
import {
  iMessage,
  iMessageBox,
  iCard,
  iButton,
  iPagination,
  iDialog
} from 'rise'
import tableList from '@/components/commonTable/index.vue'
import search from '../../components/search.vue'
import { tableTitle, searchFormData } from './data'
import MtzClose from './MtzClose'
import { pageMixins } from '@/utils/pageMixins'
import {
  getAppList,
  freezeData,
  unFreeze,
  nominateData,
  unNominate,
  recallData,
  sendBack,
  deleteData,
  meetingOutFlow,
  getFlowTypeList,
  getLocationApplyStatus,
  getDeptAndBuyerByChipNom
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
export default {
  name: 'theSearchTable',
  components: {
    search,
    iCard,
    iButton,
    iPagination,
    tableList,
    iDialog,
    MtzClose
  },
  mixins: [pageMixins],
  data() {
    return {
      searchFormData,
      mtzReasonShow: false,
      searchForm: {
        appNo: [],
        deptName: [],
        linieName: [],
        nominateDate: [],
        partNum: [],
        status: [],
        workflowType: [],
        appType: '1' // 1:定点，2变更
      },
      options: {
        flowTypeList: [], // 流程状态
        locationApplyStatus: [], // 申请单状态
        deptList: [] //科室
      },
      tableTitle, // 表头
      tableListData: [], // 表格数据
      tableLoading: false,
      selection: [],
      linieList: [], //采购员
      depBuyerAll: []
    }
  },

  created() {
    this.init()
  },
  methods: {
    getStatus(status) {
      return this.options.locationApplyStatus.find(
        (item) => item.value == status
      )?.label
    },
    getType(workflowType) {
      return this.options.flowTypeList.find(
        (item) => item.value == workflowType
      )?.label
    },
    init() {
      // 获取流程下拉
      getFlowTypeList({}).then((res) => {
        this.options.flowTypeList = res.data.map((item) => ({
          value: item.code,
          label: item.message
        }))
      })
      // 获取申请单状态下拉
      getLocationApplyStatus({}).then((res) => {
        this.options.locationApplyStatus = res.data.map((item) => ({
          value: item.code,
          label: item.message
        }))
      })
      // 获取科室、采购员下拉 appType: 1: 定点，2：变更
      getDeptAndBuyerByChipNom({ appType: '1' }).then((res) => {
        this.depBuyerAll = res.data
        let deptObj = {}
        let linieObj = {}
        res.data.forEach((e) => {
          if (e.deptCode) {
            deptObj[e.deptCode] = { value: e.deptCode, label: e.deptCode }
          }
          if (e.buyerId) {
            linieObj[e.buyerId] = { value: e.buyerId, label: e.buyerName }
          }
        })
        this.options.deptList = Object.values(deptObj)
        this.options.linieList = Object.values(linieObj)
      })

      this.getTableList()
    },
    getTableList() {
      this.tableLoading = true
      let nominateDateStart =
        this.searchForm.nominateDate[0] &&
        window
          .moment(this.searchForm.nominateDate[0])
          .format('YYYY-MM-DD 00:00:00')
      let nominateDateEnd =
        this.searchForm.nominateDate[1] &&
        window
          .moment(this.searchForm.nominateDate[1])
          .format('YYYY-MM-DD 23:59:59')
      let searchForm = {}
      // 所有list都改为逗号分隔的字符串
      Object.keys(this.searchForm).forEach((key) => {
        if (Array.isArray(this.searchForm[key])) {
          searchForm[key] = this.searchForm[key].join(',')
        } else {
          searchForm[key] = this.searchForm[key]
        }
      })
      delete searchForm.nominateDate
      getAppList({
        currentPage: this.page.currPage,
        pageSize: this.page.pageSize,
        nominateDateStart,
        nominateDateEnd,
        ...searchForm
      })
        .then((res) => {
          if (res.code == 200 && res.data) {
            this.tableListData = res.data?.records
            this.page.totalCount = res.data.total
          } else {
            iMessage.error(res.desZh)
          }
        })
        .finally(() => {
          this.tableLoading = false
        })
    },
    sure() {
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableList()
    },
    reset() {
      this.searchForm = {
        appNo: [],
        status: [],
        workflowType: [],
        deptName: [],
        linieName: [],
        partNum: [],
        nominateDate: [],
        appType: '1' // 1:定点，2变更
      }
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableList()
    },
    // 跳转详情
    handleClickFsupplierName(val) {
      let routeData = this.$router.resolve({
        path: `/mtz/annualGeneralBudget/locationChange/ChipLocationPoint/overflow`,
        query: {
          currentStep: 1,
          appId: val.id
        }
      })
      window.open(routeData.href)
    },
    // 新建Chip定点申请
    addChip() {
      let routeData = this.$router.resolve({
        path: `/mtz/annualGeneralBudget/locationChange/ChipLocationPoint/overflow`
      })
      window.open(routeData.href, '_blank')
    },
    // 选中table数据
    handleSelectionChange(val) {
      this.selection = val
    },
    // 冻结
    handleClickFreeze() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      var num = 0
      this.selection.forEach((e) => {
        if (e.workflowType == 'MEETING') {
          if (e.status !== 'CHECK_PASS') {
            num++
            iMessage.warn(
              this.language(
                'SHLXZYHHTGZTCKYDJ',
                '上会类型只有复核通过状态才可以冻结'
              )
            )
          }
        } else {
          if (e.status !== 'SUBMIT') {
            num++
            iMessage.warn(
              this.language(
                'LZBALXZYTJZTCKYDJ',
                '流转/备案类型只有提交状态才可以冻结'
              )
            )
          }
        }
      })
      if (num == 0) {
        this.freezeData()
      }
    },
    // 冻结
    freezeData() {
      if (this.tableLoading) return // 避免重复触发
      this.tableLoading = true
      freezeData(this.selection.map((item) => item.id))
        .then((res) => {
          if (res && res.code == 200) {
            iMessage.success(res.desZh)
            this.getTableList()
          } else {
            iMessage.error(res.desZh)
          }
        })
        .finally(() => {
          this.tableLoading = false
        })
    },

    // 解冻
    handleClickUnfreeze() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      var num = 0
      this.selection.forEach((e) => {
        if (e.status !== 'FREERE') {
          num++
          iMessage.warn(
            this.language('ZYZTWDJDCKYJD', '只有状态为冻结的才可以解冻')
          )
        }
      })
      if (num == 0) {
        if (this.tableLoading) return // 避免重复触发
        this.tableLoading = true
        unFreeze(this.selection.map((item) => item.id))
          .then((res) => {
            if (res && res.code == 200) {
              iMessage.success(res.desZh)
              this.getTableList()
            } else {
              iMessage.error(res.desZh)
            }
          })
          .finally(() => {
            this.tableLoading = false
          })
      }
    },

    // 定点
    handleClickNomi() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      if (this.tableLoading) return // 避免重复触发
      this.tableLoading = true
      nominateData(this.selection.map((item) => item.id))
        .then((res) => {
          if (res && res.code == 200) {
            iMessage.success(res.desZh)
            this.getTableList()
          } else {
            iMessage.error(res.desZh)
          }
        })
        .finally(() => {
          this.tableLoading = false
        })
    },

    // 取消定点
    unNominate() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      var num = 0
      this.selection.forEach((e) => {
        if (e.status !== 'NOMINATE') {
          num++
          iMessage.warn(
            this.language('ZYDDZTCKYQXDD', '只有定点状态才可以取消定点')
          )
        }
      })
      if (num == 0) {
        iMessageBox(
          this.language('SHIFOUQUERENQUXIAODINGDIAN', '是否确认取消定点？'),
          this.language('LK_WENXINTISHI', '温馨提示'),
          {
            confirmButtonText: this.language('QUEREN', '确认'),
            cancelButtonText: this.language('QUXIAO', '取消')
          }
        ).then((res) => {
          unNominate(this.selection.map((item) => item.id)).then((res) => {
            if (res && res.code == 200) {
              iMessage.success(res.desZh)
              this.getTableList()
            } else {
              iMessage.error(res.desZh)
            }
          })
        })
      }
    },
    // 会外流转
    handleClickOutFlow() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      var num = 0
      this.selection.forEach((e) => {
        if (e.workflowType == 'SIGN' && e.status == 'FREERE') {
        } else {
          num++
          iMessage.warn(
            this.language(
              'ZYLZLXQZTWDJCKYHWLZ',
              '只有流转类型且状态为冻结才可以会外流转'
            )
          )
        }
      })
      if (num == 0) {
        if (this.tableLoading) return // 避免重复触发
        this.tableLoading = true
        meetingOutFlow(this.selection.map((item) => item.id))
          .then((res) => {
            if (res?.code == 200) {
              iMessage.success(res.desZh)
              this.getTableList()
            } else {
              iMessage.error(res.desZh)
            }
          })
          .finally(() => {
            this.tableLoading = false
          })
      }
    },
    reasonClose() {
      this.mtzReasonShow = false
    },
    // 退回
    handleClickRecallPointAdmin() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }

      var num = 0
      this.selection.forEach((e) => {
        if (e.flowType == 'MEETING') {
          if (
            e.status == 'SUBMIT' ||
            e.status == 'NOTPASS' ||
            e.status == 'CHECK_INPROCESS' ||
            e.status == 'CHECK_FAIL'
          ) {
            ////////////////////////////////////////////
          } else {
            num++
            iMessage.warn(
              this.language(
                'SHLXQZTWTJHWTGHFHZCKYCH',
                '上会类型且状态为提交（会议未锁定）、未通过或复核中才可以撤回'
              )
            )
          }
        } else {
          if (e.status == 'SUBMIT' || e.status == 'FREERE') {
          } else {
            num++
            iMessage.warn(
              this.language(
                'LZBALXZYTJHDJZTCKYCH',
                '流转/备案类型只有提交或冻结状态才可以撤回'
              )
            )
          }
        }
      })
      if (num == 0) {
        this.type = 'sendBack'
        this.mtzReasonShow = true
      }
    },
    // 点击撤回
    handleClickRecall() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }

      var num = 0
      this.selection.forEach((e) => {
        if (e.flowType == 'MEETING') {
          if (e.status != 'SUBMIT' && e.status != 'NOTPASS') {
            num++
            iMessage.warn(
              this.language(
                'SHLXQZTWTJHWTGCKYCH',
                '上会类型且状态为提交（会议未锁定）或未通过才可以撤回'
              )
            )
          }
        } else {
          if (e.status != 'SUBMIT') {
            num++
            iMessage.warn(
              this.language(
                'LZBALXZYTJZTCKYCH',
                '流转/备案类型只有提交状态才可以撤回'
              )
            )
          }
        }
      })
      if (num == 0) {
        this.type = 'Recall'
        this.mtzReasonShow = true
      }
    },

    // 提交撤回
    handleSubmitRecall(val) {
      let todo
      if (this.type == 'sendBack') {
        todo = sendBack(
          this.selection.map((item) => item.id),
          { reason: val }
        )
      } else {
        todo = recallData(
          this.selection.map((item) => item.id),
          { reason: val }
        )
      }
      if (this.tableLoading) return // 避免重复触发
      this.tableLoading = true
      todo
        .then((res) => {
          if (res && res.code == 200) {
            iMessage.success(res.desZh)
            this.reasonClose()
            this.getTableList()
          } else {
            iMessage.error(res.desZh)
          }
        })
        .finally(() => {
          this.tableLoading = false
        })
    },

    // 删除
    deleteData() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      if (this.selection.find((e) => e.status == 'NEW')) {
        iMessageBox(
          this.language('SHIFOUSHANCHU', '是否删除？'),
          this.language('LK_WENXINTISHI', '温馨提示'),
          {
            confirmButtonText: this.language('QUEREN', '确认'),
            cancelButtonText: this.language('QUXIAO', '取消')
          }
        ).then((res) => {
          deleteData(this.selection.map((item) => item.id)).then((res) => {
            if (res && res.code == 200) {
              iMessage.success(res.desZh)
              this.getTableList()
            } else {
              iMessage.error(res.desZh)
            }
          })
        })
      } else {
        return iMessage.warn(
          this.language('ZYCGZTCKYSC', '只有草稿状态才可以删除')
        )
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.openPage {
  position: relative;
  color: $color-blue;
  font-size: 14px;
  cursor: pointer;
  width: 90%;
}
.date-time-cell {
  margin: 5px 0;
  line-height: 1em;
}
.headTitle {
  display: inline-block;
  font-weight: bold;
  color: #000000;
}
</style>
