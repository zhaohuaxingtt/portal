<!-- mtz定点 -->
<template>
  <div class="search-table">
    <iSearch @sure="sure" @reset="reset">
      <el-form class="searchForm">
        <el-form-item
          :label="language('SHENQINGDANHAO', '申请单号')"
          class="searchFormItem"
        >
          <!-- getMtzGenericAppId -->
          <custom-select
            v-model="searchForm.mtzAppId"
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
        <el-form-item :label="language('GUANLIANDANHAO', '关联单号')">
          <custom-select
            v-model="searchForm.ttNominateAppId"
            :user-options="ttNominateAppId"
            multiple
            clearable
            :placeholder="language('QINGXUANZE', '请选择')"
            display-member="message"
            value-member="code"
            value-key="code"
          >
          </custom-select>
        </el-form-item>
        <el-form-item :label="language('LIUCHENGLEIXING', '流程类型')">
          <custom-select
            v-model="searchForm.flowType"
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
            v-model="searchForm.appStatus"
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
        <el-form-item :label="language('GONGYINGSHANG', '供应商')">
          <custom-select
            v-model="searchForm.sapCode"
            :user-options="supplierList"
            multiple
            clearable
            :placeholder="language('QINGSHURU', '请输入')"
            display-member="codeMessage"
            value-member="code"
            value-key="code"
          >
          </custom-select>
        </el-form-item>
        <el-form-item :label="language('DINGDIANSHIJIAN', '定点时间')">
          <iDatePicker
            style="width: 220px"
            v-model="value1"
            @change="handleChange1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </iDatePicker>
        </el-form-item>
        <el-form-item :label="language('KESHI', '科室')">
          <custom-select
            v-model="searchForm.linieDeptId"
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
            v-model="searchForm.buyer"
            :user-options="getCurrentUser"
            multiple
            @change="changeCGY"
            clearable
            :placeholder="language('QINGXUANZE', '请选择')"
            display-member="buyerName"
            value-member="buyerId"
            value-key="buyerId"
          >
          </custom-select>
        </el-form-item>
        <el-form-item :label="language('LINGJIANHAO', '零件号')">
          <input-custom
            v-model="searchForm.assemblyPartnum"
            :editPlaceholder="language('QINGSHURU', '请输入')"
            :placeholder="language('QINGSHURU', '请输入')"
          >
          </input-custom>
        </el-form-item>
        <el-form-item :label="language('YUANCAILIAOPAIHAO', '原材料牌号')">
          <custom-select
            v-model="searchForm.materialCode"
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
      </el-form>
    </iSearch>

    <iCard class="table-card margin-top20">
      <div slot="header" class="flex-between-center" style="width: 100%">
        <span class="table-title">详情列表</span>
        <div class="opration">
          <iButton
            @click="transferBtn"
            v-permission="PORTAL_MTZ_POINT_DONGJIE"
            >{{ $t('LK_ZHUANPAI') }}</iButton
          >
          <iButton
            @click="handleClickMtzFreeze"
            v-permission="PORTAL_MTZ_POINT_DONGJIE"
            >{{ language('DONGJIE', '冻结') }}</iButton
          >
          <iButton
            @click="handleClickMtzUnfreeze"
            v-permission="PORTAL_MTZ_POINT_JIEDONG"
            >{{ language('JIEDONG', '解冻') }}</iButton
          >
          <iButton
            @click="handleClickMtzNomi"
            v-permission="PORTAL_MTZ_POINT_DINGDIAN"
            >{{ language('DINGDIAN', '定点') }}</iButton
          >
          <iButton
            @click="handleClickCancelMtzNomi"
            v-permission="PORTAL_MTZ_POINT_QUXIAODINGDIAN"
            >{{ language('QUXIAODINGDIAN', '取消定点') }}</iButton
          >
          <iButton
            @click="handleClickOutFlow"
            v-permission="PORTAL_MTZ_POINT_HUIWAILIUZHUAN"
            >{{ language('HUIWAILIUZHUAN', '会外流转') }}</iButton
          >
          <iButton
            @click="addMtz"
            v-permission="PORTAL_MTZ_POINT_XINJIANMTZDINGDIANSHENQING"
            >{{
              language('XINJIANMTZDINGDIANSHENQING', '新建MTZ定点申请')
            }}</iButton
          >
          <iButton
            @click="handleClickMtzRecall"
            v-permission="PORTAL_MTZ_POINT_CHEHUI"
            >{{ language('CHEHUI', '撤回') }}</iButton
          >
          <iButton
            @click="handleClickMtzRecallPointAdmin"
            v-permission="PORTAL_MTZ_POINT_CHEHUIPOINTADMIN"
            >{{ $t('LK_TUIHUI') }}</iButton
          >
          <iButton @click="mtzDel" v-permission="PORTAL_MTZ_POINT_SHANCHU">{{
            language('SHANCHU', '删除')
          }}</iButton>
          <buttonTableSetting showBadge :hiddenCount="hiddenCount" @click="edittableHeader" />
        </div>
      </div>
      <!-- <tableList
        height="100%"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :index="true"
        border
        @handleSelectionChange="handleSelectionChange"
      >
        <template slot="id" slot-scope="scope">
          <p
            class="openPage"
            @click="handleClickFsupplierName(scope.row)"
            v-if="scope.row.viewDetailsFlag"
          >
            {{ scope.row.id }}
          </p>
          <p v-else style="width: 90%">{{ scope.row.id }}</p>
        </template>
        <template slot="ttNominateAppId" slot-scope="scope">
          <p class="openPage" @click="handleClickTtNominateAppId(scope.row)">
            {{ scope.row.ttNominateAppId }}
          </p>
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
      </tableList> -->
      <iTableCustom
        ref="tableList"
        class="table-box"
        height="100%"
        :data="tableListData"
        :columns="tableTitle1"
        :loading="tableLoading"
        permissionKey="MTZLOCATIONPOINT_HOME"
        :index="true"
        border
        @setHiddenCount="setHiddenCount"
        @handleClickFsupplierName="handleClickFsupplierName"
        @handle-selection-change="handleSelectionChange"
      />
      <iPagination
        :showBtn="true"
        :tableData="tableListData"
        :tableTitle="tableTitle1"
        class="footer-pagination"
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
    <el-dialog
      :title="$t('LK_ZHUANPAI') "
      :visible.sync="transferDialog"
      width="30%"
      :before-close="handleCloseTransfer"
    >
    <span>用户：</span>
      <iSelect
      style="width:200px"
        :placeholder="$t('LK_QINGXUANZE')"
        v-model="transferUserId"
        clearable
      >
        <el-option
          :value="item.userId"
          :label="item.userName"
          v-for="item in transferUserList"
          :key="item.userId"
        />
      </iSelect>
      <span slot="footer" class="dialog-footer">
        <iButton @click="handleConfirmTransfer" >{{ $t('LK_QUEREN') }}</iButton>
         </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  iSelect,
  iInput,
  iSearch,
  iMessage,
  iMessageBox,
  iDatePicker,
  iCard,
  iButton,
  iPagination,
  iDialog,
  iTableCustom
} from 'rise'
import buttonTableSetting from 'rise/web/components/buttonTableSetting'
import { tableSortMixins } from 'rise/web/components/iTableSort/tableSortMixins'
import { getTransferUsers } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/approve'
import tableList from '@/components/commonTable/index.vue'
import { tableTitle, tableTitle1 } from './data'
import MtzClose from './MtzClose'
import inputCustom from '@/components/inputCustom'
import {
  getMtzSupplierList
} from '@/api/mtz/annualGeneralBudget/mtzReplenishmentOverview'
import {
  getRawMaterialNos,
  getDeptAndBuyerByMtzNomi,
  
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details'
import { pageMixins } from '@/utils/pageMixins'
// import store from "@/store";
import {
  pageMtzNomi,
  getFlowTypeList,
  getLocationApplyStatus,
  // getRsBillStatusList,
  mtzFreeze,
  mtzUnfreeze,
  mtzNomi,
  cancelMtzNomi,
  mtzMeetingOutFlow,
  mtzRecall,
  mtzDel,
  getDeptLimitLevel,
  getMtzGenericAppId,
  getCurrentUser,
  getNominateAppIdList,
  transferNomi
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details'
import { page } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/firstDetails'
export default {
  name: 'theSearchTable',
  components: {
    iSelect,
    iSearch,
    iInput,
    iDatePicker,
    iCard,
    iButton,
    iPagination,
    iTableCustom,
    buttonTableSetting,
    tableList,
    inputCustom,
    iDialog,
    MtzClose
  },
  mixins: [pageMixins, tableSortMixins],
  data() {
    return {
      tableTitle1,
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
      transferUserId:'',
      transferUserList:[],
      transferDialog: false,
      mtzReasonShow: false,
      searchForm: {
        mtzAppId: [],
        appStatus: [],
        flowType: [],
        linieDeptId: [],
        materialCode: [],
        assemblyPartnum: [],
        buyer: [],
        ttNominateAppId: [],
        sapCode:[]
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
      supplierList:[],
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
    changeCGY(e) {
      console.log(e)
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
      })
      getRawMaterialNos({}).then((res) => {
        this.materialCode = res.data
      })

      getDeptAndBuyerByMtzNomi({
        appType: 'MTZ'
      }).then((res) => {
        this.depBuyerAll = res.data
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
      })

      getMtzGenericAppId({}).then((res) => {
        this.getMtzGenericAppId = res.data
      })

      getMtzSupplierList({}).then(res => {
          this.supplierList = res.data;
      })
      this.getTableList()
    },
    getTableList() {
      this.tableLoading = true
      pageMtzNomi({
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...this.searchForm
      })
        .then((res) => {
          if (res.code == 200 && res.data) {
            this.tableLoading = false
            this.tableListData = res.data
            this.page.currPage = res.pageNum
            this.page.pageSize = res.pageSize
            this.page.totalCount = res.total
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
        mtzAppId: [],
        appStatus: [],
        flowType: [],
        linieDeptId: [],
        materialCode: [],
        assemblyPartnum: [],
        buyer: [],
        ttNominateAppId: [],
        sapCode:[],
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
      if (!val.viewDetailsFlag) return
      let routeData = this.$router.resolve({
        path: `/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow`,
        query: {
          currentStep: 1,
          mtzAppId: val.id
        }
      })
      window.open(routeData.href)
    },
    addMtz() {
      let routeData = this.$router.resolve({
        path: `/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow`
      })
      window.open(routeData.href, '_blank')
    },
    // 选中table数据
    handleSelectionChange(val) {
      this.selection = val
    },
    isEditNew (val) {
      const appStatusArr=['草稿','已提交','未通过','通过','复核未通过','M退回']
      console.log(val)
      console.log(appStatusArr.indexOf(val.appStatusDesc))
      return (val.appStatusDesc== '草稿' || val.appStatusDesc == '未通过')||(((val.flowType=='SIGN'||val.flowType=='FILING')&&val.appStatusDesc=='已提交')||(appStatusArr.indexOf(val.appStatusDesc)>0&&val.flowType=="MEETING"))
    }, 
    handleConfirmTransfer(){
      const req={
        appIdList: this.selection.map(val=>val.id),
        userId:this.transferUserId,
        nameZh:this.transferUserList.find(val=>val.userId==this.transferUserId).userName
      }
      transferNomi(req).then(res=>{
        if(res.code==200){
            this.init()
            iMessage.success('转派成功')
            this.transferDialog = false
          }else{
            iMessage.error(res.desZh)
          }
      })
    },
    handleCloseTransfer(){
      this.transferUserId=''
      this.transferDialog=false
    },
    transferBtn() {
      if (this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      getTransferUsers().then(res=>{
         if(res.code==200){
          this.transferUserList=res.data
            this.selection.every(val=>{
              if (
                this.isEditNew(val)
              ) {
                this.transferDialog=true
              } else {
                iMessage.error(
                  "上会：草稿、已提交、未通过、通过、复核未通过、M退回,流转&备案：已提交、草稿未、未通过状态下可转派"
                )
                return  false
              }
            })
          }else{
              iMessage.error(res.desZh)
        }
      })


    },
    // 冻结
    handleClickMtzFreeze() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      var num = 0
      try {
        this.selection.forEach((e) => {
          if (
            e.ttNominateAppId !== '' &&
            e.ttNominateAppId !== null &&
            e.ttNominateAppId !== 'null'
          ) {
            console.log(e.ttNominateAppId)
            num++
            iMessage.warn(
              this.language(
                'YGLSQDHBNJXDJJDDDQXDDHWLZCHSCCZ',
                '已关联申请单号不能进行冻结、解冻、定点、取消定点、会外流转、撤回、删除操作！'
              )
            )
            throw new Error('EndIterative')
          }
          if (e.flowType == 'MEETING') {
            if (e.appStatus !== 'CHECK_PASS') {
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
            if (e.appStatus !== 'SUBMIT') {
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
        this.MtzFreezeRequest()
      }
    },
    MtzFreezeRequest() {
      this.stopLoading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      mtzFreeze({
        ids: this.selection.map((item) => item.id)
      })
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
    handleClickMtzUnfreeze() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      var num = 0
      try {
        this.selection.forEach((e) => {
          if (
            e.ttNominateAppId !== '' &&
            e.ttNominateAppId !== null &&
            e.ttNominateAppId !== 'null'
          ) {
            num++
            iMessage.warn(
              this.language(
                'YGLSQDHBNJXDJJDDDQXDDHWLZCHSCCZ',
                '已关联申请单号不能进行冻结、解冻、定点、取消定点、会外流转、撤回、删除操作！'
              )
            )
            throw new Error('EndIterative')
          }
          if (e.appStatus !== 'FREERE') {
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

        mtzUnfreeze({
          ids: this.selection.map((item) => item.id)
        })
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
    handleClickMtzNomi() {
      // this.
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      // var num = 0;
      // try{
      //   this.selection.forEach(e=>{
      //     if(e.ttNominateAppId !== "" && e.ttNominateAppId !== null && e.ttNominateAppId !== "null"){
      //       num++;
      //       iMessage.warn(this.language('YGLSQDHBNJXDJJDDDQXDDHWLZCHSCCZ', '已关联申请单号不能进行冻结、解冻、定点、取消定点、会外流转、撤回、删除操作！'))
      //       throw new Error("EndIterative");
      //     }
      //     if(e.flowType == "FILING"){
      //       if(e.appStatus !== "FREERE"){
      //         num++;
      //         iMessage.warn(this.language('BALXQZTWDJCKYDD', '备案类型且状态为冻结才可以定点'))
      //         throw new Error("EndIterative");
      //       }
      //     } else if (e.flowType == "SIGN") {
      //       if(e.appStatus !== "FLOWED"){
      //         num++;
      //         iMessage.warn(this.language('LZLXQZTWLZWCCKYDD', '流转类型且状态为流转完成才可以定点'))
      //         throw new Error("EndIterative");
      //       }
      //     }else if(e.flowType == "MEETING"){
      //       num++;
      //       iMessage.warn(this.language('SHLXBNJXDD', '上会类型不能进行定点'))
      //       throw new Error("EndIterative");
      //     }
      //   })
      // }catch(e){
      //     if(e.message != "EndIterative") throw e;
      // }
      // if(num==0){
      this.getNomi()
      // }
    },
    getNomi() {
      this.stopLoading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      mtzNomi({
        ids: this.selection.map((item) => item.id)
      })
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
    handleClickCancelMtzNomi() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      var num = 0
      try {
        this.selection.forEach((e) => {
          if (
            e.ttNominateAppId !== '' &&
            e.ttNominateAppId !== null &&
            e.ttNominateAppId !== 'null'
          ) {
            num++
            iMessage.warn(
              this.language(
                'YGLSQDHBNJXDJJDDDQXDDHWLZCHSCCZ',
                '已关联申请单号不能进行冻结、解冻、定点、取消定点、会外流转、撤回、删除操作！'
              )
            )
            throw new Error('EndIterative')
          }
          if (e.appStatus !== 'NOMINATE') {
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

          cancelMtzNomi({
            ids: this.selection.map((item) => item.id)
          }).then((res) => {
            if (res && res.code == 200) {
              iMessage.success(res.desZh)
              this.getTableList()
            } else iMessage.error(res.desZh)
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
          if (
            e.ttNominateAppId !== '' &&
            e.ttNominateAppId !== null &&
            e.ttNominateAppId !== 'null'
          ) {
            num++
            iMessage.warn(
              this.language(
                'YGLSQDHBNJXDJJDDDQXDDHWLZCHSCCZ',
                '已关联申请单号不能进行冻结、解冻、定点、取消定点、会外流转、撤回、删除操作！'
              )
            )
            throw new Error('EndIterative')
          }
          if (e.flowType == 'SIGN' && e.appStatus == 'FREERE') {
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

        mtzMeetingOutFlow({
          ids: this.selection.map((item) => item.id)
        }).then((res) => {
          if (res && res.code == 200) {
            iMessage.success(res.desZh)
            this.getTableList()
          } else iMessage.error(res.desZh)
        })
      }
    },
    reasonClose() {
      this.mtzReasonShow = false
    },
    handleClickMtzRecallPointAdmin() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }

      var num = 0
      try {
        this.selection.forEach((e) => {
          if (
            e.ttNominateAppId !== '' &&
            e.ttNominateAppId !== null &&
            e.ttNominateAppId !== 'null'
          ) {
            num++
            iMessage.warn(
              this.language(
                'YGLSQDHBNJXDJJDDDQXDDHWLZCHSCCZ',
                '已关联申请单号不能进行冻结、解冻、定点、取消定点、会外流转、撤回、删除操作！'
              )
            )
            throw new Error('EndIterative')
          }
          if (e.flowType == 'MEETING') {
            if (
              e.appStatus == 'SUBMIT' ||
              e.appStatus == 'NOTPASS' ||
              e.appStatus == 'CHECK_INPROCESS' ||
              e.appStatus == 'CHECK_FAIL'
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
            if (e.appStatus == 'SUBMIT' || e.appStatus == 'FREERE') {
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
        this.mtzReasonShow = true
      }
    },
    // 点击撤回
    handleClickMtzRecall() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }

      var num = 0
      try {
        this.selection.forEach((e) => {
          if (
            e.ttNominateAppId !== '' &&
            e.ttNominateAppId !== null &&
            e.ttNominateAppId !== 'null'
          ) {
            num++
            iMessage.warn(
              this.language(
                'YGLSQDHBNJXDJJDDDQXDDHWLZCHSCCZ',
                '已关联申请单号不能进行冻结、解冻、定点、取消定点、会外流转、撤回、删除操作！'
              )
            )
            throw new Error('EndIterative')
          }
          if (e.flowType == 'MEETING') {
            if (e.appStatus == 'SUBMIT' || e.appStatus == 'NOTPASS') {
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
            if (e.appStatus == 'SUBMIT') {
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
        this.mtzReasonShow = true
      }
    },

    // 提交撤回
    handleSubmitRecall(val) {
      mtzRecall({
        ids: this.selection.map((item) => item.id),
        withdrawReason: val
      }).then((res) => {
        if (res && res.code == 200) {
          iMessage.success(res.desZh)
          this.reasonClose()
          this.getTableList()
        } else iMessage.error(res.desZh)
      })
    },

    // 删除
    mtzDel() {
      if (this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      if (
        this.selection.find(
          (e) =>
            e.ttNominateAppId == '' ||
            e.ttNominateAppId == null ||
            e.ttNominateAppId == 'null'
        )
      ) {
        if (this.selection.find((e) => e.appStatus == 'NEW')) {
          iMessageBox(
            this.language('SHIFOUSHANCHU', '是否删除？'),
            this.language('LK_WENXINTISHI', '温馨提示'),
            {
              confirmButtonText: this.language('QUEREN', '确认'),
              cancelButtonText: this.language('QUXIAO', '取消')
            }
          ).then((res) => {
            mtzDel({
              ids: this.selection.map((item) => item.id)
            }).then((res) => {
              if (res && res.code == 200) {
                iMessage.success(res.desZh)
                this.getTableList()
              } else iMessage.error(res.desZh)
            })
          })
        } else {
          return iMessage.warn(
            this.language('ZYCGZTCKYSC', '只有草稿状态才可以删除')
          )
        }
      } else {
        return iMessage.warn(
          this.language(
            'YGLSQDHBNJXDJJDDDQXDDHWLZCHSCCZ',
            '已关联申请单号不能进行冻结、解冻、定点、取消定点、会外流转、撤回、删除操作！'
          )
        )
      }
    }
  },
  destroyed() {}
}
</script>

<style lang="scss" scoped>
.search-table {
  height: calc(100vh - 190px);
  display: flex;
  flex-flow: column;
  // mtz 页面演示使用样式
    ::v-deep .el-form {
      .el-form-item__label {
        font-size: 18px !important;
      }
      .el-form-item__content {
        font-size: 18px !important;
      }
      .el-range-separator{
        width: auto;
        height: auto;
      }
      .el-range-input, .el-input__inner, .el-range-separator{
        font-size: 18px !important;
      }
    }
    ::v-deep .el-button{
      span{
        font-size: 20px !important;
        font-weight: 700 !important;
      }
    }
  .table-card {
    flex: 1;
    overflow: hidden;
    .table-title{
        font-size: 20px !important;
        font-weight: 700 !important;
    }
    ::v-deep .card-body-box {
      height: calc(100% - 98px);
      .table-box {
        height: calc(100% - 50px);
        .el-table{
          .el-table__header-wrapper{
            th{
              .cell{
                font-size: 18px;
              }
            }
          }
          
          .el-table__body-wrapper{
            td{
              .cell{
                font-size: 18px;
              }
            }
          }
        }
      }
      .footer-pagination{
        .page-info{
          font-size: 16px;
        }
        .number, .el-input__inner, .el-pagination__jump{
          font-size: 16px !important;
        }
        
      }
    }
  }
}
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
