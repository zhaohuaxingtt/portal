<!--电子签章--->
<template>
<iPage v-permission.auto="ELECTRONIC_SIGNATURE_HOME_PAGE|电子签章首页">
    <iNavMvp v-if="navList" :lev="1" :list="navList" :lang="true" routerPage class="nav margin-bottom25"  />
    <router-view></router-view>
</iPage>
</template>

<script>
import {iPage,iNavMvp} from 'rise'
import { navList } from '@/views/electronicsignature/config/data'
export default {
  name: 'index',
  components: {
    iNavMvp,
    iPage
  },
  data() {
    return {
      navList,
    }
  },
  methods:{
  }
}
</script>

<style scoped>

</style>