<template>
  <div class="ProcCs-container">
    <div class="ProcCS-menu">
      <iNavMvp :list="menus"
               :lev="2"
               router-page />
    </div>
    <router-view />
  </div>
</template>

<script>
import { iNavMvp } from 'rise'

export default {
  name: 'adminProCS',
  components: { iNavMvp },
  data() {
    return {
      menus: [
        {
          value: 1,
          name: '流程管理',
          message: 0,
          url: '/adminProCS/process/index',
          activePath: '/adminProCS/process/index',
          key: '流程管理'
        },
        {
          value: 2,
          name: '词条管理',
          message: 0,
          url: '/adminProCS/glossary/index',
          activePath: '/adminProCS/glossary/index',
          key: '词条管理'
        },
        {
          value: 3,
          name: '知识管理',
          message: 0,
          url: '/adminProCS/adminKnowledge/index',
          activePath: '/adminProCS/adminKnowledge/index',
          key: '知识管理'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.ProcCs-container {
  height: 100%;
  padding-bottom: 50px;
}
.ProcCS-menu {
  margin: 10px 30px 0px 30px;
  display: flex;
  justify-content: flex-end;
}
</style>