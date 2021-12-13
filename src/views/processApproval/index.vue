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
              key: '审批代理',
              type: 'normal'
            },
            {
              value: 6,
              name: '会议审批代理',
              message: 0,
              url: '/approval/agent?type=meeting',
              activePath: '/approval/agent',
              key: '会议审批代理',
              type: 'meeting'
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
    }
  },
  methods: {
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
