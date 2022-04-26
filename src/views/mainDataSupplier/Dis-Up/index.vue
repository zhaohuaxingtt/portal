<template>
  <div class="main-data-supplier">
    <theListFilter @search="search" />
    <theListTable ref="theListTable" />
  </div>
</template>

<script>
import theListFilter from './components/theListFilter'
import theListTable from './components/theListTable'
export default {
  name: '',
  components: { theListFilter, theListTable },
  methods: {
    search(val) {
      this.$refs.theListTable.search(val)
    }
  }
}
</script>

<style lang="scss" scoped></style>
