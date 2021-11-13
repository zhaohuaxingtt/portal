<!-- mtz定点 -->
<template>
  <div>
    <iSearch @sure="sure"
             @reset="reset">
      <el-form class="searchForm">
        <el-form-item :label="language('SHENQINGDANHAO','申请单号')"
                      class="searchFormItem">
          <input-custom v-model="searchForm.mtzAppId"
                        :editPlaceholder="language('QINGSHURU','请输入')"
                        :placeholder="language('QINGSHURU','请输入')">
          </input-custom>
        </el-form-item>
        <el-form-item :label="language('LIUCHENGLEIXING','流程类型')">
          <custom-select v-model="searchForm.flowType"
                         :user-options="getFlowTypeList"
                         multiple
                         clearable
                         :placeholder="language('QINGSHURU', '请输入')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
          </custom-select>
        </el-form-item>
        <el-form-item :label="language('SHENQINGZHUANGTAI','申请状态')">
          <custom-select v-model="searchForm.appStatus"
                         :user-options="getLocationApplyStatus"
                         multiple
                         clearable
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
          </custom-select>
        </el-form-item>
        <el-form-item label="原材料牌号">
          <custom-select v-model="searchForm.materialCode"
                         :user-options="materialCode"
                         multiple
                         clearable
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
          </custom-select>
        </el-form-item>
        <el-form-item :label="language('LINGJIANHAO','零件号')">
          <input-custom v-model="searchForm.assemblyPartnum"
                        :editPlaceholder="language('QINGSHURU','请输入')"
                        :placeholder="language('QINGSHURU','请输入')">
          </input-custom>
        </el-form-item>
        <el-form-item label="采购员">
          <input-custom v-model="searchForm.buyer"
                        :editPlaceholder="language('QINGSHURU','请输入')"
                        :placeholder="language('QINGSHURU','请输入')">
          </input-custom>
        </el-form-item>
        <el-form-item label="科室">
          <custom-select v-model="searchForm.linieDeptId"
                         :user-options="linieDeptId"
                         multiple
                         clearable
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="existShareName"
                         value-member="existShareId"
                         value-key="existShareId">
          </custom-select>
        </el-form-item>
        <el-form-item label="关联单号">
          <input-custom v-model="searchForm.ttNominateAppId"
                        :editPlaceholder="language('QINGSHURU','请输入')"
                        :placeholder="language('QINGSHURU','请输入')">
          </input-custom>
        </el-form-item>
        <!-- <el-form-item label="RS单状态">
          <custom-select v-model="searchForm.rsFreezed"
                         :user-options="getRsBillStatusList"
                         clearable
                         :placeholder="language('QINGXUANZE', '请选择')"
                         display-member="message"
                         value-member="code"
                         value-key="code">
          </custom-select>
        </el-form-item>
        <el-form-item label="RS冻结时间">
          <iDatePicker style="width:180px"
                       v-model="value"
                       @change="handleChange"
                       type="daterange"
                       range-separator="至"
                       start-placeholder="开始日期"
                       end-placeholder="结束日期">
          </iDatePicker>
        </el-form-item> -->
        <el-form-item label="定点时间">
          <iDatePicker style="width:180px"
                       v-model="value1"
                       @change="handleChange1"
                       type="daterange"
                       range-separator="至"
                       start-placeholder="开始日期"
                       end-placeholder="结束日期">
          </iDatePicker>
        </el-form-item>
      </el-form>
    </iSearch>

    <iCard class="margin-top20">
      <div slot="header"
           class="flex-between-center"
           style="width:100%">
        <span>详情列表</span>
        <div class="opration">
          <iButton @click="handleClickMtzFreeze">{{ language('DONGJIE', '冻结') }}</iButton>
          <iButton @click="handleClickMtzUnfreeze">{{ language('JIEDONG', '解冻') }}</iButton>
          <iButton @click="handleClickMtzNomi">{{ language('DINGDIAN', '定点') }}</iButton>
          <iButton @click="handleClickCancelMtzNomi">{{ language('QUXIAODINGDIAN', '取消定点') }}</iButton>
          <iButton @click="handleClickOutFlow">{{ language('HUIWAILIUZHUAN', '会外流转') }}</iButton>
          <iButton @click="addMtz">{{ language('XINJIANMTZDINGDIANSHENQING', '新建MTZ定点申请') }}</iButton>
          <iButton @click="handleClickMtzRecall">{{ language('CHEHUI', '撤回') }}</iButton>
          <iButton @click="mtzDel">{{ language('SHANCHU', '删除') }}</iButton>
        </div>
      </div>
      <tableList class="margin-top20"
                 :tableData="tableListData"
                 :tableTitle="tableTitle"
                 :tableLoading="loading"
                 :index="true"
                 @handleSelectionChange="handleSelectionChange">
        <template slot="id"
                  slot-scope="scope">
          <p class="openPage"
             @click="handleClickFsupplierName(scope.row)">
            {{scope.row.id}}
          </p>
        </template>
      </tableList>
      <iPagination @size-change="handleSizeChange($event, getTableList)"
                   @current-change="handleCurrentChange($event, getTableList)"
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :current-page="page.currPage"
                   :total="page.totalCount"
                   :layout="page.layout">
      </iPagination>
    </iCard>
    <iDialog :title="language('CHEHUIYUANYIN', '撤回原因')"
             :visible.sync="mtzReasonShow"
             v-if="mtzReasonShow"
             width="40%"
             @close='reasonClose'>
      <MtzClose @close="reasonClose" @handleSubmitRecall="handleSubmitRecall"></MtzClose>
    </iDialog>
  </div>
