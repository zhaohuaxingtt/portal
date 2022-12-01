<template>
  <div class="flex-between-center-center ekl-header">
    <div class="tab-tabs">
      <div style="width: 100%">
        <el-tabs v-model="activeName" class="ekl-tabs" @tab-click="handleClick">
          <el-tab-pane
            v-for="item in tabList"
            :key="item.id"
            :label="item.name"
            :name="item.name"
          />
        </el-tabs>
      </div>
    </div>
    <div class="unit">单位：百万元</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'eklHeader',
  computed: {
    ...mapState({
      eklTabList: (eklPfjTabList) => eklPfjTabList.permission.eklTabList,
      leadTabList: (leadTabList) => leadTabList.permission.leadTabList
    }),
    tabList() {
      if (this.leadTabList.length) {
        let leadTabList = JSON.parse(JSON.stringify(this.leadTabList))
        leadTabList.map((item) => {
          item.name = item.name.replace('(Spare)', '') || ''
        })
        return this.unique(
          JSON.parse(JSON.stringify([...this.eklTabList, ...leadTabList])) ||
            [],
          'name'
        )
      }
      return this.unique(
        JSON.parse(JSON.stringify(this.eklTabList)) || [],
        'name'
      )
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
    // 数组去重
    unique(arr, attrName) {
      const res = new Map()
      return arr.filter((a) => !res.has(a[attrName]) && res.set(a[attrName], 1))
    },
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
  align-items: center;
  max-width: calc(100% - 60px);
  .tab-tabs {
    width: 100%;
    // overflow-x: auto;
    // overflow-y: hidden;
  }
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
  // .el-tabs__active-bar {
  //   height: 3px;
  //   bottom: -4px;
  // }
  .el-tabs__nav-wrap::after {
    background-color: transparent;
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
