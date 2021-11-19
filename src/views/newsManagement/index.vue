<template>
  <div>
    <iPage>
      <div class="tab-list-box">
        <div class="title">{{language('NEWS_XINWENGUANLI', '新闻管理')}}</div>
        <iNavMvp
          :list="newsButtonList"
          class="margin-bottom20"
          routerPage
          :lev="2"
        />
      </div>
      <router-view></router-view>
    </iPage>
  </div>
</template>

<script>
import { iNavMvp, iPage } from "rise";
import { tabRouterList, newsButtonList } from "./data";

export default {
  components: {
    iNavMvp,
    iPage,
  },
  data() {
    return {
      tabRouterList,
      newsButtonList,
    };
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.tab-list-box {
  display: flex;
  justify-content: space-between;
  .title {
    min-height: 28px;
    font-size: 20px;
    font-family: Arial;
    font-weight: bold;
    color: #000000;
    opacity: 1;
  }
  ::v-deep .lev1 .name::after {
    transition: 0s;
  }
}
::v-deep .nav div .name{
  border-radius: 0px !important;
}
::v-deep .nav div .active{
padding: 0 0 3px 0 !important;
    border-bottom: #1763F7 solid 3px;
}
</style>
