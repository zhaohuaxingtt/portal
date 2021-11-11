<template>
  <div class="action-row">
    <iButton @click="extraData.editRow(row)">
      {{ $t('APPROVAL.EDIT') }}
    </iButton>
    <iButton @click="extraData.deleteRow([row])">
      {{ $t('APPROVAL.DELETE') }}
    </iButton>
  </div>
</template>

<script>
import { iButton } from 'rise'
export default {
  name: 'actionRow',
  components: {
    iButton,
  },
  props: {
    row: {
      type: Object,
      require: true,
    },
    extraData: {
      typw: Object,
      require: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.action-row {
  white-space: nowrap;
}
</style>
