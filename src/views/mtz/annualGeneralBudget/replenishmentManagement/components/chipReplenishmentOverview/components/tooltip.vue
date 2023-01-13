<template>
  <div>
    <span>{{ content }}</span>
    <el-tooltip effect="light" placement="top" v-bind="$attrs">
      <div slot="content">
        {{ tip }}
      </div>
      <i class="el-icon-warning-outline margin-left10" style="color: blue"></i>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    content: String,
    tip: String
  }
}
</script>

<style lang="scss" scoped>
</style>