<template>
  <iPage>
    <panelHeader
      :active="active"
      :apply-num="applyNum"
      :approval-num="approvalNum"
      @toggle="toggleTabActive"
    />

    <div class="panel-body" v-loading="loading">
      <panelApplication
        v-show="active === 'application'"
        @set-num="val => (applyNum = val)"
      />
      <panelApproval
        v-show="active === 'approval'"
        @set-num="val => (approvalNum = val)"
      />
    </div>
  </iPage>
</template>

<script>
import { panelHeader, panelApplication, panelApproval } from './components'

import { iPage } from 'rise'
export default {
  name: 'approvalCenter',
  components: {
    panelHeader,
    iPage,
    panelApplication,
    panelApproval
  },
  data() {
    return {
      active: this.$store.state.permission.isLeader
        ? 'approval'
        : 'application',
      approvalNum: 0,
      applyNum: 0
    }
  },
  methods: {
    toggleTabActive(active) {
      this.active = active
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-body {
  min-height: 600px;
}
</style>
