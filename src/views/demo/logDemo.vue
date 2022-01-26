<template>
  <iPage>
    <el-button @click="open">open</el-button>
    <iLog :show.sync="showDialog" :bizId="bizId" is-page />
    <el-button @click="showDialog1 = true">open user log</el-button>
    <iUserLog :show.sync="showDialog1" bizId="1" menuId="2" is-page :days="10" />
  </iPage>
</template>

<script>
import { iPage, iLog } from 'rise'
// import iLog from '@/components/iLog'
import iUserLog from '@/components/iUserLog'
export default {
  data() {
    return {
      showDialog: false,
      bizId: 2,
      showDialog1: false
    }
  },
  components: { iPage, iLog, iUserLog },
  methods: {
    open() {
      this.showDialog = true
    }
  }
}
</script>
