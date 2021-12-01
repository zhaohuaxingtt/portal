<template>
  <div v-loading="loading || loadPage">
    <search @confirmSearch="confirmSearch" />
    <searchTable :tableListData="tableListData" :total="total" v-if="!loading" @changePage="changePage" />
  </div>
</template>

<script>
import Search from './search';
import SearchTable from './searchTable';
import {queryFaqListByPageApi,queryQListByPageApi} from '@/api/assistant';
export default {
  name: 'problemStatementPanel',
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
    confirmSearch(formData) {
      this.loading = true;
      this.formData = formData;
      this.queryTable(formData, {
        pageNum: this.pages.currPage,
        pageSize: this.pages.pageSize,
      });
      this.loading = true;
    },
    changePage(pages) {
      this.loadPage = true;
      this.pages = pages;
      this.queryTable(this.formData, {
        pageNum: pages.currPage,
        pageSize: pages.pageSize,
      });
    },
    // 查询数据
    queryTable(formData, pages) {
      if (this.userType === 'inner') {
        this.queryFaqListByPage(Object.assign(formData, pages));
      } else if (this.userType === 'supplier') {
        this.queryQListByPage(Object.assign(formData, pages))
      }
    },
    // 常见问题统计
    async queryFaqListByPage(data) {
      const response = await queryFaqListByPageApi(data);
      if (response?.code === '200') {
        const {total,records} = response?.data || {total:0,records:[]};
        this.tableListData = records;
        this.total = total;
        this.loading = false;
        this.loadPage = false;
      } else {
        console.error('查询数据失败');
      }
    },
    // 问题处理统计
    async queryQListByPage(data) {
      const response = await queryQListByPageApi(data);
      if (response?.code == 200) {
        const {total,records} = response?.data || {total:0,records:[]};
        this.tableListData = records;
        this.total = total;
        this.loading = false;
        this.loadPage = false;
      } else {
        console.log('获取数据失败');
      }
    }
  },
  mounted() {
    this.queryTable({},{
      pageNum: 1,
      pageSize:10,
    });
    setTimeout(() => {
      this.loading = false;
    },1000)
  },
  components: {
    Search,
    SearchTable,
  }
}
</script>

<style>

</style>