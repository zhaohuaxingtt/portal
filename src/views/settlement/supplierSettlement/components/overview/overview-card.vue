<template>
  <div class="approval-overview-panel" @click="$emit('open', data)">
    <div class="header">
      <div class="name" :title="data.value">
        {{ language(`settlement.ov.${data.status}`) }}
      </div>
      <div class="cat-name" v-if="data.type">
        <span class="text">{{ language(`settlement.ov.${data.type}`) }}</span>
        <div class="bg"></div>
      </div>
    </div>
    <div class="content">
      <div class="total">{{ data.size }}</div>
      <div class="sub-title">
        <span class="sub-title-icon"> 
          <icon symbol :name="data.icon" class="font-size16 margin-left5" />
        </span>
        <span class="text">{{ language(`settlement.ov.${data.type}_qty`) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { icon } from 'rise';
export default {
  name: 'OverviewCard',
  components: { icon },
  props: {
    data: {
      type: Object
    },
    categoryName: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'APPLY'
    }
  }
};
</script>

<style lang="scss" scoped>
// @import url(); 引入公共css类
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

    .name {
      font-size: 16px;
      color: $color-blue-1;
      font-weight: bold;
      margin: 20px 0 0 20px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: calc(100% - 70px);
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
    margin-top: 30px;

    .total {
      color: $color-blue-2;
      font-size: 46px;
      text-align: center;
      font-weight: bold;
    }

    .sub-title {
      display: flex;
      align-items: center;
      justify-content: center;
      color: $color-blue-1;
      font-size: 14px;
      text-align: center;
      margin-top: 6px;
      .sub-title-icon {
        font-size: 22px;
        font-weight: bold;
      }
      .text {
        margin-left: 4px;
      }
    }
  }
}
</style>
