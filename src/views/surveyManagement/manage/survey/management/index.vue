<template>
  <iPage>
    <div class="home">
      <div class="header">问卷管理</div>
      <theSearch @getTableList="getTableList" @setTypeObj="setTypeObj" />
      <theTable
        ref="theTable"
        :page="page"
        :tableLoading="tableLoading"
        :total="page.total"
        :tableListData="tableListData"
        @refTabList="refTabList"
        @handleChangePage="handleChangePage"
        @handleSizeChange="handleSizeChange"
      />
    </div>
  </iPage>
</template>

<script>
import { iPage } from "rise";
import theSearch from "./components/theSearch.vue";
import theTable from "./components/theTable.vue";
import { findPage } from "@/api/survey/survey";
import { pageMixins } from "@/utils/pageMixins";

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
  created(){
    document.title='问卷管理';
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
      findPage(e)
        .then((res) => {
          this.tableListData = res.data;
          this.page.total = res.total;
          this.tableLoading = false;
        })
        .catch((err) => {
          this.tableLoading = false;
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 1740px;
}
.header {
  font-size: 20px;
  font-weight: 600;
  line-height: 23px;
}
</style>