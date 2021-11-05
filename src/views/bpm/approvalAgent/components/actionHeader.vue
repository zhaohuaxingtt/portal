<template>
  <div class="types" slot="actions">
    <iTabBadge>
      <iTabBadgeItem
        :active="$route.query.type === 'normal'"
        :name="$t('APPROVAL.APPROVAL_AGENT')"
        @click="tabChange('/approval/agent?type=normal')"
      />
      <iTabBadgeItem
        :active="$route.query.type === 'meeting'"
        :name="$t('APPROVAL.APPROVAL_AGENT_MEETING')"
        @click="tabChange('/approval/agent?type=meeting')"
      />
    </iTabBadge>
  </div>
</template>

<script>
import { iTabBadge, iTabBadgeItem } from '@/components/iTabBadge'

export default {
  name: 'headerActions',
  components: { iTabBadge, iTabBadgeItem },
  props: {
    todoTotal: {
      type: Number,
      default: 0
    },
    taskType: {
      type: Number,
      default: 0
    }
  },
  methods: {
    tabChange(path) {
      this.$router.push({ path })
    }
  }
}
</script>

<style lang="scss" scoped>
.types {
  font-size: 18px;
}

.divider {
  margin: 0px 30px;
}
</style>
