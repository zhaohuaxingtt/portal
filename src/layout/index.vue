<template>
  <!-- iLayout 组件中若传入menus，则使用本地menus数据渲染侧边栏菜单 -->
  <!-- <iLayout :menus="menus" /> -->
  <!-- iLayout 组件中若不传入menus，则使用store中state.permission.menuList，
      该数据来源于userPermission接口，为后台根据角色进行的menu配置，
      注意dev环境，vmsit环境请必须使用api返回的数据源 -->
  <iLayout />
  
</template>

<script>
import iLayout from '@/components/iLayout'
// import iLayout from 'rise/web/layout/index.vue'
// import menus from '@/constants/menus.js'
export default {
  name: 'Layout',
  components: { iLayout }
  /* data() {
    return {
      menus: menus
    }
  } */
}
</script>

<style lang="scss" scoped></style>
