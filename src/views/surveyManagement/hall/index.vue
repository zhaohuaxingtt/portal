<template>
  <iPage>
    <div class="tab-list-box">
      <iNavMvp
        :list="NavMvp"
        class="margin-bottom20"
        routerPage
        :lev="1"
        @change="handleNavChange"
      />
    </div>
    <router-view></router-view>
  </iPage>
</template>

<script>
import { iNavMvp, iPage } from 'rise'
import { tabRouterList } from './data'
import { getNewAmount, getUnReadNoticeAmount } from '@/api/survey/survey'
import { total } from '@/api/survey/answer'

export default {
  components: {
    iNavMvp,
    iPage
  },
  data() {
    return {
      tabRouterList,
      amount: 0,
      noticeAmount: 0,
      surveyAmount: 0,
      id: ''
    }
  },
  computed: {
    NavMvp() {
      return tabRouterList.map((item) => {
        if (item.value == 1) item.message = this.amount
        if (item.value == 2) item.message = this.noticeAmount
        if (item.value == 3) item.message = this.surveyAmount
        return item
      })
    }
  },
  created() {
    // this.id = this.$route.query.userId || this.$store.state.permission.userInfo.id
    // sessionStorage.setItem("userId",this.id)
  },
  mounted() {
    getNewAmount().then((res) => {
      this.amount = res?.amount || 0
    })
    getUnReadNoticeAmount().then((res) => {
      this.noticeAmount = res?.amount || 0
    })
    total().then((res) => {
      this.surveyAmount = Number(res) || 0
    })
  },
  methods: {
    // handleNavChange(evt) {
    //   if (evt.activePath === "/news/news") {
    //     window.location.href = process.env.VUE_APP_NEWS + `?userId=${this.id}`;
    //   } else if (evt.activePath === "/news/notice") {
    //     window.location.href = process.env.VUE_APP_NOTICE + `?userId=${this.id}`;
    //   }
    // },
  }
}
</script>
<style lang="scss" scoped>
.tab-list-box {
  ::v-deep .nav > div {
    position: relative;
    margin-right: 30px;
  }
  ::v-deep .nav div .badge {
    right: -20px !important;
    position: absolute;
    .el-badge__content {
      line-height: 1rem !important;
    }
  }
  ::v-deep .nav.lev1 .name {
    margin-right: 0px;
  }
}
</style>
