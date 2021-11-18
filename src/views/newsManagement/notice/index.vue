<template>
  <iPage>
    <div class="notice">{{language('NEWS_GONGGAOGUANLI','公告管理')}}</div>
    <theSearch @searchTableList="searchTable" />
    <theTable
      ref="theTable"
      :page="page"
      :tableListData="tableListData"
      :tableLoading="tableLoading"
      @handleChangePage="handleChangePage"
      @handleChangeSize="handleChangeSize"
      @getTableList="getTableList"
    />
  </iPage>
</template>
<script>
import { iPage } from "rise";
import theSearch from "./components/theSearch.vue";
import theTable from "./components/theTable.vue";
import {
  getNotice,
  deleteNotice,
  saveNotice,
  updateNotice,
  getNoticeById,
  getNoticeList,
  getNoticeListByType,
} from "@/api/news/notice.js";
import { pageMixins } from "@/utils/pageMixins";
export default {
  mixins: [pageMixins],
  components: { iPage, theSearch, theTable },
  props: {},
  async mounted() {
    this.query();
  },
  data() {
    return {
      form: {},
      tableListData: [],
      tableLoading:false,
      // selectStatus: [],
      // selectRow: [],
    };
  },

  methods: {
    searchTable(form) {
      this.tableLoading = true;
      this.form = form;
      this.page.currPage = 1;
      const data = {
        ...form,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      getNotice(data).then((res) => {
        const { data, pageNum, pageSize, total, pages } = res;
        this.page.currPage = pageNum;
        this.page.pageSize = pageSize;
        this.page.total = total;
        this.page.pages = pages;
        this.tableListData = data;
        this.tableLoading = false;
      });
    },
    // 查询
    query() {
      this.tableLoading = true;
      const data = {
        ...this.form,
        pageNum: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      getNotice(data).then((res) => {
        const { data, pageNum, pageSize, total, pages } = res;
        this.page.currPage = pageNum;
        this.page.pageSize = pageSize;
        this.page.total = total;
        this.page.pages = pages;
        this.tableListData = data;
        this.tableLoading = false;
      });
    },
    getTableList() {
      this.query();
    },
    handleChangePage(e) {
      this.page.currPage = e;
      // let param = {
      //   ...this.form,
      //   pageNum: this.page.currPage,
      //   pageSize: this.page.pageSize,
      // };
      this.query();
    },
    handleChangeSize(e) {
      this.page.currPage = 1;
      this.page.pageSize = e;
      // let param = {
      //   ...this.form,
      //   pageNum: this.page.currPage,
      //   pageSize: this.page.pageSize,
      // };
      this.query();
    },
  },
};
</script>

<style lang="scss" scoped>
.notice {
  font-size: 20px;
  font-family: Arial;
  font-weight: bold;
  line-height: 23px;
  margin-bottom: 30px;
}
</style>
