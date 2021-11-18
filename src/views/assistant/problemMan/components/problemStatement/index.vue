<template>
  <div style="width: 100%;">
    <div class="nav">
      <el-tabs v-model="currentName">
        <el-tab-pane label="问题处理统计" name="supplierUser">
          <ProblemStatementPanel :type="1" v-if="currentName==='supplierUser'"/>
        </el-tab-pane>
        <el-tab-pane label="常见问题统计" name="internalUser">
          <ProblemStatementPanel :type="2" v-if="currentName==='internalUser'"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import ProblemStatementPanel from './problemStatementPanel';
export default {
  data() {
    return {
      currentName: 'supplierUser',
    }
  },
  components: {
    ProblemStatementPanel,
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
    padding-left: 20px!important;
    padding-right: 20px!important;
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