<template>
  <iPage>
    <div class="header">{{ $t("TERMS_TIAOKUANGUANLI") }}</div>
    <theSearch @getTableList="getTableList" />
    <theTable
      ref="theTable"
      :page="page"
      :total="page.total"
      :tableListData="tableListData"
      :tableListColumns="tableListClause"
      :tableLoading="tableLoading"
      @refTabList="refTabList"
      @handleChangePage="handleChangePage"
      @handleSizeChange="handleSizeChange"
      @handleExportAll="handleExportAll"
    />
  </iPage>
</template>

<script>
import { iPage, iMessage } from "rise";
import theSearch from "./components/theSearch.vue";
import theTable from "./components/theTable.vue";
import { pageMixins } from "@/utils/pageMixins";
import { findByPage, exportTerms } from "@/api/terms/terms";
import { exportFile } from "@/utils/exportFileUtil";

export default {
  mixins: [pageMixins],
  components: {
    iPage,
    theSearch,
    theTable,
  },
  data() {
    return {
      tableLoading: false,
      tableListData: [],
      formData: {},
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    getTableList(e) {
      this.formData = e;
      this.page.currPage = 1;
      let param = {
        ...e,
        pageNum: 1,
        pageSize: this.page.pageSize,
      };
      this.query(param);
    },
    refTabList() {
      this.page.currPage = 1;
      let param = {
        ...this.formData,
        pageNum: 1,
        pageSize: this.page.pageSize,
      };
      this.query(param);
    },
    handleChangePage(e) {
      this.page.currPage = e;
      let param = {
        ...this.formData,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      this.query(param);
    },
    handleSizeChange(e) {
      this.page.pageSize = e;
      let param = {
        ...this.formData,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      this.query(param);
    },
    query(e) {
      this.tableLoading = true;
      findByPage(e)
        .then((res) => {
          this.tableListData = res.data;
          this.page.total = res.total;
          this.tableLoading = false;
        })
        .catch((err) => {
          this.tableLoading = false;
        });
    },
    handleExportAll() {
      exportFile({
        url: "/rise-terms/termsQueryService/exportTerms",
        data: {
          ...this.formData,
          pageNum: this.page.currPage,
          pageSize: this.page.pageSize,
        },
        callback: (e) => {
          if (e) {
            iMessage.success("导出成功");
          } else {
            iMessage.error("导出失败");
          }
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  font-size: 20px;
  font-weight: bold;
}
</style>
