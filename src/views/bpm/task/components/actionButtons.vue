<template>
  <div class="operation-btn">
    <iButton
      v-show="taskType === 0"
      :disabled="selectedRow.length === 0"
      @click="$emit('complete', approvalTypeMap.AGREE)"
    >
      {{ $t('APPROVAL.APPROVEL') }}
    </iButton>
    <iButton
      v-show="taskType === 0"
      :disabled="selectedRow.length !== 1"
      @click="$emit('complete', approvalTypeMap.REFUSE)"
    >
      {{ $t('APPROVAL.REFUSE') }}
    </iButton>
    <iButton
      v-show="taskType === 0"
      :disabled="selectedRow.length !== 1"
      @click="$emit('complete', approvalTypeMap.APPREND_DATA)"
    >
      {{ $t('APPROVAL.APPEND_DATA') }}
    </iButton>
    <!-- <iButton @click="$emit('export')">{{ $t('APPROVAL.EXPORT') }}</iButton> -->
  </div>
</template>

<script>
import { MAP_APPROVAL_TYPE } from '@/constants'
import { iButton } from 'rise'

export default {
  name: 'ActionButtons',
  components: { iButton },
  props: {
    selectedRow: {
      type: Array,
      default: function() {
        return []
      }
    },
    taskType: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      approvalTypeMap: MAP_APPROVAL_TYPE
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
