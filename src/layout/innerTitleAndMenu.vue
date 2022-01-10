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
    <div class="level-inner-menu" v-show="menuList.length > 0">
      <div class="title">
        {{ language(title) }}
      </div>

      <iNavMvp
        v-if="menuList.length > 0"
        class="menusLevel4"
        :list="menuList"
        :lev="1"
        lang
        router-page
      />
    </div>
    <iPage style="height: 100%">
      <router-view />
    </iPage>
  </div>
</template>

<script>
import { iNavMvp, iPage } from 'rise'
export default {
  name: 'innerTitleAndMenu',
  components: { iNavMvp, iPage },
  data() {
    return {
      menus: [],
      menuList: [],
      pathIndex: 0,
      title: ''
    }
  },
  computed: {
    fullMenus() {
      return this.$store.state.permission.menuList
    }
  },
  created() {
    this.getMenus()
  },
  methods: {
    getMenus() {
      const { matched, query, meta, params, path } = this.$route
      const { menuType } = query
      const activePath = meta.activePath
      const hasParams = params && Object.keys(params).length > 0
      // pathIndex 对应几级菜单
      const pathIndex = matched.findIndex((e) => {
        let ePath = e.path
        if (hasParams) {
          return e.regex.test(path)
        }
        return ePath === path
      })
      this.pathIndex = pathIndex
      // 当前route的兄弟菜单
      const pathMenus = this.getSiblingMenus(
        this.fullMenus,
        path,
        menuType,
        activePath
      )

      // 获取菜单
      if (pathIndex <= 1) {
        this.menuList = this.generateMenuData(pathMenus, 2)
      } else {
        console.log('parentMenu', matched[1])
        this.title = matched[1].meta && matched[1].meta.title
        const parentPath = matched[1].path
        const parentMenus = this.getSiblingMenus(
          this.fullMenus,
          parentPath,
          menuType,
          activePath
        )

        this.menuList = this.generateMenuData(pathMenus, 3)
        console.log('menuList', this.menuList)
        // 找不到本级菜单，可能url所在菜单未赋权限
        if (!pathMenus) {
          const childMenus = parentMenus.filter((e) => e.url === parentPath)
          if (childMenus.length) {
            this.menuList = this.generateMenuData(childMenus[0].menuList, 3)
            if (this.menuList.length) {
              const firstUrl = this.menuList[0].url
              if (firstUrl && firstUrl.indexOf('#') > -1) {
                window.location.replace(firstUrl)
              }
              if (firstUrl && firstUrl.indexOf('#') === -1) {
                this.$router.replace({ path: firstUrl })
              }
            }
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
        let activePath = purePath
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
    }
  }
}
</script>

<style lang="scss" scoped>
.level-inner-container {
  height: 100%;
  padding-bottom: 50px;
}
.title {
  font-size: 20px;
  font-weight: bold;
}
.level-inner-menu {
  margin: 20px 40px 10px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f8f9fa;
}
.menusLevel4 {
  margin-right: 8px;
}
</style>
