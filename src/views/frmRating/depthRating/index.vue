<!--
 * @Author: 舒杰
 * @Date: 2021-05-27 13:57:04
 * @LastEditTime: 2021-08-24 14:18:45
 * @LastEditors: 舒杰
 * @Description: FRM 深评首页
 * @FilePath: \front-portal\src\views\frmRating\depthRating\index.vue
-->
<template>
  <iPage>
    <div class="flex-between-center">
      <iNavMvp
        :list="tabRouterList"
        class="margin-bottom20"
        routerPage
        :lev="1"
      />
      <div class="btnRow">
        <!-- 维护行业均值-->
        <iButton @click="onJumpIndustryAverage" v-permission="PORTAL_SUPPLIER_NAV_GAILAN_WEIHUHANGYEJUNZHI">{{
          $t('SPR_FRM_DEP_WHHYJZ')
        }}</iButton>
      </div>
    </div>
    <search
      @getTableList="getTableList"
      @reset="getTableList"
      class="margin-bottom20"
      :financialSuppleData="financialSuppleData"
    />
    <depthTable
      ref="depthTableList"
      :financialSuppleData="financialSuppleData"
      :form="form"
      @groupNameList="groupNameList"
    ></depthTable>
  </iPage>
</template>

<script>
import { iPage, iNavMvp, iButton } from 'rise'
import search from './components/search'
import depthTable from './components/depthTable'
import { tabRouterList } from '../data'
import { groupNameList } from '@/api/frmRating/depthRating'
export default {
  components: {
    iPage,
    iNavMvp,
    iButton,
    search,
    depthTable
  },
  data() {
    return {
      tabRouterList,
      financialSuppleData: [], //集团打包数据
      form: {} //搜索条件
    }
  },
  created() {
    this.groupNameList()
  },
  methods: {
    // 获取首页列表数据
    getTableList(form) {
      this.form = form
      this.$nextTick(() => {
        this.$refs.depthTableList.search()
      })
    },
    //维护行业均值
    onJumpIndustryAverage() {
      this.$router.push('/supplier/frmrating/depthRating/industryAverage')
    },
    // 集团打包
    groupNameList() {
      groupNameList({}).then(res => {
        if (res.data) {
          this.financialSuppleData = res.data
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
