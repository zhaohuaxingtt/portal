<!-- MTZ申请单详情 -->
<template>
  <div>
    <iCard>
      <div slot="header"
           class="flex-between-center"
           style="width:100%">
        <div>
          <span>{{language('SHENQINGDANXINXI',"申请单信息")}}</span>
          <a v-if="applyNumber!==''">-</a>
          <a class="number_color"
             @click="jumpInforBtn">{{applyNumber}}</a>
          <el-tooltip effect="light"
                      placement="right"
                      v-if="applyNumber!==''">
            <div slot="content">
              <p>{{language('CSQDYYGLLDDDSQDJCLJKCKXQHQXGL','此申请单已有关联零点定点申请，点击超链接可查看详情，或取消关联')}}</p>
            </div>
            <i class="el-icon-warning-outline margin-left10"
               style="color:blue"></i>
          </el-tooltip>
        </div>
        <div class="opration">
          <iButton @click="edit"
                  v-permission="PORTAL_MTZ_POINT_INFOR_BIANJI"
                   v-show="disabled && appIdType && isEditNew">{{ language('BIANJI', '编辑') }}</iButton>
          <!-- v-show="disabled && appIdType && inforData.appStatus!=='草稿'">{{ language('BIANJI', '编辑') }}</iButton> -->
          <iButton @click="cancel"
                   v-show="!disabled">{{ language('QUXIAO', '取消') }}</iButton>
          <iButton @click="save"
                   v-show="!disabled">{{ language('BAOCUN', '保存') }}</iButton>
          <iButton @click="relation"
                    v-permission="PORTAL_MTZ_POINT_INFOR_GLLJDDSQ"
                   v-if="applyNumber===''&&showType&&disabled">{{ language('GLLJDDSQ', '关联零件定点申请') }}</iButton>
          <iButton @click="cancelRelation"
                   v-if="applyNumber!==''&&showType&&disabled">{{ language('QUXIAOGUANLIAN', '取消关联') }}</iButton>
        </div>
      </div>
      <div class="tabsBoxInfor">
        <div class="inforDiv"
             v-for="(item,index) in tabsInforList"
             :key="index">
          <span>{{language(item.key,item.name)}}</span>
          <el-tooltip class="item"
                      effect="light"
                      :placement="item.tooltipStyle"
                      :content="inforData[item.prop]"
                      v-if="item.type=='tooltip'&&inforData[item.prop]!==null">
            <iInput :disabled="item.prop == 'mtzAppId'||item.prop == 'linieName'||item.prop == 'appStatus'||item.prop == 'meetingName'?true:disabled"
                    class="inforText"
                    v-model="inforData[item.prop]"></iInput>
          </el-tooltip>
          <!-- <iSelect style="width:68%;"
                   v-else-if="item.type=='select'&&applyNumber==''"
                   :disabled="disabled"
                   :value="inforData[item.prop]"
                   :placeholder="language('QINGXUANZE','请选择')"
                   @change="chioce($event,item.prop)">
            <el-option :value="item.code"
                       :label="item.message"
                       v-for="item in getFlowTypeList"
                       :key="item.code"></el-option>
          </iSelect> -->
          <!-- <iSelect style="width:68%;"
                   v-else-if="item.type=='select'&&applyNumber!==''"
                   :disabled="true"
                   :value="inforData[item.prop]"
                   :placeholder="language('QINGXUANZE','请选择')"
                   @change="chioce($event,item.prop)">
            <el-option :value="item.code"
                       :label="item.message"
                       v-for="item in getFlowTypeList"
                       :key="item.code"></el-option>
          </iSelect> -->
          <iInput :disabled="item.prop == 'mtzAppId'||item.prop == 'linieName'||item.prop == 'appStatus'||item.prop == 'meetingName'?true:disabled"
                  class="inforText"
                  v-model="inforData[item.prop]"
                  v-else></iInput>
        </div>
      </div>
      <span style="display:block;margin-bottom:20px;">{{language("LINIEBEIAN","Linie备注")}}</span>
      <el-input :disabled="disabled"
                type="textarea"
                :rows="4"
                :placeholder="language('QINGSHURUBEIAN','请输入备注')"
                v-model="inforData.linieMeetingMemo"></el-input>
    </iCard>
    <theTabs ref="theTabs"
             @isNomiNumber="isNomiNum"
             @handleReset="handleReset"
             v-if="beforReturn"
             :meetingStatus="inforData.meetingStatus"
             :appStatus='inforData.appStatus'
             :flowType="inforData.flowType">
    </theTabs>
    <theDataTabs ref="theDataTabs"
                 v-if="beforReturn"
                 :appStatus='inforData.appStatus'
                 :flowType="inforData.flowType"
                 :meetingStatus="inforData.meetingStatus"
                 :inforData="inforData"
                 :applyNumber="applyNumber"
                 >
    </theDataTabs>
    <iDialog :title="language('LINGJIANDINGDIANSHENQING', '零件定点申请')"
             :visible.sync="mtzAddShow"
             v-if="mtzAddShow"
             width="85%"
             @close='closeDiolog'>
      <partApplication @close="saveClose"
                      :numIsNomi="numIsNomi"
                      :inforData="inforData"
                       ></partApplication>
    </iDialog>
  </div>
