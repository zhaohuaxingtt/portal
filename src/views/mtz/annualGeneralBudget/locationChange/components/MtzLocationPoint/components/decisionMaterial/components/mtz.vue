<!--
 * @Author: youyuan
 * @Date: 2021-10-28 16:45:22
 * @LastEditTime: 2021-11-29 10:54:35
 * @LastEditors: Please set LastEditors
 * @Description: mtz
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\components\mtz.vue
-->
<template>
  <div style="padding-bottom:30px;">
    <div class="download_btn">
      <iButton v-if="!RsObject"
               @click="downPdf">{{language('DAOCHUPDF','导出PDF')}}</iButton>
    </div>
    <!-- RsObject?mtz决策资料:导出 -->
    <div ref="qrCodeDiv"
         id="qrCodeDiv"
           @click="rulesClick()"
         style="position:relative;"
        >
      <div class="content_dialog" v-if="!RsObject && (formData.appStatus == '流转完成' || formData.appStatus == '定点')"></div>
      <iCard class='upload_hr' id="tabsBoxTitle">
      <!-- <iCard :class="!RsObject?'upload_hr':''"> -->
        <div slot="header"
             class="headBox"
             >
          <p class="headTitle">{{title}}</p>
          <span class="buttonBox"
                style="margin-top:-10px;"
                v-if="!editMode">
            <iButton v-if="RsObject && formData.flowTypeName == '流转' && !(formData.appStatus == '流转完成' || formData.appStatus == '定点' || formData.appStatus == '未通过')"
                     @click="handleToSignPreview">{{language('DAOCHUHUIWAILIUZHUANDAN', '导出会外流转单')}}</iButton>
          </span>
          <!-- <div class="tabs_box_right"> -->
          <div class="tabs_box_right" v-if="meetingType">
            <div class="big_text">
              <span class="samll_val">{{formData.mtzAppId}}-{{formData.appName}}</span>
            </div>
            <div class="small_text">
              <!-- <span>{{language("SHENQINGRIQI","申请日期")}}：</span> -->
              <span>Application date：</span>
              <span class="samll_val">{{formData.createDate}}</span>
            </div>
            <div class="small_text">
              <!-- <span>{{language("KESHI","科室")}}：</span> -->
              <span>Commodity：</span>
              <span class="samll_val">{{formData.linieDeptName}}</span>
            </div>
            <div>
              <!-- <span>{{language("CAIGOUYUAN","采购员")}}：</span> -->
              <span>Buyer：</span>
              <span class="samll_val">{{formData.linieNameEn}}</span>
            </div>
          </div>
        </div>
        <el-divider class="hr_divider" />
        
        <div class="infor_futitle">
          <span class="big_font">Regulation:</span>
          <br />
          <span class="big_font">MTZ Payment=(Effective Price-Base Price)*Raw Material Weight*Settle accounts Quantity*Ratio</span>
          <span class="big_small">When:effective price > base price *(1+threshold)</span>
        </div>

        <p class="tableTitle"
           v-if="RsObject">{{language('GUIZEQINGDAN', '规则清单')}}-Regulation</p>
        <p class="tableTitle"
           v-if="!RsObject && ruleTableListData.length>0">{{language('GUIZEQINGDAN', '规则清单')}}-Regulation</p>
        <!-- highlight-current-row -->
        <tableList class="margin-top20"
                    ref="moviesTable"
                   :tableData="ruleTableListData"
                   :tableTitle="ruleTableTitle1_1"
                   @handleClickRow="handleCurrentChangeTable"
                   :tableLoading="loadingRule"
                   :index="true"
                   v-if="RsObject"
                   :selection="false"
                   >
          <template slot-scope="scope"
                    slot="compensationPeriod">
            <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
          </template>
          <template slot-scope="scope"
                    slot="thresholdCompensationLogic">
            <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
          </template>
          <template slot-scope="scope"
            slot="supplierId">
            <span>{{scope.row.supplierId}}</span><br/>
            <span>{{scope.row.supplierName}}</span>
          </template>
        </tableList>
        <!-- 导出规则表格 -->
        <tableList class="margin-top20"
                   :tableData="ruleTableListData"
                   :tableTitle="ruleTableTitle1_1"
                   :tableLoading="loadingRule"
                   v-if="!RsObject && ruleTableListData.length>0"
                   :index="true"
                   :selection="false"
                   >
          <template slot-scope="scope"
            slot="supplierId">
            <span>{{scope.row.supplierId}}</span><br/>
            <span>{{scope.row.supplierName}}</span>
          </template>
          <template slot-scope="scope"
                    slot="compensationPeriod">
            <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
          </template>
        </tableList>

        <el-divider v-if="RsObject" />
        <el-divider class="margin-top20"
                    v-if="!RsObject && partTableListData.length>0" />
        <p class="tableTitle"
           v-if="RsObject">{{language('LJQD', '零件清单')}}-Part List</p>
        <p class="tableTitle"
           v-if="!RsObject && partTableListData.length>0">{{language('LJQD', '零件清单')}}-Part List</p>
        <tableList class="margin-top20 over_flow_y_ture"
                   :tableData="partTableListData"
                   :tableTitle="partTableTitle1_1"
                   :tableLoading="loadingPart"
                   v-if="RsObject"
                   :index="true"
                   :selection="false"
                   >
          <template slot-scope="scope"
                    slot="compensationPeriod">
            <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
          </template>
          <!-- <template slot-scope="scope"
                    slot="thresholdCompensationLogic">
            <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
          </template> -->
          <template slot-scope="scope"
                    slot="supplierId">
            <span>{{scope.row.supplierId}}</span><br/>
            <span>{{scope.row.supplierName}}</span>
          </template>
        </tableList>
        <!-- 导出零件表格 -->
        <tableList class="margin-top20"
                   :tableData="partTableListData"
                   :tableTitle="partTableTitle1_1"
                   :tableLoading="loadingPart"
                   v-if="!RsObject && partTableListData.length>0"
                   :index="true"
                   :selection="false"
                   >
          <template slot-scope="scope"
                    slot="supplierId">
            <span>{{scope.row.supplierId}}</span><br/>
            <span>{{scope.row.supplierName}}</span>
          </template>
          <template slot-scope="scope"
                    slot="compensationPeriod">
            <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
          </template>
        </tableList>
      </iCard>
      <iCard class="margin-top20">
        <div slot="header"
             class="headBox">
          <p class="headTitle">{{language('BEIZHU', '备注')}}-Remarks</p>
          <span class="buttonBox">
            <iButton v-if="RsObject && (formData.appStatus == '草稿' || formData.appStatus == '未通过') && meetingNumber == 0"
                    @click="handleClickSave($event)" v-permission="PORTAL_MTZ_POINT_JUECEDATA_BAOCUN">{{language('BAOCUN', '保存')}}</iButton>
          </span>
        </div>
        <iInput v-model="formData.linieMeetingMemo"
                :disabled="!((formData.appStatus == '草稿' || formData.appStatus == '未通过') && RsObject && meetingNumber == 0)"
                class="margin-top10"
                :rows="8"
                type="textarea" />
      </iCard>
      <iCard v-if="isMeeting && applayDateData.length>0"
             class="margin-top20">
        <p>{{language('SHENQINGRIQI', '申请日期')}}:{{moment(new Date()).format('YYYY-MM-DD')}}</p>
        <div :class="RsObject?'applayDateBox':'applayDateBox1'">
          <div class="applayDateContent"
               v-for="(item, index) in applayDateData"
               :key="index">
            <img class="margin-left5 applayDateIcon"
               :src="item.taskStatus==='同意'?require('@/assets/images/icon/yes.png'):require('@/assets/images/icon/no.png')"
               :fit="fit" />
            <div class="applayDateContentItem first_one">
              <span>部门：</span>
              <span class="applayDateDeptTitle">{{item.deptFullCode}}</span>
            </div>
            <div class="applayDateContentItem">
              <span>审批人：</span>
              <span>{{item.nameZh}}</span>
            </div>
            <div class="applayDateContentItem">
              <span>日期：</span>
              <span>{{item.endTime}}</span>
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
import {
    ruleTableTitle1_1, 
    partTableTitle1_1, 
} from './data'
import { getAppFormInfo, pageAppRule, pagePartMasterData, fetchSaveCs1Remark, approvalList } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details'
import { pageMixins } from '@/utils/pageMixins'
import { downloadPDF, dataURLtoFile,transverseDownloadPDF } from "@/utils/pdf";
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
      formData: {

      },
      formList,
      ruleTableTitle1_1,
      partTableTitle1_1,
      ruleTableListData: [],
      partTableListData: [],
      loadingRule:false,
      loadingPart:false,
      applayDateData: [],
      RsObject: true,
      moment: window.moment,
      meetingNumber:Number(this.$route.query.meeting) || 0,
      meetingType:false,
      clickRulesNumber:0,
    }
  },
  watch: {
    mtzObject (newVlue, oldValue) {
      this.getAppFormInfo();
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
      return this.formData.flowType == 'MEETING' || this.formData.flowType == 'SIGN'
    },
  },
  methods: {
    handleCurrentChangeTable(e){
      this.clickRulesNumber = 1;
      this.loadingPart = true;
      var list = {
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
        pageNo: 1,
        pageSize: 99999,
        ruleNo:e.ruleNo,
      }
      pagePartMasterData(list).then(res => {
        if (res && res.code == 200) {
          this.partTableListData = res.data
          this.clickRulesNumber = 0;
          this.loadingPart = false;
        } else iMessage.error(res.desZh)
      })
    },
    rulesClick(){
      if(!this.RsObject) return false;
      if(this.clickRulesNumber == 0){
        this.loadingPart = true;
        var list = {
          mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
          pageNo: 1,
          pageSize: 99999,
        }
        pagePartMasterData(list).then(res => {
          if (res && res.code == 200) {
            this.partTableListData = res.data
            this.loadingPart = false;
          } else iMessage.error(res.desZh)
        })
      }
    },
    downPdf () {
      var name = "";
      if (this.title == "") {
        name = "RS导出"
      } else {
        name = this.title;
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      transverseDownloadPDF({
        idEle: 'qrCodeDiv',
        pdfName: name,
        exportPdf: true,
        waterMark: true,
        title:['#tabsBoxTitle .cardHeader'],//顶部页眉dom节点
        callback: async (pdf, pdfName) => {
          try {
            loading.close();
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
      approvalList({ mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId }).then(res => {
        if (res?.code === '200') {
          let data = res.data
          this.applayDateData = data
        } else {
          iMessage.error(res.desZh)
        }
      })

    },
    // 获取申请单信息
    getAppFormInfo () {
      getAppFormInfo({
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId
      }).then(res => {
        if (res && res.code == 200) {
          this.formData = res.data

          if(this.formData.flowType == "SIGN" && !(this.formData.appStatus == '流转完成' || this.formData.appStatus == '定点' || this.formData.appStatus == '未通过')){
            if(this.meetingNumber == 0){
              if(this.RsObject){
                this.meetingType = false;
              }else{
                this.meetingType = true;
              }
            }else{
              this.meetingType = true;
            }
          }else{
            this.meetingType = true;
          }
        } else iMessage.error(res.desZh)
      })
    },
    // 获取规则清单表格数据
    getPageAppRule () {
      var list = {};
      
      list = {
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
        pageNo: 1,
        pageSize: 99999,
      }
      // }
      pageAppRule(list).then(res => {
        if (res && res.code == 200) {
          this.ruleTableListData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取零件清单表格数据
    getPagePartMasterData () {
      var list = {};
      
      list = {
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
        pageNo: 1,
        pageSize: 99999,
      }
      // }
      pagePartMasterData(list).then(res => {
        if (res && res.code == 200) {
          this.partTableListData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 点击保存
    handleClickSave (el) {
      // console.log(el)
      el.cancelBubble=true
      let params = {}
      params = {
        mtzAppId: this.mtzObject.mtzAppId || this.$route.query.mtzAppId,
        linieMeetingMemo: this.formData.linieMeetingMemo?this.formData.linieMeetingMemo:""
      }
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
  }
}
</script>

<style lang='scss' scoped>
$tabsInforHeight: 35px;

::v-deep .cardHeader{
  padding:1.875rem 1.5625rem 0 2.4rem!important;
}

.tableTitle {
  display: inline-block;
  font-weight: bold;
  font-family: Arial;
  color: #000000;
  opacity: 1;
  font-size: 18px;
}
.table_right {
  display: inline-block;
  font-family: Arial;
  color: #000000;
  font-size: 18px;
  width:100%;
  text-align: end;
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
.applayDateBox {
  overflow-x: scroll;
  margin: 20px 0;
  padding-bottom: 20px;
  white-space: nowrap;
}
.applayDateIcon {
  width:33px;
  height:33px;
  margin-top: 10px;
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
.first_one{
  margin-top: 30px!important;
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
.content_dialog{
  width:100%;
  height:100%;
  position: absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  background:url("~@/assets/images/icon/pass.png");
  z-index: 100000;
  opacity:0.07;
}

::v-deep .el-form{
  .el-table{
    .cell{
      padding:0!important;

      span{
        margin-right:0px!important;
      }
    }
  }
}
.over_flow_y_ture{
  ::v-deep .el-table__body-wrapper{
    max-height: 300px;
    overflow-y: auto;
  }
}


.infor_futitle{
  padding:0.5rem 0;
  font-size:15px!important;
  line-height:25px;
  .big_font{
    font-weight: bold;
  }
  .big_small{
    padding-left:15px;
  }
}
.hr_divider{
  margin:0 1.5rem 0 0;
}
.tabs_box_right{

  .samll_title{
    width:80px;
  }
  div{
    display: flex;
    align-items: flex-start;
    margin-right:20px;
  }
  span{
    display: inline-block;
    font-size: 15px!important;
  }
  .small_text{
    float:left;
  }

}

.upload_hr{
  ::v-deep .cardBody{
    padding-top:0px!important;
  }
}

::v-deep .el-form-item__content{
  line-height: 20px!important;
}
</style>
