<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: 水痕
 * @Descripttion: 风险信号
-->
<template>
  <iPage v-loading='loading'>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{$route.query.flag==='creat'?$t('SPR_FRM_FXXH_SDFQFXXH'):$t('SPR_FRM_FXXH_XTFQXH')}}</span>
      <div class="floatright">
        <i-button v-if="$route.query.flag==='creat'"
                  @click="handleRegister">{{language('NTIERYAOQINGZHUCE','N-tier邀请注册') }}</i-button>
        <i-button :disabled="effectiveTimeDisabled"
                  @click="saveInfos('submit')">{{ $t('LK_TIJIAO') }}</i-button>
        <i-button :disabled="effectiveTimeDisabled"
                  @click="saveInfos('tempStore')">{{ $t('SUPPLIER_ZANCUN') }}</i-button>
      </div>
    </div>
    <basicInformation :preliminaryAssessmentDisabled="preliminaryAssessmentDisabled"
                      :disabled="disabled"
                      :effectiveTimeDisabled="effectiveTimeDisabled"
                      ref="basicInformation"
                      :tableListData='tableListData'
                      class="margin-bottom20 clearFloat" />
    <signalThat :disabled="disabled"
                ref="signalThat"
                :tableListData='tableListData'
                class="margin-bottom20 clearFloat" />
    <evolve :disabled="disabled"
            ref="evolve"
            :tableListData='tableListData' />
    <listDialog v-model="listDialog" />
  </iPage>
</template>

<script>
import { iPage, iButton, iMessage, iMessageBox } from 'rise';
import basicInformation from "./components/basicInformation.vue";
import signalThat from "./components/signalThat.vue";
import evolve from "./components/evolve.vue";
import { getDetail, temporaryStorage, submit } from "@/api/frmRating/riskSignal/riskSignal.js";
import listDialog from "./components/registerDialog";
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'

export default {
  mixins: [generalPageMixins],
  components: {
    iPage,
    iButton,
    basicInformation,
    signalThat,
    evolve,
    listDialog,
  },
  data () {
    return {
      tableListData: {},
      listDialog: false,
      loading: false,
      disabled: false,
      effectiveTimeDisabled: false,//有效期
      preliminaryAssessmentDisabled: false,
    };

  },
  created () {
    if (this.$route.query.flag !== 'creat') {
      this.getTableList()
    }
  },
  methods: {
    handleRegister () {
      this.listDialog = true
    },
    async getTableList () {
      const pms = {
        id: this.$route.query.id
      }
      const res = await getDetail(pms)
      if (this.$route.query.flag === 'copy') {
        res.data.oldRiskSignalId = res.data.id
        res.data.id = null
      }
      this.tableListData = res.data
      if (this.tableListData.versionNum === 0) {
        return
      }
      if ((this.tableListData.status === 'MANAGEMENT' || (this.$store.state.permission.userInfo.deptDTO.deptNum.indexOf('FRM') === -1)) && this.$route.query.flag !== 'creat') {
        this.disabled = true
        this.preliminaryAssessmentDisabled = true
      }
      if ((this.tableListData.status === 'MANAGEMENT' || (this.$store.state.permission.userInfo.deptDTO.deptNum.indexOf('FRM') === -1)) && this.$route.query.flag === 'view') {
        this.effectiveTimeDisabled = true
      }
      // 查看/复制进来信号来源是初评 风险信号大类合小类不可编辑
      if (this.tableListData.signalFrom === '初步评级' && this.$route.query.flag !== 'creat') {
        this.preliminaryAssessmentDisabled = true
      }
      // 复制 不置灰
      if (this.$route.query.flag === 'copy') {
        this.disabled = false
      }
    },
    saveInfos (step) {
      this.$refs.basicInformation.$refs.baseRulesForm.validate(async (valid) => {
        if (valid) {
          this.loading = true
          const basicInformation = this.$refs.basicInformation.basicInformationBack()
          const signalThat = this.$refs.signalThat.signalThatBack()
          const evolve = this.$refs.evolve.evolveBack()
          const pms = {
            ...basicInformation,
            description: signalThat,
            progress: evolve
          }
          if (step === 'submit') {
            // 新建  处置方式为初步评级 调整分和有效期不能为空
            if (pms.processType === 'PRELIMINARY_RATING') {
              if (!pms.adjustDirection || !pms.adjustScore || !pms.effectiveTime) {
                iMessage.warn(this.$t('SPR_FRM_FXXH_TZFHYXQBNWK'))
                this.loading = false
                return false
              }
            }
            iMessageBox(
              pms.processType === '' && this.$route.query.flag !== 'creat' ? this.$t('SPR_FRM_FXXH_QXZCZFSHZJXTJ') : this.$store.state.permission.userInfo.deptDTO.deptNum.indexOf('FRM') !== -1 && pms.processType === '' && pms.status === '' ? this.$t('SPR_FRM_FXXH_QQRSFTJ') : this.$t('SPR_FRM_FXXH_SFQRTJ'), // 暂时处理
              this.$t('LK_WENXINTISHI'),
              { confirmButtonText: this.$t('LK_QUEDING'), cancelButtonText: this.$t('LK_QUXIAO') }
            ).then(async () => {
              const res = await submit(pms)
              this.resultMessage(res, () => {
                this.loading = false
                this.$router.push({ path: '/supplier/frmrating/riskSignal' })
              }, () => {
                this.loading = false
              })
            }, () => {
              this.loading = false
            })
          } else {
            const res = await temporaryStorage(pms)
            this.resultMessage(res, () => {
              this.loading = false
              this.$router.push({ path: '/supplier/frmrating/riskSignal' })
            }, () => {
              this.loading = false
            })
          }
        }
      })
    }
  },
};
</script>

<style scoped>
</style>
