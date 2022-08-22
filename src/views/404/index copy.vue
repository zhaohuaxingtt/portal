<!--
 * @Author: your name
 * @Date: 2021-02-19 15:09:30
 * @LastEditTime: 2021-02-19 15:09:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\404\index.vue
-->
<template>
  <div class="container">
    <h1 class="number">404</h1>
    <h2 class="not-found">NOT FOUND</h2>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .number {
    font-size: 188px;
  }
  .not-found {
    font-size: 98px;
    color: #bbb;
  }
}
</style>
