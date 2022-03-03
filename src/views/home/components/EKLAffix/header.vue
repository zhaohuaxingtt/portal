<template>
  <div class="flex-between-center-center ekl-header">
    <div class="tab-tabs">
      <el-tabs v-model="activeName" class="ekl-tabs" @tab-click="handleClick">
        <el-tab-pane
          v-for="item in tabList"
          :key="item.id"
          :label="item.name"
          :name="item.name"
        />
      </el-tabs>
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
      eklTabList: (eklPfjTabList) => eklPfjTabList.permission.eklPfjTabList,
      leadTabList: (leadTabList) => leadTabList.permission.leadTabList,
      // roleList: (state) => state.permission.userInfo.roleList,
      // deptName: (state) => state.permission.userInfo.deptDTO.deptNum
    }),
    tabList() {
      if (this.leadTabList.length) {
        return this.unique(JSON.parse(JSON.stringify([...this.eklTabList, ...this.leadTabList])) || [], 'name')
      }
      return this.unique(JSON.parse(JSON.stringify(this.eklTabList)) || [], 'name')
    },
    // tabs() {
    //   console.log('roleList', this.roleList)
    //   let tabs = null
    //   if (this.roleList.length == 1) {
    //     const Linie = this.roleList.some((item) => item.code == 'LINIE')
    //     const zycgkzORkzzl = this.roleList.some(
    //       (item) =>
    //         item.code == 'ZYCGKZ' ||
    //         item.code == 'WS2ZYCGKZ' ||
    //         item.code == 'ZYCGKSXTY'
    //     )
    //     const zycgkz = this.roleList.some(
    //       (item) => item.code == 'ZYCGKZ' || item.code == 'WS2ZYCGKZ'
    //     )
    //     const kzzl = this.roleList.some(
    //       (item) => item.code == 'ZYCGKSXTY' || item.code == 'ZYCGKSXTDY'
    //     )
    //     const zycgbzORbzzl = this.roleList.some(
    //       (item) => item.code == 'BZZL' || item.code == 'CGBZ'
    //     )
    //     const zycgbz = this.roleList.some((item) => item.code == 'CGBZ')
    //     const bzzl = this.roleList.some((item) => item.code == 'BZZL')
    //     const zycggz = this.roleList.some(
    //       (item) => item.code == 'WS2ZYCGGZ' || item.code == 'ZYCGGZ'
    //     )
    //     const CGBZ_WF = this.roleList.some((item) => item.code == 'CGBZ_WF')
    //     const ZYCGKZ_WF = this.roleList.some((item) => item.code == 'ZYCGKZ_WF')
    //     const PFJYJGLY = this.roleList.some((item) => item.code == 'PFJYJGLY')
    //     if (PFJYJGLY) {
    //       //            this.btnsgroup1 = ['CS(Spare)', 'CSM(Spare)', 'CSEN(Spare)', 'Linie(Spare)']
    //       //            this.btnsgroup1 = ['CS(Spare)']
    //     } else if (Linie) {
    //       // 采购员 采购员视觉
    //       // this.username = this.$store.state.permission.userInfo.id;
    //       tabs = ['Linie', 'Linie(Spare)']
    //     } else if (zycgkzORkzzl) {
    //       // 采购科长||科长助理 科室视觉
    //       if (zycgkz) {
    //         // this.username = this.$store.state.permission.userInfo.id;
    //         tabs = ['CSM', 'CSM(Spare)']
    //       }
    //       if (kzzl) {
    //         // this.username = this.$store.state.permission.userInfo.id;
    //         tabs = [this.deptName, `${this.deptName}(Spare)`]
    //       }
    //     } else if (zycgbzORbzzl) {
    //       // 采购部长||部长助理 部门视觉
    //       // this.username = this.$store.state.permission.userInfo.id;
    //       tabs = ['CS', 'CS(Spare)']
    //     } else if (zycggz) {
    //       // 采购股长 股视觉
    //       // this.username = this.$store.state.permission.userInfo.id;
    //       tabs = [this.deptName, `${this.deptName}(Spare)`]
    //     } else if (CGBZ_WF) {
    //       tabs = ['CS', 'CS(Spare)']
    //     } else if (ZYCGKZ_WF) {
    //       tabs = ['CSM', 'CSM(Spare)']
    //     }
    //   } else {
    //     const Linie = this.roleList.some((item) => item.code == 'LINIE') // 采购员
    //     const KZ = this.roleList.some(
    //       (item) => item.code == 'ZYCGKZ' || item.code == 'WS2ZYCGKZ'
    //     ) // 科长
    //     const KZZL = this.roleList.some(
    //       (item) => item.code == 'ZYCGKSXTY' || item.code == 'ZYCGKSXTDY'
    //     ) // 科长助理
    //     const BZ = this.roleList.some((item) => item.code == 'CGBZ') // 部长
    //     const BZZL = this.roleList.some((item) => item.code == 'BZZL') // 部长助理
    //     const GZ = this.roleList.some(
    //       (item) => item.code == 'WS2ZYCGGZ' || item.code == 'ZYCGGZ'
    //     ) // 股长
    //     const PFJYJGLY = this.roleList.some((item) => item.code == 'PFJYJGLY')
    //     if (PFJYJGLY) {
    //       //            this.btnsgroup1 = ['CS(Spare)', 'CSM(Spare)', 'CSEN(Spare)', 'Linie(Spare)']
    //       //            this.btnsgroup1 = ['CS(Spare)']
    //     } else if (KZ && Linie) {
    //       // this.username = this.$store.state.permission.userInfo.id;
    //       tabs = ['CSM', 'CSM(Spare)']
    //     } else if (KZ && !Linie) {
    //       console.log('执行到这里')
    //       // this.username = this.$store.state.permission.userInfo.id;
    //       tabs = [this.deptName, `${this.deptName}(Spare)`]
    //     } else if (KZZL && Linie) {
    //       // this.username = this.$store.state.permission.userInfo.id;
    //       tabs = [
    //         this.deptName,
    //         `${this.deptName}(Spare)`,
    //         'Linie',
    //         'Linie(Spare)'
    //       ]
    //     } else if (KZZL && !Linie) {
    //       // this.username = this.$store.state.permission.userInfo.id;
    //       tabs = [this.deptName, `${this.deptName}(Spare)`]
    //     } else if ((BZ && Linie) || (BZ && !Linie) || (BZZL && !Linie)) {
    //       tabs = ['CS', 'CS(Spare)']
    //     } else if (BZZL && Linie) {
    //       // this.username = this.$store.state.permission.userInfo.id;
    //       tabs = ['CS', 'CS(Spare)', 'Linie', 'Linie(Spare)']
    //     } else if (GZ && Linie) {
    //       // this.username = this.$store.state.permission.userInfo.id;
    //       tabs = [
    //         this.deptName,
    //         `${this.deptName}(Spare)`,
    //         'Linie',
    //         'Linie(Spare)'
    //       ]
    //     } else if (GZ && !Linie) {
    //       // this.username = this.$store.state.permission.userInfo.id;
    //       tabs = [this.deptName, `${this.deptName}(Spare)`]
    //     } else if (Linie) {
    //       tabs = ['Linie', 'Linie(Spare)']
    //     }
    //   }
    //   if (tabs) {
    //     return tabs
    //   }
    //   return this.tabList
    // }
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
      const res = new Map();
      return arr.filter((a) => !res.has(a[attrName]) && res.set(a[attrName], 1));
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
    max-width: 70%;
    overflow-x: auto;
    overflow-y: hidden;
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
::v-deep .el-tabs__nav-prev {
  display: none;
}
::v-deep .el-tabs__nav-next {
  display: none;
}
</style>
