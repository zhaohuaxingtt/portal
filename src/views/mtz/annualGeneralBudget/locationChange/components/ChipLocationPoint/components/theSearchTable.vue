<!-- mtz定点 -->
<template>
  <div>
    <iSearch @sure="sure" @reset="reset">
      <el-form class="searchForm">
        <el-form-item
          :label="language('SHENQINGDANHAO', '申请单号')"
          class="searchFormItem"
        >
          <custom-select
            v-model="searchForm.appNo"
            :user-options="getMtzGenericAppId"
            multiple
            clearable
            :placeholder="language('QINGXUANZE', '请选择')"
            display-member="codeMessage"
            value-member="code"
            value-key="code"
          >
          </custom-select>
        </el-form-item>
        <el-form-item :label="language('LIUCHENGLEIXING', '流程类型')">
          <custom-select
            v-model="searchForm.type"
            :user-options="getFlowTypeList"
            multiple
            clearable
            :placeholder="language('QINGSHURU', '请输入')"
            display-member="message"
            value-member="code"
            value-key="code"
          >
          </custom-select>
        </el-form-item>
        <el-form-item :label="language('SHENQINGZHUANGTAI', '申请状态')">
          <custom-select
            v-model="searchForm.status"
            :user-options="getLocationApplyStatus"
            multiple
            clearable
            :placeholder="language('QINGXUANZE', '请选择')"
            display-member="message"
            value-member="code"
            value-key="code"
          >
          </custom-select>
        </el-form-item>
        <el-form-item :label="language('YUANCAILIAOPAIHAO', '原材料牌号')">
          <custom-select
            v-model="searchForm.materialName"
            :user-options="materialCode"
            multiple
            clearable
            :placeholder="language('QINGXUANZE', '请选择')"
            display-member="codeMessage"
            value-member="code"
            value-key="code"
          >
          </custom-select>
        </el-form-item>
        <el-form-item :label="language('LINGJIANHAO', '零件号')">
          <input-custom
            v-model="searchForm.partNum"
            :editPlaceholder="language('QINGSHURU', '请输入')"
            :placeholder="language('QINGSHURU', '请输入')"
          >
          </input-custom>
        </el-form-item>
        <el-form-item :label="language('KESHI', '科室')">
          <custom-select
            v-model="searchForm.deptName"
            :user-options="linieDeptId"
            @change="changeKS"
            multiple
            clearable
            :placeholder="language('QINGXUANZE', '请选择')"
            display-member="depName"
            value-member="depId"
            value-key="depId"
          >
          </custom-select>
        </el-form-item>
        <el-form-item :label="language('CAIGOUYUAN', '采购员')">
          <custom-select
            v-model="searchForm.linieName"
            :user-options="getCurrentUser"
            multiple
            clearable
            :placeholder="language('QINGXUANZE', '请选择')"
            display-member="buyerName"
            value-member="buyerId"
            value-key="buyerId"
          >
          </custom-select>
        </el-form-item>
        <el-form-item :label="language('DINGDIANSHIJIAN', '定点时间')">
          <iDatePicker
            style="width: 220px"
            v-model="searchForm.nominateDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </iDatePicker>
        </el-form-item>
      </el-form>
    </iSearch>

    <iCard class="margin-top20">
      <div slot="header" class="flex-between-center" style="width: 100%">
        <span>详情列表</span>
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
      </div>
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
            {{ getType(scope.row.type) }}
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
  iInput,
  iSearch,
  iMessage,
  iMessageBox,
  iDatePicker,
  iCard,
  iButton,
  iPagination,
  iDialog
} from 'rise'
import tableList from '@/components/commonTable/index.vue'
import { tableTitle } from './data'
import MtzClose from './MtzClose'
import inputCustom from '@/components/inputCustom'
import {
  getRawMaterialNos,
  getDeptAndBuyerByMtzNomi
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details'
import { pageMixins } from '@/utils/pageMixins'
// import store from "@/store";
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
  mtzMeetingOutFlow,
  getMtzGenericAppId,
  getNominateAppIdList
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
import { page } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/firstDetails'
export default {
  name: 'theSearchTable',
  components: {
    iSearch,
    iInput,
    iDatePicker,
    iCard,
    iButton,
    iPagination,
    tableList,
    inputCustom,
    iDialog,
    MtzClose
  },
  mixins: [pageMixins],
  data() {
    return {
      // pickerOptions: {
      //   shortcuts: [{
      //     text: '现在到2999年',
      //     onClick(picker) {
      //       const end = new Date("2999-12-31");
      //       const start = new Date();
      //       picker.$emit('pick', [start, end]);
      //     }
      //   }]
      // },

      mtzReasonShow: false,
      searchForm: {
        appNo: [],
        deptName: [],
        linieName: [],
        materialName: [],
        nominateDate: [],
        partNum: [],
        status: [],
        type: []
      },
      getFlowTypeList: [],
      getLocationApplyStatus: [],
      ttNominateAppId: [], //关联申请单
      linieDeptId: [], //科室
      value1: '',

      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selection: [],
      getMtzGenericAppId: [], //申请单号
      getCurrentUser: [], //采购员

      stopLoading: null,
      depBuyerAll: [],
      getCurrentCopy: []
    }
  },

  created() {
    // console.log(new Date("2999-12-31"));
    this.init()
  },
  methods: {
    getStatus(status) {
      return this.getLocationApplyStatus.find((item) => item.code == status)
        ?.message
    },
    getType(type) {
      return this.getFlowTypeList.find((item) => item.code == type)?.message
    },

    // handleChange_ceshi(val){
    //   console.log(val);
    // },
    changeKS(e) {
      if (e.length < 1) {
        this.getCurrentUser = this.getCurrentCopy
        return false
      }
      var getCurrentUser = []
      this.depBuyerAll.forEach((item, index) => {
        if (e.indexOf(item.depId) !== -1) {
          if (item.buyerId) {
            getCurrentUser.push({
              buyerId: item.buyerId,
              buyerName: item.buyerName
            })
          }
        }
      })
      var getCurrentNew = getCurrentUser.filter((e, index) => {
        let ids = []
        getCurrentUser.forEach((item, i) => {
          ids.push(item.buyerId)
        })
        let str = ids.indexOf(e.buyerId) === index
        return str
      })
      this.getCurrentUser = getCurrentNew
    },
    init() {
      getNominateAppIdList({}).then((res) => {
        this.ttNominateAppId = res.data
      })
      getFlowTypeList({}).then((res) => {
        this.getFlowTypeList = res.data
      })
      getLocationApplyStatus({}).then((res) => {
        this.getLocationApplyStatus = res.data
        console.log(this.getLocationApplyStatus)
      })
      getRawMaterialNos({}).then((res) => {
        this.materialCode = res.data
      })
      getDeptAndBuyerByMtzNomi({
        appType: 'chip'
      }).then((res) => {
        this.depBuyerAll = res.data
        // this.linieDeptId = res.data;//科室
        var linieDeptId = []
        var getCurrentUser = []

        res.data.forEach((e) => {
          if (e.depId) {
            linieDeptId.push({
              depId: e.depId,
              depName: e.depName
            })
          }
          if (e.buyerId) {
            getCurrentUser.push({
              buyerId: e.buyerId,
              buyerName: e.buyerName
            })
          }
        })

        var linieDeptNew = linieDeptId.filter((e, index) => {
          let ids = []
          linieDeptId.forEach((item, i) => {
            ids.push(item.depId)
          })
          let str = ids.indexOf(e.depId) === index
          return str
        })

        this.linieDeptId = linieDeptNew

        var getCurrentNew = getCurrentUser.filter((e, index) => {
          let ids = []
          getCurrentUser.forEach((item, i) => {
            ids.push(item.buyerId)
          })
          let str = ids.indexOf(e.buyerId) === index
          return str
        })

        this.getCurrentUser = getCurrentNew
        this.getCurrentCopy = getCurrentNew
        // this.getCurrentUser = res.data;//采购员
      })

      getMtzGenericAppId({}).then((res) => {
        this.getMtzGenericAppId = res.data
      })
      // getCurrentUser({}).then(res=>{
      //   this.getCurrentUser = res.data;
      // })

      this.getTableList()
    },
    getTableList() {
      this.tableLoading = true
      let nominateDateStart = this.searchForm.nominateDate[0]
      let nominateDateEnd = this.searchForm.nominateDate[1]
      let searchForm = {}
      Object.keys(this.searchForm).forEach((key) => {
        if (key != 'nominateDate')
          searchForm[key] = this.searchForm[key].join(',')
      })
      getAppList({
        currentPage: this.page.currPage,
        pageSize: this.page.pageSize,
        nominateDateStart,
        nominateDateEnd,
        ...searchForm
      })
        .then((res) => {
          if (res.code == 200 && res.data) {
            this.tableLoading = false
            this.tableListData = res.data?.records
            this.page.totalCount = res.data.total
          } else {
            iMessage.error(res.desZh)
          }
          if (this.stopLoading !== null) {
            this.stopLoading.close()
          }
        })
        .catch((red) => {
          if (this.stopLoading !== null) {
            this.stopLoading.close()
          }
        })
    },
    // handleChange (val) {
    //   if (val.length < 1) {
    //     this.searchForm.rsFreezeStartDate = "";
    //     this.searchForm.rsFreezeEndDate = "";
    //     return false;
    //   }
    //   this.searchForm.rsFreezeStartDate = val[0];
    //   this.searchForm.rsFreezeEndDate = val[1];
    // },
    handleChange1(val) {
      if (val.length < 1) {
        this.searchForm.nominateStartDate = ''
        this.searchForm.nominateEndDate = ''
        return false
      }
      this.searchForm.nominateStartDate = val[0].split(' ')[0] + ' 00:00:00'
      this.searchForm.nominateEndDate = val[1].split(' ')[0] + ' 23:59:59'
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
        type: [],
        deptName: [],
        linieName: [],
        materialName: [],
        partNum: [],
        nominateDate: []
      }
      this.value = []
      this.value1 = []
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableList()
    },
    handleClickTtNominateAppId(val) {
      page({
        current: 1,
        size: 9999,
        nominateId: val.ttNominateAppId
      }).then((res) => {
        if (res.code == 200 && res.result) {
          var jumpData = res.data.records[0]
          var partProjType = ''
          if (jumpData.partProjType == null) {
            partProjType = ''
          } else {
            partProjType = jumpData.partProjType
          }
          var path = ''
          path =
            'designate/decisiondata/rs?desinateId=' +
            jumpData.id +
            '&designateType=' +
            jumpData.nominateProcessType +
            '&partProjType' +
            partProjType +
            '&applicationStatus=' +
            jumpData.applicationStatus
          window.open(process.env.VUE_APP_SOURCING_URL + path)
        } else {
          iMessage.error(this.language(res.desEn, res.desZh))
        }
      })
    },
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
      try {
        this.selection.forEach((e) => {
          if (e.type == 'MEETING') {
            if (e.status !== 'CHECK_PASS') {
              num++
              iMessage.warn(
                this.language(
                  'SHLXZYHHTGZTCKYDJ',
                  '上会类型只有复核通过状态才可以冻结'
                )
              )
              throw new Error('EndIterative')
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
              throw new Error('EndIterative')
            }
          }
        })
      } catch (e) {
        if (e.message != 'EndIterative') throw e
      }
      if (num == 0) {
        this.freezeData()
      }
    },
    freezeData() {
      this.stopLoading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      freezeData(this.selection.map((item) => item.id))
        .then((res) => {
          if (res && res.code == 200) {
            iMessage.success(res.desZh)
            this.getTableList()
          } else {
            iMessage.error(res.desZh)
            this.stopLoading.close()
          }
        })
        .catch((red) => {
          this.stopLoading.close()
        })
    },

    // 解冻
    handleClickUnfreeze() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      var num = 0
      try {
        this.selection.forEach((e) => {
          if (e.status !== 'FREERE') {
            num++
            iMessage.warn(
              this.language('ZYZTWDJDCKYJD', '只有状态为冻结的才可以解冻')
            )
            throw new Error('EndIterative')
          }
        })
      } catch (e) {
        if (e.message != 'EndIterative') throw e
      }
      if (num == 0) {
        this.stopLoading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        unFreeze(this.selection.map((item) => item.id))
          .then((res) => {
            if (res && res.code == 200) {
              iMessage.success(res.desZh)
              this.getTableList()
            } else {
              iMessage.error(res.desZh)
              this.stopLoading.close()
            }
          })
          .catch((red) => {
            this.stopLoading.close()
          })
      }
    },

    // 定点
    handleClickNomi() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      this.getNomi()
    },
    getNomi() {
      this.stopLoading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      nominateData(this.selection.map((item) => item.id))
        .then((res) => {
          if (res && res.code == 200) {
            iMessage.success(res.desZh)
            this.getTableList()
          } else {
            iMessage.error(res.desZh)
            this.stopLoading.close()
          }
        })
        .catch((red) => {
          this.stopLoading.close()
        })
    },

    // 取消定点
    unNominate() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      var num = 0
      try {
        this.selection.forEach((e) => {
          if (e.status !== 'NOMINATE') {
            num++
            iMessage.warn(
              this.language('ZYDDZTCKYQXDD', '只有定点状态才可以取消定点')
            )
            throw new Error('EndIterative')
          }
        })
      } catch (e) {
        if (e.message != 'EndIterative') throw e
      }
      if (num == 0) {
        iMessageBox(
          this.language('SHIFOUQUERENQUXIAODINGDIAN', '是否确认取消定点？'),
          this.language('LK_WENXINTISHI', '温馨提示'),
          {
            confirmButtonText: this.language('QUEREN', '确认'),
            cancelButtonText: this.language('QUXIAO', '取消')
          }
        ).then((res) => {
          this.stopLoading = this.$loading({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })

          unNominate(this.selection.map((item) => item.id))
            .then((res) => {
              if (res && res.code == 200) {
                iMessage.success(res.desZh)
                this.getTableList()
              } else {
                iMessage.error(res.desZh)
                this.stopLoading.close()
              }
            })
            .catch(() => {
              this.stopLoading.close()
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
      try {
        this.selection.forEach((e) => {
          if (e.type == 'SIGN' && e.status == 'FREERE') {
          } else {
            num++
            iMessage.warn(
              this.language(
                'ZYLZLXQZTWDJCKYHWLZ',
                '只有流转类型且状态为冻结才可以会外流转'
              )
            )
            throw new Error('EndIterative')
          }
        })
      } catch (e) {
        if (e.message != 'EndIterative') throw e
      }
      if (num == 0) {
        this.stopLoading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        meetingOutFlow(this.selection.map((item) => item.id))
          .then((res) => {
            if (res?.code == 200) {
              iMessage.success(res.desZh)
              this.getTableList()
            } else {
              iMessage.error(res.desZh)
              this.stopLoading.close()
            }
          })
          .catch(() => {
            this.stopLoading.close()
          })
      }
    },
    reasonClose() {
      this.mtzReasonShow = false
    },
    handleClickRecallPointAdmin() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }

      var num = 0
      try {
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
              throw new Error('EndIterative')
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
              throw new Error('EndIterative')
            }
          }
        })
      } catch (e) {
        if (e.message != 'EndIterative') throw e
      }
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
      try {
        this.selection.forEach((e) => {
          if (e.flowType == 'MEETING') {
            if (e.status == 'SUBMIT' || e.status == 'NOTPASS') {
              ////////////////////////////////////////////
            } else {
              num++
              iMessage.warn(
                this.language(
                  'SHLXQZTWTJHWTGCKYCH',
                  '上会类型且状态为提交（会议未锁定）或未通过才可以撤回'
                )
              )
              throw new Error('EndIterative')
            }
          } else {
            if (e.status == 'SUBMIT') {
            } else {
              num++
              iMessage.warn(
                this.language(
                  'LZBALXZYTJZTCKYCH',
                  '流转/备案类型只有提交状态才可以撤回'
                )
              )
              throw new Error('EndIterative')
            }
          }
        })
      } catch (e) {
        if (e.message != 'EndIterative') throw e
      }
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
      todo
        .then((res) => {
          if (res && res.code == 200) {
            iMessage.success(res.desZh)
            this.reasonClose()
            this.getTableList()
          } else {
            iMessage.error(res.desZh)
            this.stopLoading.close()
          }
        })
        .catch(() => {
          this.stopLoading.close()
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
          deleteData(this.selection.map((item) => item.id))
            .then((res) => {
              if (res && res.code == 200) {
                iMessage.success(res.desZh)
                this.getTableList()
              } else {
                iMessage.error(res.desZh)
                this.stopLoading.close()
              }
            })
            .catch(() => {
              this.stopLoading.close()
            })
        })
      } else {
        return iMessage.warn(
          this.language('ZYCGZTCKYSC', '只有草稿状态才可以删除')
        )
      }
    }
  },
  destroyed() {}
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
.searchForm {
  display: flex;
  flex-wrap: wrap;
}
.searchFormItem {
  width: 240px;
}
.date-time-cell {
  margin: 5px 0;
  line-height: 1em;
}
</style>
