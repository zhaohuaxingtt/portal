<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2021-12-06 20:56:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\ws3\generalPage\mainSubSuppliersAndProductNames\index.vue
-->
<template>
  <div>
    <base-info-card v-if="this.supplierType > 3" />
    <supplier-directory-table
      class="margin-top20"
      ref="supplierDirectoryTable"
    />
    <supplier-user-name-table
      class="margin-top20"
      ref="supplierUserNameTable"
    />
  </div>
</template>

<script>
import baseInfoCard from '@/views/generalPage/components/baseInfoCard'
import supplierDirectoryTable from './components/supplierDirectoryTable'
import supplierUserNameTable from './components/supplierUserNameTable'
import { generalPageMixins } from '@/views/generalPage/commonFunMixins'

export default {
  mixins: [generalPageMixins],
  components: {
    baseInfoCard,
    supplierDirectoryTable,
    supplierUserNameTable
  },
  methods: {
    async saveInfos(step) {
      await Promise.all([
        this.$refs.supplierDirectoryTable.saveInfos(step),
        this.$refs.supplierUserNameTable.saveInfos(step)
      ])
    },
    async handleNextStep() {
      let flag = false
      const res = await Promise.all([
        this.$refs.supplierDirectoryTable.handleNextStep(),
        this.$refs.supplierUserNameTable.handleNextStep()
      ])
      flag = res[0] && res[1]
      return flag
    }
  }
}
</script>

<style scoped></style>
