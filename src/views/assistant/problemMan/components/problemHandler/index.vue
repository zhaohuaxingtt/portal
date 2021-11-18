<template>
  <div style="width: 100%;">
    <div class="nav">
      <el-tabs v-model="currentName">
        <el-tab-pane label="供应商用户" name="supplierUser">
          <ProblemHandlerPanel :type="1" v-if="currentName==='supplierUser'"/>
        </el-tab-pane>
        <el-tab-pane label="内部用户" name="internalUser">
          <ProblemHandlerPanel :type="2" v-if="currentName==='internalUser'"/>
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
@import '../../../comon.scss';
</style>