<template>
  <iCard>
    <favouriteRiseSearch />
    <favouriteRiseMenu />
  </iCard>
</template>

<script>
import { iCard } from 'rise'
import favouriteRiseSearch from './favouriteRiseSearch'
import favouriteRiseMenu from './favouriteRiseMenu'
export default {
  name: 'favouriteRise',
  components: { iCard, favouriteRiseSearch, favouriteRiseMenu }
}
</script>

<style lang="scss" scoped></style>
