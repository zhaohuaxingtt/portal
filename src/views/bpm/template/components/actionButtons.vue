<template>
  <div class="operation-btn">
    <iButton @click="$emit('add')">{{ language('新建流程') }}</iButton>
    <iButton @click="$emit('edit')" :disabled="selectedRows.length !== 1">
      {{ language('编辑') }}
    </iButton>
    <iButton @click="$emit('delete')" :disabled="selectedRows.length === 0">
      {{ language('删除') }}
    </iButton>
    <!-- <iButton @click="$emit('export')">
      {{ language('导出') }}
    </iButton> -->
  </div>
</template>

<script>
import { iButton } from 'rise'
export default {
  name: 'activonButton',
  components: { iButton },
  props: {
    selectedRows: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.operation-btn {
  float: right;
  display: flex;
  margin-bottom: 22px;
  text-align: right;
}
</style>
