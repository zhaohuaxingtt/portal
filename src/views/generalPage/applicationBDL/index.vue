<!--
 * @Author: your name
 * @Date: 2021-11-09 15:26:24
 * @LastEditTime: 2022-02-21 16:29:41
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\views\generalPage\applicationBDL\index.vue
-->
<template>
  <i-page>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{mbdl?'MDBL':'BDL'}}{{$t('LK_SHENQING')}}</span>
      <div class="floatright">
        <log-button class="logButton"
                    @toLogPage="toLog" />
      </div>
    </div>
    <!-- <application-search @getTableList='getTableList'/> -->
    <application-table />
    <iUserLog :show.sync="showDialog"
              menuId="WS3203"
              is-page />
  </i-page>
</template>

<script>
import { iPage } from 'rise'
import applicationTable from './components/applicationTable'
import logButton from '@/components/logButton'
import iUserLog from '@/components/iUserLog'
export default {
  components: {
    iPage,
    applicationTable,
    logButton,
    iUserLog
  },
  data () {
    return {
      mbdl: false,
      showDialog: false
    }
  },
  created () {
    this.mbdl = this.$route.query.mbdl
  },
  methods: {
    toLog () {
      this.showDialog = true
    }
  }
}
</script>

<style scoped>
</style>