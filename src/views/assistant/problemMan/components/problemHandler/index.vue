<template>
  <div style="width: 100%;">
    <div class="nav main">
      <el-tabs class="pro-tabs" v-model="currentName">
        <el-tab-pane label="供应商用户" name="supplierUser">
          <ProblemHandlerPanel userType="supplier" v-if="currentName==='supplierUser'" @changeSelfHandle="changeSelfHandle" />
        </el-tab-pane>
        <el-tab-pane label="内部用户" name="internalUser">
          <ProblemHandlerPanel userType="inner" v-if="currentName==='internalUser'" @changeSelfHandle="changeSelfHandle" />
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
  methods: {
    changeSelfHandle(val) {
      this.$emit('changeSelfHandle',val);
    }
  },
  components: {
    ProblemHandlerPanel,
  }
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
.main{
  height: 100%;
}
.pro-tabs{
  height: 100%;
  display: flex;
  flex-direction: column;
  ::v-deep .el-tabs__content{
    flex: 1;
    .el-tab-pane{
      height: 100%;
    }
  }
}
</style>