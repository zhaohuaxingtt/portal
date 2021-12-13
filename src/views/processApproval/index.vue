<template>
  <div style="height: 100%; padding-bottom: 40px">
    <div class="ProApproval-menu">
      <iNavMvp :list="menus" :lev="1" router-page />
      <!-- <iNavMvp :list="subMenus" :lev="2" router-page /> -->
    </div>

    <router-view style="height: 100%"></router-view>
  </div>
</template>

<script>
import { iNavMvp } from 'rise'
export default {
  name: 'processApproval',
  components: { iNavMvp },
  data() {
    return {
      menus: [
        {
          value: 1,
          name: '流程模板管理',
          message: 0,
          url: '/bpm/template',
          activePath: '/bpm/template',
          key: '流程模板管理'
        },
        {
          value: 2,
          name: '流程监控',
          message: 0,
          url: '/bpm/monitoring',
          activePath: '/bpm/monitoring',
          key: '流程监控'
        },
        {
          value: 3,
          name: '流程报表',
          message: 0,
          url: '/bpm/report',
          activePath: '/bpm/report',
          key: '流程报表'
        },
        {
          value: 4,
          name: '审批代理',
          message: 0,
          url: '/approval/agent',
          activePath: '/approval/agent',
          key: '审批代理',
          children: [
            {
              value: 5,
              name: '审批代理',
              message: 0,
              url: '/approval/agent?type=normal',
              activePath: '/approval/agent',
              key: '审批代理'
            },
            {
              value: 5,
              name: '会议审批代理',
              message: 0,
              url: '/approval/agent?type=meeting',
              activePath: '/approval/agent',
              key: '会议审批代理'
            }
          ]
        }
      ],
      childrenMenus: []
    }
  },
  computed: {
    subMenus() {
      const path = this.$route.path
      console.log('path', path)
      const items = this.menus.filter((e) => e.url === path)
      console.log(items)
      if (items && items.length && items[0].children) {
        return items[0].children
      }
      return []
    }
  }
}
</script>

<style lang="scss" scoped>
.ProApproval-menu {
  margin: 20px 60px 0px 30px;
  display: flex;
  justify-content: space-between;
}
</style>
