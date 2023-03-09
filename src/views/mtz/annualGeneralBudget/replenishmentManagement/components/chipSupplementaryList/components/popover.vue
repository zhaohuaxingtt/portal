<template>
  <el-popover placement="right" trigger="click">
    <process-vertical :instanceId="instanceId" />
    <process-vertical :epmsId="epmsId" />
    <el-button type="text" slot="reference">
      {{ statusName }}
    </el-button>
  </el-popover>
</template>

<script>
import processVertical from './processVertical.vue'
export default {
  components: { processVertical },
  props: {
    instanceId: {
      type: String
    },
    epmsId: {
      type: String
    },
    statusName: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
</style>