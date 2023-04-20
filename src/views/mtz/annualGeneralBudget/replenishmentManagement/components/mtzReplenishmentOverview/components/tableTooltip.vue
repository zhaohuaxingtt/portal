<template>
  <div class="flexBox">
    <el-tooltip :content="content" placement="top" effect="light">
      <div class="content">{{ content }}</div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  props: {
    content: String,
  }
}
</script>

<style lang="scss" scoped>
  .flexBox {
    display: flex;
    align-items: center;
    text-align: left;

    .left {
      flex: 1;
      width: 0;
    }

    .content {
      flex: 1;
      width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>