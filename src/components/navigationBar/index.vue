<template>
  <div class="navigationBar">
    <div class="item"
         v-for="(item, index) of list"
         :key="item.title">
      <div class="text"
           :class="{ textActive: current == (item.current || index + 1) }"
           @click="changeCurrent(item.current || index + 1)"
           v-permission="item.permission">
        {{ item.key ? $t(item.key) : item.title }}
        <span v-if="item.required"
              :class="{ required: current == (item.current || index + 1) }">*</span>
      </div>
      <div class="divider"
           v-if="index !== list.length - 1"
           v-permission="item.permission"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    current: { type: Number, default: 1 },
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    changeCurrent (index) {
      this.$emit('changeCurrent', index)
    }
  }
}
</script>

<style scoped lang="scss">
.navigationBar {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .item {
    display: flex;
    align-items: center;
    margin-right: 25px;
    margin-bottom: 10px;

    .text {
      font-size: 18px;
      font-weight: 400;
      line-height: 25px;
      color: #999999;
      cursor: pointer;
    }

    .textActive {
      color: #1660f1;
      font-weight: bold;
    }

    .divider {
      margin-left: 25px;
      width: 0;
      height: 16px;
      border: 1px solid #909091;
    }
  }
}

.required {
  font-size: 14px;
  color: red;
}
</style>
