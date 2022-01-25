<template>
  <span class="button-table-setting">
    <icon name="iconSetting" symbol />
  </span>
</template>

<script>
import { Icon } from 'rise'
export default {
  name: 'buttonTableSetting',
  components: { Icon }
}
</script>

<style lang="scss" scoped>
.button-table-setting {
  cursor: pointer;
  margin-left: 10px;
}
</style>
