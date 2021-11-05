<template>
  <div class="page-header" :class="{ border: border }">
    <span class="font20 font-weight">
      <slot name="default"></slot>
    </span>
    <slot name="actions"></slot>
  </div>
</template>

<script>
export default {
  name: 'pageHeader',
  props: {
    border: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 6px;
  &.border {
    border-bottom: solid 1px #e3e3e3;
  }
}
</style>
