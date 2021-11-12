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

    <iDialog :title="language('MTZXINZENG', 'MTZ新增')"
             :visible.sync="mtzAddShow"
             v-if="mtzAddShow"
             width="25%"
             @close='closeDiolog'>
      <MtzAdd @close="closeDiolog"></MtzAdd>
    </iDialog>
    <iDialog :title="language('CHEHUIYUANYIN', '撤回原因')"
             :visible.sync="mtzReasonShow"
             v-if="mtzReasonShow"
             width="40%"
             @close='reasonClose'>
      <MtzClose @close="reasonClose"></MtzClose>
    </iDialog>
  </div>
</template>

<script>
import { iInput, iSearch, iMessage, iDatePicker, iCard, iButton, iPagination, iDialog } from 'rise';
import tableList from '@/components/commonTable/index.vue';
import { tableTitle } from "./data";
import MtzAdd from "./MtzAdd";
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
    MtzAdd,
    MtzClose
  },
  mixins: [pageMixins],
  data () {
    return {
      mtzReasonShow: false,
      mtzAddShow: false,
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
          flowType:val.flowType
        }
      })
      window.open(routeData.href, '_blank')
    },
    // 选中table数据
    handleSelectionChange(val) {
      this.selection = val
    },
    // 冻结
    handleClickMtzFreeze () {
      if(this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
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
      mtzUnfreeze({
        ids: this.selection.map(item => item.id)
      }).then(res=>{
        if(res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableList()
        } else iMessage.error(res.desZh)
      })
    },
    // 定点
    handleClickMtzNomi () {
      if(this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
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
      cancelMtzNomi({
        ids: this.selection.map(item => item.id)
      }).then(res=>{
        if(res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableList()
        } else iMessage.error(res.desZh)
      })
    },
    // 会外流转
    handleClickOutFlow() {
      if(this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      if(this.selection.find(item => item.flowType != 'SIGN')) {
        return iMessage(this.language('ZYLZLXDSQDKYFQHWLZ', '只有流转类型的申请单可以发起会外流转'))
      }
      mtzMeetingOutFlow({
        ids: this.selection.map(item => item.id)
      }).then(res => {
        if(res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableList()
        } else iMessage.error(res.desZh)
      })
    },
    addMtz () {
      // this.mtzAddShow = true;
      let routeData = this.$router.resolve({
          path: `/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/applyInfor`
      })
      window.open(routeData.href, '_blank')
    },
    closeDiolog () {
      this.mtzAddShow = false;
    },
    reasonClose () {
      this.mtzReasonShow = false;
    },
    // 点击撤回
    handleClickMtzRecall () {
      this.mtzReasonShow = true;
    },
    // 提交撤回
    handleSubmitRecall(val) {
      if(this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      mtzRecall({
        ids: this.selection.map(item => item.id)
      }).then(res => {
        if(res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableList()
        } else iMessage.error(res.desZh)
      })
    },
    // 删除
    mtzDel () {
      if(this.selection && this.selection.length == 0) {
        return iMessage.warn(this.language('QZSXZYTSJ', '请至少选中一条数据'))
      }
      mtzDel({
        ids: this.selection.map(item => item.id)
      }).then(res => {
        if(res && res.code == 200) {
          iMessage.success(res.desZh)
          this.getTableList()
        } else iMessage.error(res.desZh)
      })
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
  