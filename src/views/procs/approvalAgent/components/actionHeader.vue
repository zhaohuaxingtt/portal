<template>
  <div class="types" slot="actions">
    <iTabBadge>
      <iTabBadgeItem
        :active="agentType === 'normal'"
        :name="language('审批代理')"
        @click="tabChange('/approval/agent?type=normal')"
      />
      <iTabBadgeItem
        :active="agentType === 'meeting'"
        :name="language('会议审批代理')"
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
  computed: {
    agentType() {
      if (this.$route.query.type) {
        return this.$route.query.type
      }
      return 'normal'
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
