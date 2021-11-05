<template>
  <div class="position">
    <searchBox :query="query" type="pos" />
    <posTable />
  </div>
</template>

<script>
import searchBox from './search.vue'
import posTable from './posTable.vue'
export default {
  components: { searchBox, posTable },
  computed: {
    query() {
      return this.$store.state.position.pos.query 
    }
  }
}
</script>