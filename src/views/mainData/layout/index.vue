<!--
 * @Author: your name
 * @Date: 2021-08-10 14:33:59
 * @LastEditTime: 2021-08-17 13:50:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mainData\layout\index.vue
-->
<template>
  <iPage style="padding-top: 0px">
    <div class="main-data">
      <!-- <pageHeader> {{ title }} </pageHeader> -->
      <div class="main-data-body margin-top20">
        <iCard class="main-data-side-menu">
          <iTableCustom
            :columns="columns"
            :data="menus"
            :tree-expand="tableExpanded"
            child-num-visible
            is-nav-menu
            :height="tableHeight"
            @click-menu="handleClickMenu"
          />
        </iCard>
        <div class="main-data-content">
          <router-view class="main-data-routerpage" />
        </div>
      </div>
    </div>
  </iPage>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import { COLUMNS, MENUSZh ,MENUSEn } from './data'
import { iCard, iPage } from 'rise'
export default {
  name: 'sideMenu',
  components: {
    iTableCustom,
    iCard,
    iPage
  },
  computed: {
    tableHeight() {
      const bodyHeight = document.body.clientHeight
      if (bodyHeight) {
        return bodyHeight - 100 + 'px'
      }
      return '500px'
    },
    whiteBtnList() {
      return this.$store.state.permission.whiteBtnList
    },
    lang(){
      return this.$store.state.permission.language
    },
    menus() {
      const res = []
      this.MENUS.forEach((element) => {
        if (this.whiteBtnList[element.permissionKey]) {
          res.push(element)
        }
      })
      return res
    }
  },
  watch:{
   lang(){
      this.changMenus()
    }
  },
  data() {
    return {
      columns: COLUMNS,
      MENUS:[],
      tableExpanded: { expandKey: 'title', childrenKey: 'children' },
    }
  },
  created(){
    this.lang = this.$store.state.permission.language
    this.changMenus()
  },
  methods: {
    changMenus(){
      this.MENUS = this.lang == 'zh' ? MENUSZh : MENUSEn
    },
    handleClickMenu(row) {
      const { fullPath } = this.$route
      if (row.isLeaf && fullPath !== row.url) {
        this.$router.push(row.url)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-data-body {
  display: flex;
  justify-content: space-between;
  height: 100%;
  align-items: stretch;
  min-height: calc(100vh - 170px);
  .main-data-side-menu {
    width: 390px;
  }
  .main-data-content {
    width: calc(100% - 410px);
  }
  .main-data-routerpage {
    padding: 0px;
    overflow: visible;
  }
}
</style>
