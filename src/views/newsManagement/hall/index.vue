<template>
  <iPage>
    <div class="tab-list-box">
      <iNavMvp
        :list="NavMvp"
        class="margin-bottom20"
        routerPage
        :lev="1"
      />
    </div>
    <router-view></router-view>
  </iPage>
</template>

<script>
import { iNavMvp, iPage } from "rise";
import { tabRouterList } from "./data";
import { getNewAmount } from "@/api/news/news";
import { getUnReadNoticeAmount } from "@/api/news/notice.js";
import { total } from "@/api/news/news";

export default {
  components: {
    iNavMvp,
    iPage,
  },
  data() {
    return {
      tabRouterList,
      amount: 0,
      noticeAmount: 0,
      survey: 0,
      id:''
    };
  },
  computed: {
   NavMvp(){
     return tabRouterList.map(item => {
       if(item.value == 1) item.message = this.amount
       if(item.value == 2) item.message = this.noticeAmount
       if(item.value == 3) item.message = this.survey
       return item
     })
   }
  },
  created(){
    this.id = this.$route.query.userId || this.$store.state.permission.userInfo.id
    sessionStorage.setItem('userId',this.id)
  },
  mounted() {
    getNewAmount().then((res) => {
      this.amount = res?.amount || 0;
    });
    getUnReadNoticeAmount().then((res) => {
      this.noticeAmount = res?.amount || 0;
    });
    total().then((res) => {
      this.survey = res || 0;
    });
  },
  methods: {
    // handleNavChange(evt) {
    //   if(evt.activePath === "/survey/answer") {
    //     window.location.href = `/survey/answer?userId=${this.id}`;
    //   }
    // }
  },
};
</script>
<style lang="scss" scoped>
::v-deep .nav div .badge {
  right: 1.2rem !important;
  .el-badge__content{
    line-height: 1rem !important;
  }
}
::v-deep .lev1 .name{
  margin-right: 0;
}
</style>
