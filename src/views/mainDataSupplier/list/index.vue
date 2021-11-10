<template>
  <div class="main-data-supplier">
    <theListFilter @search="search" />
    <theListTable ref="theListTable" />
  </div>
</template>

<script>
import { theListFilter, theListTable } from './components'
export default {
  name: 'MainDataSupplierList',
  components: { theListFilter, theListTable },
  methods: {
    search(val) {
      this.$refs.theListTable.search(val)
    }
  }
}
</script>

<style lang="scss" scoped></style>
