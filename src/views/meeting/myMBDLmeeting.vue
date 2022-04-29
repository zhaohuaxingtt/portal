<!--
 * @Author: yuszhou
 * @Date: 2021-02-19 15:12:20
 * @LastEditTime: 2022-04-28 16:26:43
 * @LastEditors: Please set LastEditors
 * @Description: 首页
 * @FilePath: \front-portal\src\views\meeting\myMBDLmeeting.vue
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
      // myMeetongTabRouterList: [
      //   {
      //     value: 1,
      //     name: '会议直播',
      //     url:
      //       '/MBDLMeeting/live?meetingInfoId=' +
      //       (this.$route.query.meetingInfoId
      //         ? this.$route.query.meetingInfoId
      //         : localStorage.getItem('my_meeting__info_id')),
      //     activePath: '/MBDLMeeting/live',
      //     key: this.$t('MT_HUIYIZHIBO'),
      //     permissionKey:"CF_MEETING_SCCGCSC_HUIYIZHIBO"
      //   },
      //   {
      //     value: 2,
      //     name: '近期会议',
      //     url: '/nearMBDlMeeting/live',
      //     activePath: '/nearMBDlMeeting/live',
      //     key: this.$t('MT_JINQIHUIYI'),
      //     permissionKey:"CF_MEETING_SCCGCSC_JINQIHUIYI"
      //   }
      // ]
      myMeetongTabRouterList: [
        {
          value: 1,
          name: '会议直播',
          url:
            '/MBDLMeeting/live?id=' +
            (this.$route.query.meetingInfoId
              ? this.$route.query.id +
                '&meetingInfoId=' +
                this.$route.query.meetingInfoId
              : localStorage.getItem('my_mbdlcsc_meeting_id') +
                '&meetingInfoId=' +
                localStorage.getItem('my_mbdlcsc_meeting__info_id')),
          activePath: '/MBDLMeeting/live',
          key: this.$t('MT_HUIYIZHIBO'),
          permissionKey:"CF_MEETING_SCCGCSC_HUIYIZHIBO"
        },
        {
          value: 2,
          name: '近期会议',
          url:
            '/nearMBDlMeeting/live?id=' +
            (this.$route.query.meetingInfoId
              ? this.$route.query.id +
                '&meetingInfoId=' +
                this.$route.query.meetingInfoId
              : localStorage.getItem('my_mbdlcsc_meeting_id') +
                '&meetingInfoId=' +
                localStorage.getItem('my_mbdlcsc_meeting__info_id')),
          activePath: '/nearMBDlMeeting/live',
          key: this.$t('MT_JINQIHUIYI'),
          permissionKey:"CF_MEETING_SCCGCSC_JINQIHUIYI"
        }
      ]
    }
  },
  mounted() {
    // if (this.$route.query.meetingInfoId) {
    //   localStorage.setItem(
    //     'my_meeting__info_id',
    //     this.$route.query.meetingInfoId
    //   )
    // }
    if (this.$route.query.meetingInfoId) {
      localStorage.setItem('my_mbdlcsc_meeting_id', this.$route.query.id)
      localStorage.setItem(
        'my_mbdlcsc_meeting__info_id',
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
