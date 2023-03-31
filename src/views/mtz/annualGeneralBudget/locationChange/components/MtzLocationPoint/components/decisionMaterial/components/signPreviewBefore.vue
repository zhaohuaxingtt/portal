<!--
 * @Author: youyuan
 * @Date: 2021-10-28 16:45:22
 * @LastEditTime: 2021-11-10 13:43:16
 * @LastEditors: Please set LastEditors
 * @Description: mtz
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\components\mtz.vue
-->
<template>
  <div class="tabsBoxWrap">
    <div id="tabsBoxWrap">
      <span class="download_btn" v-if="approve">
        <!-- <iButton @click="handleClickExport">{{language('DAOCHU', '导出')}}</iButton> -->
      </span>
      <div ref="qrCodeDiv" class="sign_swap" @click="rulesClick">
        <iCard class="upload_hr">
          <div slot="header" class="headBox">
            <p class="headTitle">{{ title }}</p>
            <div class="tabs_box_right" v-if="approve">
              <div class="big_text">
                <span class="samll_val"
                  >{{ formData.mtzAppId }}-{{ formData.appName }}</span
                >
              </div>
              <div class="small_text">
                <!-- <span>{{language("SHENQINGRIQI","申请日期")}}：</span> -->
                <span>Application date：</span>
                <span class="samll_val">{{ formData.createDate }}</span>
              </div>
              <div class="small_text">
                <!-- <span>{{language("KESHI","科室")}}：</span> -->
                <span>Commodity：</span>
                <span class="samll_val">{{ formData.linieDeptName }}</span>
              </div>
              <div>
                <!-- <span>{{language("CAIGOUYUAN","采购员")}}：</span> -->
                <span>Buyer：</span>
                <span class="samll_val">{{ formData.linieNameEn }}</span>
              </div>
            </div>
          </div>
          <el-divider class="hr_divider" />
          <div class="centerBox">
            <p>
              补差金额=零件结算数量
              <iTooltip :txtInfo="tipList[0]" :num="'1'"></iTooltip>
              *[原材料市场价<iTooltip
                :txtInfo="tipList[1]"
                :num="'2'"
              ></iTooltip>
              -原材料基价<iTooltip :txtInfo="tipList[2]" :num="'3'"> </iTooltip>
              *(1+阈值<iTooltip :txtInfo="tipList[3]" :num="'4'"></iTooltip
              >*阈值系数<iTooltip :txtInfo="tipList[4]" :num="'5'"></iTooltip>
              )]*原材料用量
              <iTooltip :txtInfo="tipList[5]" :num="'6'"></iTooltip>
              *补差%<iTooltip :txtInfo="tipList[6]" :num="'7'"></iTooltip>
            </p>
            <p class="enStyle">
              <span
                >MTZ Payment= Settle Accounts Quantity*[Effective Price-Base
                Price(1+Threshold*Coefficient)]*Raw Material Weight*
                Compensation%</span
              ><span>When: effective price > base price *(1+threshold)</span>
            </p>
          </div>

          <p class="tableTitle">
            {{ language('GUIZEQINGDAN', '规则清单') }}-Regulation
          </p>
          <div class="margin-top20 formStyle">
            <!-- <div  class="btn ">
            <span type="primary" size="mini" circle @click="isruleTitle1=!isruleTitle1">{{isruleTitle1?'-':'+'}}</span>
          </div> -->
            <tableList
              border
              :tagNum="'1'"
              class="margin-top20"
              :tableData="ruleTableListData"
              :tableTitle="ruleTableListData.some((val)=>{if(val.materialCode.slice(1,6)=='01006') {return true}})?ruleTableTitle1_all:ruleTableTitle1_1"
              @handleClickRow="handleCurrentChangeTable"
              :tableLoading="loadingRule"
              :index="true"
              :selection="false"
              @handleSelectionChange="handleSelectionChange"
            >
              <template slot-scope="scope" slot="compensationPeriod">
                <span>{{
                  scope.row.compensationPeriod == 'A'
                    ? '年度'
                    : scope.row.compensationPeriod == 'H'
                    ? '半年度'
                    : scope.row.compensationPeriod == 'Q'
                    ? '季度'
                    : scope.row.compensationPeriod == 'M'
                    ? '月度'
                    : ''
                }}</span>
              </template>
              <template slot-scope="scope" slot="thresholdCompensationLogic">
                <span>{{
                  scope.row.thresholdCompensationLogic == 'A'
                    ? '全额补差'
                    : scope.row.thresholdCompensationLogic == 'B'
                    ? '超额补差'
                    : ''
                }}</span>
              </template>
              <template slot-scope="scope" slot="sapCode">
                <span>{{ scope.row.sapCode }}</span
                ><br />
                <span>{{ scope.row.supplierName }}</span>
              </template>
              <template slot-scope="scope" slot="materialCode">
                <span>{{ scope.row.materialCode }}</span
                ><br />
                <span>{{ scope.row.materialName }}</span>
              </template>
              <template slot-scope="scope" slot="formalFlag">
                <span>{{ scope.row.formalFlag == 'Y' ? '否' : '是' }}</span>
              </template>
              <template slot-scope="scope" slot="method">
                <span>{{
                  scope.row.method == '1'
                    ? '一次性补差'
                    : scope.row.method == '2'
                    ? '变价单补差'
                    : ''
                }}</span>
              </template>
              <template slot-scope="scope" slot="partBalanceCountType">
                <span>{{
                  scope.row.partBalanceCountType == 'SYSTEM'
                    ? '系统预读'
                    : scope.row.partBalanceCountType == 'HANDWORK'
                    ? '手工上传'
                    : ''
                }}</span>
              </template>
              <template slot-scope="scope" slot="avgPeriod">
                <span>{{
                  scope.row.avgPeriod || scope.row.avgPeriod == '0'
                    ? avgPeriodList.find(
                        (val) => val.code == scope.row.avgPeriod
                      ).name
                    : ''
                }}</span>
              </template>
              <template slot-scope="scope" slot="offsetMonth">
                <span>{{
                  scope.row.offsetMonth || scope.row.offsetMonth == '0'
                    ? offsetList.find((val) => val.code == scope.row.offsetMonth)
                        .name
                    : ''
                }}</span>
              </template>
              <template slot-scope="scope" slot="compensationRatio">
                <span>{{
                  scope.row.compensationRatio
                    ? scope.row.compensationRatio * 100 + '%'
                    : ''
                }}</span>
              </template>
            </tableList>
          </div>

          <el-divider class="margin-top20" />
          <p class="tableTitle">{{ language('LJQD', '零件清单') }}-Part List</p>
          <div class="margin-top20 formStyle">
            <!-- <div  class="btn ">
            <span type="primary" size="mini" circle @click="isruleTitle2=!isruleTitle2">{{isruleTitle2?'-':'+'}}</span>
          </div> -->
            <tableList
              border
              class="margin-top20 over_flow_y_ture"
              :tableData="partTableListData"
              :tableTitle="partTableListData.some((val)=>{if(val.materialCode.slice(1,6)=='01006') {return true}})?partTableTitle1_all:[...partTableTitle1_1,...partTableTitle1_2]"
              :tableLoading="loadingPart"
              :index="true"
              :tagNum="'1'"
              :selection="false"
              @handleSelectionChange="handleSelectionChange"
            >
              <template slot-scope="scope" slot="compensationPeriod">
                <span>{{
                  scope.row.compensationPeriod == 'A'
                    ? '年度'
                    : scope.row.compensationPeriod == 'H'
                    ? '半年度'
                    : scope.row.compensationPeriod == 'Q'
                    ? '季度'
                    : scope.row.compensationPeriod == 'M'
                    ? '月度'
                    : ''
                }}</span>
              </template>
              <template slot-scope="scope" slot="thresholdCompensationLogic">
                <span>{{
                  scope.row.thresholdCompensationLogic == 'A'
                    ? '全额补差'
                    : scope.row.thresholdCompensationLogic == 'B'
                    ? '超额补差'
                    : ''
                }}</span>
              </template>
              <template slot-scope="scope" slot="sapCode">
                <span>{{ scope.row.sapCode }}</span
                ><br />
                <span>{{ scope.row.supplierName }}</span>
              </template>
              <template slot-scope="scope" slot="materialCode">
                <span>{{ scope.row.materialCode }}</span
                ><br />
                <span>{{ scope.row.materialName }}</span>
              </template>
              <template slot-scope="scope" slot="materialDoseSource">
                <span>{{
                  scope.row.materialDoseSource
                    ? materialDoseSourceList.find(
                        (val) => val.code == scope.row.materialDoseSource
                      ).name
                    : ''
                }}</span>
              </template>
              <template slot-scope="scope" slot="method">
                <span>{{
                  scope.row.method == '1'
                    ? '一次性补差'
                    : scope.row.method == '2'
                    ? '变价单补差'
                    : ''
                }}</span>
              </template>
              <template slot-scope="scope" slot="avgPeriod">
                <span>{{
                  scope.row.avgPeriod || scope.row.avgPeriod == '0'
                    ? avgPeriodList.find(
                        (val) => val.code == scope.row.avgPeriod
                      ).name
                    : ''
                }}</span>
              </template>
              <template slot-scope="scope" slot="offsetMonth">
                <span>{{
                  scope.row.offsetMonth || scope.row.offsetMonth == '0'
                    ? offsetList.find((val) => val.code == scope.row.offsetMonth)
                        .name
                    : ''
                }}</span>
              </template>
              <template slot-scope="scope" slot="compensationRatio">
                <span>{{
                  scope.row.compensationRatio
                    ? scope.row.compensationRatio * 100 + '%'
                    : ''
                }}</span>
              </template>
            </tableList>
          </div>
        </iCard>
        <iCard class="margin-top20">
          <div slot="header" class="headBox">
            <p class="headTitle">{{ language('BEIZHU', '备注') }}-Remarks</p>
          </div>
          <iInput
            v-model="formData.linieMeetingMemo"
            class="margin-top10"
            :rows="8"
            :disabled="true"
            type="textarea"
          />
        </iCard>
        <iCard
          v-if="isMeeting && applayDateData.length > 0"
          class="margin-top20"
        >
          <p>
            {{ language('SHENQINGRIQI', '申请日期') }}:{{
              moment(new Date()).format('YYYY-MM-DD')
            }}
          </p>
          <div class="applayDateBox1">
            <div
              class="applayDateContent"
              v-for="(item, index) in applayDateData"
              :key="index"
            >
              <img
                class="margin-left5 applayDateIcon"
                :src="
                  item.taskStatus === '同意'
                    ? require('@/assets/images/icon/yes.png')
                    : require('@/assets/images/icon/no.png')
                "
                :fit="fit"
              />
              <div class="applayDateContentItem first_one">
                <span>部门：</span>
                <span class="applayDateDeptTitle">{{ item.deptFullCode }}</span>
              </div>
              <div class="applayDateContentItem">
                <span>审批人：</span>
                <span>{{ item.nameZh }}</span>
              </div>
              <div class="applayDateContentItem">
                <span>日期：</span>
                <span>{{ item.endTime }}</span>
              </div>
            </div>
          </div>
        </iCard>
      </div>
    </div>

    <iDialog
      :title="language('DAOCHU', '导出')"
      :visible.sync="signPreviewType"
      v-if="signPreviewType"
      append-to-body
      width="99%"
      @close="closeRS"
    >
      <signPreview :mtzAppId="formData.mtzAppId" :m1="true"></signPreview>
    </iDialog>
  </div>
