<template>
  <iPage class="partsprocureHome">
    <div class="navBar">
      <iNavMvp :lev="1" :list="navList" :lang="true" routerPage="true" />
    </div>
    <router-view></router-view>
  </iPage>
</template>

<script>
import { iPage, iNavMvp } from 'rise';

import { navList } from './components/data';
export default {
  components: {
    iPage,
    iNavMvp,
  },
  data() {
    return {
      navList: navList,
      rightNavList: []
    };
  },
};
</script>

<style lang="scss" scoped>
.navBar {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e3e3e3;
  padding-bottom: 5px;
  position: relative;
  z-index: 1;
}
.partsprocureHome {
  position: relative;
  ::v-deep .nav.flex-align-center {
    > div:first-of-type {
      margin-left: 0;
    }
  }
}
</style>
