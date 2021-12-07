<!--
 * @Date: 2021-11-29 10:30:10
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-07 16:43:41
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\router.vue
-->


<template>
  <div class="box">
    <!-- <iNavMvp :list="applicationRouterList" :lev='2' right routerPage class="nav" /> -->
    <div :class="isCollapse?'menuor menu':'menu'">
      <div class="btn"
           @click="toggleCollapse ()">
        <i :class="isCollapse?'el-icon-caret-right':'el-icon-caret-left'"></i>
      </div>
      <el-menu :collapse="isCollapse"
               router
               :default-active="$route.path"
               class="el-menu-vertical-demo"
               @open="handleOpen"
               @close="handleClose">
        <el-menu-item v-for="(item,index) in applicationRouterList"
                      :index="item.url"
                      :route="{ path: item.url, query: { opcsSupplierId: $route.query.opcsSupplierId ,nameZh:$route.query.nameZh} }"
                      :key="index">
          <i :class="item.icon"></i>
          <span slot="title">{{language(item.key, item.name)}}</span>
        </el-menu-item>
      </el-menu>

    </div>
    <div :class="isCollapse?'sectionor':'section'">
      <router-view />

    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// import { iNavMvp } from 'rise'
import { applicationRouterList } from '../../commonHeardNav/navData.js'
import { cloneDeep } from 'lodash'

export default {
  // import引入的组件需要注入到对象中才能使用
  //   components: { iNavMvp },
  data() {
    // 这里存放数据
    return {
      applicationRouterList: cloneDeep(applicationRouterList),
      isCollapse: false //水平折叠收起菜单
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {
    // 菜单收缩按钮
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.btn {
  text-align: right;
  padding: 20px 20px 10px 0;
  cursor: pointer;
  i {
    font-size: 24px;
    color: #1663f6;
  }
}
.box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .menu {
    position: relative;
    margin-top: 20px;
    width: 14%;
    position: fixed;
    height: 100%;
    transition: all 0.5s ease;
    background: white;
    z-index: 10;
  }
  .menuor {
    width: 4%;
  }
  .section {
    margin-left: 17%;
    width: 84%;
    transition: all 0.5s ease;
  }
  .sectionor {
    width: 95%;
    margin-left: 6%;
    transition: all 0.5s ease;
  }
}
</style>
