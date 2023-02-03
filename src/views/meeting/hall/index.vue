<!--
 * @Author: HS 会议中心 http://localhost:8080/portal/#/meeting/hall
 * @FilePath: \front-portal\src\views\meeting\hall\index.vue
-->
<template>
  <div style="flex: 1">
    <iPage>
      <div class="tab-list-box">
        <iNavMvp
          :list="tabRouterList"
          class="margin-bottom20"
          routerPage
          :lev="1"
          @change="
            (e) => {
              handleChange(e)
            }
          "
        />
        <div v-if="value !== 4"><newTheTable :value="value" /></div>
        <div v-if="value === 4 && menuType === 'admin'">
          <adminHall :value="value" />
        </div>
      </div>
    </iPage>
  </div>
</template>

<script>
import { iNavMvp, iPage } from 'rise'
import newTheTable from './components/newTheTable.vue'
import adminHall from './components/adminHall.vue'
// import { tabRouterList } from './components/data'
import { findFirstStartCSCMeeting } from '@/api/meeting/live'

export default {
  components: {
    iNavMvp,
    iPage,
    newTheTable,
    adminHall
  },
  created() {
    // console.log(this.$route);
    this.menuType = this.$route.query.menuType
  },
  data() {
    return {
      value: 1,
      tabRouterList: [
        {
          value: 1,
          name: '通用会议',
          url: '/meeting/hall',
          activePath: '/meeting/type',
          key: 'MT_TONGYONGHUIYI',
          permissionKey: 'CF_MEETING_TONGYONGHUIYI'
        },
        {
          value: 2,
          name: '生产采购CSC',
          url: '/meeting/hall',
          key: 'MT_SHENGCHANCAIGOUSCC',
          permissionKey: 'CF_MEETING_SCCGCSC'
        },
        {
          value: 3,
          name: '一般采购CSG',
          url: '/meeting/hall',
          key: 'MT_YIBANCAIGOUCSG',
          permissionKey: 'CF_MEETING_YBCGCSG'
        },
        // {
        //   value: 4,
        //   name: '管理大厅',
        //   url: '/meeting/hall',
        //   key: 'MT_GUANLIDATING',
        //   permissionKey: 'CF_MEETING_HOME'
        // }
      ],
      menuType: ''
    }
  },
  methods: {
    async query() {
      const res = await findFirstStartCSCMeeting()
      return res
    },
    handleChange(e) {
      // console.log(e);
      // 展示卡片
      // if (e.value === 2) {
      //   this.query().then((res) => {
      //     if (res && res.id) {
      //       this.$router.push({
      //         path: '/meeting/specialLive',
      //         query: {
      //           meetingInfoId: res.id ? res.id : -1
      //         }
      //       })
      //     } else {
      //       this.$router.push({
      //         path: '/meeting/special-near-meeting',
      //         query: {
      //           meetingInfoId: res.id ? res.id : -1
      //         }
      //       })
      //     }
      //   })
      // } else {
        this.value = e.value
      // }
    }
  }
}
</script>
<style lang="scss" scoped>
.tab-list-box {
  ::v-deep .lev1 .name::after {
    transition: 0s;
  }
}
</style>
