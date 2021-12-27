<template>
  <iPage>
    <el-button @click="open">open</el-button>
    <iLog :show.sync="showDialog" :bizId="bizId" is-page />
    <el-button @click="showDialog1 = true">open user log</el-button>
    <iUserLog :show.sync="showDialog1" bizId="" menuId="2" is-page />
  </iPage>
</template>

<script>
import { iPage, iLog } from 'rise'
import iUserLog from '@/components/iUserLog'
export default {
  data() {
    return {
      showDialog: false,
      bizId: 2,
      showDialog1: false,
    }
  },
  components: { iPage, iLog,iUserLog },
  methods: {
    open() {
      this.showDialog = true
    }
  }
}
</script>
