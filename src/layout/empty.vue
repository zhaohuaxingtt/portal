<template>
  <router-view style="height:100%" />
</template>

<script>
export default {
  name: 'layoutEmpty',
  created() {
    const { query, meta } = this.$route
    if (query.menuType && meta.redirect) {
      this.$router.push({
        path: meta.redirect + '?menuType=' + query.menuType
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
