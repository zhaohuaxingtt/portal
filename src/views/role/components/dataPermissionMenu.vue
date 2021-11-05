<template>
  <div class="data-permission-menu">
    <dataPermissionMenuSearch
      :datasource="data"
      ref="dataPermisssionMenu"
      custom-selection
      :tree-expand="tableExpanded"
      @handle-search="handleSearch"
    />
    <i-table-custom
      :data="tableData"
      :columns="columns"
      :loading="loading"
      row-key="id"
      cascade
      custom-selection
      :height="tableHeight"
      :max-height="tableHeight"
      :tree-expand="tableExpanded"
      child-num-visible
      @handle-selection-change="handleSelectionChange"
      @row-click="rowClick"
    />
  </div>
</template>

<script>
import iTableCustom from '@/components/iTableCustom'
import dataPermissionMenuSearch from './dataPermissionMenuSearch'

export default {
  name: 'dataPermissionMenu',
  components: { iTableCustom, dataPermissionMenuSearch },
  props: {
    editable: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      require: true
    },
    data: {
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
        return bodyHeight - 250 + 'px'
      }
      return '500px'
    }
  },
  data() {
    return {
      searchStr: '',
      selectedRows: [],
      tableData: [],
      loading: false,
      tableExpanded: { expandKey: 'name', childrenKey: 'menuList' }
    }
  },
  watch: {
    data(val) {
      this.tableData = val
    }
  },
  created() {
    this.tableData = this.data
  },
  methods: {
    handleSelectionChange(val) {
      if (this.editable) {
        this.selectedRows = val
        this.$emit('set-permission-col-parent', this.selectedRows)
      }
    },
    handleSearch(val) {
      console.log('handleSearch', val)
      if (val) {
        this.tableData = [val]
      } else {
        this.tableData = this.data
      }
    },
    rowClick(row) {
      this.$emit('set-permission-col-parent', row)
    }
  }
}
</script>

<style lang="scss" scoped>
.data-permission-menu {
  height: 100%;
  border: 1px solid #d9dee5;
  padding: 10px;
  box-sizing: border-box;
}
</style>
