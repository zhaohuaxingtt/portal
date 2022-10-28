<template>
  <span style="color: red" v-if="overdueDate">
    {{ row[prop] }}
    <br />
    <span style="color: red">{{ ` 已超期${overdueDate}天` }}</span>
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
    overdueDate: {
      type: [String, Number],
      default: 'status'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>