<!--
 * 三级、4级layout
 * @Author: QYU
 * @Date: 2021-08-10 14:34:00
 * @LastEditTime: 2021-08-19 17:20:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\layout\inner.vue
-->
<template>
  <div class="level-inner-container">
    <router-view style="height:100%" />
  </div>
</template>

<script>
export default {
  name: 'LayoutInner',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.level-inner-container {
  height: 100%;
  padding-bottom: 50px;
}
.level-inner-menu {
  margin: 20px 30px 0px 30px;
  display: flex;
  justify-content: space-between;
}
</style>
