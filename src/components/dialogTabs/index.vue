<template>
  <div class="tabBox">
    <div
      class="item"
      :class="{ 'item-active': current === index + 1 }"
      v-for="(item, index) of list"
      :key="item"
      @click="handleItemClick(index + 1)"
    >
      {{ $t(item.title) }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return [
          { title: '资产负载表' },
          { title: '利润表' },
          { title: '现金流量表' },
          { title: '其他财务数据' }
        ]
      }
    }
  },
  data() {
    return {
      current: 1
    }
  },
  methods: {
    handleItemClick(index) {
      this.current = index
      this.$emit('handleClick', index)
    }
  }
}
</script>

<style scoped lang="scss">
.tabBox {
  display: flex;
  align-items: center;
  border-radius: 10px;

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 136px;
    background: #f5f6f7;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.08);
    font-size: 16px;
    line-height: 25px;
    padding: 8px 20px;
    cursor: pointer;
  }

  .item-active {
    font-weight: bold;
    background: #ffffff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.08);
    color: #67C23A;
  }

  .iconStyle {
    margin-left: 20px;
    font-size: 20px;
  }
}
</style>
