<template>
  <div class="flex-between-center-center ekl-header">
    <div class="tab-tabs">
      <div style="width: 100%">
        <el-tabs v-model="activeName" class="ekl-tabs" :class="has-message-count" @tab-click="handleClick">
          <el-tab-pane
            v-for="(item, index) in tabList"
            :key="item.id"
            :label="item.label"
            :name="item.name"
          >
            <template v-if="index === 0 && todoCount" slot="label">
              <span class="to-approval-span-info-label">
                <span class="to-approval-span-info-label-title">
                  {{ item.label }}
                </span>
                <el-badge :value="todoCount" :hidden="!todoCount" :max="99" >
  <!--                <span></span>-->
                </el-badge>
              </span>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'approveHeader',
  props: {
    todoCount: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  data() {
    return {
      activeName: 0
    }
  },
  computed: {
    tabList() {
      return [
        { name: 'todo', label: this.$t('APPROVAL.APPROVAL_TODO'), id: 0 },
        { name: 'myApplication', label: this.$t('HOME_CARD.MY_APPLICATION'), id: 1 },
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
      this.activeName = 'todo'
    },
    handleClick(item) {
      this.$emit('tab-click', item.name === "todo")
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
  .to-approval-span-info-label {
    ::v-deep .el-badge {
      top: -10%;
    }
    .to-approval-span-info-label-title {
       margin-right: -5px;
    }
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
    height: 42px;
    line-height: 42px;
  }
  ::v-deep .el-badge {
    .el-badge__content {
      background: #e30d0d;
      top: calc(-16px * 3);
      //bottom: -3px;
      left: calc(16px * 1.5);
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
    line-height: 28px;
    height: 28px;
    padding-bottom: 0;
    font-size: 16px;
    font-weight: normal;
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
  .el-tabs__active-bar.is-top {
    display: none;
  }
  .el-tabs__item:nth-child(2) {
    padding-right: 5px !important;
  }
  .el-tabs__item:last-child {
    padding-left: 5px !important;
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
