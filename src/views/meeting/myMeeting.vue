<!--
 * @Author: yuszhou
 * @Date: 2021-02-19 15:12:20
 * @LastEditTime: 2021-12-14 12:13:31
 * @LastEditors: Please set LastEditors
 * @Description: 首页
 * @FilePath: \front-portal\front-portal\src\views\meeting\myMeeting.vue
-->
<template>
  <div style="flex: 1">
    <iPage>
      一般
      <!-- 左边 -->
      <div class="tab-list-box">
        <iNavMvp
          :list="myMeetongTabRouterList"
          class="margin-bottom20"
          routerPage
          :lev="1"
        />
          <!-- 右边 -->
      <!-- <span>
        <iNavMvp
          :list="meetingButtonList"
          class="margin-bottom20"
          routerPage
          :lev="2"
        />
      </span> -->
      </div>
      <router-view></router-view>
    </iPage>
  </div>
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
      myMeetongTabRouterList: [
        {
          value: 1,
          name: '管理大厅',
          url:'/meeting/managementHall',
          // url:'/meeting/home',//会议大厅
          // url:
          //   '/meeting/live?id=' +
          //   (this.$route.query.meetingInfoId
          //     ? this.$route.query.id +
          //       '&meetingInfoId=' +
          //       this.$route.query.meetingInfoId
          //     : localStorage.getItem('my_meeting_id') +
          //       '&meetingInfoId=' +
          //       localStorage.getItem('my_meeting__info_id')),
          activePath: '/meeting/managementHall/index.vue',
          key: '管理大厅'
        },
        {
          value: 2,
          name: '会议直播',
          url:
            '/meeting/live?id=' +
            (this.$route.query.meetingInfoId
              ? this.$route.query.id +
                '&meetingInfoId=' +
                this.$route.query.meetingInfoId
              : localStorage.getItem('my_meeting_id') +
                '&meetingInfoId=' +
                localStorage.getItem('my_meeting__info_id')),
          activePath: '/meeting/live',
          key: '会议直播'
        },
        {
          value: 3,
          name: '近期会议',
          // url: "/meeting/near-meeting?id=" + this.$route.query.id + '&meetingInfoId=' + this.$route.query.meetingInfoId,
          url:
            '/meeting/near-meeting?id=' +
            (this.$route.query.meetingInfoId
              ? this.$route.query.id +
                '&meetingInfoId=' +
                this.$route.query.meetingInfoId
              : localStorage.getItem('my_meeting_id') +
                '&meetingInfoId=' +
                localStorage.getItem('my_meeting__info_id')),
          activePath: '/meeting/near-meeting',
          key: '近期会议'
        },
        
      ],
      // tabRouterList,
      // meetingButtonList,
    }
  },
  mounted() {
    if (this.$route.query.meetingInfoId) {
      localStorage.setItem('my_meeting_id', this.$route.query.id)
      localStorage.setItem('my_meeting__info_id', this.$route.query.meetingInfoId )
    }
  },
  methods: {}
}
</script>
<style lang="scss" scoped>
::v-deep .routerpage {
  height: calc(100vh - 32px);
}

.tab-list-box {
  display: flex;
  justify-content: start;

  ::v-deep .lev1 .name::after {
    transition: 0s;
  }
}
</style>
