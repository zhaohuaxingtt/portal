<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2021-04-13 17:30:36
 * @LastEditors: Please set LastEditors
 * @Description: 通用表格
-->
<template>
  <el-table
    :height="height"
    tooltip-effect="light"
    :data="data"
    :empty-text="$t('LK_ZANWUSHUJU')"
    :row-class-name="rowClassName"
    v-loading="tableLoading"
    @selection-change="handleSelectionChange"
    highlight-current-row
    ref="tableML"
    :border="border"
  >
    <slot></slot>
  </el-table>
</template>
<script>
export default {
  props: {
    data: { type: Array },
    tableLoading: { type: Boolean, default: false },
    height: { type: Number || String },
    rowClassName: { type: Function },
    currentRow: {
      type: Object,
      default: () => {
        return "";
      },
    },
    border: { type: Boolean, default: false },
  },
  data() {
    return {};
  },
  mounted() {
    this.handleCurrentRow(this.currentRow);
  },
  computed: {
    handleCurrentTableData() {
      return {
        currentRow: this.currentRow,
        data: this.data,
      };
    },
  },
  watch: {
    handleCurrentTableData: {
      handler(row) {
        this.$nextTick(() => {
          this.handleCurrentRow(row.currentRow);
        });
      },
      deep: true,
    },
  },
  methods: {
    handleSelectionChange(val) {
      let selectArr = val
        ? val.filter((item) => {
            return item !== undefined;
          })
        : [];
      this.$emit("selectionChange", selectArr);
    },
    handleCurrentRow(row) {
      if (row) {
        const index = this.$refs.tableML.data.findIndex((item) => {
          return item.id === row.id;
        });
        this.$refs.tableML.toggleRowSelection(
          this.$refs.tableML.data[index],
          true
        );
      }
    },
  },
};
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
</style>
