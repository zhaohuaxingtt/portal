<template>
  <i-table-custom
    row-key="id"
    :height="tableHeight"
    ref="functionMenu"
    :loading="tableLoading"
    :data="menus"
    :columns="tableColumns"
    default-expand
    :default-expand-level="2"
    :treeExpand="tableExpanded"
    :border="false"
    :extra-data="extraData"
  />
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import { fetchResource } from '@/api/role'
import { COLUMNS_MENU } from './data'

export default {
  name: 'favouriteRiseMenu',
  components: { iTableCustom },
  props: {
    filterStr: {
      type: String,
      default: ''
    },
    favourites: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    tableHeight() {
      const bodyHeight = document.body.clientHeight
      if (bodyHeight) {
        return bodyHeight - 230 + 'px'
      }
      return '500px'
    },
    menus() {
      if (!this.filterStr) {
        return this.fullMenu
      }
      return this.flatFullMenu.filter((e) =>
        e.name.toLowerCase().includes(this.filterStr.toLowerCase())
      )
    }
  },
  data() {
    return {
      fullMenu: [],
      flatFullMenu: [],
      tableLoading: false,
      tableColumns: COLUMNS_MENU,
      tableExpanded: { expandKey: 'name', childrenKey: 'menuList' },
      extraData: {
        handleFavorite: this.handleFavorite,
        favourites: this.favourites
      }
    }
  },
  watch: {
    favourites() {
      Vue.set(this.extraData, 'favourites', this.favourites)
      this.queryFullMenu()
    }
  },
  created() {
    this.queryFullMenu()
  },
  methods: {
    async queryFullMenu() {
      this.fullMenu = _.cloneDeep(this.$store.state.permission.menuList)
      this.flatFullMenu = this.getFlatFullMenu(this.fullMenu)
      // 查询所有菜单
      /* this.tableLoading = true
      const { data } = await fetchResource({ type: 3 }).finally(
        () => (this.tableLoading = false)
      )
      const riseMenu = data.filter((e) => e.name === 'RiSE')
      if (riseMenu.length) {
        this.fullMenu = riseMenu[0].menuList
        this.flatFullMenu = this.getFlatFullMenu(this.fullMenu)
        console.log('flatFullMenu', this.flatFullMenu)
      } */
    },
    // 扁平化菜单数据
    getFlatFullMenu(menuList, res) {
      res = res || []
      for (let i = 0; i < menuList.length; i++) {
        const menu = menuList[i]

        const parentItem = res.find((e) => e.id === menu.parentId)
        const nameLinked = parentItem
          ? `${parentItem.nameLinked} - ${menu.name}`
          : menu.name
        const item = {
          name: menu.name,
          nameLinked: nameLinked,
          id: menu.id,
          parentId: menu.parentId,
          permissionKey: menu.permissionKey,
          level: menu.level
        }
        res.push(item)
        if (menu.menuList && menu.menuList.length) {
          this.getFlatFullMenu(menu.menuList, res)
        }
      }
      return res
    },
    handleFavorite(row) {
      this.$emit('save', row)
    }
  }
}
</script>

<style lang="scss" scoped></style>
