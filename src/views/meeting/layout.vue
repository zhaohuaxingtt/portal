<template>
  <div class="manage-box">
    <!-- <div class="manage-box"> -->
    <!-- <ul class="left-menu">
        <li @click='changeIndex(1)' :class="{active: activeIndex === 1}">寻源管理</li>
        <li @click='changeIndex(2)' :class="{active: activeIndex === 2}">合同管理</li>
        <li @click='changeIndex(3)' :class="{active: activeIndex === 3}">订单与报表管理</li>
        <li @click='changeIndex(4)' :class="{active: activeIndex === 4}">会议管理</li>
        <li @click='changeIndex(5)' :class="{active: activeIndex === 5}">会议</li>
      </ul> -->
    <router-view></router-view>
    <!-- </div> -->
  </div>
</template>

<script>
// import { tabRouterList } from "./data";

export default {
  components: {},
  data() {
    return {
      // tabRouterList,
      activeIndex: 4,
    };
  },
  methods: {
    changeIndex(e) {
      this.activeIndex = e;
    },
  },
};
</script>
<style lang="scss" scoped>
.manage-box {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  height: calc(100vh - 62px);

  .left-menu {
    background: #ffffff;
    box-shadow: 0 0 20px 0 rgba(27, 29, 33, 0.08);
    border-radius: 10px;
    overflow: hidden;
    margin: 0 0 0 10px;
    width: 148px;
    min-width: 148px;

    li {
      line-height: 48px;
      padding-left: 14px;
      background: #ffffff;
      font-size: 16px;
      color: #bbbbbb;
      letter-spacing: 0;
      cursor: pointer;
    }

    .active {
      background: #1989fa;
      color: #ffffff;
    }
  }
}
</style>
