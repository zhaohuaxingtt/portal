<!--
 * @Author: your name
 * @Date: 2021-10-28 14:51:25
 * @LastEditTime: 2021-11-10 11:29:20
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
      <span class="title_name">{{ commonTitle }} - {{locationId}}</span>
      <div class="opration">
        <iButton @click="submit" :disabled="appStatus !== '草稿'">{{ language('TIJIAO', '提交') }}</iButton>
        <iButton @click="downRS">{{ language('DAOCHURS', '导出RS') }}</iButton>
      </div>
    </div>
    <div class="stepBoxMap">
      <div class="stepBox">
        <div class="stepBox_div" v-for="(item,index) in topImgList" :key="index" @click="handleClickStep(item)">
          <img class="car_img"
              :src="Number(locationNow-index-1)>0?require('@/assets/images/icon/bingo.png'):Number(locationNow-index-1)==0?require('@/assets/images/icon/car-conduct.png'):require('@/assets/images/icon/car-bingo.png')"
              :fit="fit"/>
          <span :class="Number(locationNow-index-1)<0?'car_span_color':''">{{ language(item.key, item.name)}}</span>
        </div>
      </div>
      <hr width="100%" style="border:1px dashed #CDD3E2;height:1px" />
      <hr :width="(locationNow-1)*50 + '%'" style="border:1px dashed #1660F1;height:1px" />
      <hr :width="(locationNow-2)*50 + '%'" style="border:1px solid #1660F1;height:1px" />
    </div>
    <iDialog
      :title="language('XUANZEHUIYI', '选择会议')"
      :visible.sync="mtzAddShow"
      v-if="mtzAddShow"
      width="90%"
      @close='closeDiolog'
    >
      <subSelect @close="closeBingo"></subSelect>
    </iDialog>
    <iDialog
      :title="language('DAOCHURS', '导出RS')"
      :visible.sync="rsType"
      v-if="rsType"
      width="99%"
      @close='closeRS'
    >
      <RsPdf @close="closeType" :RsType="downType"></RsPdf> 
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
      <router-view/>
    </div>
  </div>
</template>

<script>
import { iButton,iDialog,iMessage } from "rise"
import { topImgList } from './data'
import subSelect from './subSelect'
import RsPdf from './decisionMaterial/index'
import MtzAdd from "./MtzAdd";
import store from "@/store";
import { mtzAppNomiSubmit,getAppFormInfo } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';

