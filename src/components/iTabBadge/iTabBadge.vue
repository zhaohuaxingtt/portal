<template>
  <div class="tab-badge">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.tab-badge {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ::v-deep .tab:last-child::after {
    background: transparent;

  }
}
</style>
