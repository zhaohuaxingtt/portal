<template>
  <div class="flex-between-center-center ekl-header">
    <div class="tab-tabs">
      <div style="width: 100%">
        <el-tabs v-model="activeName" class="ekl-tabs" @tab-click="handleClick">
          <el-tab-pane
            v-for="(item, index) in tabList"
            :key="item.id"
            :label="item.name"
            :name="item.name"
          >
          </el-tab-pane>
        </el-tabs>
        <el-badge :value="messageCount" :hidden="!messageCount" :max="99">
          <icon symbol class="icon" />
        </el-badge>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'approveHeader',
  data() {
    return {
      activeName: 0,
      messageCount: 8,
      tabList: [
        { name: this.$t('APPROVAL.APPROVAL_TODO'), id: 0 },
        { name: this.$t('HOME_CARD.MY_APPLICATION'), id: 1 },
      ]
    }
  },
  created() {
    this.setActiveName()
  },
  watch: {
    eklTabList() {
      this.setActiveName()
    }
  },
  methods: {
    setActiveName() {
      this.activeName = this.$t('APPROVAL.APPROVAL_TODO')
    },
    handleClick(item) {
      this.$emit('tab-click', item === 1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .icon {
    line-height: 97px;
    font-size: 25px;
    cursor: pointer;
  }
.ekl-header {
  //flex-grow: 1;
  margin-right: 10px;
  //align-items: center;
  max-width: calc(100% - 60px);
  .tab-tabs {
    width: 100%;
    // overflow-x: auto;
    // overflow-y: hidden;
  }
  ::v-deep .el-badge {
    .el-badge__content {
      background: #e30d0d;
      top: calc(-16px * 1.5);
      //bottom: -3px;
      left: calc(16px * 1.8);
      min-width: 25px;
      height: 25px;
      padding: 0;
      font-size: 14px;
      text-align: center;
    }
  }
}
::v-deep .ekl-tabs {
  .el-tabs__item {
    line-height: 20px;
    height: 28px;
    padding-bottom: 6px;
    font-size: 16px;
    font-weight: bold;
    color: rgb(153, 163, 173);
  }
  .el-tabs__item:hover, .el-tabs__item.is-active {
    color: rgb(255, 255, 255) !important;
  }
  .el-tabs__header {
    margin-bottom: 0px;
  }
  // .el-tabs__active-bar {
  //   height: 3px;
  //   bottom: -4px;
  // }
  .el-tabs__nav-wrap::after {
    background-color: transparent;
    display: none;
  }
}
::v-deep .el-tabs__nav-prev {
  display: none;
}
::v-deep .el-tabs__nav-next {
  display: none;
}
.unit{
  position: absolute;
  bottom:-30px;
  left:0;
}
</style>
