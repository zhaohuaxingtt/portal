<template>
  <div class="approval-overview-panel" @click="$emit('open', data)">
    <div class="header">
      <div class="name" :title="data.value || data.category">
        {{ data.value || data.category }}
      </div>
      <div class="cat-name" v-if="categoryName">
        <span class="text">{{ categoryName }}</span>
        <div class="bg"></div>
      </div>
    </div>
    <div class="content">
      <div class="total">
        {{ data.todoNum }}
      </div>
      <div class="sub-title">
        <span class="sub-title-icon">
          <icon symbol class="icon" name="icongongyingshangshenhewancheng" />
        </span>
        <span class="text">{{
          type === 'APPLY' ? $t("申请数量") : $t("审批数量")
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'rise'
export default {
  name: 'ApprovalOverviewPanel',
  components: { Icon },
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
    },
    typeName: {
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
  //width: 320px;
  width: calc((100% - 70px - 35px*6)/6);
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
      font-size: 16px;
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
      .text {
        margin-left: 4px;
      }
    }
  }
}
</style>
