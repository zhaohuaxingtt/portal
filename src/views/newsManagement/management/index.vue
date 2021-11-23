<template>
  <iPage>
    <div class="manage-box">
      <iNavMvp :list="newsButtonList" routerPage :lev="2" />
      <router-view></router-view>
    </div>
  </iPage>
</template>

<script>
import { iNavMvp, iPage } from "rise";
import { newsButtonList } from "./data";

export default {
  components: {
    iNavMvp,
    iPage,
  },
  data() {
    return {
      newsButtonList,
    };
  },
  methods: {
    changeIndex(e) {
      this.activeIndex = e;
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
