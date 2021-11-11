<template>
  <iPage>
    <h1>{{ $route.meta.title }}</h1>
  </iPage>
</template>

<script>
import { iPage } from 'rise'
export default {
  name: 'layoutDefault',
  components: { iPage }
}
</script>

<style lang="scss" scoped></style>
