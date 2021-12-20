<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2021-04-13 17:30:36
 * @LastEditors: Please set LastEditors
 * @Description: 通用表格
-->
<template>
  <div>
    <el-table
      :height="height"
      tooltip-effect="light"
      :data="data"
      :empty-text="$i18n.locale === 'zh'?'暂无数据':'No Data'"
      :row-class-name="rowClassName"
      v-loading="tableLoading"
      @selection-change="handleSelectionChange"
      highlight-current-row
      ref="tableML"
      :border="border"
      @row-click="handleRowClick"
      :defaultSort="defaultSort"
    >
      <slot></slot>
    </el-table>
    <iTableHeaderSorter
      v-if="openHiddenColumn"
      :show.sync="openHiddenColumn"
      :data="preColumns"
      @callback="callback"
    ></iTableHeaderSorter>
  </div>
</template>
<script>
import iTableHeaderSorter from '@/components/iTableHeaderSort'
export default {
  components: {
    iTableHeaderSorter
  },
  props: {
    data: { type: Array },
    tableLoading: { type: Boolean, default: false },
    isSingle: { type: Boolean, default: false },
    height: { type: Number || String },
    rowClassName: { type: Function },
    currentRow: {
      type: Object,
      default: () => {
        return ''
      }
    },
    border: { type: Boolean, default: false },
    defaultSort: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      initialColumns: [],
      preColumns: [],
      selectedArr: [],
      openHiddenColumn: false
    }
  },
  mounted() {
    this.initialColumns = [...this.$slots.default]
    this.preColumns = this.$slots.default
      .filter((item) => {
        return (
          item.componentOptions.propsData.label &&
          item.componentOptions.propsData.labelClassName === 'can-hideen'
        )
      })
      .map((item) => {
        return item.componentOptions.propsData
      })
    this.handleCurrentRow(this.currentRow)
  },
  computed: {
    handleCurrentTableData() {
      return {
        currentRow: this.currentRow,
        data: this.data
      }
    }
  },
  watch: {
    handleCurrentTableData: {
      handler(row) {
        this.$nextTick(() => {
          this.handleCurrentRow(row.currentRow)
        })
      },
      deep: true
    }
  },
  methods: {
    handleOpenColumn() {
      this.preColumns = this.preColumns.map((item) => {
        return {
          ...item,
          isHidden: !this.$slots.default.some((it) => {
            return it.componentOptions.propsData.label === item.label
          })
        }
      })
      this.openHiddenColumn = true
    },
    callback(val) {
      this.$slots.default = [...this.initialColumns]
      this.$slots.default = this.$slots.default.filter((item) => {
        return !val.some((it) => {
          return (
            item.componentOptions.propsData.label === it.label && it.isHidden
          )
        })
      })
    },
    handleRowClick(row) {
      let bol = this.selectedArr.some((item) => {
        return item.id === row.id
      })
      this.handleSelectCheckBox(row, !bol)
    },
    handleSelectionChange(val) {
      let selectArr = val
        ? val.filter((item) => {
            return item !== undefined
          })
        : []
      this.selectedArr = selectArr
      this.$emit('selectionChange', selectArr)
    },
    handleSelectCheckBox(row, bol) {
      const index = this.$refs.tableML.data.findIndex((item) => {
        return item.id === row.id
      })
      this.$refs.tableML.toggleRowSelection(this.$refs.tableML.data[index], bol)
    },
    handleCurrentRow(row) {
      if (this.isSingle) {
        this.$refs.tableML.clearSelection()
      }
      if (row) {
        this.handleSelectCheckBox(row, true)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
::v-deep .open-link-text {
  color: #1763f7;
  cursor: pointer;
}
::v-deep td .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
::v-deep .column-hidden {
  display: none;
}
</style>
