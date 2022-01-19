<!--
 * @Author: zbin
 * @Date: 2021-05-21 10:39:35
 * @Descripttion: your project
-->
<template>
  <iPage>
    <supplierMessage @handleSumbit='handleSumbit' class="margin-bottom20" />
    <financialDataTable @submitCalculateRefresh="submitCalculateRefresh" class="margin-bottom20"></financialDataTable>
    <basicInformationTable v-loading='loading' :basicDTO='basicDTO' ref="basicInformationTable" class="margin-bottom20" />
    <shareholderInformationTable class="margin-bottom20" />
    <financialOverview v-loading='loading' :financeDTO='financeDTO' class="margin-bottom20" />
    <pkpiTable v-loading='loading' :resultVO='resultVO' :otherVO='otherVO' :scoreDTO='scoreDTO' ref="pkpiTable" class="margin-bottom20" />
    <riskEarlyWarningTable v-loading='loading' :riskDTO='riskDTO' class="margin-bottom20" />
    <remarks v-loading='loading' ref="remarks" class="margin-bottom20" />
  </iPage>
</template>

<script>
import { iPage, iMessage, iMessageBox } from 'rise';
import basicInformationTable from "./components/basicInformationTable";
import supplierMessage from './components/supplierMessage'
import financialDataTable from "@/views/generalPage/financialData/index.vue";
import shareholderInformationTable from "./components/shareholderInformationTable";
import financialOverview from "./components/financialOverview";
import pkpiTable from "./components/pkpiTable";
import riskEarlyWarningTable from "./components/riskEarlyWarningTable";
import remarks from "./components/remark";
import { getCalculate } from "@/api/frmRating/newSupplierRating/newSupplierRating";
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import { getFinancialOverviewTitle } from "./components/data";
export default {
  mixins: [generalPageMixins],
  components: {
    iPage,
    basicInformationTable,
    supplierMessage,
    financialDataTable,
    shareholderInformationTable,
    financialOverview,
    pkpiTable,
    riskEarlyWarningTable,
    remarks,
  },
  data() {
    return {
      basicDTO: [],
      financeDTO: [],
      scoreDTO: [],
      riskDTO: [],
      otherVO: [],
      resultVO: [],
      loading: false
    };
  },
  created() {
    this.submitCalculate('view')
  },
  methods: {
    async handleSumbit(e) {
      this.loading = true
      switch (e) {
        case '提交计算':
          var flag = await this.handleSave()
          if (flag !== false) {
            var regMoney = await this.$refs.basicInformationTable.backRemark()
            this.submitCalculate('calculate', regMoney)
          }
          break;
        case '无法评级':
          var flag = await this.handleSave()
          flag && this.$refs.remarks.unableRatings()
          break;
        case '提交审批':
          iMessageBox(
            this.$t('SPR_FRM_FXXH_NSFQRTJSP'), // 暂时处理
            this.$t('LK_WENXINTISHI'),
            { confirmButtonText: this.$t('LK_QUEDING'), cancelButtonText: this.$t('LK_QUXIAO') }
          ).then(async (res) => {
            var flag = await this.handleSave()
            if (flag !== false) {
              this.$refs.remarks.submitApprove()
            }
          })
          break;
        case '保存':
          var flag = await this.handleSave('save')
          if (flag !== false) {
            await this.submitCalculate('view')
          }
          break;
        default:
          break;
      }
      this.loading = false
    },
    async handleSave(flag) {
      var regMoney = this.$refs.basicInformationTable.backRemark()
      if (regMoney === '') {
        iMessage.warn(this.$t('SPR_FRM_XGYSPJ_ZCZBY'))
        return false
      }
      var remark = this.$refs.remarks.backRemark()
      await this.$refs.pkpiTable.$refs.pkpiTable2.saveInfos(remark, regMoney, flag)
      return true
    },
    submitCalculateRefresh(viewType){
      this.submitCalculate(viewType);
    },
    async submitCalculate(viewType) {
      this.loading = true
      const pms = {
        viewType: viewType,
        ratingSupplierId: this.$route.query.supplierId,
        ratingId: this.$route.query.id
      }
      const res = await getCalculate(pms)
      viewType !== 'view' && this.resultMessage(res)
      this.loading = false
      this.basicDTO = res.data.basicDTO
      this.financeDTO = res.data.financeDTO
      this.scoreDTO = res.data.scoreDTO
      this.scoreDTO[14]['value2'] = this.scoreDTO[15]['value']
      this.scoreDTO.splice(15,1)
      this.riskDTO = res.data.riskDTO
      this.otherVO = [res.data.otherVO]
      this.resultVO = [res.data.resultVO]
      getFinancialOverviewTitle(res.data.years)
    },
  },
};
</script>

<style scoped>
</style>
