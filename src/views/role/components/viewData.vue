<template>
  <iCard>
    <div>
      <div class="panel-header margin-bottom20">行权限</div>
      <dataPermissionRow :form="detail" />
    </div>
    <div class="panel-divider"></div>
    <div class="panel-header margin-bottom20">列权限</div>
    <div class="view-data">
      <div class="menu">
        <dataPermissionMenu
          :columns="menuColumns"
          :data="menuData"
          @set-permission-col-parent="setPermissionColParent"
        />
      </div>
      <div class="content" v-loading="dataPermissionColLoading">
        <div class="content-item margin-bottom20">
          <dataPermissionField
            :columns="dataTableColColumns"
            :data="dataPermissionColData"
          />
        </div>

        <dataPermissionCol
          :data="dataPermissionColData"
          :form="dataPermissionForm[currentDataPermissionKey]"
        />
      </div>
    </div>
  </iCard>
</template>

<script>
import { iCard } from 'rise'
import dataPermissionMenu from './dataPermissionMenu'
import dataPermissionField from './dataPermissionField'
import dataPermissionRow from './dataPermissionRow'
import dataPermissionCol from './dataPermissionCol'
import { getMenuByType } from '../util'
import { COLUMNS_DATA_MENU } from './data'
import { treeToArray, arrayToTree } from '@/utils'
export default {
  name: 'viewData',
  components: {
    iCard,
    dataPermissionMenu,
    dataPermissionField,
    dataPermissionRow,
    dataPermissionCol
  },
  props: {
    fullMenu: {
      type: Array,
      default: function () {
        return []
      }
    },
    detail: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  watch: {
    fullMenu() {
      this.queryMenuData()
    },
    detail() {
      this.queryMenuData()
      this.setDataPermisssionForm()
    }
  },
  data() {
    return {
      menuColumns: COLUMNS_DATA_MENU,
      dataPermissionColData: [],
      dataPermissionColParentId: null,
      dataPermissionColLoading: false,
      selectedRow: {},
      menuData: [],
      dataPermissionForm: {},
      currentDataPermissionKey: ''
    }
  },
  created() {
    this.setDataPermisssionForm()
  },
  methods: {
    setDataPermisssionForm() {
      if (this.detail.columnConfig) {
        this.dataPermissionForm = JSON.parse(this.detail.columnConfig)
      }
    },
    queryMenuData() {
      const flattenFullMenu = treeToArray(this.fullMenu, 'menuList')
      const detailMenu = this.detail.menuList || []
      const flattenDetailMenu = treeToArray(detailMenu, 'menuList')
      const ids = flattenDetailMenu.reduce((res, cur) => {
        res.push(cur.id)
        return res
      }, [])
      const flattenMenus = flattenFullMenu.filter((e) => {
        if (e.parentId === null && e.type === 5) {
          return false
        }
        return ids.indexOf(e.id) > -1 || e.type === 5
      })
      const mentTree = arrayToTree(flattenMenus, 'id', 'parentId', 'menuList')
      this.menuData = getMenuByType(mentTree, [3, 5])
    },
    setPermissionColParent(row) {
      this.currentDataPermissionKey = row.permissionKey
      if (row.properties) {
        this.dataPermissionColData = JSON.parse(row.properties)
      }
      if (!this.dataPermissionForm.hasOwnProperty(row.permissionKey)) {
        Vue.set(this.dataPermissionForm, row.permissionKey, { unCols: [] })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
div.panel-header {
  font-size: 18px;
  font-weight: bold;
}
.view-data {
  display: flex;
  justify-content: space-between;

  .menu {
    width: 490px;
  }
  .content {
    width: calc(100% - 510px);
    display: flex;
    flex-direction: column;
    .content-item {
      margin-bottom: 40px;
    }
    border: 1px solid #d9dee5;
    padding: 10px;
    box-sizing: border-box;
  }
}
.panel-divider {
  margin: 20px -40px;
  border: dotted 1px #e3e3e3;
}
</style>
