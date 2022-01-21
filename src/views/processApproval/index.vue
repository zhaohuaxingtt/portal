<template>
  <div style="height: 100%; padding-bottom: 40px">
    <div class="ProApproval-menu">
      <iNavMvp :list="menus" :lev="1" router-page />

      <iTabBadge>
        <iTabBadgeItem
          v-for="item in subMenus"
          :name="item.name"
          :key="item.value"
          :active="item.type === queryType"
          :activeBorder="false"
          @click="changeSubMenu(item)"
        />
      </iTabBadge>
    </div>

    <router-view style="height: 100%"></router-view>
  </div>
</template>

<script>
import { iTabBadge, iTabBadgeItem } from '@/components/iTabBadge'
import { iNavMvp } from 'rise'
export default {
  name: 'processApproval',
  components: { iNavMvp, iTabBadge, iTabBadgeItem },
  data() {
    return {
      menus: [
        {
          value: 1,
          name: '流程模板管理',
          message: 0,
          url: '/bpm/template',
          activePath: '/bpm/template',
          key: '流程模板管理',
          permissionKey: 'ADMIN_APPROVAL_MANAGEMENT_TEMPLATE'
        },
        {
          value: 2,
          name: '流程监控',
          message: 0,
          url: '/bpm/monitoring',
          activePath: '/bpm/monitoring',
          key: '流程监控',
          permissionKey: 'ADMIN_APPROVAL_MANAGEMENT_MONITOR'
        },
        {
          value: 3,
          name: '流程报表',
          message: 0,
          url: '/bpm/report',
          activePath: '/bpm/report',
          key: '流程报表',
          permissionKey: 'ADMIN_APPROVAL_MANAGEMENT_REPORT'
        },
        {
          value: 4,
          name: '审批代理',
          message: 0,
          url: '/approval/agent',
          activePath: '/approval/agent',
          key: '审批代理',
          permissionKey: 'ADMIN_APPROVAL_MANAGEMENT_AGENT',
          children: [
            {
              value: 5,
              name: '审批代理',
              message: 0,
              url: '/approval/agent?type=normal',
              activePath: '/approval/agent',
              key: '审批代理',
              type: 'normal',
              permissionKey: 'ADMIN_APPROVAL_MANAGEMENT_AGENT_normal'
            },
            {
              value: 6,
              name: '会议审批代理',
              message: 0,
              url: '/approval/agent?type=meeting',
              activePath: '/approval/agent',
              key: '会议审批代理',
              type: 'meeting',
              permissionKey: 'ADMIN_APPROVAL_MANAGEMENT_AGENT_meeting'
            }
          ]
        }
      ]
    }
  },
  computed: {
    subMenus() {
      const path = this.$route.path
      const items = this.menus.filter((e) => e.url === path)
      if (items && items.length && items[0].children) {
        return items[0].children
      }
      return []
    },
    queryType() {
      if (!this.$route.query || Object.keys(this.$route.query).length === 0) {
        return 'normal'
      }
      return this.$route.query.type || ''
    },
    whiteBtnList() {
      return this.$store.state.permission.whiteBtnList
    }
  },
  created() {
    this.checkHasEnterMenu()
  },
  methods: {
    checkHasEnterMenu() {
      const { path } = this.$route
      const menuList = []
      for (let i = 0; i < this.menus.length; i++) {
        const menu = this.menus[i]
        menuList.push({ ...menu })
        if (menu.children) {
          menuList.push(...menu.children)
        }
      }
      const menuItem = menuList.find((e) => e.url === path)
      if (menuItem) {
        const permissionKey = menuItem.permissionKey
        // 入口url不在授权列表
        if (!this.whiteBtnList[permissionKey]) {
          let redirectUrl = ''
          for (let i = 0; i < menuList.length; i++) {
            const menu = menuList[i]
            if (this.whiteBtnList[menu.permissionKey]) {
              redirectUrl = menu.url
              break
            }
          }
          if (redirectUrl) {
            this.$router.push({ path: redirectUrl })
          }
        }
      }
    },
    changeSubMenu(item) {
      this.activeSubMenuName = item.name
      this.$router.replace({ path: item.url })
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
