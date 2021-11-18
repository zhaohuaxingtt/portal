<template>
  <div style="width: 100%;">
    <div class="nav">
      <el-tabs v-model="currentName">
        <el-tab-pane label="问题处理统计" name="supplierUser">
          <ModuleManagementPanel :type="1" v-if="currentName==='supplierUser'"/>
        </el-tab-pane>
        <el-tab-pane label="常见问题统计" name="internalUser">
          <ModuleManagementPanel :type="2" v-if="currentName==='internalUser'"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import ModuleManagementPanel from './moduleManagementPanel';
export default {
  data() {
    return {
      currentName: 'supplierUser',
    }
  },
  components: {
    ModuleManagementPanel,
  }
}
</script>

<style lang="scss" scoped>
@import '../../../comon.scss';
</style>