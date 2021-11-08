<template>
  <iCard>
    <div>
      <div class="panel-header margin-bottom20 flex flex-between-center">
        行权限

        <div class="flex-end-center margin-bottom20">
          <iButton @click="saveDataPermission">确定</iButton>
          <iButton @click="resetDataPermission">重置</iButton>
        </div>
      </div>
      <dataPermissionRow editable :form="detail" />
    </div>
    <div class="panel-divider"></div>
    <div class="panel-header margin-bottom20">列权限</div>

    <div class="view-data">
      <div class="menu">
        <dataPermissionMenu
          editable
          :columns="menuColumns"
          :data="menuData"
          @set-permission-col-parent="setPermissionColParent"
        />
      </div>
      <div class="content" v-loading="dataPermissionColLoading">
        <div style="height: 100%" v-loading="loading">
          <div class="content-item margin-bottom20">
            <dataPermissionField :data="dataPermissionColData" editable />
          </div>

          <dataPermissionCol
            editable
            :data="dataPermissionColData"
            :form="dataPermissionForm[currentDataPermissionKey]"
          />
        </div>
      </div>
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton, iMessage } from 'rise'
import dataPermissionMenu from './dataPermissionMenu'
import dataPermissionField from './dataPermissionField'
import dataPermissionCol from './dataPermissionCol'
import dataPermissionRow from './dataPermissionRow'

import { COLUMNS_DATA_MENU } from './data'
import { getMenuByType } from '../util'
import { configRoleData } from '@/api/role'
import { treeToArray, arrayToTree } from '@/utils'
export default {
  name: 'viewData',
  components: {
    iCard,
    iButton,
    dataPermissionMenu,
    dataPermissionField,
    dataPermissionCol,
    dataPermissionRow
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
      this.query()
    },
    detail() {
      this.query()
      this.setDataPermissionForm()
    }
  },
  data() {
    return {
      menuColumns: [...COLUMNS_DATA_MENU],
      menuData: [],
      dataPermissionColData: [],
      currentDataPermissionKey: null,
      dataPermissionColLoading: false,
      loading: false,
      dataPermissionForm: {},
      dataPermissionBack: {}
    }
  },
  created() {
    this.query()
    this.setDataPermissionForm()
  },
  methods: {
    setDataPermissionForm() {
      if (this.detail.columnConfig) {
        this.dataPermissionForm = JSON.parse(this.detail.columnConfig)
        this.dataPermissionBack = JSON.parse(this.detail.columnConfig)
      }
    },
    query() {
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
    },
    async saveDataPermission() {
      const data = {
        ...this.detail,
        columnConfig: JSON.stringify(this.dataPermissionForm)
      }

      delete data.menuList
      delete data.resourceList
      this.loading = true
      const res = await configRoleData(data).finally(
        () => (this.loading = false)
      )
      if (res.code == 200) {
        iMessage.success(this.$t('APPROVAL.SAVE_SUCCESSFUL'))
      } else {
        iMessage.error(this.$t('APPROVAL.SAVE_FAILED'))
      }
    },
    resetDataPermission() {
      this.dataPermissionForm[this.currentDataPermissionKey] = _.cloneDeep(
        this.dataPermissionBack
      )
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
