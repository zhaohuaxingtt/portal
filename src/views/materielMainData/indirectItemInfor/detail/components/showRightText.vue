<template>
  <div>{{ language(row.converseRate) }} {{ language(materielUnit) }}</div>
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