<template>
  <div class="page-log-icons" :class="{ hidden: rightIconVisible }">
    <div class="icon-lot">
      <icon symbol class="icon svg-icon" name="iconrizhiwuzi" />
      <span>{{ $t('APPROVAL.LOG') }}</span>
    </div>
    <div class="icon-lot">
      <icon symbol class="icon svg-icon" name="icondatabaseweixuanzhong" />
    </div>
  </div>
</template>

<script>
import { Icon } from 'rise'
export default {
  name: 'PageLogIcons',
  components: { Icon },
}
</script>

<style lang="scss" scoped>
.page-log-icons {
  display: flex;
  align-items: center;
  .icon-lot {
    font-size: 20px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .svg-icon {
      opacity: 0.2;
      transition: all 0.2s ease-in;
    }
    span {
      font-size: 14px;
      margin-left: 5px;
      color: #cad9f8;
      cursor: pointer;
      transition: all 0.2s ease-in;
    }
    &.hidden {
      display: none;
    }
    &:hover {
      .svg-icon {
        opacity: 1;
      }
      span {
        color: $color-blue;
      }
    }
  }
}
</style>
