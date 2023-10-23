<template>
  <div
    class="tab"
    :class="{ active: active, 'active-border': activeBorder }"
    @click="$emit('click')"
  >
    <span class="badge" :class="{ large: badge > 99 }" v-if="badge > 0">
      {{ badge > 99 ? '99+' : badge }}
    </span>
    <span :class="{ nameActive: active, name: !active }">
      {{ language(name) }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    badge: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
    },
    activeBorder: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.tab {
  font-size: 18px;
  color: rgba(0, 0, 0, 0.42);
  position: relative;
  cursor: pointer;
  // padding: 0px 5px;
  margin: 0px 0px 0px 49px;
  &::after {
    content: '';
    display: block;
    background: #67C23A;
    position: absolute;
    right: -25px;
    top: 50%;
    width: 1px;
    height: 16px;
    background: #909091;
    opacity: 0.58;
    transform: translateY(-50%);
  }
  &::before {
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background: #67C23A;
    position: absolute;
    bottom: -6px;
    left: 0;
    transition: all 0.1s ease-in;
  }
  &.active {
    color: #67C23A;
  }
  &.active.active-border {
    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background: #67C23A;
      position: absolute;
      bottom: -6px;
      left: 0;
    }
  }
  .nameActive {
    font-weight: bold;
  }
  .name {
    font-weight: normal;
  }
  .badge {
    min-width: 20px;
    height: 20px;
    line-height: 20px;
    background: #e30d0d;
    border-radius: 50%;
    color: #fff;
    text-align: center;
    font-size: 12px;
    display: block;
    position: absolute;
    top: -10px;
    right: -20px;
    &.large {
      padding: 0px 5px;
      border-radius: 10px;
    }
  }
}
</style>
