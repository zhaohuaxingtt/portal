<!--
 * @Author: yuszhou
 * @Date: 2021-02-19 15:12:20
 * @LastEditTime: 2021-12-15 17:17:13
 * @LastEditors: Please set LastEditors
 * @Description: 首页
 * @FilePath: \front-portal\front-portal\src\views\meeting\mySpecialMeeting.vue
-->
<template>
  <div style="flex: 1">
    <iPage>
      <div class="tab-list-box">
        <iNavMvp
          :list="myMeetongTabRouterList"
          class="margin-bottom20"
          routerPage
          :lev="1"
        />
      </div>
      <router-view></router-view>
    </iPage>
  </div>
</template>

<script>
import { iNavMvp, iPage } from 'rise'

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
          name: '会议直播',
          url:
            '/meeting/specialLive?meetingInfoId=' +
            (this.$route.query.meetingInfoId
              ? this.$route.query.meetingInfoId
              : localStorage.getItem('my_meeting__info_id')),
          activePath: '/meeting/specialLive',
          key: '会议直播'
        },
        {
          value: 2,
          name: '近期会议',
          url: '/meeting/special-near-meeting',
          activePath: '/meeting/special-near-meeting',
          key: '近期会议'
        }
      ]
    }
  },
  mounted() {
    if (this.$route.query.meetingInfoId) {
      localStorage.setItem(
        'my_meeting__info_id',
        this.$route.query.meetingInfoId
      )
    }
  }
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
