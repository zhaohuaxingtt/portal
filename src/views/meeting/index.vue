<!--
 * @Author: yuszhou
 * @Date: 2021-02-19 15:12:20
 * @LastEditTime: 2021-02-19 18:01:14
 * @LastEditors: Please set LastEditors
 * @Description: 首页
 * @FilePath: \rise\src\views\home\index.vue
-->
<template>
  <div>
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
  </div>
</template>

<script>
import { iNavMvp, iPage } from "rise";
import { tabRouterList, meetingButtonList } from "./data";

export default {
  components: {
    iNavMvp,
    iPage,
  },
  data() {
    return {
      tabRouterList,
      meetingButtonList,
    };
  },
  methods: {},
};
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
