<template>
  <div>
    <search @confirmSearch="confirmSearch" />
    <searchTable />
  </div>
</template>

<script>
import Search from './search';
import SearchTable from './searchTable';
export default {
  name: 'problemStatementPanel',
  props: {
    type: {
      type: Number,
      default: 1
    }
  }, 
  methods: {
    confirmSearch(formData) {
      console.log(formData, '提交的搜索条件');
    },
  },
  mounted() {
  },
  components: {
    Search,
    SearchTable,
  }
}
</script>

<style>

</style>