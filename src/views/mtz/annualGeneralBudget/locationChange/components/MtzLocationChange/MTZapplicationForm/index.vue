<!--
 * @Author: your name
 * @Date: 2021-10-27 19:18:05
 * @LastEditTime: 2021-10-29 14:31:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\MTZapplicationForm\index.vue
-->
<template>
  <iPage>
    <formInformation ref="formInformation"></formInformation>
    <enclosureList ref="enclosureList"
                   class="margin-top20"></enclosureList>
    <dosageDetails ref="dosageDetails"
                   class="margin-top20"></dosageDetails>
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import dosageDetails from './components/dosageDetails'
import enclosureList from './components/enclosureList'
import formInformation from './components/formInformation'
export default {
  data () {
    return {

    }
  },
  components: {
    formInformation,
    enclosureList,
    dosageDetails,
    iPage
  },
  created () {
    console.log(this.$route.query)
  }
}
</script>

<style lang="scss" scoped>
</style>