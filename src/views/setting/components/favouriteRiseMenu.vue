<template>
  <i-table-custom
    v-if="tableColumns.length > 0"
    row-key="id"
    :height="tableHeight"
    ref="functionMenu"
    :loading="tableLoading"
    :data="fullMenu"
    :columns="tableColumns"
    default-expand
    :default-expand-level="2"
    :treeExpand="tableExpanded"
  />
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import { fetchResource } from '@/api/role'
import { COLUMNS_MENU } from './data'
export default {
  name: 'favouriteRiseMenu',
  components: { iTableCustom },
  computed: {
    tableHeight() {
      const bodyHeight = document.body.clientHeight
      if (bodyHeight) {
        return bodyHeight - 230 + 'px'
      }
      return '500px'
    }
  },
  data() {
    return {
      fullMenu: [],
      tableLoading: false,
      tableColumns: COLUMNS_MENU,
      tableExpanded: { expandKey: 'name', childrenKey: 'menuList' }
    }
  },
  created() {
    this.queryFullMenu()
  },
  methods: {
    async queryFullMenu() {
      // 查询所有菜单
      this.tableLoading = true
      const { data } = await fetchResource({ type: 3 }).finally(
        () => (this.tableLoading = false)
      )
      const riseMenu = data.filter((e) => e.name === 'RiSE')
      if (riseMenu.length) {
        this.fullMenu = riseMenu[0].menuList
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
