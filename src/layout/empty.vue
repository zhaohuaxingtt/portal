<!--
 * @Date: 2021-11-08 11:47:59
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-08 16:35:09
 * @FilePath: \front-portal-new\src\layout\empty.vue
-->
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
