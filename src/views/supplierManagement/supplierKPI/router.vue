<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-23 15:39:07
 * @LastEditors: caopeng
 * @Descripttion: your project
-->
<template>
  <div>
    <iNavMvp :lang="true" :list="categoryManagementAssistantList" :lev='2' right routerPage class="nav" />
    <router-view />
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iPage, iNavMvp } from "rise";
import headerNav from "../commonHeardNav/headerNav";
import { categoryManagementAssistantList } from "../commonHeardNav/navData.js";
import { cloneDeep } from "lodash"

export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iPage, headerNav, iNavMvp },
  data() {
    // 这里存放数据
    return {
      categoryManagementAssistantList: cloneDeep(categoryManagementAssistantList),
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

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {
  this.checkHasEnterMenu()
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    
  },
  methods:{
    checkHasEnterMenu() {
      const { path } = this.$route
      const menuList = [...this.categoryManagementAssistantList] //获取当前菜单
      const menuItem = menuList.find((e) => e.url === path) //获取当前所在路由地址对象
      if (menuItem) {
        //有地址时
        const permissionKey = menuItem.permissionKey //获取到该地址的key
        console.log(
          'this.whiteBtnList[permissionKey]',
          this.whiteBtnList[permissionKey] //key的值存在于权限名单中
        )
        // 入口url不在授权列表
        if (!this.whiteBtnList[permissionKey]) {
          //若当前地址不在权限名单中
          let redirectUrl = ''
          for (let i = 0; i < menuList.length; i++) {
            //循环当前菜单
            const menu = menuList[i]
            if (this.whiteBtnList[menu.permissionKey]) {
              //找到当前菜单哪个菜单存在于权限中
              redirectUrl = menu.url //顺位第一个的菜单地址
              break //找到后即关闭方法
            }
          }
          console.log('redirectUrl', redirectUrl)
          if (redirectUrl) {
            //使用找到的菜单并拥有权限的当作首页面重定向路由
            this.$router.push({ path: redirectUrl ,query:this.$route.query})
          }
        }
      }
    }
  }
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.nav {
  position: absolute;
  top: 1.75rem;
  right: 9rem;
}
</style>
