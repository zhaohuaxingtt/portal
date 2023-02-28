<!--
 * @Author: your name
 * @Date: 2021-11-01 14:43:37
 * @LastEditTime: 2021-11-02 15:43:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationPoint\components\approverRecord\index.vue
-->

<template>
  <iPage>
    <iCard>
      <div class="title">
        <span class="font18_b">{{ language('关联定点申请', "关联定点申请") }}</span>
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
        <span>{{ language('定点申请单号', '定点申请单号') }}：</span>
        <iInput style="width:100px;margin-right:20px" v-model="inforData.ttNominateAppId" :disabled="true" />
        <span>{{ language('定点申请单名称', '定点申请单名称') }}：</span>
        <iInput style="width:100px" v-model="inforData.ttNominateAppName" :disabled="true" />
      </div>

    </iCard>
    <approveTable style="margin-top:20px"></approveTable>
    <iDialog :title="language('LINGJIANDINGDIANSHENQING', '零件定点申请')" :visible.sync="mtzAddShow" v-if="mtzAddShow"
      width="85%" @close='closeDiolog'>
      <partApplication @close="saveClose" :numIsNomi="numIsNomi" :inforData="inforData"></partApplication>
    </iDialog>
  </iPage>
</template>

<script>
import partApplication from "../applyInfor/partApplication";
import {
  getAppFormInfo,
  disassociate,
  pageAppRule
} from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/details';
import { syncAuther } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/mtzLocation/approve'

import { iPage, iCard, iButton, iLabel, iInput, iMessageBox, iDialog,iMessage } from 'rise'
import approveTable from './components/approveTable'
export default {
  components: {
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
      this.init()
    }
  },
  methods: {
    init(val) {
      getAppFormInfo({
        mtzAppId: this.$route.query.mtzAppId || JSON.parse(sessionStorage.getItem('MtzLIst')).mtzAppId
      }).then(res => {
        this.$set(this.inforData,'ttNominateAppName',res.data.ttNominateAppName)
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
        if ((res.data.appStatus == '草稿' || res.data.appStatus == '未通过')||(((res.data.flowType=='SIGN'||res.data.flowType=='FILING')&&res.data.appStatus=='已提交')||(res.data.appStatus!='冻结'&&res.data.flowType=="MEETING"))) {
          this.showType = true;
        } else {
          this.showType = false;
        }

        this.inforData.appName = res.data.appName
        this.inforData.flowType = res.data.flowType
        console.log(this.applyNumber === '' && this.showType)
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
            this.getsyncAuther()
            this.init();
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
.info {
  span {
    font-size: 16px;
  }
}

.title {
  // font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.font18_b{
  font-size: 18px;
font-weight: bold;
}
</style>