</template>

<script>
import { iInput, iSearch, iMessage, iDatePicker, iCard, iButton, iPagination, iDialog } from 'rise';
import tableList from '@/components/commonTable/index.vue';
import { tableTitle } from "./data";
import MtzClose from "./MtzClose";
import inputCustom from '@/components/inputCustom'
import { getRawMaterialNos } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/supplementary/details';
import { getDeptData } from '@/api/kpiChart/index'
import { pageMixins } from "@/utils/pageMixins"
import {
  pageMtzNomi,
  getFlowTypeList,
  getLocationApplyStatus,
  getRsBillStatusList,
  mtzFreeze,
  mtzUnfreeze,
  mtzNomi,
  cancelMtzNomi,
  mtzMeetingOutFlow,
  mtzRecall,
  mtzDel,
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';
export default {
  name: "theSearchTable",
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
  data () {
    return {
      mtzReasonShow: false,
      searchForm: {},

      getFlowTypeList: [],
      getLocationApplyStatus: [],
      linieDeptId: [],//科室
      value: "",
      value1: "",
      getRsBillStatusList: [],

      tableListData: [],
      tableTitle: tableTitle,
      loading: false,
      selection: []
    }
  },

  created () {
    this.init()
  },
  methods: {
    init () {
      getFlowTypeList({}).then(res => {
        this.getFlowTypeList = res.data;
      })
      getLocationApplyStatus({}).then(res => {
        this.getLocationApplyStatus = res.data;
      })
      getRsBillStatusList({}).then(res => {
        this.getRsBillStatusList = res.data;
      })
      getRawMaterialNos({}).then(res => {
        this.materialCode = res.data;
      })
      getDeptData().then(res => {
        this.linieDeptId = res.data;
      })

      this.getTableList();
    },
    getTableList () {
      pageMtzNomi({
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
        ...this.searchForm
      }).then(res => {
        if (res.code == 200 && res.data) {
          this.tableListData = res.data;
          this.page.currPage = res.pageNum
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.total
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    handleChange (val) {
      if (val.length < 1) {
        this.searchForm.rsFreezeStartDate = "";
        this.searchForm.rsFreezeEndDate = "";
        return false;
      }
      this.searchForm.rsFreezeStartDate = val[0];
      this.searchForm.rsFreezeEndDate = val[1];
    },
    handleChange1 (val) {
      if (val.length < 1) {
        this.searchForm.nominateStartDate = "";
        this.searchForm.nominateEndDate = "";
        return false;
      }
      this.searchForm.nominateStartDate = val[0];
      this.searchForm.nominateEndDate = val[1];
    },
    sure () {
      console.log(this.searchForm)
      this.getTableList();
    },
    reset () {
      this.searchForm = {}
      this.value = [];
      this.value1 = [];
      this.page.currPage = 1
      this.page.pageSize = 10
      this.getTableList();
    },
    handleClickFsupplierName (val) {

      let routeData = this.$router.resolve({
        path: `/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow`,
        query: {
          currentStep: 1,
          mtzAppId: val.id,
        }
      })
      window.open(routeData.href, '_blank')
    },
    // 选中table数据
    handleSelectionChange(val) {
      this.selection = val;
    },
    // 冻结
    handleClickMtzFreeze () {
      if(this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      if(this.selection[0].flowType == "MEETING"){
        if(this.selection[0].appStatus == "CHECK_PASS"){
          this.MtzFreezeRequest();
        }else{
          return iMessage.warn(this.language('SHLXZYHHTGZTCKYDJ', '上会类型只有复核通过状态才可以冻结'))
        }
      }else{
        if(this.selection[0].appStatus == "SUBMIT"){
          this.MtzFreezeRequest();
        }else{
          return iMessage.warn(this.language('LZBALXZYTJZTCKYDJ', '流转/备案类型只有提交状态才可以冻结'))
        }
      }
    },
    MtzFreezeRequest(){
      mtzFreeze({
        ids: this.selection.map(item => item.id)
      }).then(res=>{
        if(res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableList()
        } else iMessage.error(res.desZh)
      })
    },

    // 解冻
    handleClickMtzUnfreeze () {
      if(this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      if(this.selection[0].appStatus == "FREERE"){
        mtzUnfreeze({
          ids: this.selection.map(item => item.id)
        }).then(res=>{
          if(res && res.code == 200) {
            iMessage.success(res.desZh)
            this.getTableList()
          } else iMessage.error(res.desZh)
        })
      }else{
        return iMessage.warn(this.language('ZYZTWDJDCKYJD', '只有状态为冻结的才可以解冻'))
      }
    },

    // 定点
    handleClickMtzNomi () {
      if(this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      if(this.selection[0].flowType == "FILING"){
        if(this.selection[0].appStatus == "FREERE"){
          this.getNomi()
        }else{
          return iMessage.warn(this.language('BALXQZTWDJCKYDD', '备案类型且状态为冻结才可以定点'))
        }
      }else if(this.selection[0].flowType == "SIGN"){
        if(this.selection[0].appStatus == "FLOWED"){
          this.getNomi()
        }else{
          return iMessage.warn(this.language('LZLXQZTWLZWCCKYDD', '流转类型且状态为流转完成才可以定点'))
        }
      }else if(this.selection[0].flowType == "MEETING"){
        return iMessage.warn(this.language('SHLXBNJXDD', '上会类型不能进行定点'))
      }
    },
    getNomi(){
      mtzNomi({
        ids: this.selection.map(item => item.id)
      }).then(res=>{
        if(res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableList()
        } else iMessage.error(res.desZh)
      })
    },

    // 取消定点
    handleClickCancelMtzNomi () {
      if(this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      if(this.selection[0].appStatus == "NOMINATE"){
        cancelMtzNomi({
          ids: this.selection.map(item => item.id)
        }).then(res=>{
          if(res && res.code == 200) {
            iMessage.success(res.desZh)
            this.getTableList()
          } else iMessage.error(res.desZh)
        })
      }else{
        return iMessage.warn(this.language('ZYDDZTCKYQXDD', '只有定点状态才可以取消定点'))
      }
    },

    // 会外流转
    handleClickOutFlow() {
      if(this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      if(this.selection[0].flowType == "SIGN" && this.selection[0].appStatus == "FREERE") {
        mtzMeetingOutFlow({
          ids: this.selection.map(item => item.id)
        }).then(res => {
          if(res && res.code == 200) {
            iMessage.success(res.desZh)
            this.getTableList()
          } else iMessage.error(res.desZh)
        })
      }else{
        return iMessage.warn(this.language('ZYLZLXQZTWDJCKYHWLZ', '只有流转类型且状态为冻结才可以会外流转'))
      }
    },

    addMtz () {
      let routeData = this.$router.resolve({
          path: `/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/applyInfor`
      })
      window.open(routeData.href, '_blank')
    },
    reasonClose () {
      this.mtzReasonShow = false;
    },

    // 点击撤回
    handleClickMtzRecall () {
      if(this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      if(this.selection[0].flowType == "MEETING"){
        //////////////////////////////////////
      }else{
        if(this.selection[0].appStatus == "SUBMIT"){
          this.mtzReasonShow = true;
        }else{
          return iMessage.warn(this.language('LZBALXZYTJZTCKYCH', '流转/备案类型只有提交状态才可以撤回'))
        }
      }
    },
    // 提交撤回
    handleSubmitRecall(val) {
      mtzRecall({
        ids: this.selection.map(item => item.id),
      }).then(res => {
        if(res && res.code == 200) {
          iMessage.success(res.desZh)
          this.reasonClose();
          this.getTableList()
        } else iMessage.error(res.desZh)
      })
    },

    // 删除
    mtzDel () {
      if(this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      if(this.selection.find(e => e.appStatus == "NEW")){
        mtzDel({
          ids: this.selection.map(item => item.id)
        }).then(res => {
          if(res && res.code == 200) {
            iMessage.success(res.desZh)
            this.getTableList()
          } else iMessage.error(res.desZh)
        })
      }else{
        return iMessage.warn(this.language('ZYCGZTCKYSC', '只有草稿状态才可以删除'))
      }
    },
  },
  destroyed () {

  },
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
</style>
  