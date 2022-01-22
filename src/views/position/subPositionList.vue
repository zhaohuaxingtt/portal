<template>
  <iPage>
    <div class="sub-position-page">
      <group-box :deptId="deptId"></group-box>
      <searchBox :deptId="deptId" :positionId="positionId" />
      <card-box :deptId="deptId"></card-box>
    </div>
  </iPage>
</template>

<script>
import { groupBox } from './components'
import { searchBox } from './components'
import { cardBox } from './components'
import { iPage } from 'rise'
export default {
  components: { groupBox, iPage, searchBox, cardBox },
  computed: {
    deptId() {
      return this.$store.state.permission.userInfo.deptDTO.id
    },
    positionId() {
      return this.$route.query.positionId
    }
  },
  async mounted() {
    this.$store.dispatch('GetDeptDetail', { deptId: this.deptId })
    this.$store.dispatch('GetRoleOptions')
    this.$store.dispatch('GetAllUser', { deptId: this.deptId })
    // const res = await this.$store.dispatch('GetDOptions', { deptId: this.deptId })
    // if (res?.code === '200' && res?.data) {
    this.$store.dispatch('GetSubPosition', { deptId: this.deptId })
    // }
    this.$store.dispatch('GetUndistributed', {
      deptId: this.deptId,
      positionId: this.positionId
    })
    // this.$store.dispatch('GetPositionPermissionList', this.deptId)
  }
}
</script>

<style lang="scss" scoped></style>
