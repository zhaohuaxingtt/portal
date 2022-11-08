<!--
 * @Author: your name
 * @Date: 2021-10-25 17:43:45
 * @LastEditTime: 2021-11-18 15:18:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\locationChange\components\MtzLocationChange\index.vue
-->
<!-- MTZ变更分页页面 -->
<template>
  <el-dialog
    :visible.sync="dialogVisible"
    width="90%"
    :before-close="handleClose"
  >
    <div slot="title" class="flex title margin-bottom20">
      <span class="titleText">{{ language('CHIPBIANGENG', '芯片变更') }}</span>
    </div>
    <newChange v-bind="$attrs" v-on="$listeners" @close="close"></newChange>
    <span slot="footer" class="dialog-footer"> </span>
  </el-dialog>
</template>

<script>
import newChange from './newChange'
export default {
  name: '',
  components: {
    newChange
  },
  data() {
    return {}
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  created() {},
  methods: {
    handleClose() {
      this.$emit('close', false)
    },
    close(val) {
      if (!val) {
        this.handleClose()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  justify-content: space-between;
  .titleText {
    font-size: 20px;
    font-family: Arial;
    line-height: 23px;
  }
}
</style>