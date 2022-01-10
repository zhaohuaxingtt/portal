<template>
  <iPage>
    <!-- <div class="flex justify-between"> -->
    <pageHeader class="title">
      <!-- {{ language('问题管理') }} -->

      <iNavMvp :list="menusLevel3" :lev="1" lang router-page />

      <div class="types" slot="actions">
        <iTabBadge>
          <iTabBadgeItem
            :active="helpMoudle === 'problemHandler'"
            :name="language('问答处理')"
            @click="tabChange('problemHandler')"
            :badge="problemHandlerCount"
          />
          <iTabBadgeItem
            :active="helpMoudle === 'problemStatement'"
            :name="language('问题报表')"
            @click="tabChange('problemStatement')"
          />
          <iTabBadgeItem
            :active="helpMoudle === 'moduleManagement'"
            :name="language('模块管理')"
            @click="tabChange('moduleManagement')"
          />
          <iTabBadgeItem
            :active="helpMoudle === 'labelManagement'"
            :name="language('标签管理')"
            @click="tabChange('labelManagement')"
          />
          <iTabBadgeItem
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
      class="flex flex-row content mt20"
      v-if="helpMoudle === 'problemHandler'"
    >
      <ProblemHandler @changeSelfHandle="changeSelfHandle" />
    </div>
    <div
      class="flex flex-column content mt20"
      v-if="helpMoudle === 'problemStatement'"
    >
      <ProblemStatement />
    </div>
    <div
      class="flex flex-row content mt20"
      v-if="helpMoudle === 'moduleManagement'"
    >
      <ModuleManagement />
    </div>
    <div
      class="flex flex-row content mt20"
      v-if="helpMoudle === 'labelManagement'"
    >
      <LabelManagement />
    </div>
    <div
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
      const menus = this.getSiblingMenus(
        this.fullMenus,
        '/assistant/problemMan',
        '',
        ''
      )

      const menusLevel3 = this.generateMenuData(menus, 3)
      this.menusLevel3 = menusLevel3
      console.log('getMenusLevel3', menusLevel3)
    },
    getSiblingMenus(data, path, menuType, activePath) {
      for (let i = 0; i < data.length; i++) {
        const element = data[i]
        const url =
          element.url && element.url.indexOf('#') > -1
            ? element.url.split('#')[1]
            : element.url
        if (
          `${path}?menuType=${menuType}` === url ||
          url === path ||
          url === activePath
        ) {
          return data
        }
        if (element.menuList) {
          const res = this.getSiblingMenus(
            element.menuList,
            path,
            menuType,
            activePath
          )
          if (res) {
            return res
          }
        }
      }
    },
    generateMenuData(diyMenus, level) {
      diyMenus = diyMenus || []
      const res = []
      diyMenus.forEach((e, index) => {
        let purePath = e.url || ''
        if (e.url && e.url.includes('#')) {
          purePath = e.url.split('#')[1]
        }
        const purePathArr = purePath.split('/')
        let activePath =
          level === 3
            ? '/' + purePathArr[1]
            : '/' + purePathArr[1] + '/' + purePathArr[2]
        if (activePath.indexOf('?')) {
          activePath = activePath.split('?')[0]
        }
        const url =
          e.url && e.url.indexOf('#') > -1 ? e.url.split('#')[1] : e.url
        res.push({
          value: index + 1,
          name: e.name,
          message: 0,
          url: url,
          activePath: activePath,
          key: e.name,
          permissionKey: e.permissionKey,
          permissionName: e.name
        })
      })
      return res
    }
  },
  created() {
    this.helpMoudle = this.$route.query.module || 'problemHandler'
    this.getMenusLevel3()
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
