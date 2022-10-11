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
    <formInformation ref="formInformation"
                     :isView="isView"
                     :formData="formData"></formInformation>
    <enclosureList ref="enclosureList"
                   :isView="isView"
                   class="margin-top20"></enclosureList>
    <dosageDetails ref="dosageDetails"
                   :isView="isView"
                   class="margin-top20"></dosageDetails>
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import dosageDetails from './components/dosageDetails'
import enclosureList from './components/enclosureList'
import formInformation from './components/formInformation'
import { genericAppChangeDetail } from '@/api/mtz/annualGeneralBudget/mtzChange.js'
export default {
  data () {
    return {
      formData: {},
      mtzAppId: "",
      isView: false
    }
  },
  components: {
    formInformation,
    enclosureList,
    dosageDetails,
    iPage
  },
  created () {
    this.mtzAppId = this.$route.query.mtzAppId
    this.$nextTick(() => {
      this.init()
    });
  },
  methods: {
    init () {
      this.getGenericAppChangeDetail()
    },
    getGenericAppChangeDetail () {
      genericAppChangeDetail({
        mtzAppId: this.mtzAppId
      }).then(res => {
        if (res.code === '200') {
          this.formData = res.data
          if (res.data.appStatus === "草稿" || res.data.appStatus === "未通过") {
            this.isView = false
          } else {
            this.isView = true
          }
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
</style>