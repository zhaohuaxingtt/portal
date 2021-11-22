<template>
  <div class="manage-box">
    <router-view></router-view>
  </div>
</template>

<script>

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

  > div:nth-of-type(1) {
    flex: 1;
  }

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
