<template>
  <i-page>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">BDL{{$t('LK_SHENQING')}}</span>
      <div class="floatright">
        <log-button />
      </div>
    </div>
    <!-- <application-search @getTableList='getTableList'/> -->
    <application-table />
  </i-page>
</template>

<script>
import { iPage } from 'rise'
import applicationTable from './components/applicationTable'
import logButton from '@/components/logButton'

export default {
  components: {
    iPage,
    applicationTable,
    logButton
  }
}
</script>

<style scoped>

</style>