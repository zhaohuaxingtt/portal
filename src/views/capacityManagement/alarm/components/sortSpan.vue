<template>
  <span v-if="row[prop]">
    <icon symbol class="cursor" name="iconliebiaoyizhiding" />
  </span>
  <span v-else>
    <icon symbol class="cursor" name="iconliebiaoweizhiding" />
  </span>
</template>

<script>
import { icon } from 'rise'
export default {
  components: {
    icon
  },
  props: {
    row: {
      type: Object,
      default: () => ({})
    },
    prop: {
      type: String,
      default: 'status'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>