<!--
 * @Author: yuszhou
 * @Date: 2021-02-19 15:12:20
 * @LastEditTime: 2021-12-17 10:30:07
 * @LastEditors: Please set LastEditors
 * @Description: 首页
 * @FilePath: \front-portal\front-portal\src\views\meeting\myMeeting.vue
-->
<template>
  <div style="flex: 1">
    <iPage>
      <div class="tab-top">
        <!-- 左边 -->
        <div class="tab-list-box">
          <iNavMvp
            :list="myMeetongTabRouterList"
            class="margin-bottom20"
            routerPage
            :lev="1"
          />
        </div>
        <!-- 右边 -->
        <!-- <div v-show="isShowRight"> 
            <iNavMvp
              :list="meetingRightList"
              class="margin-bottom20"
              routerPage
              :lev="2"
            />
          </div> -->
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
      isShowRight: true,
      myMeetongTabRouterList: [
        //添加路由大厅
        // {
        //   value: 1,
        //   name: '管理大厅',
        //   url:'/meeting/managementHall',
        //   // url:'/meeting/home',//会议大厅
        //   // url:
        //   //   '/meeting/live?id=' +
        //   //   (this.$route.query.meetingInfoId
        //   //     ? this.$route.query.id +
        //   //       '&meetingInfoId=' +
        //   //       this.$route.query.meetingInfoId
        //   //     : localStorage.getItem('my_meeting_id') +
        //   //       '&meetingInfoId=' +
        //   //       localStorage.getItem('my_meeting__info_id')),
        //   activePath: '/meeting/managementHall/index.vue',
        //   key: '管理大厅'
        // },
        {
          value: 1,
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
          key: 'MT_HUIYIZHIBO',
          permissionKey: 'CF_MEETING_SCCGCSC_HUIYIZHIBO'
        },
        {
          value: 2,
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
          key: 'MT_JINQIHUIYI',
          permissionKey: 'CF_MEETING_SCCGCSC_JINQIHUIYI'
        }
      ],
      tabRouterList: [
        {
          value: 1,
          name: '管理大厅',
          url: '/meeting/home',
          key: this.$t('MT_GUANLIDATING')
        }
      ],
      meetingButtonList: [
        {
          value: 1,
          name: '会议列表',
          url: '/meeting/home',
          activePath: '/meeting/home',
          key: this.$t('MT_HUIYILIEBIAO')
        },
        {
          value: 2,
          name: '与会人列表',
          url: '/meeting/participants',
          activePath: '/meeting/participants',
          key: this.$t('MT_YUHUIRENLIEBIAO')
        },
        {
          value: 3,
          name: '会议信息',
          url: '/meeting/information',
          activePath: '/meeting/information',
          key: this.$t('MT_HUIYIXINXI')
        }
      ]
      // meetingRightList,
    }
  },
  created() {
    //根据路由来判断 右边tab显示隐藏
    // console.log(this.$route)
    //  if(this.$route.name=='managementHall' || this.$route.name=='meetingListAttendees'|| this.$route.name=='meetingInformation' ||this.$route.name== 'meetingListCurrent'){
    //   this.isShowRight=true
    // }else{
    //   this.isShowRight=false
    // }
  },
  mounted() {
    if (this.$route.query.meetingInfoId) {
      localStorage.setItem('my_meeting_id', this.$route.query.id)
      localStorage.setItem(
        'my_meeting__info_id',
        this.$route.query.meetingInfoId
      )
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
.tab-top {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e3e3e3;
}
</style>
