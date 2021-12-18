<template>
  <div v-loading="loading || loadPage">
    <search @confirmSearch="confirmSearch" :userType="userType" />
    <searchTable :tableListData="tableListData" :total="total" :userType="userType" v-if="!loading" @changePage="changePage" @exportHandler="exportHandler" />
  </div>
</template>

<script>
import Search from './search';
import SearchTable from './searchTable';
import { queryFaqListByPageApi, queryQListByPageApi, exportStatisticsQuestionsApi, exportQuestionsApi } from '@/api/assistant';
export default {
  name: 'problemStatementPanel',
  // inner  常见问题统计 supplier 问题处理统计
  props: {
    userType: {
      type: String,
      default: 'supplier',
    }
  },
  data () {
    return {
      loading: true,
      tableListData: [],
      total: 0,
      formData: {},
      pages: {},
      loadPage: true,
    }
  },
  methods: {
    confirmSearch (formData) {
      this.loading = true;
      this.formData = formData;
      this.queryTable(formData, {
        pageNum: this.pages.currPage,
        pageSize: this.pages.pageSize,
      });
      this.loading = true;
    },
    changePage (pages) {
      this.loadPage = true;
      this.pages = pages;
      this.queryTable(this.formData, {
        pageNum: pages.currPage,
        pageSize: pages.pageSize,
      });
    },
    // 查询数据
    queryTable (formData, pages) {
      if (this.userType === 'inner') {
        this.queryFaqListByPage(Object.assign(formData, pages));
      } else if (this.userType === 'supplier') {
        this.queryQListByPage(Object.assign(formData, pages))
      }
    },
    // 常见问题统计
    async queryFaqListByPage (data) {
      try {
        const response = await queryFaqListByPageApi(data);
        if (response?.code === '200') {
          const { total, records } = response?.data || { total: 0, records: [] };
          this.tableListData = records;
          this.total = total;
          this.loading = false;
          this.loadPage = false;
        } else {
          console.error('查询数据失败');
        }
      } catch (e) {
        console.log('服务器端错误');
        this.tableListData = []
        this.total = 0;
      } finally {
        this.loading = false;
        this.loadPage = false;
      }
    },
    // 问题处理统计
    async queryQListByPage (data) {
      try {
        const response = await queryQListByPageApi(data);
        if (response?.code == 200) {
          const { total, records } = response?.data || { total: 0, records: [] };
          this.tableListData = records;
          this.total = total;
          this.loading = false;
          this.loadPage = false;
        } else {
          console.log('获取数据失败');
        }
      } catch (e) {
        this.tableListData = []
        this.total = 0;
        console.log('服务器端错误');
      } finally {
        this.loading = false;
        this.loadPage = false;
      }
    },
    async exportHandler () {
      if (this.userType == 'inner') {
        const response = await exportStatisticsQuestionsApi(this.formData);
        console.log(response);
      } else if (this.userType == 'supplier') {
        const response = await exportQuestionsApi(this.formData);
        console.log(response);
      }
    },
  },
  mounted () {
    this.queryTable({}, {
      pageNum: 1,
      pageSize: 10,
    });
    setTimeout(() => {
      this.loading = false;
    }, 1000)
  },
  components: {
    Search,
    SearchTable,
  }
}
</script>

<style>
</style>