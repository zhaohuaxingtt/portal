<template>
  <div class="types">
    <iTabBadge>
      <iTabBadgeItem
        :badge="todoTotal"
        :active="!finished"
        :name="language('待审批')"
        @click="$emit('toggle', false)"
      />
      <iTabBadgeItem
        :active="finished"
        :name="language('已审批')"
        @click="$emit('toggle', true)"
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
    finished: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
