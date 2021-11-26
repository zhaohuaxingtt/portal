<!--
 * @Author: youyuan
 * @Date: 2021-10-28 16:45:22
 * @LastEditTime: 2021-11-26 16:25:15
 * @LastEditors: Please set LastEditors
 * @Description: mtz
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\components\mtz.vue
-->
<template>
  <div>
    <div class="download_btn">
      <iButton v-if="!RsObject"
               @click="downPdf">{{language('DAOCHUPDF','导出PDF')}}</iButton>
    </div>
    <div ref="qrCodeDiv"
         id="qrCodeDiv"
         style="padding-bottom:30px;">
      <iCard>
        <div slot="header"
             class="headBox">
          <p class="headTitle">{{title}}</p>
          <span class="buttonBox"
                v-if="!editMode">
            <iButton v-if="RsObject && formData.flowTypeName == '流转'"
                     @click="handleToSignPreview">{{language('DAOCHUHUIWAILIUZHUANDAN', '导出会外流转单')}}</iButton>
          </span>
        </div>

        <div class="tabsBoxInfor">
          <div class="inforDiv"
               v-for="(item,index) in formList"
               :key="index">
            <span>{{language(item.key,item.name)}}</span>
            <span class="inforText">{{formData[item.prop]}}</span>
          </div>
        </div>
        <el-divider v-if="RsObject" />
        <el-divider v-if="!RsObject && ruleTableListData.length>0" />
        <p class="tableTitle"
           v-if="RsObject">{{language('GUIZEQINGDAN', '规则清单')}}</p>
        <p class="tableTitle"
           v-if="!RsObject && ruleTableListData.length>0">{{language('GUIZEQINGDAN', '规则清单')}}</p>
        <!-- :renderHeader="renderHeader" -->
        <tableList class="margin-top20"
                   :tableData="ruleTableListData"
                   :tableTitle="ruleTableTitle1"
                   :tableLoading="loading"
                   :index="true"
                   v-if="RsObject"
                   :selection="false"
                   @handleSelectionChange="handleSelectionChange">
          <template slot-scope="scope"
                    slot="compensationPeriod">
            <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
          </template>
          <template slot-scope="scope"
                    slot="thresholdCompensationLogic">
            <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
          </template>
        </tableList>
        <tableList class="margin-top20"
                   :tableData="ruleTableListData"
                   :tableTitle="ruleTableTitle1_1"
                   :tableLoading="loading"
                   v-if="!RsObject && ruleTableListData.length>0"
                   :index="true"
                   :selection="false"
                   @handleSelectionChange="handleSelectionChange">
          <template slot-scope="scope"
                    slot="compensationPeriod">
            <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
          </template>
          <template slot-scope="scope"
                    slot="thresholdCompensationLogic">
            <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
          </template>
        </tableList>
        <tableList class="margin-top20"
                   :tableData="ruleTableListData"
                   v-if="!RsObject && ruleTableListData.length>0"
                   :tableTitle="ruleTableTitle1_2"
                   :tableLoading="loading"
                   :index="true"
                   :selection="false"
                   @handleSelectionChange="handleSelectionChange">
          <template slot-scope="scope"
                    slot="compensationPeriod">
            <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
          </template>
          <template slot-scope="scope"
                    slot="thresholdCompensationLogic">
            <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
          </template>
        </tableList>
        <el-divider v-if="RsObject" />
        <el-divider class="margin-top20"
                    v-if="!RsObject && partTableListData.length>0" />
        <p class="tableTitle"
           v-if="RsObject">{{language('LJQD', '零件清单')}}</p>
        <p class="tableTitle"
           v-if="!RsObject && partTableListData.length>0">{{language('LJQD', '零件清单')}}</p>
        <tableList class="margin-top20"
                   :tableData="partTableListData"
                   :tableTitle="partTableTitle1"
                   :tableLoading="loading"
                   v-if="RsObject"
                   :index="true"
                   :selection="false"
                   @handleSelectionChange="handleSelectionChange">
          <template slot-scope="scope"
                    slot="compensationPeriod">
            <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
          </template>
          <template slot-scope="scope"
                    slot="thresholdCompensationLogic">
            <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
          </template>
        </tableList>
        <tableList class="margin-top20"
                   :tableData="partTableListData"
                   :tableTitle="partTableTitle1_1"
                   :tableLoading="loading"
                   v-if="!RsObject && partTableListData.length>0"
                   :index="true"
                   :selection="false"
                   @handleSelectionChange="handleSelectionChange">
          <template slot-scope="scope"
                    slot="compensationPeriod">
            <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
          </template>
          <template slot-scope="scope"
                    slot="thresholdCompensationLogic">
            <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
          </template>
        </tableList>
        <tableList class="margin-top20"
                   :tableData="partTableListData"
                   :tableTitle="partTableTitle1_2"
                   :tableLoading="loading"
                   v-if="!RsObject && partTableListData.length>0"
                   :index="true"
                   :selection="false"
                   @handleSelectionChange="handleSelectionChange">
          <template slot-scope="scope"
                    slot="compensationPeriod">
            <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
          </template>
          <template slot-scope="scope"
                    slot="thresholdCompensationLogic">
            <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
          </template>
        </tableList>
      </iCard>
      <iCard class="margin-top20">
        <div slot="header"
             class="headBox">
          <p class="headTitle">{{language('BEIZHU', '备注')}}</p>
          <span class="buttonBox">
            <iButton v-if="RsObject"
                     @click="handleClickSave">{{language('BAOCUN', '保存')}}</iButton>
          </span>
        </div>
        <iInput v-model="formData.linieMeetingMemo"
                class="margin-top10"
                :rows="8"
                type="textarea" />
      </iCard>
      <iCard v-if="isMeeting"
             class="margin-top20">
        <p>{{language('SHENQINGRIQI', '申请日期')}}: 2020-01-01</p>
        <div :class="RsObject?'applayDateBox':'applayDateBox1'">
          <div class="applayDateContent"
               v-for="(item, index) in applayDateData"
               :key="index">
            <icon v-if="item.flag"
                  class="margin-left5 applayDateIcon"
                  symbol
                  name="iconrs-wancheng"></icon>
            <icon v-if="!item.flag"
                  class="margin-left5 applayDateIcon"
                  symbol
                  name="iconrs-quxiao"></icon>
            <div class="applayDateContentItem">
              <span>部门：</span>
              <span class="applayDateDeptTitle">{{item.dept}}</span>
            </div>
            <div class="applayDateContentItem">
              <span>日期：</span>
              <span>{{item.date}}</span>
            </div>
          </div>
        </div>
      </iCard>
    </div>
  </div>
