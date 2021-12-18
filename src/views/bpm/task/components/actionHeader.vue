<template>
  <div class="types" slot="actions">
    <iTabBadge>
      <iTabBadgeItem
        :badge="$store.state.approval.todoNum"
        :active="taskType === 0"
        :name="language('待审批')"
        @click="tabChange('/bpm/todoList')"
      />
      <iTabBadgeItem
        :active="taskType === 1"
        :name="language('已审批')"
        @click="tabChange('/bpm/finishList')"
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
      /* this.$router.replace({
        path: path,
      }) */
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
