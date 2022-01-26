<template>
  <span class="openLinkText cursor" @click="ContractUpload(row)">{{
    $t(buttonText)
  }}</span>
</template>
<script>
export default {
  components: {},
  props: {
    buttonText: { type: String, default: '确认' },
    row: { type: Object, require: true }
  },
  methods: {
    ContractUpload(row) {
      this.$emit('ContractUpload', row)
    }
  }
}
</script>
<style lang="scss" scoped>
.openLinkText {
  color: $color-blue;
}
</style>

