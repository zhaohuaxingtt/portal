<template>
  <div class="view-function-menu-content">
    <i-table-custom
      :loading="tableLoading"
      :data="tableData"
      :columns="tableColumns"
      :tree-expand="tableExpanded"
      :default-selected-rows="defaultSelectedRows"
      custom-selection
      :height="tableHeight"
      row-key="id"
      ref="functionResources"
      @handle-selection-change="handleSelectionChange"
    />
  </div>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import { fetchResource } from '@/api/role'
import { COLUMNS_FUNCTION_RESOURCE } from './data'
export default {
  name: 'functionResource',
  components: { iTableCustom },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    defaultSelectedRows: {
      type: Array,
      default: function() {
        return []
      }
    },
    parentId: {
      type: Number,
      default: 0
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
    parentId() {
      if (this.editable) {
        this.getEditTableData()
      } else {
        this.getViewTableData()
      }
    }
  },
  data() {
    return {
      tableData: [],
      tableLoading: false,
      tableColumns: [],
      tableExpanded: { expandKey: 'name', childrenKey: 'menuList' },
      selectedRows: [],
      fullResources: []
    }
  },
  created() {
    this.initPage()
  },
  methods: {
    initPage() {
      const columns = [...COLUMNS_FUNCTION_RESOURCE]
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
    getViewTableData() {
      this.tableData = this.defaultSelectedRows.filter(
        e => e.parentId === this.parentId
      )
    },
    getEditTableData() {
      this.tableData = this.fullResources.filter(
        e => e.parentId === this.parentId
      )
    },
    async query() {
      this.tableLoading = true
      const { data } = await fetchResource({ type: 2 }).finally(
        () => (this.tableLoading = false)
      )
      this.fullResources = data
      this.getEditTableData()
    },
    //表格选中值集
    handleSelectionChange(val, proptities) {
      this.selectedRows = val
      this.$emit('set-resource-list', val, proptities)
    },
    handleToggleSelectedAll(val) {
      this.$refs.functionResources.handleToggleSelectedAll(val)
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
  align-items: stretch;
}
</style>
