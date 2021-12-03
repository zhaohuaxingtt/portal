<template>
  <div class="view-approval-flow">
    <iButton v-show="detail.businessId" @click="handleViewFlow" class="btn">
      {{ language('审批流') }}
    </iButton>
    <viewFlowDialog
      v-if="detail.businessId"
      :detail="detail"
      :visible.sync="dialogVisible"
    />
  </div>
</template>

<script>
import { iButton } from 'rise'
import viewFlowDialog from './viewFlowDialog'
export default {
  name: 'ViewApprovalFlow',
  components: { iButton, viewFlowDialog },
  props: {
    detail: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleViewFlow() {
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="scss" scoped>
.view-approval-flow {
  display: inline-block;
  margin-right: 10px;
}
.btn {
  border-radius: 34px;
  background-color: #fff;
  border: solid 1px $color-blue;
}
</style>