</template>

<script>
import {
  iCard,
  icon,
  iInput,
  iButton,
  iMessage,
  iPagination,
  iDialog
} from 'rise'
import {
  formList,
  avgPeriodList,
  offsetList,
  materialDoseSourceList,
  tipList
} from './data'
import tableList from '@/components/commonTableFixed/index.vue'
import {
  ruleTableTitle1_1,
  partTableTitle1_1,
  partTableTitle1_2,
  ruleTableTitle1_all,
  partTableTitle1_all
} from './data'
import {
  getAppFormInfo,
  pageAppRule,
  pagePartMasterData,
  approvalList
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details'
import { pageMixins } from '@/utils/pageMixins'
import signPreview from './signPreview'
import iTooltip from '../../applyInfor/iTooltip'
export default {
  mixins: [pageMixins],
  components: {
    iTooltip,
    iCard,
    icon,
    iInput,
    iButton,
    iPagination,
    tableList,
    iDialog,
    signPreview
  },
  props: {
    RsType: { type: Boolean }
  },
  data() {
    return {
      tipList: tipList,
      avgPeriodList,
      offsetList,
      materialDoseSourceList,
      formData: {},
      formList,
      partTableTitle1_all,
      ruleTableTitle1_all,
      isruleTitle1: false,
      isruleTitle2: false,
      ruleTableTitle1_1,
      partTableTitle1_1,
      partTableTitle1_2,
      ruleTableListData: [],
      rulePageParams: {
        totalCount: 0,
        currPage: 1,
        pageSizes: 10,
        layout: 'sizes, prev, pager, next, jumper'
      },
      partTableListData: [],
      partPageParams: {
        totalCount: 0,
        currPage: 1,
        pageSizes: 10,
        layout: 'sizes, prev, pager, next, jumper'
      },
      loadingRule: false,
      loadingPart: false,
      applayDateData: [],
      moment: window.moment,
      signPreviewType: false,
      approve: true,
      clickRulesNumber: 0
    }
  },
  watch: {
    mtzObject(newVlue, oldValue) {}
  },
  created() {
    this.initApplayDateData()
    this.getAppFormInfo()
    this.getPageAppRule()
    this.getPagePartMasterData()
  },
  computed: {
    mtzObject() {
      return this.$store.state.location.mtzObject
    },
    title() {
      let res = ''
      switch (this.formData.flowType) {
        case 'MEETING':
          // 上会
          res = 'CSC 定点推荐 - MTZ  CSC Nomination Recommendation - MTZ'
          break
        case 'SIGN':
          // 流转
          res = '流转定点推荐 - MTZ Nomination Recommendation - MTZ'
          break
        case 'FILING':
          // 备案
          res = '备案定点推荐 - MTZ Nomination Recommendation - MTZ'
          break
        default:
          break
      }
      return res
    },
    isMeeting() {
      return (
        this.formData.flowType == 'MEETING' || this.formData.flowType == 'SIGN'
      )
    }
  },
  methods: {
    clickn() {
      this.$nextTick(() => {
        this.isruleTitle1 = true
      })
      console.log(this.isruleTitle1)
    },
    handleCurrentChangeTable(e) {
      this.clickRulesNumber = 1
      this.loadingPart = true
      var list = {
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
        pageNo: 1,
        pageSize: 99999,
        ruleNo: e.ruleNo
      }
      pagePartMasterData(list).then((res) => {
        if (res && res.code == 200) {
          this.partTableListData = res.data
          this.clickRulesNumber = 0
          this.loadingPart = false
        } else iMessage.error(res.desZh)
      })
    },
    rulesClick() {
      if (this.clickRulesNumber == 0) {
        this.loadingPart = true
        var list = {
          mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
          pageNo: 1,
          pageSize: 99999
        }
        pagePartMasterData(list).then((res) => {
          if (res && res.code == 200) {
            this.partTableListData = res.data
            this.loadingPart = false
          } else iMessage.error(res.desZh)
        })
      }
    },
    closeRS() {
      this.signPreviewType = false
    },
    handleClickExport() {
      this.signPreviewType = true
    },
    initApplayDateData() {
      approvalList({
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId
      }).then((res) => {
        if (res?.code === '200') {
          let data = res.data
          this.applayDateData = data
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    // 获取申请单信息
    getAppFormInfo() {
      getAppFormInfo({
        mtzAppId: this.$route.query.mtzAppId
      }).then((res) => {
        if (res && res.code == 200) {
          this.formData = res.data

          if (Number(this.$route.query.approve) == 1) {
            if (
              res.data.appStatus == '流转中' ||
              res.data.appStatus == '复核中'
            ) {
              this.approve = false
            }
          }
        } else iMessage.error(res.desZh)
      })
    },
    // 获取规则清单表格数据
    getPageAppRule() {
      var list = {}
      list = {
        mtzAppId: this.$route.query.mtzAppId,
        pageNo: 1,
        pageSize: 99999
      }

      pageAppRule(list).then((res) => {
        if (res && res.code == 200) {
          this.ruleTableListData = res.data
          this.rulePageParams.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
    // 获取零件清单表格数据
    getPagePartMasterData() {
      var list = {}
      list = {
        mtzAppId: this.$route.query.mtzAppId,
        pageNo: 1,
        pageSize: 99999
      }

      pagePartMasterData(list).then((res) => {
        if (res && res.code == 200) {
          this.partTableListData = res.data
          this.partPageParams.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$tabsInforHeight: 35px;

.tabsBoxWrap {
  position: fixed !important;
  left: 0;
  right: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 2000;
  overflow-y: auto;
  background: white !important;
}
.formStyle {
  position: relative;
}
.btn {
  display: inline-block;
  text-align: center;
  line-height: 20px;
  width: 20px;
  height: 20px;
  font-size: 14px;
  background-color: #1763f7;
  color: white;
  border-radius: 50%;
  position: absolute;
  right: -10px;
  top: 10px;
  z-index: 100;
}
.sign_swap {
  width: 100%;
  height: 100%;
}
.tableTitle {
  display: inline-block;
  font-weight: bold;
  font-family: Arial;
  color: #000000;
  opacity: 1;
  font-size: 18px;
}
.headBox {
  position: relative;
  justify-content: space-between;
  width: 100%;
  display: flex;
  .headTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }
  .buttonBox {
    position: absolute;
    right: 13px;
  }
}
.applayDateBox1 {
  display: flex;
  align-items: center;
  flex-flow: wrap;
  margin-top: 20px;
}
.applayDateIcon {
  margin-top: 10px;
  width: 33px;
  height: 33px;
}
::v-deep.el-button--mini.is-circle {
  padding: 3px 4px;
}
.applayDateContentItem {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  padding: 0 20px;
  font-size: 16px;
  .applayDateDeptTitle {
    font-weight: bold;
  }
}
.applayDateContent {
  display: inline-block;
  background-color: #cdd4e2;
  height: 178px;
  width: 16%;
  margin: 10px 0.3% 0;
  border-radius: 15px;
  text-align: center;
}
.tabsBoxInfor {
  margin-bottom: 10px;
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  .inforDiv {
    width: 29%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;
    margin-bottom: 20px;
    span {
      font-size: 15px;
    }
    .inforText {
      font-size: 14px;
      padding: 10px 10px;
      width: 68%;
      min-height: $tabsInforHeight;
      height: auto;
      background: #f8f8fa;
      text-align: center;
    }
  }
}

.download_btn {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-right: 20px;
}

::v-deep .el-form {
  .el-table {
    .cell {
      padding: 0 !important;

      span {
        margin-right: 0px !important;
      }
    }
  }
}

.centerBox {
  margin: 20px 0;

  p {
    font-size: 16px;
  }
  .enStyle {
    display: flex;
    justify-content: space-between;
  }
}

.tabs_box_right {
  .samll_title {
    width: 80px;
  }
  .small_text {
    float: left;
  }
  div {
    display: flex;
    align-items: flex-start;
    margin-right: 20px;
  }
  span {
    display: inline-block;
    font-size: 15px !important;
  }
}
.hr_divider {
  margin: 0 1.5rem 0 0;
}
::v-deep .cardHeader {
  padding: 1.875rem 1.5625rem 0 2.4rem !important;
}
.infor_futitle {
  padding: 0.5rem 0;
  font-size: 15px !important;
  line-height: 25px;
  .big_font {
    font-weight: bold;
  }
  .big_small {
    padding-left: 15px;
  }
}
.upload_hr {
  ::v-deep .cardBody {
    padding-top: 0px !important;
  }
}
.over_flow_y_ture {
  ::v-deep .el-table__body-wrapper {
    max-height: 300px;
    overflow-y: auto;
  }
}

::v-deep .el-form-item__content {
  line-height: 20px !important;
}
.first_one {
  margin-top: 30px !important;
}
::v-deep .el-table {
  border-radius: 0;
  font-size: 18px;
  .el-table__header {
    background-color: #364d6e;
    th {
      border-color: #d9d9d9;
      .cell {
        color: #fff;
        line-height: 20px;
      }
    }
  }
  td {
    border-color: #d9d9d9;
    .cell {
      line-height: 20px;
    }
    .mtz-box {
      width: 100%;
      display: inline-flex;
      justify-content: space-between;
      align-items: center;
      .text {
        flex: 1;
      }
      .mtz {
        height: 18px;
        vertical-align: bottom;
      }
    }
  }

  .tooltip {
    width: 100%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
</style>
