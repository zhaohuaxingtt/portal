<template>
  <span class="openLinkText cursor" @click="openPage(row)">{{
    row['contractCoverCode']
  }}</span>
</template>

<script>
export default {
  props: {
    row: { type: Object, require: true }
  },
  methods: {
    openPage(row) {
      this.$emit('openPage', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.openLinkText {
  color: $color-blue;
}
</style>