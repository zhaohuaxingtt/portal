<!--
 * @Date: 2021-11-29 10:30:10
 * @LastEditors: caopeng
 * @LastEditTime: 2022-02-17 10:08:16
 * @FilePath: \front-portal-new\src\views\opcsSupervise\opcsPermission\application\router.vue
-->


<template>
  <div class="page">
    <div class="navBox">
      <p class="font20 font-weight">
        {{ language('YINGYONGMINGCHENG', '应⽤名称') }}-{{$route.query.nameZh}}
      </p>
      <div class="logButton">
        <i-button @click="$router.push({path:'/provider/opcs/list'})">{{ language('FANHUI', '返回') }}</i-button>
      </div>
    </div>
    <div class="box">
      <div  :class="isCollapse?'menuor menu':'menu'">
        <div class="btn"
             @click="toggleCollapse ()">
          <i :class="isCollapse?'el-icon-caret-right':'el-icon-caret-left'"></i>
        </div>
        <el-menu :collapse="isCollapse"
                 router
                 :default-active="$route.path"
                 class="el-menu-vertical-demo"
                >
          <el-menu-item v-for="(item,index) in applicationRouterList"
                        :index="item.url"
                        :route="{ path: item.url, query: $route.query }"
                        :key="index">
            <i :class="item.icon"></i>
            <span slot="title" >{{language(item.key, item.name)}}</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div :class="isCollapse?'sectionor':'section'">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
// import { iNavMvp } from 'rise'
import {  iButton } from 'rise'
import { applicationRouterList,applicationRouterListOpcs } from '../../commonHeardNav/navData.js'
import { cloneDeep } from 'lodash'

export default {
     components: {
      iButton,
  },
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
     computed: {
              stateAdmin() {
                return this.$store.state.permission.userInfo.roleList.some(item => item.code == 'ADMIN'||item.code == 'XTGLY'||item.code == 'CSXTGLY'||item.code == 'CIXTGLY')
            },
        },
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
  created() {
      this.$nextTick(()=>{
        if(this.stateAdmin){
            this.applicationRouterList=applicationRouterList
        }else{
            this.applicationRouterList=applicationRouterListOpcs
        }
      })
  
  },
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
.navBox {
  display: flex;
  padding: 0 10px;
  justify-content: space-between;
  align-items: center;
  .logButton {
  }
}
.page{
     padding: 20px;
  width: 100%;

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
      margin-top: 15px;
    margin-left: 17%;
    width: 82.5%;
    height: 88vh;
    overflow-y: auto;
    transition: all 0.5s ease;
  }
  .sectionor {
       margin-top: 15px;
    width: 95%;
        height: 88vh;
    overflow-y: auto;
    margin-left: 6%;
    transition: all 0.5s ease;
  }
}
</style>
