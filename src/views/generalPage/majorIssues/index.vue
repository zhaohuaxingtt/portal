<template>
  <div>
    <base-info-card/>
    <judicial-information class="margin-top20"/>
    <administrative-penalties class="margin-top20"/>
  </div>
</template>

<script>
import baseInfoCard from '@/views/generalPage/components/baseInfoCard'
import judicialInformation from './components/judicialInformation'
import administrativePenalties from './components/administrativePenalties'
import {generalPageMixins} from '@/views/generalPage/commonFunMixins'

export default {
  mixins: [generalPageMixins],
  components: {
    baseInfoCard,
    judicialInformation,
    administrativePenalties
  }

}
</script>

<style scoped>

</style>
