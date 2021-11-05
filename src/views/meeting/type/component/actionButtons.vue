<template>
  <div class="operation-btn">
    <iButton @click="$emit('add')">{{ $t('创建') }}</iButton>
    <iButton @click="$emit('edit')" :disabled="selectedRow.length !== 1">
      {{ $t('APPROVAL.EDIT') }}
    </iButton>
    <iButton @click="$emit('delete')">
      {{ $t('APPROVAL.DELETE') }}
    </iButton>
    <iButton @click="$emit('export')">
      {{ $t('APPROVAL.EXPORT') }}
    </iButton>
  </div>
</template>

<script>
import { iButton } from 'rise'
export default {
  name: 'activonButton',
  components: { iButton },
  props: {
    selectedRow: {
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
