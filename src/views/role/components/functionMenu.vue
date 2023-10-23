<template>
  <div class="view-function-menu-content">
    <i-table-custom
      v-if="tableColumns.length > 0"
      row-key="id"
      :height="tableHeight"
      ref="functionMenu"
      custom-selection
      :loading="tableLoading"
      :data="tableData"
      :columns="tableColumns"
      :tree-expand="tableExpanded"
      :default-selected-rows="defaultSelectedRows"
      highlight-current-row
      @handle-selection-change="handleSelectionChange"
      @row-click="handleRowClick"
    />
  </div>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import { COLUMNS_FUNCTION_MENU } from './data'
import { getMenuByType } from '../util'
export default {
  name: 'functionMenu',
  components: { iTableCustom },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    defaultSelectedRows: {
      type: Array,
      default: function () {
        return []
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
    tableHeight() {
      const bodyHeight = document.body.clientHeight
      if (bodyHeight) {
        return bodyHeight - 230 + 'px'
      }
      return '500px'
    }
  },
  watch: {
    defaultSelectedRows() {
      if (!this.editable) {
        this.getViewTableData()
      }
    },
    fullMenu() {
      this.query()
    }
  },
  data() {
    return {
      tableData: [],
      tableLoading: false,
      tableColumns: [],
      tableExpanded: { expandKey: 'name', childrenKey: 'menuList' },
      selectedRows: []
    }
  },
  created() {
    this.initPage()
  },
  methods: {
    initPage() {
      const columns = [...COLUMNS_FUNCTION_MENU]
      if (this.editable) {
        columns.unshift({ type: 'customSelection', width: 50 })
      }
      this.tableColumns = columns
      if (!this.editable) {
        this.getViewTableData()
      } else {
        this.query()
      }
    },
    search() {
      this.query()
    },
    async query() {
      // 查询所有菜单
      const menu = getMenuByType(this.fullMenu, [3])
      this.tableData = menu
    },
    //表格选中值集
    handleSelectionChange(val, properties) {
      this.selectedRows = val
      this.$emit('set-menu-list', val, properties)
    },
    //
    getViewTableData() {
      const menu = getMenuByType(this.defaultSelectedRows, [3])
      this.tableData = menu
      if (this.tableData && this.tableData.length > 0) {
        this.$emit('set-resource-parent', this.tableData[0])
      }
    },
    handleRowClick(row) {
      this.$emit('set-resource-parent', row)
    },
    handleToggleSelectedRow(val, row) {
      this.$refs.functionMenu.handleToggleSelectedRow(val, row)
    }
  }
}
</script>

<style lang="scss" scoped>
.view-function-menu-content {
  min-height: calc(100vh - 293px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.view-function-menu-content {
  ::v-deep .el-table__body tr.current-row > td:first-child {
    border-left: 3px solid #67C23A;
  }
}
</style>
