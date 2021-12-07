<!--
 * @Author: youyuan
 * @Date: 2021-11-04 10:02:28
 * @LastEditTime: 2021-11-10 14:12:02
 * @LastEditors: Please set LastEditors
 * @Description: 会外流转单pdf预览
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\decisionMaterial\components\signPreview.vue
-->
<template>
  <div style="padding-bottom:30px;">
    <span class="download_btn" v-if="!editMode">
      <iButton @click="handleClickExport" :loading="exportButtonLoading">{{language('DAOCHU', '导出')}}</iButton>
    </span>
    <div id="content">
      <div class="content_dialog" v-if="m1&&(formData.appStatus == '流转完成' || formData.appStatus == '定点')"></div>
      <iCard>
        <div slot="header" class="headBox">
          <p class="headTitle">{{title}}</p>
        </div>
        <!-- label -->
        <div class="tabsBoxInfor">
          <div class="inforDiv"
              v-for="(item,index) in formList"
              :key="index">
            <span>{{language(item.key,item.label)}}</span>
            <span
                  class="inforText"
                  >{{formData[item.prop]}}</span>
          </div>
        </div>
        <el-divider v-if="ruleTableListData.length>0" />
        <p class="tableTitle" v-if="ruleTableListData.length>0">{{language('GUIZEQINGDAN', '规则清单')}}</p>
        <tableList
          class="margin-top20"
          :tableData="ruleTableListData"
          v-if="ruleTableListData.length>0"
          :tableTitle="ruleTableTitle1_1"
          :tableLoading="loading"
          :index="true"
          :selection="false">
        </tableList>
        <tableList
          class="margin-top20"
          :tableData="ruleTableListData"
          :tableTitle="ruleTableTitle1_2"
          v-if="ruleTableListData.length>0"
          :tableLoading="loading"
          :index="true"
          :selection="false">
          <template slot-scope="scope" slot="compensationPeriod">
            <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
          </template>
          <template slot-scope="scope" slot="thresholdCompensationLogic">
            <span>{{scope.row.thresholdCompensationLogic == "A"?"全额补差":scope.row.thresholdCompensationLogic == "B"?"超额补差":""}}</span>
          </template>
        </tableList>

        <el-divider class="margin-top20" v-if="partTableListData.length>0" />
        <p class="tableTitle" v-if="partTableListData.length>0">{{language('LJQD', '零件清单')}}</p>
        <tableList
          class="margin-top20"
          :tableData="partTableListData"
          :tableTitle="partTableTitle1_1"
          v-if="partTableListData.length>0"
          :tableLoading="loading"
          :index="true"
          :selection="false">
          <template slot-scope="scope"
                  slot="supplierId">
          <span>{{scope.row.supplierId}}/{{scope.row.supplierName}}</span>
        </template>
        </tableList>
        <tableList
          class="margin-top20"
          :tableData="partTableListData"
          :tableTitle="partTableTitle1_2"
          v-if="partTableListData.length>0"
          :tableLoading="loading"
          :index="true"
          :selection="false">
          <template slot-scope="scope" slot="compensationPeriod">
            <span>{{scope.row.compensationPeriod == "A"?"年度":scope.row.compensationPeriod == "H"?"半年度":scope.row.compensationPeriod == "Q"?"季度":scope.row.compensationPeriod == "M"?"月度":""}}</span>
          </template>
        </tableList>
      
      </iCard>
      <iCard class="margin-top20">
        <div slot="header"
            class="headBox">
          <p class="headTitle">{{language('BEIZHU', '备注')}}</p>
        </div>
        <iInput v-model="formData.linieMeetingMemo"
                class="margin-top10"
                :rows="8"
                type="textarea" />
      </iCard>
      <iCard v-if="applayDateData.length>0" class="margin-top20">
        <p>{{language('SHENQINGRIQI','申请日期')}}:{{moment(new Date()).format('YYYY-MM-DD')}}</p>
        <div class="applayDateBox1">
          <div class="applayDateContent"
               v-for="(item, index) in applayDateData"
               :key="index">
            <icon v-if="item.taskStatus==='同意'"
                  class="margin-left5 applayDateIcon"
                  symbol
                  name="iconrs-wancheng"></icon>
            <icon v-else
                  class="margin-left5 applayDateIcon"
                  symbol
                  name="iconrs-quxiao"></icon>
            <div class="applayDateContentItem">
              <span>部门：</span>
              <span class="applayDateDeptTitle">{{item.deptNameZh}}</span>
            </div>
            <div class="applayDateContentItem">
              <span>日期：</span>
              <span>{{item.endTime}}</span>
            </div>
          </div>
        </div>
      </iCard>
      <div class="margin-top30 deptBox" v-if="!m1">
        <div class="deptItem" v-for="(item, index) in deptData" :key="index">
          <p>{{item.approvalDepartment}}：</p>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { iCard, icon, iInput, iButton, iMessage, iPagination } from 'rise'
