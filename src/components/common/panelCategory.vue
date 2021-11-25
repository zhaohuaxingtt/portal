<template>
  <div class="panel-category">
    <div class="list">
      <div
        class="item"
        :class="{ active: -1 === activeIndex }"
        @click="toggleActive(-1)"
      >
        全部
      </div>

      <!-- <div class="divider">
        <icon symbol name="icontabdingweiicon" />
      </div> -->

      <div
        class="item"
        v-for="(item, index) in data"
        :key="index"
        :class="{ active: index === activeIndex }"
        @click="toggleActive(index)"
      >
        {{ item.typeValue }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'panelCategory',
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

      cursor: pointer;
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
