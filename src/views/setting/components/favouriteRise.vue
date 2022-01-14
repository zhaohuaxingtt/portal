<template>
  <iCard>
    <favouriteRiseSearch @search="search" />
    <h4 class="t">菜单列表</h4>
    <div class="content">
      <div class="content-panel menu">
        <favouriteRiseMenu :favourited="favourited" :filter-str="filterStr" />
      </div>
      <div class="content-panel has-menu">
        <favouriteRiseMenuHas
          :favourited="favourited"
          :filter-str="filterStr"
        />
      </div>
    </div>
  </iCard>
</template>

<script>
import { iCard } from 'rise'
import favouriteRiseSearch from './favouriteRiseSearch'
import favouriteRiseMenu from './favouriteRiseMenu'
import favouriteRiseMenuHas from './favouriteRiseMenuHas'
export default {
  name: 'favouriteRise',
  components: {
    iCard,
    favouriteRiseSearch,
    favouriteRiseMenu,
    favouriteRiseMenuHas
  },
  data() {
    return {
      riseFavourited: [],
      filterStr: ''
    }
  },
  created() {
    this.queryRiseFavourited()
  },
  methods: {
    search(val) {
      this.filterStr = val
    },
    queryRiseFavourited() {
      this.riseFavourited = [
        {
          createBy: 1,
          createDate: '2021-03-23 16:28:34',
          fieldList: null,
          id: 4001,
          isDelete: false,
          level: 1,
          module: null,
          name: 'Workbench',
          orderNum: 6999,
          parentId: 5800,
          parentPermissionKey: null,
          parentResourceName: null,
          permissionKey: 'RISE_WORKBENCH',
          properties: null,
          propertyMap: null,
          resourceList: null,
          subResourceList: null,
          target: null,
          type: 3,
          updateBy: null,
          updateDate: '2000-01-01 00:00:00',
          url: null
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.t {
  font-size: 16px;
  margin: 30px 0px;
}
.content {
  display: flex;
  justify-content: space-between;
  .content-panel {
    border: 1px solid #eaeaea;
    padding: 20px;
    box-sizing: border-box;
    &.menu {
      width: calc(100% - 520px);
    }
    &.has-menu {
      width: 500px;
    }
  }
}
</style>
