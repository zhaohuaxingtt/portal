<template>
    <div class="navBox">
        <iNavMvp
            :list='tabRouterList'
            class='margin-bottom20'
            routerPage
            :lev='1'
        />
        <iNavMvp
            :list="publicOpinionList"
            :lev='2'
            right
            routerPage
            class="rightNav"
        />
        <!-- <span class="set-up-button" @click="setUp">设置</span> -->
    </div>
</template>

<script>
import { iNavMvp } from "rise";
import { tabRouterList,publicOpinionList } from '@/views/frmRating/data'

export default {
    data(){
        return {
            tabRouterList,
            publicOpinionList,
        }
    },
    components:{
        iNavMvp,
    },
    methods:{
        setUp(){

        },
    }
}
</script>

<style lang="scss" scoped>
.navBox {
  position: relative;

  .rightNav {
    position: absolute;
    top: 0;
    right:0;
  }

  .set-up-button {
    position: absolute;
    top: 4px;
    right: 0;
    font-size:18px;
    color:#909091 !important;
    cursor: pointer;
  }
}

::v-deep .nav>div{
  max-width: 170px!important;
}

::v-deep .nav>div:last-child{
  max-width: 180px!important;
  span{
    margin-right:0
  }
}
</style>