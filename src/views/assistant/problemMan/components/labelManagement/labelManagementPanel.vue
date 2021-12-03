<template>
  <div v-loading="loading">
    <search @confirmSearch="confirmSearch" :moduleList="moduleList" />
    <searchTable ref='searchTable' :type='type' :moduleList="moduleList"/>
  </div>
</template>

<script>
import Search from './search';
import SearchTable from './searchTable';
import {queryModuleBySource} from "@/api/assistant"

export default {
  name: 'problemStatementPanel',
  props: {
    type: {
      type: String,
      default: ""
    }
  }, 
  data () {
    return {
      loading: false,
      moduleList:[]
    }
  },
  created() {
    this.queryModuleBySource()
  },
  methods: {
    async queryModuleBySource(){
      let res = await queryModuleBySource(this.type)
      this.moduleList = res.data
    },
    confirmSearch(formData) {
      this.$refs.searchTable.search(formData)
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