<template>
  <div style="width: 100%;">
    <div class="nav main">
      <el-tabs class="pro-tabs" v-model="currentName">
        <el-tab-pane label="内部用户" name="inner">
          <ProblemHandlerPanel userType="inner" v-if="currentName==='inner'" @changeSelfHandle="changeSelfHandle" />
        </el-tab-pane>
        <el-tab-pane label="供应商用户" name="supplier">
          <ProblemHandlerPanel userType="supplier" v-if="currentName==='supplier'" @changeSelfHandle="changeSelfHandle" />
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
      currentName: 'inner',
    }
  },
  created(){
    this.currentName = this.$route.query.source || "inner"
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