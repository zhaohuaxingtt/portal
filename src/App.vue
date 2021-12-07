<!--
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:06
 * @LastEditTime: 2021-03-27 16:55:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\App.vue
-->
<template>
  <div class="app" id="app">
    <router-view id="appRouterView"></router-view>
  </div>
</template>
<script>
export default {
  mounted() {}
}
</script>
<style lang="scss" scopde>
.app {
  height: 100%;
  overflow: hidden;
  background-color: $color-background;
}
</style>
