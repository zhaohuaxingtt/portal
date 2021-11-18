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
@import '../../../comon.scss';
</style>