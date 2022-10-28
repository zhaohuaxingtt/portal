<template>
  <span :class="link && 'link cursor'">
    <slot>{{ result }}</slot>
  </span>
</template>

<script>
export default {
  props: {
    link: {
      type: Boolean,
      default: false
    },
    row: {
      type: Object,
      default: () => ({})
    },
    prop: {
      type: String,
      default: 'status'
    },
    options: {
      type: Object,
      default: () => ({
        label: 'label',
        value: 'value'
      })
    },
    /* [{label:'label',value:'value'}] */
    statusList: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    result() {
      let result = this.statusList.find(
        (item) => item[this.options?.value] == this.row[this.prop]
      )
      return result ? result[this.options?.label] : this.row[this.prop]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>