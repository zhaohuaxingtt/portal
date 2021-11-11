<template>
  <iPage>
    <pageHeader class="margin-bottom20">操作日志</pageHeader>
    <theFilter class="margin-bottom20" @search="search" />
    <theTable ref="theTable" />
  </iPage>
</template>

<script>
import pageHeader from '@/components/pageHeader'
import { iPage } from 'rise'
import { theFilter, theTable } from './components'
export default {
  name: 'bizlog',
  components: { iPage, theFilter, pageHeader, theTable },
  methods: {
    search(val) {
      this.$refs.theTable.search(val)
    }
  }
}
</script>

<style lang="scss" scoped></style>
