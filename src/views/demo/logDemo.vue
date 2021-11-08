<template>
  <iPage>
    <el-button @click="open">open</el-button>
    <iLog :show.sync="showDialog" :bizId="bizId" />
  </iPage>
</template>

<script>
import { iPage, iLog } from 'rise'
// import iLog from '@/components/iLog'
export default {
  data() {
    return {
      showDialog: false,
      bizId: 2
    }
  },
  components: { iPage, iLog },
  methods: {
    open() {
      this.showDialog = true
    }
  }
}
</script>
