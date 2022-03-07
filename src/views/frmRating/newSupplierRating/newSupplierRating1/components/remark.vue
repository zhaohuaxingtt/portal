<!--
 * @Author: zbin
 * @Date: 2021-05-21 11:00:01
 * @Descripttion: your project
-->
<template>
  <iCard :title="$t('SPR_FRM_XGYSPJ_GYSZRPGMXBZ')" tabCard>
    <iInput v-permission.edit="PORTAL_SUPPLIER_NAV_XINGONGYINGSHANGPINGJI_REMARK" v-model="remark" type="textarea" rows="4"></iInput>
  </iCard>
</template>

<script>
import { iCard, iInput, iMessage } from 'rise'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'
import { unableRatings, submitApprove } from "@/api/frmRating/newSupplierRating/newSupplierRating";

export default {
  mixins: [generalPageMixins],
  components: {
    iCard,
    iInput,
  },
  data() {
    return {
      additionalType: 'finanical_data',
      remark: this.$route.query.remark || '',
      contentLoading: false
    }
  },
  methods: {
    async unableRatings() {
      if (this.remark === '') {
        iMessage.warn(this.$t('SPR_FRM_XGYSPJ_QZGYSZRPGMXBZZTXWFPJYY'))
        return
      }
      const pms = {
        remark: this.remark,
        ratingId: this.$route.query.id
      }
      const res = await unableRatings(pms)
      this.resultMessage(res)
    },
    async submitApprove() {
      const pms = {
        remark: this.remark,
        ratingId: this.$route.query.id
      }
      const res = await submitApprove(pms)
      this.resultMessage(res)
    },
    backRemark() {
      return this.remark
    }
  }
}
</script>

<style scoped>
</style>