import NewMessageBox from '@/components/newMessageBox/dialogReset.js'
import { deepClone } from "./applyInfor/util"
export default {
  components:{
    iButton,
    iDialog,
    subSelect,
    RsPdf,
    MtzAdd
  },
  props: {
    mtzApplayNum: {
      type: String,
      default: ''
    },
    mtzApplayName: {
      type: String,
      default: ''
    },
    user: {
      type: String,
      default: ''
    },
    dept: {
      type: String,
      default: ''
    },
    params: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      locationId:"",
      topImgList,
      locationNow: this.$route.query.currentStep || 1,
      mtzAddShow:false,
      rsType:false,
      downType:true,
      beforReturn:true,
      flowType:"",
      appStatus:"",
    }
  },
  computed: {
    submitType(){
      return this.$store.state.location.submitType;
    },
    mtzObject(){
        return this.$store.state.location.mtzObject;
    },
    commonTitle() {
      // MTZ申请单-100386 申请单名-采购员-科室
      return this.language('MTZSHENGQINGDAN', 'MTZ申请单') + (this.mtzApplayNum ? '-' + this.mtzApplayNum : '') + (' ' + this.mtzApplayName || '') + (this.user ? '-' + this.user : '') + (this.dept ? '-' + this.dept : '')
    },
    submitDataList(){
      return this.$store.state.location.submitDataList;
    },
  },
  
  watch: {
    submitType(newValue,oldValue){
      this.flowType = newValue;
    },
    mtzObject(newValue,oldValue){
      if(this.$route.query.mtzAppId == undefined && JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId == undefined){
      }else{
        this.locationId = this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
      }
      this.getType();
    }
  },
  created() {
    if(JSON.parse(sessionStorage.getItem('MtzLIst')) == null){
      sessionStorage.setItem('MtzLIst',JSON.stringify({mtzAppId:undefined}))
    }
    if(this.$route.query.mtzAppId == undefined && JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId == undefined){
      this.beforReturn = true;
    }else{
      this.beforReturn = false;
      this.locationId = this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
      this.getType();
    }
  },
  methods: {
    getType(){
      getAppFormInfo({ mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId}).then(res=>{
        this.flowType = res.data.flowType;
        this.appStatus = res.data.appStatus;
      })
    },
    closeType(){
      this.closeRS();
    },
    closeRS(){
      this.rsType = false;
    },
    downRS(){
      this.rsType = true;
      this.downType = true;
    },

    // 提交
    submit(){
      if(this.submitDataList == 0){
        iMessage.warn(this.language("MTZGZBNWK","MTZ规则不能为空"))
        return false;
      }
      if(this.mtzObject.flowType == undefined && this.flowType == "" && this.submitType == ""){
        
      }else{
        this.flowType = this.mtzObject.flowType || this.flowType || this.submitType
        if(this.flowType === "MEETING"){//上会
          this.mtzAddShow = true;
        }else{//备案
          NewMessageBox({
              title:this.language('LK_WENXINTISHI','温馨提示'),
              Tips:this.language('SHIROUQUERENTIJIAO','是否确认提交？'),
              cancelButtonText:this.language('QUXIAO', '取消'),
              confirmButtonText:this.language('QUEREN', '确认'),
          }).then(() => {
              mtzAppNomiSubmit({
                mtzAppId:this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
              }).then(res=>{
                if(res.result && res.code == 200){
                  iMessage.success(this.language(res.desEn,res.desZh))

                  var data = deepClone(JSON.parse(sessionStorage.getItem('MtzLIst')));
                  data.refresh = true;
                  store.commit("routerMtzData",data);
                  sessionStorage.setItem("MtzLIst",JSON.stringify(data))
                  this.getType();
                }
              })
          }).catch((err) => {
              // console.log(err)
          })
        }
      }
    },
    // 点击步骤
    handleClickStep(data) {
      this.locationNow = data.id;
      var dataList = this.$route.query;
      this.$router.push({
        path: data.url,
        query: {
          ...dataList,
          currentStep: data.id,
          mtzAppId:this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
          appId:this.$route.query.appId || this.mtzObject.appId,
        }
      })
    },
    closeDiolog(){
      this.mtzAddShow = false;
    },
    closeBingo(val){
      if(val = "refresh"){
        var data = deepClone(JSON.parse(sessionStorage.getItem('MtzLIst')));
        data.refresh = true;
        store.commit("routerMtzData",data);
        sessionStorage.setItem("MtzLIst",JSON.stringify(data))
        this.getType();
      }
      this.closeDiolog()
    },
    closeTyoe(){
      this.beforReturn = false;
    },
  },
  destroyed(){
    sessionStorage.removeItem("MtzLIst");
    store.commit("routerMtzData",{});
  }
}
</script>

<style lang='scss' scoped>
.title_name{
  font-size: 20px;
  font-weight: bold;
}
.opration{
  margin-right: 100px;
}
.stepBoxMap{
  width: 100%;
  height:85px;
  margin:30px auto 0;
  position: relative;
  hr{
    position: absolute;
    top:23%;
  }
}
.stepBox{
  z-index: 10;
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height:100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .stepBox_div{
    text-align: center;
    width: 14%;
    background:#f8f9fa;

    .car_img{
      width:45px;
      display: block;
      margin:0 auto;
      cursor: pointer;
    }
    span{
      display: inline-block;
      font-size: 20px;
      font-weight: bold;
      margin-top:10px;
      color:#5d5d5d;
    }
    .car_span_color{
      color:#CDD3E2!important;
    }
  }
}

.tttttt{
  ::v-deep .el-dialog__headerbtn{
    display: none;
  }
}
 
</style>
