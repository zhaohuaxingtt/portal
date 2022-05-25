<template>
  <div class="position">
    <searchBox :query="query" type="pos" item-class="margin-right20" />
    <posTable :showBtns="showBtns" />
  </div>
</template>

<script>
import searchBox from './search.vue'
import posTable from './posTable.vue'
export default {
  components: { searchBox, posTable },
  props: {
    showBtns: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    query() {
      return this.$store.state.position.pos.query
    }
  }
}
</script>
