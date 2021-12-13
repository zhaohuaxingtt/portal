<template>
  <div class="operation-btn">
    <iButton @click="$emit('add')">{{ $t('MT_CHUANGJIAN') }}</iButton>
    <iButton @click="$emit('edit')" :disabled="selectedRow.length !== 1">
      {{ $t('MT_BIANJI') }}
    </iButton>
    <iButton @click="$emit('delete')" :disabled="!canDelete">
      {{ $t('MT_SHANCHU') }}
    </iButton>
    <iButton @click="$emit('export')">
      {{ $t('MT_DAOCHU') }}
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
      default: function () {
        return []
      }
    },
    canDelete: {
      type: Boolean,
      default: function () {
        return true
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
