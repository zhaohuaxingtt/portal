<!--
 * @Author: your name
 * @Date: 2021-11-09 15:26:24
 * @LastEditTime: 2021-12-02 21:15:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\views\generalPage\applicationBDL\index.vue
-->
<template>
  <i-page>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{mbdl?'MDBL':'BDL'}}{{$t('LK_SHENQING')}}</span>
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
  },
  data () {
    return {
      mbdl: false
    }
  },
  created () {
    this.mbdl = this.$route.query.mbdl
  }
}
</script>

<style scoped>
</style>