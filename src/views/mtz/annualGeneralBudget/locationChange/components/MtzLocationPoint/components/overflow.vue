<!--
 * @Author: your name
 * @Date: 2021-10-28 14:51:25
 * @LastEditTime: 2022-03-02 18:01:50
 * @LastEditors: Please set LastEditors
 * @Description: 公共步骤条封装
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\commonFlow.vue
-->
<template>
  <div>
    <div slot="header"
         class="flex-between-center"
         style="width:100%">
      <!-- <span class="title_name">MTZ申请单-100386 申请单名-采购员-科室</span> -->
      <div>
        <span class="title_name">{{ commonTitle }}-{{locationId}}</span>
        <span class="title_name">-{{mtzAppName}}-{{user}}-{{dept}}</span>
        <div class="title_type">
          <div class="title_block">
            <span>申请单类型：</span>
            <!-- <iSelect :disabled="(appStatus !== '草稿' && appStatus !== '未通过') || formInfor.ttNominateAppId !== '' -->
            <iSelect :disabled="!isEditNew || formInfor.ttNominateAppId !== ''"
                     :value="formInfor.flowType"
                     v-permission.edit="PORTAL_MTZ_POINT_INFOR_SHENQINGDANLEIXING"
                     :placeholder="language('QINGXUANZE','请选择')"
                     @change="chioce($event)">
              <el-option :value="item.code"
                         :label="item.message"
                         v-for="item in getFlowTypeList"
                         :key="item.code"></el-option>
            </iSelect>
          </div>
        </div>
      </div>
      <div class="opration">
        <template v-if="ttNominateAppId == '' && appStatus == '通过'">
          <iButton @click="submitPass"
                   v-show="locationNow==3&&meetingNumber == 0"
                   v-permission="PORTAL_MTZ_POINT_INFOR_TIJIAO">{{ language('TIJIAO', '提交') }}</iButton>
        </template>
        <template v-else>
          <iButton @click="submit"
                   v-show="locationNow==3&&meetingNumber == 0"
                   v-permission="PORTAL_MTZ_POINT_INFOR_TIJIAO"
                   :disabled="!isEditNew || ttNominateAppId !== ''||appStatus == '已提交'">{{ language('TIJIAO', '提交') }}</iButton>
                   <!-- (appStatus !== '草稿' && appStatus !== '未通过') -->
        </template>
        <iButton @click="downRS">{{ language('YULAN', '预览') }}</iButton>
      </div>
    </div>
    <div class="stepBoxMap"
         v-if="meetingNumber == 0">
      <div class="stepBox">
        <div class="stepBox_div"
             v-for="(item,index) in topImgList"
             :key="index"
             @click="handleClickStep(item)">
          <img class="car_img"
               :src="Number(locationNow-index-1)>0?require('@/assets/images/icon/bingo.png'):Number(locationNow-index-1)==0?require('@/assets/images/icon/car-conduct.png'):require('@/assets/images/icon/car-bingo.png')"
               :fit="fit" />
          <span :class="Number(locationNow-index-1)<0?'car_span_color':''">{{ language(item.key, item.name)}}</span>
        </div>
      </div>
      <hr width="100%"
          style="border:1px dashed #CDD3E2;height:1px" />
      <hr :width="(locationNow-1)*50 + '%'"
          style="border:1px dashed #1660F1;height:1px" />
      <hr :width="(locationNow-2)*50 + '%'"
          style="border:1px solid #1660F1;height:1px" />
    </div>
    <iDialog :title="language('XUANZEHUIYI', '选择会议')"
             :visible.sync="mtzAddShow"
             v-if="mtzAddShow"
             width="90%"
             @close='closeDiolog'>
      <subSelect @close="closeBingo"></subSelect>
    </iDialog>
    <iDialog :title="language('DAOCHURS', '导出RS')"
             :visible.sync="rsType"
             v-if="rsType"
             width="99%"
             @close='closeRS'>
      <RsPdf @close="closeType"
             :RsType="downType"></RsPdf>
    </iDialog>
    <iDialog :title="language('MTZXINZENG', 'MTZ新增')"
             :visible.sync="beforReturn"
             class="tttttt"
             v-if="beforReturn"
             width="25%"
             @close='beforReturn=true'>
      <MtzAdd @close="closeTyoe"></MtzAdd>
    </iDialog>
    <div class="margin-top20">
      <router-view />
    </div>
  </div>
</template>

