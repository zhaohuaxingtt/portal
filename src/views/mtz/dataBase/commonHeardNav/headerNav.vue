<!--
 * @Author: your name
 * @Date: 2021-09-13 16:56:57
 * @LastEditTime: 2021-09-23 10:23:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\dataBase\commonHeardNav\headerNav.vue
-->

<template>
  <div class="navBox">
    <iNavMvp
      lang
      :list="tabRouterList1"
      routerPage
      class="margin-bottom20"
      :lev="1"
    />
    <div class="rightNav">
      <iNavMvp
        :list="tabRouterList2"
        :lev="2"
        right
        lang
        routerPage
        class="margin-right20"
      />
      <slot name="extralButton"></slot>
    </div>
    <router-view />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iNavMvp } from 'rise'
import { tabRouterList1, tabRouterList2 } from './navData.js'

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iNavMvp },
  data() {
    // 这里存放数据
    return {
      tabRouterList1: window._.cloneDeep(tabRouterList1),
      tabRouterList2: window._.cloneDeep(tabRouterList2)
    }
  },
  // 监听属性 类似于data概念
  computed: {
    whiteBtnList() {
      return this.$store.state.permission.whiteBtnList
    }
  },
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    checkHasEnterMenu() {
      const { path } = this.$route
      const menuList = [...this.tabRouterList2]
      const menuItem = menuList.find((e) => e.url === path)
      if (menuItem) {
        const permissionKey = menuItem.permissionKey
        console.log(
          'this.whiteBtnList[permissionKey]',
          this.whiteBtnList[permissionKey]
        )
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
          console.log('redirectUrl', redirectUrl)
          if (redirectUrl) {
            this.$router.push({ path: redirectUrl })
          }
        }
      }
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.checkHasEnterMenu()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.navBox {
  position: relative;
  .rightNav {
    display: flex;
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
