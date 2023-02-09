<template>
  <div class="approval-overview-panel" @click="$emit('open', data)">
    <div class="header">
      <div class="name">{{ data.taskName }}</div>
      <div class="cat-name" v-if="categoryName">
        <span class="text">{{ categoryName }}</span>
        <div class="bg"></div>
      </div>
    </div>
    <div class="content">
      <div class="total">
        <div class="sub-title">
          <span>{{ data.overdueQty }}</span>
          <div>
            <span class="sub-title-icon">
              <icon symbol class="icon" name="iconyuqidaiban" />
            </span>
            <span class="text">{{ $t('LK_YUQIDAIBAN') }}</span>
          </div>
        </div>
        <div class="sub-title">
          <span>/</span>
        </div>
        <div class="sub-title">
          <span>{{ data.todayQty }}</span>
          <div>
            <span class="sub-title-icon">
              <icon symbol class="icon" name="iconjinridaiban" />
            </span>
            <span class="text">{{ $t('LK_JINRIDAIBAN') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'rise'
export default {
  name: 'overview',
  components: { Icon },
  props: {
    data: {
      type: Object
    },
    categoryName: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
$color-blue-1: #001847;
$color-blue-2: #3a5280;
$color-blue-3: #2d539b;
.approval-overview-panel {
  width: 320px;
  height: 180px;
  position: relative;
  background: #fff;
  box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.08);
  border-radius: 8px;
  margin-right: 35px;
  margin-bottom: 35px;
  cursor: pointer;
  .header {
    display: flex;
    justify-content: space-between;
    position: relative;
    min-height: 62px;
    .name {
      font-size: 14px;
      color: $color-blue-1;
      font-weight: bold;
      margin: 20px 0 0 20px;
      white-space: normal;
      text-overflow: ellipsis;
      max-width: calc(100% - 106px);
    }
    .cat-name {
      .text {
        color: $color-blue-3;
        line-height: 28px;
      }
      background: #cedeff;
      height: 28px;
      position: absolute;
      top: 20px;
      right: -5px;
      padding-right: 8px;
      padding-left: 24px;
      &::before {
        position: absolute;
        left: 0;
        top: -14px;
        content: '';
        display: block;
        width: 0;
        height: 0;
        border-right: transparent 0 solid;
        border-left: solid 14px #fff;
        border-top: solid 28px transparent;
        border-bottom: solid 28px transparent;
      }
      &::after {
        position: absolute;
        right: 0;
        bottom: -4px;
        content: '';
        display: block;
        width: 0;
        height: 0;
        border-right: transparent 2px solid;
        border-left: solid 2px #6d86b9;
        border-top: solid 2px #6d86b9;
        border-bottom: solid 2px transparent;
      }
    }
  }
  .content {
    margin-top: 13px;
    .total {
      display: flex;
      justify-content: center;
    }
    .sub-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      color: $color-blue-1;
      font-size: 14px;
      text-align: center;
      margin-top: 6px;
      & > span:nth-child(1) {
        padding: 0 20px;
        font-size: 46px;
        font-weight: bold;
      }
      &:nth-child(1) {
        & > span:nth-child(1) {
          color: $color-update;
        }
      }
      &:nth-child(2) {
        display: flex;
        justify-content: flex-start;
      }
      &:nth-child(3) {
        & > span:nth-child(1) {
          color: $color-blue-2;
        }
      }
      .text {
        margin-left: 4px;
      }
    }
  }
}
</style>
