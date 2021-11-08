<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2021-04-13 17:30:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
-->
<template>
  <div>
    <base-info-card/>
    <updating-files class="margin-top20" ref="updatingFiles"/>
    <free-upload class="margin-top20" ref="freeUpload"/>
  </div>
</template>

<script>
import baseInfoCard from '@/views/generalPage/components/baseInfoCard'
import updatingFiles from './components/updatingFilesTable'
import freeUpload from './components/freeUploadTable'
import {generalPageMixins} from '@/views/generalPage/commonFunMixins'

export default {
  mixins: [generalPageMixins],
  components: {
    baseInfoCard,
    updatingFiles,
    freeUpload
  },
  methods: {
    async saveInfos(step) {
      await Promise.all([
        this.$refs.updatingFiles.saveInfos(step),
        this.$refs.freeUpload.saveInfos(step)
      ])
    },
    async handleNextStep() {
      let flag = false
      const res = await Promise.all([
        this.$refs.updatingFiles.handleNextStep(),
        this.$refs.freeUpload.handleNextStep()
      ])
      flag = res[0] && res[1]
      return flag
    }
  }
}
</script>

<style scoped>

</style>
