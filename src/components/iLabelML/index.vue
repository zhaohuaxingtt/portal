<template>
  <div class="title-header">
    <div class="label">
      <slot name="label"></slot>
    </div>
    <el-popover placement="right" trigger="hover">
      <div class="text-content">
        <slot></slot>
      </div>
      <div class="tip" v-if="showTip" slot="reference">
        <div class="image-box">
          <img src="../../assets/images/tool-tip.png" />
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  props: {
    showTip: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.title-header {
  display: flex;
  line-height: 35px;
  .image-box {
    cursor: pointer;
    width: 14px;
    height: 17px;
    position: relative;
    img {
      position: absolute;
      top: 50%;
      object-fit: contain;
      /* transform: translateY(2px); */
    }
  }
}
::v-deep .el-icon-question-box {
  display: flex;
  align-items: center !important;
  height: 35px !important;
}
::v-deep .margin-left4 {
  display: none;
}
</style>
