<template>
  <iPage>
    <theGroupFilter @search="search" />
    <theGroupTable ref="groupTable" />
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import { theGroupFilter, theGroupTable } from './components'
export default {
  name: 'mtzMaterielGroup',
  components: { iPage, theGroupFilter, theGroupTable },
  methods: {
    search(val) {
      this.$refs.groupTable.search(val)
    }
  }
}
</script>

<style></style>
