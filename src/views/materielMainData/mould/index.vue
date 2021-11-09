<template>
  <iPage>
    <theFilter @search="search" @reset="reset" />
    <theTable ref="groupTable" />
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import { theFilter, theTable } from './components'
export default {
  name: 'theMaterielMould',
  components: { iPage, theFilter, theTable },
  methods: {
    search(val) {
      this.$refs.groupTable.search(val)
    },
    reset(val) {
      this.$refs.groupTable.search(val)
    }
  }
}
</script>

<style></style>
