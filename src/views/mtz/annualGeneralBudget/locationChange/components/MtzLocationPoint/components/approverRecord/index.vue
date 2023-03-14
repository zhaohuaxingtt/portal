<!--
 * @Author: your name
 * @Date: 2021-11-01 14:43:37
 * @LastEditTime: 2021-11-02 15:43:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\approverRecord\index.vue
-->

<template>
  <div>
    <iCard>
      <div class="title">
        <span class="font20_b">{{ language('关联定点申请', "关联定点申请") }}</span>
        <div>
          <iButton @click="relation" v-permission="PORTAL_MTZ_POINT_INFOR_GLLJDDSQ" v-if="applyNumber === '' && showType">
            {{
              language('GLLJDDSQ', '关联零件定点申请')
            }}</iButton>
          <iButton @click="cancelRelation" v-if="applyNumber !== '' && showType">{{
            language('QUXIAOGUANLIAN', '取消关联')
          }}
          </iButton>
        </div>
      </div>
      <div class="info" style="margin-top:30px">
        <div>
          <span class="font18 block">{{ language('定点申请单号', '定点申请单号') }}</span>
          <iInput class="font18" style="width:300px;margin-right:20px" v-model="inforData.ttNominateAppId" :disabled="true" />
        </div>
        <div>
          <span class="font18 block">{{ language('定点申请单名称', '定点申请单名称') }}</span>
          <iText  class="text font18" style="width:300px">{{ inforData.ttNominateAppName}}</iText>
        </div>
      </div>

    </iCard>
    <approveTable ref="approveTable" style="margin-top:20px"></approveTable>
    <iDialog :title="language('LINGJIANDINGDIANSHENQING', '零件定点申请')" :visible.sync="mtzAddShow" v-if="mtzAddShow"
      width="85%" @close='closeDiolog'>
      <partApplication @close="saveClose" :numIsNomi="numIsNomi" :inforData="inforData"></partApplication>
    </iDialog>
  </div>
</template>

<script>
import partApplication from "../applyInfor/partApplication";
import {
  getAppFormInfo,
  disassociate,
  pageAppRule
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';
import { syncAuther } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/approve'
import {
  page,
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/firstDetails';
import { iPage, iCard, iButton, iLabel, iInput, iMessageBox, iDialog,iMessage,iText } from 'rise'
import approveTable from './components/approveTable'
export default {
  components: {
    iText,
    iInput,
    iLabel,
    iButton,
    partApplication,
    iCard,
    iPage,
    approveTable,
    iDialog
  },
  data() {
    return {
      inforData: {},
      applyNumber: '',
      numIsNomi: 0,
      mtzAddShow: false,
      showType:false,
    }
  },
  computed: {
    mtzObject() {
      return this.$store.state.location.mtzObject;
    }
  },
  watch: {
    mtzObject(newVlue, oldValue) {
      this.init()
    }
  },
  created() {
    if (JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId == undefined && this.$route.query.mtzAppId == undefined) {

    } else {
      this.init('','del')
    }
  },
  methods: {
    init(val,type) {
      getAppFormInfo({
        mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
      }).then(res => {
        this.$set(this.inforData,'ttNominateAppId',res.data.ttNominateAppId)
        this.inforData.mtzAppId = res.data.mtzAppId;
        this.inforData.linieName = res.data.linieName
        this.inforData.appStatus = res.data.appStatus
        this.inforData.meetingName = res.data.meetingName
        this.inforData.linieMeetingMemo = res.data.linieMeetingMemo
        if (res.data.ttNominateAppId == null) {
          this.applyNumber = "";
        } else {
          this.applyNumber = res.data.ttNominateAppId;
        }
        const appStatusArr=['草稿','已提交','未通过','通过','复核未通过','M退回']

        if ((res.data.appStatus == '草稿' || res.data.appStatus == '未通过')||(((res.data.flowType=='SIGN'||res.data.flowType=='FILING')&&res.data.appStatus=='已提交')||(appStatusArr.indexOf(res.data.appStatus)>0&&res.data.flowType=="MEETING"))) {
          this.showType = true;
        } else {
          this.showType = false;
        }

        this.inforData.appName = res.data.appName
        this.inforData.flowType = res.data.flowType
        if(type!='del'){
          page({
            current: 1,
            size: 10,
            nominateId:this.inforData.ttNominateAppId
          }).then(res=>{
            this.$set(this.inforData,'ttNominateAppName',res.data.records[0].nominateName)
          })
        }

      })
      //获取列表
      pageAppRule({
        pageNo: 1,
        pageSize: 99999,
        mtzAppId:
          this.$route.query.mtzAppId ||
          JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId,
        sortType: 'DESC',
        sortColumn: 'id'
      }).then((res) => {
        var num = 0
        res.data.forEach((e) => {
          // if (!e.formalFlag) {
          if (e.formalFlag == 'N') {
            num++
          }
        })
        this.numIsNomi = num
      })
    },
    saveClose(val) {
      this.applyNumber = val;
      this.closeDiolog();
      this.init();
      this.$refs.approveTable.init()

    },
    closeDiolog() {
      this.mtzAddShow = false;
    },
    relation() {//关联零件定点申请
      iMessageBox(this.language('GLSQDHWFCMTZJMFQTJCHHWLZDJQXDDDCZ', '关联申请单后，无法从MTZ界面发起提交、撤回、会外流转、冻结、取消定点等操作'), this.language('LK_WENXINTISHI', '温馨提示'), {
        confirmButtonText: this.language('QUEREN', '确认'),
        cancelButtonText: this.language('QUXIAO', '取消')
      }).then(res => {
        this.mtzAddShow = true;
      })
    },

    cancelRelation() {
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
            this.$set(this.inforData,'ttNominateAppName','')
            this.getsyncAuther()
            this.init('','del');
            this.$refs.approveTable.init()

          } else {
            iMessage.error(res.desZh)
          }
        })
      }).catch(res => {

      })
    },
    getsyncAuther() {
      syncAuther({ mtzAppId: this.$route.query.mtzAppId, tag: "" })
    },
  }
}
</script>

<style lang='scss' scoped>
.block{
  display:block;
  margin-bottom:10px;
}

::v-deep.el-button--default{
  font-size: 20px!important;
}
.info {
  display: flex;
  align-items: center;
  span {
    font-size: 16px;
  }
}
.text{
}
.title {
  // font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.font18{
  font-size: 18px!important;
}
.font20_b{
  font-size: 20px!important;
font-weight: bold;
}
.font18_b{
  font-size: 18px!important;
font-weight: bold;
}
</style>
