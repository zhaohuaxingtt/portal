<template>
  <iPage>
    <!-- <div class="flex justify-between"> -->
    <pageHeader class="title">
      {{ language('问题管理') }}

      <!-- <iNavMvp :list="menusLevel3" :lev="1" lang router-page /> -->

      <div class="types" slot="actions">
        <iTabBadge>
          <iTabBadgeItem
            v-permission="'ADMIN_PROCS_PROB_problemHandler'"
            :active="helpMoudle === 'problemHandler'"
            :name="language('问答处理')"
            @click="tabChange('problemHandler')"
            :badge="problemHandlerCount"
          />
          <iTabBadgeItem
            v-permission="'ADMIN_PROCS_PROB_problemStatement'"
            :active="helpMoudle === 'problemStatement'"
            :name="language('问题报表')"
            @click="tabChange('problemStatement')"
          />
          <iTabBadgeItem
            v-permission="'ADMIN_PROCS_PROB_moduleManagement'"
            :active="helpMoudle === 'moduleManagement'"
            :name="language('模块管理')"
            @click="tabChange('moduleManagement')"
          />
          <iTabBadgeItem
            v-permission="'ADMIN_PROCS_PROB_labelManagement'"
            :active="helpMoudle === 'labelManagement'"
            :name="language('标签管理')"
            @click="tabChange('labelManagement')"
          />
          <iTabBadgeItem
            v-permission="'ADMIN_PROCS_PROB_keyWordsManagement'"
            :active="helpMoudle === 'keyWordsManagement'"
            :name="language('关键词管理')"
            @click="tabChange('keyWordsManagement')"
          />
        </iTabBadge>
      </div>
    </pageHeader>
    <!-- <div class="content-title">{{ language('问题管理') }}</div> -->

    <!-- </div> -->
    <div
      v-permission="'ADMIN_PROCS_PROB_problemHandler'"
      class="flex flex-row content mt20"
      v-if="helpMoudle === 'problemHandler'"
    >
      <ProblemHandler @changeSelfHandle="changeSelfHandle" />
    </div>
    <div
      v-permission="'ADMIN_PROCS_PROB_problemStatement'"
      class="flex flex-column content mt20"
      v-if="helpMoudle === 'problemStatement'"
    >
      <ProblemStatement />
    </div>
    <div
      v-permission="'ADMIN_PROCS_PROB_moduleManagement'"
      class="flex flex-row content mt20"
      v-if="helpMoudle === 'moduleManagement'"
    >
      <ModuleManagement />
    </div>
    <div
      v-permission="'ADMIN_PROCS_PROB_labelManagement'"
      class="flex flex-row content mt20"
      v-if="helpMoudle === 'labelManagement'"
    >
      <LabelManagement />
    </div>
    <div
      v-permission="'ADMIN_PROCS_PROB_keyWordsManagement'"
      class="flex flex-row content mt20"
      v-if="helpMoudle === 'keyWordsManagement'"
    >
      <KeyWordsManagement />
    </div>
  </iPage>
</template>

<script>
import { iPage, iNavMvp } from 'rise'
import { iTabBadge, iTabBadgeItem } from '@/components/iTabBadge'
import ProblemHandler from './components/problemHandler/index'
import LabelManagement from './components/labelManagement/index'
import ModuleManagement from './components/moduleManagement/index'
import ProblemStatement from './components/problemStatement/index'
import KeyWordsManagement from './components/keyWordsManagement'
import { questionUnReplyCountApi } from '@/api/assistant'
import pageHeader from '@/components/pageHeader'
import store from '@/store'
import { getSiblingMenus, generateMenuData } from '@/utils/menu'
export default {
  data() {
    return {
      text: '问答处理',
      helpMoudle: 'problemHandler',
      problemHandlerCount: 0,
      menusLevel3: []
    }
  },
  computed: {
    fullMenus() {
      return this.$store.state.permission.menuList
    },
    whiteBtnList() {
      return this.$store.state.permission.whiteBtnList
    }
  },
  methods: {
    tabChange(val) {
      this.$router.replace({ path: this.$route.path, query: { module: val } })
      this.helpMoudle = val
    },
    // 获取未读问题数量
    async questionUnReplyCount(selfOnly) {
      const response = await questionUnReplyCountApi(selfOnly)
      if (response?.code === '200') {
        this.problemHandlerCount = response.data
      }
    },
    changeSelfHandle(val) {
      this.questionUnReplyCount(val)
    },
    // 3级菜单显示
    getMenusLevel3() {
      const menus = getSiblingMenus(
        this.fullMenus,
        '/assistant/problemMan',
        '/assistant/problemMan'
      )
      const menusLevel3 = generateMenuData(menus, 3)
      menusLevel3.forEach((e) => {
        if (e.url === '/assistant/helpCenterMan') {
          e.activeMenu = '/assistant/helpCenterMan'
        }
        if (e.url === '/assistant/problemMan') {
          e.activeMenu = '/assistant/problemMan'
        }
      })
      this.menusLevel3 = menusLevel3
      console.log('getMenusLevel3', menusLevel3)
    },
    checkHasEnterMenu() {
      const menuList = [
        {
          permissionKey: 'ADMIN_PROCS_PROB_problemHandler',
          url: '/assistant/problemMan'
        },
        {
          permissionKey: 'ADMIN_PROCS_PROB_problemHandler',
          url: '/assistant/problemMan?module=problemHandler'
        },
        {
          permissionKey: 'ADMIN_PROCS_PROB_problemStatement',
          url: '/assistant/problemMan?module=problemStatement'
        },
        {
          permissionKey: 'ADMIN_PROCS_PROB_moduleManagement',
          url: '/assistant/problemMan?module=moduleManagement'
        },
        {
          permissionKey: 'ADMIN_PROCS_PROB_labelManagement',
          url: '/assistant/problemMan?module=labelManagement'
        },
        {
          permissionKey: 'ADMIN_PROCS_PROB_keyWordsManagement',
          url: '/assistant/problemMan?module=keyWordsManagement'
        }
      ]
      const { fullPath } = this.$route
      const menuItem = menuList.find(
        (e) =>
          e.url === fullPath || e.url + '?module=problemHandler' === fullPath
      )

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
    }
  },
  created() {
    this.helpMoudle = this.$route.query.module || 'problemHandler'
    // this.getMenusLevel3()
    // this.checkHasEnterMenu()
  },
  mounted() {
    console.log(store.state, 'store.state')
    this.questionUnReplyCount(1)
  },
  components: {
    iPage,
    iTabBadge,
    iTabBadgeItem,
    ProblemHandler,
    LabelManagement,
    ModuleManagement,
    ProblemStatement,
    KeyWordsManagement,
    pageHeader,
    iNavMvp
  }
}
</script>

<style lang="scss" scoped>
@import '../comon.scss';
.content {
  height: 100%;
}
.content-title {
  font-weight: bold;
  color: #000000;
  opacity: 1;
  font-size: 18px;
}
</style>
