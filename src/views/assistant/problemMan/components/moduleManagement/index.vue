<template>
  <div style="width: 100%;">
    <div class="nav">
      <el-tabs v-model="currentName">
        <!-- <el-tab-pane label="供应商用户" name="supplierUser">
          <ModuleManagementPanel type="supplier" v-if="currentName==='supplierUser'"/>
        </el-tab-pane> -->
        <el-tab-pane :label="language('内部用户')" name="internalUser">
          <ModuleManagementPanel type="inner" v-if="currentName==='internalUser'"/>
        </el-tab-pane>
        <el-tab-pane :label="language('供应商用户')" name="supplierUser">
          <ModuleManagementPanel type="supplier" v-if="currentName==='supplierUser'"/>
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
      currentName: 'internalUser',
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