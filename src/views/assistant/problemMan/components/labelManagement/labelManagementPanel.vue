<template>
  <div v-loading="loading">
    <search @confirmSearch="confirmSearch" />
    <searchTable ref='searchTable' :type='type'/>
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
  data () {
    return {
      loading: true,
    }
  },
  methods: {
    confirmSearch(formData) {
      this.$refs.searchTable.search(formData)
    },
  },
  mounted() {
    console.log(this.type);
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