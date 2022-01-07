<template>
  <div class="favourite">
    <div class="tab">
      <div
        class="tab-item"
        @click="active = 'rise'"
        :class="{ active: active === 'rise' }"
      >
        RiSE
      </div>
      <div
        class="tab-item"
        @click="active = 'other'"
        :class="{ active: active === 'other' }"
      >
        其他系统
      </div>
    </div>
  </div>
</template>

<script>
import { iTabsList } from 'rise'
export default {
  name: 'favourite',
  components: { iTabsList },
  data() {
    return {
      active: 'rise'
    }
  }
}
</script>

<style lang="scss" scoped>
.tab {
  display: flex;
  margin: 20px 0px;
  .tab-item {
    width: 120px;
    height: 30px;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    line-height: 30px;
    font-size: 16px;
    &.active {
      background: #ffffff;
      box-shadow: 0px 0px 10px rgba(117, 94, 94, 0.08);
      font-weight: bold;
      color: #1660f1;
    }
  }
}
</style>
