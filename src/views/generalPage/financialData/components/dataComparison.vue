<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-18 09:48:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-05-27 11:43:05
 * @Descripttion: your project
-->
<template>
  <i-dialog
    :title="title"
    :visible.sync="value"
    width="90%"
    @close="clearDiolog"
  >
    <div class="changeContent">
      <data-comparsion-tab @handleClick="handleTabClick" />
      <data-comparsion-table
        :tabValue="tabValue"
        :comparisonTableData="comparisonTableData"
        ref="dataComparsionTable"
        :tableListData="tableListData"
        class="margin-top20"
      />
    </div>
  </i-dialog>
</template>

<script>
import { iDialog } from "rise";
import dataComparsionTab from "./dataComparsionTab";
import dataComparsionTable from "./dataComparsionTable";

export default {
  components: {
    iDialog,
    dataComparsionTab,
    dataComparsionTable
  },
  props: {
    title: { type: String, default: "" },
    value: { type: Boolean },
    comparisonTableData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    value(n) {
      this.$nextTick(() => {
        n && this.getTableList();
      });
    }
  },
  data() {
    return {
      tableListData: [],
      tabValue: "balance"
    };
  },
  created() {},
  methods: {
    getTableList() {
      console.log(this.comparisonTableData)

      this.$refs.dataComparsionTable.getTableList();
    },
    clearDiolog() {
      this.comparisonTableData = [];
      this.$emit("input", false);
    },
    handleTabClick(value) {
      this.tabValue = value;
    }
  }
};
</script>

<style scoped lang="scss">
.changeContent {
  padding: 0 10px 20px 10px;
}
</style>