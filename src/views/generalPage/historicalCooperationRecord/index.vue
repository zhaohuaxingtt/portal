<template>
  <div>
    <base-info-card/>
    <his-form class="margin-top20"/>
    <his-table class="margin-top20"/>
<!--    <project-description class="margin-top20"/>-->
  </div>
</template>

<script>
import baseInfoCard from '@/views/generalPage/components/baseInfoCard'
import hisForm from './components/hisForm'
import hisTable from './components/hisTable'
import {generalPageMixins} from '@/views/generalPage/commonFunMixins'
//import projectDescription from './components/projectDescription'

export default {
  mixins: [generalPageMixins],
  components: {
    hisForm,
    hisTable,
    baseInfoCard
  }
}
</script>

<style scoped>

</style>
