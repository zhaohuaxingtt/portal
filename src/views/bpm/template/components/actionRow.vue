<template>
  <div class="action-row">
    <iButton @click="extraData.editRow(row)">
      {{ language('编辑') }}
    </iButton>
    <iButton @click="extraData.deleteRow([row])">
      {{ language('删除') }}
    </iButton>
  </div>
</template>

<script>
import { iButton } from 'rise'
export default {
  name: 'actionRow',
  components: {
    iButton
  },
  props: {
    row: {
      type: Object,
      require: true
    },
    extraData: {
      typw: Object,
      require: true
    }
  }
}
</script>

<style lang="scss" scoped>
.action-row {
  white-space: nowrap;
}
</style>
