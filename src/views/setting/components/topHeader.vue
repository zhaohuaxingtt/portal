<template>
  <panelCategory
    :data="data"
    @toggle-active="toggleActive"
    :active-index.sync="activeIndex"
  />
</template>

<script>
import panelCategory from '@/components/common/panelCategory'
export default {
  name: 'topHeader',
  components: { panelCategory },
  props: {
    data: {
      type: Array
    },
    active: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      activeIndex: -1
    }
  },
  watch: {
    active(val) {
      this.activeIndex = val
    }
  },
  methods: {
    toggleActive(val) {
      this.activeIndex = val
      this.$emit('toggle-active', val)
    }
  }
}
</script>

<style lang="scss" scoped></style>
