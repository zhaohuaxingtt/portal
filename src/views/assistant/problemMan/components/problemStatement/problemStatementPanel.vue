<template>
  <div v-loading="loading">
    <search @confirmSearch="confirmSearch" />
    <searchTable />
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
    }
  },
  methods: {
    confirmSearch(formData) {
      this.queryTable(formData);
      console.log(formData, '提交的搜索条件');
    },
    // 查询数据
    queryTable(formData) {
      if (this.userType === 'inner') {
        this.queryFaqListByPage(Object.assign(formData, {
          pageNum: 1,
          pageSize:10,
        }));
      } else if (this.userType === 'supplier') {
        this.queryQListByPage(Object.assign(formData, {
          pageNum: 1,
          pageSize:10,
        }))
      }
    },
    // 常见问题统计
    async queryFaqListByPage(data) {
      const response = await queryFaqListByPageApi(data);
      if (response?.code === '200') {
        console.log('chax sh ');
      } else {
        console.error('查询数据失败');
      }
    },
    // 问题处理统计
    async queryQListByPage(data) {
      const response = await queryQListByPageApi(data);
      if (response?.code == 200) {
        console.log('11');
      } else {
        console.log('获取数据失败');
      }
    }
  },
  mounted() {
    this.queryTable({});
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