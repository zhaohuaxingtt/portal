<template>
  <div>{{ language(row.numeratorValue) }} {{ language(materielUnit) }}</div>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => {
        return {}
      }
    },
    materielUnit: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
</style>