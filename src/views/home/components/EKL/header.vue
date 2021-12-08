<template>
  <div class="flex-between-center-center ekl-header">
    <el-tabs v-model="activeName" class="ekl-tabs" @tab-click="handleClick">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.id"
        :label="item.name"
        :name="item.name"
      />
    </el-tabs>
    <div class="unit">单位：百万元</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'eklHeader',
  computed: {
    ...mapState({
      eklTabList: (eklTabList) => eklTabList.permission.eklTabList,
      leadTabList: (leadTabList) => leadTabList.permission.leadTabList
    }),
    tabList() {
      if (this.leadTabList.length) {
        return this.leadTabList
      }
      return this.eklTabList
    }
  },
  data() {
    return {
      activeName: ''
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
      if (this.eklTabList && this.eklTabList.length > 0) {
        this.activeName = this.eklTabList[0].name
      }
    },
    handleClick(item) {
      this.$emit('tab-click', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.ekl-header {
  flex-grow: 1;
  margin-right: 20px;
}
::v-deep .ekl-tabs {
  .el-tabs__item {
    line-height: 22px;
    height: 28px;
    padding-bottom: 6px;
    font-size: 22px;
    font-weight: bold;
  }
  .el-tabs__header {
    margin-bottom: 0px;
  }
  .el-tabs__active-bar {
    height: 3px;
    bottom: -4px;
  }
  .el-tabs__nav-scroll,
  .el-tabs__nav-wrap {
    overflow: visible;
  }
  .el-tabs__nav-wrap::after {
    background-color: transparent;
  }
}
</style>
