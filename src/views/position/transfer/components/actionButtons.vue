<template>
  <div class="operation-btn">
    <iButton @click="$emit('add')">{{ $t('APPROVAL.ADD') }}</iButton>
    <iButton @click="$emit('edit')" :disabled="selectedRows.length !== 1">
      {{ $t('APPROVAL.EDIT') }}
    </iButton>
    <iButton @click="$emit('delete')" :disabled="selectedRows.length === 0">
      {{ $t('APPROVAL.DELETE') }}
    </iButton>
  </div>
</template>

<script>
import { iButton } from 'rise'
export default {
  name: 'ActionButtons',
  components: { iButton },
  props: {
    selectedRows: {
      type: Array,
      default: function() {
        return []
      },
    },
  },
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
