<template>
  <div class="operation-btn">
    <iButton
      v-show="taskType === 0"
      :disabled="selectedRow.length === 0"
      @click="$emit('complete', approvalTypeMap.AGREE)"
    >
      {{ approvalText }}
    </iButton>
    <iButton
      v-show="taskType === 0 && !isSpecial"
      :disabled="selectedRow.length !== 1"
      @click="$emit('complete', approvalTypeMap.REFUSE)"
    >
      {{ refuseText }}
    </iButton>
    <iButton
      v-show="taskType === 0"
      :disabled="selectedRow.length !== 1"
      @click="$emit('complete', approvalTypeMap.APPREND_DATA)"
    >
      {{ appendText }}
    </iButton>
  </div>
</template>

<script>
import { MAP_APPROVAL_TYPE, BPM_SINGL_CATEGORY_LIST } from '@/constants'
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
    },
    categoryList: {
      type: String || Array,
      default: ''
    }
  },
  data() {
    return {
      approvalTypeMap: MAP_APPROVAL_TYPE
    }
  },
  computed: {
    isSpecial() {
      return BPM_SINGL_CATEGORY_LIST.includes(this.categoryList)
    },
    approvalText() {
      if (this.isSpecial) {
        return this.language('无异议')
      } else {
        return this.language('批准')
      }
    },
    refuseText() {
      if (this.isSpecial) {
        return this.language('有异议')
      } else {
        return this.language('拒绝')
      }
    },
    appendText() {
      if (this.isSpecial) {
        return this.language('有异议')
      } else {
        return this.language('拒绝')
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
