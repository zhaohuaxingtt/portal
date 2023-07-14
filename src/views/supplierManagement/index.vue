<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-08-23 15:39:07
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
-->
<template>
  <iPage class="supplierManagement" :class="padding?'padding':''"
         v-loading="pageLoading">
    <headerNav :class="padding?'nav':''" />
    <router-view class="page-content" />
  </iPage>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》';
import { iPage } from "rise";
import headerNav from "./commonHeardNav/headerNav";
export default {
  // import引入的组件需要注入到对象中才能使用
  components: { iPage, headerNav },
  data () {
    // 这里存放数据
    return {
      padding: false,
      pageLoading:false
    }
  },
  // 监听属性 类似于data概念
  computed: {},
  // 监控data中的数据变化
  watch: {},
  // 方法集合
  methods: {

  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  created () {
    if (this.$route.path === '/supplier/NTier/NTierMap' || this.$route.path === '/supplier/NTier/supplyChainRisk/map') {
      this.padding = true
    }
  },
  // 生命周期 - 挂载完成（可以访问DOM元素）
  mounted () {

  },
}
</script>
<style lang='scss' scoped>
// @import url(); 引入公共css类
.supplierManagement{
  position: relative;
  display: flex;
  flex-flow: column;
  height: 100%;
  .page-content{
    flex: 1;
    display: flex;
    flex-flow: column;
    overflow: hidden;
    ::v-deep .kpi-content{
      flex: 1;
      display: flex;
      flex-flow: column;
      overflow: hidden;
    }
  }
  ::v-deep .table-card {
    flex: 1;
    overflow: hidden;
    min-height: 400px;
    display: flex;
    flex-flow: column;
    .card-body-box {
      flex: 1;
      overflow: hidden;
      .cardBody {
        display: flex;
        flex-flow: column;
      }
      .table-box {
        flex: 1;
        display: flex;
        flex-flow: column;
        overflow: hidden;
        .i-table-custom{
          flex: 1;
          overflow: hidden;
        }
      }
    }
  }
  ::v-deep .nav.flex-align-center{
    > div:first-of-type{
      margin-left: 0;
    }
  }
}
.padding {
  padding: 1.875rem 0 0 0;
}
.nav {
  padding: 0 2.5rem 0 2.5rem;
}
.routerpage {
  position: relative;
}
</style>
