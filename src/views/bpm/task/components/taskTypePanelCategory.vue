<template>
  <div class="panel-category">
    <div class="list">
      <div
        class="item"
        v-for="(item, index) in data"
        :key="index"
        :class="{ active: index === activeIndex }"
        @click="toggleActive(index)"
      >
        {{ item.value }}
        <span
          v-if="numVisible && item.totalTodoNum"
          class="badge"
          :class="{ large: item.totalTodoNum > 99 }"
        >
          {{ item.totalTodoNum > 99 ? '99+' : item.totalTodoNum }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'taskTypePanelCategory',
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    activeIndex: {
      type: Number,
      default: -1
    },
    numVisible: {
      type: Boolean,
      default: false
    }
  },
  // data() {
  //   return {
  //     activeIndex: -1,
  //   }
  // },
  methods: {
    toggleActive(index) {
      // this.activeIndex = index
      this.$emit('toggle-active', index)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-category {
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  margin: 10px 0px;

  .all {
    margin-right: 30px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      margin: 10px 30px 10px 0px;
      padding-left: 20px;
      color: #909091;
      position: relative;
      cursor: pointer;
      position: relative;
      &::before {
        position: absolute;
        left: 0;
        top: 0;
        content: '';
        display: block;
        width: 19px;
        height: 100%;
        background: transparent;
        background-size: contain;
      }
      &.active {
        color: #1763f7;
        font-weight: bold;
        &::before {
          background: url(~@/assets/images/tab-active-left.png) left center
            no-repeat;
          background-size: contain;
        }
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
        display: block;
        &.large {
          padding: 0px 5px;
          border-radius: 10px;
          right: -30px;
        }
      }
    }
    .divider {
      width: 5px;
      height: 17px;
      /* background: #1763f7; */
      opacity: 1;
      border-radius: 10px;
      margin: 11px 10px 0px -10px;
    }
  }
}
</style>
