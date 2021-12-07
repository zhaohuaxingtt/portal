<template>
  <div class="header">
    <pageHeader border>
      {{ language('审批中心') }}
      <div class="actions" slot="actions">
        <iTabBadge>
          <iTabBadgeItem
            :badge="applyNum"
            :active="active === 'application'"
            :name="language('我的申请')"
            @click="$emit('toggle', 'application')"
          />
          <iTabBadgeItem
            :badge="approvalNum"
            :active="active === 'approval'"
            :name="language('我的审批')"
            @click="$emit('toggle', 'approval')"
          />
        </iTabBadge>

        <logIcon />
      </div>
    </pageHeader>
  </div>
</template>

<script>
import { iTabBadge, iTabBadgeItem } from '@/components/iTabBadge'
import logIcon from '@/components/logIcon'
import { Icon } from 'rise'
import pageHeader from '@/components/pageHeader'
export default {
  name: 'panelHeader',
  props: {
    active: {
      type: String,
      default: 'application'
    },
    applyNum: {
      type: Number,
      default: 0
    },
    approvalNum: {
      type: Number,
      default: 0
    }
  },
  components: { pageHeader, Icon, iTabBadge, iTabBadgeItem, logIcon }
}
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: 8px;
}
.actions {
  display: flex;
  align-items: center;
  .icon-lot {
    font-size: 20px;
    margin-left: 20px;
    display: flex;
    align-items: center;
    .svg-icon {
      opacity: 0.2;
    }
    span {
      font-size: 14px;
      margin-left: 5px;
      color: #cad9f8;
    }
  }
}
</style>
