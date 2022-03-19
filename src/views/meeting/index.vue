<!--
 * @Author: yuszhou
 * @Date: 2021-02-19 15:12:20
 * @LastEditTime: 2021-02-19 18:01:14
 * @LastEditors: Please set LastEditors
 * @Description: 首页
 * @FilePath: \rise\src\views\home\index.vue
-->
<template>
  <iPage>
    <div class="tab-list-box">
      <iNavMvp
        :list="tabRouterList"
        class="margin-bottom20"
        routerPage
        :lev="1"
      />
      <iNavMvp
        :list="meetingButtonList"
        class="margin-bottom20"
        routerPage
        :lev="2"
      />
    </div>
    <router-view></router-view>
  </iPage>
</template>

<script>
import { iNavMvp, iPage } from 'rise'
// import { tabRouterList, meetingButtonList } from './data'

export default {
  components: {
    iNavMvp,
    iPage
  },
  data() {
    return {
      tabRouterList: [
        {
          value: 1,
          name: '管理大厅',
          url: '/meeting/home',
          key: '管理大厅'
        }
      ],
      meetingButtonList: [
        {
          value: 1,
          name: '会议列表',
          url: '/meeting/home',
          activePath: '/meeting/home',
          key: '会议列表'
        },
        {
          value: 2,
          name: '与会人列表',
          url: '/meeting/participants',
          activePath: '/meeting/participants',
          key: '与会人列表'
        },
        {
          value: 3,
          name: '会议信息',
          url: '/meeting/information',
          activePath: '/meeting/information',
          key: '会议信息'
        }
      ]
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
.tab-list-box {
  display: flex;
  justify-content: space-between;

  ::v-deep .lev1 .name::after {
    transition: 0s;
  }
}
</style>
