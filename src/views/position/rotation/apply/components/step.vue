<template>
  <div class="rotation-step">
    <iSteps :active="active" align-center finish-status="success">
      <iStep title="发起岗位申请">
        <template slot="icon">
          <icon symbol name="iconshenpiliu-yishenpi" class="icon" />
        </template>
      </iStep>
      <iStep title="申请岗位领导审批">
        <template #icon>
          <icon symbol name="iconshenpiliu-daishenpi" />
        </template>
      </iStep>
      <iStep title="原有岗位领导审批">
        <template #icon>
          <icon symbol name="iconshenpiliu-daishenpi" />
        </template>
      </iStep>
      <iStep title="申请结果">
        <template #icon>
          <icon symbol name="iconshenpiliu-daishenpi" />
        </template>
      </iStep>
    </iSteps>
  </div>
</template>

<script>
import iSteps from '@/components/iSteps'
import iStep from '@/components/iStep'
import { Icon } from 'rise'
export default {
  name: 'RotationStep',
  components: { iSteps, iStep, Icon },
  data() {
    return {
      active: 0,
    }
  },
}
</script>

<style lang="scss" scoped></style>