import { formList } from './data'
import tableList from '@/components/commonTable/index.vue'
import { ruleTableTitle1_1,ruleTableTitle1_2, partTableTitle1_1,partTableTitle1_2,ruleTableTitle2_1,ruleTableTitle2_2,partTableTitle2_1,partTableTitle2_2} from './data'
import { getAppFormInfo, pageAppRule, pagePartMasterData, fetchSaveCs1Remark, fetchSignPreviewDept,approvalList } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details'
import { pageMixins } from '@/utils/pageMixins'
// import { downloadPdfMixins } from '@/utils/pdf';
import { downloadPDF, dataURLtoFile } from "@/utils/pdf";
import { downloadFileByUrl} from '@/utils';
export default {
  mixins: [pageMixins],
  props:["m1"],
  components: {
    iCard,
    icon,
    iInput,
    iButton,
    iPagination,
    tableList
  },
  data () {
    return {
      formData: {},
      formList,
      ruleTableTitle1_1,
      ruleTableTitle1_2,

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
      deptData: [],
      exportButtonLoading: false,
      moment: window.moment,

      // uploadTableLj:false,
      // uploadTableGz:false,
    }
  },
  created() {
    // this.$nextTick(e=>{
      this.getAppFormInfo()
      this.initApplayDateData()
      this.getPageAppRule()
      this.getPagePartMasterData()
      this.getSignPreviewDept()
    // })
  },
  computed: {
    title() {
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
    isMeeting() {
      return this.formData.flowType == 'MEETING'
    },
    mtzObject(){
      return this.$store.state.location.mtzObject;
    }
  },
  watch: {
    mtzObject(newVlue,oldValue){

    }
  },
  methods: {
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
    getAppFormInfo() {
      getAppFormInfo({
        mtzAppId: this.$route.query.mtzAppId
      }).then(res => {
        if(res && res.code == 200) {
          this.formData = res.data
        } else iMessage.error(res.desZh)
      })
    },
    // 获取规则清单表格数据
    getPageAppRule() {
      pageAppRule({
        mtzAppId: this.$route.query.mtzAppId,
        // pageNo: this.rulePageParams.currPage,
        // pageSize: this.rulePageParams.pageSize,
        pageNo: 1,
        pageSize: 999999,
      }).then(res => {
        if(res && res.code == 200) {
          this.ruleTableListData = res.data
          this.rulePageParams.totalCount = res.total

          res.data.forEach(e=>{//判断是否有贵金属合金
            if(e.preciousMetalDosageUnit !== ""){
              this.uploadTableGz = true;
            }
          })

        } else iMessage.error(res.desZh)
      })
    },
    // 获取零件清单表格数据
    getPagePartMasterData() {
      pagePartMasterData({
        mtzAppId:this.$route.query.mtzAppId,
        // pageNo: this.partPageParams.currPage,
        // pageSize: this.partPageParams.pageSize,
        pageNo: 1,
        pageSize: 999999,
      }).then(res => {
        if(res && res.code == 200) {
          this.partTableListData = res.data

          // res.data.forEach(e=>{//判断是否有贵金属合金
          //   if(e.preciousMetalDosageUnit !== ""){
          //     this.uploadTableLj = true;
          //   }
          // })

          this.partPageParams.totalCount = res.total
        } else iMessage.error(res.desZh)
      })
    },
    // 获取部门数据 
    getSignPreviewDept() {
      fetchSignPreviewDept({
        mtzAppId: this.$route.query.mtzAppId
      }).then(res => {
        if(res && res.code == 200) {
          this.deptData = res.data
        } else iMessage.error(res.error)
      })
    },
    // 点击保存
    handleClickSave() {
      let params = {}
      if(this.isMeeting) {
        params = {
          mtzAppId: this.$route.query.mtzAppId,
          linieMeetingMemo: this.formData.linieMeetingMemo
        }
      } else if(this.isFinite) {
        params = {
          mtzAppId: this.$route.query.mtzAppId,
          cs1MeetingMemo: this.formData.cs1MeetingMemo
        }
      }
      fetchSaveCs1Remark(params).then(res => {
        if(res && res.code == 200) {
          this.getAppFormInfo()
          iMessage.success(res.desZh)
        } else iMessage.error(res.desZh)
      })
    },
    // 生成PDF
    // createPdf() {
    //   return new Promise(resolve => {
    //     this.downloadButtonLoading = true
    //     const pdfParam = {
    //       domId: 'content',
    //       pdfName: '会外流转单',
    //     }
    //     this.getDownloadFileAndExportPdf(pdfParam).then(res => {
    //       resolve(res)
    //     })
    //   })
    // },
    // 导出：导出当前为pdf
    handleClickExport() {
      // console.log(this.title)
      var name = "";
      if (this.title == "") {
        name = "MTZ申请单"+this.$route.query.mtzAppId +"流转导出";
      } else {
        name = this.title;
      }
      downloadPDF({
        idEle: 'content',
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
      // this.exportButtonLoading = true
      // this.createPdf().then(res => {
      //   this.exportButtonLoading = false
      //   if(res) {
      //     downloadFileByUrl(res.downloadUrl)
      //     iMessage.success(this.language('CAOZUOCHENGGONG', '操作成功'))
      //   } else iMessage.error(this.language('CAOZUOSHIBAI', '操作失败'))
      // })
    }
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
.deptBox {
    margin-left: 30px;
  display: flex;
  .deptItem {
    flex: auto;
    display: flex;
    p {
      font-weight: bold;
    }
    div {
      border-bottom: 1px solid black;
      margin-left: 10px;
      width: 60%;
    }
  }
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
      padding:10px 10px;
      width: 68%;
      min-height: $tabsInforHeight;
      height:auto;
      background: #f8f8fa;
      text-align: center;
    }
  }
}

.download_btn{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-top:10px;
  padding-bottom:20px;
}
#content{
  position:relative;
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
</style>