</template>

<script>
import { iCard, icon, iInput, iButton, iMessage, iPagination } from 'rise'
import { formList } from './data'
import tableList from '@/components/commonTable/index.vue'
import { ruleTableTitle1, ruleTableTitle1_1, ruleTableTitle1_2, partTableTitle1, partTableTitle1_1, partTableTitle1_2 } from './data'
import { getAppFormInfo, pageAppRule, pagePartMasterData, fetchSaveCs1Remark } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details'
import { pageMixins } from '@/utils/pageMixins'
import { downloadPDF, dataURLtoFile } from "@/utils/pdf";
// import { uploadUdFile } from "@/api/file/upload";
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    icon,
    iInput,
    iButton,
    iPagination,
    tableList
  },
  props: {
    RsType: { type: Boolean }
  },
  data () {
    return {
      formData: {},
      formList,
      ruleTableTitle1: ruleTableTitle1,
      ruleTableTitle1_1,
      ruleTableTitle1_2,
      partTableTitle1: partTableTitle1,
      partTableTitle1_1,
      partTableTitle1_2,
      ruleTableListData: [],
      rulePageParams: {
        totalCount: 0,
        currPage: 1,
        pageSizes: 10,
        layout: 'sizes, prev, pager, next, jumper',
      },
      partTableListData: [],
      partPageParams: {
        totalCount: 0,
        currPage: 1,
        pageSizes: 10,
        layout: 'sizes, prev, pager, next, jumper',
      },
      applayDateData: [],
      RsObject: true,
    }
  },
  watch: {
    mtzObject (newVlue, oldValue) {

    }
  },
  created () {
    if (this.RsType) {
      this.RsObject = false;
    }
    this.initApplayDateData()
    this.getAppFormInfo()
    this.getPageAppRule()
    this.getPagePartMasterData()
  },
  computed: {
    mtzObject () {
      return this.$store.state.location.mtzObject;
    },
    title () {
      let res = ''
      switch (this.formData.flowType) {
        case 'MEETING':
          // 上会
          res = 'CSC 定点推荐 - MTZ  CSC Nomination Recommendation - MTZ'
          break;
        case 'SIGN':
          // 流转
          res = '流转定点推荐 - MTZ Nomination Recommendation - MTZ'
          break;
        case 'FILING':
          // 备案
          res = '备案定点推荐 - MTZ Nomination Recommendation - MTZ'
          break;
        default:
          break;
      }
      return res
    },
    isMeeting () {
      return this.formData.flowType == 'MEETING'
    },
  },
  methods: {
    downPdf () {
      // console.log(this.title)
      var name = "";
      if (this.title == "") {
        name = "RS导出"
      } else {
        name = this.title;
      }
      downloadPDF({
        idEle: 'qrCodeDiv',
        pdfName: name,
        exportPdf: true,
        waterMark: true,
        callback: async (pdf, pdfName) => {
          try {
            const filename = pdfName.replaceAll(/\./g, '_') + ".pdf";
            const pdfFile = pdf.output("datauristring");
            const blob = dataURLtoFile(pdfFile, filename);
          } catch {
            iMessage.error(this.language('SHENGCHENGSHIBAI', '生成失败'));
          }
        },
      })
    },
    initApplayDateData () {
      panorama().then(res => { })
      // this.applayDateData = [
      //   { flag: true, dept: 'TL', date: '2020-01-01' },
      //   { flag: true, dept: 'TL', date: '2020-01-01' },
      //   { flag: true, dept: 'TL', date: '2020-01-01' },
      //   { flag: true, dept: 'TL', date: '2020-01-01' },
      //   { flag: true, dept: 'TL', date: '2020-01-01' },
      //   { flag: true, dept: 'TL', date: '2020-01-01' },
      //   { flag: true, dept: 'TL', date: '2020-01-01' },
      //   { flag: true, dept: 'TL', date: '2020-01-01' },
      //   { flag: true, dept: 'TL', date: '2020-01-01' },
      // ]
    },
    // 获取申请单信息
    getAppFormInfo () {
      getAppFormInfo({
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId
      }).then(res => {
        if (res && res.code == 200) {
          this.formData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取规则清单表格数据
    getPageAppRule () {
      var list = {};
      // if (this.RsObject) {
      // list = {
      //   mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
      //   pageNo: this.rulePageParams.currPage,
      //   pageSize: this.rulePageParams.pageSize,
      // }
      // } else {
      list = {
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
        pageNo: 1,
        pageSize: 99999,
      }
      // }
      pageAppRule(list).then(res => {
        if (res && res.code == 200) {
          this.ruleTableListData = res.data
          this.rulePageParams.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
    // 获取零件清单表格数据
    getPagePartMasterData () {
      var list = {};
      // if (this.RsObject) {
      //   list = {
      //     mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
      //     pageNo: this.partPageParams.currPage,
      //     pageSize: this.partPageParams.pageSize,
      //   }
      // } else {
      list = {
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
        pageNo: 1,
        pageSize: 99999,
      }
      // }
      pagePartMasterData(list).then(res => {
        if (res && res.code == 200) {
          this.partTableListData = res.data
          this.partPageParams.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
    // 点击保存
    handleClickSave () {
      let params = {}
      // if (this.isMeeting) {
      params = {
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
        linieMeetingMemo: this.formData.linieMeetingMemo
      }
      // }
      //  else if (this.isFinite) {
      //   params = {
      //     mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
      //     cs1MeetingMemo: this.formData.cs1MeetingMemo
      //   }
      // }
      fetchSaveCs1Remark(params).then(res => {
        if (res && res.code == 200) {
          this.getAppFormInfo()
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    },
    // 导出会外流转单
    handleToSignPreview () {
      const { href } = this.$router.resolve({
        path: '/mtz/annualGeneralBudget/locationChange/MtzLocationPoint/signPreview',
        query: {
          mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
        }
      })
      window.open(href, '_blank')
    },
    // renderHeader (h, { column, $index }) {
    //   console.log(h, column)
    // }
  }
}
</script>

<style lang='scss' scoped>
$tabsInforHeight: 35px;

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
  .headTitle {
    display: inline-block;
    font-weight: bold;
    font-family: Arial;
    color: #000000;
    opacity: 1;
  }
  .buttonBox {
    position: absolute;
    right: 0;
  }
}
.applayDateBox1 {
  display: flex;
  align-items: center;
  flex-flow: wrap;
  margin-top: 20px;
}
.applayDateBox {
  overflow-x: scroll;
  margin: 20px 0;
  padding-bottom: 20px;
  white-space: nowrap;
}
.applayDateIcon {
  margin-top: 10px;
  font-size: 30px;
}
.applayDateContentItem {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
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
  padding-top: 10px;
  padding-bottom: 20px;
}
</style>
