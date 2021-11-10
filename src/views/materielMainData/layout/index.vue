<!--
 * @Author: your name
 * @Date: 2021-08-10 14:33:59
 * @LastEditTime: 2021-08-17 13:50:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mainData\layout\index.vue
-->
<template>
  <iPage style="padding-top: 0px;">
    <div class="main-data">
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
import { COLUMNS, MENUS } from './data'
import { iCard, iPage } from 'rise'
export default {
  name: 'sideMenu',
  components: {
    iTableCustom,
    iCard,
    iPage
  },
  computed: {
    title() {
      const { title, titleEn } = this.$route.meta
      return this.$i18n.locale === 'zh' ? title || titleEn : titleEn || title
    },
    tableHeight() {
      const bodyHeight = document.body.clientHeight
      if (bodyHeight) {
        return bodyHeight - 100 + 'px'
      }
      return '500px'
    }
  },
  data() {
    return {
      columns: COLUMNS,
      menus: MENUS,
      tableExpanded: { expandKey: 'title', childrenKey: 'children' }
    }
  },
  methods: {
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
