<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2021-04-13 17:30:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <div>
    <base-info-card/>
    <sub-supplier-table class="margin-top20" ref="subSupplier"/>
    <payment-table class="margin-top20" ref="payment"/>
    <purchasing-content class="margin-top20"/>
  </div>
</template>

<script>
import baseInfoCard from '@/views/generalPage/components/baseInfoCard'
import subSupplierTable from './components/subSupplierTable'
import paymentTable from './components/paymentTable'
import purchasingContent from './components/purchasingContent'
import {generalPageMixins} from '@/views/generalPage/commonFunMixins'


export default {
  mixins: [generalPageMixins],
  components: {
    baseInfoCard,
    subSupplierTable,
    paymentTable,
    purchasingContent
  },
  methods: {
    async saveInfos(step) {
      await Promise.all([
        this.$refs.subSupplier.saveInfos(step),
        this.$refs.payment.saveInfos(step)
      ])
    },
    async handleNextStep() {
      let flag = false
      const res = await Promise.all([
        this.$refs.subSupplier.handleNextStep(),
        this.$refs.payment.handleNextStep()
      ])
      flag = res[0] && res[1]
      return flag
    }
  }
}
</script>

<style scoped>

</style>
