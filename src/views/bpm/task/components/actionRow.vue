<template>
  <div class="action-row">
    <iButton size="mini" @click="goDetail(row, 0)">
      {{ $t('APPROVAL.DETAIL') }}
    </iButton>
    <iButton size="mini" @click="onApproval(row, approvalTypeMap.AGREE)">
      {{ $t('APPROVAL.APPROVEL') }}
    </iButton>
    <iButton size="mini" @click="onApproval(row, approvalTypeMap.REFUSE)">
      {{ $t('APPROVAL.REFUSE') }}
    </iButton>
    <iButton size="mini" @click="onApproval(row, approvalTypeMap.APPREND_DATA)">
      {{ $t('APPROVAL.APPEND_DATA') }}
    </iButton>
  </div>
</template>

<script>
import { MAP_APPROVAL_TYPE } from '@/constants'
import taskMixin from '../taskMixin'
import { iButton } from 'rise'

export default {
  name: 'ActionRow',
  components: { iButton },
  mixins: [taskMixin],
  props: {
    row: {
      type: Object,
      require: true,
    },
    extraData: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      approvalTypeMap: MAP_APPROVAL_TYPE,
    }
  },
  methods: {
    onApproval(row, type) {
      console.log('extraData', this.extraData)
      this.extraData.onComplete(row, type)
    },
  },
}
</script>

<style lang="scss" scoped>
.action-row {
  white-space: nowrap;
}
</style>
