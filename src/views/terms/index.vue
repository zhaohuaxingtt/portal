<template>
  <iPage>
    <div class="header">
      <div>{{ $t('TM_TIAOKUANGUANLI') }}</div>
      <iNavMvp :lang="true" :list="navList" :lev='2' right routerPage class="nav" />
    </div>
    <router-view></router-view>
  </iPage>
</template>

<script>
import { iPage, iNavMvp } from "rise";
import { navList } from "./data";
export default {
  components: {iPage, iNavMvp},
  data() {
    return {
      navList,
      activeIndex: 4,
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
.header {
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
