<template>
  <div style="width: 100%;">
    <div class="nav">
      <el-tabs v-model="currentName">
        <el-tab-pane label="供应商用户" name="supplierUser">
          <ProblemHandlerPanel type="1" v-if="currentName==='supplierUser'"/>
        </el-tab-pane>
        <el-tab-pane label="内部用户" name="internalUser">
          <ProblemHandlerPanel type="2" v-if="currentName==='internalUser'"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import ProblemHandlerPanel from './problemHandlerPanel';
export default {
  data() {
    return {
      currentName: 'supplierUser',
    }
  },
  components: {
    ProblemHandlerPanel,
  }
}
</script>

<style lang="scss" scoped>

.nav {
  ::v-deep .el-tabs__active-bar {
    background-color:transparent!important;
  }
  ::v-deep .el-tabs__nav-wrap::after {
    background-color:transparent!important;
  }
  ::v-deep .el-tabs__item {
    padding-left: 20px;
    padding-right: 20px;
  }
  ::v-deep .el-tabs__item.is-active {
    background-color:#fff !important;
    height:35px;
    padding-left: 20px;
    padding-right: 20px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.08);
    border-radius:3px;
  }
}


</style>