<script>
import { iButton, iDialog, iMessage, iMessageBox, iSelect } from "rise"
import { topImgList } from './data'
import subSelect from './subSelect'
import RsPdf from './decisionMaterial/index'
import MtzAdd from "./MtzAdd";
import store from "@/store";
import {
  mtzAppNomiSubmit,
  getAppFormInfo,
  setMtzAppCheckVO,//设置
  getMtzAppCheckVO,//获取
  fetchAppNomiDecisionDataPage,
  getFlowTypeList,
  modifyAppFormInfo,
  pageAppRule
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';
import { syncAuther } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/approve'
import { pageApprove } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/approve'
import { NewMessageBox, NewMessageBoxClose } from '@/components/newMessageBox/dialogReset.js'
import { deepClone } from "./applyInfor/util"
export default {
  components: {
    iButton,
    iDialog,
    subSelect,
    RsPdf,
    MtzAdd,
    iSelect
  },
  props: {
    params: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      locationId: "",
      mtzAppName: "",
      user: "",
      dept: "",
      topImgList,
      locationNow: this.$route.query.stepNum || 1,
      mtzAddShow: false,
      rsType: false,
      downType: true,
      beforReturn: true,
      flowType: "",
      appStatus: "",
      meetingStatus:'',
      stepNum: 1,
      ttNominateAppId: "",
      NumberCESHI: 0,
      meetingNumber: Number(this.$route.query.meeting) || 0,
      getFlowTypeList: [],
      formInfor: {
        flowType: "",
        flowTypeName: "",
      },
      pageTitle:{
        title:''
      }
    }
  },
  computed: {
    mtzObject () {
      return this.$store.state.location.mtzObject;
    },
    commonTitle () {
      // MTZ申请单-100386 申请单名-采购员-科室
      return this.language('MTZSHENGQINGDAN', 'MTZ申请单')
    },
    submitDataList () {
      return this.$store.state.location.submitDataList;
    },
    submitInfor () {
      return this.$store.state.location.submitInfor;
    },
    isEditNew: function () {
            return (this.appStatus == '草稿' || this.appStatus == '未通过')||(((this.flowType=='SIGN'||this.flowType=='FILING')&&this.appStatus=='已提交')||(this.appStatus!='冻结'&&this.flowType=="MEETING"))

      // return (this.appStatus == '草稿' || this.appStatus == '未通过')||(((this.flowType=='SIGN'||this.flowType=='FILING')||(['02','03',null,'01'].includes(this.meetingStatus)&&this.flowType=='MEETING'))&&this.appStatus=='已提交')
    }
  },

  watch: {
    submitInfor (newValue, oldValue) {
      this.formInfor = newValue;
      this.ttNominateAppId = newValue.ttNominateAppId;
      this.flowType = newValue.flowType;
      this.mtzAppName = newValue.appName;
    },
    mtzObject (newValue, oldValue) {
      if (this.$route.query.mtzAppId == undefined && JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId == undefined) {
      } else {
        this.locationId = this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId;
      }
      // console.log("watch")
      this.getType();
    }
  },
  provide () {
    return {'pageTitle':this.pageTitle}
  },
  created () {


    if (JSON.parse(sessionStorage.getItem('MtzLIst')) == null) {
      sessionStorage.setItem('MtzLIst', JSON.stringify({ mtzAppId: undefined }))
    }

    // console.log(JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId)
    // console.log(this.$route.query.mtzAppId)
    if (JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId !== this.$route.query.mtzAppId) {
      var data = deepClone(this.$route.query);
      store.commit("routerMtzData", {
        mtzAppId: data.mtzAppId
      });
      sessionStorage.setItem("MtzLIst", JSON.stringify({
        mtzAppId: data.mtzAppId
      }))
    }

    if (this.$route.query.mtzAppId == undefined && JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId == undefined) {
      this.beforReturn = true;
    } else {
      this.beforReturn = false;
      this.locationId = this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId;
      this.mtzAppName = this.$route.query.mtzAppName;
      this.user = this.$route.query.user;
      this.dept = this.$route.query.dept;
      // console.log("created")
      this.getType();
    }
    getMtzAppCheckVO({ mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId }).then(res => {
      if (res.data.length == 0) {
        setMtzAppCheckVO({
          mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
          isDone: true,
          stepStr: "1"
        }).then(parme => {
          this.stepNum = parme.data
        })
      } else {
        var atr = [];
        res.data.forEach(e => {
          if (e.isDone) {
            atr.push(Number(e.stepStr));
          }
        });
        var arr = atr.sort();
        setTimeout(() => {
          this.stepNum = arr[arr.length - 1];
          this.locationNow = this.stepNum;
          // console.log(this.stepNum)
        }, 100);
      }
    })

    getFlowTypeList({}).then(res => {
      this.getFlowTypeList = res.data;
    })
  },
  methods: {
    submitPass () {
      mtzAppNomiSubmit({
        mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
      }).then(res => {
        if (res.result && res.code == 200) {
          iMessage.success(this.language(res.desEn, res.desZh))

          var data = deepClone(JSON.parse(sessionStorage.getItem('MtzLIst')));
          data.refresh = true;
          store.commit("routerMtzData", data);
          sessionStorage.setItem("MtzLIst", JSON.stringify(data))
          console.log("submitRequest")
          this.getType();
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    chioce (data, name) {
      // console.log(data)
      pageAppRule({
        pageNo: 1,
        pageSize: 99999,
        mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
      }).then(res => {
        this.tableData = res.data;
        var num = 0;
        res.data.forEach(e => {
          if (e.formalFlag == "N") {
            num++;
          }
        })
        if (num !== 0 && data == "SIGN") {
          this.formInfor.flowType = this.flowType;
          return iMessage.error(this.language('WHMTZYCLGZCZXGZSQDLXWFXZLZ', '维护MTZ原材料规则存在新规则，申请单类型无法选择流转'))
        } else {
          this.saveEdit(data);
        }
      })
    },
    saveEdit (val) {
      iMessageBox(this.language('QUERENBAOCUN', '确认保存？'), this.language('LK_WENXINTISHI', '温馨提示'), {
        confirmButtonText: this.language('QUEREN', '确认'),
        cancelButtonText: this.language('QUXIAO', '取消')
      }).then(res => {
        modifyAppFormInfo({
          ...this.formInfor,
          flowType: val
        }).then(res => {
          iMessage.success(this.language('BAOCUNCHENGGONG', '保存成功！'))
          var data = deepClone(JSON.parse(sessionStorage.getItem('MtzLIst')));
          data.refresh = true;
          store.commit("routerMtzData", data);
          sessionStorage.setItem("MtzLIst", JSON.stringify(data))
          console.log("saveEdit")

          this.handleSync("");
          this.getType();
        })
      }).catch(res => {

      })
    },
    handleSync (params) {
      syncAuther({ mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId, tag: params || "" }).then(res => {
        if (res?.code === '200') {
          // iMessage.success(res.desZh)
        } else {
          // iMessage.error(res.desZh)
        }
      })
    },
    getType () {
      getAppFormInfo({ mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId }).then(res => {
        this.formInfor = res.data;
        this.flowType = res.data.flowType;
        this.meetingStatus=res.data.meetingStatus
        this.appStatus = res.data.appStatus;
        this.ttNominateAppId = res.data.ttNominateAppId;
        this.mtzAppName = res.data.appName;
        this.user = res.data.linieName;
        this.dept = res.data.linieDeptName;
      })
    },
    closeType () {
      this.closeRS();
    },
    closeRS () {
      this.rsType = false;
    },
    downRS () {
      this.rsType = true;
      this.downType = true;
      this.pageTitle.title = this.commonTitle+'-'+(this.locationId&&this.locationId||'')+'-'+(this.mtzAppName&&this.mtzAppName||'')+'-'+(this.user&&this.user||'')+'-'+(this.dept&&this.dept||'')
    },

    // 提交
    submit () {
      if (this.submitDataList == 0) {
        iMessage.warn(this.language("MTZGZBNWK", "MTZ规则不能为空"))
        return false;
      }

      if (this.mtzObject.flowType == undefined && this.flowType == "" && this.submitType == "") {
      } else {
        this.flowType = this.mtzObject.flowType || this.flowType || this.submitType
        if (this.flowType !== "FILING") {//上会/流转
          this.setSubmit();
        } else {//备案
          fetchAppNomiDecisionDataPage({
            pageNo: 1,
            pageSize: 10,
            mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
          }).then(res => {
            if (res && res.code == 200) {
              if (res.data.length < 1) {
                return iMessage.error(this.language('SQDLXWBASTJSJCZLZDJCFJBNWK', '申请单类型为备案时，提交时决策资料中的附件不能为空！'))
              } else {
                this.submitRequest();
              }
            } else iMessage.error(res.desZh)
          })
        }
      }
    },
    setSubmit () {
      pageApprove({
        mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
        pageNo: 1,
        pageSize: 10
      }).then(res => {
        if (res.code === "200" && res.result) {
          if (res.data.length < 1) {
            iMessage.error(this.language("ZANWUSHENPIRENXINXI", "暂无审批人信息！"))
          } else {
            if (this.flowType === "MEETING") {//上会
              this.mtzAddShow = true;
            } else if (this.flowType === "SIGN") {//流转
              this.submitRequest();
            }
          }
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    submitRequest () {
      NewMessageBox({
        title: this.language('LK_WENXINTISHI', '温馨提示'),
        Tips: this.language('SHIROUQUERENTIJIAO', '是否确认提交？'),
        cancelButtonText: this.language('QUXIAO', '取消'),
        confirmButtonText: this.language('QUEREN', '确认'),
      }).then(() => {
        mtzAppNomiSubmit({
          mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
        }).then(res => {
          if (res.result && res.code == 200) {
            iMessage.success(this.language(res.desEn, res.desZh))

            var data = deepClone(JSON.parse(sessionStorage.getItem('MtzLIst')));
            data.refresh = true;
            store.commit("routerMtzData", data);
            sessionStorage.setItem("MtzLIst", JSON.stringify(data))
            console.log("submitRequest")
            this.getType();
          } else {
            iMessage.error(res.desZh)
          }
        })
      }).catch((err) => {
        // console.log(err)
      })
    },
    // 点击步骤
    handleClickStep (data) {
      // console.log(this.NumberCESHI++);
      // this.$router.push({
      //   path: data.url,
      //   mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
      // })



      if (this.$route.query.currentStep == data.id) return false;
      if (data.id > this.stepNum) {
        iMessageBox(this.language('QQDSJYJWQBC', '请确定数据已经完全保存？'), this.language('LK_WENXINTISHI', '温馨提示'), {
          confirmButtonText: this.language('QUEREN', '确认'),
          cancelButtonText: this.language('QUXIAO', '取消')
        }).then(res => {
          setMtzAppCheckVO({
            mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
            isDone: true,
            stepStr: data.id
          }).then(res => {
            var dataList = this.$route.query;
            this.$router.push({
              path: data.url,
              query: {
                ...dataList,
                currentStep: data.id,
                stepNum: data.id,
                mtzAppName: this.mtzAppName,
                user: this.user,
                dept: this.dept,
                mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
                appId: this.$route.query.appId || this.mtzObject.appId,
                // isView: (this.appStatus === '草稿' || this.appStatus === '未通过') ? false : true
              }
            })
          })
        })
      } else {
        var dataList = this.$route.query;
        this.$router.push({
          path: data.url,
          query: {
            ...dataList,
            currentStep: data.id,
            stepNum: this.locationNow,
            mtzAppName: this.mtzAppName,
            user: this.user,
            dept: this.dept,
            mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
            appId: this.$route.query.appId || this.mtzObject.appId,
            // isView: (this.appStatus === '草稿' || this.appStatus === '未通过') ? false : true
          }
        })
      }
    },
    closeDiolog () {
      this.mtzAddShow = false;
    },
    closeBingo (val) {
      this.closeDiolog();
      if (val == "refresh") {
        var data = deepClone(JSON.parse(sessionStorage.getItem('MtzLIst')));
        data.refresh = true;
        store.commit("routerMtzData", data);
        sessionStorage.setItem("MtzLIst", JSON.stringify(data))
        console.log("closeBingo")
        this.getType();
      }
    },
    closeTyoe () {
      this.beforReturn = false;
    },
  },
  destroyed () {
    // sessionStorage.setItem("MtzLIst", JSON.stringify({}))
    // store.commit("routerMtzData", {});
    NewMessageBoxClose();
  }
}
</script>

<style lang='scss' scoped>
::v-deep.el-button--default{
  font-size: 20px!important;
}
.font18_b {
  font-size: 18px;
  font-weight: bold;
}
.font18 {
  font-size: 18px;
  font-weight: bold;
}
.title_name {
  font-size: 24px;
  font-weight: bold;
}
.opration {
  margin-right: 20px;
}
.stepBoxMap {
  width: 100%;
  height: 85px;
  margin: 30px auto 0;
  position: relative;
  hr {
    position: absolute;
    top: 23%;
  }
}
.stepBox {
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .stepBox_div {
    text-align: center;
    width: 20%;
    background: #f8f9fa;

    .car_img {
      width: 45px;
      display: block;
      margin: 0 auto;
      cursor: pointer;
    }
    span {
      text-align:center;
      display: inline-block;
      font-size: 20px;
      font-weight: bold;
      margin-top: 10px;
      color: #5d5d5d;
    }
    .car_span_color {
      color: #cdd3e2 !important;
    }
  }
}

.tttttt {
  ::v-deep .el-dialog__headerbtn {
    display: none;
  }
}

.title_type {
  margin-left: 50px;
  display: inline-block;

  .title_block {
    display: flex;
    align-items: center;
  }

  .el-select {
    width: auto !important;
  }
}
</style>
<style lang='scss'>

</style>
