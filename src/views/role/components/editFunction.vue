<template>
  <div class="view-data" v-loading="loading">
    <div class="menu">
      <iCard title="页面菜单">
        <functionMenu
          key="menu"
          editable
          :default-selected-rows="detail.menuList"
          :full-menu="fullMenu"
          @set-menu-list="setMenuList"
          @set-resource-parent="setResourceParent"
          ref="functionMenu"
        />
      </iCard>
    </div>
    <div class="content">
      <iCard :title="resourceTitle">
        <template slot="header-control">
          <iButton @click="saveResource">确定</iButton>
        </template>
        <functionResource
          key="resource"
          editable
          :full-menu="fullMenu"
          :default-selected-rows="detail.resourceList"
          :parent-id="resourceParent.id"
          ref="functionResource"
          @set-resource-list="setResourceList"
        />
      </iCard>
    </div>
  </div>
</template>

<script>
import { iCard, iButton, iMessage } from 'rise'
import functionMenu from './functionMenu'
import functionResource from './functionResource'
import { configRoleFunction } from '@/api/role'
import { treeToArray } from '@/utils'
export default {
  name: 'viewFunction',
  components: { iCard, functionMenu, functionResource, iButton },
  props: {
    detail: {
      type: Object,
      default: function () {
        return {}
      }
    },
    fullMenu: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  computed: {
    resourceTitle() {
      if (this.resourceParent.name) {
        return `【${this.resourceParent.name}】页面控件`
      }
      return '页面控件'
    }
  },
  data() {
    return {
      resourceParent: {},
      loading: false,
      menuList: null,
      resourceList: null
    }
  },
  methods: {
    setResourceParent(row) {
      this.resourceParent = row
    },
    setMenuList(val, properties) {
      this.menuList = val
      if (properties) {
        const { rows, row, checked } = properties
        const isMultipleCheck = !!rows
        // 如果是取消选择，联动取消资源
        if (!checked) {
          const selectRows = isMultipleCheck ? rows : [row]
          const ids = selectRows.map((e) => e.id)
          this.detail.resourceList = this.detail.resourceList.filter(
            (e) => ids.indexOf(e.parentId) === -1
          )
          this.$refs.functionResource.handleToggleSelectedAll(false)
        }
      }
    },
    setResourceList(val, proptities) {
      if (proptities) {
        const { rows, row, checked } = proptities // 单项选择返回 row,多项选择返回 rows
        const isMultipleCheck = !!rows
        if (isMultipleCheck) {
          if (checked) {
            // 全选
            const oldResourceList = this.detail.resourceList
            rows.forEach((e) => {
              oldResourceList.push(e)
            })
          } else {
            // 反选
            const ids = rows.map((e) => e.id)
            this.detail.resourceList = this.detail.resourceList.filter(
              (e) => ids.indexOf(e.id) === -1
            )
          }
        } else {
          // 处理单项选择
          if (checked) {
            // 选中
            this.detail.resourceList.push(row)
          } else {
            // 未选中
            this.detail.resourceList = this.detail.resourceList.filter(
              (e) => e.id !== row.id
            )
          }
        }
        // 关联选中菜单
        if (checked) {
          const firstRow = row || (rows && rows[0])
          const { parentId } = firstRow
          if (parentId) {
            this.$refs.functionMenu.handleToggleSelectedRow(true, {
              id: parentId
            })
          }
        }
      } else {
        this.resourceList = val
      }
    },
    async saveResource() {
      const menuList = this.menuList || this.detail.menuList
      const data = {
        ...this.detail,
        menuList: treeToArray(menuList, 'menuList'),
        resourceList: this.resourceList || this.detail.resourceList
      }
      delete data.permissionList
      this.loading = true
      const res = await configRoleFunction(data).finally(
        () => (this.loading = false)
      )
      this.$emit('save-success')
      if (res.code == 200) {
        iMessage.success(this.$t('APPROVAL.SAVE_SUCCESSFUL'))
      } else {
        iMessage.error(this.$t('APPROVAL.SAVE_FAILED'))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/* .edit-function {
  position: relative;
  .el-tabs--card {
    background: none !important;
  }
  ::v-deep .i-pagination .page-info {
    margin-top: 15px;
  }
  .action-buttons {
    position: absolute;
    z-index: 9;
    top: 0;
    right: 0;
  }
} */
.view-data {
  display: flex;
  justify-content: space-between;

  .menu {
    width: 490px;
    height: calc(100vh - 170px);
  }
  .content {
    width: calc(100% - 510px);
    height: calc(100vh - 170px);
    display: flex;
    flex-direction: column;
    .content-item {
      flex-grow: 1;
    }
  }
}
</style>
