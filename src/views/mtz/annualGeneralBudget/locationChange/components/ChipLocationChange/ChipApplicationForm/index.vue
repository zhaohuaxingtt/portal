<!--
 * @Author: your name
 * @Date: 2021-10-27 19:18:05
 * @LastEditTime: 2021-11-23 15:43:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\MTZapplicationForm\index.vue
-->
<template>
  <iPage>
    <formInformation
      ref="formInformation"
      :isView="isView"
      :formData="formData"
    ></formInformation>
    <enclosureList
      ref="enclosureList"
      :isView="isView"
      class="margin-top20"
    ></enclosureList>
    <dosageDetails
      ref="dosageDetails"
      :isView="isView"
      class="margin-top20"
    ></dosageDetails>
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import dosageDetails from './components/dosageDetails'
import enclosureList from './components/enclosureList'
import formInformation from './components/formInformation'
import { getDetailById } from '@/api/mtz/annualGeneralBudget/chipChange.js'
import { getAppById } from '@/api/mtz/annualGeneralBudget/replenishmentManagement/chipLocation/details'
export default {
  data() {
    return {
      formData: {},
      appId: '',
      isView: false
    }
  },
  components: {
    formInformation,
    enclosureList,
    dosageDetails,
    iPage
  },
  created() {
    this.appId = this.$route.query.appId
    this.getDetail()
  },
  methods: {
    getDetail() {
      // getDetailById
      getAppById({ appId: this.appId }).then((res) => {
        if (res.code === '200') {
          this.formData = res.data.chipChangeBase
          if (
            res.data.appStatus === '草稿' ||
            res.data.appStatus === '未通过'
          ) {
            this.isView = false
          } else {
            this.isView = true
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>