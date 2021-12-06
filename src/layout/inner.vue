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
    <div
      class="level-inner-menu"
      v-show="menusLevel3.length > 0 || menusLevel4.length > 0"
    >
      <iNavMvp :list="menusLevel3" :lev="1" lang router-page />

      <iNavMvp
        v-if="menusLevel4.length > 0"
        class="menusLevel4"
        :list="menusLevel4"
        :lev="2"
        lang
        router-page
      />
    </div>

    <router-view style="height: 100%" />
  </div>
</template>

<script>
import { iNavMvp } from 'rise'
export default {
  name: 'LayoutInner',
  components: { iNavMvp },
  data() {
    return {
      menus: [],
      menusLevel3: [],
      menusLevel4: [],
      pathIndex: 0
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
      if (pathIndex <= 2) {
        this.menusLevel3 = this.generateMenuData(pathMenus, 3)
      } else {
        const parentPath = matched[2].path
        const parentMenus = this.getSiblingMenus(
          this.fullMenus,
          parentPath,
          menuType,
          activePath
        )
        this.menusLevel3 = this.generateMenuData(parentMenus, 3)
        console.log('menusLevel3', this.menusLevel3)

        this.menusLevel4 = this.generateMenuData(pathMenus, 4)
        console.log('menusLevel4', this.menusLevel4)
        // 找不到本级菜单，可能url所在菜单未赋权限
        if (!pathMenus) {
          const childMenus = parentMenus.filter((e) => e.url === parentPath)
          if (childMenus.length) {
            this.menusLevel4 = this.generateMenuData(childMenus[0].menuList, 4)
            if (this.menusLevel4.length) {
              const firstUrl = this.menusLevel4[0].url
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
.level-inner-menu {
  padding: 20px 40px 0px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.menusLevel4 {
  margin-right: 8px;
}
</style>