</template>

<script>
import { iInput, iSelect, iDialog, iMessage, iDatePicker, iCard, iButton, iMessageBox } from 'rise';
import { tabsInforList } from "./data";
import theTabs from "./theTabs";
import theDataTabs from "./theDataTabs";
import partApplication from "./partApplication";
import store from "@/store";
import {
  page,
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/firstDetails';
import {
  getAppFormInfo,
  modifyAppFormInfo,
  // getFlowTypeList,
  disassociate,
  fetchAppNomiDecisionDataPage
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';
import { syncAuther } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/approve'
export default {
  name: "searchTabs",
  components: {
    iDialog,
    iInput,
    iDatePicker,
    iCard,
    iButton,
    theTabs,
    partApplication,
    theDataTabs,
    iSelect,
  },
  data () {
    return {
      beforReturn:false,
      // getFlowTypeList: [],
      mtzAddShow: false,
      disabled: true,
      textarea: "",
      inforData: {
        mtzAppId: "",
        appName: "",
        linieName: "",
        flowType: "",
        appStatus: "",
        meetingStatus:'',
        meetingName: "",
        linieMeetingMemo: '',
      },
      tabsInforList: tabsInforList,
      searchForm: {
        idList: [],
        sapPayBalanceNos: [],
        mgroups: [],
        materialNos: [],
        createBys: [],
        fsupplierId: "",
        ssupplierIds: [],
        departments: [],
        statuss: [],
        monthFrom: "",
        monthTo: "",
        types: []
      },
      value: "",
      value1: "",
      mtzDocNos: [],//补差单号
      sapPayBalanceNos: [],//sap补差单号下拉
      typesList: [],
      deptList: [],//部门数据
      mgroups: [],//材料中类编号
      rawMaterialNos: [],//原材料编号

      applyNumber: '',
      showType: false,
      appIdType: true,
      numIsNomi: 0,
    }
  },
  // beforeRouteEnter:(to,from,next)=>{
  //   if(to.query.mtzAppId == undefined){

  //   }else{
  //     next()
  //   }
  // },
  computed: {
    mtzObject () {
      return this.$store.state.location.mtzObject;
    },
    isEditNew: function () {
      // return (this.inforData.appStatus == '草稿' || this.inforData.appStatus == '未通过')||(((this.inforData.flowType=='SIGN'||this.inforData.flowType=='FILING')||(['02','03',null,'01'].includes(this.inforData.meetingStatus)&&this.inforData.flowType=="MEETING"))&&this.inforData.appStatus=='已提交')
      return (this.inforData.appStatus == '草稿' || this.inforData.appStatus == '未通过')||(((this.inforData.flowType=='SIGN'||this.inforData.flowType=='FILING')&&this.inforData.appStatus=='已提交')||(this.inforData.appStatus!='冻结'&&this.inforData.flowType=="MEETING"))

    }
  },
  watch: {
    mtzObject (newVlue, oldValue) {
      this.init()
    }
  },
  created () {



    if (JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId == undefined && this.$route.query.mtzAppId == undefined) {

    } else {
      this.init()
    }
    // this.getListData()
    if (this.$route.query.appId) {
      this.appIdType = false;
    }
  },
  methods: {
    init (val) {
      getAppFormInfo({
        mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
      }).then(res => {
        this.inforData.meetingStatus = res.data.meetingStatus
        this.inforData.mtzAppId = res.data.mtzAppId;
        this.inforData.linieName = res.data.linieName
        this.inforData.appStatus = res.data.appStatus
        this.inforData.meetingName = res.data.meetingName
        this.inforData.linieMeetingMemo = res.data.linieMeetingMemo
        this.inforData.appName = res.data.appName
        this.inforData.flowType = res.data.flowType
        if (res.data.ttNominateAppId == null) {
          this.applyNumber = "";
        } else {
          this.applyNumber = res.data.ttNominateAppId;
          // this.getLjLocation();
        }
        // console.log(this.applyNumber);
        if (val !== "取消") {
          store.commit("submitBtnInfor", { ...res.data });
        }
        // NOTPASS
        if (this.isEditNew) {
          this.showType = true;
        } else {
          this.showType = false;
        }
        console.log((this.inforData.appStatus == '草稿' || this.inforData.appStatus == '未通过')||(((this.inforData.flowType=='SIGN'||this.inforData.flowType=='FILING')&&this.inforData.appStatus=='已提交')||(this.inforData.appStatus!='冻结'&&this.inforData.flowType=="MEETING")))
    console.log(this.inforData.appStatus == '草稿' || this.inforData.appStatus == '未通过')
    console.log((this.inforData.flowType=='SIGN'||this.inforData.flowType=='FILING')&&this.inforData.appStatus=='已提交')
    console.log(this.inforData.appStatus!='冻结'&&this.inforData.flowType=="MEETING")


      }).then(res=>{
        this.beforReturn = true;
      })
    },
    getsyncAuther () {
      syncAuther({ mtzAppId: this.$route.query.mtzAppId,tag:"" })
    },
    // getListData () {
      // getFlowTypeList({}).then(res => {
      //   this.getFlowTypeList = res.data;
      // })
    // },
    handleChange (val) {
      // this.searchForm.monthFrom = window.moment(val[0]).format('yyyy-MM-DD')
      // this.searchForm.monthTo = window.moment(val[1]).format('yyyy-MM-DD')
    },
    handleChange1 (val) {

    },
    handleReset () {
      modifyAppFormInfo({
        ...this.inforData,
        flowType: "MEETING",
      }).then(res => {
        if (res.code == 200) {
          setTimeout(() => {
            disassociate({
              mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
            }).then(res => {
              if (res.code == 200) {
                this.applyNumber = "";
                this.init();
              } else {
                iMessage.error(res.desZh)
              }
            })
          }, 100);
        }
      })
    },
    edit () {
      this.disabled = false;
    },
    save () {
      if(this.inforData.appName == ""){
        return iMessage.error(this.language('SHENQINGDANMINGBUNENGWEIKONG', '申请单名不能为空'))
      };
      if (this.inforData.flowType == "SIGN" && this.numIsNomi !== 0) {//流转
        return iMessage.error(this.language('WHMTZYCLGZCZXGZSQDLXWFXZLZ', '维护MTZ原材料规则存在新规则，申请单类型无法选择流转'))
      }else{
        // if (this.inforData.flowType == "FILING") {//备案
          // fetchAppNomiDecisionDataPage({
          //   pageNo: 1,
          //   pageSize: 10,
          //   mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
          // }).then(res => {
          //   if(res && res.code == 200) {
          //     if(res.data.length<1){
          //       return iMessage.error(this.language('SQDLXWBASSPFJBNWK', '申请单类型为备案时，审批附件不能为空'))
          //     }else{
          //       this.saveEdit();
          //     }
          //   } else iMessage.error(res.desZh)
          // })
        // }else{
          this.saveEdit();
        // }
      }
    },
    saveEdit(){
      iMessageBox(this.language('QUERENBAOCUN', '确认保存？'), this.language('LK_WENXINTISHI', '温馨提示'), {
        confirmButtonText: this.language('QUEREN', '确认'),
        cancelButtonText: this.language('QUXIAO', '取消')
      }).then(res => {
        modifyAppFormInfo({
          ...this.inforData
        }).then(res => {
          console.log(res);
          iMessage.success(this.language('BAOCUNCHENGGONG', '保存成功！'))
          this.disabled = true;
          this.init();
        })
      }).catch(res => {

      })
    },
    cancel () {
      this.disabled = true;
      this.init("取消");
    },
    relation () {//关联零件定点申请
      iMessageBox(this.language('GLSQDHWFCMTZJMFQTJCHHWLZDJQXDDDCZ', '关联申请单后，无法从MTZ界面发起提交、撤回、会外流转、冻结、取消定点等操作'), this.language('LK_WENXINTISHI', '温馨提示'), {
        confirmButtonText: this.language('QUEREN', '确认'),
        cancelButtonText: this.language('QUXIAO', '取消')
      }).then(res => {
        this.mtzAddShow = true;
      })
    },
    cancelRelation () {
      iMessageBox(this.language('QDYQXGL', '确定要取消关联？'), this.language('LK_WENXINTISHI', '温馨提示'), {
        confirmButtonText: this.language('QUEREN', '确认'),
        cancelButtonText: this.language('QUXIAO', '取消')
      }).then(res => {
        disassociate({
          mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
        }).then(res => {
          if (res.code == 200) {
            iMessage.success(res.desZh)
            this.applyNumber = "";
            this.getsyncAuther()
            this.init();
          } else {
            iMessage.error(res.desZh)
          }
        })
      }).catch(res => {

      })
    },
    reset () {
      this.searchForm = {
        idList: [],
        sapPayBalanceNos: [],
        mgroups: [],
        materialNos: [],
        createBys: [],
        fsupplierId: [],
        ssupplierIds: [],
        departments: [],
        statuss: [],
        monthFrom: "",
        monthTo: "",
      }
    },
    handleClickFsupplierName (val) {

    },
    closeDiolog () {
      this.mtzAddShow = false;
    },
    saveClose (val) {
      this.applyNumber = val;
      this.closeDiolog();
      this.init();
    },
    chioce (e, name) {
      this.inforData[name] = e;
    },
    isNomiNum (val) {
      this.numIsNomi = val;
    },

    // getLjLocation(){
    //   page({
    //     current: 1,
    //     size: 9999,
    //     nominateId:this.applyNumber
    //   }).then(res=>{
    //     if(res.code == 200 && res.result){
    //       this.relationType = res.data.records[0].nominateProcessType;
    //     }else{
    //       iMessage.error(this.language(res.desEn,res.desZh))
    //     }
    //   })
    // },
    jumpInforBtn () {
      page({
        current: 1,
        size: 9999,
        nominateId: this.applyNumber
      }).then(res => {
        if (res.code == 200 && res.result) {
          var jumpData = res.data.records[0];
          var partProjType = "";
          if (jumpData.partProjType == null) {
            partProjType = ""
          } else {
            partProjType = jumpData.partProjType
          }
          var path = "";
          path = "designate/decisiondata/rs?desinateId=" + jumpData.id + "&designateType=" + jumpData.nominateProcessType + "&partProjType" + partProjType + "&applicationStatus=" + jumpData.applicationStatus
          window.open(process.env.VUE_APP_SOURCING_URL + path)
          
        } else {
          iMessage.error(this.language(res.desEn, res.desZh))
        }
      })
    }

  },
  destroyed () {

  },
}
</script>

<style lang="scss" scoped>
$tabsInforHeight: 35px;
.openPage {
  position: relative;
  color: $color-blue;
  font-size: 14px;
  cursor: pointer;
  width: 90%;
}
.operation {
  display: none !important;
}
.serch {
  margin-right: 0 !important;
}
.tabsBoxInfor {
  margin-bottom: 10px;
  display: flex;
  flex-flow: wrap;
  .inforDiv {
    width: 29%;
    height: $tabsInforHeight;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0;
    margin-bottom: 20px;
    margin-left:6.5%;
    span {
      font-size: 15px;
    }
    .inforText {
      font-size: 14px;
      width: 68%;
      background: #f8f8fa;
      text-align: center;
      height: $tabsInforHeight;
      line-height: $tabsInforHeight;
    }
  }
  .inforDiv:nth-child(3n-2){
    margin-left:0!important;
  }
}
.number_color {
  color: #1763f7;
  border-bottom: 1px solid #1763f7;
}
.number_color:hover {
  font-weight: bold;
  cursor: pointer;
  border-bottom: 2px solid #1763f7;
}
</style>
  