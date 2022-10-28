<template>
  <span style="color: red" v-if="flag">
    {{ row[prop] }}
  </span>
  <span v-else>{{ row[prop] }}</span>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => ({})
    },
    prop: {
      type: String,
      default: 'status'
    },
    flag: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>