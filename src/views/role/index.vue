<template>
  <iPage>
    <filterPanel @search="search" />
    <roleTable :filter-form="filterForm" />
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import { filterPanel, roleTable } from './components'
export default {
  name: 'Role',
  components: { iPage, filterPanel, roleTable },
  data() {
    return {
      filterForm: {}
    }
  },
  methods: {
    search(val) {
      this.filterForm = val
    }
  }
}
</script>

<style lang="scss" scoped></style>
