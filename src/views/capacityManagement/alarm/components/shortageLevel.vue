<template>
  <span>
    <icon symbol :name="iconName" />
    <span class="margin-left5">
      {{ result }}
    </span>
  </span>
</template>

<script>
import { icon } from 'rise'

export default {
  components: {
    icon
  },
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
    iconKey: {
      type: String,
      default: 'icon'
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
        (item) => item.value == this.row[this.prop]
      )
      return result ? result[this.options?.label] : this.row[this.prop]
    },
    iconName() {
      let result = this.statusList.find(
        (item) => item.value == this.row[this.prop]
      )
      return result ? result[this.iconKey] : ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>