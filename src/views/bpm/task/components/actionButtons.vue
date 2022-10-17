<template>
  <div class="operation-btn">
    <iButton
      v-show="categoryList === 'officialPricing'"
      :disabled="selectedRow.length !== 1"
      @click="mock"
    >
      {{ language('EKL模拟') }}
    </iButton>
    <iButton
      v-show="taskType === 0"
      :disabled="selectedRow.length === 0"
      @click="$emit('complete', approvalTypeMap.AGREE)"
    >
      {{ approvalText }}
    </iButton>
    <iButton
      v-show="taskType === 0 && !isRefuseButton"
      :disabled="selectedRow.length !== 1"
      @click="$emit('complete', approvalTypeMap.REFUSE, refuseText)"
    >
      {{ refuseText }}
    </iButton>
    <iButton
      v-show="taskType === 0 && !isHideAppendButton"
      :disabled="selectedRow.length !== 1"
      @click="$emit('complete', approvalTypeMap.APPEND_DATA, appendText)"
    >
      {{ appendText }}
    </iButton>
    <iButton @click="$emit('export')">
      {{ language('LK_DAOCHU') }}
    </iButton>
  </div>
</template>

<script>
import {
  MAP_APPROVAL_TYPE,
  BPM_CATEGORY_RENAME_YIYI_LIST,
  BPM_HIDE_REFUSE_BUTTON_LIST,
  BPM_HIDE_APPEND_BUTTON_LIST
} from '@/constants'
import { iButton } from 'rise'

export default {
  name: 'ActionButtons',
  components: { iButton },
  props: {
    selectedRow: {
      type: Array,
      default: function () {
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
      approvalTypeMap: MAP_APPROVAL_TYPE,
      hideAppendButtonList: BPM_HIDE_APPEND_BUTTON_LIST,
      hideRefuseButtonList: BPM_HIDE_REFUSE_BUTTON_LIST
    }
  },
  computed: {
    isHideAppendButton() {
      // 生产采购 CSC RS单
      return this.hideAppendButtonList.includes(this.categoryList)
    },
    isRefuseButton() {
      // 生产采购 CSC RS单复核
      return this.hideRefuseButtonList.includes(this.categoryList)
    },
    approvalText() {
      if (BPM_CATEGORY_RENAME_YIYI_LIST.includes(this.categoryList)) {
        return this.language('无异议')
      }
      return this.language('批准')
    },
    refuseText() {
      if (BPM_CATEGORY_RENAME_YIYI_LIST.includes(this.categoryList)) {
        return this.language('有异议')
      }
      return this.language('拒绝')
    },
    appendText() {
      if (BPM_CATEGORY_RENAME_YIYI_LIST.includes(this.categoryList)) {
        return this.language('有异议')
      }
      return this.language('补充材料')
    }
  },
  methods: {
    mock() {
      const { businessId } = this.selectedRow[0]
      const url = `/order/#/pricingManagement/ekl/view?type=approval&businessId=${businessId}`
      window.open(url)
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
