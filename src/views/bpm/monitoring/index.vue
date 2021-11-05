<template>
  <iPage>
    <theFilter class="margin-bottom20" @search="search" />
    <theTable ref="theTable" />
  </iPage>
</template>

<script>
import { iPage } from 'rise'
import { theFilter, theTable } from './components'
export default {
  name: 'bizlog',
  components: { iPage, theFilter, theTable },
  methods: {
    search(val) {
      this.$refs.theTable.search(val)
    }
  }
}
</script>

<style lang="scss" scoped></style>
