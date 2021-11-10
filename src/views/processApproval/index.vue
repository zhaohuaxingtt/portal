<template>
  <div style="height:100%; padding-bottom:40px">
    <div class="ProApproval-menu">
      <iNavMvp :list="menus" :lev="1" router-page></iNavMvp>
    </div>
    <router-view style="height:100%"></router-view>
  </div>
</template>

<script>
import { iNavMvp } from 'rise'
export default {
  name: 'processApproval',
  components: { iNavMvp },
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
          value:3,
          name:'流程报表',
          message:0,
          url:'/bpm/report',
          activePath:'/bpm/report',
          key:'流程报表'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.ProApproval-menu {
  margin: 20px 0px 0px 30px;
}</style
>>
